'use strict';
var node, verify;

verify = require('../../helpers').verify;
node   = require('../../helpers').node;

describe('test arguments slicing', function() {
  verify({ // 8-9 optimizes
    name: 'optimize slicing arguments with Array.prototype.slice',
    fn: function() {
      var args;
      args = Array.prototype.slice.call(arguments);
    },
    args: [
      {
        blah: 'blah'
      },
      'b',
      3
    ],
    // context: no context
    answer: (8 <= node)
  });
  verify({ // 8-9 optimizes
    name: 'optimize slicing arguments with [].slice',
    fn: function() {
      var args;
      args = [].slice.call(arguments);
    },
    args: [
      {
        blah: 'blah'
      },
      'b',
      3
    ],
    // context: no context
    answer: (8 <= node)
  });
  verify({ // 8-9 optimizes
    name: 'optimize slicing arguments with [].slice and a start index',
    fn: function() {
      var args;
      args = [].slice.call(arguments, 1);
    },
    args: [
      {
        blah: 'blah'
      },
      'b',
      3
    ],
    // context: no context
    answer: (8 <= node)
  });
  verify({ // 8-9 optimizes
    name: 'optimize slicing arguments with [].slice with start/end indexes',
    fn: function() {
      var args;
      args = [].slice.call(arguments, 1, 2);
    },
    args: [
      {
        blah: 'blah'
      },
      'b',
      3
    ],
    // context: no context
    answer: (8 <= node)
  });
  verify({ // 4-9 optimizes
    name: 'optimize using Array.apply to create arguments as an array',
    fn: function() {
      var args;
      args = Array.apply(null, arguments);
    },
    args: ['a', 'b'],
    // context: no context
    answer: true
  });
  verify({ // 4-9 optimizes
    name: 'optimize using Array.apply and truncating length',
    fn: function() { // keep only first 2 via truncating
      var args;
      args = Array.apply(null, arguments);
      args.length = 2;
    },
    args: [
      {
        blah: 'blah'
      },
      'b',
      3
    ],
    // context: no context
    answer: true
  });
  verify({ // 4-9 optimizes
    name: 'optimize creating with array loop to slice only part of arguments',
    fn: function() { // keep only middle 2
      var arg, args, i, index, len;
      args = new Array(Math.max(arguments.length, 2)); //   like slice(1, 3)
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
      },
      'b',
      3,
      (function() {})
    ],
    // context: no context
    answer: true
  });
});
