const chalk = require("chalk");
const mongoose = require("mongoose");

const config = require("@config");

const error = chalk.bold.yellow;
const connected = chalk.bold.cyan;
const disconnected = chalk.bold.red;
const termination = chalk.bold.magenta;
const databaseUrl = config.database[config.app.env].uri;

/**
 * connect to mongo database
 */
exports.connect = () => {
  mongoose.connect(databaseUrl, { useNewUrlParser: true, useFindAndModify: false });
};

/**
 * on successful connection with database
 */
mongoose.connection.on("connected", function() {
  console.log(connected("Mongoose default connection is open to ", databaseUrl));
});

/**
 * on error in connecting with database
 */
mongoose.connection.on("error", function(err) {
  console.log(error("Mongoose default connection has occured " + err + " error"));
});

/**
 * on disconnect with database
 */
mongoose.connection.on("disconnected", function() {
  console.log(disconnected("Mongoose default connection is disconnected"));
});

/**
 * on close with database due to application database
 */
process.on("SIGINT", function() {
  mongoose.connection.close(function() {
    console.log(termination("Mongoose default connection is disconnected due to application termination"));
    process.exit(0);
  });
});
