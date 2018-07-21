var browserSync = require("browser-sync").create();

browserSync.init({
    watch: true,
    server: "./app",
    callbacks: {
        /**
         * This 'ready' callback can be used
         * to access the Browsersync instance
         */
        ready: function(err, bs) {

            // example of accessing URLS
            console.log(bs.options.get('urls'));

            // example of adding a middleware at the end
            // of the stack after Browsersync is running
            bs.addMiddleware("*", function (req, res) {
                res.writeHead(302, {
                    location: "404.html"
                });
                res.end("Redirecting!");
            });
        }
    }
});
