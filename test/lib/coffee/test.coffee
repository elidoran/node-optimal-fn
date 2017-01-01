'use strict'
assert = require 'assert'
optimize = require '../../../lib'
{verify, OPTIMIZED, NOT_OPTIMIZED} = require '../../helpers'

describe 'test optimize', ->

  verify
    name: 'should optimize a simple function'
    fn  : -> return
    # args: no args
    # context: no context
    answer: OPTIMIZED

  verify
    name: 'should optimize a function with a number arg'
    fn  : (a) -> a/10
    args: [100]
    # context: no context
    answer: OPTIMIZED

  verify
    name: 'should optimize a function with a string arg'
    fn  : (s) -> s.toUpperCase()
    args: ['test']
    # context: no context
    answer: OPTIMIZED

  do ->
    other = -> # do nothing

    verify
      name: 'should NOT optimize a function passing arguments to another function (w/out context)'
      fn  : -> other.apply this, arguments ; return
      args: ['a', 'b']
      # context: no context
      answer: NOT_OPTIMIZED

    verify
      name: 'should NOT optimize a function passing arguments to another function (w/context)'
      fn  : -> args = other.apply this, arguments ; return
      args: ['a', 'b']
      context: {}
      answer: NOT_OPTIMIZED

    return

  # not using `verify` to customize for different node versions
  it 'should NOT optimize a function with eval (unless it\'s Node 4)', ->
    fnEval = (s) -> eval '' ; return
    answer =
      optimized: false
      always: false
      maybe: false
      TurboFan: false

    # Node 4 optimizes this via TurboFan. Node 6/7 do not.
    if process.versions.node[0] is '4'
      answer.optimized = true
      answer.TurboFan = true

    result = optimize fnEval, ['blah']
    assert.deepEqual result, answer

  return
