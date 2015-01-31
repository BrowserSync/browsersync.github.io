// Start the server
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});

// Compile SASS & auto-inject into browsers
gulp.task('sass', function () {
    return gulp.src('scss/styles.scss')
        .pipe(sass({includePaths: ['scss']}))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({stream:true}));
});

// Reload all Browsers
gulp.task('bs-reload', function () {
    browserSync.reload();
});

// Watch scss AND html files, doing different things with each.
gulp.task('default', ['browser-sync'], function () {
    gulp.watch("scss/*.scss", ['sass']);
    gulp.watch("*.html", ['bs-reload']);
});