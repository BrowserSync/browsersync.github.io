var minify = require('html-minifier').minify;
var write = require('fs').writeFileSync;
var read = require('fs').readFileSync;

function htmlmin (opts) {

    var result = minify(read(opts.input, 'utf8'), {
        removeAttributeQuotes: false,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true
    });

    write(opts.output, result);
}

module.exports.tasks = [htmlmin];
