# @optimal/fn
[![Build Status](https://travis-ci.org/elidoran/node-optimal-fn.svg?branch=master)](https://travis-ci.org/elidoran/node-optimal-fn)
[![Dependency Status](https://gemnasium.com/elidoran/node-optimal-fn.png)](https://gemnasium.com/elidoran/node-optimal-fn)
[![npm version](https://badge.fury.io/js/%40optimal%2Ffn.svg)](http://badge.fury.io/js/%40optimal%2Ffn)
[![Coverage Status](https://coveralls.io/repos/github/elidoran/node-optimal-fn/badge.svg?branch=master)](https://coveralls.io/github/elidoran/node-optimal-fn?branch=master)

Force V8 to try to optimize a function and check optimization status in nodes 4, 6, 7, and 8.

Use in benchmarking to optimize before running the benchmark.

Use in analysis to test if your functions can be optimized.

See tests for examples of what optimizes and what doesn't. [[JS]](https://github.com/elidoran/node-optimal-fn/tree/master/test/lib/js) [[CS]](https://github.com/elidoran/node-optimal-fn/tree/master/test/lib/coffee)

See:

1. [article](https://github.com/petkaantonov/bluebird/wiki/Optimization-killers)
2. [another article](http://www.aerospike.com/blog/node-on-fire/)
3. [node benchmark helper](https://github.com/nodejs/node/blob/master/benchmark/common.js#L213-L225)
4. [node 8+ runtime/runtime.h](https://github.com/v8/v8/blob/master/src/runtime/runtime.h) for new optimization status bit mask

    ```c++
    enum class OptimizationStatus {
      kIsFunction = 1 << 0,      // 1
      kNeverOptimize = 1 << 1,   // 2
      kAlwaysOptimize = 1 << 2,  // 4
      kMaybeDeopted = 1 << 3,    // 8
      kOptimized = 1 << 4,       // 16
      kTurboFanned = 1 << 5,     // 32
      kInterpreted = 1 << 6,     // 64
    };
    ```

## Install

```sh
npm install @optimal/fn --save
```


## Usage

```javascript
// 1. attempt to optimize a function and get its status
var optimize = require('@optimal/fn')

function fn() { }

var result = optimize(fn)

console.log(result)
// {
//    optimized: true,
//    always   : false,
//    maybe    : false,
//    TurboFan : false
// }

// 2. test a function to see if it's optimized:
var someOtherFn = getSomeOtherFn()
result = optimize.check(someOtherFn)
```

## Result Properties

The result may contain these properties:

1. **optimized** - true when optimized, false otherwise
2. **always** - When function "is optimized" then **always** will be **false**. When function is "always optimized" then **always** will be **true**. When function will "never be optimized" then **always** is **true** (and **optimized** is **false**).
3. **maybe** - when function is "maybe deoptimized" then **maybe** is true, otherwise it is false.
4. **TurboFan** - when function is "optimized by TurboFan" then this is true, otherwise it is false.


## MIT License
