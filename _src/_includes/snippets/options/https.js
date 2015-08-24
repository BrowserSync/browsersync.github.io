// Enable HTTPS for static file server
browserSync({
    server: "./app",
    https: true
});

// Enable HTTPS for snippet mode
browserSync({
    https: true
});

// Enable HTTPS mode with custom certificates
browserSync({
    server: "./app",
    https: {
        key: "path-to-custom.key",
        cert: "path-to-custom.crt"
    }
});