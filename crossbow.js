module.exports = {
    tasks: {
        build: ["crossbow", "sass", "icons"],
        icons: [
            "tasks/icons.js"
        ]
    },
    watch: {
        "bs-config": {
            server: true
        },
        default: {
            "img/svg/*.svg": ["icons", "bs:reload"],
            "scss/**": ["sass", "bs:reload:core.min.css"]
        },
        "crossbow": [
            {
                patterns: ["_src/**", "*.yml"],
                tasks: ["crossbow", "bs:reload"]
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
        }
    }
};
