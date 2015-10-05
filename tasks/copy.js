module.exports = function(gulp, config, env) {
  gulp.task('copy', function() {
    return gulp.src(config.paths.public + '/**/*')
      .pipe(gulp.dest(config.paths.dest));
  });
};
