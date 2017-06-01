'use strict';
var NOT_OPTIMIZED, OPTIMIZED, assert, check, optimize, ref, verify;

assert = require('assert');

optimize = require('../../../lib');

check = optimize.check;

ref = require('../../helpers'), verify = ref.verify, OPTIMIZED = ref.OPTIMIZED, NOT_OPTIMIZED = ref.NOT_OPTIMIZED;

describe('test optimize.check', function() {
  verify({
    name: 'with non-optimized function',
    fn: function() {
      [].slice.call(arguments);
    },
    answer: NOT_OPTIMIZED()
  });
  (function() {
    var fnOptimized;
    fnOptimized = function() {};
    optimize(fnOptimized);
    verify({
      name: 'with optimized function',
      fn: fnOptimized,
      answer: OPTIMIZED()
    });
  })();
});
