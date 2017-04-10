// Serve files from the app directory
server: "app"

// Serve files from the current directory
server: true

// Serve files from the app directory with directory listing
server: {
    baseDir: "app",
    directory: true
}

// Multiple base directories
server: ["app", "dist"]

// Serve files from the app directory, with a specific index filename
server: {
    baseDir: "app",
    index: "index.htm"
}

// The static file server is based on expressjs/serve-static, 
// so we inherit all of their options, like trying a default extension
// when one isn't specified
// https://github.com/expressjs/serve-static
server: {
    baseDir: "app",
    serveStaticOptions: {
        extensions: ["html"]
    }
}

// Since version 1.2.1
// The key is the url to match
// The value is which folder to serve (relative to your current working directory)
server: {
    baseDir: "app",
    routes: {
        "/bower_components": "bower_components"
    }
}
