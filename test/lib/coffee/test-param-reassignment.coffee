'use strict';

{verify, node} = require '../../helpers'

describe 'test param reassignment STRICT', ->

  verify
    name: 'optimize with null check param reassignment'
    fn  : `function fnNullReassign(a) { if (a === void 0) a = {}; }`
    args: ['a']
    # context: no context
    answer: true

  verify
    name: 'optimize a function with null check'
    fn  : (a,b) -> b ?= {}
    args: [{blah:'blah'}]
    # context: no context
    answer: true

  verify
    name: 'optimize with an `arguments` based param reassignment (null args)'
    fn: (a) ->
      if arguments.length < 1 then a = {}
      if a is 123 then console.log 'easy as 123'
      return
    # args: no arg
    # context: no context
    answer: true

  verify
    name: 'optimize with an arguments.length based param reassignment (empty array args)'
    fn: (a) ->
      if arguments.length < 1 then a = {}
      if a is 123 then console.log 'easy as 123'
      return
    args: []
    # context: no context
    answer: true

  verify
    name: 'optimize with an arguments.length based param reassignment (one args)'
    fn: (a) ->
      if arguments.length < 1 then a = {}
      if a is 123 then console.log 'easy as 123'
      return
    args: ['a']
    # context: no context
    answer: true

  verify
    name: 'optimize with an arguments.length based param reassignment (two args)'
    fn: (a) ->
      if arguments.length < 1 then a = {}
      if a is 123 then console.log 'easy as 123'
      return
    args: ['a', 'b']
    # context: no context
    answer: true

  verify
    name: 'optimize an arguments[#] null check based var assignment WHEN index is INVALID'
    fn: ``` function() {
      var a = arguments[0]
        , b = arguments[1] !== null ? arguments[1] : {}
    }
    ```
    args: ['a']
    # context: no context
    answer: node >= 8

  verify
    name: 'optimize an arguments[#] null check based var assignment WHEN index is valid'
    fn: ```function() {
      var a = arguments[0]
        , b = arguments[1] !== null ? arguments[1] : {}
    }
    ```
    args: ['a', 'b']
    # context: no context
    answer: true


  verify
    name: 'optimize an || style null check based var assignment WHEN index is INVALID'
    fn: `function() { var a = arguments[0] || {}; }`
    # args: no args
    # context: no context
    answer: node >= 8

  verify
    name: 'optimize an || style null check based var assignment WHEN index is INVALID'
    fn: `function() { var a = arguments[0] || {}; }`
    args: []
    # context: no context
    answer: node >= 8

  verify
    name: 'optimize an || style null check based var assignment WHEN index is valid'
    fn: `function() { var a = arguments[0] || {}; }`
    args: ['a']
    # context: no context
    answer: true

  verify
    name: 'optimize an || style null check based param reassignment'
    fn: `function(a) { a = a || {}; }`
    args: ['a']
    # context: no context
    answer: true

  return
