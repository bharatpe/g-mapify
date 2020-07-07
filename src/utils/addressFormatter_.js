const ADDRESS_TYPE_POSTAL_CODE = "postal_code";
const ADDRESS_TYPE_COUNTRY = "country";
const ADDRESS_TYPE_ADMIN_LEVEL_1 = "administrative_area_level_1";
const ADDRESS_TYPE_LOCALITY = "locality";
const ADDRESS_TYPE_SUB_LOCALITY = "sublocality";
const ADDRESS_TYPE_ROUTE = "route";
const ADDRESS_TYPE_PREMISE = "premise";
const ADDRESS_TYPE_STREET_NUMBER = "street_number";

/**
 * @name formatter
 * @param {Array} components
 * @param {Int} currentPos
 * @param {Object} returnObj
 * @description format google map address components using recursion function
 */
const formatter = (components = [], currentPos = 0, returnObj = {}) => {
  if (components.length < 1) return returnObj;

  const component = components[currentPos];

  if (!component) return returnObj;

  const { long_name: longName, types } = component;

  if (components.length > currentPos) {
    for (const type of types) {
      switch (type) {
        case ADDRESS_TYPE_STREET_NUMBER:
        case ADDRESS_TYPE_PREMISE:
          returnObj.streetNumber = longName;
          break;
        case ADDRESS_TYPE_ROUTE:
          returnObj.route = longName;
          break;
        case ADDRESS_TYPE_POSTAL_CODE:
          returnObj.pin = longName;
          break;
        case ADDRESS_TYPE_COUNTRY:
          returnObj.country = longName;
          break;
        case ADDRESS_TYPE_ADMIN_LEVEL_1:
          returnObj.state = longName;
          break;
        case ADDRESS_TYPE_LOCALITY:
          returnObj.locality = longName;
          break;
        case ADDRESS_TYPE_SUB_LOCALITY:
          returnObj.sublocality = returnObj.sublocality
            ? `${returnObj.sublocality}, ${longName}`
            : longName;
          break;
      }
    }

    return formatter(components, ++currentPos, returnObj);
  } else {
    return returnObj;
  }
};

/**
 * @name addressFormatter_
 * @param {Array} components
 * @description convert google map components array into object for easy to use
 */
const addressFormatter_ = (components = []) => formatter(components);

export default addressFormatter_;
