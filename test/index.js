"use strict";
var assert = require("node:assert");
var { describe, it } = require("node:test");

var parseNodeVersion = require("../");

describe("parseNodeVersion", function () {
  it("takes process.version and returns all numbers", function () {
    var nodeVersion = parseNodeVersion(process.version);
    assert.deepStrictEqual(typeof nodeVersion.major, "number");
    assert.deepStrictEqual(typeof nodeVersion.minor, "number");
    assert.deepStrictEqual(typeof nodeVersion.patch, "number");
  });

  it("takes any string formatted like a v8.8.8 and returns all numbers", function () {
    var nodeVersion = parseNodeVersion("v8.8.8");
    assert.deepStrictEqual(nodeVersion.major, 8);
    assert.deepStrictEqual(nodeVersion.minor, 8);
    assert.deepStrictEqual(nodeVersion.patch, 8);
  });

  it("throws if given an invalid version", function () {
    function invalid() {
      parseNodeVersion("8.8.8");
    }

    assert.throws(invalid, {
      message: "Unable to parse: 8.8.8",
    });
  });

  it("matches on exactly the version - it cannot be padded", function () {
    function invalid() {
      parseNodeVersion("vv8.8.8");
    }

    assert.throws(invalid, {
      message: "Unable to parse: vv8.8.8",
    });
  });

  it("only matches 2 digits in any position", function () {
    function invalid() {
      parseNodeVersion("v8.111.8");
    }

    assert.throws(invalid, {
      message: "Unable to parse: v8.111.8",
    });
  });

  it("always returns strings if no pre-release or build metadata", function () {
    var nodeVersion = parseNodeVersion(process.version);
    assert.deepStrictEqual(typeof nodeVersion.pre, "string");
    assert.deepStrictEqual(nodeVersion.pre, "");
    assert.deepStrictEqual(typeof nodeVersion.build, "string");
    assert.deepStrictEqual(nodeVersion.build, "");
  });

  it("matches pre-release label with single identifier", function () {
    var nodeVersion = parseNodeVersion("v1.2.3-alpha");
    assert.deepStrictEqual(nodeVersion.pre, "alpha");
  });

  it("matches pre-release label with multiple identifiers", function () {
    var nodeVersion = parseNodeVersion("v1.2.3-x.7.z.92");
    assert.deepStrictEqual(nodeVersion.pre, "x.7.z.92");
  });

  it("matches pre-release label with dashes", function () {
    var nodeVersion = parseNodeVersion("v1.2.3-x-7-z.92");
    assert.deepStrictEqual(nodeVersion.pre, "x-7-z.92");
  });

  it("matches build metadata", function () {
    var nodeVersion = parseNodeVersion("v10.15.0+0-b20181231T20014594");
    assert.deepStrictEqual(nodeVersion.build, "0-b20181231T20014594");
  });

  it("matches pre-release label and build metadata", function () {
    var nodeVersion = parseNodeVersion("v1.0.0-beta+exp.sha.5114f85");
    assert.deepStrictEqual(nodeVersion.pre, "beta");
    assert.deepStrictEqual(nodeVersion.build, "exp.sha.5114f85");
  });
});
