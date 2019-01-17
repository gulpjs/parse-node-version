'use strict';

function parseNodeVersion(version) {
  var match = version.match(/^v(\d{1,2})\.(\d{1,2})\.(\d{1,2})(?:-(.+))?$/);
  if (!match) {
    throw new Error('Unable to parse: ' + version);
  }

  var res = {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
  };
  if (match[4] !== undefined) {
    res.pre = match[4];
  }

  return res;
}

module.exports = parseNodeVersion;
