var minify = require('html-minifier').minify;

function htmlmin (obs, opts, ctx) {

    var result = minify(ctx.file.read(opts.input), {
        removeAttributeQuotes: false,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true
    });

    ctx.file.write(opts.output, result);
    obs.done();
}

module.exports.tasks = [htmlmin];
