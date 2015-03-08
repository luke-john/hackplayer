var gulp = require('gulp');

gulp.task('build', ['buildSync'], function() {
  process.nextTick(function () {
    process.exit(0);
  });
});
