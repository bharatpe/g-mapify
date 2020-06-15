import React from "react";
import ReactDOM from "react-dom";
import styles from "./style.css";
import cx from "classnames";
import PropTypes from "prop-types";
import SearchContainer from "../SearchContainer";
import debounce from "../helper_/debounce";

// default set Delhi lat long
const DEFAULT_LAT_LONG = {
  lat: 28.7041,
  lng: 77.1025
};

const SearchInputComponent = (props) => {
  return (
    <textarea
      {...props}
      placeholder="Search Location"
      className={cx(styles.mapTextarea, props.className)}
    />
  );
};

// Map search API loading state
const SEARCH_STATE = {
  LOAD: 1,
  FAIL: -1,
  PROGRESS: 0
};

// Map message constant
const MSG_CONST = {
  NO_FETCH: "Unable to fetch location",
  NO_RESULT: "No Results Found",
  LOADING: "Loading...",
  MAP_NOT_LOADED: "Map load failed!"
};

export default class GMap extends React.PureComponent {
  // google Map default options
  static defaultMapOptions = {
    zoom: 15,
    zoomControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
    streetViewControl: false,
    clickableIcons: false,
    mapTypeId: "roadmap" // ["hybrid, roadmap, satellite, terrain"]
  };

  // define component prop types
  static propTypes = {
    appKey: PropTypes.string,
    lat: PropTypes.number,
    lng: PropTypes.number,
    mapOptions: PropTypes.object,
    mapClassName: PropTypes.string,
    hasMarker: PropTypes.bool,
    hasSearch: PropTypes.bool,
    mapSearchPlace: PropTypes.string,
    debounceTime: PropTypes.number,
    inputClassName: PropTypes.string,
    markerIcon: PropTypes.string,
    searchPlaceHolder: PropTypes.string,
    searchClassName: PropTypes.string,
    libraries: PropTypes.string,
    onSelect: PropTypes.func
  };

  // define default values of prop types
  static defaultProps = {
    appKey: "",
    lat: DEFAULT_LAT_LONG.lat,
    lng: DEFAULT_LAT_LONG.lng,
    mapOptions: {},
    mapClassName: "",
    hasMarker: true,
    hasSearch: false,
    mapSearchPlace: "",
    debounceTime: 2000, // time in ms
    inputClassName: "",
    markerIcon:
      "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png",
    searchPlaceHolder: "Search here",
    searchClassName: "",
    libraries: "places",
    onSelect: () => {}
  };

  // store google map instance
  mapInstance = null;

  // store google map render element instance
  mapElemRef = null;

  // store map default search place element instance
  defaultSearchPlace = null;

  // store map last position
  mapLastPosition = {};

  // store map formatted address
  addressInput = "";

  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      showMapSearch: false,
      searchState: SEARCH_STATE.LOAD,
      isMapLoadingFailed: false
    };

    this.mapElemRef = React.createRef();
    this.defaultSearchPlace = React.createRef();

    this.onChangeAddressInput = this.onChangeAddressInput.bind(this);

    // implement debounce time when user search location
    this.searchByQueryDebounce = debounce(
      this.searchByQueryDebounce,
      this.props.debounceTime
    );
    this.showSearchInput = this.showSearchInput.bind(this);
    this.closeMapSerach = this.closeMapSerach.bind(this);
    this.selectMapItem = this.selectMapItem.bind(this);
  }

  componentDidMount() {
    if (this.props.appKey) {
      // call to insert google map script
      this.insertMapScript();

      // google map callback
      window.initMapScript = (event) => {
        this.mapInitSuccess();
      };
    } else {
      console.error("google map appKey not found!!!");
    }
  }

  // add google map script file to project
  insertMapScript() {
    const isGMapScriptAdded = document.head.querySelector("#google-map");

    if (!isGMapScriptAdded) {
      // error occured in Google Map loading
      window.gm_authFailure = () => {
        this.setState({
          isMapLoadingFailed: true
        });

        this.sendToParent(false, { message: MSG_CONST.MAP_NOT_LOADED }, -1);
      };

      const scriptElem = document.createElement("script");
      const librariesOptions = this.props.libraries;
      scriptElem.src = `https://maps.googleapis.com/maps/api/js?key=${this.props.appKey}&callback=initMapScript&libraries=${librariesOptions}`;
      scriptElem.setAttribute("id", "google-map");
      document.querySelector("head").appendChild(scriptElem);
    } else {
      // skip to add google map script when already added
      this.mapInitSuccess();
    }
  }

  // google map script file added successfully
  mapInitSuccess() {
    const mapSearchPlaceElem = this.props.mapSearchPlace;
    if (mapSearchPlaceElem) {
      this.defaultSearchPlace = {
        current: document.querySelector(mapSearchPlaceElem)
      };
    }
    this.createMapInstance(this.props.lat, this.props.lng);
  }

  // create map instance
  createMapInstance(lat, lng) {
    if (!window.google) {
      console.error("google map library not found!");
      return;
    }

    const { props } = this;
    const latLng = new window.google.maps.LatLng(lat, lng);
    const center = {
      center: latLng
    };

    // create google map instance
    if (this.mapElemRef.current) {
      this.mapInstance = new window.google.maps.Map(this.mapElemRef.current, {
        ...center,
        ...GMap.defaultMapOptions,
        ...props.mapOptions
      });

      // add marker icon
      if (props.hasMarker) {
        this.addEvents();
      }

      // set map postion to according to porps lat/lng
      this.setMapPosition(this.props.lat, this.props.lng);

      // add marker icon
      if (props.hasSearch) {
        this.addSearchBox();
      }
    }
  }

  // add search box to map
  addSearchBox() {
    if (this.props.hasSearch) {
      if (this.defaultSearchPlace.current) {
        ReactDOM.render(
          <SearchInputComponent
            value={this.addressInput}
            onFocus={this.showSearchInput}
            className={this.props.inputClassName}
          />,
          this.defaultSearchPlace.current
        );
      } else {
        console.error('mapSearchPlace element not found!', "Selector = ", this.props.mapSearchPlace);
      }
    }
  }

  // add events to google map
  addEvents() {
    if (this.mapInstance) {
      // bind dragend event for fetch map center lat long
      this.mapInstance.addListener("dragend", () => {
        this.setMapPosition(
          this.mapInstance.center.lat(),
          this.mapInstance.center.lng()
        );
      });

      // bind zoom change event because always need to zoom from center
      this.mapInstance.addListener("zoom_changed", () => {
        this.setMapPosition(this.mapLastPosition.lat, this.mapLastPosition.lng);
      });
    }
  }

  // remove events from google map
  removeEvents() {
    if (window.google) {
      window.google.maps.event.clearListeners(this.mapInstance, "dragend");
      window.google.maps.event.clearListeners(this.mapInstance, "zoom_changed");
    }
  }

  // set google map position
  setMapPosition(lat, lng) {
    const position = {
      lat: lat,
      lng: lng
    };

    this.mapInstance.setCenter(position);
    this.mapInstance.panTo(position);

    // get address only when previous and current lat/lng different
    if (
      this.mapLastPosition.lat !== position.lat &&
      this.mapLastPosition.lng !== position.lng
    ) {
      this.addressInput = MSG_CONST.LOADING;
      this.addSearchBox();

      this.getAddressFromLatLong(position).then(
        (data, status) => {
          this.addressInput = data.formatted_address;

          // update search box
          this.addSearchBox();

          // send to parent
          this.sendToParent(true, data, status);
        }, (error) => {
          this.addressInput = MSG_CONST.NO_FETCH;

          // update search box
          this.addSearchBox();

          // send to parent
          this.sendToParent(false, {}, error);
        }
      );
    }

    // save map last position
    this.mapLastPosition = position;
  }

  // get address from Lat Logn (reverse geocoding)
  getAddressFromLatLong(position) {
    var geocoder = new window.google.maps.Geocoder();
    return new Promise((resolve, reject) => {
      geocoder.geocode({ location: position }, function (results, status) {
        if (status === "OK") {
          if (results[0]) {
            resolve(results[0], status);
          } else {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject(-1);
          }
        } else {
          reject(status);
        }
      });
    });
  }

  // search google map address by query
  searchByQuery(query) {
    return new Promise((resolve, reject) => {
      const request = {
        query,
        fields: ["name", "formatted_address", "geometry"],
      };

      const service = new window.google.maps.places.PlacesService(
        this.mapInstance
      );

      service.textSearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          resolve(results, status);
        } else {
          reject(status);
        }
      });
    });
  }

  // searchByQuery with debounce time
  searchByQueryDebounce(query) {
    // minimum 3 characters required to search
    if (query && query.length < 3) {
      return;
    }

    let { searchResults } = this.state;

    this.setState({
      searchState: SEARCH_STATE.PROGRESS
    });

    // find map address by query
    this.searchByQuery(query).then(
      (results) => {
        searchResults = results;
        this.setState({
          searchResults,
          searchState: SEARCH_STATE.LOAD
        });
      },
      () => {
        this.setState({
          searchResults: [],
          searchState: SEARCH_STATE.FAIL
        });
      }
    );
  }

  // input on address input box
  onChangeAddressInput(value) {
    // find map address by query with debounce time
    this.searchByQueryDebounce(value);
  }

  // show map address search input
  showSearchInput() {
    this.setState({
      showMapSearch: true
    });
  }

  // close map search
  closeMapSerach() {
    this.setState({
      showMapSearch: false
    });
  }

  // map data send to parent
  sendToParent(isSuccess, mapData, mapStatus) {
    if (this.props.onSelect && typeof this.props.onSelect === "function") {
      const data = JSON.parse(JSON.stringify(mapData));
      this.props.onSelect(isSuccess, data, mapStatus);
    }
  }

  // select map address item
  selectMapItem(event) {
    const closestLiElem = event.target && event.target.closest(".mapItem");
    if (closestLiElem.hasAttribute("index")) {
      const selectedVal = this.state.searchResults[
        Number(closestLiElem.getAttribute("index"))
      ];

      this.setState({
        showMapSearch: false
      });

      // set marker and map position according to selected location
      this.setMapPosition(
        selectedVal.geometry.location.lat(),
        selectedVal.geometry.location.lng()
      );
    }
  }

  // reset variables
  componentWillUnmount() {
    // remove events from google map
    this.removeEvents();
  }

  render() {
    const { mapClassName, markerIcon, hasMarker, hasSearch } = this.props;
    const {
      showMapSearch,
      searchResults,
      searchState,
      isMapLoadingFailed
    } = this.state;

    return (
      <div className={cx(styles.mapContainer, mapClassName)}>
        <div ref={this.mapElemRef} className={styles.map}>
          {/* map comming here */}
        </div>

        {/* map marker icon */}
        {hasMarker && !isMapLoadingFailed && (
          <div
            className={styles.markerIcon}
            style={{ backgroundImage: `url(${markerIcon})` }}
          >
            &nbsp;
          </div>
        )}

        {hasSearch && !isMapLoadingFailed && !this.props.mapSearchPlace && (
          <div
            ref={this.defaultSearchPlace}
            className={styles.defaultSearchPositoin}
          >
            {/* Map default search place here */}
          </div>
        )}

        {/* Render childrens */}
        {this.props.children}

        {showMapSearch && !isMapLoadingFailed && (
          <SearchContainer
            onClose={this.closeMapSerach}
            onChange={this.onChangeAddressInput}
            placeholder={this.props.searchPlaceHolder}
            className={this.props.searchClassName}
          >
            <div className={styles.searchResultContainer}>
              <div className={styles.searchLoading}>
                {searchState === SEARCH_STATE.PROGRESS && "Loading..."}
                {searchState === SEARCH_STATE.FAIL && MSG_CONST.NO_RESULT}
              </div>

              <ul
                onClick={this.selectMapItem}
                className={cx(styles.mapItemUL, "mapItem")}
              >
                {searchResults.map((val, index) => {
                  return (
                    <li
                      key={index}
                      index={index}
                      className={cx(styles.mapItem, "mapItem")}
                    >
                      <div className={styles.searchH1}>{val.name}</div>
                      <div className={styles.searchH2}>
                        {val.formatted_address}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </SearchContainer>
        )}
      </div>
    );
  }
}
