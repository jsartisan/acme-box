const { env } = require("@app/utils/helpers");

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | config for development environment
  |--------------------------------------------------------------------------
  */

  development: {
    uri: `mongodb://${env("DB_HOST")}:${env("DB_PORT")}/${env("DB_DATABASE")}`
  },

  /*
  |--------------------------------------------------------------------------
  | config for test environment
  |--------------------------------------------------------------------------
  */
  test: {
    uri: `mongodb://${env("DB_HOST")}:${env("DB_PORT")}/${env("DB_DATABASE")}`
  },

  /*
  |--------------------------------------------------------------------------
  | config for production environment
  |--------------------------------------------------------------------------
  */
  production: {
    uri: `mongodb://${env("DB_HOST")}:${env("DB_PORT")}/${env("DB_DATABASE")}`
  }
};
