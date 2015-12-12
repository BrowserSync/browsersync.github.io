module.exports = {
    tasks: {
        deploy: ["build", "rsync", "$shell open https://browsersync.io"],
        rsync:  ["$shell rsync -pazv ./public/ root@178.62.0.17:/usr/share/nginx/browsersync --delete"],
        build:  ["docs", "crossbow", "html-min", "sass", "icons", "cp"],
        cp:     ["copy:css:font:img:assets:js"],
        icons:  ["tasks/icons.js"],
        js:     ["babel-browserify", "uglify"]
    },
    watch: {
        "bs-config": {
            server: {
                baseDir: ['public'],
                https: true,
                routes: {
                    '/js': './js',
                    '/img': './img',
                    '/css': './css',
                    '/brand-assets': './brand-assets'
                }
            },
            middleware: require('compression')()
        },
        tasks: {
            "default": {
                "before":        ["docs", "crossbow", "sass"],
                "img/svg/*.svg": ["icons", "bs:reload"],
                "scss/**":       ["sass", "bs:reload:core.min.css"],
                "js/*.js":       ["js", "bs:reload"],
                "_src/**:*.yml": ["crossbow", "html-min", "bs:reload"]
            }
        }
    },
    config: {
        "copy": {
            css: {
                input: 'css/**',
                output: 'public/css'
            },
            font: {
                input: 'fonts/**',
                output: 'public/fonts'
            },
            img: {
                input: 'img/**',
                output: 'public/img'
            },
            js: {
                input: 'js/**',
                output: 'public/js'
            },
            assets: {
                input: 'brand-assets/**',
                output: 'public/brand-assets'
            }
        },
        "sass": {
            "input": "scss/core.scss",
            "output": "css/core.min.css"
        },
        "easy-svg": {
            "yml": "_config.yml"
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
        "babel-browserify": {
            input: 'js/app.js',
            root: 'js',
            output: 'js/dist/app.js'
        },
        "uglify": {
            input: 'js/dist/app.js',
            output: 'js/dist/app.min.js',
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
