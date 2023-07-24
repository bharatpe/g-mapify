import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle
} from "react";
import ReactDOM from "react-dom";
import styles from "./style.css";
import cx from "classnames";
import PropTypes from "prop-types";
import SearchContainer from "../SearchContainer";
import debounce from "../utils/debounce";
import mapmarkerIcon from "../assets/marker.svg";
import {
  SEARCH_STATE,
  MSG_CONST,
  DEFAULT_LAT_LONG,
  DEFAULT_MAP_OPTIONS,
  DEFAULT_DEBOUNCE_TIME,
  DEFAULT_HAS_MARKER,
  DEFAULT_HAS_SEARCH,
  DEFAULT_SEARCH_PLACEHOLDER,
  DEFAULT_LIBRARY_MODE
} from "../constants";
import { injectMapScript } from "../utils/common";
import SearchComponent from "../components/SearchComponent";

const GMapify = forwardRef((props, ref) => {
  const {
    appKey,
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
    onSelect,
    customMarkers,
    autoCenter,
    allowSinglePopup
  } = props;

  let { lat, lng } = props;

  const [searchResults, setSearchResults] = useState([]);
  const [showMapSearch, setShowMapSearch] = useState(false);
  const [searchState, setSearchState] = useState(SEARCH_STATE.LOAD);
  const [isMapLoadingFailed, setIsMapLoadingFailed] = useState(false);
  const [mapLastPosition, setMapLastPosition] = useState({});
  const [addressInput, setAddressInput] = useState("");
  const [mapInstance, setMapInstance] = useState(null);

  if (customMarkers && customMarkers.length > 0) {
    lat = customMarkers[0][0];
    lng = customMarkers[0][1];
  }

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
    // error occured in Google Map loading
    window.gm_authFailure = () => {
      setIsMapLoadingFailed(true);
      sendToParent(false, { message: MSG_CONST.MAP_NOT_LOADED }, -1);
    };

    injectMapScript(appKey, libraries)
      .then(() => {
        mapInitSuccess();
        setIsMapLoadingFailed(false);
      })
      .catch(() => {
        console.error("google map library loading error!");
      });
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
          <SearchComponent
            value={addressInput}
            onClick={() => setShowMapSearch(true)}
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
    if (mapInstance && hasMarker && autoCenter) {
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

      const data = {
        geometry: {
          location: {
            lat: lat,
            lng: lng
          }
        }
      };
      sendToParent(true, data, true);

    }

    // save map last position
    setMapLastPosition(position);
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
  const searchByQueryDebounce = debounce((query) => {
    // minimum 3 characters required to search
    if (query && query.length < 3) {
      return;
    }

    setSearchState(SEARCH_STATE.PROGRESS);
    setSearchResults([]);

    // find map address by query
    searchByQuery(query).then(
      (results) => {
        setSearchResults(results);
        setSearchState(SEARCH_STATE.LOAD);
      },
      () => {
        setSearchState(SEARCH_STATE.FAIL);
      }
    );
  }, debounceTime);

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

  const addMarkers = () => {
    if (customMarkers) {
      let infowindow = null;
      customMarkers.forEach((item) => {
        // eslint-disable-next-line no-new
        const marker = new window.google.maps.Marker({
          position: new window.google.maps.LatLng(item[0], item[1]),
          map: mapInstance,
          title: "Hello World!",
          visible: true,
          icon: markerIcon
        });

        if (item[2]) {
          marker.addListener("click", () => {
            if (allowSinglePopup && infowindow) {
              infowindow.close();
            }

            infowindow = new window.google.maps.InfoWindow({
              content: item[2]
            });
            infowindow.open(mapInstance, marker);
          });
        }

        marker.setMap(mapInstance);
      });
    }
  };

  useEffect(() => {
    if (appKey) {
      // call to insert google map script
      insertMapScript();
    } else {
      console.error("google map appKey not found!!!");
    }
  }, [appKey]);

  useEffect(() => {
    if (mapInstance) {
      setMapPosition(lat, lng);
      addSearchBox();
      addMarkers();
    }
  }, [mapInstance]);

  useEffect(() => {
    if (addressInput) {
      addSearchBox();
    }
  }, [addressInput]);

  useEffect(() => {
    addEvents();
    return () => {
      removeEvents();
    };
  }, [mapLastPosition]);

  useImperativeHandle(ref, () => ({
    latLongFromQuery: async (query) => {
      return await searchByQuery(query, mapInstance);
    }
  }));

  return (
    <div className={cx(styles.mapContainer, mapClassName)}>
      <div ref={mapElemRef} className={styles.map}>
        {/* map comming here */}
      </div>

      {/* map marker icon */}
      {hasMarker && autoCenter && !isMapLoadingFailed && (
        <div
          className={styles.markerIcon}
          style={{ backgroundImage: `url(${markerIcon})` }}
        >
          &nbsp;
        </div>
      )}

      {hasSearch && !isMapLoadingFailed && !mapSearchPlace && (
        <div ref={defaultSearchPlace} className={styles.defaultSearchPosition}>
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
});

// define component prop types
GMapify.propTypes = {
  appKey: PropTypes.string,
  lat: PropTypes.number,
  lng: PropTypes.number,
  mapOptions: PropTypes.object,
  mapClassName: PropTypes.string,
  hasMarker: PropTypes.bool,
  hasSearch: PropTypes.bool,
  autoCenter: PropTypes.bool,
  mapSearchPlace: PropTypes.string,
  debounceTime: PropTypes.number,
  inputClassName: PropTypes.string,
  markerIcon: PropTypes.string,
  searchPlaceHolder: PropTypes.string,
  searchClassName: PropTypes.string,
  libraries: PropTypes.string,
  onSelect: PropTypes.func,
  children: PropTypes.element,
  customMarkers: PropTypes.array,
  allowSinglePopup: PropTypes.bool
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
  autoCenter: true,
  mapSearchPlace: "",
  debounceTime: DEFAULT_DEBOUNCE_TIME, // time in ms
  inputClassName: "",
  markerIcon: mapmarkerIcon,
  searchPlaceHolder: DEFAULT_SEARCH_PLACEHOLDER,
  searchClassName: "",
  libraries: DEFAULT_LIBRARY_MODE,
  onSelect: () => {},
  children: null,
  customMarkers: [],
  allowSinglePopup: true
};

export default GMapify;
