import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styles from "./style.css";
import cx from "classnames";
import PropTypes from "prop-types";
import SearchContainer from "../SearchContainer";
import debounce from "../utils/debounce";
import {
  SEARCH_STATE,
  MSG_CONST,
  DEFAULT_LAT_LONG,
  DEFAULT_MAP_OPTIONS,
  DEFAULT_DEBOUNCE_TIME,
  DEFAULT_HAS_MARKER,
  DEFAULT_HAS_SEARCH,
  DEFAULT_SEARCH_PLACEHOLDER,
  DEFAULT_LIBRARY_MODE,
  DEFAULT_MARKER_ICON
} from "../constants";

const SearchInputComponent = (props) => {
  return (
    <textarea
      {...props}
      placeholder="Search Location"
      className={cx(styles.mapTextarea, props.className)}
    />
  );
};

const GMapify = (props) => {
  const {
    appKey,
    lat,
    lng,
    mapOptions,
    mapClassName,
    hasMarker,
    hasSearch,
    mapSearchPlace,
    debounceTime,
    inputClassName,
    markerIcon,
    searchPlaceHolder,
    searchClassName,
    libraries,
    children,
    onSelect
  } = props;

  const [searchResults, setSearchResults] = useState([]);
  const [showMapSearch, setShowMapSearch] = useState(false);
  const [searchState, setSearchState] = useState(SEARCH_STATE.LOAD);
  const [isMapLoadingFailed, setIsMapLoadingFailed] = useState(false);
  const [mapLastPosition, setMapLastPosition] = useState({});
  const [addressInput, setAddressInput] = useState("");
  const [mapInstance, setMapInstance] = useState(null);

  // store google map render element instance
  const mapElemRef = useRef(null);
  let defaultSearchPlace = useRef(null);

  /**
   * @name mapInitSuccess
   * @description google map script file added successfully
   */
  const mapInitSuccess = () => {
    if (mapSearchPlace) {
      defaultSearchPlace = { current: document.querySelector(mapSearchPlace) };
    }
    createMapInstance(lat, lng);
  };

  /**
   * @name insertMapScript
   * @description add google map script file to project
   */
  const insertMapScript = () => {
    const isGMapifyScriptAdded = document.head.querySelector("#google-map");

    if (!isGMapifyScriptAdded) {
      // error occured in Google Map loading
      window.gm_authFailure = () => {
        setIsMapLoadingFailed(true);
        sendToParent(false, { message: MSG_CONST.MAP_NOT_LOADED }, -1);
      };

      const scriptElem = document.createElement("script");
      scriptElem.src = `https://maps.googleapis.com/maps/api/js?key=${appKey}&callback=initMapScript&libraries=${libraries}`;
      scriptElem.setAttribute("id", "google-map");
      document.querySelector("head").appendChild(scriptElem);
    } else {
      // skip to add google map script when already added
      mapInitSuccess();
    }
  };

  /**
   * @name createMapInstance
   * @param {Float} lat
   * @param {Float} lng
   * @description create map instance
   */
  const createMapInstance = (lat, lng) => {
    if (!window.google) {
      console.error("google map library not found!");
      return;
    }

    const center = {
      center: new window.google.maps.LatLng(lat, lng)
    };

    // create google map instance
    console.log("MAP INSTANXE", mapElemRef.current);

    if (mapElemRef.current) {
      setMapInstance(
        new window.google.maps.Map(mapElemRef.current, {
          ...center,
          ...DEFAULT_MAP_OPTIONS,
          ...mapOptions
        })
      );
    }
  };

  /**
   * @name addSearchBox
   * @description add search box to map
   */
  const addSearchBox = () => {
    if (hasSearch) {
      if (defaultSearchPlace.current) {
        ReactDOM.render(
          <SearchInputComponent
            value={addressInput}
            onFocus={() => setShowMapSearch(true)}
            className={inputClassName}
          />,
          defaultSearchPlace.current
        );
      } else {
        console.error(
          "mapSearchPlace element not found!",
          "Selector = ",
          mapSearchPlace
        );
      }
    }
  };

  /**
   * @name addEvents
   * @description add events to google map
   */
  const addEvents = () => {
    if (mapInstance && hasMarker) {
      // bind dragend event for fetch map center lat long
      mapInstance.addListener("dragend", () => {
        setMapPosition(mapInstance.center.lat(), mapInstance.center.lng());
      });

      // bind zoom change event because always need to zoom from center
      mapInstance.addListener("zoom_changed", () => {
        setMapPosition(mapLastPosition.lat, mapLastPosition.lng);
      });
    }
  };

  /**
   * @name removeEvents
   * @description remove events from google map
   */
  const removeEvents = () => {
    if (window.google && mapInstance) {
      window.google.maps.event.clearListeners(mapInstance, "dragend");
      window.google.maps.event.clearListeners(mapInstance, "zoom_changed");
    }
  };

  /**
   * @name setMapPosition
   * @param {Float} lat
   * @param {Float} lng
   * @description set google map position
   */
  const setMapPosition = (lat, lng) => {
    const position = {
      lat: lat,
      lng: lng
    };

    mapInstance.setCenter(position);
    mapInstance.panTo(position);

    // get address only when previous and current lat/lng different
    if (
      mapLastPosition.lat !== position.lat &&
      mapLastPosition.lng !== position.lng
    ) {
      setAddressInput(MSG_CONST.LOADING);

      getAddressFromLatLong(position).then(
        (data, status) => {
          setAddressInput(data.formatted_address);

          // send to parent
          sendToParent(true, data, status);
        },
        (error) => {
          setAddressInput(MSG_CONST.NO_FETCH);

          // send to parent
          sendToParent(false, {}, error);
        }
      );
    }

    // save map last position
    setMapLastPosition(position);
  };

  /**
   * @name getAddressFromLatLong
   * @param {*} position
   * @description get address from Lat Logn (reverse geocoding)
   */
  const getAddressFromLatLong = (position) => {
    const geocoder = new window.google.maps.Geocoder();
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
  };

  /**
   * @name searchByQuery
   * @param {String} query
   * @description search google map address by query
   */
  const searchByQuery = (query) => {
    return new Promise((resolve, reject) => {
      const request = {
        query,
        fields: ["name", "formatted_address", "geometry"]
      };

      const service = new window.google.maps.places.PlacesService(mapInstance);

      console.log("Service", service, mapInstance);

      service.textSearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          resolve(results, status);
        } else {
          reject(status);
        }
      });
    });
  };

  /**
   * @name searchByQueryDebounce
   * @param {String} query
   * @description searchByQuery with debounce time
   */
  let searchByQueryDebounce = (query) => {
    // minimum 3 characters required to search
    if (query && query.length < 3) {
      return;
    }

    setSearchState(SEARCH_STATE.PROGRESS);

    // find map address by query
    searchByQuery(query).then(
      (results) => {
        setSearchResults(results);
        setSearchState(SEARCH_STATE.LOAD);
      },
      () => {
        setSearchResults(searchResults);
        setSearchState(SEARCH_STATE.FAIL);
      }
    );
  };

  /**
   * @name onChangeAddressInput
   * @param {*} value
   * @description input on address input box
   */
  const onChangeAddressInput = (value) => {
    // find map address by query with debounce time
    searchByQueryDebounce(value);
  };

  /**
   * @name sendToParent
   * @param {Boolean} isSuccess
   * @param {*} mapData
   * @param {*} mapStatus
   * @description map data send to parent
   */
  const sendToParent = (isSuccess, mapData, mapStatus) => {
    if (onSelect && typeof onSelect === "function") {
      const data = JSON.parse(JSON.stringify(mapData));
      onSelect(isSuccess, data, mapStatus);
    }
  };

  /**
   * @name selectMapItem
   * @param {*} event
   * @description select map address item
   */
  const selectMapItem = (event) => {
    const closestLiElem = event.target && event.target.closest(".mapItem");
    if (closestLiElem.hasAttribute("index")) {
      const selectedVal =
        searchResults[Number(closestLiElem.getAttribute("index"))];

      setShowMapSearch(false);

      // set marker and map position according to selected location
      setMapPosition(
        selectedVal.geometry.location.lat(),
        selectedVal.geometry.location.lng()
      );
    }
  };

  useEffect(() => {
    if (appKey) {
      // call to insert google map script
      insertMapScript();

      // google map callback
      window.initMapScript = () => {
        console.log("Map script successfull");
        mapInitSuccess();
        searchByQueryDebounce = debounce(searchByQueryDebounce, debounceTime);
      };
    } else {
      console.error("google map appKey not found!!!");
    }
  }, [appKey]);

  useEffect(() => {
    if (mapInstance) {
      setMapPosition(lat, lng);
      addEvents();
      addSearchBox();
    }
  }, [mapInstance]);

  useEffect(() => {
    if (addressInput) {
      addSearchBox();
    }
  }, [addressInput]);

  useEffect(() => {
    return () => {
      removeEvents();
    };
  }, []);

  return (
    <div className={cx(styles.mapContainer, mapClassName)}>
      <div ref={mapElemRef} className={styles.map}>
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

      {hasSearch && !isMapLoadingFailed && !mapSearchPlace && (
        <div ref={defaultSearchPlace} className={styles.defaultSearchPositoin}>
          {/* Map default search place here */}
        </div>
      )}

      {/* Render childrens */}
      {children}

      {showMapSearch && !isMapLoadingFailed && (
        <SearchContainer
          onClose={() => setShowMapSearch(false)}
          onChange={onChangeAddressInput}
          placeholder={searchPlaceHolder}
          className={searchClassName}
        >
          <div className={styles.searchResultContainer}>
            <div className={styles.searchLoading}>
              {searchState === SEARCH_STATE.PROGRESS && "Loading..."}
              {searchState === SEARCH_STATE.FAIL && MSG_CONST.NO_RESULT}
            </div>

            <ul
              onClick={selectMapItem}
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
};

// define component prop types
GMapify.propTypes = {
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
  onSelect: PropTypes.func,
  children: PropTypes.element
};

// define default values of prop types
GMapify.defaultProps = {
  appKey: "",
  lat: DEFAULT_LAT_LONG.lat,
  lng: DEFAULT_LAT_LONG.lng,
  mapOptions: {},
  mapClassName: "",
  hasMarker: DEFAULT_HAS_MARKER,
  hasSearch: DEFAULT_HAS_SEARCH,
  mapSearchPlace: "",
  debounceTime: DEFAULT_DEBOUNCE_TIME, // time in ms
  inputClassName: "",
  markerIcon: DEFAULT_MARKER_ICON,
  searchPlaceHolder: DEFAULT_SEARCH_PLACEHOLDER,
  searchClassName: "",
  libraries: DEFAULT_LIBRARY_MODE,
  onSelect: () => {},
  children: null
};

export default GMapify;
