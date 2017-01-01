# try to enable the functions we need
enable = ->
  # if they're already on the command line then they're enabled.
  # so, replace this function with a noop function and return.
  # can't test this in the same run as testing the later part, so...
  ### !pragma coverage-skip-block ###
  if '--allow_natives_syntax' in process.argv then return enable = ->

  try # otherwise, try to get the v8 module and enable it via the flag
    require('v8').setFlagsFromString '--allow_natives_syntax'
    enable = ->
  catch error1
    # Node 4 added v8, so, before that, it'll throw an error.
    # Can't cause in other Node versions, so, don't cover this
    ### !pragma coverage-skip-next ###
    throw new Error 'Unable to set flag during runtime. Try setting \'--allow_natives_syntax\' via command line.'

# fn - the function to try to optimize
# thiz - the `this` context to use (may be undefined)
# args - the array of args to use (may be undefined)
module.exports = (fn, thiz, args) ->
  # try to enable the natives we need (becomes a noop function after success)
  enable()

  # run the function once
  fn.apply thiz, args

  # tell v8 we want this function optimized next time.
  # use eval so we can use the % in a string because outside the string
  # the percent would work but look like an error to some things (like eslint)
  eval '%OptimizeFunctionOnNextCall(fn)' # use eval() cuz of %

  # run again to try to optimize it
  fn.apply thiz, args

  # call our `check` function to return the results of the attempt
  module.exports.check fn

# fn - the function to check optimization status for
module.exports.check = (fn) ->
  # try to enable the native we need (becomes noop function after success)
  enable()

  result = # prepare a result
    optimized: false
    always   : false
    maybe    : false
    TurboFan : false

  # get the status and use a switch to alter the `result`
  switch eval '%GetOptimizationStatus(fn)' # use eval() cuz of %, see above
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
      result.unknown = true

  return result
