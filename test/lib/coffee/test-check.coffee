'use strict';
assert = require 'assert'
optimize = require '../../../lib'
check = optimize.check
{verify, OPTIMIZED, NOT_OPTIMIZED} = require '../../helpers'

describe 'test optimize.check', ->

  verify
    name  : 'with non-optimized function'
    fn    : -> [].slice.call arguments ; return
    # args: no args
    # context: no context
    answer: NOT_OPTIMIZED()

  do ->
    fnOptimized = ->
    optimize fnOptimized

    verify
      name  : 'with optimized function'
      fn    : fnOptimized
      # args: no args
      # context: no context
      answer: OPTIMIZED()

    return

  return
