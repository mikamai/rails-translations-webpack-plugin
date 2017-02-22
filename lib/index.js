"use strict";

const path                    = require("path");
const VirtualModulePlugin     = require("virtual-module-webpack-plugin");
const RailsTranslationsLoader = require("./RailsTranslationsLoader.js");

class RailsTranslationsPlugin extends VirtualModulePlugin {
  constructor(options = {}) {
    let loader = new RailsTranslationsLoader(options.localesPath, options.pattern);
    super({
      moduleName: path.join(options.root || '', `${options.name || "translations"}.json`),
      contents  : JSON.stringify(loader.loadTranslations())
    });
  }
}

module.exports = RailsTranslationsPlugin;
