var bs = require('browser-sync').create();

// Run in proxy mode with static files also served
// from current directory + ./app/css
bs.init({
    proxy: 'http://www.bbc.co.uk',
    serveStatic: ['.', './app/css']
});

// Run in proxy mode where files under /assets will be served
// from a local ./tmp directory
// NOTE: requires 2.17.0
bs.init({
    proxy: 'http://www.bbc.co.uk',
    serveStatic: [{
        route: '/assets',
        dir: 'tmp'
    }]
});

// Run in proxy mode where files under /assets + /content will be served
// from a local ./tmp directory
// NOTE: requires 2.17.0
bs.init({
    proxy: 'http://www.bbc.co.uk',
    serveStatic: [{
        route: ['/assets', '/content'],
        dir: 'tmp'
    }]
});

// Run in proxy mode where files under /assets will be served
// from either the ./tmp or ./app directory
// NOTE: requires 2.17.0
bs.init({
    proxy: 'http://www.bbc.co.uk',
    serveStatic: [{
        route: '/assets',
        dir: ['./tmp', './app']
    }]
});
