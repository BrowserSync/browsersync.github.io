var staticCacheName = 'bs-f561b3631ac427668176db1e3d91c707ed031df628233a2ec1eb24f1d24cedf5';
var files = [
    "/brand-assets",
    "/docs/api",
    "/docs/command-line",
    "/docs/grunt",
    "/docs/gulp",
    "/docs/http-protocol",
    "/docs",
    "/docs/options",
    "/docs/recipes",
    "/",
    "/brand-assets/brand-assets.zip",
    "/brand-assets",
    "/brand-assets/logo-red.eps",
    "/brand-assets/logo-red.jpg",
    "/brand-assets/logo-red.png",
    "/brand-assets/logo-red.svg",
    "/brand-assets/logo-white.eps",
    "/brand-assets/logo-white.png",
    "/brand-assets/logo-white.svg",
    "/brand-assets/wordmark-red.eps",
    "/brand-assets/wordmark-red.jpg",
    "/brand-assets/wordmark-red.png",
    "/brand-assets/wordmark-red.svg",
    "/brand-assets/wordmark-white.eps",
    "/brand-assets/wordmark-white.png",
    "/brand-assets/wordmark-white.svg",
    "/css/core.css",
    "/css/core.css.map",
    "/css/core.min.css",
    "/css/core.min.css.map",
    "/img/bg.jpg",
    "/img/browsers.svg",
    "/img/bs-name-camelcase.svg",
    "/img/bs-name-space.svg",
    "/img/bs-name.svg",
    "/img/build-tools.png",
    "/img/ezgif.com-optimize.gif",
    "/img/favicon.ico",
    "/img/history.png",
    "/img/icons/icons.svg",
    "/img/icons/svg4everybody.min.js",
    "/img/integration.png",
    "/img/jh-bg.jpg",
    "/img/jh-logo-white.png",
    "/img/jh-logo.png",
    "/img/logo-gh-only.png",
    "/img/logo-gh.png",
    "/img/logo-grid.svg",
    "/img/logo-inline.png",
    "/img/logo.svg",
    "/img/options.png",
    "/img/platforms.png",
    "/img/portable.png",
    "/img/resonsive-ui.png",
    "/img/rwd-demo.gif",
    "/img/scroll-demo.gif",
    "/img/sprites.png",
    "/img/sync-anim.gif",
    "/img/user-addy-sm.jpg",
    "/img/user-addy.jpg",
    "/img/user-adobe.png",
    "/img/user-google.png",
    "/img/user-paravel.png",
    "/img/user-rupert-sm.jpg",
    "/img/user-rupert.jpeg",
    "/img/wordmark-grid.svg",
    "/js/app.js",
    "/js/app.min.js",
    "https://fonts.gstatic.com/s/titilliumweb/v4/7XUFZ5tgS-tD6QamInJTceHuglUR2dhBxWD-q_ehMME.woff2",
    "https://fonts.gstatic.com/s/titilliumweb/v4/anMUvcNT0H1YN4FII8wpr8hG3LOB74UqS1hPmWaAxzQ.woff2",
    "https://fonts.gstatic.com/s/titilliumweb/v4/r9OmwyQxrgzUAhaLET_KO04Sq3N3sm-tF9FpL8sHob4.woff2",
    "https://fonts.googleapis.com/css?family=Titillium+Web:400,400italic,700"
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(staticCacheName).then(function (cache) {
            return cache.addAll(files);
        })
    );
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    return cacheName.startsWith('bs-') &&
                        cacheName != staticCacheName;
                }).map(function (cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        // new Response('Aww yeah')
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});
