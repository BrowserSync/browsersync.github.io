// Save a reference to the `reload` method
var reload = browserSync.reload;

// Compile SASS & auto-inject into browsers
gulp.task('sass', function () {
    return gulp.src('scss/styles.scss')
        .pipe(sass({includePaths: ['scss']}))
        .pipe(gulp.dest('css'))
        .pipe(reload({stream:true}));
});

// Watch scss AND html files, doing different things with each.
gulp.task('serve', ['sass'], function () {

    // Serve files from the root of this project
    browserSync({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("scss/*.scss", ['sass']);
    gulp.watch("*.html").on("change", browserSync.reload);
});