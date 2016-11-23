var gulp = require("gulp"),
    minCss = require("gulp-minify-css");
var concat = require('gulp-concat');
gulp.task("minwebcss",function () {
    return gulp.src(['css/common/*/*.css','css/admin/operate/*.css'])
        .pipe(concat("all.min.css"))
        .pipe(minCss())
    .pipe(gulp.dest("css/compile/"))
})
