'use strict';
var NOT_OPTIMIZED, OPTIMIZED, assert, optimize, ref, verify;

assert = require('assert');

optimize = require('../../../lib');

ref = require('../../helpers'), verify = ref.verify, OPTIMIZED = ref.OPTIMIZED, NOT_OPTIMIZED = ref.NOT_OPTIMIZED;

describe('test param reassignment STRICT', function() {
  verify({
    name: 'should optimize with null check param reassignment',
    fn: function fnNullReassign(a) { if (a === void 0) a = {}; },
    args: ['a'],
    answer: OPTIMIZED()
  });
  verify({
    name: 'should optimize a function with null check',
    fn: function(a, b) {
      return b != null ? b : b = {};
    },
    args: [
      {
        blah: 'blah'
      }
    ],
    answer: OPTIMIZED()
  });
  verify({
    name: 'should optimize with an `arguments` based param reassignment (null args) (strict)',
    fn: function(a) {
      if (arguments.length < 1) {
        a = {};
      }
      if (a === 123) {
        console.log('easy as 123');
      }
    },
    answer: OPTIMIZED()
  });
  verify({
    name: 'should optimize with an arguments.length based param reassignment (empty array args) (strict)',
    fn: function(a) {
      if (arguments.length < 1) {
        a = {};
      }
      if (a === 123) {
        console.log('easy as 123');
      }
    },
    args: [],
    answer: OPTIMIZED()
  });
  verify({
    name: 'should optimize with an arguments.length based param reassignment (one args) (strict)',
    fn: function(a) {
      if (arguments.length < 1) {
        a = {};
      }
      if (a === 123) {
        console.log('easy as 123');
      }
    },
    args: ['a'],
    answer: OPTIMIZED()
  });
  verify({
    name: 'should optimize with an arguments.length based param reassignment (two args) (strict)',
    fn: function(a) {
      if (arguments.length < 1) {
        a = {};
      }
      if (a === 123) {
        console.log('easy as 123');
      }
    },
    args: ['a', 'b'],
    answer: OPTIMIZED()
  });
  verify({
    name: 'should NOT optimize an arguments[#] null check based var assignment WHEN index is INVALID',
    fn:  function() {
      var a = arguments[0]
        , b = arguments[1] !== null ? arguments[1] : {}
    }
    ,
    args: ['a'],
    answer: NOT_OPTIMIZED()
  });
  verify({
    name: 'should optimize an arguments[#] null check based var assignment WHEN index is valid',
    fn: function() {
      var a = arguments[0]
        , b = arguments[1] !== null ? arguments[1] : {}
    }
    ,
    args: ['a', 'b'],
    answer: OPTIMIZED()
  });
  verify({
    name: 'should NOT optimize an || style null check based var assignment WHEN index is INVALID',
    fn: function() { var a = arguments[0] || {}; },
    answer: NOT_OPTIMIZED()
  });
  verify({
    name: 'should NOT optimize an || style null check based var assignment WHEN index is INVALID',
    fn: function() { var a = arguments[0] || {}; },
    args: [],
    answer: NOT_OPTIMIZED()
  });
  verify({
    name: 'should optimize an || style null check based var assignment WHEN index is valid',
    fn: function() { var a = arguments[0] || {}; },
    args: ['a'],
    answer: OPTIMIZED()
  });
  verify({
    name: 'should optimize an || style null check based param reassignment',
    fn: function(a) { a = a || {}; },
    args: ['a'],
    answer: OPTIMIZED()
  });
});
