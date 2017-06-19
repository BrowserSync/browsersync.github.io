var bs = require('browser-sync').create();

// Start the server
bs.init({server: './app'});

// Quit the server after 5 seconds
setTimeout(function () {
    bs.exit();
}, 5000);
