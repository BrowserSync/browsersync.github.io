import $ from './$';

let wrapper;
let navPos;
let triggerPoint;
let docNav;
let stuck = false;
let canStick = false;

function setElems () {
    wrapper = $('.doc-wrapper');
    docNav  = $('.doc-nav');
}

function setVars () {
    canStick     = window.innerWidth < 700;
    navPos       = wrapper.getBoundingClientRect();
    triggerPoint = navPos.top + window.pageYOffset;
}

function stick () {
    if (stuck) {
        return;
    }
    docNav.classList.add('sticky');
    stuck = true;
}

function unstick () {
    if (!stuck) {
        return;
    }
    docNav.classList.remove('sticky');
    docNav.classList.remove('open');
    stuck = false;
}

function listenScroll () {
    document.addEventListener('scroll', function () {
        if (!canStick) {
            unstick();
            return;
        }
        if (window.pageYOffset < triggerPoint) {
            unstick();
        } else {
            stick();
        }
    });
}

function listenResize () {
    window.addEventListener('resize', function () {
        setVars();
        if (!canStick) {
            unstick();
        }
    });
}

function listenNavOpen () {
    var elem = $('.nav-expand');
    let hasTouch = 'ontouchstart' in window;
    if (hasTouch) {
        elem.addEventListener('touchstart', function (evt) {
            evt.preventDefault();
            docNav.classList.toggle('open');
        });
    } else {
        elem.addEventListener('click', function (evt) {
            docNav.classList.toggle('open');
        });
    }
}

function listenNavClick () {

}
export default function () {
    setElems();
    setVars();
    //listenScroll();
    listenResize();
    listenNavOpen();
    listenNavClick();
}
