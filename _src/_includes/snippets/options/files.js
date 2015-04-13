// single file
files: "app/css/style.css"

// multiple files
files: ["app/css/style.css", "app/js/*.js"]

// patterns + 1 with custom callback
// since 2.6.0
files: [
    "wp-content/themes/**/*.css",
    {
        match: ["wp-content/themes/**/*.php"],
        fn: function (event, file) {
            /** Custom event handler **/
        }
    }
]