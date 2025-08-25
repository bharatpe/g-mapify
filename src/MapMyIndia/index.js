import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  useCallback
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
  DEFAULT_DEBOUNCE_TIME,
  DEFAULT_HAS_MARKER,
  DEFAULT_HAS_SEARCH,
  DEFAULT_SEARCH_PLACEHOLDER,
  DEFAULT_LIBRARY_MODE
} from "../constants";
import { injectMMIMapScript } from "../utils/common";
import SearchComponent from "../components/SearchComponent";

const MapMyIndia = forwardRef((props, ref) => {
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
  const [markerInstance, setMarkerInstance] = useState(null);

  if (customMarkers && customMarkers.length > 0) {
    lat = customMarkers[0][0];
    lng = customMarkers[0][1];
  }

  // store mapmyindia map render element instance
  const mapElemRef = useRef(null);
  let defaultSearchPlace = useRef(null);

  /**
   * @name mapInitSuccess
   * @description mapmyindia map script file added successfully
   */
  const mapInitSuccess = () => {
    if (mapSearchPlace) {
      defaultSearchPlace = { current: document.querySelector(mapSearchPlace) };
    }
    createMapInstance(lat, lng);
  };

  /**
   * @name insertMapScript
   * @description add mapmyindia map script file to project
   */
  const insertMapScript = () => {
    // error occured in Google Map loading
    // window.gm_authFailure = () => {
    //   setIsMapLoadingFailed(true);
    //   sendToParent(false, { message: MSG_CONST.MAP_NOT_LOADED }, -1);
    // };
    injectMMIMapScript(appKey, libraries)
      .then(() => {
        mapInitSuccess();
        setIsMapLoadingFailed(false);
      })
      .catch(() => {
        console.error("mmi library loading error!");
      });
  };

  /**
   * @name createMapInstance
   * @param {Float} lat
   * @param {Float} lng
   * @description create map instance
   */
  const createMapInstance = (lat, lng) => {
    if (!window.mappls) {
      console.error("MapmyIndia map library not found!");
      return;
    }

    // const center = new window.mappls.LatLng(lat, lng);

    const map = new window.mappls.Map("map", {
      center: [lat, lng],
      zoom: 15, // Set the default zoom level
      zoomControl: true,
      location: true,
      fullscreenControl: false,
      ...mapOptions
    });

    // create mapmyindia map instance
    if (mapElemRef.current) {
      setMapInstance(map);
      setMarkerInstance(
        new window.mappls.Marker({
          map: map,
          position: {
            lat: lat,
            lng: lng
          },
          // fitbounds: true,
          icon_url: "https://apis.mapmyindia.com/map_v3/1.png"
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

  const dragEnd = useCallback(() => {
    const center = mapInstance.getCenter();
    setMapPosition(center.lat, center.lng);
    markerInstance.setPosition(center);
  });

  const drag = useCallback(() => {
    const center = mapInstance.getCenter();

    markerInstance.setPosition(center);
  });

  /**
   * @name addEvents
   * @description add events to mapmyindia map
   */
  const addEvents = () => {
    if (mapInstance && hasMarker && autoCenter) {
      mapInstance.on("dragend", dragEnd);
      mapInstance.on("drag", drag);
    }
  };

  /**
   * @name removeEvents
   * @description remove events from mapmyindia map
   */
  const removeEvents = () => {
    if (mapInstance) {
      console.log("remove");
      mapInstance.off("dragend", dragEnd);
      mapInstance.off("drag", drag);
    }
  };

  /**
   * @name setMapPosition
   * @param {Float} lat
   * @param {Float} lng
   * @description set mapmyindia map position
   */
  const setMapPosition = (lat, lng) => {
    const position = new window.mappls.LatLng(lat, lng);
    console.log("MMI");
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
   * @description search mapmyindia map address by query
   */
  const searchByQuery = (query) => {
    return new Promise((resolve, reject) => {
      const options = {
        query
      };

      window.mappls.search(
        options,
        (data) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
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
    const closestLiElem = event.target.closest(".mapItem");
    if (closestLiElem && closestLiElem.hasAttribute("index")) {
      const selectedVal =
        searchResults[Number(closestLiElem.getAttribute("index"))];

      setShowMapSearch(false);

      // set marker and map position according to selected location
      setMapPosition(selectedVal.latitude, selectedVal.longitude);
    }
  };

  const addMarkers = () => {
    if (customMarkers) {
      let infowindow = null;
      customMarkers.forEach((item) => {
        const marker = new window.mappls.Map.Marker([item[0], item[1]], {
          icon: window.mappls.Map.marker({
            iconUrl: markerIcon,
            iconSize: [32, 32]
          })
        }).addTo(mapInstance);

        if (item[2]) {
          marker.on("click", () => {
            if (allowSinglePopup && infowindow) {
              infowindow.remove();
            }

            infowindow = window.L.popup().setContent(item[2]);
            marker.bindPopup(infowindow).openPopup();
          });
        }
      });
    }
  };

  useEffect(() => {
    if (appKey) {
      // call to insert mapmyindia map script
      insertMapScript();
    } else {
      console.error("MapmyIndia map apiKey not found!!!");
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
    <div className={cx(styles.mapContainer, mapClassName)} id="map">
      <div ref={mapElemRef} className={styles.map}>
        {/* map coming here */}
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
                  <li key={index} className={cx(styles.mapItem, "mapItem")}>
                    <div className={styles.searchH1}>{val.placeName}</div>
                    <div className={styles.searchH2}>{val.displayPlace}</div>
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
MapMyIndia.propTypes = {
  apiKey: PropTypes.string,
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
MapMyIndia.defaultProps = {
  appKey: "",
  useMapMyIndia: false,
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

export default MapMyIndia;
