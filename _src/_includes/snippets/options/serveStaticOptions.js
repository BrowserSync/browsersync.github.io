var bs = require('browser-sync').create();

// Serve files from 3 directories with serve-static options
bs.init({
    serveStatic: ['.', './app', './temp'],
    serveStaticOptions: {
        extensions: ['html'] // pretty urls
    }
});
