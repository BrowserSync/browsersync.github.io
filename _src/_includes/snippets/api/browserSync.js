// create an instance
var bs = require('browser-sync').create();

// with config
bs.init({
    server: {
        baseDir: './'
    }
});

// with config + callback
bs.init(config, function (err, bs) {
    if (!err) {
        console.log('Browsersync is ready!');
    }
});
