import stickyNav from './sticky-nav';
//import videoLoader from './video-loader';

stickyNav();
registerServiceWorker();

function registerServiceWorker() {
    if (!navigator.serviceWorker) {
        console.error('Booo! - your browser does not support service worker!');
        return;
    }

    navigator.serviceWorker.register('/sw.js').then(function(reg) {
        console.log('This site works offline, yo!');
    })
}
