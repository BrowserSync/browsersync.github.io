console.log(browserSync.active); // false

browserSync(config, function (err, bs) {
    console.log(browserSync.active); // true
});