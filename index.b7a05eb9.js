// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"lpcHr":[function(require,module,exports) {
"use strict";
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "7dd44675b7a05eb9";
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {};
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = it.call(o);
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                }
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>").concat(stack, "</pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>💡 ' + hint + '</div>';
            }).join(''), "\n        </div>\n        ").concat(diagnostic.documentation ? "<div>\uD83D\uDCDD <a style=\"color: violet\" href=\"".concat(diagnostic.documentation, "\" target=\"_blank\">Learn more</a></div>") : '', "\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                var oldDeps = modules[asset.id][1];
                for(var dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    var id = oldDeps[dep];
                    var parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            var fn = new Function('require', 'module', 'exports', asset.output);
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id1) {
    var modules = bundle.modules;
    if (!modules) return;
    if (modules[id1]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        var deps = modules[id1][1];
        var orphans = [];
        for(var dep in deps){
            var parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id1];
        delete bundle.cache[id1]; // Now delete the orphans.
        orphans.forEach(function(id) {
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id1);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    var parents = getParents(module.bundle.root, id);
    var accepted = false;
    while(parents.length > 0){
        var v = parents.shift();
        var a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            var p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push.apply(parents, _toConsumableArray(p));
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"jeorp":[function(require,module,exports) {
var _board = require("./board");
var _timer = require("./timer");
var _utils = require("./utils");
const pop = _utils.loadAudio('pop', {
    volume: 0.07
});
const swap = _utils.loadAudio('swipe', {
    volume: 0.07
});
const SIZE = 8;
const field = document.getElementById('field');
const score = document.getElementById('score');
const time = document.getElementById('time');
const multiplierElement = document.getElementById('multiplier');
const effect = new KeyframeEffect(multiplierElement, [
    {
        opacity: 1
    },
    {
        transform: 'scale(1.5)'
    },
    {
        opacity: 0
    }
], {
    duration: 500,
    direction: 'normal',
    easing: 'ease-in-out',
    fill: 'forwards'
});
const animation = new Animation(effect, document.timeline);
function setElementPosition(element, position) {
    element.style.top = `${position.y}em`;
    element.style.left = `${position.x}em`;
}
const board = new _board.Board(SIZE);
const timer = new _timer.Timer(15);
let currentTile = null;
const getTileClickHandler = (tileElement)=>{
    return async ()=>{
        if (!currentTile) {
            currentTile = tileElement;
            tileElement.classList.add('active');
            timer.start();
            return;
        }
        currentTile.classList.remove('active');
        if (currentTile === tileElement) {
            currentTile = null;
            return;
        }
        let multiplier = 0;
        // TODO: extract into separate function
        if (_board.Board.areSwappable(currentTile.tile, tileElement.tile)) {
            board.swapTiles(currentTile.tile, tileElement.tile);
            await swap.play();
            if (board.hasMatches()) do {
                multiplier++;
                await _utils.delay(400);
                board.resolveMatches();
                board.shiftItems();
                board.calculateScore(multiplier);
                timer.add(5);
                await pop.play();
                if (multiplierElement) {
                    multiplierElement.innerText = `${multiplier}X`;
                    animation.play();
                }
                await _utils.delay(400);
                board.fillUp();
            }while (board.hasMatches())
            else {
                // revert swap
                await _utils.delay(400);
                await swap.play();
                board.swapTiles(currentTile.tile, tileElement.tile);
            }
            timer.start();
        // console.table(board.toMatrix());
        }
        currentTile = null;
    };
};
board.subscribe('tiles', (tiles)=>{
    if (!field) return;
    field.style.width = `${board.size}em`;
    field.style.height = `${board.size}em`;
    const tileElements = tiles.map((tile)=>{
        const tileElement = document.createElement('div');
        tileElement.tile = tile;
        tileElement.classList.add('tile', tile.icon || '');
        setElementPosition(tileElement, tile.position);
        tile.subscribe('position', (position)=>{
            setElementPosition(tileElement, position);
        });
        tile.subscribe('icon', (icon)=>{
            if (!tile.icon && !icon) return;
            if (tile.icon) tileElement.classList.remove(tile.icon);
            if (icon) tileElement.classList.add(icon);
        });
        tileElement.addEventListener('click', getTileClickHandler(tileElement));
        return tileElement;
    });
    field.replaceChildren(...tileElements);
});
board.subscribe('score', (value)=>{
    if (!score) return;
    score.innerText = `${value}`;
});
timer.subscribe('time', (value)=>{
    if (!time) return;
    time.innerText = `${new Date(value * 1000).toISOString().substring(14, 19)}`;
    if (value === 0) {
        // wait before timer sets time value
        // TODO: show game over
        _utils.delay(1000).then(()=>{
            timer.reset();
            board.generate();
        });
        return;
    }
});
board.generate();
// expose board to window to perform debugging in browser
window.board = board;
window.timer = timer;
window.animation = animation;

},{"./board":"7fSWv","./timer":"6YWbv","./utils":"6Mk9B"}],"7fSWv":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Board", ()=>Board
);
var _point = require("./point");
var _icon = require("./Icon");
var _tile = require("./tile");
var _model = require("./model");
const MOCK_FIELD = [
    [
        _icon.Icon.Beacon,
        _icon.Icon.Dice,
        _icon.Icon.Poop,
        _icon.Icon.Dice,
        _icon.Icon.Lollypop,
        _icon.Icon.Beacon,
        _icon.Icon.Chocolate,
        _icon.Icon.Dice, 
    ],
    [
        _icon.Icon.Lollypop,
        _icon.Icon.Chocolate,
        _icon.Icon.Poop,
        _icon.Icon.Dice,
        _icon.Icon.Candy,
        _icon.Icon.Candy,
        _icon.Icon.Lollypop,
        _icon.Icon.Candy, 
    ],
    [
        _icon.Icon.Chocolate,
        _icon.Icon.Poop,
        _icon.Icon.Beacon,
        _icon.Icon.Beacon,
        _icon.Icon.Dice,
        _icon.Icon.Dice,
        _icon.Icon.Beacon,
        _icon.Icon.Lollypop, 
    ],
    [
        _icon.Icon.Dice,
        _icon.Icon.Lollypop,
        _icon.Icon.Chocolate,
        _icon.Icon.Candy,
        _icon.Icon.Chocolate,
        _icon.Icon.Poop,
        _icon.Icon.Candy,
        _icon.Icon.Poop, 
    ],
    [
        _icon.Icon.Candy,
        _icon.Icon.Dice,
        _icon.Icon.Lollypop,
        _icon.Icon.Chocolate,
        _icon.Icon.Lollypop,
        _icon.Icon.Beacon,
        _icon.Icon.Dice,
        _icon.Icon.Lollypop, 
    ],
    [
        _icon.Icon.Dice,
        _icon.Icon.Candy,
        _icon.Icon.Dice,
        _icon.Icon.Beacon,
        _icon.Icon.Dice,
        _icon.Icon.Poop,
        _icon.Icon.Candy,
        _icon.Icon.Poop, 
    ],
    [
        _icon.Icon.Poop,
        _icon.Icon.Beacon,
        _icon.Icon.Poop,
        _icon.Icon.Dice,
        _icon.Icon.Chocolate,
        _icon.Icon.Lollypop,
        _icon.Icon.Dice,
        _icon.Icon.Chocolate, 
    ],
    [
        _icon.Icon.Candy,
        _icon.Icon.Chocolate,
        _icon.Icon.Candy,
        _icon.Icon.Lollypop,
        _icon.Icon.Beacon,
        _icon.Icon.Chocolate,
        _icon.Icon.Beacon,
        _icon.Icon.Lollypop, 
    ], 
].flat();
class Board extends _model.Model {
    constructor(size = 8){
        super();
        this.size = size;
        this.score = 0;
        this.tiles = [];
    }
    generate() {
        this.tiles = [];
        this.score = 0;
        for(let x = 0; x < this.size; x++)for(let y = 0; y < this.size; y++){
            const position = new _point.Point(x, y);
            this.tiles.push(new _tile.Tile(position, this.getIcon(position)));
        }
        this.notify('tiles', this.tiles);
    }
    findByPosition(x, y) {
        return this.tiles[x * this.size + y];
    }
    findVerticalLine(x) {
        const line = [];
        // using for loop helps to reduce unnecessary steps while searching required item
        for(let y = 0; y < this.size; y++){
            const tile = this.findByPosition(x, y);
            if (!tile) continue;
            line.push(tile);
        }
        return line;
    }
    findHorizontalLine(y) {
        const line = [];
        // using for loop helps to reduce unnecessary steps while searching required item
        for(let x = 0; x < this.size; x++){
            const tile = this.findByPosition(x, y);
            if (!tile) continue;
            line.push(tile);
        }
        return line;
    }
    swapTiles(t1, t2) {
        const idxT1 = this.tiles.indexOf(t1);
        const idxT2 = this.tiles.indexOf(t2);
        if (idxT1 < 0 || idxT2 < 0) return;
        const position = t1.position;
        t1.position = t2.position;
        t2.position = position;
        this.tiles[idxT1] = t2;
        this.tiles[idxT2] = t1;
    }
    resolveMatches() {
        for(let i = 0; i < this.size; i++)[
            ...Board.findClusters(this.findVerticalLine(i)),
            ...Board.findClusters(this.findHorizontalLine(i)), 
        ].filter((tile)=>tile.length >= 3
        ).flat().forEach((tile)=>tile.icon = null
        );
    }
    hasMatches() {
        for(let i = 0; i < this.size; i++){
            const hasMatches = [
                ...Board.findClusters(this.findVerticalLine(i)),
                ...Board.findClusters(this.findHorizontalLine(i)), 
            ].filter((tile)=>tile.length >= 3
            ).length > 0;
            if (hasMatches) return true;
        }
        return false;
    }
    shiftItems() {
        for(let x = 0; x < this.size; x++){
            const line = this.findVerticalLine(x);
            for(let i = line.length - 1; i >= 0; i--)for(let j = i - 1; j >= 0; j--){
                const current = line[i];
                const next = line[j];
                if (!current.icon && !next.icon) continue;
                if (!current.icon && next.icon) {
                    this.swapTiles(current, next);
                    line[i] = next;
                    line[j] = current;
                }
            }
        }
        // move all empty tiles out of boundaries
        this.tiles.forEach((tile)=>{
            if (tile.icon) return;
            tile.position = new _point.Point(tile.position.x, tile.position.y - this.size);
        });
    }
    calculateScore(multiplier) {
        console.log(multiplier);
        this.tiles.forEach((tile)=>{
            if (tile.icon) return;
            this.score += 100 * multiplier;
        });
    }
    fillUp() {
        this.tiles.forEach((tile)=>{
            if (tile.icon) return;
            const position = new _point.Point(tile.position.x, tile.position.y + this.size);
            tile.position = position;
            tile.icon = this.getIcon(position);
        });
    }
    getIcon({ x , y  }) {
        let possibleTypes = [
            _icon.Icon.Beacon,
            _icon.Icon.Candy,
            _icon.Icon.Chocolate,
            _icon.Icon.Dice,
            _icon.Icon.Lollypop,
            _icon.Icon.Poop, 
        ];
        // get top left and top elements in order to get icons we dont want to omit
        // this approach helps to ensure absents of existing matches on generation step
        const previousLeft = this.findByPosition(x, y - 1);
        const previousTop = this.findByPosition(x - 1, y);
        possibleTypes = possibleTypes.filter((icon)=>![
                previousTop?.icon,
                previousLeft?.icon
            ].includes(icon)
        );
        return possibleTypes[Math.floor(Math.random() * possibleTypes.length)];
    }
    static areSwappable(t1, t2) {
        if (t1.icon === t2.icon) return false;
        if (!t1.icon || !t2.icon) return false;
        if (_point.Point.areSiblings(t1.position, t2.position)) return true;
        return false;
    }
    static findClusters(tiles) {
        const clusters = [];
        let cluster = [];
        for(let i = 0; i < tiles.length; i++){
            const element = tiles[i];
            if (!cluster.length) {
                cluster.push(element);
                continue;
            }
            if (cluster[0].icon === element.icon) {
                cluster.push(element);
                continue;
            }
            clusters.push(cluster);
            cluster = [
                element
            ];
        }
        clusters.push(cluster);
        return clusters;
    }
    /**
   * Convert array to matrix, for debugging purposes
   * @returns Matrix with icons
   */ toMatrix() {
        const matrix = [];
        for(let y = 0; y < this.size; y++){
            const row = [];
            for(let x = 0; x < this.size; x++)row.push(this.findByPosition(x, y)?.icon);
            matrix.push(row);
        }
        return matrix;
    }
}

},{"./point":"5qEKp","./Icon":"bPzHJ","./tile":"fC4Vt","./model":"1hsjm","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5qEKp":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Point", ()=>Point
);
class Point {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    static areSiblings(point1, point2) {
        // exclude diagonals from siblings
        if (point1.x !== point2.x && point1.y !== point2.y) return false;
        return Math.abs(point1.x - point2.x) <= 1 && Math.abs(point1.y - point2.y) <= 1;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"bPzHJ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Icon", ()=>Icon
);
let Icon;
(function(Icon1) {
    Icon1["Beacon"] = 'beacon';
    Icon1["Candy"] = 'candy';
    Icon1["Chocolate"] = 'chocolate';
    Icon1["Dice"] = 'dice';
    Icon1["Lollypop"] = 'lollypop';
    Icon1["Poop"] = 'poop';
})(Icon || (Icon = {}));

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fC4Vt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Tile", ()=>Tile
);
var _model = require("./model");
class Tile extends _model.Model {
    constructor(position, icon){
        super();
        this.position = position;
        this.icon = icon;
    }
}

},{"./model":"1hsjm","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1hsjm":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Model", ()=>Model
);
class Model {
    eventListeners = new Map();
    constructor(){
        const _this = this;
        return new Proxy(_this, {
            set (target, property, value, receiver) {
                _this.notify(property, value);
                return Reflect.set(target, property, value, receiver);
            }
        });
    }
    subscribe(property, callback) {
        if (this.eventListeners.has(property)) {
            this.eventListeners.get(property)?.push(callback);
            return;
        }
        this.eventListeners.set(property, [
            callback
        ]);
    }
    notify(property, value) {
        this.eventListeners.get(property)?.forEach((callback)=>callback(value)
        );
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6YWbv":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Timer", ()=>Timer
);
var _model = require("./model");
class Timer extends _model.Model {
    constructor(seconds){
        super();
        this.seconds = seconds;
        this.time = seconds;
    }
    add(seconds) {
        this.time += seconds;
    }
    start() {
        if (this.interval) return;
        this.interval = setInterval(()=>{
            if (this.time === 0) {
                this.stop();
                return;
            }
            this.time--;
        }, 1000);
    }
    stop() {
        if (!this.interval) return;
        clearInterval(this.interval);
        this.interval = null;
    }
    reset() {
        this.time = this.seconds;
    }
}

},{"./model":"1hsjm","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6Mk9B":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _delay = require("./delay");
parcelHelpers.exportAll(_delay, exports);
var _loadAudio = require("./loadAudio");
parcelHelpers.exportAll(_loadAudio, exports);

},{"./delay":"2Zg7V","./loadAudio":"7iVOx","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2Zg7V":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "delay", ()=>delay
);
const delay = (timeout)=>new Promise((resolve)=>{
        setTimeout(resolve, timeout);
    })
;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7iVOx":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "loadAudio", ()=>loadAudio
);
const GAME_AUDIO_URLS = new Map([
    [
        'pop',
        new URL(require("191afaa422011a37"))
    ],
    [
        'swipe',
        new URL(require("1d703ce348ed606b"))
    ], 
]);
const loadAudio = (name, options = {})=>{
    const audio = new Audio(GAME_AUDIO_URLS.get(name)?.toString());
    Object.keys(options).forEach((key)=>{
        audio[key] = options[key] || audio[key];
    });
    return audio;
};

},{"191afaa422011a37":"l4I4a","1d703ce348ed606b":"1j6WF","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"l4I4a":[function(require,module,exports) {
module.exports = require('./helpers/bundle-url').getBundleURL('aNMIV') + "pop.55abb800.m4a" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"lgJ39":[function(require,module,exports) {
"use strict";
var bundleURL = {};
function getBundleURLCached(id) {
    var value = bundleURL[id];
    if (!value) {
        value = getBundleURL();
        bundleURL[id] = value;
    }
    return value;
}
function getBundleURL() {
    try {
        throw new Error();
    } catch (err) {
        var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);
        if (matches) // The first two stack frames will be this function and getBundleURLCached.
        // Use the 3rd one, which will be a runtime in the original bundle.
        return getBaseURL(matches[2]);
    }
    return '/';
}
function getBaseURL(url) {
    return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
} // TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.
function getOrigin(url) {
    var matches = ('' + url).match(/(https?|file|ftp):\/\/[^/]+/);
    if (!matches) throw new Error('Origin not found');
    return matches[0];
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
exports.getOrigin = getOrigin;

},{}],"1j6WF":[function(require,module,exports) {
module.exports = require('./helpers/bundle-url').getBundleURL('aNMIV') + "swipe.89aee433.m4a" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}]},["lpcHr","jeorp"], "jeorp", "parcelRequiree4df")

//# sourceMappingURL=index.b7a05eb9.js.map
