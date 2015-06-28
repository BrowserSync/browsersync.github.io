// To change the namespace used by Browsersync
socket: {
    namespace: '/someothername'
}

// By default, Browsersync is configured to use the domain
// of your page in order to connect to socket.io
// eg: location.host + '/browser-sync
// but, should you need to change that, provide the `domain` property
socket: {
    domain: 'localhost:3000'
}
