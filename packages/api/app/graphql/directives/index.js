const fs = require("fs");
const path = require("path");
const _ = require("lodash");

const directives = {};
const basename = path.basename(module.filename);

/**
 * load all directives
 *
 * @return {[type]} [description]
 */
const init = () => {
  fs.readdirSync(path.join(__dirname))
    .filter(file => {
      return (
        file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
      );
    })
    .forEach(file => {
      let importPath = path.join(__dirname, file);

      const content = require(importPath);
      const filename = file.replace(".js", "");
      directives[filename] = content;
    });
};

init();

module.exports = directives;
