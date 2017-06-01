'use strict';
var NOT_OPTIMIZED, OPTIMIZED, assert, optimize, ref, verify,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

assert = require('assert');

optimize = require('../../../lib');

ref = require('../../helpers'), verify = ref.verify, OPTIMIZED = ref.OPTIMIZED, NOT_OPTIMIZED = ref.NOT_OPTIMIZED;

describe('test optimize', function() {
  var ref1;
  verify({
    name: 'should optimize a simple function',
    fn: function() {},
    answer: OPTIMIZED()
  });
  verify({
    name: 'should optimize a function with a number arg',
    fn: function(a) {
      return a / 10;
    },
    args: [100],
    answer: OPTIMIZED()
  });
  verify({
    name: 'should optimize a function with a string arg',
    fn: function(s) {
      return s.toUpperCase();
    },
    args: ['test'],
    answer: OPTIMIZED()
  });
  if (ref1 = process.versions.node[0], indexOf.call([], ref1) >= 0) {
    (function() {
      var other;
      other = function() {};
      verify({
        name: 'should NOT optimize a function passing arguments to another function (w/out context)',
        fn: function() {
          other.apply(this, arguments);
        },
        args: ['a', 'b'],
        answer: NOT_OPTIMIZED()
      });
      verify({
        name: 'should NOT optimize a function passing arguments to another function (w/context)',
        fn: function() {
          var args;
          args = other.apply(this, arguments);
        },
        args: ['a', 'b'],
        context: {},
        answer: NOT_OPTIMIZED()
      });
    })();
  }
  it('should NOT optimize a function with eval (unless it\'s Node 4 or 8)', function() {
    var answer, fnEval, ref2, result;
    fnEval = function(s) {
      eval('');
    };
    answer = NOT_OPTIMIZED();
    if ((ref2 = process.versions.node[0]) === '4' || ref2 === '7' || ref2 === '8') {
      answer.optimized = true;
      answer.TurboFan = true;
      if (answer.mask != null) {
        answer.mask = 49;
      }
    }
    result = optimize(fnEval, ['blah']);
    return assert.deepEqual(result, answer);
  });
});
