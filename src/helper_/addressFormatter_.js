// convert google map components array into object for easy to use
function addressFormatter_(components = []) {
  return formatter(components);
}

// format google map address components using recursion function
function formatter(components = [], currentPos = 0, returnObj = {}) {
  const component = components[currentPos];

  if (components.length > currentPos) {
    for (const type of component.types) {
      switch (type) {
        case "postal_code":
          returnObj.pin = component.long_name;
          break;
        case "country":
          returnObj.country = component.long_name;
          break;
        case "administrative_area_level_1":
          returnObj.state = component.long_name;
          break;
        case "locality":
          returnObj.locality = component.long_name;
          break;
        case "sublocality":
          returnObj.sublocality = returnObj.sublocality
            ? `${returnObj.sublocality}, ${component.long_name}`
            : component.long_name;
          break;
      }
    }

    return formatter(components, ++currentPos, returnObj);
  } else {
    return returnObj;
  }
}

export default addressFormatter_;
