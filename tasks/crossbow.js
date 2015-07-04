var crossbow = require('crossbow');

function crossbowBuild (deferred, resolved, ctx) {

    var input = ctx.get('config.crossbow.input').map(function (item) {
        return ctx.resolve(item);
    });

    ctx.vfs.src(input)
        .pipe(crossbow.stream({
            config: {
                base: ctx.get('config.crossbow.base'),
                prettyUrls: true
            },
            data: {
                site:           "file:_config.yml",
                options:        "file:_doc/options.json",
                api:            "file:_doc/api.json",
                startCommands:  "file:../node_modules/browser-sync/lib/cli/opts.start.json",
                reloadCommands: "file:../node_modules/browser-sync/lib/cli/opts.reload.json",
                recipes:        "file:../node_modules/bs-recipes/manifest.json"
            }
        }))
        .pipe(ctx.vfs.dest(ctx.opts.cwd))
        .on("end", deferred.resolve)
        .on('error', deferred.reject);

}

module.exports.tasks = [crossbowBuild];
