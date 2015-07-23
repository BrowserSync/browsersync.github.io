var minify = require('html-minifier').minify;

function htmlmin (deferred, previous, ctx) {

    var result = minify(ctx.file.read('html-min.input'), {
        removeAttributeQuotes: false,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true
    });

    ctx.file.write('html-min.output', result);

    deferred.resolve();
}

module.exports.tasks = [htmlmin];
