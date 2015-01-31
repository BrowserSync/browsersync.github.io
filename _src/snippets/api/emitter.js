var evt = browserSync.emitter;

evt.on("init", function () {
    console.log("BrowserSync is running!");
});

browserSync(config);