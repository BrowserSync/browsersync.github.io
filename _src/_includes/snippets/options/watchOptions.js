const bs = require('browser-sync').create();

// Options passed to Chokidar
bs.init({
    watchOptions: {
        ignoreInitial: true,
        ignored: '*.txt'
    },
    files: ['./app']
});

// options for chokidar with custom callback
// since 2.6.0
bs.init({
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
});

// NOTE: the .watch() method will not receive
// these options automatically, so you must provide
// them manually in the following way
bs.watch(['app/*.css'], {ignored: '*.map.css'});
