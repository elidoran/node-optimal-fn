## 0.3.1 - 2018/07/15

1. update dev deps
2. fix mocha test args (missing *.coffee)
3. remove node 9, add node 10
4. update node version processing for double digit version
5. update test values for node 10's differences
6. remove Gemnasium badge (Gemnasium bought by GitLab...)
7. Link license header in README to the LICENSE file

## 0.3.0 - 2018/02/05

1. update deps
2. update mocha call args (replace --compilers with --require)
3. update node versions tested (remove 7, add 9)
4. move node version handling and answer building to helpers.coffee.
5. update testing for new ability to optimize for different node versions.


## 0.2.0 - 2017/05/31

1. add new implementation for node 8 which uses a bit mask instead of a single value.
2. adapt testing for new implementation tested on node 8
3. change tests because newer minor releases of nodes 4, 6, and 7 now optimize some things they didn't before
4. add linting
5. add node 8 to Travis CI, change script configuration, cache `node_modules`
6. add link to `runtime/runtime.h` in V8's source where the new optimization status enum is defined


## 0.1.0 - 2017/01/01

1. initial working version with tests with 100% coverage
