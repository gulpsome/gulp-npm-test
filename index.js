"use strict"

var path = require('path'),
    R = require('ramda'),
    merge = require('lodash.merge'),
    run = require('childish-process'),
    notifications = require(path.join(__dirname, './notifications.json')),
    args = require('yargs')
      .string("t").alias("t", "--test").describe("t", "tell gulp what to test")
      .argv

module.exports = function (gulp, opts) {
  var def = R.merge({
        taskName: 'test',
        testCmd: 'npm test',
        testsRe: /test\/.+\.js$/,
        templateFull: 'test',
        templatePart: 'test-part'
      }),
      o = def(opts || {}),
      detectHelp = function (tasks) {
        return R.is(Object, R.path(['help', 'help'], tasks))
      }

  function test(what) {
    // TODO: there seems to be a childish-process bug - can't setup run outside?
    run = run({
      childish: {
        templates: merge({},
        notifications,
        (o.templates) ? require(path.join(process.cwd(), o.templates)) : {})
      }
    })
    var cmd = o.testCmd
    var template = o.templateFull
    if (typeof what === 'object') {
      // https://github.com/wearefractal/vinyl
      if (what.event == 'change' && o.testsRe.test(what.path)) {
        cmd += ' ' + what.path
        template = o.templatePart
      }
      else {
        // console.log('ignoring', what.path, what.event)
        return // don't run it
      }
    }
    else if (args.t) {
      cmd += ' ' + args.t
      template = o.templatePart
    }
    run(cmd, {childish: {template: template}})
  }

  if (detectHelp(gulp.tasks)) {
    var help = o.taskHelp || 'A gulp-npm-test task for ' + '`' + o.testCmd + '`.'
    gulp.task(o.taskName, help, test)
  }
  else gulp.task(o.taskName, test)

  return test // can use with gulp-watch
}
