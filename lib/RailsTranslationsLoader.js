"use strict";

const _    = require("lodash");
const glob = require("glob");
const path = require("path");
const fs   = require("fs");
const yaml = require("yaml-js");

class RailsTranslationsLoader {
  constructor(localesPath, pattern) {
    this.localesPath = localesPath || '';
    this.pattern = pattern || "**/*.yml";
  }

  loadTranslations() {
    let content = {};
    _.forEach(this.listLocaleFiles(), (file) => {
      let translations = this.loadTranslationsFromFile(file);
      _.forEach(translations, (pairs, locale) => {
        if (!content[locale]) { content[locale] = {}; }
        _.assign(content[locale], pairs);
      });
    });
    return content;
  }

  listLocaleFiles() {
    return glob.sync(this.pattern, { cwd: this.localesPath });
  }

  loadTranslationsFromFile(file) {
    let content = yaml.load(fs.readFileSync(path.join(this.localesPath, file)));
    _.forEach(content, (data, locale) => {
      content[locale] = RailsTranslationsLoader.flattenRailsTranslations(data);
    });
    return content;
  }

  static flattenRailsTranslations(data, prefix = null) {
    let result = [];
    _.forEach(data, (value, key) => {
      let prefixKey = prefix ? `${prefix}.${key}` : key;
      if (_.isPlainObject(value)) {
        _.assign(result, RailsTranslationsLoader.flattenRailsTranslations(value, prefixKey));
      } else {
        result[prefixKey] = value;
      }
    });
    return result;
  }
}

module.exports = RailsTranslationsLoader;
