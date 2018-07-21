var browserSync = require("browser-sync").create();

/**
 * This example will serve files from the './app' directory
 * and will automatically watch for html/css/js changes
 */
browserSync.init({
    watch: true,
    server: "./app"
});
