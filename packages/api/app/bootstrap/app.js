const path = require("path");
const express = require("express");

const config = require("@config");
const graphql = require("./graphql");
const database = require("./database");

const app = express();

/*
|--------------------------------------------------------------------------
| Setting the static folder
|--------------------------------------------------------------------------
|
| tell express to use the folder as static.
*/
app.use("/public", express.static(path.join(__dirname, "../public")));

/*
|--------------------------------------------------------------------------
| Setting views folder
|--------------------------------------------------------------------------
|
| tell express which folder to use as views
*/
app.set("views", path.join(__dirname, "../views"));

/*
|--------------------------------------------------------------------------
| connect to database
|--------------------------------------------------------------------------
|
| connects with database based on the env
*/
database.connect();

/*
|--------------------------------------------------------------------------
| Boot Graphl server
|--------------------------------------------------------------------------
|
| /graphl
*/
graphql.boot(app);

/*
|--------------------------------------------------------------------------
| Turn On The Lights
|--------------------------------------------------------------------------
|
| start the express server to listen on the port
*/
app.listen(config.app.port, () => console.log(`🔥 App listening on port ${config.app.port}! 🚀`));

module.exports = app;
