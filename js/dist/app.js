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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy8kLmpzIiwianMvYXBwLmpzIiwianMvc3RpY2t5LW5hdi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztrQkNBZSxVQUFVLEdBQVYsRUFBZSxHQUFmLEVBQW9CO0FBQy9CLFdBQU8sU0FBUyxnQkFBVCxDQUEwQixHQUExQixFQUErQixDQUEvQixDQUFQLENBRCtCO0NBQXBCOzs7Ozs7Ozs7Ozs7O0FDR2Y7Ozs7Ozs7Ozs7a0JDbUJlLFlBQVk7QUFDdkIsUUFBSSxPQUFPLFFBQVAsQ0FBZ0IsUUFBaEIsQ0FBeUIsS0FBekIsQ0FBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsTUFBeUMsT0FBekMsRUFBa0Q7QUFDbEQsaUJBQVMsaUJBQUUsVUFBRixDQUFULENBRGtEO0FBRWxELFlBQUksTUFBSixFQUFZO0FBQ1IsNEJBRFE7U0FBWjtLQUZKO0NBRFc7Ozs7Ozs7O0FBcEJmLElBQUksa0JBQUo7O0FBRUEsU0FBUyxhQUFULEdBQTBCOztBQUV0QixRQUFJLE9BQVcsaUJBQUUsYUFBRixDQUFYLENBRmtCO0FBR3RCLFFBQUksV0FBVyxrQkFBa0IsTUFBbEIsQ0FITztBQUl0QixRQUFJLFFBQVcsT0FBWCxDQUprQjs7QUFNdEIsYUFBUyxNQUFULENBQWlCLEdBQWpCLEVBQXNCO0FBQ2xCLFlBQUksY0FBSixHQURrQjtBQUVsQixlQUFPLFNBQVAsQ0FBaUIsTUFBakIsQ0FBd0IsTUFBeEIsRUFGa0I7S0FBdEI7O0FBS0EsUUFBSSxRQUFKLEVBQWM7QUFDVixnQkFBUSxZQUFSLENBRFU7S0FBZDs7QUFJQSxTQUFLLGdCQUFMLENBQXNCLEtBQXRCLEVBQTZCLE1BQTdCLEVBZnNCO0NBQTFCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzZWwsIGN0eCkge1xuICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbClbMF07XG59IiwiaW1wb3J0IHN0aWNreU5hdiBmcm9tICcuL3N0aWNreS1uYXYnO1xuLy9pbXBvcnQgdmlkZW9Mb2FkZXIgZnJvbSAnLi92aWRlby1sb2FkZXInO1xuXG5zdGlja3lOYXYoKTtcbi8vdmlkZW9Mb2FkZXIoKTtcbiIsImltcG9ydCAkIGZyb20gJy4vJCc7XG5cbmxldCBkb2NOYXY7XG5cbmZ1bmN0aW9uIGxpc3Rlbk5hdk9wZW4gKCkge1xuXG4gICAgbGV0IGVsZW0gICAgID0gJCgnLm5hdi1leHBhbmQnKTtcbiAgICBsZXQgaGFzVG91Y2ggPSAnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3c7XG4gICAgbGV0IGV2ZW50ICAgID0gJ2NsaWNrJztcblxuICAgIGZ1bmN0aW9uIHRvZ2dsZSAoZXZ0KSB7XG4gICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBkb2NOYXYuY2xhc3NMaXN0LnRvZ2dsZSgnb3BlbicpO1xuICAgIH1cblxuICAgIGlmIChoYXNUb3VjaCkge1xuICAgICAgICBldmVudCA9ICd0b3VjaHN0YXJ0JztcbiAgICB9XG5cbiAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIHRvZ2dsZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNsaWNlKDAsIDUpID09PSAnL2RvY3MnKSB7XG4gICAgICAgIGRvY05hdiA9ICQoJy5kb2MtbmF2Jyk7XG4gICAgICAgIGlmIChkb2NOYXYpIHtcbiAgICAgICAgICAgIGxpc3Rlbk5hdk9wZW4oKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==
