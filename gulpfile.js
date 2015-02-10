var gulp        = require("gulp");
var fs          = require("fs");
var browserSync = require("browser-sync");
var sass        = require("gulp-sass");
var minifyCSS   = require("gulp-minify-css");
var rename      = require("gulp-rename");
var prefix      = require("gulp-autoprefixer");
var cp          = require("child_process");
var filter      = require("gulp-filter");
var svgSprite   = require("gulp-svg-sprites");
var crossbow    = require("crossbow");
var prettify    = require('gulp-jsbeautifier');
var yaml        = require('js-yaml');


/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task("default", ["serve", "watch"]);

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

    var siteData    = yaml.safeLoad(fs.readFileSync('_config.yml', 'utf8'));

    siteData.docs = {
        options: require("./_doc/options.json"),
        api: require("./_doc/api.json")
    };

    return gulp.src([
        "_src/*.hbs",
        "_src/*.html",
        "_src/docs/*"
    ])
    .pipe(crossbow.stream({
        cwd: "_src",
        prettyUrls: true,
        data: {
            site: siteData
        }
    }))
    .pipe(gulp.dest("./"));

});

/**
 * Wait for crossbow-build, then launch the Server
 */
gulp.task("serve", ["sass", "crossbow"], function() {
    browserSync({
        files: "css/*.css",
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
        files: "css/**",
        open: false,
        server: {
            baseDir: "./"
        }
    }, function (err, bs) {

    });
});

gulp.task("dist", ["build", "serve-dist"]);

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task("sass", function () {
    browserSync.notify("Compiling SASS...");
    return gulp.src(["scss/core.scss"])
        .pipe(sass())
        .on("error", function(err){
            browserSync.notify(err.message, 3000);
            console.log(err.message);
            this.emit("end");
        })
        .pipe(prefix())
        .pipe(minifyCSS({keepBreaks:true}))
        .pipe(rename("core.min.css"))
        .pipe(gulp.dest("css"));
});

/**
 * Only build/serve svgs from the icon set that are actually used in the site.
 */
gulp.task('sprites', function () {
    var sitedata = yaml.safeLoad(fs.readFileSync('_config.yml', 'utf8'));

    var usedsvgs = sitedata.icons.map(function (item) {
        return "img/svg/" + item.icon + ".svg";
    });

    return gulp.src(usedsvgs)
        .pipe(svgSprite({
            baseSize: 16,
            cssFile: "../../scss/theme/_sprite.scss",
            svgPath: "../img/icons/svg/sprite.svg",
            pngPath: "../img/icons/svg/sprite.png"
        }))
        .pipe(gulp.dest("img/icons"));
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run crossbow & reload BrowserSync
 */
gulp.task("watch", function () {
    gulp.watch("scss/**", ["sass"]);
    gulp.watch(["_src/**", "_config.yml"], ["crossbow", function () {
        browserSync.reload();
    }]);
});

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
