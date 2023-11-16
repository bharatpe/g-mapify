const fs = require("fs");

/**
 * Change package.json file content.
 */
function updatePackageContent() {
  const REPLACE_MAP = {
    '"main": "dist/index.js"': '"main": "index.js"',
    '"module": "dist/index.modern.js"': '"module": "index.modern.js"'
  };

  var data = fs.readFileSync("./dist/package.json", "utf-8");
  for (const key in REPLACE_MAP) {
    data = data.replace(key, REPLACE_MAP[key]);
  }

  fs.writeFileSync("./dist/package.json", data, "utf-8");
}

/**
 * Change the content of dist/build directory after build.
 */
function changeDistContent() {
  updatePackageContent();
}

changeDistContent();
