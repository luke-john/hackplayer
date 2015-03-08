var gulp = require('gulp');
var requireDir = require('require-dir');

var dir = requireDir('./tasks');

gulp.task('default', ['open'], function() {
  gulp.watch('src/templates/*.jade', ['open']);
  gulp.watch('src/styles/*.css', ['open']);
  gulp.watch('src/javascript/*.js', ['open']);
});
