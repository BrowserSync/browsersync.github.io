(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (sel, ctx) {
    return document.querySelectorAll(sel)[0];
};

},{}],2:[function(require,module,exports){
'use strict';

var _stickyNav = require('./sticky-nav');

var _stickyNav2 = _interopRequireDefault(_stickyNav);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import videoLoader from './video-loader';

(0, _stickyNav2.default)();
//videoLoader();

},{"./sticky-nav":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    if (window.location.pathname.slice(0, 5) === '/docs') {
        docNav = (0, _$2.default)('.doc-nav');
        if (docNav) {
            listenNavOpen();
        }
    }
};

var _$ = require('./$');

var _$2 = _interopRequireDefault(_$);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var docNav = undefined;

function listenNavOpen() {

    var elem = (0, _$2.default)('.nav-expand');
    var hasTouch = 'ontouchstart' in window;
    var event = 'click';

    function toggle(evt) {
        evt.preventDefault();
        docNav.classList.toggle('open');
    }

    if (hasTouch) {
        event = 'touchstart';
    }

    elem.addEventListener(event, toggle);
}

},{"./$":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy8kLmpzIiwianMvYXBwLmpzIiwianMvc3RpY2t5LW5hdi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztrQkNBZSxVQUFVLEdBQUcsRUFBRSxHQUFHLEVBQUU7QUFDL0IsV0FBTyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDNUM7Ozs7Ozs7Ozs7Ozs7QUNDRCwwQkFBVzs7QUFBQzs7Ozs7Ozs7a0JDbUJHLFlBQVk7QUFDdkIsUUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLE9BQU8sRUFBRTtBQUNsRCxjQUFNLEdBQUcsaUJBQUUsVUFBVSxDQUFDLENBQUM7QUFDdkIsWUFBSSxNQUFNLEVBQUU7QUFDUix5QkFBYSxFQUFFLENBQUM7U0FDbkI7S0FDSjtDQUNKOzs7Ozs7OztBQTNCRCxJQUFJLE1BQU0sWUFBQSxDQUFDOztBQUVYLFNBQVMsYUFBYSxHQUFJOztBQUV0QixRQUFJLElBQUksR0FBTyxpQkFBRSxhQUFhLENBQUMsQ0FBQztBQUNoQyxRQUFJLFFBQVEsR0FBRyxjQUFjLElBQUksTUFBTSxDQUFDO0FBQ3hDLFFBQUksS0FBSyxHQUFNLE9BQU8sQ0FBQzs7QUFFdkIsYUFBUyxNQUFNLENBQUUsR0FBRyxFQUFFO0FBQ2xCLFdBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUNyQixjQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNuQzs7QUFFRCxRQUFJLFFBQVEsRUFBRTtBQUNWLGFBQUssR0FBRyxZQUFZLENBQUM7S0FDeEI7O0FBRUQsUUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztDQUN4QyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc2VsLCBjdHgpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWwpWzBdO1xufSIsImltcG9ydCBzdGlja3lOYXYgZnJvbSAnLi9zdGlja3ktbmF2Jztcbi8vaW1wb3J0IHZpZGVvTG9hZGVyIGZyb20gJy4vdmlkZW8tbG9hZGVyJztcblxuc3RpY2t5TmF2KCk7XG4vL3ZpZGVvTG9hZGVyKCk7XG4iLCJpbXBvcnQgJCBmcm9tICcuLyQnO1xuXG5sZXQgZG9jTmF2O1xuXG5mdW5jdGlvbiBsaXN0ZW5OYXZPcGVuICgpIHtcblxuICAgIGxldCBlbGVtICAgICA9ICQoJy5uYXYtZXhwYW5kJyk7XG4gICAgbGV0IGhhc1RvdWNoID0gJ29udG91Y2hzdGFydCcgaW4gd2luZG93O1xuICAgIGxldCBldmVudCAgICA9ICdjbGljayc7XG5cbiAgICBmdW5jdGlvbiB0b2dnbGUgKGV2dCkge1xuICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZG9jTmF2LmNsYXNzTGlzdC50b2dnbGUoJ29wZW4nKTtcbiAgICB9XG5cbiAgICBpZiAoaGFzVG91Y2gpIHtcbiAgICAgICAgZXZlbnQgPSAndG91Y2hzdGFydCc7XG4gICAgfVxuXG4gICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCB0b2dnbGUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zbGljZSgwLCA1KSA9PT0gJy9kb2NzJykge1xuICAgICAgICBkb2NOYXYgPSAkKCcuZG9jLW5hdicpO1xuICAgICAgICBpZiAoZG9jTmF2KSB7XG4gICAgICAgICAgICBsaXN0ZW5OYXZPcGVuKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=
