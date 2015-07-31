// Using a vhost-based url
proxy: "local.dev"

// Using a localhost address with a port
proxy: "localhost:8888"

// Using localhost sub directories
proxy: "localhost/site1"

// When your app also uses web sockets
// NOTE: requires 2.8.1 or above
proxy: {
    target: "http://yourlocal.dev",
    ws: true
}

// With middleware - Requires v2.1.0
proxy: {
    target: "http://yourlocal.dev",
    middleware: function (req, res, next) {
        console.log(req.url);
        next();
    }
}

// With custom request headers - Requires v2.1.0
proxy: {
    target: "localhost:8000",
    reqHeaders: function (config) {
        return {
            "host":            config.urlObj.host,
            "accept-encoding": "identity",
            "agent":           false
        }
    }
}

// Modify the server response after it's returned from the proxy
proxy: {
    target: "http://yourlocal.dev",
    proxyRes: [
        function (res, req) {
            console.log(res.headers);
            next();
        }
    ]
}
