(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports["default"] = function (sel, ctx) {
    return document.querySelectorAll(sel)[0];
};

module.exports = exports["default"];

},{}],2:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _stickyNav = require('./sticky-nav');

var _stickyNav2 = _interopRequireDefault(_stickyNav);

(0, _stickyNav2['default'])();

},{"./sticky-nav":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _$ = require('./$');

var _$2 = _interopRequireDefault(_$);

var wrapper = undefined;
var navPos = undefined;
var triggerPoint = undefined;
var docNav = undefined;
var stuck = false;
var canStick = false;

function setElems() {
    wrapper = (0, _$2['default'])('.doc-wrapper');
    docNav = (0, _$2['default'])('.doc-nav');
}

function setVars() {
    canStick = window.innerWidth < 700;
    navPos = wrapper.getBoundingClientRect();
    triggerPoint = navPos.top + window.pageYOffset;
}

function stick() {
    if (stuck) {
        return;
    }
    docNav.classList.add('sticky');
    stuck = true;
}

function unstick() {
    if (!stuck) {
        return;
    }
    docNav.classList.remove('sticky');
    docNav.classList.remove('open');
    stuck = false;
}

function listenScroll() {
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

function listenResize() {
    window.addEventListener('resize', function () {
        setVars();
        if (!canStick) {
            unstick();
        }
    });
}

function listenNavOpen() {
    var elem = (0, _$2['default'])('.nav-expand');
    elem.addEventListener('click', function () {
        docNav.classList.toggle('open');
    });
    var elem = (0, _$2['default'])('.sticky-nav__items');
    elem.addEventListener('click', function (evt) {
        if (evt.target.parentNode.classList.contains('sticky-nav__item')) {
            console.log('here');
            unstick();
        }
    });
}

function listenNavClick() {}

exports['default'] = function () {
    setElems();
    setVars();
    listenScroll();
    listenResize();
    listenNavOpen();
    listenNavClick();
};

module.exports = exports['default'];

},{"./$":1}]},{},[2])
//# sourceMappingURL=app.js.map
