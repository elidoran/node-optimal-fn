'use strict'

optimize = require '../../../lib'
check    = optimize.check

{verify, node} = require '../../helpers'

describe 'test optimize.check', ->

  verify
    name  : 'optimizable function checked'
    fn    : ->
      # TODO: find a way to prevent optimization.
      # I tried these already:
      #   https://github.com/petkaantonov/bluebird/wiki/Optimization-killers
      # prevents optimization in node 4+6, but not node 8+9
      return { __proto__: 1 }
    # args: no args
    # context: no context
    answer: node >= 8

  do ->
    fnOptimized = ->
    optimize fnOptimized

    verify
      name  : 'optimizable function checked'
      fn    : fnOptimized
      # args: no args
      # context: no context
      answer: true

    return

  return
