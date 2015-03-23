load $(which batshit-helpers)

# because bats changes the $TMP with:
# export TMP="$BATS_TEST_DIRNAME/tmp"
mkdir "$TMP" # so that v8flags - via liftoff / gulp doesn't throw

@test "gulp-npm-test should create a test task for npm test" {
  run gulp test --gulpfile "$(pwd)/test/gulpfile.js"
  assert_success
  assert_output_contains "1..1\n
ok 1 gulp-npm-test-test imagine meaningful tests will pass\n
# tests 1\n
# pass 1\n
# fail 0"
}
