// Enable HTTPS for static file server
browserSync({
    server: "./app",
    https: true
});

// Enable HTTPS for snippet mode
browserSync({
    https: true
});
