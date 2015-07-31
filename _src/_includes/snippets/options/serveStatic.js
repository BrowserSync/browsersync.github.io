var bs = require('browser-sync').create();

// Run in proxy mode with static files also served
// from current directory + ./app/css
bs.init({
    proxy: "http://www.bbc.co.uk",
    serveStatic: ['.', './app/css']
});