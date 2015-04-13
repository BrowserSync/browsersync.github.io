// Options passed to Chokidar
watchOptions: {
    ignoreInitial: true,
    ignored: '*.txt'
}

// options for chokidar with custom callback
// since 2.6.0
files: [
    {
        match: ["wp-content/themes/**/*.php"],
        fn: function (event, file) {
            /** Custom event handler **/
        },
        options: {
            ignored: '*.txt'
        }
    }
]