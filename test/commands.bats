load $(which batshit-helpers)

gulp="$(pwd)/test/node_modules/.bin/gulp --gulpfile $(pwd)/test/gulpfile.js"

@test "gulp-npm-test should create a test task for npm test" {
  run $gulp test
  assert_success
}

@test "a gulp-npm-test task can be given a custom name" {
  run $gulp named-test
  assert_success
}

@test "gulp-npm-test can bypass npm, given a test runner command" {
  run $gulp mocha-test
  assert_success
}

@test "can ask a gulp-npm-test task to run a file path or glob for node >= 0.12" {
  run $gulp test -t test/test-me.js # 0.10.x doesn't take test/test-me*
  assert_success
  assert_output_contains "1..1" # only 1 test has been run
}
