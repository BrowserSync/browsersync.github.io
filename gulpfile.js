var gulp         = require("gulp");
var fs           = require("fs");
var browserSync  = require("browser-sync");
var cp           = require("child_process");
var crossbow     = require("crossbow");
var prettify     = require('gulp-jsbeautifier');
var yaml         = require('js-yaml');
var promseq      = require('prom-seq');
var bs           = browserSync.create();

var buildall     = promseq.create([yuidocs, buildDocs, crossbowBuild]);

var docsPaths = {
    index: "./node_modules/browser-sync/index.js",
    config: "./node_modules/browser-sync/lib/default-config.js"
};

/**
 * Gulp wrapper for docs
 */
gulp.task("docs", function (cb) {
    buildall().then(cb);
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run crossbow & reload BrowserSync
 */
gulp.task("watch", function () {
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
