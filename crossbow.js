module.exports = {
    tasks: {
        build: ["docs", "crossbow", "html-min", "sass", "icons", "js"],
        icons: ["tasks/icons.js"],
        js:    ["babel-browserify", "uglify"]
    },
    watch: {
        "bs-config": {
            server: true,
            middleware: require('compression')()
        },
        tasks: {
            default: {
                "img/svg/*.svg": ["icons", "bs:reload"],
                "scss/**":       ["sass", "bs:reload:core.min.css"],
                "js/*.js":       ["js", "bs:reload"],
                "_src/**:*.yml": ["crossbow", "html-min", "bs:reload"]
            }
        }
    },
    config: {
        "sass": {
            "input": "scss/core.scss",
            "output": "css/core.min.css"
        },
        "icons": {
            "yml": "_config.yml",
            "output": "img/icons"
        },
        "crossbow": {
            "base": "_src",
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
            input: 'index.src/index.html',
            output: 'index.html'
        },
        "docs": {
            output: "_doc",
            index: "node_modules/browser-sync/index.js",
            config: "node_modules/browser-sync/lib/default-config.js"
        }
    }
};
