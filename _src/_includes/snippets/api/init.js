var bs = require("browser-sync").create();

// Start a Browsersync static file server
bs.init({
    server: "./app"
});

// Start a Browsersync proxy
bs.init({
    proxy: "http://www.bbc.co.uk"
});