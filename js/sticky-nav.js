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

export default function () {
    setElems();
    setVars();
    listenScroll();
    listenResize();
}