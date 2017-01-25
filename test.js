/*!
 * glob-object <https://github.com/jonschlinkert/glob-object>
 *
 * Copyright (c) 2015 .
 * Licensed under the MIT license.
 */

'use strict';

require('mocha');
require('should');
var assert = require('assert');
var globObject = require('./');
var getMatches = globObject.getMatches;

var fixture = {
  a: {
    b: {
      c: 'd',
      e: 'f',
      g: 'h',
      i: {j: 'k'},
      l: {g: 'k'}
    },
    i: 'j'
  }
};

describe('globObject', function() {
  it('should match properties using wildcards:', function() {
    assert.deepEqual(globObject('a.*', fixture), fixture);
  });

  it('should match properties using braces:', function() {
    assert.deepEqual(globObject('*.{b,i}', fixture), fixture);
    assert.deepEqual(globObject('a.*.{c,e}', fixture), {a: {b: {c: 'd', e: 'f'}}});
  });

  it('should match a nested property using a wildcard:', function() {
    assert.deepEqual(globObject('a.*.g', fixture), {a: {b: {g: 'h'}}});
  });

  it('should match deep properties using globstars', function() {
    assert.deepEqual(globObject('a.**.g', fixture), {a: {b: {g: 'h', l: {g: 'k'}}}});
  });
});

describe('getMatches', function() {
  it('should match properties using wildcards:', function() {
    assert.deepEqual(getMatches('a.*', fixture), ['a.b', 'a.i']);
  });

  it('should match properties using braces:', function() {
    assert.deepEqual(getMatches('*.{b,i}', fixture), ['a.b', 'a.i']);
    assert.deepEqual(getMatches('a.*.{c,e}', fixture), ['a.b.c', 'a.b.e']);
  });

  it('should match a nested property using a wildcard:', function() {
    assert.deepEqual(getMatches('a.*.g', fixture), ['a.b.g']);
  });

  it('should match deep properties using globstars', function() {
    assert.deepEqual(getMatches('a.**.g', fixture), ['a.b.g', 'a.b.l.g']);
  });
})
