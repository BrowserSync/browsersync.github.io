var gulp        = require("gulp");
var browserSync = require("browser-sync");
var plumber     = require('gulp-plumber');
var sass        = require("gulp-sass");
var jshint      = require("gulp-jshint");
var minifyCSS   = require("gulp-minify-css");
var rename      = require("gulp-rename");
var prefix      = require("gulp-autoprefixer");
var cp          = require("child_process");
var filter      = require("gulp-filter");
var crossbow    = require("crossbow");

/**
 * Build documentation
 */
gulp.task("docs-build", function (cb) {
    return cp.spawn("node", ["_makeDocs"], {stdio: "inherit"}).on("close", cb);
});

/**
 * Build the Crossbow Site
 */
gulp.task("crossbow", function () {

    crossbow.clearCache();

    //crossbow.emitter.on("_error", function (err) {
    //    crossbow.logger.info(err.error.message);
    //});

    return gulp.src([
        "src/*.hbs",
        "src/*.html",
        "src/docs/*"
    ])
        .pipe(crossbow.stream({
            cwd: "src",
            siteConfig: "_config.yml",
            prettyUrls: true
        }))
        //.on("error", function(err){
        //    browserSync.notify(err.message, 3000);
        //    console.log(err.message);
        //    this.emit("end");
        //})
        .pipe(gulp.dest("./_site"));

});

/**
 * Wait for crossbow-build, then launch the Server
 */
gulp.task("browser-sync", ["sass", "crossbow"], function() {
    browserSync({
        server: {
            baseDir: ["_site", "src"]
        }
    });
});

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task("sass", function () {
    browserSync.notify("Compiling SASS...");
    return gulp.src(["src/scss/core.scss"])
        .pipe(sass())
        .on("error", function(err){
            browserSync.notify(err.message, 3000);
            console.log(err.message);
            this.emit("end");
        })
        .pipe(prefix())
        .pipe(gulp.dest("_site/css"))
        .pipe(minifyCSS({keepBreaks:true}))
        .pipe(filter("**/*.css"))
        .pipe(rename("core.min.css"))
        .pipe(gulp.dest("_site/css"))
        .pipe(browserSync.reload({stream:true}));
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run crossbow & reload BrowserSync
 */
gulp.task("watch", function () {
    gulp.watch("src/scss/**/*", ["sass"]);
    gulp.watch([
        "src/**"
    ], ["crossbow", browserSync.reload]);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task("default", ["browser-sync", "watch"]);

gulp.task("build", ["sass", "docs-build", "jekyll-build"]);
