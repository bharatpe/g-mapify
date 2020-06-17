export { default as GMapify } from "./Gmapify";
export { default as AddressFormatter } from "./utils/addressFormatter_";

const pjson = require("../package.json");
console.log(
  ` >> 🗺🗺🗺 G-Mapify : Version: ${pjson.version}, Build: ${process.env.NODE_ENV} <<`
);
