const getMapScript = (appKey, libraries) =>
  `https://maps.googleapis.com/maps/api/js?key=${appKey}&callback=initMapScript&libraries=${libraries}`;

const injectMapScript = (appKey, libraries) => {
  const scriptElem = document.createElement("script");
  scriptElem.src = getMapScript(appKey, libraries);
  scriptElem.setAttribute("id", "google-map");
  document.querySelector("head").appendChild(scriptElem);
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

export { getMapScript, injectMapScript, getAddressFromLatLong };
