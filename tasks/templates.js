module.exports = function(gulp, config, env) {
  var gulpSwig = require('gulp-swig'),
    swig = require('gulp-swig/node_modules/swig'),
    data = require('gulp-data'),
    matter = require('gray-matter'),
    _ = require('lodash'),
    Path = require('path'),
    requireDir = require('require-dir'),
    marked = require('marked');

  var opts = {
    defaults: {
      cache: false
    },
    setup: function(Swig) {
      Swig.setDefaults({loader: Swig.loaders.fs(config.paths.source + '/templates')});
    }
  };

  // Full of the compiled HTML file
  function targetPathFull(path, data) {
    return Path.join(Path.dirname(path), targetPath(data));
  }

  // Path of the compiled HTML file
  function targetPath(data) {
    return Path.join(data.slug + ".html");
  }

  gulp.task('templates:posts', function() {
    return gulp.src(config.paths.source + '/content/**/*')
      .pipe(data(function(file) {
        var matterObject = matter(String(file.contents)), // extract front matter data
          type = matterObject.data.type, // page type
          body = matterObject.content,
          data = matterObject.data,
          moreData = requireDir(config.paths.data),
          bodySwig;

        bodySwig = swig.compile(body, opts);
        // Use swig to render partials first
        body = bodySwig(data);

        // Process markdown
        if (Path.extname(file.path) === '.md') {
          body = marked(body);
        }

        // Set the path for this page based on the slug data
        file.path = targetPathFull(file.path, data);
        moreData.path = targetPath(data);

        // Merge the file data with the front-matter data
        data = _.merge(data, moreData);

        // Copy the processed body text back into the file object so Gulp can keep piping
        file.contents = new Buffer(body);

        return data;
      }))
      .pipe(gulpSwig(opts))
      .pipe(gulp.dest(config.paths.dest));
  });

  gulp.task('templates:pages', function() {
    return gulp.src(config.paths.source + '/templates/*.html')
      .pipe(data(function(file) {
        var matterObject = matter(String(file.contents)), // extract front matter data
          body = matterObject.content,
          data = matterObject.data,
          moreData = requireDir(config.paths.data);

        data = _.merge(data, moreData);

        file.contents = new Buffer(body);

        return data;
      }))
      .pipe(gulpSwig(opts))
      .pipe(gulp.dest(config.paths.dest));
  });

  gulp.task('templates', ['templates:posts', 'templates:pages']);

};
