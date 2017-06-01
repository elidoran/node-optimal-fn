assert = require 'assert'
optimize = require '../lib'

exports.OPTIMIZED = (mask) ->
  result =
    optimized: true
    always   : false
    maybe    : false
    TurboFan : false

  if process.versions.node[0] is '8'
    result.mask        = mask ? 17
    result.function    = true
    result.interpreted = false

  return result


exports.NOT_OPTIMIZED = (mask) ->
  result =
    optimized: false
    always   : false
    maybe    : false
    TurboFan : false

  if process.versions.node[0] is '8'
    result.mask        = mask ? 1
    result.function    = true
    result.interpreted = false

  return result

exports.verify = (test) ->
  it test.name, -> assert.deepEqual optimize(test.fn, test.context, test.args), test.answer
