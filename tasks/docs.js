var cp       = require("child_process");
var prettify = require('gulp-jsbeautifier');
var yuidoc   = require("gulp-yuidoc");
var vfs      = require("vinyl-fs");

/**
 * Run the node program to pre-construct the docs
 * @param deferred
 */
function buildDocs (opts, ctx, done) {
    cp.spawn("node", ["tasks/_makeDocs"], {stdio: "inherit"}).on('close', done);
}

/**
 * Run YUI docs against BrowserSync codebase
 * @param deferred
 * @returns {*|{results}|{clear, results}|{selectionChange}}
 */
function yuidocs (opts, ctx, done) {

    return vfs.src([
        opts.index,
        opts.config
    ])
    .pipe(yuidoc.parser())
    .pipe(prettify({mode: 'VERIFY_AND_WRITE'}))
    .pipe(vfs.dest(opts.output))
}

module.exports.tasks = [yuidocs, buildDocs];
