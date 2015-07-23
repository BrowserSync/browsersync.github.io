import $ from './$';

let docNav;

function listenNavOpen () {

    let elem     = $('.nav-expand');
    let hasTouch = 'ontouchstart' in window;
    let event    = 'click';

    function toggle (evt) {
        evt.preventDefault();
        docNav.classList.toggle('open');
    }

    if (hasTouch) {
        event = 'touchstart';
    }

    elem.addEventListener(event, toggle);
}

export default function () {
    if (window.location.pathname.slice(0, 5) === '/docs') {
        docNav = $('.doc-nav');
        if (docNav) {
            listenNavOpen();
        }
    }
}
