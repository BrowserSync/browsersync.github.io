var yaml    = require('js-yaml');
var read    = require('fs').readFileSync;
var easysvg = require('easy-svg');

function icons (deferred, previous, ctx) {

    var sitedata = yaml.safeLoad(read(ctx.path.make('easy-svg.yml'), 'utf8'));

    /**
     * SVG icons used on the site, but not in yaml
     * // todo -  crossbow plugin to build a manifest of each icon used
     * @type {string[]}
     */
    var globals  = [
        'logo', 'github', 'twitter', 'circle-play', 'apple', 'windows', 'linux'
    ];

    /**
     * Create file paths for each
     * @type {Array}
     */
    var usedsvgs = sitedata.icons
        .map(function (item) { return item.icon; })
        .concat(globals)
        .map(function (item) { return "img/svg/" + item + ".svg" });

    ctx.vfs.src(usedsvgs)
        .pipe(easysvg.stream())
        .pipe(ctx.vfs.dest("img/icons"))
        .on('end', deferred.resolve)
        .on('error', deferred.reject);
}

module.exports.tasks = [icons];
