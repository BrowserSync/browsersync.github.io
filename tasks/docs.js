var cp       = require("child_process");
var prettify = require('gulp-jsbeautifier');
var yuidoc   = require("gulp-yuidoc");

/**
 * Run the node program to pre-construct the docs
 * @param obs
 */
function buildDocs (obs) {
    cp.spawn("node", ["tasks/_makeDocs"], {stdio: "inherit"}).on("close", obs.onCompleted.bind(obs));
}

/**
 * Run YUI docs against BrowserSync codebase
 * @param obs
 * @returns {*|{results}|{clear, results}|{selectionChange}}
 */
function yuidocs (obs, opts, ctx) {

    return ctx.vfs.src([
        opts.index,
        opts.config
    ])
        .pipe(yuidoc.parser())
        .pipe(prettify({mode: 'VERIFY_AND_WRITE'}))
        .pipe(ctx.vfs.dest(opts.output));
}

module.exports.tasks = [yuidocs, buildDocs];
