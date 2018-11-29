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
});
