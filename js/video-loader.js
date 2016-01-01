import $ from './$';

let triggerOpen;
let overlay;
let triggerClose;
let video;
let hasVideo = false;

function iframe () {
    return `<iframe name='quickcast' src='https://quick.as/embed/az3sxrb' scrolling='no' frameborder='0' width="100%" allowfullscreen></iframe>`;
}

function script () {
    let elem = document.createElement('script');
    elem.src = 'https://quick.as/embed/script/1.60';
    elem.id  = 'quickcast-vid';
    document.body.appendChild(elem);
}

function listenVideoOpen () {
    triggerOpen.addEventListener('click', function (evt) {
        evt.preventDefault();
        overlay.classList.add('open');
        setTimeout(function () {
            video.innerHTML = iframe();
            script();
        }, 300);
    });
}
function listVideoClose () {
    triggerClose.addEventListener('click', function (evt) {
        evt.preventDefault();
        overlay.classList.remove('open');
        setTimeout(function () {
            video.innerHTML = "";
            let script = document.getElementById('quickcast-vid');
            script.parentNode.removeChild(script);
        }, 300);
    });
}

export default function () {
    if (window.location.pathname.slice(0, 5) === '/') {
        overlay      = $('.overlay');
        triggerOpen  = $('.video__link');
        triggerClose = $('.overlay__close');
        video        = $('.overlay__video');
        if (triggerOpen) {
            listenVideoOpen();
            listVideoClose();
        }
    }
}
