var gulp = require("gulp");
var docco = require("gulp-docco");


var src = "../sketch_music/**/*.js";

// var template = {
//     path: "ink-docstrap",
//     systemName: "Computational Form Music",
//     footer: "",
//     copyright: "",
//     navType: "vertical",
//     theme: "flatly",
//     linenums: true,
//     collapseSymbols: true,
//     inverseNav: true,
//     outputSourceFiles: true,
//     sort: false
// };



gulp.task('build', function() {
    // gulp.src(src).pipe(jsdoc('./documentation-output', template));
    gulp.src(src)
        .pipe(docco({
            layout: 'parallel'
        }))
        .pipe(gulp.dest('./docco_out'));
});


gulp.task('watch', function() {
    gulp.watch(src, ['build']);
});


gulp.task('default', ['build', 'watch']);
