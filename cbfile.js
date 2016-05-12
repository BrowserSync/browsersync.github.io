var cb = require('crossbow-cli');
var bs = require('browser-sync').create();

cb.options({
    crossbow: {
        base: "_src",
        output: "public",
        input: [
            "_src/*.hbs",
            "_src/*.html",
            "_src/docs/*"
        ]
    },
    "html-min": {
        input: 'public/index.src/index.html',
        output: 'public/index.html'
    },
    "node_modules/crossbow-sass/index.js": {
        "input": "scss/core.scss",
        "output": "css"
    },
    /**
     * tasks/icons.js
     */
    "icons": {
        "yml": "_config.yml",
        "output": "img/icons"
    },
    "docs": {
        output: "_doc",
        index: "node_modules/browser-sync/index.js",
        config: "node_modules/browser-sync/lib/default-config.js"
    }
});

/**
 * HTML templates
 */
cb.task('templates', ['crossbow', 'html-min']);
cb.task('sass',      ['node_modules/crossbow-sass/index.js']);
cb.task('sassprod',  ['node_modules/crossbow-sass/index.js --production']);

/**
 * JS tasks
 */
const js     = 'js/app.js';
const jsdist = 'js/app.js';
const jsmin  = 'js/dist/app.min.js';

/**
 * JS/npm tasks
 */
cb.task('js', [
    `browserify ${js} -o ${jsdist} -d -t [ babelify --presets [ es2015 ] ]`,
    `uglifyjs ${jsdist} > ${jsmin}`,
].map(x => '@npm ' + x));

/**
 * Build for production
 */
cb.task('build', ["docs", "crossbow", "html-min", "sassprod", "icons", "js"]);

/**
 * Serve Tasks
 */

cb.task('serve', ['templates'], function () {
    bs.init({
        server: ['./', 'public'],
        logFileChanges: false,
        open: false
    });
    cb.watch(['_src/**', '*.yml'], ['templates', function browsersyncReload() {
        bs.reload();
    }], {block: true})
    cb.watch(['scss'], ['sass', () => bs.reload(['core.css', 'core.min.css'])]);
});
