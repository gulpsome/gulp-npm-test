'use strict'

var path = require('path'),
    R = require('ramda'),
    pkg = require('be-goods').pkg,
    gulpTask = require('be-goods').gulpTask,
    logger = require('be-goods').logger,
    cause = require('gulp-cause'),
    merge = require('lodash.merge'),
    notifications = require(path.join(__dirname, './notifications.json')),
    args = require('yargs')
      .string('t').alias('t', '--test').describe('t', 'tell gulp what to test')
      .argv

module.exports = function (gulp, opts) {
  var def = R.merge({
        taskName: 'test',
        withoutNpmRun: true,
        testsRe: 'test\/.+\.js$',
        templateFull: 'test',
        templatePart: 'test-part'
      }),
      o = def(opts || {}),
      shortCommand = function (str) {
        var matches = str.match(/^(\.?\/?node_modules\/.bin\/)?(.*)$/)
        return matches[1] ? matches[2] : str
      },
      scripts = pkg.scripts || {},
      command = (scripts.test && o.withoutNpmRun) ? scripts.test : 'npm test',
      run = require('childish-process')({
        childish: {
          templates: merge({},
            notifications,
            (o.templates) ? require(path.join(process.cwd(), o.templates)) : {}
          )
        }
      })

  if (typeof o.testsRe !== 'string') {
    // NOTE: this could become a minimatch glob...
    // Perhaps rename & repurpose this for deprecation warnings regarding that too.
    logger.warn('Option testsRe must be of type String, for the RegExp constructor.')
  }

  function test(what) {
    var cmd = command,
        template = o.templateFull

    if (typeof what === 'object') {
      // https://github.com/wearefractal/vinyl
      if (what.event == 'change') {
        if ((new RegExp(o.testsRe)).test(what.path)) {
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

  var help = o.taskHelp || 'A gulp-npm-test task, using ' + '`' + shortCommand(command) + '`.'
  gulpTask(gulp, o.taskName, help, test)

  if (o.watch) {
    if (R.type(o.watch) === 'String') o.watch = [o.watch]
    if (R.type(o.watch) === 'Array') cause(gulp, [o.taskName, [o.watch, test]])
    else {
      console.error('The watch option of gulp-npm-test must be a String or Array.')
      console.error('Its value of `' + o.watch.toString() + '` is being ignored.')
      console.error('The test:watch task has not been added.')
    }
  }

  return gulp
}
