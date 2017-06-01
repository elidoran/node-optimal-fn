# try to enable the functions we need
enable = ->
  # if they're already on the command line then they're enabled.
  # so, replace this function with a noop function and return.
  # can't test this in the same run as testing the later part, so...
  ### !pragma coverage-skip-block ###
  if '--allow_natives_syntax' in process.execArgv then return enable = ->

  try # otherwise, try to get the v8 module and enable it via the flag
    require('v8').setFlagsFromString '--allow_natives_syntax'
    enable = ->
  catch error1
    # Node 4 added v8, so, before that, it'll throw an error.
    # Can't cause in other Node versions, so, don't cover this
    ### !pragma coverage-skip-next ###
    throw new Error 'Unable to set flag. Set \'--allow_natives_syntax\' via command line.'

# fn - the function to try to optimize
# thiz - the `this` context to use (may be undefined)
# args - the array of args to use (may be undefined)
module.exports = (fn, thiz, args) ->
  # try to enable the natives we need (becomes a noop function after success)
  enable()

  # run the function once
  fn.apply thiz, args

  # run the function again
  fn.apply thiz, args

  # tell v8 we want this function optimized next time.
  # use eval so we can use the % in a string because outside the string
  # the percent would work but look like an error to some things (like eslint)
  eval '%OptimizeFunctionOnNextCall(fn)' # use eval() cuz of %

  # run again to try to optimize it
  fn.apply thiz, args

  # call our `check` function to return the results of the attempt
  module.exports.check fn

check4thru7 = (fn) ->
  # try to enable the native we need (becomes noop function after success)
  enable()

  result = # prepare a result
    optimized: false
    always   : false
    maybe    : false
    TurboFan : false

  code = eval '%GetOptimizationStatus(fn)'

  switch code
    when 1 then result.optimized = true
    when 2 then ; # nothing, it's correct already
    # don't know how to cause these results to occur, so, not covering them
    when 3
      ### !pragma coverage-skip-block ###
      result.optimized = result.always = true
    when 4
      ### !pragma coverage-skip-block ###
      result.always = true
    # when 5 then ...
    when 6
      ### !pragma coverage-skip-block ###
      result.maybe = true
    when 7
      ### !pragma coverage-skip-block ###
      result.optimized = result.TurboFan = true
    else
      ### !pragma coverage-skip-block ###
      result.unknown = code

  return result


check8 = (fn) ->
  # try to enable the native we need (becomes noop function after success)
  enable()

  ###
    v8 for Node 8.0+ uses a bit mask instead of a single value.
    https://github.com/v8/v8/blob/master/src/runtime/runtime.h
    enum class OptimizationStatus {
      kIsFunction = 1 << 0,      // 1
      kNeverOptimize = 1 << 1,   // 2
      kAlwaysOptimize = 1 << 2,  // 4
      kMaybeDeopted = 1 << 3,    // 8
      kOptimized = 1 << 4,       // 16
      kTurboFanned = 1 << 5,     // 32
      kInterpreted = 1 << 6,     // 64
    };
  ###

  # get the status and use a switch to alter the `result`.
  # use eval() cuz of %, see above.
  mask = eval '%GetOptimizationStatus(fn)'

  result = # prepare a result
    mask       : mask
    function   : false
    optimized  : false
    always     : false
    maybe      : false
    TurboFan   : false
    interpreted: false

  # change result based on the mask

  if (mask & 1) is 1 then result.function = true

  ### !pragma coverage-skip-block ###
  if (mask & 2) is 2 then result.always   = true # never optimize (always+false optimized)

  ### !pragma coverage-skip-block ###
  if (mask & 4) is 4 then result.always   = result.optimzed = true # always optimize

  ### !pragma coverage-skip-block ###
  if (mask & 8) is 8 then result.maybe    = true

  if (mask & 16) is 16 then result.optimized   = true

  ### !pragma coverage-skip-block ###
  if (mask & 32) is 32 then result.TurboFan    = true

  ### !pragma coverage-skip-block ###
  if (mask & 64) is 64 then result.interpreted = true

  return result


# fn - the function to check optimization status for
module.exports.check =
  # node 8 uses v8 version which changed the result from a code to a bit mask.
  if process.versions.node[0] is '8' then check8 else check4thru7
