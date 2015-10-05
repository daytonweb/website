module.exports = function(gulp, config, env) {
  var useref = require('gulp-useref'),
    minifyCss = require('gulp-minify-css'),
    minifyHtml = require('gulp-minify-html'),
    uglify = require('gulp-uglify'),
    $if = require('gulp-if'),
    size = require('gulp-size'),
    rev = require('gulp-rev'),
    revReplace = require('gulp-rev-replace');

  gulp.task('diet', function() {
    var assets = useref.assets({searchPath: ['.tmp']}); // Pull assets from the temp directory

    gulp.src(config.paths.dest + '/**/*.html')
      .pipe(assets)
      .pipe($if('*.css', minifyCss({compatibility: '*'})))
      .pipe($if('*.js', uglify()))
      .pipe(rev())
      .pipe(assets.restore())
      .pipe(useref())
      .pipe(revReplace())
      .pipe($if('*.html', minifyHtml({conditionals: true, loose: true})))
      .pipe(gulp.dest(config.paths.dest))
      .pipe($if('/**/main*.css', size({title: 'styles', gzip: true, showFiles: true})))
      .pipe($if('/**/main*.js', size({title: 'javascript', gzip: true, showFiles: true})));
  });
};
