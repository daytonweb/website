module.exports = function(gulp, config, env) {
  var browserSync = config.browserSync,
    reload = browserSync.reload,
    rewrite = require("http-rewrite-middleware"),
    rewriteMiddleware;

  // Rewrite rules to dynamically add .html extension to paths
  rewriteMiddleware = rewrite.getMiddleware([
    {from: '(^((?!css|icons|svg|js|images|fonts|\/$).)*$)', to: '$1.html'}
  ]);

  gulp.task('serve', function() {
    browserSync.init({
      notify: true,
      open: false,
      server: {
        baseDir: [config.paths.temp, config.paths.dest],
        middleware: [rewriteMiddleware]
      }
    });

    gulp.watch([
      config.paths.dest + '/**/*.html',
      config.paths.dest + '/images/**/*',
      config.paths.dest + '/icons/*'
    ]).on('change', reload);

    gulp.watch(config.paths.source + '/templates/**/*.html', ['templates']);
    gulp.watch(config.paths.source + '/content/**/*.*', ['templates']);
    gulp.watch(config.paths.source + '/data/**/*.*', ['templates']);
    gulp.watch(config.paths.source + '/svg/*', ['icons']);
    gulp.watch(config.paths.source + '/scss/**/*.scss', ['styles']);
    gulp.watch(config.paths.source + '/js/**/*.js', ['scripts']);
    gulp.watch(config.paths.public + '/**/*', ['copy']);

  });

  gulp.task('serve:dist', function() {
    browserSync.init({
      notify: false,
      logPrefix: 'WSK',
      server: {
        baseDir: config.paths.dest,
        middleware: [rewriteMiddleware]
      }
    });
  });
};
