var gulp        = require("gulp");
var sass        = require("gulp-ruby-sass");
var browserSync = require("browser-sync").create();

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function(async) {

    browserSync.init({
        server: "./app"
    });

    gulp.watch("app/scss/*.scss", ['sass']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

/**
 * Compile with gulp-ruby-sass + source maps
 */
gulp.task('sass', function () {

    return sass('app/scss', {sourcemap: true})
        .on('error', function (err) {
            console.error('Error!', err.message);
        })
        .pipe(sourcemaps.write('./', {
            includeContent: false,
            sourceRoot: '/app/scss'
        }))
        .pipe(browserSync.stream({match: '**/*.css'}));
});
