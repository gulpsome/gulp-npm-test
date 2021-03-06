# gulp-npm-test

[![version npm](https://img.shields.io/npm/v/gulp-npm-test.svg?style=flat-square)](https://www.npmjs.com/package/gulp-npm-test)
[![dependencies](https://img.shields.io/david/gulpsome/gulp-npm-test.svg?style=flat-square)](https://david-dm.org/gulpsome/gulp-npm-test)
[![build status](https://img.shields.io/travis/gulpsome/gulp-npm-test.svg?style=flat-square)](http://travis-ci.org/gulpsome/gulp-npm-test)

A gulp task to run tests, defaults to `npm test`,
with automatic notifications + various options / configuration possibilities...

## Use

[![NPM](https://nodei.co/npm/gulp-npm-test.png?mini=true)](https://www.npmjs.org/package/gulp-npm-test)

As simple as it gets:

```javascript
var gulp = require('gulp')
require('gulp-npm-test')(gulp)
```

### Configure

It takes configuration options - here is an example, loosely borrowed from
[datomiki](https://github.com/datomicon/datomiki)'s `gulpfile.js`:

```javascript
var gulp = require('gulp-npm-test')(gulp, {
  taskName: 'test', // this is the default
  taskHelp: 'A test task.', // irrelevant if not using beverage or gulp-help
  withoutNpmRun: true, // the default, otherwise runs `npm test`
  watch: ['index.js', 'test/*.spec.coffee'], // create a test:watch task using gulp-watch
  testsRe: '\\.spec\\.coffee$', // a RegExp (String) to match test files with (for watching)
  templates: 'your-custom-overrides.json', // deep-merged into notifications.json
  templateFull: 'test', // for running all the tests
  templatePart: 'test-part' // partial testing (e.g. test file change event)
})
```

#### Watching

In the above example if `testsRe` isn't set -- all tests will be run each time,
no matter which file triggers the test call.  Notice the `testsRe` option is expected to  be a String and therefore '\' has to be escaped as '\\' -- e.g. `/\./` is `'\\.'`.

One could setup more custom watching by using [gulp-cause](https://github.com/gulpsome/gulp-cause) directly or otherwise.

#### Further

All of the above options are _optional_ if the defaults turn out good-enough.

The test task can take a glob / path to a specific test with a `-t` or `--test`,
though you probably need to set the test `testCmd` option, and use a framework
that would be ok with it:

```sh
gulp test -t test/some.spec.coffee
```

See [childish-process](https://github.com/orlin/childish-process)
for templates / options / notifications.

Happy testing!

## Tests [![Build Status](https://img.shields.io/travis/gulpsome/gulp-npm-test.svg?style=flat)](http://travis-ci.org/gulpsome/gulp-npm-test)

```sh
install.sh #once
npm test
```

Though `gulp-npm-test` should work on any platform, its tests probably
need a _*nix_ to run - Linux, Mac, etc.

## Develop

[![Dependency Status](https://david-dm.org/gulpsome/gulp-npm-test.svg)](https://david-dm.org/gulpsome/gulp-npm-test)
[![devDependency Status](https://david-dm.org/gulpsome/gulp-npm-test/dev-status.svg)](https://david-dm.org/gulpsome/gulp-npm-test#info=devDependencies)

## License

[MIT](http://orlin.mit-license.org)
