var cb = require('crossbow');
var bs = require('browser-sync').create();
var pkg = require('./package.json');
/**
 * Set ENV vars that will be available to scripts
 */
cb.env({
    JS_ENTRY :'js/app.js',
    JS_BUNDLE :'public/js/app.js',
    JS_MIN :'public/js/app.min.js',
    AUTH: 'root@178.62.0.17',
    DOCKER_HUB_NAME: 'shakyshane/bs-website'
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
        '@npm browserify $JS_ENTRY -o $JS_BUNDLE -d -t [ babelify --presets [ es2015 ] ]',
        '@npm uglifyjs $JS_BUNDLE > $JS_MIN'
    ]
});

/**
 * Build for production
 */
cb.task('build-all', {
    description: 'Run all build tasks',
    tasks: ["_html", "build-css", "icons", "build-js"],
    runMode: 'parallel'
});

/**
 * Group helper for all HTML related tasks
 */
cb.task('_html', ["docs", "templates", "html-min", "merkle --dir public-html"]);
cb.task('docker-build', {
    adaptor: 'sh',
    command: 'docker build . -t $DOCKER_HUB_NAME'
});
cb.task('docker-push', {
    adaptor: 'sh',
    command: 'docker push $DOCKER_HUB_NAME'
});

/**
 * Deploy to production
 */
cb.task('deploy', {
    description: 'Build & Deploy the website to Docker Hub',
    tasks: ['docker-build', 'docker-push'],
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
        bs.init({
            proxy: '0.0.0.0:8080',
            logFileChanges: false,
            open: false
        });
        // cb.watch(['_src/**', '*.yml'], ['templates', () => bs.reload()], {block: true});
        // cb.watch(['scss'], ['build-css', () => bs.reload(['core.css', 'core.min.css'])]);
        // cb.watch(['js'], ['build-js', () => bs.reload()]);
    }]
});
/**
 * Copy SW scripts
 */
cb.task('copy-sw', function () {
    var vfs = require('vinyl-fs');
    return vfs.src(['node_modules/sw-toolbox/sw-toolbox.js', 'public/js/runtime-caching.js'])
        .pipe(vfs.dest('public/js/sw'));
});

cb.task('service-worker', ['copy-sw'], function () {
    const swPrecache = require('sw-precache');
    const rootDir = 'public';

    return swPrecache.write('public/sw.js', {
        // Used to avoid cache conflicts when serving on localhost.
        cacheId: pkg.name || 'web-starter-kit',
        // sw-toolbox.js needs to be listed first. It sets up methods used in runtime-caching.js.
        importScripts: [
            'js/sw/sw-toolbox.js',
            'js/sw/runtime-caching.js'
        ],
        staticFileGlobs: [
            // Add/remove glob patterns to match your directory setup.
            `${rootDir}/js/**/*.js`,
            `${rootDir}/img/jh-logo-white.png`,
            `${rootDir}/img/icons/icons.svg`,
            `${rootDir}/img/bg.jpg`
        ],
        dynamicUrlToDependencies: {
            "/": ["public-html/index.html"],
            "/brand-assets": ["public-html/brand-assets/index.html"],
            "/docs/api": ["public-html/docs/api/index.html"],
            "/docs/command-line": ["public-html/docs/command-line/index.html"],
            "/docs/grunt": ["public-html/docs/grunt/index.html"],
            "/docs/gulp": ["public-html/docs/gulp/index.html"],
            "/docs/http-protocol": ["public-html/docs/http-protocol/index.html"],
            "/docs": ["public-html/docs/index.html"],
            "/docs/options": ["public-html/docs/options/index.html"],
            "/docs/recipes": ["public-html/docs/recipes/index.html"],
        },
        // Translates a static file path to the relative URL that it's served from.
        // This is '/' rather than path.sep because the paths returned from
        // glob always use '/'.
        stripPrefix: rootDir + '/'
    });
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
