// Generated by CoffeeScript 1.12.1
'use strict';
var NOT_OPTIMIZED, OPTIMIZED, assert, optimize, ref, verify;

assert = require('assert');

optimize = require('../../../lib');

ref = require('../../helpers'), verify = ref.verify, OPTIMIZED = ref.OPTIMIZED, NOT_OPTIMIZED = ref.NOT_OPTIMIZED;

describe('test arguments slicing', function() {

  verify({
    name: 'should NOT optimize slicing arguments with Array.prototype.slice',
    fn: function() {
      var args;
      args = Array.prototype.slice.call(arguments);
    },
    args: [
      {
        blah: 'blah'
      }, 'b', 3
    ],
    answer: NOT_OPTIMIZED
  });

  verify({
    name: 'should NOT optimize slicing arguments with [].slice',
    fn: function() {
      var args;
      args = [].slice.call(arguments);
    },
    args: [
      {
        blah: 'blah'
      }, 'b', 3
    ],
    answer: NOT_OPTIMIZED
  });

  verify({
    name: 'should NOT optimize slicing arguments with [].slice and a start index',
    fn: function() {
      var args;
      args = [].slice.call(arguments, 1);
    },
    args: [
      {
        blah: 'blah'
      }, 'b', 3
    ],
    answer: NOT_OPTIMIZED
  });

  verify({
    name: 'should NOT optimize slicing arguments with [].slice with start/end indexes',
    fn: function() {
      var args;
      args = [].slice.call(arguments, 1, 2);
    },
    args: [
      {
        blah: 'blah'
      }, 'b', 3
    ],
    answer: NOT_OPTIMIZED
  });

  verify({
    name: 'should optimize using Array.apply to create arguments as an array',
    fn: function() {
      var args;
      args = Array.apply(null, arguments);
    },
    args: ['a', 'b'],
    answer: OPTIMIZED
  });

  verify({
    name: 'should optimize using Array.apply and truncating length',
    fn: function() {
      var args;
      args = Array.apply(null, arguments);
      args.length = 2;
    },
    args: [
      {
        blah: 'blah'
      }, 'b', 3
    ],
    answer: OPTIMIZED
  });

  verify({
    name: 'should optimize creating with array loop to slice only part of arguments',
    fn: function() {
      var arg, args, i, index, len;
      args = new Array(Math.max(arguments.length, 2));
      for (index = i = 0, len = arguments.length; i < len; index = ++i) {
        arg = arguments[index];
        if ((1 <= index && index < 3)) {
          args[args.length] = arg;
        }
      }
      return args;
    },
    args: [
      {
        blah: 'blah'
      }, 'b', 3, (function() {})
    ],
    answer: OPTIMIZED
  });

  // NOTE: copied from above and changed by hand to a better JS version
  verify({
    name: 'should optimize creating with array loop to slice only part of arguments',
    fn: function() {
      var args;
      args = new Array(Math.max(arguments.length, 2));
      for (var i = 0; i < arguments.length; ++i) {
        if (1 <= i && i < 3) {
          args[args.length] = arguments[i];
        }
      }
      return args;
    },
    args: [{blah: 'blah'}, 'b', 3, (function() {})],
    answer: OPTIMIZED
  });

});
