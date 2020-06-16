// Default lat, lng for map
const DEFAULT_LAT_LONG = {
  lat: 28.7041,
  lng: 77.1025
};

const DEFAULT_DEBOUNCE_TIME = 1000;
const DEFAULT_HAS_MARKER = true;
const DEFAULT_HAS_SEARCH = false;
const DEFAULT_SEARCH_PLACEHOLDER = "Search here";
const DEFAULT_LIBRARY_MODE = "places";
const DEFAULT_MARKER_ICON =
  "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png";

const DEFAULT_MAP_OPTIONS = {
  zoom: 15,
  zoomControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
  streetViewControl: false,
  clickableIcons: false,
  mapTypeId: "roadmap"
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

export {
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
};
