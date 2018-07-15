var node, verify;

verify = require('../../helpers').verify;
node   = require('../../helpers').node;

describe('test param reassignment SLOPPY', function() {
  verify({
    name: 'optimize with null check param reassignment',
    fn: function fnNullReassign(a) { if (a === void 0) a = {}; },
    args: ['a'],
    // context: no context
    answer: true
  });
  verify({
    name: 'optimize a function with null check',
    fn: function(a, b) {
      return b != null ? b : b = {};
    },
    args: [
      {
        blah: 'blah'
      }
    ],
    // context: no context
    answer: true
  });
  verify({
    name: 'optimize with an `arguments` based param reassignment (null args)',
    fn: function(a) {
      if (arguments.length < 1) {
        a = {};
      }
      if (a === 123) {
        console.log('easy as 123');
      }
    },
    // args: no arg
    // context: no context
    answer: (function () {
      // node 8/9 optimize it
      if (node === 8 || node === 9) return true

      // node 10 doesn't optimize it as of 10.6.0
      else if (node === 10) return {
        // spescific to node 10
        interpreted: true,
        mask: 65,
        // the usuals
        function: true,
        maybe: false,
        optimized: false,
        always: false,
        TurboFan: false
      }

      // defaults to false
      else return false
    })()

  });
  verify({
    name: 'optimize with an arguments.length based param reassignment (empty array args)',
    fn: function(a) {
      if (arguments.length < 1) {
        a = {};
      }
      if (a === 123) {
        console.log('easy as 123');
      }
    },
    args: [],
    // context: no context
    answer: (function () {
      // node 8/9 optimize it
      if (node === 8 || node === 9) return true

      // node 10 doesn't optimize it as of 10.6.0
      else if (node === 10) return {
        // spescific to node 10
        interpreted: true,
        mask: 65,
        // the usuals
        function: true,
        maybe: false,
        optimized: false,
        always: false,
        TurboFan: false
      }

      // defaults to false
      else return false
    })()
  });
  verify({
    name: 'optimize with an arguments.length based param reassignment (one args)',
    fn: function(a) {
      if (arguments.length < 1) {
        a = {};
      }
      if (a === 123) {
        console.log('easy as 123');
      }
    },
    args: ['a'],
    // context: no context
    answer: node >= 8
  });
  verify({
    name: 'optimize with an arguments.length based param reassignment (two args)',
    fn: function(a) {
      if (arguments.length < 1) {
        a = {};
      }
      if (a === 123) {
        console.log('easy as 123');
      }
    },
    args: ['a', 'b'],
    // context: no context
    answer: node >= 8
  });
  verify({
    name: 'optimize an arguments[#] null check based var assignment WHEN index is INVALID',
    fn:  function() {
      var a = arguments[0]
        , b = arguments[1] !== null ? arguments[1] : {}
    }
    ,
    args: ['a'],
    // context: no context
    answer: node >= 8
  });
  verify({
    name: 'optimize an arguments[#] null check based var assignment WHEN index is valid',
    fn: function() {
      var a = arguments[0]
        , b = arguments[1] !== null ? arguments[1] : {}
    }
    ,
    args: ['a', 'b'],
    // context: no context
    answer: true
  });
  verify({
    name: 'optimize an || style null check based var assignment WHEN index is INVALID',
    fn: function() { var a = arguments[0] || {}; },
    // args: no args
    // context: no context
    answer: node >= 8
  });
  verify({
    name: 'optimize an || style null check based var assignment WHEN index is INVALID',
    fn: function() { var a = arguments[0] || {}; },
    args: [],
    // context: no context
    answer: node >= 8
  });
  verify({
    name: 'optimize an || style null check based var assignment WHEN index is valid',
    fn: function() { var a = arguments[0] || {}; },
    args: ['a'],
    // context: no context
    answer: true
  });
  verify({
    name: 'optimize an || style null check based param reassignment',
    fn: function(a) { a = a || {}; },
    args: ['a'],
    // context: no context
    answer: true
  });
});
