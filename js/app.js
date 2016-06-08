import stickyNav from './sticky-nav';
//import videoLoader from './video-loader';

stickyNav();
registerServiceWorker();

function registerServiceWorker() {
    if (!navigator.serviceWorker) return;

    navigator.serviceWorker.register('/sw.js').then(function(reg) {
        console.log('yo yo');
    })
}
