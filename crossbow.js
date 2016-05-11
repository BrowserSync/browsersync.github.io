const js = 'js/dist/app.js';
const jsdist = 'js/dist/app.min.js';
module.exports = {
    tasks: {
        deploy: ["build", "cp", "rsync", "$shell open https://browsersync.io"],
        test:   ["build", "cp", "@shell browser-sync start --server public --https"],
        rsync:  ["@sh rsync -pazv ./public/ root@178.62.0.17:/usr/share/nginx/browsersync --delete"],
        build:  ["docs", "crossbow", "html-min", "sassprod", "icons", "build-js"],
        cp:     ["copy:*"],
        "build-js": ['js', 'uglify'],
        js:       ["@npm browserify js/app.js -o js/dist/app.js -d -t [ babelify --presets [ es2015 ] ]"],
        uglify:   `@npm uglifyjs ${js} > ${jsdist}`,
        html:     ['crossbow'],
        sass:     'node_modules/crossbow-sass/index.js',
        sassprod: 'node_modules/crossbow-sass/index.js --production'
    },
    watch: {
        "default": {
            "before":        ["build", function () {
                console.log('Sup');
            }],
            "img/svg/*.svg": ["icons", "bs:reload"],
            "scss/**":       ["sass", "bs:reload"],
            "js/*.js":       ["build-js", "uglify", "bs:reload"],
            "_src/**:*.yml": ["crossbow", "html-min", "bs:reload"]
        }
    },
    options: {
        "node_modules/crossbow-sass/index.js": {
            "input": "scss/core.scss",
            "output": "css"
        },
        "icons": {
            "yml": "_config.yml",
            "output": "img/icons"
        },
        "crossbow": {
            "base": "_src",
            "output": "public",
            "input": [
                "_src/*.hbs",
                "_src/*.html",
                "_src/docs/*"
            ]
        },
        "uglify": {
            input: 'js/dist/app.js',
            output: 'js/dist/app.min.js'
        },
        "html-min": {
            input: 'public/index.src/index.html',
            output: 'public/index.html'
        },
        "docs": {
            output: "_doc",
            index: "node_modules/browser-sync/index.js",
            config: "node_modules/browser-sync/lib/default-config.js"
        }
    }
};
