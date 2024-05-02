let isMapLoaded = false;
let isMapLoadPending = false;
let scriptElem = null;
const resolveList = [];
const rejectList = [];

const getMapScript = (apiKey, libraries) =>
  `https://apis.mapmyindia.com/advancedmaps/v1/f2febcb102cd6a7c1c8f91e3f53ed36a/map_sdk?layer=vector&v=3.0&callback=initMapScript`;

/**
 * @function notifyAll
 * @param {boolean} isResolve
 * @description notify all components that the map script has been downloaded
 */
const notifyAll = (isResolve) => {
  if (isResolve) {
    for (let i = 0; i < resolveList.length; i++) {
      resolveList[i]();
    }
  } else {
    for (let i = 0; i < rejectList.length; i++) {
      rejectList[i](new Error("Map script not loaded"));
    }
  }
  resolveList.length = 0;
  rejectList.length = 0;
};

/**
 * @function injectMapScript
 * @param {string} apiKey
 * @param {string} libraries
 * @description download map script file
 */
/**
 * @function injectMapScript
 * @param {string} apiKey
 * @description download map script file
 */
const injectMapScript = (apiKey) => {
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
      scriptElem.src = getMapScript(apiKey);
      scriptElem.setAttribute("id", "mapmyindia-map");
      document.querySelector("head").appendChild(scriptElem);
      isMapLoadPending = true;
    }
  });
};

/**
 * @name getAddressFromLatLong
 * @param {*} position
 * @description get address from Lat Long (reverse geocoding)
 */
const getAddressFromLatLong = (position) => {
  return new Promise((resolve, reject) => {
    fetch(
      `https://apis.mapmyindia.com/advancedmaps/v1/245b57d4-3684-4fd5-9f32-84d26f054bb6/rev_geocode?lat=${position.lat}&lng=${position.lng}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer YOUR_MAPMYINDIA_REST_API_KEY"
        }
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.responseCode === 200) {
          resolve(data.results[0]);
        } else {
          reject(data.error_message);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export { getMapScript, injectMapScript, getAddressFromLatLong };
