"use strict";

const _ = require("lodash");
const path = require("path");
const VirtualModulePlugin = require("virtual-module-webpack-plugin");

const RailsTranslationsLoader = require("./RailsTranslationsLoader.js");

class RailsTranslationsPlugin extends VirtualModulePlugin {
  constructor(options = {}) {
    const loader = new RailsTranslationsLoader(options.localesPath, options.pattern);

    super({
      moduleName: path.join(options.root || "", `${_.get(options, "name", "translations")}.js`),
      contents  : `export default ${JSON.stringify(loader.loadTranslations())}`
    });
  }
}

module.exports = RailsTranslationsPlugin;
