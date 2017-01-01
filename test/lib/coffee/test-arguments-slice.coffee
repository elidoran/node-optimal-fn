'use strict';
assert = require 'assert'
optimize = require '../../../lib'
{verify, OPTIMIZED, NOT_OPTIMIZED} = require '../../helpers'

describe 'test arguments slicing', ->

  verify
    name  : 'should NOT optimize slicing arguments with Array.prototype.slice'
    fn    : -> args = Array.prototype.slice.call arguments ; return
    args  : [{blah:'blah'}, 'b', 3]
    # context: no context
    answer: NOT_OPTIMIZED

  verify
    name  : 'should NOT optimize slicing arguments with [].slice'
    fn    : -> args = [].slice.call arguments ; return
    args  : [{blah:'blah'}, 'b', 3]
    # context: no context
    answer: NOT_OPTIMIZED

  verify
    name  : 'should NOT optimize slicing arguments with [].slice and a start index'
    fn    : -> args = [].slice.call arguments, 1 ; return
    args  : [{blah:'blah'}, 'b', 3]
    # context: no context
    answer: NOT_OPTIMIZED

  verify
    name  : 'should NOT optimize slicing arguments with [].slice with start/end indexes'
    fn    : -> args = [].slice.call arguments, 1, 2 ; return
    args  : [{blah:'blah'}, 'b', 3]
    # context: no context
    answer: NOT_OPTIMIZED

  verify
    name: 'should optimize using Array.apply to create arguments as an array'
    fn  : -> args = Array.apply null, arguments ; return
    args: ['a', 'b']
    # context: no context
    answer: OPTIMIZED

  verify
    name  : 'should optimize using Array.apply and truncating length'
    fn    : -> # keep only first 2 via truncating
      args = Array.apply null, arguments
      args.length = 2
    args  : [{blah:'blah'}, 'b', 3]
    # context: no context
    answer: OPTIMIZED

  verify
    name  : 'should optimize creating with array loop to slice only part of arguments'
    fn    : -> # keep only middle 2
      args = new Array Math.max arguments.length, 2  #   like slice(1, 3)
      args[args.length] = arg for arg,index in arguments when 1 <= index < 3
      return args
    args  : [{blah:'blah'}, 'b', 3, (->)]
    # context: no context
    answer: OPTIMIZED

  return
