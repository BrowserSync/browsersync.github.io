var config = {
    server: {
        baseDir: "./"
    }
};

// config only
browserSync(config);

// config + callback
browserSync(config, function (err, bs) {
    if (!err) {
        console.log("BrowserSync is ready!");
    }
});