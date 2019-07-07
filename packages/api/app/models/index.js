const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const basename = path.basename(module.filename);

const db = {};

/**
 * loads every model in the models folder, apply paginate plugin
 * and add to db Object
 *
 * @return {[type]} [description]
 */
const loadModels = () => {
  fs.readdirSync(path.join(__dirname))
    .filter(file => {
      return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js" && file[0] !== ".";
    })
    .forEach(file => {
      let { Schema, options } = require(`./${file}`);
      Schema.plugin(mongoosePaginate);

      const fileName = file.slice(0, -3);
      const model = mongoose.model(fileName, Schema);

      db[fileName] = model;
    });
};

loadModels();

module.exports = db;
