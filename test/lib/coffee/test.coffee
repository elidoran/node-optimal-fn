'use strict'

{verify, node} = require '../../helpers'

describe 'test optimize', ->

  verify
    name: 'optimize a simple function'
    fn  : -> return
    # args: no args
    # context: no context
    answer: true

  verify
    name: 'optimize a function with a number arg'
    fn  : (a) -> a/10
    args: [100]
    # context: no context
    answer: true

  verify
    name: 'optimize a function with a string arg'
    fn  : (s) -> s.toUpperCase()
    args: ['test']
    # context: no context
    answer: true

  # if process.versions.node[0] in []
  #   # earlier 4/6/7 did *not* optimize these...
  #   # later releases of all versions *do* optimize these now:
  #   #   4.8+
  #   #   6.10+
  #   #   7.10+
  #   #   8.0+
  #
  #   do ->
  #     other = -> # do nothing
  #
  #     verify
  #       name: 'should NOT optimize a function passing arguments to another function (w/out context)'
  #       fn  : -> other.apply this, arguments ; return
  #       args: ['a', 'b']
  #       # context: no context
  #       answer: false
  #
  #     verify
  #       name: 'should NOT optimize a function passing arguments to another function (w/context)'
  #       fn  : -> args = other.apply this, arguments ; return
  #       args: ['a', 'b']
  #       context: {}
  #       answer: false
  #
  #     return

  verify
    name: 'optimize a function with eval in it'
    fn  : (s) -> eval '' ; return
    args: ['test']
    # context: no context
    answer:
      # node 4 does optimize it and TurboFan is true...
      if node is 4 then {
        optimized: true
        TurboFan : true
        always   : false
        maybe    : false
      }

      # newer node's optimize it, node 6 doesn't optimize
      else node >= 8


  return
