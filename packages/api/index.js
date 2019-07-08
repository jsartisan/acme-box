const moduleAlias = require("module-alias");

/**
 * registring aliases of folders
 */
moduleAlias.addAliases({
  "@root": `.`,
  "@app": `${__dirname}/app`,
  "@config": `${__dirname}/config`
});

const app = require("@app/bootstrap/app");

module.exports = app;
