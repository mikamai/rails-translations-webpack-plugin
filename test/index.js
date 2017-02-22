"use strict";

const chai                    = require("chai");
const expect                  = chai.expect;
const RailsTranslationsPlugin = require("./../lib/index.js");
const path                    = require("path");
const fixturesPath            = path.resolve(__dirname, "./fixtures");

describe("RailsTranslationsPlugin", function() {

  it("is an instance of VirtualModulePlugin", () => {
    const VirtualModulePlugin = require("virtual-module-webpack-plugin");
    expect(Object.getPrototypeOf(RailsTranslationsPlugin)).to
      .equal(VirtualModulePlugin);
  });

  it("by default builds a module in ./translations.json", () => {
    let plugin = new RailsTranslationsPlugin();
    expect(plugin.options.moduleName).to.equal("translations.json");
  });

  it("can generate a json file in any desired position", () => {
    let plugin = new RailsTranslationsPlugin({ root: "app", name: "foo" });
    expect(plugin.options.moduleName).to.equal("app/foo.json");
  });

  it("stores file content as a string", () => {
    let plugin = new RailsTranslationsPlugin({ localesPath: fixturesPath });
    expect(plugin.options.contents).to.be.a("string");
    expect(plugin.options.contents.length).to.be.above(0);
  });

  it("stores a JSON in the file", () => {
    let plugin = new RailsTranslationsPlugin({ localesPath: fixturesPath });
    expect(JSON.parse(plugin.options.contents)).to.be.a("object");
  });

  it("stores all translations grouped by locale code", () => {
    let plugin = new RailsTranslationsPlugin({ localesPath: fixturesPath });
    let json   = JSON.parse(plugin.options.contents);
    expect(Object.keys(json)).to.have.members(["en", "it"]);
  });

  it("stores all values found for a certain locale", () => {
    let plugin = new RailsTranslationsPlugin({ localesPath: fixturesPath });
    let json   = JSON.parse(plugin.options.contents);
    expect(json.en).to.eql({
      good : "morning",
      hello: "world",
      whata: "shouldn't be here"
    });
  });

  it("allows to change the yml pattern", () => {
    let plugin = new RailsTranslationsPlugin({
      localesPath: fixturesPath,
      pattern    : "*.yml"
    });
    let json   = JSON.parse(plugin.options.contents);
    expect(json.en).to.eql({ hello: "world" });
  });
});
