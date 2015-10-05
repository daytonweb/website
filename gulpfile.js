var gulp = require('gulp'),
  _ = require('lodash'),
  requireDir = require('require-dir'),
  runSequence = require('run-sequence'),
  plumber = require('gulp-plumber'),
  gutil = require('gulp-util');


var config = {
  paths: {
    temp: __dirname + '/.tmp',
    source: __dirname + '/src',
    dest: __dirname + '/dist',
    data: __dirname + '/src/data',
    public: __dirname + '/public'
  },
  browserSync: require('browser-sync')
};

// Get environment, for environment-specific activities
var env = process.env.NODE_ENV || "development";

// Override gulp.src to provide some error handling for all tasks
// See: https://www.timroes.de/2015/01/06/proper-error-handling-in-gulp-js/
var gulp_src = gulp.src;
gulp.src = function() {
  return gulp_src.apply(gulp, arguments)
    .pipe(plumber(function(error) {
      // Output an error message
      gutil.log(gutil.colors.red('Error (' + error.plugin + '): ' + error.message));
      // emit the end event, to properly end the task
      this.emit('end');
    })
  );
};

// Load all tasks in the /tasks directory
var tasks = requireDir('tasks/');
_.each(tasks, function(task){
  task(gulp, config, env);
});

gulp.task('build', function(done) {
  runSequence('clean', 'copy', ['styles', 'templates', 'modernizr', 'images', 'icons'], done);
});

gulp.task('dist', function(done) {
  runSequence('build', 'diet', done);
});

gulp.task('default', ['build', 'serve']);
