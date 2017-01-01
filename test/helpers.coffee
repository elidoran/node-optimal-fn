assert = require 'assert'
optimize = require '../lib'

exports.OPTIMIZED =
  optimized: true
  always   : false
  maybe    : false
  TurboFan : false

exports.NOT_OPTIMIZED =
  optimized: false
  always   : false
  maybe    : false
  TurboFan : false

exports.verify = (test) ->
  it test.name, -> assert.deepEqual optimize(test.fn, test.context, test.args), test.answer
