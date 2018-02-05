'use strict';
var node, verify;

verify = require('../../helpers').verify;
node   = require('../../helpers').node;

describe('test optimize', function() {
  verify({
    name: 'optimize a simple function',
    fn: function() {},
    // args: no args
    // context: no context
    answer: true
  });
  verify({
    name: 'optimize a function with a number arg',
    fn: function(a) {
      return a / 10;
    },
    args: [100],
    // context: no context
    answer: true
  });
  verify({
    name: 'optimize a function with a string arg',
    fn: function(s) {
      return s.toUpperCase();
    },
    args: ['test'],
    // context: no context
    answer: true
  });
  // if process.versions.node[0] in []
  //   # earlier 4/6/7 did *not* optimize these...
  //   # later releases of all versions *do* optimize these now:
  //   #   4.8+
  //   #   6.10+
  //   #   7.10+
  //   #   8.0+

  //   do ->
  //     other = -> # do nothing

  //     verify
  //       name: 'should NOT optimize a function passing arguments to another function (w/out context)'
  //       fn  : -> other.apply this, arguments ; return
  //       args: ['a', 'b']
  //       # context: no context
  //       answer: false

  //     verify
  //       name: 'should NOT optimize a function passing arguments to another function (w/context)'
  //       fn  : -> args = other.apply this, arguments ; return
  //       args: ['a', 'b']
  //       context: {}
  //       answer: false

  //     return
  verify({
    name: 'optimize a function with eval in it',
    fn: function(s) {
      eval('');
    },
    args: ['test'],
    // context: no context
    // node 4 does optimize it and TurboFan is true...
    answer: node === 4 ? {
      optimized: true,
      TurboFan: true,
      always: false,
      maybe: false
    // newer node's optimize it, node 6 doesn't optimize
    } : node >= 8
  });
});
