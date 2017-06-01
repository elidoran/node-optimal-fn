var coverage, coverageVar

coverage = require('coffee-coverage')

coverageVar = coverage.findIstanbulVariable()

coverage.register({
  instrumentor: 'istanbul',

  basePath: require('path').resolve(__dirname, '..'),

  exclude: ['node_modules', '.git', 'build', 'docs', 'examples', 'test' ],

  coverageVar: coverageVar,

  writeOnExit: coverageVar ? 'coverage/coverage-coffee.json' : null,

  initAll: true
})
