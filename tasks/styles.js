module.exports = function(gulp, config, env) {
  var sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    size = require('gulp-size'),
    plumber = require('gulp-plumber'),
    // PostCSS plugins
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer-core'),
    mqpacker = require('css-mqpacker'),
    csswring = require('csswring'),
    pixrem = require('pixrem'),
    rucksack = require('rucksack-css'),
    // BrowserSync
    reload = config.browserSync.reload;

  gulp.task('styles', function() {
    var processors = [
      autoprefixer({browsers: ['last 1 version']}),
      rucksack,
      pixrem,
      mqpacker({sort: true}),
      csswring
    ];
    gulp.src(config.paths.source + '/scss/*.scss')
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(postcss(processors))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(config.paths.temp + '/css'))
      .pipe(reload({ stream: true }));
  });
};
