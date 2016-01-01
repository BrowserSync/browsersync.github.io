module.exports = {
    tasks: {
        deploy: ["build", "cp", "rsync", "$shell open https://browsersync.io"],
        test:   ["build", "cp", "$shell browser-sync start --server public --https"],
        rsync:  ["$shell rsync -pazv ./public/ root@178.62.0.17:/usr/share/nginx/browsersync --delete"],
        build:  ["docs", "crossbow", "html-min", "sass", "icons", "build-js"],
        cp:     ["copy:css:font:img:assets:js"],
        icons:  ["tasks/icons.js"],
        "build-js": ['jss', 'uglify'],
        jss:    ["$shell ./node_modules/.bin/browserify js/app.js -o js/dist/app.js -d -t [ babelify --presets [ es2015 ] ]"],
        uglify: ["$shell ./node_modules/.bin/uglifyjs js/dist/app.js > js/dist/app.min.js"]
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
                "before":        ["build"],
                "img/svg/*.svg": ["icons", "bs:reload"],
                "scss/**":       ["sass", "bs:reload:core.min.css"],
                "js/*.js":       ["build-js", "uglify", "bs:reload"],
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
