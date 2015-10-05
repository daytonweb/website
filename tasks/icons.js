module.exports = function(gulp, config, env) {
  var glob = require('glob'),
    gulpicon = require('gulpicon/tasks/gulpicon');

  gulpiconConfig = {
    // Include loader code for SVG markup embedding
    enhanceSVG: true,

    // prefix for CSS classnames
    cssprefix: ".icon-",

    defaultWidth: "300px",
    defaultHeight: "200px",
  };

  gulpiconConfig.dest = config.paths.dest + "/icons";

  var files = glob.sync(config.paths.source + "/svg/*.svg");

  gulp.task("icons", gulpicon(files, gulpiconConfig));
};
