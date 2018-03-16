var gulp = require("gulp"),
less = require("gulp-less"),
rename = require("gulp-rename"),
cssnano = require("gulp-cssnano"),
sourcemaps = require("gulp-sourcemaps"),
gulpif = require("gulp-if"),
sync = require("browser-sync").create(),
concat = require("gulp-concat"),
uglify = require("gulp-uglify");

var IS_DEV = true;

gulp.task("less", function () {
return gulp.src("src/styles/app.less")
    .pipe(gulpif(IS_DEV,sourcemaps.init()))
    .pipe(less())
    .pipe(rename("app.min.css"))
    .pipe(cssnano())
    .pipe(gulpif(IS_DEV, sourcemaps.write(".")))
    .pipe(gulp.dest("dist/css"))
    .pipe(sync.stream())
});

gulp.task("html", function () {
    return gulp.src("src/index.html").pipe(gulp.dest("dist"));
});
gulp.task("js", function () {
    return gulp.src("src/scripts/**/*.js")
        .pipe(gulpif(IS_DEV,sourcemaps.init()))
        .pipe(concat("app.min.js"))
        .pipe(uglify())
        .pipe(gulpif(IS_DEV, sourcemaps.write(".")))
        .pipe(gulp.dest("dist/js"));
});


gulp.task("watch", ["html", "js","less"], function () {
   sync.init({
       server:"dist"
   }) ;
   gulp.watch("src/styles/app.less",["less"]);
   gulp.watch("src/index.html",["html"]);
    gulp.watch("src/scripts/**/*.js",["js"]);
    gulp.watch("dist/js/*.js").on("change",sync.reload);
   gulp.watch("dist/index.html").on("change",sync.reload);
});
gulp.task("default",["watch"]);