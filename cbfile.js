var cb = require('crossbow-cli');
var bs = require('browser-sync').create();
/**
 * JS Vars
 */
const JS_ENTRY = 'js/app.js';
const JS_BUNDLE  = 'public/js/app.js';
const JS_MIN   = 'public/js/app.min.js';

/**
 * HTML templates
 */
cb.task('templates', {
    description: 'Build HTML Templates',
    tasks: ['crossbow', 'html-min']
});

/**
 * Sass -> css
 */
cb.task('build-css', {
    description: 'Build dev + production CSS',
    tasks: ['crossbow-sass', 'crossbow-sass --production']
});

/**
 * JS tasks
 */
cb.task('build-js', {
    description: 'Build production ready JS',
    tasks: ['browserify', `uglify`]
});

cb.task('browserify', `@npm browserify ${JS_ENTRY} -o ${JS_BUNDLE} -d -t [ babelify --presets [ es2015 ] ]`);
cb.task('uglify', `@npm uglifyjs ${JS_BUNDLE} > ${JS_MIN}`);

/**
 * Build for production
 */
cb.task('build', ["docs", "crossbow", "html-min", "build-css", "icons", "js"]);

/**
 *
 */
cb.task('docker', '@sh docker-compose -f docker-compose-dev.yaml up -d');

/**
 * Serve Tasks
 */

cb.task('serve', ['templates', 'build-css', 'docker'], function () {
    bs.init({
        proxy: '0.0.0.0:8080',
        logFileChanges: false,
        open: false
    });
    cb.watch(['_src/**', '*.yml'], ['templates', () => bs.reload()], {block: true});
    cb.watch(['scss'], ['build-css', () => bs.reload(['core.css', 'core.min.css'])]);
    cb.watch(['js'], ['build-js', () => bs.reload()]);
});

cb.options({
    "crossbow-sass": {
        input: 'scss/core.scss',
        output: 'public/css'
    },
    crossbow: {
        base: "_src",
        output: "dist",
        input: [
            "_src/*.hbs",
            "_src/*.html",
            "_src/docs/*"
        ]
    },
    "html-min": {
        input: 'dist/index.src/index.html',
        output: 'dist/index.html'
    },
    "node_modules/crossbow-sass/index.js": {
        "input": "scss/core.scss",
        "output": "css"
    },
    /**
     * tasks/icons.JS_ENTRY
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
