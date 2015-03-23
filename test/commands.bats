load $(which batshit-helpers)

gulp="$(pwd)/test/node_modules/.bin/gulp --gulpfile $(pwd)/test/gulpfile.js"

@test "gulp-npm-test should create a test task for npm test" {
  run $gulp test
  assert_success
}
