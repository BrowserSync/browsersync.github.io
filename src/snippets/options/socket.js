// This will result in something like this in
// the socket connector code
// browserSync.io('localhost:3003/browser-sync')
socket: {
    namespace: function (namespace) {
        return "localhost:3003" + namespace;
    }
}