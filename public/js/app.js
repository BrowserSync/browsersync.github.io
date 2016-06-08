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
registerServiceWorker();

function registerServiceWorker() {
    if (!navigator.serviceWorker) return;

    console.log('Adding SW');
}

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

var docNav = void 0;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy8kLmpzIiwianMvYXBwLmpzIiwianMvc3RpY2t5LW5hdi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztrQkNBZSxVQUFVLEdBQVYsRUFBZSxHQUFmLEVBQW9CO0FBQy9CLFdBQU8sU0FBUyxnQkFBVCxDQUEwQixHQUExQixFQUErQixDQUEvQixDQUFQLENBRCtCO0NBQXBCOzs7OztBQ0FmOzs7Ozs7OztBQUdBO0FBQ0E7O0FBRUEsU0FBUyxxQkFBVCxHQUFpQztBQUM3QixRQUFJLENBQUMsVUFBVSxhQUFWLEVBQXlCLE9BQTlCOztBQUVBLFlBQVEsR0FBUixDQUFZLFdBQVosRUFINkI7Q0FBakM7Ozs7Ozs7OztrQkNnQmUsWUFBWTtBQUN2QixRQUFJLE9BQU8sUUFBUCxDQUFnQixRQUFoQixDQUF5QixLQUF6QixDQUErQixDQUEvQixFQUFrQyxDQUFsQyxNQUF5QyxPQUF6QyxFQUFrRDtBQUNsRCxpQkFBUyxpQkFBRSxVQUFGLENBQVQsQ0FEa0Q7QUFFbEQsWUFBSSxNQUFKLEVBQVk7QUFDUiw0QkFEUTtTQUFaO0tBRko7Q0FEVzs7QUF0QmY7Ozs7OztBQUVBLElBQUksZUFBSjs7QUFFQSxTQUFTLGFBQVQsR0FBMEI7O0FBRXRCLFFBQUksT0FBVyxpQkFBRSxhQUFGLENBQVgsQ0FGa0I7QUFHdEIsUUFBSSxXQUFXLGtCQUFrQixNQUFsQixDQUhPO0FBSXRCLFFBQUksUUFBVyxPQUFYLENBSmtCOztBQU10QixhQUFTLE1BQVQsQ0FBaUIsR0FBakIsRUFBc0I7QUFDbEIsWUFBSSxjQUFKLEdBRGtCO0FBRWxCLGVBQU8sU0FBUCxDQUFpQixNQUFqQixDQUF3QixNQUF4QixFQUZrQjtLQUF0Qjs7QUFLQSxRQUFJLFFBQUosRUFBYztBQUNWLGdCQUFRLFlBQVIsQ0FEVTtLQUFkOztBQUlBLFNBQUssZ0JBQUwsQ0FBc0IsS0FBdEIsRUFBNkIsTUFBN0IsRUFmc0I7Q0FBMUIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHNlbCwgY3R4KSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsKVswXTtcbn0iLCJpbXBvcnQgc3RpY2t5TmF2IGZyb20gJy4vc3RpY2t5LW5hdic7XG4vL2ltcG9ydCB2aWRlb0xvYWRlciBmcm9tICcuL3ZpZGVvLWxvYWRlcic7XG5cbnN0aWNreU5hdigpO1xucmVnaXN0ZXJTZXJ2aWNlV29ya2VyKCk7XG5cbmZ1bmN0aW9uIHJlZ2lzdGVyU2VydmljZVdvcmtlcigpIHtcbiAgICBpZiAoIW5hdmlnYXRvci5zZXJ2aWNlV29ya2VyKSByZXR1cm47XG4gICAgXG4gICAgY29uc29sZS5sb2coJ0FkZGluZyBTVycpO1xufVxuIiwiaW1wb3J0ICQgZnJvbSAnLi8kJztcblxubGV0IGRvY05hdjtcblxuZnVuY3Rpb24gbGlzdGVuTmF2T3BlbiAoKSB7XG5cbiAgICBsZXQgZWxlbSAgICAgPSAkKCcubmF2LWV4cGFuZCcpO1xuICAgIGxldCBoYXNUb3VjaCA9ICdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdztcbiAgICBsZXQgZXZlbnQgICAgPSAnY2xpY2snO1xuXG4gICAgZnVuY3Rpb24gdG9nZ2xlIChldnQpIHtcbiAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGRvY05hdi5jbGFzc0xpc3QudG9nZ2xlKCdvcGVuJyk7XG4gICAgfVxuXG4gICAgaWYgKGhhc1RvdWNoKSB7XG4gICAgICAgIGV2ZW50ID0gJ3RvdWNoc3RhcnQnO1xuICAgIH1cblxuICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgdG9nZ2xlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICAgIGlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc2xpY2UoMCwgNSkgPT09ICcvZG9jcycpIHtcbiAgICAgICAgZG9jTmF2ID0gJCgnLmRvYy1uYXYnKTtcbiAgICAgICAgaWYgKGRvY05hdikge1xuICAgICAgICAgICAgbGlzdGVuTmF2T3BlbigpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19
