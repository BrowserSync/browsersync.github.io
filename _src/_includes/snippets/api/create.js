// create an unnamed instance
var bs = require('browser-sync').create();

// create a named instance
var bs = require('browser-sync').create('My server');


// create multiple
var bs1 = require('browser-sync').create('Server 1');
var bs2 = require('browser-sync').create('Server 2');
