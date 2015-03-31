'use strict'

var path = require('path'),
    R = require('ramda'),
    merge = require('lodash.merge'),
    notifications = require(path.join(__dirname, './notifications.json')),
    args = require('yargs')
      .string('t').alias('t', '--test').describe('t', 'tell gulp what to test')
      .argv

module.exports = function (gulp, opts) {
  var def = R.merge({
        taskName: 'test',
        withoutNpmRun: true,
        testsRe: /test\/.+\.js$/,
        templateFull: 'test',
        templatePart: 'test-part'
      }),
      o = def(opts || {}),
      detectHelp = function (tasks) {
        return R.is(Object, R.path(['help', 'help'], tasks))
      },
      shortCommand = function (str) {
        var matches = str.match(/^(\.?\/?node_modules\/.bin\/)?(.*)$/)
        return matches[1] ? matches[2] : str
      },
      scripts = require(path.join(process.cwd(), 'package.json')).scripts,
      command = (scripts.test && o.withoutNpmRun) ? scripts.test : 'npm test',
      run = require('childish-process')({
        childish: {
          templates: merge({},
            notifications,
            (o.templates) ? require(path.join(process.cwd(), o.templates)) : {}
          )
        }
      })

  function test(what) {
    var cmd = command,
        template = o.templateFull

    if (typeof what === 'object') {
      // https://github.com/wearefractal/vinyl
      if (what.event == 'change') {
        if (o.testsRe.test(what.path)) {
          cmd += ' ' + what.path
          template = o.templatePart
        }
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
    var help = o.taskHelp || 'A gulp-npm-test task, using ' + '`' + shortCommand(command) + '`.'
    gulp.task(o.taskName, help, test)
  }
  else gulp.task(o.taskName, test)

  return test // can use with gulp-watch
}
