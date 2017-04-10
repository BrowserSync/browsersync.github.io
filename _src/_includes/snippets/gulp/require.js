var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

// Static server
gulp.task('browser-sync', function(async) { // async support
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

// or...

gulp.task('browser-sync', function(async) { // async support
    browserSync.init({
        proxy: "yourlocal.dev"
    });
});