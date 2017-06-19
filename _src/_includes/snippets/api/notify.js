var bs = require('browser-sync').create();

// Text message
bs.notify('Compiling, please wait!');

// HTML message
bs.notify('HTML <span color='green'>is supported</span> too!');

// Since 1.3.0, specify a timeout
bs.notify('This message will only last a second', 1000);
