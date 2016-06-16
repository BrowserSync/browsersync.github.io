// This will result in something like
// http://localhost:3002/browser-sync/browser-sync-client.1.6.0.js
scriptPath: function (path, port, options) {
    return options.getIn(['urls', 'local']) + path;
}
