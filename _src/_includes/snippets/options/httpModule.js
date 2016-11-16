// First run: npm install browser-sync http2
const bs = require('browser-sync').create();

bs.init({
    server: './app',
    httpModule: 'http2',
    https: true
});
