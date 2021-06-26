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
if (window.location.origin.indexOf('http://localhost') === 0) {} else {
    registerServiceWorker();
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy8kLmpzIiwianMvYXBwLmpzIiwianMvc3RpY2t5LW5hdi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztrQkNBZSxVQUFVLEdBQVYsRUFBZSxHQUFmLEVBQW9CO0FBQy9CLFdBQU8sU0FBUyxnQkFBVCxDQUEwQixHQUExQixFQUErQixDQUEvQixDQUFQO0FBQ0gsQzs7Ozs7QUNGRDs7Ozs7O0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUksT0FBTyxRQUFQLENBQWdCLE1BQWhCLENBQXVCLE9BQXZCLENBQStCLGtCQUEvQixNQUF1RCxDQUEzRCxFQUE4RCxDQUM3RCxDQURELE1BQ087QUFDSDtBQUNIOztBQUVELFNBQVMsZ0JBQVQsR0FBNkI7QUFDekIsUUFBSSxVQUFKO0FBQ0EsUUFBTSxTQUFTLFNBQVMsYUFBVCxDQUF1QixnQkFBdkIsQ0FBZjtBQUNBLFdBQU8sZ0JBQVAsQ0FBd0IsR0FBeEIsRUFBNkIsQ0FBN0IsRUFBZ0MsZ0JBQWhDLENBQWlELE9BQWpELEVBQTBELFVBQVUsR0FBVixFQUFlO0FBQ3JFLFlBQUksY0FBSjtBQUNBLFlBQUksVUFBSixFQUFnQjtBQUNoQixlQUFPLFFBQVAsQ0FBZ0IsTUFBaEI7QUFDQSxxQkFBYSxJQUFiO0FBQ0gsS0FMRDtBQU1BLFdBQU8sU0FBUCxDQUFpQixHQUFqQixDQUFxQix1QkFBckI7QUFDSDs7QUFFRCxTQUFTLHFCQUFULEdBQWlDOztBQUU3QixRQUFJLENBQUMsVUFBVSxhQUFmLEVBQThCO0FBQzFCLGdCQUFRLEtBQVIsQ0FBYyx1REFBZDtBQUNBO0FBQ0g7O0FBRUQsY0FBVSxhQUFWLENBQXdCLFFBQXhCLENBQWlDLFFBQWpDLEVBQTJDLElBQTNDLENBQWdELFVBQVMsR0FBVCxFQUFjO0FBQzFELFlBQUksQ0FBQyxVQUFVLGFBQVYsQ0FBd0IsVUFBN0IsRUFBeUM7QUFDckM7QUFDSDs7QUFFRCxZQUFJLElBQUksT0FBUixFQUFpQjtBQUNiLG9CQUFRLEdBQVIsQ0FBWSxhQUFaO0FBQ0EsZ0JBQUksT0FBSixDQUFZLFdBQVosQ0FBd0IsRUFBQyxRQUFRLGFBQVQsRUFBeEI7QUFDQTtBQUNIOztBQUVELFlBQUksSUFBSSxVQUFSLEVBQW9CO0FBQ2hCLG9CQUFRLEdBQVIsQ0FBWSxnQkFBWjtBQUNBLGdCQUFJLFVBQUosQ0FBZSxnQkFBZixDQUFnQyxhQUFoQyxFQUErQyxZQUFXO0FBQ3RELG9CQUFJLElBQUksVUFBSixDQUFlLEtBQWYsSUFBd0IsV0FBNUIsRUFBeUM7QUFDckMsd0JBQUksVUFBSixDQUFlLFdBQWYsQ0FBMkIsRUFBQyxRQUFRLGFBQVQsRUFBM0I7QUFDSDtBQUNKLGFBSkQ7QUFLQTtBQUNIOztBQUVELFlBQUksZ0JBQUosQ0FBcUIsYUFBckIsRUFBb0MsWUFBVztBQUMzQyxnQkFBSSxVQUFVLGFBQVYsQ0FBd0IsVUFBNUIsRUFBd0M7QUFDcEMsb0JBQUksbUJBQW1CLElBQUksVUFBM0I7QUFDQSxpQ0FBaUIsYUFBakIsR0FBaUMsWUFBWTtBQUN6Qyw0QkFBUSxpQkFBaUIsS0FBekI7QUFDSSw2QkFBSyxXQUFMO0FBQ0ksb0NBQVEsR0FBUixDQUFZLGdCQUFaO0FBQ0Esb0NBQVEsR0FBUixDQUFZLEdBQVo7QUFDQTtBQUNBO0FBQ0o7QUFDSSxvQ0FBUSxHQUFSLENBQVksd0JBQVosRUFBc0MsaUJBQWlCLEtBQXZEO0FBUFI7QUFTSCxpQkFWRDtBQVdIO0FBQ0osU0FmRDtBQWdCSCxLQXJDRDtBQXNDSDs7Ozs7Ozs7O2tCQzdDYyxZQUFZO0FBQ3ZCLFFBQUksT0FBTyxRQUFQLENBQWdCLFFBQWhCLENBQXlCLEtBQXpCLENBQStCLENBQS9CLEVBQWtDLENBQWxDLE1BQXlDLE9BQTdDLEVBQXNEO0FBQ2xELGlCQUFTLGlCQUFFLFVBQUYsQ0FBVDtBQUNBLFlBQUksTUFBSixFQUFZO0FBQ1I7QUFDSDtBQUNKO0FBQ0osQzs7QUE3QkQ7Ozs7OztBQUVBLElBQUksZUFBSjs7QUFFQSxTQUFTLGFBQVQsR0FBMEI7O0FBRXRCLFFBQUksT0FBVyxpQkFBRSxhQUFGLENBQWY7QUFDQSxRQUFJLFdBQVcsa0JBQWtCLE1BQWpDO0FBQ0EsUUFBSSxRQUFXLE9BQWY7O0FBRUEsYUFBUyxNQUFULENBQWlCLEdBQWpCLEVBQXNCO0FBQ2xCLFlBQUksY0FBSjtBQUNBLGVBQU8sU0FBUCxDQUFpQixNQUFqQixDQUF3QixNQUF4QjtBQUNIOztBQUVELFFBQUksUUFBSixFQUFjO0FBQ1YsZ0JBQVEsWUFBUjtBQUNIOztBQUVELFNBQUssZ0JBQUwsQ0FBc0IsS0FBdEIsRUFBNkIsTUFBN0I7QUFDSCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc2VsLCBjdHgpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWwpWzBdO1xufSIsImltcG9ydCBzdGlja3lOYXYgZnJvbSAnLi9zdGlja3ktbmF2Jztcbi8vaW1wb3J0IHZpZGVvTG9hZGVyIGZyb20gJy4vdmlkZW8tbG9hZGVyJztcblxuc3RpY2t5TmF2KCk7XG4vL3ZpZGVvTG9hZGVyKCk7XG5pZiAod2luZG93LmxvY2F0aW9uLm9yaWdpbi5pbmRleE9mKCdodHRwOi8vbG9jYWxob3N0JykgPT09IDApIHtcbn0gZWxzZSB7XG4gICAgcmVnaXN0ZXJTZXJ2aWNlV29ya2VyKCk7XG59XG5cbmZ1bmN0aW9uIHNob3dVcGRhdGVCdXR0b24gKCkge1xuICAgIHZhciByZWZyZXNoaW5nO1xuICAgIGNvbnN0IGJhbm5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51cGRhdGUtYmFubmVyJyk7XG4gICAgYmFubmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKVswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmIChyZWZyZXNoaW5nKSByZXR1cm47XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgcmVmcmVzaGluZyA9IHRydWU7XG4gICAgfSk7XG4gICAgYmFubmVyLmNsYXNzTGlzdC5hZGQoJ3VwZGF0ZS1iYW5uZXItLWFjdGl2ZScpO1xufVxuXG5mdW5jdGlvbiByZWdpc3RlclNlcnZpY2VXb3JrZXIoKSB7XG5cbiAgICBpZiAoIW5hdmlnYXRvci5zZXJ2aWNlV29ya2VyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Jvb28hIC0geW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgc2VydmljZSB3b3JrZXIhJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBuYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5yZWdpc3RlcignL3N3LmpzJykudGhlbihmdW5jdGlvbihyZWcpIHtcbiAgICAgICAgaWYgKCFuYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5jb250cm9sbGVyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVnLndhaXRpbmcpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZWcud2FpdGluZycpO1xuICAgICAgICAgICAgcmVnLndhaXRpbmcucG9zdE1lc3NhZ2Uoe2FjdGlvbjogJ3NraXBXYWl0aW5nJ30pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlZy5pbnN0YWxsaW5nKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygncmVnLmluc3RhbGxpbmcnKTtcbiAgICAgICAgICAgIHJlZy5pbnN0YWxsaW5nLmFkZEV2ZW50TGlzdGVuZXIoJ3N0YXRlY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlZy5pbnN0YWxsaW5nLnN0YXRlID09ICdpbnN0YWxsZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlZy5pbnN0YWxsaW5nLnBvc3RNZXNzYWdlKHthY3Rpb246ICdza2lwV2FpdGluZyd9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZy5hZGRFdmVudExpc3RlbmVyKCd1cGRhdGVmb3VuZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLmNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5zdGFsbGluZ1dvcmtlciA9IHJlZy5pbnN0YWxsaW5nO1xuICAgICAgICAgICAgICAgIGluc3RhbGxpbmdXb3JrZXIub25zdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChpbnN0YWxsaW5nV29ya2VyLnN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdpbnN0YWxsZWQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGluc3RhbGxpbmdXb3JrZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1VwZGF0ZUJ1dHRvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnaW5zdGFsbGluZ1dvcmtlci5zdGF0ZScsIGluc3RhbGxpbmdXb3JrZXIuc3RhdGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbiIsImltcG9ydCAkIGZyb20gJy4vJCc7XG5cbmxldCBkb2NOYXY7XG5cbmZ1bmN0aW9uIGxpc3Rlbk5hdk9wZW4gKCkge1xuXG4gICAgbGV0IGVsZW0gICAgID0gJCgnLm5hdi1leHBhbmQnKTtcbiAgICBsZXQgaGFzVG91Y2ggPSAnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3c7XG4gICAgbGV0IGV2ZW50ICAgID0gJ2NsaWNrJztcblxuICAgIGZ1bmN0aW9uIHRvZ2dsZSAoZXZ0KSB7XG4gICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBkb2NOYXYuY2xhc3NMaXN0LnRvZ2dsZSgnb3BlbicpO1xuICAgIH1cblxuICAgIGlmIChoYXNUb3VjaCkge1xuICAgICAgICBldmVudCA9ICd0b3VjaHN0YXJ0JztcbiAgICB9XG5cbiAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIHRvZ2dsZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNsaWNlKDAsIDUpID09PSAnL2RvY3MnKSB7XG4gICAgICAgIGRvY05hdiA9ICQoJy5kb2MtbmF2Jyk7XG4gICAgICAgIGlmIChkb2NOYXYpIHtcbiAgICAgICAgICAgIGxpc3Rlbk5hdk9wZW4oKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==
