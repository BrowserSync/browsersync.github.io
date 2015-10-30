var crossbow = require('crossbow');

function crossbowBuild (obs, opts, ctx) {

    var input = opts.input.map(function (item) {
        return ctx.resolve(item);
    });

    return ctx.vfs.src(input)
        .pipe(crossbow.stream({
            config: {
                base: opts.base,
                prettyUrls: true,
                highlight: {
                    postProcess: function (highlighted, lang) {
                        return '<div class="highlight-block"><div class="highlight-header"><span class="circle"></span><span class="circle"></span><span class="circle"></span><svg class="svg-icon "><use xlink:href="/img/icons/icons.svg#svg-code"></use></svg></div>%s</div>'.replace('%s', highlighted);
                    }
                }
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
        .pipe(ctx.vfs.dest(ctx.opts.cwd));
}

module.exports.tasks = [crossbowBuild];
