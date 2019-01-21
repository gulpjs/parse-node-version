'use strict';

var expect = require('expect');

var parseNodeVersion = require('../');

describe('parseNodeVersion', function() {

  it('takes process.version and returns all numbers', function(done) {
    var nodeVersion = parseNodeVersion(process.version);
    expect(nodeVersion.major).toBeA('number');
    expect(nodeVersion.minor).toBeA('number');
    expect(nodeVersion.patch).toBeA('number');
    done();
  });

  it('takes any string formatted like a v8.8.8 and returns all numbers', function(done) {
    var nodeVersion = parseNodeVersion('v8.8.8');
    expect(nodeVersion.major).toEqual(8);
    expect(nodeVersion.minor).toEqual(8);
    expect(nodeVersion.patch).toEqual(8);
    done();
  });

  it('throws if given an invalid version', function(done) {
    function invalid() {
      parseNodeVersion('8.8.8');
    }

    expect(invalid).toThrow('Unable to parse: 8.8.8');
    done();
  });

  it('matches on exactly the version - it cannot be padded', function(done) {
    function invalid() {
      parseNodeVersion('vv8.8.8');
    }

    expect(invalid).toThrow('Unable to parse: vv8.8.8');
    done();
  });

  it('only matches 2 digits in any position', function(done) {
    function invalid() {
      parseNodeVersion('v8.111.8');
    }

    expect(invalid).toThrow('Unable to parse: v8.111.8');
    done();
  });

  it('matches pre-release label with single identifier', function(done) {
    var nodeVersion = parseNodeVersion('v1.2.3-alpha');
    expect(nodeVersion.major).toEqual(1);
    expect(nodeVersion.minor).toEqual(2);
    expect(nodeVersion.patch).toEqual(3);
    expect(nodeVersion.preRelease).toEqual('alpha');
    done();
  });

  it('matches pre-release label with multiple identifiers', function(done) {
    var nodeVersion = parseNodeVersion('v1.2.3-x.7.z.92');
    expect(nodeVersion.major).toEqual(1);
    expect(nodeVersion.minor).toEqual(2);
    expect(nodeVersion.patch).toEqual(3);
    expect(nodeVersion.preRelease).toEqual('x.7.z.92');
    done();
  });

  it('matches build metadata', function(done) {
    var nodeVersion = parseNodeVersion('v10.15.0+0-b20181231T20014594');
    expect(nodeVersion.major).toEqual(10);
    expect(nodeVersion.minor).toEqual(15);
    expect(nodeVersion.patch).toEqual(0);
    expect(nodeVersion.buildMetadata).toEqual('0-b20181231T20014594');
    done();
  });

  it('matches pre-release label and build metadata', function(done) {
    var nodeVersion = parseNodeVersion('v1.0.0-beta+exp.sha.5114f85');
    expect(nodeVersion.major).toEqual(1);
    expect(nodeVersion.minor).toEqual(0);
    expect(nodeVersion.patch).toEqual(0);
    expect(nodeVersion.preRelease).toEqual('beta');
    expect(nodeVersion.buildMetadata).toEqual('exp.sha.5114f85');
    done();
  });
});
