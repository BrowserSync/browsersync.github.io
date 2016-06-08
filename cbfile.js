var cb = require('crossbow-cli');
var bs = require('browser-sync').create();

/**
 * Set ENV vars that will be available to scripts
 */
cb.env({
    JS_ENTRY :'js/app.js',
    JS_BUNDLE :'public/js/app.js',
    JS_MIN :'public/js/app.min.js',
    AUTH: 'root@178.62.0.17'
});

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
    tasks: [
        // '@npm browserify $JS_ENTRY -o $JS_BUNDLE -d -t [ babelify --presets [ es2015 ] ]',
        // '@npm uglifyjs $JS_BUNDLE > $JS_MIN'
        '@npm browserify js/app.js -d -t [ babelify --presets [ es2015 ] ] | uglifyjs -cm > public/js/app.min.js'
    ]
});

/**
 * Build for production
 */
cb.task('build-all', {
    description: 'Run all build tasks',
    tasks: ["_html", "build-css", "build-js", "icons", "_merkle", "build-sw"]
});

/**
 * Build service worker file
 */
cb.task('build-sw', {
    description: 'Build service worker file',
    tasks: ["sw"]
});

/**
 * Group helper for all HTML related tasks
 */
cb.task('_merkle', ["merkle --dir public", "merkle --dir public-html"]);
cb.task('_html', ["docs", "templates", "html-min"]);
cb.task('rsync', {
    adaptor: 'sh',
    command: 'rsync -ra public public-html $AUTH:/usr/share/nginx/bs2 --delete'
});

/**
 * Deploy to production
 */
cb.task('deploy', {
    description: 'Build & Deploy the website to Digital Ocean',
    tasks: ['build-all', 'rsync'],
});

/**
 *
 */
cb.task('docker', '@sh docker-compose -f docker-compose-dev.yaml up -d');

/**
 * Serve Tasks
 */
cb.task('serve', {
    description: 'Build HTML/CSS then launch Docker + Browsersync',
    tasks: ['templates', 'build-css', 'docker', function () {
        cb.watch(['_src/**', '*.yml'], ['templates', () => bs.reload()], {block: true});
        cb.watch(['scss'], ['build-css', () => bs.reload(['core.css', 'core.min.css'])]);
        cb.watch(['js'], ['build-js', () => bs.reload()]);
    }]
});

cb.options({
    "crossbow-sass": {
        input: 'scss/core.scss',
        output: 'public/css'
    },
    crossbow: {
        base: "_src",
        output: "public-html",
        input: [
            "_src/*.hbs",
            "_src/*.html",
            "_src/docs/*"
        ]
    },
    "html-min": {
        input: 'public-html/index.src/index.html',
        output: 'public-html/index.html'
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
        "output": "public/img/icons"
    },
    "docs": {
        output: "_doc",
        index: "node_modules/browser-sync/index.js",
        config: "node_modules/browser-sync/lib/default-config.js"
    }
});
