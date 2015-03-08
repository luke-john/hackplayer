var gulp = require('gulp');
var jade = require('gulp-jade');
var smoosher = require('gulp-smoosher');
var rename = require("gulp-rename");


gulp.task('buildSync', function(cb) {
  var locals = {};

  gulp.src('./src/templates/player.jade')
    .pipe(jade())
    .pipe(smoosher({
      base: 'src'
    }))
    .pipe(rename("hackplayer.html"))
    .pipe(gulp.dest('./dist/'))
    .on('end', function() {
      cb();
      return;
    });
  
});
