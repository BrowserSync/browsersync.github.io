// Enable HTTPS for static file server
browserSync({
    server: "./app",
    https: true
});

// Enable HTTPS for snippet mode
browserSync({
    https: true
});

// Use supplied SSL/TLS certificate and key (relative or absolute path)
browserSync({
    options: {
        https: {
            key: "path-to-key.key",
            cert: "path-to-cert.crt"
        }
    }
});
