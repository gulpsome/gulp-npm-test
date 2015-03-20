# gulp-npm-test

A gulp task to run tests, usually `npm test`, with various options...

## Use

[![NPM](https://nodei.co/npm/gulp-npm-test.png?mini=true)](https://www.npmjs.org/package/gulp-npm-test)

```javascript
var gulp = require('gulp')
require('gulp-npm-test')(gulp)
```

It takes configuration options - here is an example, loosely borrowed from
[datomiki](https://github.com/datomicon/datomiki)'s `gulpfile.js`:

```javascript
var test = require('gulp-npm-test')(gulp, {
  taskName: 'test', // this is the default
  testCmd: 'node_modules/.bin/mocha', // otherwise `npm test`
  testsRe: /\.spec\.coffee$/, // a RegExp to match test files with (for watching)
  templates: 'your-custom-overrides.json', // deep-merged into notifications.json
  templateFull: 'test', // for running all the tests
  templatePart: 'test-part' // partial testing (e.g. test file change event)
})
```

All of the above options are _optional_.
One could reuse the test var from above to setup a watch-and-test task:

```javascript
var watch = require('gulp-watch')
gulp.task('test:watch', function() {
  watch(['./index.js', 'test/*.spec.coffee'], test)
})
```

The test task can take a glob / path to a specific test with a `-t` or `--test`,
though you probably need to set the test `testCmd` option, and use a framework
that would be ok with it:

```shell
gulp test -t test/some.spec.coffee
```

## License

[MIT](http://orlin.mit-license.org)
