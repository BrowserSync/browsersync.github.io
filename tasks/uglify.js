var UglifyJS = require("uglify-js");

function uglify (deferred, previous, ctx) {

    if (ctx.trigger.type === 'command') {
        var result = UglifyJS.minify(ctx.path.make('uglify.input'));
        ctx.file.write('uglify.output', result.code);
    } else {
        console.log(ctx.trigger.type);
    }

    deferred.resolve();
}

module.exports.tasks = [uglify];
