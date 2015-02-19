// This will result in something like
// localhost:3002/browser-sync/browser-sync-client.1.6.0.js
scriptPath: function (path) {
    return "localhost:3002" + path;
}

// NOTE: Since 2.2.0
// If you're using <base> in your html, you may need the absolute path to the script
// http://localhost:3002/browser-sync/browser-sync-client.1.6.0.js
scriptPath: function (path, port, options) {
    return options.get("absolute");
}