module.exports = function(gulp, config, env) {
  var del = require('del');

  gulp.task('clean:tmp', del.bind(null, config.paths.temp));

  gulp.task('clean:dest', del.bind(null, config.paths.dest));

  gulp.task('clean', ['clean:tmp', 'clean:dest']);
};
