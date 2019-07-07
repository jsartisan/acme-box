const moduleAlias = require("module-alias");

/**
 * registring aliases of folders
 */
moduleAlias.addAliases({
  "@root": `.`,
  "@app": `${__dirname}/app`,
  "@views": `${__dirname}/views`,
  "@config": `${__dirname}/config`,
  "@database": `${__dirname}/database`
});

const app = require("@app/bootstrap/app");

module.exports = app;
