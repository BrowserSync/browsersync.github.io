var vfs = require('vinyl-fs');

module.exports = function (opts) {
    return vfs.src(opts.input).pipe(vfs.dest(opts.output));
};