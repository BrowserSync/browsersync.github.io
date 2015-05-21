// Create an named instance in one file...
var bs = require("browser-sync").create('My Server');

// Start the Browsersync server
bs.init({
    server: true
});

// now, retrieve the instance in another file...
var bs = require("browser-sync").get('My server');

// and call any methods on it.
bs.watch('*.html').on('change', bs.reload);
