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
var htmlinjector = require("bs-html-injector");


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

function crossbowBuild () {
    return gulp.src([
        "_src/*.hbs",
        "_src/*.html",
        "_src/docs/*"
    ])
        .pipe(crossbow.stream({
            config: {
                base: "_src",
                prettyUrls: true
            },
            data: {
                site:    "file:_config.yml",
                options: "file:_doc/options.json",
                api:     "file:_doc/api.json",
                startCommands: "file:../node_modules/browser-sync/lib/cli/opts.start.json",
                reloadCommands: "file:../node_modules/browser-sync/lib/cli/opts.reload.json",
                recipes: require("bs-recipes/manifest.json")
            }
        }))
        .pipe(gulp.dest("./"));
}

/**
 * Build the Crossbow Site
 */
gulp.task("crossbow", function () {

    return gulp.src([
        "_src/*.hbs",
        "_src/*.html",
        "_src/docs/*"
    ])
    .pipe(crossbow.stream({
        config: {
            base: "_src",
            prettyUrls: true
        },
        data: {
            site:    "file:_config.yml",
            options: "file:_doc/options.json",
            api:     "file:_doc/api.json",
            recipes: require("bs-recipes/manifest.json")
        }
    }))
    .pipe(gulp.dest("./"));

});

/**
 * Wait for crossbow-build, then launch the Server
 */
gulp.task("serve", ["sass", "crossbow"], function() {
    //browserSync.use(htmlinjector, {
    //    excludedTags: ["HTML", "HEAD", "BODY"]
    //});
    browserSync({
        files: "css/*.css",
        open: false,
        server: {
            baseDir: ["./"]
        },
        plugins: ["bs-html-injector"]
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

function buildDocs () {
    console.time("compile");
    var yuidoc = require("gulp-yuidoc");
    yuidocs(function () {
        console.log("created docs from source");
        cp.spawn("node", ["_makeDocs"], {stdio: "inherit"})
            .on("close", function () {
                console.log("Ran node _makeDocs.js");
                crossbowBuild().on("end", function () {
                    console.timeEnd("compile");
                    console.log("Ran Crossbow");
                    browserSync.notify("<span style='color: magenta'>Crossbow:</span> Injecting new HTML");
                    htmlinjector();
                });
            });
    });
}

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run crossbow & reload BrowserSync
 */
gulp.task("watch", function () {
    gulp.watch("scss/**", ["sass"]);
    var bs1 = browserSync.create();
    bs1.watch([
        "_src/**",
        "_config.yml",
        "/Users/shaneobsourne/code/browser-sync/index.js",
        "*.js",
        "/Users/shaneobsourne/code/browser-sync/lib/default-config.js"
    ]).on("change", buildDocs);
});


function yuidocs (cb) {

    var yuidoc = require("gulp-yuidoc");

    return gulp.src([
        "/Users/shaneobsourne/code/browser-sync/index.js",
        //"./node_modules/browser-sync/index.js",
        "/Users/shaneobsourne/code/browser-sync/lib/default-config.js"
    ])
        .pipe(yuidoc.parser())
        .pipe(prettify({mode: 'VERIFY_AND_WRITE'}))
        .pipe(gulp.dest("./_doc"))
        .on("end", function () {
             cb();
        });
}
/**
 * Create documentation from the BrowserSync Source code
 */
gulp.task("docs", function () {

    var yuidoc = require("gulp-yuidoc");

    return gulp.src([
        "/Users/shaneobsourne/code/browser-sync/index.js",
        //"./node_modules/browser-sync/index.js",
        "./node_modules/browser-sync/lib/default-config.js"
    ])
        .pipe(yuidoc.parser())
        .pipe(prettify({mode: 'VERIFY_AND_WRITE'}))
        .pipe(gulp.dest("./_doc"));
});

gulp.task("build", ["docs", "docs-build", "crossbow", "sass"]);
