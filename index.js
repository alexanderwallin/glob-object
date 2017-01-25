/*!
 * glob-object <https://github.com/jonschlinkert/glob-object>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var utils = require('./utils');

function globObject(patterns, obj, opts) {
  var matches = getMatches(patterns, obj, opts);

  return matches.reduce(function(acc, path) {
    var key = toDots(path);
    utils.set(acc, key, utils.get(obj, key));
    return acc;
  }, {});
}

function getMatches(patterns, obj, opts) {
  patterns = arrayify(patterns).map(toSlashes);
  var keys = utils.stringify(obj, '/');
  var matches = utils.mm(keys, patterns, opts);
  return matches.map(toDots);
}

function toSlashes(key) {
  return key.split('.').join('/');
}

function toDots(key) {
  return key.split('/').join('.');
}

function arrayify(val) {
  return val ? (Array.isArray(val) ? val : [val]) : [];
}

/**
 * Expose `globObject`
 */

module.exports = globObject;
module.exports.globObject = globObject;
module.exports.getMatches = getMatches;
