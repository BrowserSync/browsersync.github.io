var UglifyJS = require("uglify-js");

function uglify (obs, opts, ctx) {

    if (ctx.trigger.type === 'command') {
        var result = UglifyJS.minify(ctx.path.make(opts.input));
        ctx.file.write(opts.output, result.code);
    } else {
        console.log(ctx.trigger.type);
    }

    obs.done();
}

module.exports.tasks = [uglify];
