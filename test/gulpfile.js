var gulp = require('gulp')
var test = require('../index.js')

test(gulp)
test(gulp, {taskName: 'named-test'})
test(gulp, {taskName: 'mocha-test', testCmd: 'node_modules/.bin/mocha'})
