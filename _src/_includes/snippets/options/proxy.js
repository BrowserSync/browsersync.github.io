// Using a vhost-based url
proxy: 'local.dev'

// Using a localhost address with a port
proxy: 'localhost:8888'

// Using localhost sub directories
proxy: 'localhost/site1'

// When your app also uses web sockets
// NOTE: requires 2.8.1 or above
proxy: {
    target: 'http://yourlocal.dev',
    ws: true
}

proxy: {
    target: 'http://yourlocal.dev',
}

// Modify the server request before it hits your application
// NOTE: requires v2.12.1
proxy: {
    target: 'http://yourlocal.dev',
    proxyReq: [
        function(proxyReq) {
            proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
        }
    ]
}

// Modify the server response after it's returned from the proxy
proxy: {
    target: 'http://yourlocal.dev',
    proxyRes: [
        function(proxyRes, req, res) {
            console.log(proxyRes.headers);
        }
    ]
}
