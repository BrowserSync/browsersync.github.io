var minify = require('html-minifier').minify;

function htmlmin (deferred, opts, ctx) {

    var result = minify(ctx.file.read(opts.input), {
        removeAttributeQuotes: false,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true
    });

    ctx.file.write(opts.output, result);

    deferred.done();
}

module.exports.tasks = [htmlmin];
