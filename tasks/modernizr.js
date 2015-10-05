module.exports = function(gulp, config, env) {
  var modernizr = require('gulp-modernizr');

  gulp.task('modernizr', function() {
    gulp.src(config.paths.source + '/js/*.js')
      .pipe(modernizr({
        "options" : [
          "setClasses",
          "addTest",
          "html5printshiv",
          "testProp",
          "fnBind"
        ]
      }))
      .pipe(gulp.dest(config.paths.temp + '/js'))
  });
};
