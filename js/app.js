import stickyNav from './sticky-nav';
//import videoLoader from './video-loader';

stickyNav();
//videoLoader();
if (window.location.origin.indexOf('http://localhost') === 0) {
} else {
    registerServiceWorker();
}

function showUpdateButton () {
    var refreshing;
    const banner = document.querySelector('.update-banner');
    banner.querySelectorAll('a')[0].addEventListener('click', function (evt) {
        evt.preventDefault();
        if (refreshing) return;
        window.location.reload();
        refreshing = true;
    });
    banner.classList.add('update-banner--active');
}

function registerServiceWorker() {

    if (!navigator.serviceWorker) {
        console.error('Booo! - your browser does not support service worker!');
        return;
    }

    navigator.serviceWorker.register('/sw.js').then(function(reg) {
        if (!navigator.serviceWorker.controller) {
            return;
        }

        if (reg.waiting) {
            console.log('reg.waiting');
            reg.waiting.postMessage({action: 'skipWaiting'});
            return;
        }

        if (reg.installing) {
            console.log('reg.installing');
            reg.installing.addEventListener('statechange', function() {
                if (reg.installing.state == 'installed') {
                    reg.installing.postMessage({action: 'skipWaiting'});
                }
            });
            return;
        }

        reg.addEventListener('updatefound', function() {
            if (navigator.serviceWorker.controller) {
                var installingWorker = reg.installing;
                installingWorker.onstatechange = function () {
                    switch (installingWorker.state) {
                        case 'installed':
                            console.log(installingWorker);
                            console.log(reg);
                            showUpdateButton();
                            break;
                        default:
                            console.log('installingWorker.state', installingWorker.state);
                    }
                }
            }
        });
    });
}
