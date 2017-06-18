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
registerServiceWorker();

function showUpdateButton() {
    var refreshing;
    var banner = document.querySelector('.update-banner');
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

    navigator.serviceWorker.register('/sw.js').then(function (reg) {
        if (!navigator.serviceWorker.controller) {
            return;
        }

        if (reg.waiting) {
            console.log('reg.waiting');
            reg.waiting.postMessage({ action: 'skipWaiting' });
            return;
        }

        if (reg.installing) {
            console.log('reg.installing');
            reg.installing.addEventListener('statechange', function () {
                if (reg.installing.state == 'installed') {
                    reg.installing.postMessage({ action: 'skipWaiting' });
                }
            });
            return;
        }

        reg.addEventListener('updatefound', function () {
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
                };
            }
        });
    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy8kLmpzIiwianMvYXBwLmpzIiwianMvc3RpY2t5LW5hdi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztrQkNBZSxVQUFVLEdBQVYsRUFBZSxHQUFmLEVBQW9CO0FBQy9CLFdBQU8sU0FBUyxnQkFBVCxDQUEwQixHQUExQixFQUErQixDQUEvQixDQUFQO0FBQ0gsQzs7Ozs7QUNGRDs7Ozs7O0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFNBQVMsZ0JBQVQsR0FBNkI7QUFDekIsUUFBSSxVQUFKO0FBQ0EsUUFBTSxTQUFTLFNBQVMsYUFBVCxDQUF1QixnQkFBdkIsQ0FBZjtBQUNBLFdBQU8sZ0JBQVAsQ0FBd0IsR0FBeEIsRUFBNkIsQ0FBN0IsRUFBZ0MsZ0JBQWhDLENBQWlELE9BQWpELEVBQTBELFVBQVUsR0FBVixFQUFlO0FBQ3JFLFlBQUksY0FBSjtBQUNBLFlBQUksVUFBSixFQUFnQjtBQUNoQixlQUFPLFFBQVAsQ0FBZ0IsTUFBaEI7QUFDQSxxQkFBYSxJQUFiO0FBQ0gsS0FMRDtBQU1BLFdBQU8sU0FBUCxDQUFpQixHQUFqQixDQUFxQix1QkFBckI7QUFDSDs7QUFFRCxTQUFTLHFCQUFULEdBQWlDOztBQUU3QixRQUFJLENBQUMsVUFBVSxhQUFmLEVBQThCO0FBQzFCLGdCQUFRLEtBQVIsQ0FBYyx1REFBZDtBQUNBO0FBQ0g7O0FBRUQsY0FBVSxhQUFWLENBQXdCLFFBQXhCLENBQWlDLFFBQWpDLEVBQTJDLElBQTNDLENBQWdELFVBQVMsR0FBVCxFQUFjO0FBQzFELFlBQUksQ0FBQyxVQUFVLGFBQVYsQ0FBd0IsVUFBN0IsRUFBeUM7QUFDckM7QUFDSDs7QUFFRCxZQUFJLElBQUksT0FBUixFQUFpQjtBQUNiLG9CQUFRLEdBQVIsQ0FBWSxhQUFaO0FBQ0EsZ0JBQUksT0FBSixDQUFZLFdBQVosQ0FBd0IsRUFBQyxRQUFRLGFBQVQsRUFBeEI7QUFDQTtBQUNIOztBQUVELFlBQUksSUFBSSxVQUFSLEVBQW9CO0FBQ2hCLG9CQUFRLEdBQVIsQ0FBWSxnQkFBWjtBQUNBLGdCQUFJLFVBQUosQ0FBZSxnQkFBZixDQUFnQyxhQUFoQyxFQUErQyxZQUFXO0FBQ3RELG9CQUFJLElBQUksVUFBSixDQUFlLEtBQWYsSUFBd0IsV0FBNUIsRUFBeUM7QUFDckMsd0JBQUksVUFBSixDQUFlLFdBQWYsQ0FBMkIsRUFBQyxRQUFRLGFBQVQsRUFBM0I7QUFDSDtBQUNKLGFBSkQ7QUFLQTtBQUNIOztBQUVELFlBQUksZ0JBQUosQ0FBcUIsYUFBckIsRUFBb0MsWUFBVztBQUMzQyxnQkFBSSxVQUFVLGFBQVYsQ0FBd0IsVUFBNUIsRUFBd0M7QUFDcEMsb0JBQUksbUJBQW1CLElBQUksVUFBM0I7QUFDQSxpQ0FBaUIsYUFBakIsR0FBaUMsWUFBWTtBQUN6Qyw0QkFBUSxpQkFBaUIsS0FBekI7QUFDSSw2QkFBSyxXQUFMO0FBQ0ksb0NBQVEsR0FBUixDQUFZLGdCQUFaO0FBQ0Esb0NBQVEsR0FBUixDQUFZLEdBQVo7QUFDQTtBQUNBO0FBQ0o7QUFDSSxvQ0FBUSxHQUFSLENBQVksd0JBQVosRUFBc0MsaUJBQWlCLEtBQXZEO0FBUFI7QUFTSCxpQkFWRDtBQVdIO0FBQ0osU0FmRDtBQWdCSCxLQXJDRDtBQXNDSDs7Ozs7Ozs7O2tCQzFDYyxZQUFZO0FBQ3ZCLFFBQUksT0FBTyxRQUFQLENBQWdCLFFBQWhCLENBQXlCLEtBQXpCLENBQStCLENBQS9CLEVBQWtDLENBQWxDLE1BQXlDLE9BQTdDLEVBQXNEO0FBQ2xELGlCQUFTLGlCQUFFLFVBQUYsQ0FBVDtBQUNBLFlBQUksTUFBSixFQUFZO0FBQ1I7QUFDSDtBQUNKO0FBQ0osQzs7QUE3QkQ7Ozs7OztBQUVBLElBQUksZUFBSjs7QUFFQSxTQUFTLGFBQVQsR0FBMEI7O0FBRXRCLFFBQUksT0FBVyxpQkFBRSxhQUFGLENBQWY7QUFDQSxRQUFJLFdBQVcsa0JBQWtCLE1BQWpDO0FBQ0EsUUFBSSxRQUFXLE9BQWY7O0FBRUEsYUFBUyxNQUFULENBQWlCLEdBQWpCLEVBQXNCO0FBQ2xCLFlBQUksY0FBSjtBQUNBLGVBQU8sU0FBUCxDQUFpQixNQUFqQixDQUF3QixNQUF4QjtBQUNIOztBQUVELFFBQUksUUFBSixFQUFjO0FBQ1YsZ0JBQVEsWUFBUjtBQUNIOztBQUVELFNBQUssZ0JBQUwsQ0FBc0IsS0FBdEIsRUFBNkIsTUFBN0I7QUFDSCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc2VsLCBjdHgpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWwpWzBdO1xufSIsImltcG9ydCBzdGlja3lOYXYgZnJvbSAnLi9zdGlja3ktbmF2Jztcbi8vaW1wb3J0IHZpZGVvTG9hZGVyIGZyb20gJy4vdmlkZW8tbG9hZGVyJztcblxuc3RpY2t5TmF2KCk7XG4vL3ZpZGVvTG9hZGVyKCk7XG5yZWdpc3RlclNlcnZpY2VXb3JrZXIoKTtcblxuZnVuY3Rpb24gc2hvd1VwZGF0ZUJ1dHRvbiAoKSB7XG4gICAgdmFyIHJlZnJlc2hpbmc7XG4gICAgY29uc3QgYmFubmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVwZGF0ZS1iYW5uZXInKTtcbiAgICBiYW5uZXIucXVlcnlTZWxlY3RvckFsbCgnYScpWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKHJlZnJlc2hpbmcpIHJldHVybjtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICByZWZyZXNoaW5nID0gdHJ1ZTtcbiAgICB9KTtcbiAgICBiYW5uZXIuY2xhc3NMaXN0LmFkZCgndXBkYXRlLWJhbm5lci0tYWN0aXZlJyk7XG59XG5cbmZ1bmN0aW9uIHJlZ2lzdGVyU2VydmljZVdvcmtlcigpIHtcblxuICAgIGlmICghbmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignQm9vbyEgLSB5b3VyIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBzZXJ2aWNlIHdvcmtlciEnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLnJlZ2lzdGVyKCcvc3cuanMnKS50aGVuKGZ1bmN0aW9uKHJlZykge1xuICAgICAgICBpZiAoIW5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLmNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZWcud2FpdGluZykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3JlZy53YWl0aW5nJyk7XG4gICAgICAgICAgICByZWcud2FpdGluZy5wb3N0TWVzc2FnZSh7YWN0aW9uOiAnc2tpcFdhaXRpbmcnfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVnLmluc3RhbGxpbmcpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZWcuaW5zdGFsbGluZycpO1xuICAgICAgICAgICAgcmVnLmluc3RhbGxpbmcuYWRkRXZlbnRMaXN0ZW5lcignc3RhdGVjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZiAocmVnLmluc3RhbGxpbmcuc3RhdGUgPT0gJ2luc3RhbGxlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVnLmluc3RhbGxpbmcucG9zdE1lc3NhZ2Uoe2FjdGlvbjogJ3NraXBXYWl0aW5nJ30pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVnLmFkZEV2ZW50TGlzdGVuZXIoJ3VwZGF0ZWZvdW5kJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAobmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIuY29udHJvbGxlcikge1xuICAgICAgICAgICAgICAgIHZhciBpbnN0YWxsaW5nV29ya2VyID0gcmVnLmluc3RhbGxpbmc7XG4gICAgICAgICAgICAgICAgaW5zdGFsbGluZ1dvcmtlci5vbnN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGluc3RhbGxpbmdXb3JrZXIuc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2luc3RhbGxlZCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coaW5zdGFsbGluZ1dvcmtlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93VXBkYXRlQnV0dG9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpbnN0YWxsaW5nV29ya2VyLnN0YXRlJywgaW5zdGFsbGluZ1dvcmtlci5zdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuIiwiaW1wb3J0ICQgZnJvbSAnLi8kJztcblxubGV0IGRvY05hdjtcblxuZnVuY3Rpb24gbGlzdGVuTmF2T3BlbiAoKSB7XG5cbiAgICBsZXQgZWxlbSAgICAgPSAkKCcubmF2LWV4cGFuZCcpO1xuICAgIGxldCBoYXNUb3VjaCA9ICdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdztcbiAgICBsZXQgZXZlbnQgICAgPSAnY2xpY2snO1xuXG4gICAgZnVuY3Rpb24gdG9nZ2xlIChldnQpIHtcbiAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGRvY05hdi5jbGFzc0xpc3QudG9nZ2xlKCdvcGVuJyk7XG4gICAgfVxuXG4gICAgaWYgKGhhc1RvdWNoKSB7XG4gICAgICAgIGV2ZW50ID0gJ3RvdWNoc3RhcnQnO1xuICAgIH1cblxuICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgdG9nZ2xlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICAgIGlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc2xpY2UoMCwgNSkgPT09ICcvZG9jcycpIHtcbiAgICAgICAgZG9jTmF2ID0gJCgnLmRvYy1uYXYnKTtcbiAgICAgICAgaWYgKGRvY05hdikge1xuICAgICAgICAgICAgbGlzdGVuTmF2T3BlbigpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19
