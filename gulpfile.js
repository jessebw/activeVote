const gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass');


function style() {
    // 1. find gulp file
    return gulp.src('./sass/**/*.scss')
    // 2. pass file through sass compiler
    .pipe(sass().on('error', sass.logError))
    // 3. save compied css
    .pipe(gulp.dest('./css'))
    // 4. stream changes across browsers
    .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('./sass/**/*.scss', style);
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;


/* [Browsersync] Access URLs:
 ------------------------------------
       Local: http://localhost:3000
    External: http://192.168.1.5:3000
 ------------------------------------
          UI: http://localhost:3001
 UI External: http://localhost:3001
 */