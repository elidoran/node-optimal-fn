assert = require 'assert'
optimize = require '../lib'

# use the first character of the node version to differentiate optimizations.
node = exports.node = Number(process.versions.node[0])

# build an "optimized" result
exports.optimized = (mask, defaults) ->
  result =
    optimized: defaults?.optimized ? true
    always   : false
    maybe    : false
    TurboFan : defaults?.TurboFan ? false

  if node >= 8
    result.mask        = mask ? 17
    result.function    = true
    result.interpreted = false

  return result


# build a "not optimized" result
exports.notOptimized = (mask) ->
  result =
    optimized: false
    always   : false
    maybe    : false
    TurboFan : false

  if node >= 8
    result.mask        = mask ? 1
    result.function    = true
    result.interpreted = false

  return result


# used to add a test using supplied info
exports.verify = (test) ->

  # 1. build the test name and its answer.
  if test.answer is true
    name   = test.name
    # Node 4/6's optimized looks different than Node 8/9 (it's TurboFan'd)
    answer = if 8 <= node <= 9 then exports.optimized(49, {TurboFan:true}) else exports.optimized()

  else if typeof test.answer is 'object'
    name   = test.name
    answer = test.answer

  else # prepend 'NOT' when the expected answer is *not* optimized
    name   = 'NOT ' + test.name
    answer = exports.notOptimized()

  # 2. register the test with Mocha
  it name, -> assert.deepEqual optimize(test.fn, test.context, test.args), answer
