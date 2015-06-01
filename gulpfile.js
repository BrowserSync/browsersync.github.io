var gulp         = require("gulp");
var fs           = require("fs");
var browserSync  = require("browser-sync");
var sass         = require("gulp-sass");
var minifyCSS    = require("gulp-minify-css");
var rename       = require("gulp-rename");
var prefix       = require("gulp-autoprefixer");
var cp           = require("child_process");
var crossbow     = require("crossbow");
var prettify     = require('gulp-jsbeautifier');
var yaml         = require('js-yaml');
var promseq      = require('prom-seq');
var bs           = browserSync.create();
var easysvg      = require('easy-svg');
var buildall     = promseq.create([yuidocs, buildDocs, crossbowBuild]);
var docsPaths = {
    index: "./node_modules/browser-sync/index.js",
    config: "./node_modules/browser-sync/lib/default-config.js"
};

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task("default", ["serve", "watch"]);

/**
 * Wait for crossbow-build, then launch the Server
 */
gulp.task("serve", ["build"], function() {
    bs.init({
        open: false,
        server: {
            baseDir: ["./"]
        }
    });
});

/**
 * Gulp wrapper for docs
 */
gulp.task("docs", function (cb) {
    buildall().then(cb);
});

/**
 * Gulp wrapper for sass + docs
 */
gulp.task("build", ["sass", "docs"]);

/**
 * Build the crossbow site.
 * @param deferred
 * @returns {*|{results}|{clear, results}|{selectionChange}}
 */
function crossbowBuild (deferred) {

    gulp.src([
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
    .pipe(gulp.dest("./"))
    .on("end", deferred.resolve);

    return deferred.promise;
}

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task("sass", function () {
    bs.notify("Compiling SASS...");
    return gulp.src(["scss/core.scss"])
        .pipe(sass())
        .on("error", function(err){
            bs.notify(err.message, 3000);
            console.log(err.message);
            this.emit("end");
        })
        .pipe(prefix())
        .pipe(minifyCSS({keepBreaks:true}))
        .pipe(rename("core.min.css"))
        .pipe(gulp.dest("css"))
        .pipe(bs.stream());
});

/**
 * Only build/serve svgs from the icon set that are actually used in the site.
 */
gulp.task('svg', function () {
    var sitedata = yaml.safeLoad(fs.readFileSync('_config.yml', 'utf8'));
    var usedsvgs = sitedata.icons.map(function (item) {
        return "img/svg/" + item.icon + ".svg";
    });

    return gulp.src(usedsvgs)
        .pipe(easysvg.stream())
        .pipe(gulp.dest("img/icons"));
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run crossbow & reload BrowserSync
 */
gulp.task("watch", function () {
    gulp.watch("scss/**", ["sass"]);
    bs.watch([
        "_src/**",
        "_config.yml"
    ]).on("change", function () {
        crossbowBuild(promseq.defer())
            .then(bs.reload)
            .catch(printError);
    });
    bs.watch([
        "*.js",
        docsPaths.index,
        docsPaths.config
    ]).on("change", function () {
        buildall()
            .then(bs.reload)
            .catch(printError);
    });
});

/**
 * @param err
 */
function printError(err) {
    console.error(err);
    bs.notify("ERROR: " + err.message);
}


/**
 * Run the node program to pre-construct the docs
 * @param deferred
 */
function buildDocs (deferred) {
    cp.spawn("node", ["_makeDocs"], {stdio: "inherit"}).on("close", deferred.resolve);
}

/**
 * Run YUI docs against BrowserSync codebase
 * @param deferred
 * @returns {*|{results}|{clear, results}|{selectionChange}}
 */
function yuidocs (deferred) {

    var yuidoc = require("gulp-yuidoc");

    return gulp.src([
        docsPaths.index,
        docsPaths.config
    ])
    .pipe(yuidoc.parser())
    .pipe(prettify({mode: 'VERIFY_AND_WRITE'}))
    .pipe(gulp.dest("./_doc"))
    .on("end", deferred.resolve);
}