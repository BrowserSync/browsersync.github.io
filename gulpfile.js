var gulp        = require("gulp");
var browserSync = require("browser-sync");
var sass        = require("gulp-sass");
var minifyCSS   = require("gulp-minify-css");
var rename      = require("gulp-rename");
var prefix      = require("gulp-autoprefixer");
var cp          = require("child_process");
var filter      = require("gulp-filter");
var crossbow    = require("crossbow");
var prettify    = require('gulp-jsbeautifier');

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

    return gulp.src([
        "_src/*.hbs",
        "_src/*.html",
        "_src/docs/*"
    ])
    .pipe(crossbow.stream({
        cwd: "_src",
        siteConfig: "_config.yml",
        prettyUrls: true
    }))
    .pipe(gulp.dest("./"));

});

/**
 * Wait for crossbow-build, then launch the Server
 */
gulp.task("serve", ["sass", "crossbow"], function() {
    browserSync({
        open: false,
        server: {
            baseDir: ["./"]
        }
    });
});

/**
 * Wait for crossbow-build, then launch the Server
 */
gulp.task("serve-dist", function() {
    browserSync({
        open: false,
        server: {
            baseDir: "./"
        }
    });
});

gulp.task("dist", ["build", "serve-dist"]);

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task("sass", function () {
    browserSync.notify("Compiling SASS...");
    return gulp.src(["_src/scss/core.scss"])
        .pipe(sass())
        .on("error", function(err){
            browserSync.notify(err.message, 3000);
            console.log(err.message);
            this.emit("end");
        })
        .pipe(prefix())
        .pipe(gulp.dest("css"))
        .pipe(minifyCSS({keepBreaks:true}))
        .pipe(filter("**/*.css"))
        .pipe(rename("core.min.css"))
        .pipe(gulp.dest("css"))
        .pipe(browserSync.reload({stream:true}));
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run crossbow & reload BrowserSync
 */
gulp.task("watch", function () {
    gulp.watch("_src/scss/**/*", ["sass"]);
    gulp.watch(["_src/**"], ["crossbow", browserSync.reload]);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task("default", ["serve", "watch"]);

/**
 * Create documentation from the BrowserSync Source code
 */
gulp.task("docs", function () {

    var yuidoc = require("gulp-yuidoc");

    return gulp.src(["./node_modules/browser-sync/index.js", "./node_modules/browser-sync/lib/default-config.js"])
        .pipe(yuidoc.parser())
        .pipe(prettify({mode: 'VERIFY_AND_WRITE'}))
        .pipe(gulp.dest("./doc"));
});

gulp.task("build", ["docs", "docs-build", "crossbow", "sass"]);
