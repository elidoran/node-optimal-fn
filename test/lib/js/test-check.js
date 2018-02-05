'use strict';
var check, node, optimize, verify;

optimize = require('../../../lib');

check = optimize.check;

verify = require('../../helpers').verify;
node   = require('../../helpers').node;

describe('test optimize.check', function() {
  verify({
    name: 'optimizable function checked',
    fn: function() {
      return {
        // TODO: find a way to prevent optimization.
        // I tried these already:
        //   https://github.com/petkaantonov/bluebird/wiki/Optimization-killers
        // prevents optimization in node 4+6, but not node 8+9
        __proto__: 1
      };
    },
    // args: no args
    // context: no context
    answer: node >= 8
  });
  (function() {
    var fnOptimized;
    fnOptimized = function() {};
    optimize(fnOptimized);
    verify({
      name: 'optimizable function checked',
      fn: fnOptimized,
      // args: no args
      // context: no context
      answer: true
    });
  })();
});
