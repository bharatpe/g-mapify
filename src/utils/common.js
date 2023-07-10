let isMapLoaded = false;
let isMapLoadPending = false;
let scriptElem = null;
const resolveList = [];
const rejectList = [];

const getMapScript = (appKey, libraries) =>
  `https://maps.googleapis.com/maps/api/js?key=${appKey}&callback=initMapScript&libraries=${libraries}`;

/**
 * @function notifyAll
 * @param {boolean} isResolve
 * @description notify all component to map script downloaded
 */
const notifyAll = (isResolve) => {
  if (isResolve) {
    for (let i = 0; i < resolveList.length; i++) {
      resolveList[i]();
    }
  } else {
    for (let i = 0; i < rejectList.length; i++) {
      rejectList[i](new Error("map script not loaded"));
    }
  }
  resolveList.length = 0;
  rejectList.length = 0;
};

/**
 * @function injectMapScript
 * @param {string} appKey
 * @param {string} libraries
 * @description download map script file
 */
const injectMapScript = (appKey, libraries) => {
  if (isMapLoaded) return Promise.resolve();

  return new Promise((resolve, reject) => {
    if (!window.initMapScript) {
      window.initMapScript = () => {
        console.log("Map script successful");
        notifyAll(true);
      };
    }

    resolveList.push(resolve);
    rejectList.push(reject);

    function mapScriptLoadEvent() {
      isMapLoaded = true;
      isMapLoadPending = false;
      scriptElem.setAttribute("loaded", "true");
      scriptElem.removeEventListener("load", mapScriptLoadEvent);
      scriptElem.removeEventListener("error", mapScriptErrorEvent);
    }

    function mapScriptErrorEvent() {
      isMapLoaded = false;
      isMapLoadPending = false;
      scriptElem.setAttribute("loaded", "false");
      scriptElem.removeEventListener("error", mapScriptErrorEvent);
      scriptElem.removeEventListener("load", mapScriptLoadEvent);
      document.head.removeChild(scriptElem);
      notifyAll(false);
    }

    if (!isMapLoadPending) {
      scriptElem = document.createElement("script");
      scriptElem.addEventListener("load", mapScriptLoadEvent);
      scriptElem.addEventListener("error", mapScriptErrorEvent);
      scriptElem.src = getMapScript(appKey, libraries);
      scriptElem.setAttribute("id", "google-map");
      document.querySelector("head").appendChild(scriptElem);
      isMapLoadPending = true;
    }
  });
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
          console.log("results[0]", results[0]);
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

export { getMapScript, injectMapScript, getAddressFromLatLong };
