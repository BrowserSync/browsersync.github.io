var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

// process JS files and return the stream.
gulp.task('js', function () {
    return gulp.src('js/*js')
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', ['js'], function (done) {
    browserSync.reload();
    done();
});

// use default task to launch Browsersync and watch JS files
gulp.task('default', ['js'], function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch('js/*.js', ['js-watch']);
});
