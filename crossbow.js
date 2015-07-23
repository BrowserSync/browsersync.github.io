module.exports = {
    tasks: {
        build: ["crossbow", "sass", "icons", "js", "html-min"],
        icons: ["tasks/icons.js"],
        js:    ["babel-browserify", "uglify"]
    },
    watch: {
        "bs-config": {
            server: true,
            middleware: require('compression')()
        },
        default: {
            "img/svg/*.svg": ["icons", "bs:reload"],
            "scss/**": ["sass", "bs:reload:core.min.css"],
            "js/*.js": ["js", "bs:reload"],
        },
        "crossbow": [
            {
                patterns: ["_src/**", "*.yml"],
                tasks: ["crossbow", "html-min", "bs:reload"]
            }
        ]
    },
    config: {
        "sass": {
            "input": "scss/core.scss",
            "output": "css/core.min.css"
        },
        "easy-svg": {
            "yml": "_config.yml"
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
    }
};
