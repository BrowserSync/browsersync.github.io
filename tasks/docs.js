var cp       = require("child_process");
var prettify = require('gulp-jsbeautifier');
var yuidoc   = require("gulp-yuidoc");

/**
 * Run the node program to pre-construct the docs
 * @param deferred
 */
function buildDocs (deferred) {
    cp.spawn("node", ["tasks/_makeDocs"], {stdio: "inherit"}).on("close", deferred.resolve);
}

/**
 * Run YUI docs against BrowserSync codebase
 * @param deferred
 * @returns {*|{results}|{clear, results}|{selectionChange}}
 */
function yuidocs (deferred, previous, ctx) {

    return ctx.vfs.src([
        ctx.path.make('docs.index'),
        ctx.path.make('docs.config')
    ])
        .pipe(yuidoc.parser())
        .pipe(prettify({mode: 'VERIFY_AND_WRITE'}))
        .pipe(ctx.vfs.dest(ctx.config.docs.output))
        .on("end", deferred.resolve);
}

module.exports.tasks = [yuidocs, buildDocs];
