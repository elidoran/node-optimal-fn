## 0.2.0 - 2017/05/31

1. add new implementation for node 8 which uses a bit mask instead of a single value.
2. adapt testing for new implementation tested on node 8
3. change tests because newer minor releases of nodes 4, 6, and 7 now optimize some things they didn't before
4. add linting
5. add node 8 to Travis CI, change script configuration, cache `node_modules`
6. add link to `runtime/runtime.h` in V8's source where the new optimization status enum is defined


## 0.1.0 - 2017/01/01

1. initial working version with tests with 100% coverage
