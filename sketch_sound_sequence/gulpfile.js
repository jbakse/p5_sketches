var gulp = require("gulp");
var jsdoc = require("gulp-jsdoc");

var template = {
  path: "ink-docstrap",
  systemName: "Computational Form Music",
  footer: "",
  copyright: "",
  navType: "vertical",
  theme: "flatly",
  linenums: true,
  collapseSymbols: true,
  inverseNav: true,
  outputSourceFiles: true,
  sort: false
};



gulp.task('default', function () {
  gulp.src("./*.js").pipe(jsdoc('./documentation-output', template));
});


gulp.task('watch', function () {
  gulp.watch("./*.js", ['default']);
});
