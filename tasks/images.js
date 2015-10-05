module.exports = function(gulp, config, env) {
  var cache = require('gulp-cache'),
    imagemin = require('gulp-imagemin');

  gulp.task('images', function() {
    return gulp.src('./src/images/**/*')
      .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
      .pipe(gulp.dest(config.paths.dest + '/images'));
  });
};
