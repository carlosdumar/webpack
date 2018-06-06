/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
    return [];
};

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

if (process.env.NODE_ENV === 'production') {
  module.exports = __webpack_require__(19);
} else {
  module.exports = __webpack_require__(20);
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyObject = {};

if (process.env.NODE_ENV !== 'production') {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyFunction = __webpack_require__(3);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function renderToDom(element) {
    document.body.append(element);
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(2);
  var warning = __webpack_require__(6);
  var ReactPropTypesSecret = __webpack_require__(21);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, _typeof(typeSpecs[typeSpecName]));
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error === 'undefined' ? 'undefined' : _typeof(error));
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/**
 * Simple, lightweight module assisting with the detection and context of
 * Worker. Helps avoid circular dependencies and allows code to reason about
 * whether or not they are in a Worker, even if they never include the main
 * `ReactWorker` dependency.
 */
var ExecutionEnvironment = {

  canUseDOM: canUseDOM,

  canUseWorkers: typeof Worker !== 'undefined',

  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

  canUseViewport: canUseDOM && !!window.screen,

  isInWorker: !canUseDOM // For now, this is true - might change in the future.

};

module.exports = ExecutionEnvironment;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

/* eslint-disable fb-www/typeof-undefined */

/**
 * Same as document.activeElement but wraps in a try-catch block. In IE it is
 * not safe to call document.activeElement if there is nothing focused.
 *
 * The activeElement will be null only if the document or document body is not
 * yet defined.
 *
 * @param {?DOMDocument} doc Defaults to current document.
 * @return {?DOMElement}
 */

function getActiveElement(doc) /*?DOMElement*/{
  doc = doc || (typeof document !== 'undefined' ? document : undefined);
  if (typeof doc === 'undefined') {
    return null;
  }
  try {
    return doc.activeElement || doc.body;
  } catch (e) {
    return doc.body;
  }
}

module.exports = getActiveElement;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 * 
 */

/*eslint-disable no-self-compare */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Added the nonzero y check to make Flow happy, but it is redundant
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(objA, objB) {
  if (is(objA, objB)) {
    return true;
  }

  if ((typeof objA === 'undefined' ? 'undefined' : _typeof(objA)) !== 'object' || objA === null || (typeof objB === 'undefined' ? 'undefined' : _typeof(objB)) !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

module.exports = shallowEqual;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var isTextNode = __webpack_require__(24);

/*eslint-disable no-bitwise */

/**
 * Checks if a given DOM node contains or is another DOM node.
 */
function containsNode(outerNode, innerNode) {
  if (!outerNode || !innerNode) {
    return false;
  } else if (outerNode === innerNode) {
    return true;
  } else if (isTextNode(outerNode)) {
    return false;
  } else if (isTextNode(innerNode)) {
    return containsNode(outerNode, innerNode.parentNode);
  } else if ('contains' in outerNode) {
    return outerNode.contains(innerNode);
  } else if (outerNode.compareDocumentPosition) {
    return !!(outerNode.compareDocumentPosition(innerNode) & 16);
  } else {
    return false;
  }
}

module.exports = containsNode;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(14);

var _message = __webpack_require__(15);

var _ = __webpack_require__(17);

var _2 = _interopRequireDefault(_);

var _teachers = __webpack_require__(18);

var _teachers2 = _interopRequireDefault(_teachers);

var _renderToDom = __webpack_require__(7);

var _renderToDom2 = _interopRequireDefault(_renderToDom);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(22);

var _teachers3 = __webpack_require__(31);

var _teachers4 = _interopRequireDefault(_teachers3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _reactDom.render)(_react2.default.createElement(_teachers4.default, { data: _teachers2.default }), document.getElementById('container'));

// console.log(data);

_teachers2.default.teachers.forEach(function (teacher) {
    var element = document.createElement('li');
    element.textContent = teacher.Nombre;
    (0, _renderToDom2.default)(element);
});

document.write(_message.firstMessage);
(0, _message.delayedMessage)();

var img = document.createElement('img');
img.setAttribute('src', _2.default);
img.setAttribute('width', 100);
img.setAttribute('height', 100);
document.body.append(img);

console.log('Hola mundo!, desde webpack en un webpack.config');

/***/ }),
/* 14 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _renderToDom = __webpack_require__(7);

var _renderToDom2 = _interopRequireDefault(_renderToDom);

var _makeMessage = __webpack_require__(16);

var _makeMessage2 = _interopRequireDefault(_makeMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var waitTime = new Promise(function (todoOk, todoMal) {
    setTimeout(function () {
        todoOk('Han pasado 3 segs, omg');
    }, 3000);
});
module.exports = {
    firstMessage: 'hola mundo desde un moduloooo',
    delayedMessage: async function delayedMessage() {
        var message = await waitTime;
        console.log(message);
        //const element = document.createElement('p');
        //element.textContent = message;
        (0, _renderToDom2.default)((0, _makeMessage2.default)(message));
    }
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function makeMessage(msg) {
  var element = document.createElement('p');
  element.textContent = msg;
  return element;
}

exports.default = makeMessage;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = {"teachers":[{"id":1,"name":"Freddy Vega","twitter":"freddier"},{"id":2,"name":"Sacha Lifszyc","twitter":"@sachalifs"},{"id":3,"name":"Julia Duque","twitter":"julian_duque"},{"id":4,"name":"Leonidas Esteban","twitter":"LeonidasEsteban"}]}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.4.0
 * react.production.min.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var k = __webpack_require__(4),
    n = __webpack_require__(2),
    p = __webpack_require__(5),
    q = __webpack_require__(3),
    r = "function" === typeof Symbol && Symbol.for,
    t = r ? Symbol.for("react.element") : 60103,
    u = r ? Symbol.for("react.portal") : 60106,
    v = r ? Symbol.for("react.fragment") : 60107,
    w = r ? Symbol.for("react.strict_mode") : 60108,
    x = r ? Symbol.for("react.profiler") : 60114,
    y = r ? Symbol.for("react.provider") : 60109,
    z = r ? Symbol.for("react.context") : 60110,
    A = r ? Symbol.for("react.async_mode") : 60111,
    B = r ? Symbol.for("react.forward_ref") : 60112;r && Symbol.for("react.timeout");var C = "function" === typeof Symbol && Symbol.iterator;function D(a) {
  for (var b = arguments.length - 1, e = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 0; c < b; c++) {
    e += "&args[]=" + encodeURIComponent(arguments[c + 1]);
  }n(!1, "Minified React error #" + a + "; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ", e);
}
var E = { isMounted: function isMounted() {
    return !1;
  }, enqueueForceUpdate: function enqueueForceUpdate() {}, enqueueReplaceState: function enqueueReplaceState() {}, enqueueSetState: function enqueueSetState() {} };function F(a, b, e) {
  this.props = a;this.context = b;this.refs = p;this.updater = e || E;
}F.prototype.isReactComponent = {};F.prototype.setState = function (a, b) {
  "object" !== (typeof a === "undefined" ? "undefined" : _typeof(a)) && "function" !== typeof a && null != a ? D("85") : void 0;this.updater.enqueueSetState(this, a, b, "setState");
};F.prototype.forceUpdate = function (a) {
  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};function G() {}
G.prototype = F.prototype;function H(a, b, e) {
  this.props = a;this.context = b;this.refs = p;this.updater = e || E;
}var I = H.prototype = new G();I.constructor = H;k(I, F.prototype);I.isPureReactComponent = !0;var J = { current: null },
    K = Object.prototype.hasOwnProperty,
    L = { key: !0, ref: !0, __self: !0, __source: !0 };
function M(a, b, e) {
  var c = void 0,
      d = {},
      g = null,
      h = null;if (null != b) for (c in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (g = "" + b.key), b) {
    K.call(b, c) && !L.hasOwnProperty(c) && (d[c] = b[c]);
  }var f = arguments.length - 2;if (1 === f) d.children = e;else if (1 < f) {
    for (var l = Array(f), m = 0; m < f; m++) {
      l[m] = arguments[m + 2];
    }d.children = l;
  }if (a && a.defaultProps) for (c in f = a.defaultProps, f) {
    void 0 === d[c] && (d[c] = f[c]);
  }return { $$typeof: t, type: a, key: g, ref: h, props: d, _owner: J.current };
}
function N(a) {
  return "object" === (typeof a === "undefined" ? "undefined" : _typeof(a)) && null !== a && a.$$typeof === t;
}function escape(a) {
  var b = { "=": "=0", ":": "=2" };return "$" + ("" + a).replace(/[=:]/g, function (a) {
    return b[a];
  });
}var O = /\/+/g,
    P = [];function Q(a, b, e, c) {
  if (P.length) {
    var d = P.pop();d.result = a;d.keyPrefix = b;d.func = e;d.context = c;d.count = 0;return d;
  }return { result: a, keyPrefix: b, func: e, context: c, count: 0 };
}function R(a) {
  a.result = null;a.keyPrefix = null;a.func = null;a.context = null;a.count = 0;10 > P.length && P.push(a);
}
function S(a, b, e, c) {
  var d = typeof a === "undefined" ? "undefined" : _typeof(a);if ("undefined" === d || "boolean" === d) a = null;var g = !1;if (null === a) g = !0;else switch (d) {case "string":case "number":
      g = !0;break;case "object":
      switch (a.$$typeof) {case t:case u:
          g = !0;}}if (g) return e(c, a, "" === b ? "." + T(a, 0) : b), 1;g = 0;b = "" === b ? "." : b + ":";if (Array.isArray(a)) for (var h = 0; h < a.length; h++) {
    d = a[h];var f = b + T(d, h);g += S(d, f, e, c);
  } else if (null === a || "undefined" === typeof a ? f = null : (f = C && a[C] || a["@@iterator"], f = "function" === typeof f ? f : null), "function" === typeof f) for (a = f.call(a), h = 0; !(d = a.next()).done;) {
    d = d.value, f = b + T(d, h++), g += S(d, f, e, c);
  } else "object" === d && (e = "" + a, D("31", "[object Object]" === e ? "object with keys {" + Object.keys(a).join(", ") + "}" : e, ""));return g;
}function T(a, b) {
  return "object" === (typeof a === "undefined" ? "undefined" : _typeof(a)) && null !== a && null != a.key ? escape(a.key) : b.toString(36);
}function U(a, b) {
  a.func.call(a.context, b, a.count++);
}
function V(a, b, e) {
  var c = a.result,
      d = a.keyPrefix;a = a.func.call(a.context, b, a.count++);Array.isArray(a) ? W(a, c, e, q.thatReturnsArgument) : null != a && (N(a) && (b = d + (!a.key || b && b.key === a.key ? "" : ("" + a.key).replace(O, "$&/") + "/") + e, a = { $$typeof: t, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner }), c.push(a));
}function W(a, b, e, c, d) {
  var g = "";null != e && (g = ("" + e).replace(O, "$&/") + "/");b = Q(b, g, c, d);null == a || S(a, "", V, b);R(b);
}
var X = { Children: { map: function map(a, b, e) {
      if (null == a) return a;var c = [];W(a, c, null, b, e);return c;
    }, forEach: function forEach(a, b, e) {
      if (null == a) return a;b = Q(null, null, b, e);null == a || S(a, "", U, b);R(b);
    }, count: function count(a) {
      return null == a ? 0 : S(a, "", q.thatReturnsNull, null);
    }, toArray: function toArray(a) {
      var b = [];W(a, b, null, q.thatReturnsArgument);return b;
    }, only: function only(a) {
      N(a) ? void 0 : D("143");return a;
    } }, createRef: function createRef() {
    return { current: null };
  }, Component: F, PureComponent: H, createContext: function createContext(a, b) {
    void 0 === b && (b = null);a = { $$typeof: z,
      _calculateChangedBits: b, _defaultValue: a, _currentValue: a, _currentValue2: a, _changedBits: 0, _changedBits2: 0, Provider: null, Consumer: null };a.Provider = { $$typeof: y, _context: a };return a.Consumer = a;
  }, forwardRef: function forwardRef(a) {
    return { $$typeof: B, render: a };
  }, Fragment: v, StrictMode: w, unstable_AsyncMode: A, unstable_Profiler: x, createElement: M, cloneElement: function cloneElement(a, b, e) {
    null === a || void 0 === a ? D("267", a) : void 0;var c = void 0,
        d = k({}, a.props),
        g = a.key,
        h = a.ref,
        f = a._owner;if (null != b) {
      void 0 !== b.ref && (h = b.ref, f = J.current);void 0 !== b.key && (g = "" + b.key);var l = void 0;a.type && a.type.defaultProps && (l = a.type.defaultProps);for (c in b) {
        K.call(b, c) && !L.hasOwnProperty(c) && (d[c] = void 0 === b[c] && void 0 !== l ? l[c] : b[c]);
      }
    }c = arguments.length - 2;if (1 === c) d.children = e;else if (1 < c) {
      l = Array(c);for (var m = 0; m < c; m++) {
        l[m] = arguments[m + 2];
      }d.children = l;
    }return { $$typeof: t, type: a.type, key: g, ref: h, props: d, _owner: f };
  }, createFactory: function createFactory(a) {
    var b = M.bind(null, a);b.type = a;return b;
  }, isValidElement: N, version: "16.4.0", __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: { ReactCurrentOwner: J,
    assign: k } },
    Y = { default: X },
    Z = Y && X || Y;module.exports = Z.default ? Z.default : Z;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/** @license React v16.4.0
 * react.development.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

if (process.env.NODE_ENV !== "production") {
  (function () {
    'use strict';

    var _assign = __webpack_require__(4);
    var invariant = __webpack_require__(2);
    var emptyObject = __webpack_require__(5);
    var warning = __webpack_require__(6);
    var emptyFunction = __webpack_require__(3);
    var checkPropTypes = __webpack_require__(8);

    // TODO: this is special because it gets imported during build.

    var ReactVersion = '16.4.0';

    // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
    // nor polyfill, then a plain number is used for performance.
    var hasSymbol = typeof Symbol === 'function' && Symbol.for;

    var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
    var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
    var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
    var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
    var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
    var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
    var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace;
    var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
    var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
    var REACT_TIMEOUT_TYPE = hasSymbol ? Symbol.for('react.timeout') : 0xead1;

    var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
    var FAUX_ITERATOR_SYMBOL = '@@iterator';

    function getIteratorFn(maybeIterable) {
      if (maybeIterable === null || typeof maybeIterable === 'undefined') {
        return null;
      }
      var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
      if (typeof maybeIterator === 'function') {
        return maybeIterator;
      }
      return null;
    }

    // Relying on the `invariant()` implementation lets us
    // have preserve the format and params in the www builds.

    // Exports ReactDOM.createRoot


    // Experimental error-boundary API that can recover from errors within a single
    // render phase

    // Suspense
    var enableSuspense = false;
    // Helps identify side effects in begin-phase lifecycle hooks and setState reducers:


    // In some cases, StrictMode should also double-render lifecycles.
    // This can be confusing for tests though,
    // And it can be bad for performance in production.
    // This feature flag can be used to control the behavior:


    // To preserve the "Pause on caught exceptions" behavior of the debugger, we
    // replay the begin phase of a failed component inside invokeGuardedCallback.


    // Warn about deprecated, async-unsafe lifecycles; relates to RFC #6:


    // Warn about legacy context API


    // Gather advanced timing metrics for Profiler subtrees.


    // Fires getDerivedStateFromProps for state *or* props changes


    // Only used in www builds.

    /**
     * Forked from fbjs/warning:
     * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
     *
     * Only change is we use console.warn instead of console.error,
     * and do nothing when 'console' is not supported.
     * This really simplifies the code.
     * ---
     * Similar to invariant but only logs a warning if the condition is not met.
     * This can be used to log issues in development environments in critical
     * paths. Removing the logging code for production environments will keep the
     * same logic and follow the same code paths.
     */

    var lowPriorityWarning = function lowPriorityWarning() {};

    {
      var printWarning = function printWarning(format) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        var argIndex = 0;
        var message = 'Warning: ' + format.replace(/%s/g, function () {
          return args[argIndex++];
        });
        if (typeof console !== 'undefined') {
          console.warn(message);
        }
        try {
          // --- Welcome to debugging React ---
          // This error was thrown as a convenience so that you can use this stack
          // to find the callsite that caused this warning to fire.
          throw new Error(message);
        } catch (x) {}
      };

      lowPriorityWarning = function lowPriorityWarning(condition, format) {
        if (format === undefined) {
          throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
        }
        if (!condition) {
          for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
            args[_key2 - 2] = arguments[_key2];
          }

          printWarning.apply(undefined, [format].concat(args));
        }
      };
    }

    var lowPriorityWarning$1 = lowPriorityWarning;

    var didWarnStateUpdateForUnmountedComponent = {};

    function warnNoop(publicInstance, callerName) {
      {
        var _constructor = publicInstance.constructor;
        var componentName = _constructor && (_constructor.displayName || _constructor.name) || 'ReactClass';
        var warningKey = componentName + '.' + callerName;
        if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
          return;
        }
        warning(false, "Can't call %s on a component that is not yet mounted. " + 'This is a no-op, but it might indicate a bug in your application. ' + 'Instead, assign to `this.state` directly or define a `state = {};` ' + 'class property with the desired state in the %s component.', callerName, componentName);
        didWarnStateUpdateForUnmountedComponent[warningKey] = true;
      }
    }

    /**
     * This is the abstract API for an update queue.
     */
    var ReactNoopUpdateQueue = {
      /**
       * Checks whether or not this composite component is mounted.
       * @param {ReactClass} publicInstance The instance we want to test.
       * @return {boolean} True if mounted, false otherwise.
       * @protected
       * @final
       */
      isMounted: function isMounted(publicInstance) {
        return false;
      },

      /**
       * Forces an update. This should only be invoked when it is known with
       * certainty that we are **not** in a DOM transaction.
       *
       * You may want to call this when you know that some deeper aspect of the
       * component's state has changed but `setState` was not called.
       *
       * This will not invoke `shouldComponentUpdate`, but it will invoke
       * `componentWillUpdate` and `componentDidUpdate`.
       *
       * @param {ReactClass} publicInstance The instance that should rerender.
       * @param {?function} callback Called after component is updated.
       * @param {?string} callerName name of the calling function in the public API.
       * @internal
       */
      enqueueForceUpdate: function enqueueForceUpdate(publicInstance, callback, callerName) {
        warnNoop(publicInstance, 'forceUpdate');
      },

      /**
       * Replaces all of the state. Always use this or `setState` to mutate state.
       * You should treat `this.state` as immutable.
       *
       * There is no guarantee that `this.state` will be immediately updated, so
       * accessing `this.state` after calling this method may return the old value.
       *
       * @param {ReactClass} publicInstance The instance that should rerender.
       * @param {object} completeState Next state.
       * @param {?function} callback Called after component is updated.
       * @param {?string} callerName name of the calling function in the public API.
       * @internal
       */
      enqueueReplaceState: function enqueueReplaceState(publicInstance, completeState, callback, callerName) {
        warnNoop(publicInstance, 'replaceState');
      },

      /**
       * Sets a subset of the state. This only exists because _pendingState is
       * internal. This provides a merging strategy that is not available to deep
       * properties which is confusing. TODO: Expose pendingState or don't use it
       * during the merge.
       *
       * @param {ReactClass} publicInstance The instance that should rerender.
       * @param {object} partialState Next partial state to be merged with state.
       * @param {?function} callback Called after component is updated.
       * @param {?string} Name of the calling function in the public API.
       * @internal
       */
      enqueueSetState: function enqueueSetState(publicInstance, partialState, callback, callerName) {
        warnNoop(publicInstance, 'setState');
      }
    };

    /**
     * Base class helpers for the updating state of a component.
     */
    function Component(props, context, updater) {
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      // We initialize the default updater but the real one gets injected by the
      // renderer.
      this.updater = updater || ReactNoopUpdateQueue;
    }

    Component.prototype.isReactComponent = {};

    /**
     * Sets a subset of the state. Always use this to mutate
     * state. You should treat `this.state` as immutable.
     *
     * There is no guarantee that `this.state` will be immediately updated, so
     * accessing `this.state` after calling this method may return the old value.
     *
     * There is no guarantee that calls to `setState` will run synchronously,
     * as they may eventually be batched together.  You can provide an optional
     * callback that will be executed when the call to setState is actually
     * completed.
     *
     * When a function is provided to setState, it will be called at some point in
     * the future (not synchronously). It will be called with the up to date
     * component arguments (state, props, context). These values can be different
     * from this.* because your function may be called after receiveProps but before
     * shouldComponentUpdate, and this new state, props, and context will not yet be
     * assigned to this.
     *
     * @param {object|function} partialState Next partial state or function to
     *        produce next partial state to be merged with current state.
     * @param {?function} callback Called after state is updated.
     * @final
     * @protected
     */
    Component.prototype.setState = function (partialState, callback) {
      !((typeof partialState === 'undefined' ? 'undefined' : _typeof(partialState)) === 'object' || typeof partialState === 'function' || partialState == null) ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : void 0;
      this.updater.enqueueSetState(this, partialState, callback, 'setState');
    };

    /**
     * Forces an update. This should only be invoked when it is known with
     * certainty that we are **not** in a DOM transaction.
     *
     * You may want to call this when you know that some deeper aspect of the
     * component's state has changed but `setState` was not called.
     *
     * This will not invoke `shouldComponentUpdate`, but it will invoke
     * `componentWillUpdate` and `componentDidUpdate`.
     *
     * @param {?function} callback Called after update is complete.
     * @final
     * @protected
     */
    Component.prototype.forceUpdate = function (callback) {
      this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
    };

    /**
     * Deprecated APIs. These APIs used to exist on classic React classes but since
     * we would like to deprecate them, we're not going to move them over to this
     * modern base class. Instead, we define a getter that warns if it's accessed.
     */
    {
      var deprecatedAPIs = {
        isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
        replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
      };
      var defineDeprecationWarning = function defineDeprecationWarning(methodName, info) {
        Object.defineProperty(Component.prototype, methodName, {
          get: function get() {
            lowPriorityWarning$1(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
            return undefined;
          }
        });
      };
      for (var fnName in deprecatedAPIs) {
        if (deprecatedAPIs.hasOwnProperty(fnName)) {
          defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
        }
      }
    }

    function ComponentDummy() {}
    ComponentDummy.prototype = Component.prototype;

    /**
     * Convenience component with default shallow equality check for sCU.
     */
    function PureComponent(props, context, updater) {
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;
    }

    var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
    pureComponentPrototype.constructor = PureComponent;
    // Avoid an extra prototype jump for these methods.
    _assign(pureComponentPrototype, Component.prototype);
    pureComponentPrototype.isPureReactComponent = true;

    // an immutable object with a single mutable value
    function createRef() {
      var refObject = {
        current: null
      };
      {
        Object.seal(refObject);
      }
      return refObject;
    }

    /**
     * Keeps track of the current owner.
     *
     * The current owner is the component who should own any components that are
     * currently being constructed.
     */
    var ReactCurrentOwner = {
      /**
       * @internal
       * @type {ReactComponent}
       */
      current: null
    };

    var hasOwnProperty = Object.prototype.hasOwnProperty;

    var RESERVED_PROPS = {
      key: true,
      ref: true,
      __self: true,
      __source: true
    };

    var specialPropKeyWarningShown = void 0;
    var specialPropRefWarningShown = void 0;

    function hasValidRef(config) {
      {
        if (hasOwnProperty.call(config, 'ref')) {
          var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
          if (getter && getter.isReactWarning) {
            return false;
          }
        }
      }
      return config.ref !== undefined;
    }

    function hasValidKey(config) {
      {
        if (hasOwnProperty.call(config, 'key')) {
          var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
          if (getter && getter.isReactWarning) {
            return false;
          }
        }
      }
      return config.key !== undefined;
    }

    function defineKeyPropWarningGetter(props, displayName) {
      var warnAboutAccessingKey = function warnAboutAccessingKey() {
        if (!specialPropKeyWarningShown) {
          specialPropKeyWarningShown = true;
          warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
        }
      };
      warnAboutAccessingKey.isReactWarning = true;
      Object.defineProperty(props, 'key', {
        get: warnAboutAccessingKey,
        configurable: true
      });
    }

    function defineRefPropWarningGetter(props, displayName) {
      var warnAboutAccessingRef = function warnAboutAccessingRef() {
        if (!specialPropRefWarningShown) {
          specialPropRefWarningShown = true;
          warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
        }
      };
      warnAboutAccessingRef.isReactWarning = true;
      Object.defineProperty(props, 'ref', {
        get: warnAboutAccessingRef,
        configurable: true
      });
    }

    /**
     * Factory method to create a new React element. This no longer adheres to
     * the class pattern, so do not use new to call it. Also, no instanceof check
     * will work. Instead test $$typeof field against Symbol.for('react.element') to check
     * if something is a React Element.
     *
     * @param {*} type
     * @param {*} key
     * @param {string|object} ref
     * @param {*} self A *temporary* helper to detect places where `this` is
     * different from the `owner` when React.createElement is called, so that we
     * can warn. We want to get rid of owner and replace string `ref`s with arrow
     * functions, and as long as `this` and owner are the same, there will be no
     * change in behavior.
     * @param {*} source An annotation object (added by a transpiler or otherwise)
     * indicating filename, line number, and/or other information.
     * @param {*} owner
     * @param {*} props
     * @internal
     */
    var ReactElement = function ReactElement(type, key, ref, self, source, owner, props) {
      var element = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: REACT_ELEMENT_TYPE,

        // Built-in properties that belong on the element
        type: type,
        key: key,
        ref: ref,
        props: props,

        // Record the component responsible for creating this element.
        _owner: owner
      };

      {
        // The validation flag is currently mutative. We put it on
        // an external backing store so that we can freeze the whole object.
        // This can be replaced with a WeakMap once they are implemented in
        // commonly used development environments.
        element._store = {};

        // To make comparing ReactElements easier for testing purposes, we make
        // the validation flag non-enumerable (where possible, which should
        // include every environment we run tests in), so the test framework
        // ignores it.
        Object.defineProperty(element._store, 'validated', {
          configurable: false,
          enumerable: false,
          writable: true,
          value: false
        });
        // self and source are DEV only properties.
        Object.defineProperty(element, '_self', {
          configurable: false,
          enumerable: false,
          writable: false,
          value: self
        });
        // Two elements created in two different places should be considered
        // equal for testing purposes and therefore we hide it from enumeration.
        Object.defineProperty(element, '_source', {
          configurable: false,
          enumerable: false,
          writable: false,
          value: source
        });
        if (Object.freeze) {
          Object.freeze(element.props);
          Object.freeze(element);
        }
      }

      return element;
    };

    /**
     * Create and return a new ReactElement of the given type.
     * See https://reactjs.org/docs/react-api.html#createelement
     */
    function createElement(type, config, children) {
      var propName = void 0;

      // Reserved names are extracted
      var props = {};

      var key = null;
      var ref = null;
      var self = null;
      var source = null;

      if (config != null) {
        if (hasValidRef(config)) {
          ref = config.ref;
        }
        if (hasValidKey(config)) {
          key = '' + config.key;
        }

        self = config.__self === undefined ? null : config.__self;
        source = config.__source === undefined ? null : config.__source;
        // Remaining properties are added to a new props object
        for (propName in config) {
          if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
            props[propName] = config[propName];
          }
        }
      }

      // Children can be more than one argument, and those are transferred onto
      // the newly allocated props object.
      var childrenLength = arguments.length - 2;
      if (childrenLength === 1) {
        props.children = children;
      } else if (childrenLength > 1) {
        var childArray = Array(childrenLength);
        for (var i = 0; i < childrenLength; i++) {
          childArray[i] = arguments[i + 2];
        }
        {
          if (Object.freeze) {
            Object.freeze(childArray);
          }
        }
        props.children = childArray;
      }

      // Resolve default props
      if (type && type.defaultProps) {
        var defaultProps = type.defaultProps;
        for (propName in defaultProps) {
          if (props[propName] === undefined) {
            props[propName] = defaultProps[propName];
          }
        }
      }
      {
        if (key || ref) {
          if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
            var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
            if (key) {
              defineKeyPropWarningGetter(props, displayName);
            }
            if (ref) {
              defineRefPropWarningGetter(props, displayName);
            }
          }
        }
      }
      return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
    }

    /**
     * Return a function that produces ReactElements of a given type.
     * See https://reactjs.org/docs/react-api.html#createfactory
     */

    function cloneAndReplaceKey(oldElement, newKey) {
      var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

      return newElement;
    }

    /**
     * Clone and return a new ReactElement using element as the starting point.
     * See https://reactjs.org/docs/react-api.html#cloneelement
     */
    function cloneElement(element, config, children) {
      !!(element === null || element === undefined) ? invariant(false, 'React.cloneElement(...): The argument must be a React element, but you passed %s.', element) : void 0;

      var propName = void 0;

      // Original props are copied
      var props = _assign({}, element.props);

      // Reserved names are extracted
      var key = element.key;
      var ref = element.ref;
      // Self is preserved since the owner is preserved.
      var self = element._self;
      // Source is preserved since cloneElement is unlikely to be targeted by a
      // transpiler, and the original source is probably a better indicator of the
      // true owner.
      var source = element._source;

      // Owner will be preserved, unless ref is overridden
      var owner = element._owner;

      if (config != null) {
        if (hasValidRef(config)) {
          // Silently steal the ref from the parent.
          ref = config.ref;
          owner = ReactCurrentOwner.current;
        }
        if (hasValidKey(config)) {
          key = '' + config.key;
        }

        // Remaining properties override existing props
        var defaultProps = void 0;
        if (element.type && element.type.defaultProps) {
          defaultProps = element.type.defaultProps;
        }
        for (propName in config) {
          if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
            if (config[propName] === undefined && defaultProps !== undefined) {
              // Resolve default props
              props[propName] = defaultProps[propName];
            } else {
              props[propName] = config[propName];
            }
          }
        }
      }

      // Children can be more than one argument, and those are transferred onto
      // the newly allocated props object.
      var childrenLength = arguments.length - 2;
      if (childrenLength === 1) {
        props.children = children;
      } else if (childrenLength > 1) {
        var childArray = Array(childrenLength);
        for (var i = 0; i < childrenLength; i++) {
          childArray[i] = arguments[i + 2];
        }
        props.children = childArray;
      }

      return ReactElement(element.type, key, ref, self, source, owner, props);
    }

    /**
     * Verifies the object is a ReactElement.
     * See https://reactjs.org/docs/react-api.html#isvalidelement
     * @param {?object} object
     * @return {boolean} True if `object` is a valid component.
     * @final
     */
    function isValidElement(object) {
      return (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    }

    var ReactDebugCurrentFrame = {};

    {
      // Component that is being worked on
      ReactDebugCurrentFrame.getCurrentStack = null;

      ReactDebugCurrentFrame.getStackAddendum = function () {
        var impl = ReactDebugCurrentFrame.getCurrentStack;
        if (impl) {
          return impl();
        }
        return null;
      };
    }

    var SEPARATOR = '.';
    var SUBSEPARATOR = ':';

    /**
     * Escape and wrap key so it is safe to use as a reactid
     *
     * @param {string} key to be escaped.
     * @return {string} the escaped key.
     */
    function escape(key) {
      var escapeRegex = /[=:]/g;
      var escaperLookup = {
        '=': '=0',
        ':': '=2'
      };
      var escapedString = ('' + key).replace(escapeRegex, function (match) {
        return escaperLookup[match];
      });

      return '$' + escapedString;
    }

    /**
     * TODO: Test that a single child and an array with one item have the same key
     * pattern.
     */

    var didWarnAboutMaps = false;

    var userProvidedKeyEscapeRegex = /\/+/g;
    function escapeUserProvidedKey(text) {
      return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
    }

    var POOL_SIZE = 10;
    var traverseContextPool = [];
    function getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {
      if (traverseContextPool.length) {
        var traverseContext = traverseContextPool.pop();
        traverseContext.result = mapResult;
        traverseContext.keyPrefix = keyPrefix;
        traverseContext.func = mapFunction;
        traverseContext.context = mapContext;
        traverseContext.count = 0;
        return traverseContext;
      } else {
        return {
          result: mapResult,
          keyPrefix: keyPrefix,
          func: mapFunction,
          context: mapContext,
          count: 0
        };
      }
    }

    function releaseTraverseContext(traverseContext) {
      traverseContext.result = null;
      traverseContext.keyPrefix = null;
      traverseContext.func = null;
      traverseContext.context = null;
      traverseContext.count = 0;
      if (traverseContextPool.length < POOL_SIZE) {
        traverseContextPool.push(traverseContext);
      }
    }

    /**
     * @param {?*} children Children tree container.
     * @param {!string} nameSoFar Name of the key path so far.
     * @param {!function} callback Callback to invoke with each child found.
     * @param {?*} traverseContext Used to pass information throughout the traversal
     * process.
     * @return {!number} The number of children in this subtree.
     */
    function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
      var type = typeof children === 'undefined' ? 'undefined' : _typeof(children);

      if (type === 'undefined' || type === 'boolean') {
        // All of the above are perceived as null.
        children = null;
      }

      var invokeCallback = false;

      if (children === null) {
        invokeCallback = true;
      } else {
        switch (type) {
          case 'string':
          case 'number':
            invokeCallback = true;
            break;
          case 'object':
            switch (children.$$typeof) {
              case REACT_ELEMENT_TYPE:
              case REACT_PORTAL_TYPE:
                invokeCallback = true;
            }
        }
      }

      if (invokeCallback) {
        callback(traverseContext, children,
        // If it's the only child, treat the name as if it was wrapped in an array
        // so that it's consistent if the number of children grows.
        nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
        return 1;
      }

      var child = void 0;
      var nextName = void 0;
      var subtreeCount = 0; // Count of children found in the current subtree.
      var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

      if (Array.isArray(children)) {
        for (var i = 0; i < children.length; i++) {
          child = children[i];
          nextName = nextNamePrefix + getComponentKey(child, i);
          subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
        }
      } else {
        var iteratorFn = getIteratorFn(children);
        if (typeof iteratorFn === 'function') {
          {
            // Warn about using Maps as children
            if (iteratorFn === children.entries) {
              !didWarnAboutMaps ? warning(false, 'Using Maps as children is unsupported and will likely yield ' + 'unexpected results. Convert it to a sequence/iterable of keyed ' + 'ReactElements instead.%s', ReactDebugCurrentFrame.getStackAddendum()) : void 0;
              didWarnAboutMaps = true;
            }
          }

          var iterator = iteratorFn.call(children);
          var step = void 0;
          var ii = 0;
          while (!(step = iterator.next()).done) {
            child = step.value;
            nextName = nextNamePrefix + getComponentKey(child, ii++);
            subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
          }
        } else if (type === 'object') {
          var addendum = '';
          {
            addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + ReactDebugCurrentFrame.getStackAddendum();
          }
          var childrenString = '' + children;
          invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum);
        }
      }

      return subtreeCount;
    }

    /**
     * Traverses children that are typically specified as `props.children`, but
     * might also be specified through attributes:
     *
     * - `traverseAllChildren(this.props.children, ...)`
     * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
     *
     * The `traverseContext` is an optional argument that is passed through the
     * entire traversal. It can be used to store accumulations or anything else that
     * the callback might find relevant.
     *
     * @param {?*} children Children tree object.
     * @param {!function} callback To invoke upon traversing each child.
     * @param {?*} traverseContext Context for traversal.
     * @return {!number} The number of children in this subtree.
     */
    function traverseAllChildren(children, callback, traverseContext) {
      if (children == null) {
        return 0;
      }

      return traverseAllChildrenImpl(children, '', callback, traverseContext);
    }

    /**
     * Generate a key string that identifies a component within a set.
     *
     * @param {*} component A component that could contain a manual key.
     * @param {number} index Index that is used if a manual key is not provided.
     * @return {string}
     */
    function getComponentKey(component, index) {
      // Do some typechecking here since we call this blindly. We want to ensure
      // that we don't block potential future ES APIs.
      if ((typeof component === 'undefined' ? 'undefined' : _typeof(component)) === 'object' && component !== null && component.key != null) {
        // Explicit key
        return escape(component.key);
      }
      // Implicit key determined by the index in the set
      return index.toString(36);
    }

    function forEachSingleChild(bookKeeping, child, name) {
      var func = bookKeeping.func,
          context = bookKeeping.context;

      func.call(context, child, bookKeeping.count++);
    }

    /**
     * Iterates through children that are typically specified as `props.children`.
     *
     * See https://reactjs.org/docs/react-api.html#react.children.foreach
     *
     * The provided forEachFunc(child, index) will be called for each
     * leaf child.
     *
     * @param {?*} children Children tree container.
     * @param {function(*, int)} forEachFunc
     * @param {*} forEachContext Context for forEachContext.
     */
    function forEachChildren(children, forEachFunc, forEachContext) {
      if (children == null) {
        return children;
      }
      var traverseContext = getPooledTraverseContext(null, null, forEachFunc, forEachContext);
      traverseAllChildren(children, forEachSingleChild, traverseContext);
      releaseTraverseContext(traverseContext);
    }

    function mapSingleChildIntoContext(bookKeeping, child, childKey) {
      var result = bookKeeping.result,
          keyPrefix = bookKeeping.keyPrefix,
          func = bookKeeping.func,
          context = bookKeeping.context;

      var mappedChild = func.call(context, child, bookKeeping.count++);
      if (Array.isArray(mappedChild)) {
        mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
      } else if (mappedChild != null) {
        if (isValidElement(mappedChild)) {
          mappedChild = cloneAndReplaceKey(mappedChild,
          // Keep both the (mapped) and old keys if they differ, just as
          // traverseAllChildren used to do for objects as children
          keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
        }
        result.push(mappedChild);
      }
    }

    function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
      var escapedPrefix = '';
      if (prefix != null) {
        escapedPrefix = escapeUserProvidedKey(prefix) + '/';
      }
      var traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context);
      traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
      releaseTraverseContext(traverseContext);
    }

    /**
     * Maps children that are typically specified as `props.children`.
     *
     * See https://reactjs.org/docs/react-api.html#react.children.map
     *
     * The provided mapFunction(child, key, index) will be called for each
     * leaf child.
     *
     * @param {?*} children Children tree container.
     * @param {function(*, int)} func The map function.
     * @param {*} context Context for mapFunction.
     * @return {object} Object containing the ordered map of results.
     */
    function mapChildren(children, func, context) {
      if (children == null) {
        return children;
      }
      var result = [];
      mapIntoWithKeyPrefixInternal(children, result, null, func, context);
      return result;
    }

    /**
     * Count the number of children that are typically specified as
     * `props.children`.
     *
     * See https://reactjs.org/docs/react-api.html#react.children.count
     *
     * @param {?*} children Children tree container.
     * @return {number} The number of children.
     */
    function countChildren(children) {
      return traverseAllChildren(children, emptyFunction.thatReturnsNull, null);
    }

    /**
     * Flatten a children object (typically specified as `props.children`) and
     * return an array with appropriately re-keyed children.
     *
     * See https://reactjs.org/docs/react-api.html#react.children.toarray
     */
    function toArray(children) {
      var result = [];
      mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
      return result;
    }

    /**
     * Returns the first child in a collection of children and verifies that there
     * is only one child in the collection.
     *
     * See https://reactjs.org/docs/react-api.html#react.children.only
     *
     * The current implementation of this function assumes that a single child gets
     * passed without a wrapper, but the purpose of this helper function is to
     * abstract away the particular structure of children.
     *
     * @param {?object} children Child collection structure.
     * @return {ReactElement} The first and only `ReactElement` contained in the
     * structure.
     */
    function onlyChild(children) {
      !isValidElement(children) ? invariant(false, 'React.Children.only expected to receive a single React element child.') : void 0;
      return children;
    }

    function createContext(defaultValue, calculateChangedBits) {
      if (calculateChangedBits === undefined) {
        calculateChangedBits = null;
      } else {
        {
          !(calculateChangedBits === null || typeof calculateChangedBits === 'function') ? warning(false, 'createContext: Expected the optional second argument to be a ' + 'function. Instead received: %s', calculateChangedBits) : void 0;
        }
      }

      var context = {
        $$typeof: REACT_CONTEXT_TYPE,
        _calculateChangedBits: calculateChangedBits,
        _defaultValue: defaultValue,
        _currentValue: defaultValue,
        // As a workaround to support multiple concurrent renderers, we categorize
        // some renderers as primary and others as secondary. We only expect
        // there to be two concurrent renderers at most: React Native (primary) and
        // Fabric (secondary); React DOM (primary) and React ART (secondary).
        // Secondary renderers store their context values on separate fields.
        _currentValue2: defaultValue,
        _changedBits: 0,
        _changedBits2: 0,
        // These are circular
        Provider: null,
        Consumer: null
      };

      context.Provider = {
        $$typeof: REACT_PROVIDER_TYPE,
        _context: context
      };
      context.Consumer = context;

      {
        context._currentRenderer = null;
        context._currentRenderer2 = null;
      }

      return context;
    }

    function forwardRef(render) {
      {
        !(typeof render === 'function') ? warning(false, 'forwardRef requires a render function but was given %s.', render === null ? 'null' : typeof render === 'undefined' ? 'undefined' : _typeof(render)) : void 0;

        if (render != null) {
          !(render.defaultProps == null && render.propTypes == null) ? warning(false, 'forwardRef render functions do not support propTypes or defaultProps. ' + 'Did you accidentally pass a React component?') : void 0;
        }
      }

      return {
        $$typeof: REACT_FORWARD_REF_TYPE,
        render: render
      };
    }

    var describeComponentFrame = function describeComponentFrame(name, source, ownerName) {
      return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
    };

    function isValidElementType(type) {
      return typeof type === 'string' || typeof type === 'function' ||
      // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      type === REACT_FRAGMENT_TYPE || type === REACT_ASYNC_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_TIMEOUT_TYPE || (typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'object' && type !== null && (type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE);
    }

    function getComponentName(fiber) {
      var type = fiber.type;

      if (typeof type === 'function') {
        return type.displayName || type.name;
      }
      if (typeof type === 'string') {
        return type;
      }
      switch (type) {
        case REACT_ASYNC_MODE_TYPE:
          return 'AsyncMode';
        case REACT_CONTEXT_TYPE:
          return 'Context.Consumer';
        case REACT_FRAGMENT_TYPE:
          return 'ReactFragment';
        case REACT_PORTAL_TYPE:
          return 'ReactPortal';
        case REACT_PROFILER_TYPE:
          return 'Profiler(' + fiber.pendingProps.id + ')';
        case REACT_PROVIDER_TYPE:
          return 'Context.Provider';
        case REACT_STRICT_MODE_TYPE:
          return 'StrictMode';
        case REACT_TIMEOUT_TYPE:
          return 'Timeout';
      }
      if ((typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'object' && type !== null) {
        switch (type.$$typeof) {
          case REACT_FORWARD_REF_TYPE:
            var functionName = type.render.displayName || type.render.name || '';
            return functionName !== '' ? 'ForwardRef(' + functionName + ')' : 'ForwardRef';
        }
      }
      return null;
    }

    /**
     * ReactElementValidator provides a wrapper around a element factory
     * which validates the props passed to the element. This is intended to be
     * used only in DEV and could be replaced by a static type checker for languages
     * that support it.
     */

    var currentlyValidatingElement = void 0;
    var propTypesMisspellWarningShown = void 0;

    var getDisplayName = function getDisplayName() {};
    var getStackAddendum = function getStackAddendum() {};

    {
      currentlyValidatingElement = null;

      propTypesMisspellWarningShown = false;

      getDisplayName = function getDisplayName(element) {
        if (element == null) {
          return '#empty';
        } else if (typeof element === 'string' || typeof element === 'number') {
          return '#text';
        } else if (typeof element.type === 'string') {
          return element.type;
        } else if (element.type === REACT_FRAGMENT_TYPE) {
          return 'React.Fragment';
        } else {
          return element.type.displayName || element.type.name || 'Unknown';
        }
      };

      getStackAddendum = function getStackAddendum() {
        var stack = '';
        if (currentlyValidatingElement) {
          var name = getDisplayName(currentlyValidatingElement);
          var owner = currentlyValidatingElement._owner;
          stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner));
        }
        stack += ReactDebugCurrentFrame.getStackAddendum() || '';
        return stack;
      };
    }

    function getDeclarationErrorAddendum() {
      if (ReactCurrentOwner.current) {
        var name = getComponentName(ReactCurrentOwner.current);
        if (name) {
          return '\n\nCheck the render method of `' + name + '`.';
        }
      }
      return '';
    }

    function getSourceInfoErrorAddendum(elementProps) {
      if (elementProps !== null && elementProps !== undefined && elementProps.__source !== undefined) {
        var source = elementProps.__source;
        var fileName = source.fileName.replace(/^.*[\\\/]/, '');
        var lineNumber = source.lineNumber;
        return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
      }
      return '';
    }

    /**
     * Warn if there's no key explicitly set on dynamic arrays of children or
     * object keys are not valid. This allows us to keep track of children between
     * updates.
     */
    var ownerHasKeyUseWarning = {};

    function getCurrentComponentErrorInfo(parentType) {
      var info = getDeclarationErrorAddendum();

      if (!info) {
        var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
        if (parentName) {
          info = '\n\nCheck the top-level render call using <' + parentName + '>.';
        }
      }
      return info;
    }

    /**
     * Warn if the element doesn't have an explicit key assigned to it.
     * This element is in an array. The array could grow and shrink or be
     * reordered. All children that haven't already been validated are required to
     * have a "key" property assigned to it. Error statuses are cached so a warning
     * will only be shown once.
     *
     * @internal
     * @param {ReactElement} element Element that requires a key.
     * @param {*} parentType element's parent's type.
     */
    function validateExplicitKey(element, parentType) {
      if (!element._store || element._store.validated || element.key != null) {
        return;
      }
      element._store.validated = true;

      var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
      if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
        return;
      }
      ownerHasKeyUseWarning[currentComponentErrorInfo] = true;

      // Usually the current owner is the offender, but if it accepts children as a
      // property, it may be the creator of the child that's responsible for
      // assigning it a key.
      var childOwner = '';
      if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
        // Give the component that originally created this child.
        childOwner = ' It was passed a child from ' + getComponentName(element._owner) + '.';
      }

      currentlyValidatingElement = element;
      {
        warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, getStackAddendum());
      }
      currentlyValidatingElement = null;
    }

    /**
     * Ensure that every element either is passed in a static location, in an
     * array with an explicit keys property defined, or in an object literal
     * with valid key property.
     *
     * @internal
     * @param {ReactNode} node Statically passed child of any type.
     * @param {*} parentType node's parent's type.
     */
    function validateChildKeys(node, parentType) {
      if ((typeof node === 'undefined' ? 'undefined' : _typeof(node)) !== 'object') {
        return;
      }
      if (Array.isArray(node)) {
        for (var i = 0; i < node.length; i++) {
          var child = node[i];
          if (isValidElement(child)) {
            validateExplicitKey(child, parentType);
          }
        }
      } else if (isValidElement(node)) {
        // This element was passed in a valid location.
        if (node._store) {
          node._store.validated = true;
        }
      } else if (node) {
        var iteratorFn = getIteratorFn(node);
        if (typeof iteratorFn === 'function') {
          // Entry iterators used to provide implicit keys,
          // but now we print a separate warning for them later.
          if (iteratorFn !== node.entries) {
            var iterator = iteratorFn.call(node);
            var step = void 0;
            while (!(step = iterator.next()).done) {
              if (isValidElement(step.value)) {
                validateExplicitKey(step.value, parentType);
              }
            }
          }
        }
      }
    }

    /**
     * Given an element, validate that its props follow the propTypes definition,
     * provided by the type.
     *
     * @param {ReactElement} element
     */
    function validatePropTypes(element) {
      var componentClass = element.type;
      if (typeof componentClass !== 'function') {
        return;
      }
      var name = componentClass.displayName || componentClass.name;
      var propTypes = componentClass.propTypes;
      if (propTypes) {
        currentlyValidatingElement = element;
        checkPropTypes(propTypes, element.props, 'prop', name, getStackAddendum);
        currentlyValidatingElement = null;
      } else if (componentClass.PropTypes !== undefined && !propTypesMisspellWarningShown) {
        propTypesMisspellWarningShown = true;
        warning(false, 'Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', name || 'Unknown');
      }
      if (typeof componentClass.getDefaultProps === 'function') {
        !componentClass.getDefaultProps.isReactClassApproved ? warning(false, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.') : void 0;
      }
    }

    /**
     * Given a fragment, validate that it can only be provided with fragment props
     * @param {ReactElement} fragment
     */
    function validateFragmentProps(fragment) {
      currentlyValidatingElement = fragment;

      var keys = Object.keys(fragment.props);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (key !== 'children' && key !== 'key') {
          warning(false, 'Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.%s', key, getStackAddendum());
          break;
        }
      }

      if (fragment.ref !== null) {
        warning(false, 'Invalid attribute `ref` supplied to `React.Fragment`.%s', getStackAddendum());
      }

      currentlyValidatingElement = null;
    }

    function createElementWithValidation(type, props, children) {
      var validType = isValidElementType(type);

      // We warn in this case but don't throw. We expect the element creation to
      // succeed and there will likely be errors in render.
      if (!validType) {
        var info = '';
        if (type === undefined || (typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'object' && type !== null && Object.keys(type).length === 0) {
          info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
        }

        var sourceInfo = getSourceInfoErrorAddendum(props);
        if (sourceInfo) {
          info += sourceInfo;
        } else {
          info += getDeclarationErrorAddendum();
        }

        info += getStackAddendum() || '';

        var typeString = void 0;
        if (type === null) {
          typeString = 'null';
        } else if (Array.isArray(type)) {
          typeString = 'array';
        } else {
          typeString = typeof type === 'undefined' ? 'undefined' : _typeof(type);
        }

        warning(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
      }

      var element = createElement.apply(this, arguments);

      // The result can be nullish if a mock or a custom function is used.
      // TODO: Drop this when these are no longer allowed as the type argument.
      if (element == null) {
        return element;
      }

      // Skip key warning if the type isn't valid since our key validation logic
      // doesn't expect a non-string/function type and can throw confusing errors.
      // We don't want exception behavior to differ between dev and prod.
      // (Rendering will throw with a helpful message and as soon as the type is
      // fixed, the key warnings will appear.)
      if (validType) {
        for (var i = 2; i < arguments.length; i++) {
          validateChildKeys(arguments[i], type);
        }
      }

      if (type === REACT_FRAGMENT_TYPE) {
        validateFragmentProps(element);
      } else {
        validatePropTypes(element);
      }

      return element;
    }

    function createFactoryWithValidation(type) {
      var validatedFactory = createElementWithValidation.bind(null, type);
      validatedFactory.type = type;
      // Legacy hook: remove it
      {
        Object.defineProperty(validatedFactory, 'type', {
          enumerable: false,
          get: function get() {
            lowPriorityWarning$1(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
            Object.defineProperty(this, 'type', {
              value: type
            });
            return type;
          }
        });
      }

      return validatedFactory;
    }

    function cloneElementWithValidation(element, props, children) {
      var newElement = cloneElement.apply(this, arguments);
      for (var i = 2; i < arguments.length; i++) {
        validateChildKeys(arguments[i], newElement.type);
      }
      validatePropTypes(newElement);
      return newElement;
    }

    var React = {
      Children: {
        map: mapChildren,
        forEach: forEachChildren,
        count: countChildren,
        toArray: toArray,
        only: onlyChild
      },

      createRef: createRef,
      Component: Component,
      PureComponent: PureComponent,

      createContext: createContext,
      forwardRef: forwardRef,

      Fragment: REACT_FRAGMENT_TYPE,
      StrictMode: REACT_STRICT_MODE_TYPE,
      unstable_AsyncMode: REACT_ASYNC_MODE_TYPE,
      unstable_Profiler: REACT_PROFILER_TYPE,

      createElement: createElementWithValidation,
      cloneElement: cloneElementWithValidation,
      createFactory: createFactoryWithValidation,
      isValidElement: isValidElement,

      version: ReactVersion,

      __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
        ReactCurrentOwner: ReactCurrentOwner,
        // Used by renderers to avoid bundling object-assign twice in UMD bundles:
        assign: _assign
      }
    };

    if (enableSuspense) {
      React.Timeout = REACT_TIMEOUT_TYPE;
    }

    {
      _assign(React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, {
        // These should not be included in production.
        ReactDebugCurrentFrame: ReactDebugCurrentFrame,
        // Shim for React DOM 16.0.0 which still destructured (but not used) this.
        // TODO: remove in React 17.0.
        ReactComponentTreeHook: {}
      });
    }

    var React$2 = Object.freeze({
      default: React
    });

    var React$3 = React$2 && React || React$2;

    // TODO: decide on the top-level export form.
    // This is hacky but makes it work with both Rollup and Jest.
    var react = React$3.default ? React$3.default : React$3;

    module.exports = react;
  })();
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

function checkDCE() {
  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function') {
    return;
  }
  if (process.env.NODE_ENV !== 'production') {
    // This branch is unreachable because this function is only called
    // in production, but the condition is true only in development.
    // Therefore if the branch is still here, dead code elimination wasn't
    // properly applied.
    // Don't change the message. React DevTools relies on it. Also make sure
    // this message doesn't occur elsewhere in this function, or it will cause
    // a false positive.
    throw new Error('^_^');
  }
  try {
    // Verify that the code above has been dead code eliminated (DCE'd).
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    // DevTools shouldn't crash React, no matter what.
    // We should still report in case we break this code.
    console.error(err);
  }
}

if (process.env.NODE_ENV === 'production') {
  // DCE check should happen before ReactDOM bundle executes so that
  // DevTools can report bad minification during injection.
  checkDCE();
  module.exports = __webpack_require__(23);
} else {
  module.exports = __webpack_require__(26);
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.4.0
 * react-dom.production.min.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/*
 Modernizr 3.0.0pre (Custom Build) | MIT
*/


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var aa = __webpack_require__(2),
    ca = __webpack_require__(1),
    m = __webpack_require__(9),
    p = __webpack_require__(4),
    v = __webpack_require__(3),
    da = __webpack_require__(10),
    ea = __webpack_require__(11),
    fa = __webpack_require__(12),
    ha = __webpack_require__(5);
function A(a) {
  for (var b = arguments.length - 1, c = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, d = 0; d < b; d++) {
    c += "&args[]=" + encodeURIComponent(arguments[d + 1]);
  }aa(!1, "Minified React error #" + a + "; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ", c);
}ca ? void 0 : A("227");
function ia(a, b, c, d, e, f, g, h, k) {
  this._hasCaughtError = !1;this._caughtError = null;var n = Array.prototype.slice.call(arguments, 3);try {
    b.apply(c, n);
  } catch (r) {
    this._caughtError = r, this._hasCaughtError = !0;
  }
}
var B = { _caughtError: null, _hasCaughtError: !1, _rethrowError: null, _hasRethrowError: !1, invokeGuardedCallback: function invokeGuardedCallback(a, b, c, d, e, f, g, h, k) {
    ia.apply(B, arguments);
  }, invokeGuardedCallbackAndCatchFirstError: function invokeGuardedCallbackAndCatchFirstError(a, b, c, d, e, f, g, h, k) {
    B.invokeGuardedCallback.apply(this, arguments);if (B.hasCaughtError()) {
      var n = B.clearCaughtError();B._hasRethrowError || (B._hasRethrowError = !0, B._rethrowError = n);
    }
  }, rethrowCaughtError: function rethrowCaughtError() {
    return ka.apply(B, arguments);
  }, hasCaughtError: function hasCaughtError() {
    return B._hasCaughtError;
  }, clearCaughtError: function clearCaughtError() {
    if (B._hasCaughtError) {
      var a = B._caughtError;B._caughtError = null;B._hasCaughtError = !1;return a;
    }A("198");
  } };function ka() {
  if (B._hasRethrowError) {
    var a = B._rethrowError;B._rethrowError = null;B._hasRethrowError = !1;throw a;
  }
}var la = null,
    ma = {};
function na() {
  if (la) for (var a in ma) {
    var b = ma[a],
        c = la.indexOf(a);-1 < c ? void 0 : A("96", a);if (!oa[c]) {
      b.extractEvents ? void 0 : A("97", a);oa[c] = b;c = b.eventTypes;for (var d in c) {
        var e = void 0;var f = c[d],
            g = b,
            h = d;pa.hasOwnProperty(h) ? A("99", h) : void 0;pa[h] = f;var k = f.phasedRegistrationNames;if (k) {
          for (e in k) {
            k.hasOwnProperty(e) && qa(k[e], g, h);
          }e = !0;
        } else f.registrationName ? (qa(f.registrationName, g, h), e = !0) : e = !1;e ? void 0 : A("98", d, a);
      }
    }
  }
}
function qa(a, b, c) {
  ra[a] ? A("100", a) : void 0;ra[a] = b;sa[a] = b.eventTypes[c].dependencies;
}var oa = [],
    pa = {},
    ra = {},
    sa = {};function ta(a) {
  la ? A("101") : void 0;la = Array.prototype.slice.call(a);na();
}function ua(a) {
  var b = !1,
      c;for (c in a) {
    if (a.hasOwnProperty(c)) {
      var d = a[c];ma.hasOwnProperty(c) && ma[c] === d || (ma[c] ? A("102", c) : void 0, ma[c] = d, b = !0);
    }
  }b && na();
}
var va = { plugins: oa, eventNameDispatchConfigs: pa, registrationNameModules: ra, registrationNameDependencies: sa, possibleRegistrationNames: null, injectEventPluginOrder: ta, injectEventPluginsByName: ua },
    wa = null,
    xa = null,
    ya = null;function za(a, b, c, d) {
  b = a.type || "unknown-event";a.currentTarget = ya(d);B.invokeGuardedCallbackAndCatchFirstError(b, c, void 0, a);a.currentTarget = null;
}
function Aa(a, b) {
  null == b ? A("30") : void 0;if (null == a) return b;if (Array.isArray(a)) {
    if (Array.isArray(b)) return a.push.apply(a, b), a;a.push(b);return a;
  }return Array.isArray(b) ? [a].concat(b) : [a, b];
}function Ba(a, b, c) {
  Array.isArray(a) ? a.forEach(b, c) : a && b.call(c, a);
}var Ca = null;
function Da(a, b) {
  if (a) {
    var c = a._dispatchListeners,
        d = a._dispatchInstances;if (Array.isArray(c)) for (var e = 0; e < c.length && !a.isPropagationStopped(); e++) {
      za(a, b, c[e], d[e]);
    } else c && za(a, b, c, d);a._dispatchListeners = null;a._dispatchInstances = null;a.isPersistent() || a.constructor.release(a);
  }
}function Ea(a) {
  return Da(a, !0);
}function Fa(a) {
  return Da(a, !1);
}var Ga = { injectEventPluginOrder: ta, injectEventPluginsByName: ua };
function Ha(a, b) {
  var c = a.stateNode;if (!c) return null;var d = wa(c);if (!d) return null;c = d[b];a: switch (b) {case "onClick":case "onClickCapture":case "onDoubleClick":case "onDoubleClickCapture":case "onMouseDown":case "onMouseDownCapture":case "onMouseMove":case "onMouseMoveCapture":case "onMouseUp":case "onMouseUpCapture":
      (d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));a = !d;break a;default:
      a = !1;}if (a) return null;c && "function" !== typeof c ? A("231", b, typeof c === "undefined" ? "undefined" : _typeof(c)) : void 0;
  return c;
}function Ia(a, b) {
  null !== a && (Ca = Aa(Ca, a));a = Ca;Ca = null;a && (b ? Ba(a, Ea) : Ba(a, Fa), Ca ? A("95") : void 0, B.rethrowCaughtError());
}function Ja(a, b, c, d) {
  for (var e = null, f = 0; f < oa.length; f++) {
    var g = oa[f];g && (g = g.extractEvents(a, b, c, d)) && (e = Aa(e, g));
  }Ia(e, !1);
}var Ka = { injection: Ga, getListener: Ha, runEventsInBatch: Ia, runExtractedEventsInBatch: Ja },
    La = Math.random().toString(36).slice(2),
    C = "__reactInternalInstance$" + La,
    Ma = "__reactEventHandlers$" + La;
function Na(a) {
  if (a[C]) return a[C];for (; !a[C];) {
    if (a.parentNode) a = a.parentNode;else return null;
  }a = a[C];return 5 === a.tag || 6 === a.tag ? a : null;
}function Oa(a) {
  if (5 === a.tag || 6 === a.tag) return a.stateNode;A("33");
}function Pa(a) {
  return a[Ma] || null;
}var Qa = { precacheFiberNode: function precacheFiberNode(a, b) {
    b[C] = a;
  }, getClosestInstanceFromNode: Na, getInstanceFromNode: function getInstanceFromNode(a) {
    a = a[C];return !a || 5 !== a.tag && 6 !== a.tag ? null : a;
  }, getNodeFromInstance: Oa, getFiberCurrentPropsFromNode: Pa, updateFiberProps: function updateFiberProps(a, b) {
    a[Ma] = b;
  } };
function F(a) {
  do {
    a = a.return;
  } while (a && 5 !== a.tag);return a ? a : null;
}function Ra(a, b, c) {
  for (var d = []; a;) {
    d.push(a), a = F(a);
  }for (a = d.length; 0 < a--;) {
    b(d[a], "captured", c);
  }for (a = 0; a < d.length; a++) {
    b(d[a], "bubbled", c);
  }
}function Sa(a, b, c) {
  if (b = Ha(a, c.dispatchConfig.phasedRegistrationNames[b])) c._dispatchListeners = Aa(c._dispatchListeners, b), c._dispatchInstances = Aa(c._dispatchInstances, a);
}function Ta(a) {
  a && a.dispatchConfig.phasedRegistrationNames && Ra(a._targetInst, Sa, a);
}
function Ua(a) {
  if (a && a.dispatchConfig.phasedRegistrationNames) {
    var b = a._targetInst;b = b ? F(b) : null;Ra(b, Sa, a);
  }
}function Va(a, b, c) {
  a && c && c.dispatchConfig.registrationName && (b = Ha(a, c.dispatchConfig.registrationName)) && (c._dispatchListeners = Aa(c._dispatchListeners, b), c._dispatchInstances = Aa(c._dispatchInstances, a));
}function Xa(a) {
  a && a.dispatchConfig.registrationName && Va(a._targetInst, null, a);
}function Ya(a) {
  Ba(a, Ta);
}
function Za(a, b, c, d) {
  if (c && d) a: {
    var e = c;for (var f = d, g = 0, h = e; h; h = F(h)) {
      g++;
    }h = 0;for (var k = f; k; k = F(k)) {
      h++;
    }for (; 0 < g - h;) {
      e = F(e), g--;
    }for (; 0 < h - g;) {
      f = F(f), h--;
    }for (; g--;) {
      if (e === f || e === f.alternate) break a;e = F(e);f = F(f);
    }e = null;
  } else e = null;f = e;for (e = []; c && c !== f;) {
    g = c.alternate;if (null !== g && g === f) break;e.push(c);c = F(c);
  }for (c = []; d && d !== f;) {
    g = d.alternate;if (null !== g && g === f) break;c.push(d);d = F(d);
  }for (d = 0; d < e.length; d++) {
    Va(e[d], "bubbled", a);
  }for (a = c.length; 0 < a--;) {
    Va(c[a], "captured", b);
  }
}
var $a = { accumulateTwoPhaseDispatches: Ya, accumulateTwoPhaseDispatchesSkipTarget: function accumulateTwoPhaseDispatchesSkipTarget(a) {
    Ba(a, Ua);
  }, accumulateEnterLeaveDispatches: Za, accumulateDirectDispatches: function accumulateDirectDispatches(a) {
    Ba(a, Xa);
  } };function ab(a, b) {
  var c = {};c[a.toLowerCase()] = b.toLowerCase();c["Webkit" + a] = "webkit" + b;c["Moz" + a] = "moz" + b;c["ms" + a] = "MS" + b;c["O" + a] = "o" + b.toLowerCase();return c;
}
var bb = { animationend: ab("Animation", "AnimationEnd"), animationiteration: ab("Animation", "AnimationIteration"), animationstart: ab("Animation", "AnimationStart"), transitionend: ab("Transition", "TransitionEnd") },
    cb = {},
    db = {};m.canUseDOM && (db = document.createElement("div").style, "AnimationEvent" in window || (delete bb.animationend.animation, delete bb.animationiteration.animation, delete bb.animationstart.animation), "TransitionEvent" in window || delete bb.transitionend.transition);
function eb(a) {
  if (cb[a]) return cb[a];if (!bb[a]) return a;var b = bb[a],
      c;for (c in b) {
    if (b.hasOwnProperty(c) && c in db) return cb[a] = b[c];
  }return a;
}var fb = eb("animationend"),
    gb = eb("animationiteration"),
    hb = eb("animationstart"),
    ib = eb("transitionend"),
    jb = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),
    kb = null;
function lb() {
  !kb && m.canUseDOM && (kb = "textContent" in document.documentElement ? "textContent" : "innerText");return kb;
}var G = { _root: null, _startText: null, _fallbackText: null };function mb() {
  if (G._fallbackText) return G._fallbackText;var a,
      b = G._startText,
      c = b.length,
      d,
      e = nb(),
      f = e.length;for (a = 0; a < c && b[a] === e[a]; a++) {}var g = c - a;for (d = 1; d <= g && b[c - d] === e[f - d]; d++) {}G._fallbackText = e.slice(a, 1 < d ? 1 - d : void 0);return G._fallbackText;
}function nb() {
  return "value" in G._root ? G._root.value : G._root[lb()];
}
var ob = "dispatchConfig _targetInst nativeEvent isDefaultPrevented isPropagationStopped _dispatchListeners _dispatchInstances".split(" "),
    pb = { type: null, target: null, currentTarget: v.thatReturnsNull, eventPhase: null, bubbles: null, cancelable: null, timeStamp: function timeStamp(a) {
    return a.timeStamp || Date.now();
  }, defaultPrevented: null, isTrusted: null };
function H(a, b, c, d) {
  this.dispatchConfig = a;this._targetInst = b;this.nativeEvent = c;a = this.constructor.Interface;for (var e in a) {
    a.hasOwnProperty(e) && ((b = a[e]) ? this[e] = b(c) : "target" === e ? this.target = d : this[e] = c[e]);
  }this.isDefaultPrevented = (null != c.defaultPrevented ? c.defaultPrevented : !1 === c.returnValue) ? v.thatReturnsTrue : v.thatReturnsFalse;this.isPropagationStopped = v.thatReturnsFalse;return this;
}
p(H.prototype, { preventDefault: function preventDefault() {
    this.defaultPrevented = !0;var a = this.nativeEvent;a && (a.preventDefault ? a.preventDefault() : "unknown" !== typeof a.returnValue && (a.returnValue = !1), this.isDefaultPrevented = v.thatReturnsTrue);
  }, stopPropagation: function stopPropagation() {
    var a = this.nativeEvent;a && (a.stopPropagation ? a.stopPropagation() : "unknown" !== typeof a.cancelBubble && (a.cancelBubble = !0), this.isPropagationStopped = v.thatReturnsTrue);
  }, persist: function persist() {
    this.isPersistent = v.thatReturnsTrue;
  }, isPersistent: v.thatReturnsFalse,
  destructor: function destructor() {
    var a = this.constructor.Interface,
        b;for (b in a) {
      this[b] = null;
    }for (a = 0; a < ob.length; a++) {
      this[ob[a]] = null;
    }
  } });H.Interface = pb;H.extend = function (a) {
  function b() {}function c() {
    return d.apply(this, arguments);
  }var d = this;b.prototype = d.prototype;var e = new b();p(e, c.prototype);c.prototype = e;c.prototype.constructor = c;c.Interface = p({}, d.Interface, a);c.extend = d.extend;qb(c);return c;
};qb(H);
function rb(a, b, c, d) {
  if (this.eventPool.length) {
    var e = this.eventPool.pop();this.call(e, a, b, c, d);return e;
  }return new this(a, b, c, d);
}function sb(a) {
  a instanceof this ? void 0 : A("223");a.destructor();10 > this.eventPool.length && this.eventPool.push(a);
}function qb(a) {
  a.eventPool = [];a.getPooled = rb;a.release = sb;
}var tb = H.extend({ data: null }),
    ub = H.extend({ data: null }),
    vb = [9, 13, 27, 32],
    wb = m.canUseDOM && "CompositionEvent" in window,
    xb = null;m.canUseDOM && "documentMode" in document && (xb = document.documentMode);
var yb = m.canUseDOM && "TextEvent" in window && !xb,
    zb = m.canUseDOM && (!wb || xb && 8 < xb && 11 >= xb),
    Ab = String.fromCharCode(32),
    Bb = { beforeInput: { phasedRegistrationNames: { bubbled: "onBeforeInput", captured: "onBeforeInputCapture" }, dependencies: ["compositionend", "keypress", "textInput", "paste"] }, compositionEnd: { phasedRegistrationNames: { bubbled: "onCompositionEnd", captured: "onCompositionEndCapture" }, dependencies: "blur compositionend keydown keypress keyup mousedown".split(" ") }, compositionStart: { phasedRegistrationNames: { bubbled: "onCompositionStart",
      captured: "onCompositionStartCapture" }, dependencies: "blur compositionstart keydown keypress keyup mousedown".split(" ") }, compositionUpdate: { phasedRegistrationNames: { bubbled: "onCompositionUpdate", captured: "onCompositionUpdateCapture" }, dependencies: "blur compositionupdate keydown keypress keyup mousedown".split(" ") } },
    Cb = !1;
function Db(a, b) {
  switch (a) {case "keyup":
      return -1 !== vb.indexOf(b.keyCode);case "keydown":
      return 229 !== b.keyCode;case "keypress":case "mousedown":case "blur":
      return !0;default:
      return !1;}
}function Eb(a) {
  a = a.detail;return "object" === (typeof a === "undefined" ? "undefined" : _typeof(a)) && "data" in a ? a.data : null;
}var Fb = !1;function Gb(a, b) {
  switch (a) {case "compositionend":
      return Eb(b);case "keypress":
      if (32 !== b.which) return null;Cb = !0;return Ab;case "textInput":
      return a = b.data, a === Ab && Cb ? null : a;default:
      return null;}
}
function Hb(a, b) {
  if (Fb) return "compositionend" === a || !wb && Db(a, b) ? (a = mb(), G._root = null, G._startText = null, G._fallbackText = null, Fb = !1, a) : null;switch (a) {case "paste":
      return null;case "keypress":
      if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
        if (b.char && 1 < b.char.length) return b.char;if (b.which) return String.fromCharCode(b.which);
      }return null;case "compositionend":
      return zb ? null : b.data;default:
      return null;}
}
var Ib = { eventTypes: Bb, extractEvents: function extractEvents(a, b, c, d) {
    var e = void 0;var f = void 0;if (wb) b: {
      switch (a) {case "compositionstart":
          e = Bb.compositionStart;break b;case "compositionend":
          e = Bb.compositionEnd;break b;case "compositionupdate":
          e = Bb.compositionUpdate;break b;}e = void 0;
    } else Fb ? Db(a, c) && (e = Bb.compositionEnd) : "keydown" === a && 229 === c.keyCode && (e = Bb.compositionStart);e ? (zb && (Fb || e !== Bb.compositionStart ? e === Bb.compositionEnd && Fb && (f = mb()) : (G._root = d, G._startText = nb(), Fb = !0)), e = tb.getPooled(e, b, c, d), f ? e.data = f : (f = Eb(c), null !== f && (e.data = f)), Ya(e), f = e) : f = null;(a = yb ? Gb(a, c) : Hb(a, c)) ? (b = ub.getPooled(Bb.beforeInput, b, c, d), b.data = a, Ya(b)) : b = null;return null === f ? b : null === b ? f : [f, b];
  } },
    Jb = null,
    Kb = { injectFiberControlledHostComponent: function injectFiberControlledHostComponent(a) {
    Jb = a;
  } },
    Lb = null,
    Mb = null;function Nb(a) {
  if (a = xa(a)) {
    Jb && "function" === typeof Jb.restoreControlledState ? void 0 : A("194");var b = wa(a.stateNode);Jb.restoreControlledState(a.stateNode, a.type, b);
  }
}function Ob(a) {
  Lb ? Mb ? Mb.push(a) : Mb = [a] : Lb = a;
}
function Pb() {
  return null !== Lb || null !== Mb;
}function Qb() {
  if (Lb) {
    var a = Lb,
        b = Mb;Mb = Lb = null;Nb(a);if (b) for (a = 0; a < b.length; a++) {
      Nb(b[a]);
    }
  }
}var Rb = { injection: Kb, enqueueStateRestore: Ob, needsStateRestore: Pb, restoreStateIfNeeded: Qb };function Sb(a, b) {
  return a(b);
}function Tb(a, b, c) {
  return a(b, c);
}function Ub() {}var Vb = !1;function Wb(a, b) {
  if (Vb) return a(b);Vb = !0;try {
    return Sb(a, b);
  } finally {
    Vb = !1, Pb() && (Ub(), Qb());
  }
}
var Xb = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };function Yb(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();return "input" === b ? !!Xb[a.type] : "textarea" === b ? !0 : !1;
}function Zb(a) {
  a = a.target || window;a.correspondingUseElement && (a = a.correspondingUseElement);return 3 === a.nodeType ? a.parentNode : a;
}
function $b(a, b) {
  if (!m.canUseDOM || b && !("addEventListener" in document)) return !1;a = "on" + a;b = a in document;b || (b = document.createElement("div"), b.setAttribute(a, "return;"), b = "function" === typeof b[a]);return b;
}function ac(a) {
  var b = a.type;return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
}
function bc(a) {
  var b = ac(a) ? "checked" : "value",
      c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b),
      d = "" + a[b];if (!a.hasOwnProperty(b) && "undefined" !== typeof c && "function" === typeof c.get && "function" === typeof c.set) {
    var e = c.get,
        f = c.set;Object.defineProperty(a, b, { configurable: !0, get: function get() {
        return e.call(this);
      }, set: function set(a) {
        d = "" + a;f.call(this, a);
      } });Object.defineProperty(a, b, { enumerable: c.enumerable });return { getValue: function getValue() {
        return d;
      }, setValue: function setValue(a) {
        d = "" + a;
      }, stopTracking: function stopTracking() {
        a._valueTracker = null;delete a[b];
      } };
  }
}function cc(a) {
  a._valueTracker || (a._valueTracker = bc(a));
}function dc(a) {
  if (!a) return !1;var b = a._valueTracker;if (!b) return !0;var c = b.getValue();var d = "";a && (d = ac(a) ? a.checked ? "true" : "false" : a.value);a = d;return a !== c ? (b.setValue(a), !0) : !1;
}
var ec = ca.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    I = "function" === typeof Symbol && Symbol.for,
    fc = I ? Symbol.for("react.element") : 60103,
    gc = I ? Symbol.for("react.portal") : 60106,
    hc = I ? Symbol.for("react.fragment") : 60107,
    ic = I ? Symbol.for("react.strict_mode") : 60108,
    jc = I ? Symbol.for("react.profiler") : 60114,
    mc = I ? Symbol.for("react.provider") : 60109,
    nc = I ? Symbol.for("react.context") : 60110,
    oc = I ? Symbol.for("react.async_mode") : 60111,
    pc = I ? Symbol.for("react.forward_ref") : 60112,
    qc = I ? Symbol.for("react.timeout") : 60113,
    rc = "function" === typeof Symbol && Symbol.iterator;function sc(a) {
  if (null === a || "undefined" === typeof a) return null;a = rc && a[rc] || a["@@iterator"];return "function" === typeof a ? a : null;
}
function tc(a) {
  var b = a.type;if ("function" === typeof b) return b.displayName || b.name;if ("string" === typeof b) return b;switch (b) {case oc:
      return "AsyncMode";case nc:
      return "Context.Consumer";case hc:
      return "ReactFragment";case gc:
      return "ReactPortal";case jc:
      return "Profiler(" + a.pendingProps.id + ")";case mc:
      return "Context.Provider";case ic:
      return "StrictMode";case qc:
      return "Timeout";}if ("object" === (typeof b === "undefined" ? "undefined" : _typeof(b)) && null !== b) switch (b.$$typeof) {case pc:
      return a = b.render.displayName || b.render.name || "", "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef";}return null;
}function vc(a) {
  var b = "";do {
    a: switch (a.tag) {case 0:case 1:case 2:case 5:
        var c = a._debugOwner,
            d = a._debugSource;var e = tc(a);var f = null;c && (f = tc(c));c = d;e = "\n    in " + (e || "Unknown") + (c ? " (at " + c.fileName.replace(/^.*[\\\/]/, "") + ":" + c.lineNumber + ")" : f ? " (created by " + f + ")" : "");break a;default:
        e = "";}b += e;a = a.return;
  } while (a);return b;
}
var wc = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    xc = {},
    yc = {};function zc(a) {
  if (yc.hasOwnProperty(a)) return !0;if (xc.hasOwnProperty(a)) return !1;if (wc.test(a)) return yc[a] = !0;xc[a] = !0;return !1;
}
function Ac(a, b, c, d) {
  if (null !== c && 0 === c.type) return !1;switch (typeof b === "undefined" ? "undefined" : _typeof(b)) {case "function":case "symbol":
      return !0;case "boolean":
      if (d) return !1;if (null !== c) return !c.acceptsBooleans;a = a.toLowerCase().slice(0, 5);return "data-" !== a && "aria-" !== a;default:
      return !1;}
}function Bc(a, b, c, d) {
  if (null === b || "undefined" === typeof b || Ac(a, b, c, d)) return !0;if (d) return !1;if (null !== c) switch (c.type) {case 3:
      return !b;case 4:
      return !1 === b;case 5:
      return isNaN(b);case 6:
      return isNaN(b) || 1 > b;}return !1;
}
function J(a, b, c, d, e) {
  this.acceptsBooleans = 2 === b || 3 === b || 4 === b;this.attributeName = d;this.attributeNamespace = e;this.mustUseProperty = c;this.propertyName = a;this.type = b;
}var K = {};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function (a) {
  K[a] = new J(a, 0, !1, a, null);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function (a) {
  var b = a[0];K[b] = new J(b, 1, !1, a[1], null);
});["contentEditable", "draggable", "spellCheck", "value"].forEach(function (a) {
  K[a] = new J(a, 2, !1, a.toLowerCase(), null);
});["autoReverse", "externalResourcesRequired", "preserveAlpha"].forEach(function (a) {
  K[a] = new J(a, 2, !1, a, null);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function (a) {
  K[a] = new J(a, 3, !1, a.toLowerCase(), null);
});["checked", "multiple", "muted", "selected"].forEach(function (a) {
  K[a] = new J(a, 3, !0, a.toLowerCase(), null);
});["capture", "download"].forEach(function (a) {
  K[a] = new J(a, 4, !1, a.toLowerCase(), null);
});
["cols", "rows", "size", "span"].forEach(function (a) {
  K[a] = new J(a, 6, !1, a.toLowerCase(), null);
});["rowSpan", "start"].forEach(function (a) {
  K[a] = new J(a, 5, !1, a.toLowerCase(), null);
});var Cc = /[\-:]([a-z])/g;function Dc(a) {
  return a[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function (a) {
  var b = a.replace(Cc, Dc);K[b] = new J(b, 1, !1, a, null);
});"xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function (a) {
  var b = a.replace(Cc, Dc);K[b] = new J(b, 1, !1, a, "http://www.w3.org/1999/xlink");
});["xml:base", "xml:lang", "xml:space"].forEach(function (a) {
  var b = a.replace(Cc, Dc);K[b] = new J(b, 1, !1, a, "http://www.w3.org/XML/1998/namespace");
});K.tabIndex = new J("tabIndex", 1, !1, "tabindex", null);
function Ec(a, b, c, d) {
  var e = K.hasOwnProperty(b) ? K[b] : null;var f = null !== e ? 0 === e.type : d ? !1 : !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1] ? !1 : !0;f || (Bc(b, c, e, d) && (c = null), d || null === e ? zc(b) && (null === c ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = null === c ? 3 === e.type ? !1 : "" : c : (b = e.attributeName, d = e.attributeNamespace, null === c ? a.removeAttribute(b) : (e = e.type, c = 3 === e || 4 === e && !0 === c ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c))));
}
function Fc(a, b) {
  var c = b.checked;return p({}, b, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c ? c : a._wrapperState.initialChecked });
}function Gc(a, b) {
  var c = null == b.defaultValue ? "" : b.defaultValue,
      d = null != b.checked ? b.checked : b.defaultChecked;c = Hc(null != b.value ? b.value : c);a._wrapperState = { initialChecked: d, initialValue: c, controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value };
}function Ic(a, b) {
  b = b.checked;null != b && Ec(a, "checked", b, !1);
}
function Jc(a, b) {
  Ic(a, b);var c = Hc(b.value);if (null != c) if ("number" === b.type) {
    if (0 === c && "" === a.value || a.value != c) a.value = "" + c;
  } else a.value !== "" + c && (a.value = "" + c);b.hasOwnProperty("value") ? Kc(a, b.type, c) : b.hasOwnProperty("defaultValue") && Kc(a, b.type, Hc(b.defaultValue));null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
}
function Lc(a, b) {
  if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) "" === a.value && (a.value = "" + a._wrapperState.initialValue), a.defaultValue = "" + a._wrapperState.initialValue;b = a.name;"" !== b && (a.name = "");a.defaultChecked = !a.defaultChecked;a.defaultChecked = !a.defaultChecked;"" !== b && (a.name = b);
}function Kc(a, b, c) {
  if ("number" !== b || a.ownerDocument.activeElement !== a) null == c ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
}
function Hc(a) {
  switch (typeof a === "undefined" ? "undefined" : _typeof(a)) {case "boolean":case "number":case "object":case "string":case "undefined":
      return a;default:
      return "";}
}var Mc = { change: { phasedRegistrationNames: { bubbled: "onChange", captured: "onChangeCapture" }, dependencies: "blur change click focus input keydown keyup selectionchange".split(" ") } };function Nc(a, b, c) {
  a = H.getPooled(Mc.change, a, b, c);a.type = "change";Ob(c);Ya(a);return a;
}var Oc = null,
    Pc = null;function Qc(a) {
  Ia(a, !1);
}function Rc(a) {
  var b = Oa(a);if (dc(b)) return a;
}
function Sc(a, b) {
  if ("change" === a) return b;
}var Tc = !1;m.canUseDOM && (Tc = $b("input") && (!document.documentMode || 9 < document.documentMode));function Uc() {
  Oc && (Oc.detachEvent("onpropertychange", Vc), Pc = Oc = null);
}function Vc(a) {
  "value" === a.propertyName && Rc(Pc) && (a = Nc(Pc, a, Zb(a)), Wb(Qc, a));
}function Wc(a, b, c) {
  "focus" === a ? (Uc(), Oc = b, Pc = c, Oc.attachEvent("onpropertychange", Vc)) : "blur" === a && Uc();
}function Xc(a) {
  if ("selectionchange" === a || "keyup" === a || "keydown" === a) return Rc(Pc);
}
function Yc(a, b) {
  if ("click" === a) return Rc(b);
}function Zc(a, b) {
  if ("input" === a || "change" === a) return Rc(b);
}
var $c = { eventTypes: Mc, _isInputEventSupported: Tc, extractEvents: function extractEvents(a, b, c, d) {
    var e = b ? Oa(b) : window,
        f = void 0,
        g = void 0,
        h = e.nodeName && e.nodeName.toLowerCase();"select" === h || "input" === h && "file" === e.type ? f = Sc : Yb(e) ? Tc ? f = Zc : (f = Xc, g = Wc) : (h = e.nodeName) && "input" === h.toLowerCase() && ("checkbox" === e.type || "radio" === e.type) && (f = Yc);if (f && (f = f(a, b))) return Nc(f, c, d);g && g(a, e, b);"blur" === a && null != b && (a = b._wrapperState || e._wrapperState) && a.controlled && "number" === e.type && Kc(e, "number", e.value);
  } },
    ad = H.extend({ view: null,
  detail: null }),
    bd = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };function cd(a) {
  var b = this.nativeEvent;return b.getModifierState ? b.getModifierState(a) : (a = bd[a]) ? !!b[a] : !1;
}function dd() {
  return cd;
}
var ed = ad.extend({ screenX: null, screenY: null, clientX: null, clientY: null, pageX: null, pageY: null, ctrlKey: null, shiftKey: null, altKey: null, metaKey: null, getModifierState: dd, button: null, buttons: null, relatedTarget: function relatedTarget(a) {
    return a.relatedTarget || (a.fromElement === a.srcElement ? a.toElement : a.fromElement);
  } }),
    fd = ed.extend({ pointerId: null, width: null, height: null, pressure: null, tiltX: null, tiltY: null, pointerType: null, isPrimary: null }),
    gd = { mouseEnter: { registrationName: "onMouseEnter", dependencies: ["mouseout", "mouseover"] },
  mouseLeave: { registrationName: "onMouseLeave", dependencies: ["mouseout", "mouseover"] }, pointerEnter: { registrationName: "onPointerEnter", dependencies: ["pointerout", "pointerover"] }, pointerLeave: { registrationName: "onPointerLeave", dependencies: ["pointerout", "pointerover"] } },
    hd = { eventTypes: gd, extractEvents: function extractEvents(a, b, c, d) {
    var e = "mouseover" === a || "pointerover" === a,
        f = "mouseout" === a || "pointerout" === a;if (e && (c.relatedTarget || c.fromElement) || !f && !e) return null;e = d.window === d ? d : (e = d.ownerDocument) ? e.defaultView || e.parentWindow : window;f ? (f = b, b = (b = c.relatedTarget || c.toElement) ? Na(b) : null) : f = null;if (f === b) return null;var g = void 0,
        h = void 0,
        k = void 0,
        n = void 0;if ("mouseout" === a || "mouseover" === a) g = ed, h = gd.mouseLeave, k = gd.mouseEnter, n = "mouse";else if ("pointerout" === a || "pointerover" === a) g = fd, h = gd.pointerLeave, k = gd.pointerEnter, n = "pointer";a = null == f ? e : Oa(f);e = null == b ? e : Oa(b);h = g.getPooled(h, f, c, d);h.type = n + "leave";h.target = a;h.relatedTarget = e;c = g.getPooled(k, b, c, d);c.type = n + "enter";c.target = e;c.relatedTarget = a;Za(h, c, f, b);return [h, c];
  } };function id(a) {
  var b = a;if (a.alternate) for (; b.return;) {
    b = b.return;
  } else {
    if (0 !== (b.effectTag & 2)) return 1;for (; b.return;) {
      if (b = b.return, 0 !== (b.effectTag & 2)) return 1;
    }
  }return 3 === b.tag ? 2 : 3;
}function jd(a) {
  2 !== id(a) ? A("188") : void 0;
}
function kd(a) {
  var b = a.alternate;if (!b) return b = id(a), 3 === b ? A("188") : void 0, 1 === b ? null : a;for (var c = a, d = b;;) {
    var e = c.return,
        f = e ? e.alternate : null;if (!e || !f) break;if (e.child === f.child) {
      for (var g = e.child; g;) {
        if (g === c) return jd(e), a;if (g === d) return jd(e), b;g = g.sibling;
      }A("188");
    }if (c.return !== d.return) c = e, d = f;else {
      g = !1;for (var h = e.child; h;) {
        if (h === c) {
          g = !0;c = e;d = f;break;
        }if (h === d) {
          g = !0;d = e;c = f;break;
        }h = h.sibling;
      }if (!g) {
        for (h = f.child; h;) {
          if (h === c) {
            g = !0;c = f;d = e;break;
          }if (h === d) {
            g = !0;d = f;c = e;break;
          }h = h.sibling;
        }g ? void 0 : A("189");
      }
    }c.alternate !== d ? A("190") : void 0;
  }3 !== c.tag ? A("188") : void 0;return c.stateNode.current === c ? a : b;
}function ld(a) {
  a = kd(a);if (!a) return null;for (var b = a;;) {
    if (5 === b.tag || 6 === b.tag) return b;if (b.child) b.child.return = b, b = b.child;else {
      if (b === a) break;for (; !b.sibling;) {
        if (!b.return || b.return === a) return null;b = b.return;
      }b.sibling.return = b.return;b = b.sibling;
    }
  }return null;
}
function md(a) {
  a = kd(a);if (!a) return null;for (var b = a;;) {
    if (5 === b.tag || 6 === b.tag) return b;if (b.child && 4 !== b.tag) b.child.return = b, b = b.child;else {
      if (b === a) break;for (; !b.sibling;) {
        if (!b.return || b.return === a) return null;b = b.return;
      }b.sibling.return = b.return;b = b.sibling;
    }
  }return null;
}var nd = H.extend({ animationName: null, elapsedTime: null, pseudoElement: null }),
    od = H.extend({ clipboardData: function clipboardData(a) {
    return "clipboardData" in a ? a.clipboardData : window.clipboardData;
  } }),
    pd = ad.extend({ relatedTarget: null });
function qd(a) {
  var b = a.keyCode;"charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;10 === a && (a = 13);return 32 <= a || 13 === a ? a : 0;
}
var rd = { Esc: "Escape", Spacebar: " ", Left: "ArrowLeft", Up: "ArrowUp", Right: "ArrowRight", Down: "ArrowDown", Del: "Delete", Win: "OS", Menu: "ContextMenu", Apps: "ContextMenu", Scroll: "ScrollLock", MozPrintableKey: "Unidentified" },
    sd = { 8: "Backspace", 9: "Tab", 12: "Clear", 13: "Enter", 16: "Shift", 17: "Control", 18: "Alt", 19: "Pause", 20: "CapsLock", 27: "Escape", 32: " ", 33: "PageUp", 34: "PageDown", 35: "End", 36: "Home", 37: "ArrowLeft", 38: "ArrowUp", 39: "ArrowRight", 40: "ArrowDown", 45: "Insert", 46: "Delete", 112: "F1", 113: "F2", 114: "F3", 115: "F4",
  116: "F5", 117: "F6", 118: "F7", 119: "F8", 120: "F9", 121: "F10", 122: "F11", 123: "F12", 144: "NumLock", 145: "ScrollLock", 224: "Meta" },
    td = ad.extend({ key: function key(a) {
    if (a.key) {
      var b = rd[a.key] || a.key;if ("Unidentified" !== b) return b;
    }return "keypress" === a.type ? (a = qd(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? sd[a.keyCode] || "Unidentified" : "";
  }, location: null, ctrlKey: null, shiftKey: null, altKey: null, metaKey: null, repeat: null, locale: null, getModifierState: dd, charCode: function charCode(a) {
    return "keypress" === a.type ? qd(a) : 0;
  }, keyCode: function keyCode(a) {
    return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
  }, which: function which(a) {
    return "keypress" === a.type ? qd(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
  } }),
    ud = ed.extend({ dataTransfer: null }),
    vd = ad.extend({ touches: null, targetTouches: null, changedTouches: null, altKey: null, metaKey: null, ctrlKey: null, shiftKey: null, getModifierState: dd }),
    wd = H.extend({ propertyName: null, elapsedTime: null, pseudoElement: null }),
    xd = ed.extend({ deltaX: function deltaX(a) {
    return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
  }, deltaY: function deltaY(a) {
    return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
  }, deltaZ: null, deltaMode: null }),
    yd = [["abort", "abort"], [fb, "animationEnd"], [gb, "animationIteration"], [hb, "animationStart"], ["canplay", "canPlay"], ["canplaythrough", "canPlayThrough"], ["drag", "drag"], ["dragenter", "dragEnter"], ["dragexit", "dragExit"], ["dragleave", "dragLeave"], ["dragover", "dragOver"], ["durationchange", "durationChange"], ["emptied", "emptied"], ["encrypted", "encrypted"], ["ended", "ended"], ["error", "error"], ["gotpointercapture", "gotPointerCapture"], ["load", "load"], ["loadeddata", "loadedData"], ["loadedmetadata", "loadedMetadata"], ["loadstart", "loadStart"], ["lostpointercapture", "lostPointerCapture"], ["mousemove", "mouseMove"], ["mouseout", "mouseOut"], ["mouseover", "mouseOver"], ["playing", "playing"], ["pointermove", "pointerMove"], ["pointerout", "pointerOut"], ["pointerover", "pointerOver"], ["progress", "progress"], ["scroll", "scroll"], ["seeking", "seeking"], ["stalled", "stalled"], ["suspend", "suspend"], ["timeupdate", "timeUpdate"], ["toggle", "toggle"], ["touchmove", "touchMove"], [ib, "transitionEnd"], ["waiting", "waiting"], ["wheel", "wheel"]],
    zd = {},
    Ad = {};function Bd(a, b) {
  var c = a[0];a = a[1];var d = "on" + (a[0].toUpperCase() + a.slice(1));b = { phasedRegistrationNames: { bubbled: d, captured: d + "Capture" }, dependencies: [c], isInteractive: b };zd[a] = b;Ad[c] = b;
}
[["blur", "blur"], ["cancel", "cancel"], ["click", "click"], ["close", "close"], ["contextmenu", "contextMenu"], ["copy", "copy"], ["cut", "cut"], ["dblclick", "doubleClick"], ["dragend", "dragEnd"], ["dragstart", "dragStart"], ["drop", "drop"], ["focus", "focus"], ["input", "input"], ["invalid", "invalid"], ["keydown", "keyDown"], ["keypress", "keyPress"], ["keyup", "keyUp"], ["mousedown", "mouseDown"], ["mouseup", "mouseUp"], ["paste", "paste"], ["pause", "pause"], ["play", "play"], ["pointercancel", "pointerCancel"], ["pointerdown", "pointerDown"], ["pointerup", "pointerUp"], ["ratechange", "rateChange"], ["reset", "reset"], ["seeked", "seeked"], ["submit", "submit"], ["touchcancel", "touchCancel"], ["touchend", "touchEnd"], ["touchstart", "touchStart"], ["volumechange", "volumeChange"]].forEach(function (a) {
  Bd(a, !0);
});yd.forEach(function (a) {
  Bd(a, !1);
});
var Cd = { eventTypes: zd, isInteractiveTopLevelEventType: function isInteractiveTopLevelEventType(a) {
    a = Ad[a];return void 0 !== a && !0 === a.isInteractive;
  }, extractEvents: function extractEvents(a, b, c, d) {
    var e = Ad[a];if (!e) return null;switch (a) {case "keypress":
        if (0 === qd(c)) return null;case "keydown":case "keyup":
        a = td;break;case "blur":case "focus":
        a = pd;break;case "click":
        if (2 === c.button) return null;case "dblclick":case "mousedown":case "mousemove":case "mouseup":case "mouseout":case "mouseover":case "contextmenu":
        a = ed;break;case "drag":case "dragend":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "dragstart":case "drop":
        a = ud;break;case "touchcancel":case "touchend":case "touchmove":case "touchstart":
        a = vd;break;case fb:case gb:case hb:
        a = nd;break;case ib:
        a = wd;break;case "scroll":
        a = ad;break;case "wheel":
        a = xd;break;case "copy":case "cut":case "paste":
        a = od;break;case "gotpointercapture":case "lostpointercapture":case "pointercancel":case "pointerdown":case "pointermove":case "pointerout":case "pointerover":case "pointerup":
        a = fd;break;default:
        a = H;}b = a.getPooled(e, b, c, d);Ya(b);return b;
  } },
    Dd = Cd.isInteractiveTopLevelEventType,
    Ed = [];function Fd(a) {
  var b = a.targetInst;do {
    if (!b) {
      a.ancestors.push(b);break;
    }var c;for (c = b; c.return;) {
      c = c.return;
    }c = 3 !== c.tag ? null : c.stateNode.containerInfo;if (!c) break;a.ancestors.push(b);b = Na(c);
  } while (b);for (c = 0; c < a.ancestors.length; c++) {
    b = a.ancestors[c], Ja(a.topLevelType, b, a.nativeEvent, Zb(a.nativeEvent));
  }
}var Gd = !0;function Id(a) {
  Gd = !!a;
}function L(a, b) {
  if (!b) return null;var c = (Dd(a) ? Jd : Kd).bind(null, a);b.addEventListener(a, c, !1);
}
function Ld(a, b) {
  if (!b) return null;var c = (Dd(a) ? Jd : Kd).bind(null, a);b.addEventListener(a, c, !0);
}function Jd(a, b) {
  Tb(Kd, a, b);
}function Kd(a, b) {
  if (Gd) {
    var c = Zb(b);c = Na(c);null === c || "number" !== typeof c.tag || 2 === id(c) || (c = null);if (Ed.length) {
      var d = Ed.pop();d.topLevelType = a;d.nativeEvent = b;d.targetInst = c;a = d;
    } else a = { topLevelType: a, nativeEvent: b, targetInst: c, ancestors: [] };try {
      Wb(Fd, a);
    } finally {
      a.topLevelType = null, a.nativeEvent = null, a.targetInst = null, a.ancestors.length = 0, 10 > Ed.length && Ed.push(a);
    }
  }
}
var Md = { get _enabled() {
    return Gd;
  }, setEnabled: Id, isEnabled: function isEnabled() {
    return Gd;
  }, trapBubbledEvent: L, trapCapturedEvent: Ld, dispatchEvent: Kd },
    Nd = {},
    Od = 0,
    Pd = "_reactListenersID" + ("" + Math.random()).slice(2);function Qd(a) {
  Object.prototype.hasOwnProperty.call(a, Pd) || (a[Pd] = Od++, Nd[a[Pd]] = {});return Nd[a[Pd]];
}function Rd(a) {
  for (; a && a.firstChild;) {
    a = a.firstChild;
  }return a;
}
function Sd(a, b) {
  var c = Rd(a);a = 0;for (var d; c;) {
    if (3 === c.nodeType) {
      d = a + c.textContent.length;if (a <= b && d >= b) return { node: c, offset: b - a };a = d;
    }a: {
      for (; c;) {
        if (c.nextSibling) {
          c = c.nextSibling;break a;
        }c = c.parentNode;
      }c = void 0;
    }c = Rd(c);
  }
}function Td(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();return b && ("input" === b && "text" === a.type || "textarea" === b || "true" === a.contentEditable);
}
var Ud = m.canUseDOM && "documentMode" in document && 11 >= document.documentMode,
    Vd = { select: { phasedRegistrationNames: { bubbled: "onSelect", captured: "onSelectCapture" }, dependencies: "blur contextmenu focus keydown keyup mousedown mouseup selectionchange".split(" ") } },
    Wd = null,
    Xd = null,
    Yd = null,
    Zd = !1;
function $d(a, b) {
  if (Zd || null == Wd || Wd !== da()) return null;var c = Wd;"selectionStart" in c && Td(c) ? c = { start: c.selectionStart, end: c.selectionEnd } : window.getSelection ? (c = window.getSelection(), c = { anchorNode: c.anchorNode, anchorOffset: c.anchorOffset, focusNode: c.focusNode, focusOffset: c.focusOffset }) : c = void 0;return Yd && ea(Yd, c) ? null : (Yd = c, a = H.getPooled(Vd.select, Xd, a, b), a.type = "select", a.target = Wd, Ya(a), a);
}
var ae = { eventTypes: Vd, extractEvents: function extractEvents(a, b, c, d) {
    var e = d.window === d ? d.document : 9 === d.nodeType ? d : d.ownerDocument,
        f;if (!(f = !e)) {
      a: {
        e = Qd(e);f = sa.onSelect;for (var g = 0; g < f.length; g++) {
          var h = f[g];if (!e.hasOwnProperty(h) || !e[h]) {
            e = !1;break a;
          }
        }e = !0;
      }f = !e;
    }if (f) return null;e = b ? Oa(b) : window;switch (a) {case "focus":
        if (Yb(e) || "true" === e.contentEditable) Wd = e, Xd = b, Yd = null;break;case "blur":
        Yd = Xd = Wd = null;break;case "mousedown":
        Zd = !0;break;case "contextmenu":case "mouseup":
        return Zd = !1, $d(c, d);case "selectionchange":
        if (Ud) break;
      case "keydown":case "keyup":
        return $d(c, d);}return null;
  } };Ga.injectEventPluginOrder("ResponderEventPlugin SimpleEventPlugin TapEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(" "));wa = Qa.getFiberCurrentPropsFromNode;xa = Qa.getInstanceFromNode;ya = Qa.getNodeFromInstance;Ga.injectEventPluginsByName({ SimpleEventPlugin: Cd, EnterLeaveEventPlugin: hd, ChangeEventPlugin: $c, SelectEventPlugin: ae, BeforeInputEventPlugin: Ib });var be = void 0;
be = "object" === (typeof performance === "undefined" ? "undefined" : _typeof(performance)) && "function" === typeof performance.now ? function () {
  return performance.now();
} : function () {
  return Date.now();
};var ce = void 0,
    de = void 0;
if (m.canUseDOM) {
  var ee = [],
      fe = 0,
      ge = {},
      he = -1,
      ie = !1,
      je = !1,
      ke = 0,
      le = 33,
      me = 33,
      ne = { didTimeout: !1, timeRemaining: function timeRemaining() {
      var a = ke - be();return 0 < a ? a : 0;
    } },
      oe = function oe(a, b) {
    if (ge[b]) try {
      a(ne);
    } finally {
      delete ge[b];
    }
  },
      pe = "__reactIdleCallback$" + Math.random().toString(36).slice(2);window.addEventListener("message", function (a) {
    if (a.source === window && a.data === pe && (ie = !1, 0 !== ee.length)) {
      if (0 !== ee.length && (a = be(), !(-1 === he || he > a))) {
        he = -1;ne.didTimeout = !0;for (var b = 0, c = ee.length; b < c; b++) {
          var d = ee[b],
              e = d.timeoutTime;-1 !== e && e <= a ? oe(d.scheduledCallback, d.callbackId) : -1 !== e && (-1 === he || e < he) && (he = e);
        }
      }for (a = be(); 0 < ke - a && 0 < ee.length;) {
        a = ee.shift(), ne.didTimeout = !1, oe(a.scheduledCallback, a.callbackId), a = be();
      }0 < ee.length && !je && (je = !0, requestAnimationFrame(qe));
    }
  }, !1);var qe = function qe(a) {
    je = !1;var b = a - ke + me;b < me && le < me ? (8 > b && (b = 8), me = b < le ? le : b) : le = b;ke = a + me;ie || (ie = !0, window.postMessage(pe, "*"));
  };ce = function ce(a, b) {
    var c = -1;null != b && "number" === typeof b.timeout && (c = be() + b.timeout);if (-1 === he || -1 !== c && c < he) he = c;fe++;b = fe;ee.push({ scheduledCallback: a,
      callbackId: b, timeoutTime: c });ge[b] = !0;je || (je = !0, requestAnimationFrame(qe));return b;
  };de = function de(a) {
    delete ge[a];
  };
} else {
  var re = 0,
      se = {};ce = function ce(a) {
    var b = re++,
        c = setTimeout(function () {
      a({ timeRemaining: function timeRemaining() {
          return Infinity;
        }, didTimeout: !1 });
    });se[b] = c;return b;
  };de = function de(a) {
    var b = se[a];delete se[a];clearTimeout(b);
  };
}function te(a) {
  var b = "";ca.Children.forEach(a, function (a) {
    null == a || "string" !== typeof a && "number" !== typeof a || (b += a);
  });return b;
}
function ue(a, b) {
  a = p({ children: void 0 }, b);if (b = te(b.children)) a.children = b;return a;
}function ve(a, b, c, d) {
  a = a.options;if (b) {
    b = {};for (var e = 0; e < c.length; e++) {
      b["$" + c[e]] = !0;
    }for (c = 0; c < a.length; c++) {
      e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = !0);
    }
  } else {
    c = "" + c;b = null;for (e = 0; e < a.length; e++) {
      if (a[e].value === c) {
        a[e].selected = !0;d && (a[e].defaultSelected = !0);return;
      }null !== b || a[e].disabled || (b = a[e]);
    }null !== b && (b.selected = !0);
  }
}
function we(a, b) {
  var c = b.value;a._wrapperState = { initialValue: null != c ? c : b.defaultValue, wasMultiple: !!b.multiple };
}function xe(a, b) {
  null != b.dangerouslySetInnerHTML ? A("91") : void 0;return p({}, b, { value: void 0, defaultValue: void 0, children: "" + a._wrapperState.initialValue });
}function ye(a, b) {
  var c = b.value;null == c && (c = b.defaultValue, b = b.children, null != b && (null != c ? A("92") : void 0, Array.isArray(b) && (1 >= b.length ? void 0 : A("93"), b = b[0]), c = "" + b), null == c && (c = ""));a._wrapperState = { initialValue: "" + c };
}
function ze(a, b) {
  var c = b.value;null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && (a.defaultValue = c));null != b.defaultValue && (a.defaultValue = b.defaultValue);
}function Ae(a) {
  var b = a.textContent;b === a._wrapperState.initialValue && (a.value = b);
}var Be = { html: "http://www.w3.org/1999/xhtml", mathml: "http://www.w3.org/1998/Math/MathML", svg: "http://www.w3.org/2000/svg" };
function Ce(a) {
  switch (a) {case "svg":
      return "http://www.w3.org/2000/svg";case "math":
      return "http://www.w3.org/1998/Math/MathML";default:
      return "http://www.w3.org/1999/xhtml";}
}function De(a, b) {
  return null == a || "http://www.w3.org/1999/xhtml" === a ? Ce(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
}
var Ee = void 0,
    Fe = function (a) {
  return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function (b, c, d, e) {
    MSApp.execUnsafeLocalFunction(function () {
      return a(b, c, d, e);
    });
  } : a;
}(function (a, b) {
  if (a.namespaceURI !== Be.svg || "innerHTML" in a) a.innerHTML = b;else {
    Ee = Ee || document.createElement("div");Ee.innerHTML = "<svg>" + b + "</svg>";for (b = Ee.firstChild; a.firstChild;) {
      a.removeChild(a.firstChild);
    }for (; b.firstChild;) {
      a.appendChild(b.firstChild);
    }
  }
});
function Ge(a, b) {
  if (b) {
    var c = a.firstChild;if (c && c === a.lastChild && 3 === c.nodeType) {
      c.nodeValue = b;return;
    }
  }a.textContent = b;
}
var He = { animationIterationCount: !0, borderImageOutset: !0, borderImageSlice: !0, borderImageWidth: !0, boxFlex: !0, boxFlexGroup: !0, boxOrdinalGroup: !0, columnCount: !0, columns: !0, flex: !0, flexGrow: !0, flexPositive: !0, flexShrink: !0, flexNegative: !0, flexOrder: !0, gridRow: !0, gridRowEnd: !0, gridRowSpan: !0, gridRowStart: !0, gridColumn: !0, gridColumnEnd: !0, gridColumnSpan: !0, gridColumnStart: !0, fontWeight: !0, lineClamp: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, tabSize: !0, widows: !0, zIndex: !0, zoom: !0, fillOpacity: !0, floodOpacity: !0,
  stopOpacity: !0, strokeDasharray: !0, strokeDashoffset: !0, strokeMiterlimit: !0, strokeOpacity: !0, strokeWidth: !0 },
    Ie = ["Webkit", "ms", "Moz", "O"];Object.keys(He).forEach(function (a) {
  Ie.forEach(function (b) {
    b = b + a.charAt(0).toUpperCase() + a.substring(1);He[b] = He[a];
  });
});
function Je(a, b) {
  a = a.style;for (var c in b) {
    if (b.hasOwnProperty(c)) {
      var d = 0 === c.indexOf("--");var e = c;var f = b[c];e = null == f || "boolean" === typeof f || "" === f ? "" : d || "number" !== typeof f || 0 === f || He.hasOwnProperty(e) && He[e] ? ("" + f).trim() : f + "px";"float" === c && (c = "cssFloat");d ? a.setProperty(c, e) : a[c] = e;
    }
  }
}var Ke = p({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function Le(a, b, c) {
  b && (Ke[a] && (null != b.children || null != b.dangerouslySetInnerHTML ? A("137", a, c()) : void 0), null != b.dangerouslySetInnerHTML && (null != b.children ? A("60") : void 0, "object" === _typeof(b.dangerouslySetInnerHTML) && "__html" in b.dangerouslySetInnerHTML ? void 0 : A("61")), null != b.style && "object" !== _typeof(b.style) ? A("62", c()) : void 0);
}
function Me(a, b) {
  if (-1 === a.indexOf("-")) return "string" === typeof b.is;switch (a) {case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":
      return !1;default:
      return !0;}
}var Ne = v.thatReturns("");
function Oe(a, b) {
  a = 9 === a.nodeType || 11 === a.nodeType ? a : a.ownerDocument;var c = Qd(a);b = sa[b];for (var d = 0; d < b.length; d++) {
    var e = b[d];if (!c.hasOwnProperty(e) || !c[e]) {
      switch (e) {case "scroll":
          Ld("scroll", a);break;case "focus":case "blur":
          Ld("focus", a);Ld("blur", a);c.blur = !0;c.focus = !0;break;case "cancel":case "close":
          $b(e, !0) && Ld(e, a);break;case "invalid":case "submit":case "reset":
          break;default:
          -1 === jb.indexOf(e) && L(e, a);}c[e] = !0;
    }
  }
}
function Pe(a, b, c, d) {
  c = 9 === c.nodeType ? c : c.ownerDocument;d === Be.html && (d = Ce(a));d === Be.html ? "script" === a ? (a = c.createElement("div"), a.innerHTML = "<script>\x3c/script>", a = a.removeChild(a.firstChild)) : a = "string" === typeof b.is ? c.createElement(a, { is: b.is }) : c.createElement(a) : a = c.createElementNS(d, a);return a;
}function Qe(a, b) {
  return (9 === b.nodeType ? b : b.ownerDocument).createTextNode(a);
}
function Re(a, b, c, d) {
  var e = Me(b, c);switch (b) {case "iframe":case "object":
      L("load", a);var f = c;break;case "video":case "audio":
      for (f = 0; f < jb.length; f++) {
        L(jb[f], a);
      }f = c;break;case "source":
      L("error", a);f = c;break;case "img":case "image":case "link":
      L("error", a);L("load", a);f = c;break;case "form":
      L("reset", a);L("submit", a);f = c;break;case "details":
      L("toggle", a);f = c;break;case "input":
      Gc(a, c);f = Fc(a, c);L("invalid", a);Oe(d, "onChange");break;case "option":
      f = ue(a, c);break;case "select":
      we(a, c);f = p({}, c, { value: void 0 });
      L("invalid", a);Oe(d, "onChange");break;case "textarea":
      ye(a, c);f = xe(a, c);L("invalid", a);Oe(d, "onChange");break;default:
      f = c;}Le(b, f, Ne);var g = f,
      h;for (h in g) {
    if (g.hasOwnProperty(h)) {
      var k = g[h];"style" === h ? Je(a, k, Ne) : "dangerouslySetInnerHTML" === h ? (k = k ? k.__html : void 0, null != k && Fe(a, k)) : "children" === h ? "string" === typeof k ? ("textarea" !== b || "" !== k) && Ge(a, k) : "number" === typeof k && Ge(a, "" + k) : "suppressContentEditableWarning" !== h && "suppressHydrationWarning" !== h && "autoFocus" !== h && (ra.hasOwnProperty(h) ? null != k && Oe(d, h) : null != k && Ec(a, h, k, e));
    }
  }switch (b) {case "input":
      cc(a);Lc(a, c);break;case "textarea":
      cc(a);Ae(a, c);break;case "option":
      null != c.value && a.setAttribute("value", c.value);break;case "select":
      a.multiple = !!c.multiple;b = c.value;null != b ? ve(a, !!c.multiple, b, !1) : null != c.defaultValue && ve(a, !!c.multiple, c.defaultValue, !0);break;default:
      "function" === typeof f.onClick && (a.onclick = v);}
}
function Se(a, b, c, d, e) {
  var f = null;switch (b) {case "input":
      c = Fc(a, c);d = Fc(a, d);f = [];break;case "option":
      c = ue(a, c);d = ue(a, d);f = [];break;case "select":
      c = p({}, c, { value: void 0 });d = p({}, d, { value: void 0 });f = [];break;case "textarea":
      c = xe(a, c);d = xe(a, d);f = [];break;default:
      "function" !== typeof c.onClick && "function" === typeof d.onClick && (a.onclick = v);}Le(b, d, Ne);b = a = void 0;var g = null;for (a in c) {
    if (!d.hasOwnProperty(a) && c.hasOwnProperty(a) && null != c[a]) if ("style" === a) {
      var h = c[a];for (b in h) {
        h.hasOwnProperty(b) && (g || (g = {}), g[b] = "");
      }
    } else "dangerouslySetInnerHTML" !== a && "children" !== a && "suppressContentEditableWarning" !== a && "suppressHydrationWarning" !== a && "autoFocus" !== a && (ra.hasOwnProperty(a) ? f || (f = []) : (f = f || []).push(a, null));
  }for (a in d) {
    var k = d[a];h = null != c ? c[a] : void 0;if (d.hasOwnProperty(a) && k !== h && (null != k || null != h)) if ("style" === a) {
      if (h) {
        for (b in h) {
          !h.hasOwnProperty(b) || k && k.hasOwnProperty(b) || (g || (g = {}), g[b] = "");
        }for (b in k) {
          k.hasOwnProperty(b) && h[b] !== k[b] && (g || (g = {}), g[b] = k[b]);
        }
      } else g || (f || (f = []), f.push(a, g)), g = k;
    } else "dangerouslySetInnerHTML" === a ? (k = k ? k.__html : void 0, h = h ? h.__html : void 0, null != k && h !== k && (f = f || []).push(a, "" + k)) : "children" === a ? h === k || "string" !== typeof k && "number" !== typeof k || (f = f || []).push(a, "" + k) : "suppressContentEditableWarning" !== a && "suppressHydrationWarning" !== a && (ra.hasOwnProperty(a) ? (null != k && Oe(e, a), f || h === k || (f = [])) : (f = f || []).push(a, k));
  }g && (f = f || []).push("style", g);return f;
}
function Te(a, b, c, d, e) {
  "input" === c && "radio" === e.type && null != e.name && Ic(a, e);Me(c, d);d = Me(c, e);for (var f = 0; f < b.length; f += 2) {
    var g = b[f],
        h = b[f + 1];"style" === g ? Je(a, h, Ne) : "dangerouslySetInnerHTML" === g ? Fe(a, h) : "children" === g ? Ge(a, h) : Ec(a, g, h, d);
  }switch (c) {case "input":
      Jc(a, e);break;case "textarea":
      ze(a, e);break;case "select":
      a._wrapperState.initialValue = void 0, b = a._wrapperState.wasMultiple, a._wrapperState.wasMultiple = !!e.multiple, c = e.value, null != c ? ve(a, !!e.multiple, c, !1) : b !== !!e.multiple && (null != e.defaultValue ? ve(a, !!e.multiple, e.defaultValue, !0) : ve(a, !!e.multiple, e.multiple ? [] : "", !1));}
}
function Ue(a, b, c, d, e) {
  switch (b) {case "iframe":case "object":
      L("load", a);break;case "video":case "audio":
      for (d = 0; d < jb.length; d++) {
        L(jb[d], a);
      }break;case "source":
      L("error", a);break;case "img":case "image":case "link":
      L("error", a);L("load", a);break;case "form":
      L("reset", a);L("submit", a);break;case "details":
      L("toggle", a);break;case "input":
      Gc(a, c);L("invalid", a);Oe(e, "onChange");break;case "select":
      we(a, c);L("invalid", a);Oe(e, "onChange");break;case "textarea":
      ye(a, c), L("invalid", a), Oe(e, "onChange");}Le(b, c, Ne);d = null;for (var f in c) {
    if (c.hasOwnProperty(f)) {
      var g = c[f];"children" === f ? "string" === typeof g ? a.textContent !== g && (d = ["children", g]) : "number" === typeof g && a.textContent !== "" + g && (d = ["children", "" + g]) : ra.hasOwnProperty(f) && null != g && Oe(e, f);
    }
  }switch (b) {case "input":
      cc(a);Lc(a, c);break;case "textarea":
      cc(a);Ae(a, c);break;case "select":case "option":
      break;default:
      "function" === typeof c.onClick && (a.onclick = v);}return d;
}function Ve(a, b) {
  return a.nodeValue !== b;
}
var We = { createElement: Pe, createTextNode: Qe, setInitialProperties: Re, diffProperties: Se, updateProperties: Te, diffHydratedProperties: Ue, diffHydratedText: Ve, warnForUnmatchedText: function warnForUnmatchedText() {}, warnForDeletedHydratableElement: function warnForDeletedHydratableElement() {}, warnForDeletedHydratableText: function warnForDeletedHydratableText() {}, warnForInsertedHydratedElement: function warnForInsertedHydratedElement() {}, warnForInsertedHydratedText: function warnForInsertedHydratedText() {}, restoreControlledState: function restoreControlledState(a, b, c) {
    switch (b) {case "input":
        Jc(a, c);b = c.name;if ("radio" === c.type && null != b) {
          for (c = a; c.parentNode;) {
            c = c.parentNode;
          }c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');for (b = 0; b < c.length; b++) {
            var d = c[b];if (d !== a && d.form === a.form) {
              var e = Pa(d);e ? void 0 : A("90");dc(d);Jc(d, e);
            }
          }
        }break;case "textarea":
        ze(a, c);break;case "select":
        b = c.value, null != b && ve(a, !!c.multiple, b, !1);}
  } },
    Xe = null,
    Ye = null;function Ze(a, b) {
  switch (a) {case "button":case "input":case "select":case "textarea":
      return !!b.autoFocus;}return !1;
}
function $e(a, b) {
  return "textarea" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === _typeof(b.dangerouslySetInnerHTML) && null !== b.dangerouslySetInnerHTML && "string" === typeof b.dangerouslySetInnerHTML.__html;
}var af = be,
    bf = ce,
    cf = de;function df(a) {
  for (a = a.nextSibling; a && 1 !== a.nodeType && 3 !== a.nodeType;) {
    a = a.nextSibling;
  }return a;
}function ef(a) {
  for (a = a.firstChild; a && 1 !== a.nodeType && 3 !== a.nodeType;) {
    a = a.nextSibling;
  }return a;
}new Set();var ff = [],
    gf = -1;function hf(a) {
  return { current: a };
}
function M(a) {
  0 > gf || (a.current = ff[gf], ff[gf] = null, gf--);
}function N(a, b) {
  gf++;ff[gf] = a.current;a.current = b;
}var jf = hf(ha),
    O = hf(!1),
    kf = ha;function lf(a) {
  return mf(a) ? kf : jf.current;
}
function nf(a, b) {
  var c = a.type.contextTypes;if (!c) return ha;var d = a.stateNode;if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;var e = {},
      f;for (f in c) {
    e[f] = b[f];
  }d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);return e;
}function mf(a) {
  return 2 === a.tag && null != a.type.childContextTypes;
}function of(a) {
  mf(a) && (M(O, a), M(jf, a));
}function pf(a) {
  M(O, a);M(jf, a);
}
function qf(a, b, c) {
  jf.current !== ha ? A("168") : void 0;N(jf, b, a);N(O, c, a);
}function rf(a, b) {
  var c = a.stateNode,
      d = a.type.childContextTypes;if ("function" !== typeof c.getChildContext) return b;c = c.getChildContext();for (var e in c) {
    e in d ? void 0 : A("108", tc(a) || "Unknown", e);
  }return p({}, b, c);
}function sf(a) {
  if (!mf(a)) return !1;var b = a.stateNode;b = b && b.__reactInternalMemoizedMergedChildContext || ha;kf = jf.current;N(jf, b, a);N(O, O.current, a);return !0;
}
function tf(a, b) {
  var c = a.stateNode;c ? void 0 : A("169");if (b) {
    var d = rf(a, kf);c.__reactInternalMemoizedMergedChildContext = d;M(O, a);M(jf, a);N(jf, d, a);
  } else M(O, a);N(O, b, a);
}
function uf(a, b, c, d) {
  this.tag = a;this.key = c;this.sibling = this.child = this.return = this.stateNode = this.type = null;this.index = 0;this.ref = null;this.pendingProps = b;this.memoizedState = this.updateQueue = this.memoizedProps = null;this.mode = d;this.effectTag = 0;this.lastEffect = this.firstEffect = this.nextEffect = null;this.expirationTime = 0;this.alternate = null;
}
function vf(a, b, c) {
  var d = a.alternate;null === d ? (d = new uf(a.tag, b, a.key, a.mode), d.type = a.type, d.stateNode = a.stateNode, d.alternate = a, a.alternate = d) : (d.pendingProps = b, d.effectTag = 0, d.nextEffect = null, d.firstEffect = null, d.lastEffect = null);d.expirationTime = c;d.child = a.child;d.memoizedProps = a.memoizedProps;d.memoizedState = a.memoizedState;d.updateQueue = a.updateQueue;d.sibling = a.sibling;d.index = a.index;d.ref = a.ref;return d;
}
function wf(a, b, c) {
  var d = a.type,
      e = a.key;a = a.props;if ("function" === typeof d) var f = d.prototype && d.prototype.isReactComponent ? 2 : 0;else if ("string" === typeof d) f = 5;else switch (d) {case hc:
      return xf(a.children, b, c, e);case oc:
      f = 11;b |= 3;break;case ic:
      f = 11;b |= 2;break;case jc:
      return d = new uf(15, a, e, b | 4), d.type = jc, d.expirationTime = c, d;case qc:
      f = 16;b |= 2;break;default:
      a: {
        switch ("object" === (typeof d === "undefined" ? "undefined" : _typeof(d)) && null !== d ? d.$$typeof : null) {case mc:
            f = 13;break a;case nc:
            f = 12;break a;case pc:
            f = 14;break a;default:
            A("130", null == d ? d : typeof d === "undefined" ? "undefined" : _typeof(d), "");}f = void 0;
      }}b = new uf(f, a, e, b);b.type = d;b.expirationTime = c;return b;
}function xf(a, b, c, d) {
  a = new uf(10, a, d, b);a.expirationTime = c;return a;
}function yf(a, b, c) {
  a = new uf(6, a, null, b);a.expirationTime = c;return a;
}function zf(a, b, c) {
  b = new uf(4, null !== a.children ? a.children : [], a.key, b);b.expirationTime = c;b.stateNode = { containerInfo: a.containerInfo, pendingChildren: null, implementation: a.implementation };return b;
}
function Af(a, b, c) {
  b = new uf(3, null, null, b ? 3 : 0);a = { current: b, containerInfo: a, pendingChildren: null, earliestPendingTime: 0, latestPendingTime: 0, earliestSuspendedTime: 0, latestSuspendedTime: 0, latestPingedTime: 0, pendingCommitExpirationTime: 0, finishedWork: null, context: null, pendingContext: null, hydrate: c, remainingExpirationTime: 0, firstBatch: null, nextScheduledRoot: null };return b.stateNode = a;
}var Bf = null,
    Cf = null;function Df(a) {
  return function (b) {
    try {
      return a(b);
    } catch (c) {}
  };
}
function Ef(a) {
  if ("undefined" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) return !1;var b = __REACT_DEVTOOLS_GLOBAL_HOOK__;if (b.isDisabled || !b.supportsFiber) return !0;try {
    var c = b.inject(a);Bf = Df(function (a) {
      return b.onCommitFiberRoot(c, a);
    });Cf = Df(function (a) {
      return b.onCommitFiberUnmount(c, a);
    });
  } catch (d) {}return !0;
}function Ff(a) {
  "function" === typeof Bf && Bf(a);
}function Gf(a) {
  "function" === typeof Cf && Cf(a);
}var Hf = !1;
function If(a) {
  return { expirationTime: 0, baseState: a, firstUpdate: null, lastUpdate: null, firstCapturedUpdate: null, lastCapturedUpdate: null, firstEffect: null, lastEffect: null, firstCapturedEffect: null, lastCapturedEffect: null };
}function Jf(a) {
  return { expirationTime: a.expirationTime, baseState: a.baseState, firstUpdate: a.firstUpdate, lastUpdate: a.lastUpdate, firstCapturedUpdate: null, lastCapturedUpdate: null, firstEffect: null, lastEffect: null, firstCapturedEffect: null, lastCapturedEffect: null };
}
function Kf(a) {
  return { expirationTime: a, tag: 0, payload: null, callback: null, next: null, nextEffect: null };
}function Lf(a, b, c) {
  null === a.lastUpdate ? a.firstUpdate = a.lastUpdate = b : (a.lastUpdate.next = b, a.lastUpdate = b);if (0 === a.expirationTime || a.expirationTime > c) a.expirationTime = c;
}
function Mf(a, b, c) {
  var d = a.alternate;if (null === d) {
    var e = a.updateQueue;var f = null;null === e && (e = a.updateQueue = If(a.memoizedState));
  } else e = a.updateQueue, f = d.updateQueue, null === e ? null === f ? (e = a.updateQueue = If(a.memoizedState), f = d.updateQueue = If(d.memoizedState)) : e = a.updateQueue = Jf(f) : null === f && (f = d.updateQueue = Jf(e));null === f || e === f ? Lf(e, b, c) : null === e.lastUpdate || null === f.lastUpdate ? (Lf(e, b, c), Lf(f, b, c)) : (Lf(e, b, c), f.lastUpdate = b);
}
function Nf(a, b, c) {
  var d = a.updateQueue;d = null === d ? a.updateQueue = If(a.memoizedState) : Of(a, d);null === d.lastCapturedUpdate ? d.firstCapturedUpdate = d.lastCapturedUpdate = b : (d.lastCapturedUpdate.next = b, d.lastCapturedUpdate = b);if (0 === d.expirationTime || d.expirationTime > c) d.expirationTime = c;
}function Of(a, b) {
  var c = a.alternate;null !== c && b === c.updateQueue && (b = a.updateQueue = Jf(b));return b;
}
function Pf(a, b, c, d, e, f) {
  switch (c.tag) {case 1:
      return a = c.payload, "function" === typeof a ? a.call(f, d, e) : a;case 3:
      a.effectTag = a.effectTag & -1025 | 64;case 0:
      a = c.payload;e = "function" === typeof a ? a.call(f, d, e) : a;if (null === e || void 0 === e) break;return p({}, d, e);case 2:
      Hf = !0;}return d;
}
function Qf(a, b, c, d, e) {
  Hf = !1;if (!(0 === b.expirationTime || b.expirationTime > e)) {
    b = Of(a, b);for (var f = b.baseState, g = null, h = 0, k = b.firstUpdate, n = f; null !== k;) {
      var r = k.expirationTime;if (r > e) {
        if (null === g && (g = k, f = n), 0 === h || h > r) h = r;
      } else n = Pf(a, b, k, n, c, d), null !== k.callback && (a.effectTag |= 32, k.nextEffect = null, null === b.lastEffect ? b.firstEffect = b.lastEffect = k : (b.lastEffect.nextEffect = k, b.lastEffect = k));k = k.next;
    }r = null;for (k = b.firstCapturedUpdate; null !== k;) {
      var w = k.expirationTime;if (w > e) {
        if (null === r && (r = k, null === g && (f = n)), 0 === h || h > w) h = w;
      } else n = Pf(a, b, k, n, c, d), null !== k.callback && (a.effectTag |= 32, k.nextEffect = null, null === b.lastCapturedEffect ? b.firstCapturedEffect = b.lastCapturedEffect = k : (b.lastCapturedEffect.nextEffect = k, b.lastCapturedEffect = k));k = k.next;
    }null === g && (b.lastUpdate = null);null === r ? b.lastCapturedUpdate = null : a.effectTag |= 32;null === g && null === r && (f = n);b.baseState = f;b.firstUpdate = g;b.firstCapturedUpdate = r;b.expirationTime = h;a.memoizedState = n;
  }
}
function Rf(a, b) {
  "function" !== typeof a ? A("191", a) : void 0;a.call(b);
}
function Sf(a, b, c) {
  null !== b.firstCapturedUpdate && (null !== b.lastUpdate && (b.lastUpdate.next = b.firstCapturedUpdate, b.lastUpdate = b.lastCapturedUpdate), b.firstCapturedUpdate = b.lastCapturedUpdate = null);a = b.firstEffect;for (b.firstEffect = b.lastEffect = null; null !== a;) {
    var d = a.callback;null !== d && (a.callback = null, Rf(d, c));a = a.nextEffect;
  }a = b.firstCapturedEffect;for (b.firstCapturedEffect = b.lastCapturedEffect = null; null !== a;) {
    b = a.callback, null !== b && (a.callback = null, Rf(b, c)), a = a.nextEffect;
  }
}
function Tf(a, b) {
  return { value: a, source: b, stack: vc(b) };
}var Uf = hf(null),
    Vf = hf(null),
    Wf = hf(0);function Xf(a) {
  var b = a.type._context;N(Wf, b._changedBits, a);N(Vf, b._currentValue, a);N(Uf, a, a);b._currentValue = a.pendingProps.value;b._changedBits = a.stateNode;
}function Yf(a) {
  var b = Wf.current,
      c = Vf.current;M(Uf, a);M(Vf, a);M(Wf, a);a = a.type._context;a._currentValue = c;a._changedBits = b;
}var Zf = {},
    $f = hf(Zf),
    ag = hf(Zf),
    bg = hf(Zf);function cg(a) {
  a === Zf ? A("174") : void 0;return a;
}
function dg(a, b) {
  N(bg, b, a);N(ag, a, a);N($f, Zf, a);var c = b.nodeType;switch (c) {case 9:case 11:
      b = (b = b.documentElement) ? b.namespaceURI : De(null, "");break;default:
      c = 8 === c ? b.parentNode : b, b = c.namespaceURI || null, c = c.tagName, b = De(b, c);}M($f, a);N($f, b, a);
}function eg(a) {
  M($f, a);M(ag, a);M(bg, a);
}function fg(a) {
  ag.current === a && (M($f, a), M(ag, a));
}function hg(a, b, c) {
  var d = a.memoizedState;b = b(c, d);d = null === b || void 0 === b ? d : p({}, d, b);a.memoizedState = d;a = a.updateQueue;null !== a && 0 === a.expirationTime && (a.baseState = d);
}
var lg = { isMounted: function isMounted(a) {
    return (a = a._reactInternalFiber) ? 2 === id(a) : !1;
  }, enqueueSetState: function enqueueSetState(a, b, c) {
    a = a._reactInternalFiber;var d = ig();d = jg(d, a);var e = Kf(d);e.payload = b;void 0 !== c && null !== c && (e.callback = c);Mf(a, e, d);kg(a, d);
  }, enqueueReplaceState: function enqueueReplaceState(a, b, c) {
    a = a._reactInternalFiber;var d = ig();d = jg(d, a);var e = Kf(d);e.tag = 1;e.payload = b;void 0 !== c && null !== c && (e.callback = c);Mf(a, e, d);kg(a, d);
  }, enqueueForceUpdate: function enqueueForceUpdate(a, b) {
    a = a._reactInternalFiber;var c = ig();c = jg(c, a);var d = Kf(c);d.tag = 2;void 0 !== b && null !== b && (d.callback = b);Mf(a, d, c);kg(a, c);
  } };function mg(a, b, c, d, e, f) {
  var g = a.stateNode;a = a.type;return "function" === typeof g.shouldComponentUpdate ? g.shouldComponentUpdate(c, e, f) : a.prototype && a.prototype.isPureReactComponent ? !ea(b, c) || !ea(d, e) : !0;
}
function ng(a, b, c, d) {
  a = b.state;"function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);"function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);b.state !== a && lg.enqueueReplaceState(b, b.state, null);
}
function og(a, b) {
  var c = a.type,
      d = a.stateNode,
      e = a.pendingProps,
      f = lf(a);d.props = e;d.state = a.memoizedState;d.refs = ha;d.context = nf(a, f);f = a.updateQueue;null !== f && (Qf(a, f, e, d, b), d.state = a.memoizedState);f = a.type.getDerivedStateFromProps;"function" === typeof f && (hg(a, f, e), d.state = a.memoizedState);"function" === typeof c.getDerivedStateFromProps || "function" === typeof d.getSnapshotBeforeUpdate || "function" !== typeof d.UNSAFE_componentWillMount && "function" !== typeof d.componentWillMount || (c = d.state, "function" === typeof d.componentWillMount && d.componentWillMount(), "function" === typeof d.UNSAFE_componentWillMount && d.UNSAFE_componentWillMount(), c !== d.state && lg.enqueueReplaceState(d, d.state, null), f = a.updateQueue, null !== f && (Qf(a, f, e, d, b), d.state = a.memoizedState));"function" === typeof d.componentDidMount && (a.effectTag |= 4);
}var pg = Array.isArray;
function qg(a, b, c) {
  a = c.ref;if (null !== a && "function" !== typeof a && "object" !== (typeof a === "undefined" ? "undefined" : _typeof(a))) {
    if (c._owner) {
      c = c._owner;var d = void 0;c && (2 !== c.tag ? A("110") : void 0, d = c.stateNode);d ? void 0 : A("147", a);var e = "" + a;if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === e) return b.ref;b = function b(a) {
        var b = d.refs === ha ? d.refs = {} : d.refs;null === a ? delete b[e] : b[e] = a;
      };b._stringRef = e;return b;
    }"string" !== typeof a ? A("148") : void 0;c._owner ? void 0 : A("254", a);
  }return a;
}
function rg(a, b) {
  "textarea" !== a.type && A("31", "[object Object]" === Object.prototype.toString.call(b) ? "object with keys {" + Object.keys(b).join(", ") + "}" : b, "");
}
function sg(a) {
  function b(b, c) {
    if (a) {
      var d = b.lastEffect;null !== d ? (d.nextEffect = c, b.lastEffect = c) : b.firstEffect = b.lastEffect = c;c.nextEffect = null;c.effectTag = 8;
    }
  }function c(c, d) {
    if (!a) return null;for (; null !== d;) {
      b(c, d), d = d.sibling;
    }return null;
  }function d(a, b) {
    for (a = new Map(); null !== b;) {
      null !== b.key ? a.set(b.key, b) : a.set(b.index, b), b = b.sibling;
    }return a;
  }function e(a, b, c) {
    a = vf(a, b, c);a.index = 0;a.sibling = null;return a;
  }function f(b, c, d) {
    b.index = d;if (!a) return c;d = b.alternate;if (null !== d) return d = d.index, d < c ? (b.effectTag = 2, c) : d;b.effectTag = 2;return c;
  }function g(b) {
    a && null === b.alternate && (b.effectTag = 2);return b;
  }function h(a, b, c, d) {
    if (null === b || 6 !== b.tag) return b = yf(c, a.mode, d), b.return = a, b;b = e(b, c, d);b.return = a;return b;
  }function k(a, b, c, d) {
    if (null !== b && b.type === c.type) return d = e(b, c.props, d), d.ref = qg(a, b, c), d.return = a, d;d = wf(c, a.mode, d);d.ref = qg(a, b, c);d.return = a;return d;
  }function n(a, b, c, d) {
    if (null === b || 4 !== b.tag || b.stateNode.containerInfo !== c.containerInfo || b.stateNode.implementation !== c.implementation) return b = zf(c, a.mode, d), b.return = a, b;b = e(b, c.children || [], d);b.return = a;return b;
  }function r(a, b, c, d, f) {
    if (null === b || 10 !== b.tag) return b = xf(c, a.mode, d, f), b.return = a, b;b = e(b, c, d);b.return = a;return b;
  }function w(a, b, c) {
    if ("string" === typeof b || "number" === typeof b) return b = yf("" + b, a.mode, c), b.return = a, b;if ("object" === (typeof b === "undefined" ? "undefined" : _typeof(b)) && null !== b) {
      switch (b.$$typeof) {case fc:
          return c = wf(b, a.mode, c), c.ref = qg(a, null, b), c.return = a, c;case gc:
          return b = zf(b, a.mode, c), b.return = a, b;}if (pg(b) || sc(b)) return b = xf(b, a.mode, c, null), b.return = a, b;rg(a, b);
    }return null;
  }function P(a, b, c, d) {
    var e = null !== b ? b.key : null;if ("string" === typeof c || "number" === typeof c) return null !== e ? null : h(a, b, "" + c, d);if ("object" === (typeof c === "undefined" ? "undefined" : _typeof(c)) && null !== c) {
      switch (c.$$typeof) {case fc:
          return c.key === e ? c.type === hc ? r(a, b, c.props.children, d, e) : k(a, b, c, d) : null;case gc:
          return c.key === e ? n(a, b, c, d) : null;}if (pg(c) || sc(c)) return null !== e ? null : r(a, b, c, d, null);rg(a, c);
    }return null;
  }function kc(a, b, c, d, e) {
    if ("string" === typeof d || "number" === typeof d) return a = a.get(c) || null, h(b, a, "" + d, e);
    if ("object" === (typeof d === "undefined" ? "undefined" : _typeof(d)) && null !== d) {
      switch (d.$$typeof) {case fc:
          return a = a.get(null === d.key ? c : d.key) || null, d.type === hc ? r(b, a, d.props.children, e, d.key) : k(b, a, d, e);case gc:
          return a = a.get(null === d.key ? c : d.key) || null, n(b, a, d, e);}if (pg(d) || sc(d)) return a = a.get(c) || null, r(b, a, d, e, null);rg(b, d);
    }return null;
  }function Hd(e, g, h, k) {
    for (var u = null, x = null, t = g, q = g = 0, n = null; null !== t && q < h.length; q++) {
      t.index > q ? (n = t, t = null) : n = t.sibling;var l = P(e, t, h[q], k);if (null === l) {
        null === t && (t = n);break;
      }a && t && null === l.alternate && b(e, t);g = f(l, g, q);null === x ? u = l : x.sibling = l;x = l;t = n;
    }if (q === h.length) return c(e, t), u;if (null === t) {
      for (; q < h.length; q++) {
        if (t = w(e, h[q], k)) g = f(t, g, q), null === x ? u = t : x.sibling = t, x = t;
      }return u;
    }for (t = d(e, t); q < h.length; q++) {
      if (n = kc(t, e, q, h[q], k)) a && null !== n.alternate && t.delete(null === n.key ? q : n.key), g = f(n, g, q), null === x ? u = n : x.sibling = n, x = n;
    }a && t.forEach(function (a) {
      return b(e, a);
    });return u;
  }function E(e, g, h, k) {
    var t = sc(h);"function" !== typeof t ? A("150") : void 0;h = t.call(h);null == h ? A("151") : void 0;for (var u = t = null, n = g, x = g = 0, y = null, l = h.next(); null !== n && !l.done; x++, l = h.next()) {
      n.index > x ? (y = n, n = null) : y = n.sibling;var r = P(e, n, l.value, k);if (null === r) {
        n || (n = y);break;
      }a && n && null === r.alternate && b(e, n);g = f(r, g, x);null === u ? t = r : u.sibling = r;u = r;n = y;
    }if (l.done) return c(e, n), t;if (null === n) {
      for (; !l.done; x++, l = h.next()) {
        l = w(e, l.value, k), null !== l && (g = f(l, g, x), null === u ? t = l : u.sibling = l, u = l);
      }return t;
    }for (n = d(e, n); !l.done; x++, l = h.next()) {
      l = kc(n, e, x, l.value, k), null !== l && (a && null !== l.alternate && n.delete(null === l.key ? x : l.key), g = f(l, g, x), null === u ? t = l : u.sibling = l, u = l);
    }a && n.forEach(function (a) {
      return b(e, a);
    });return t;
  }return function (a, d, f, h) {
    "object" === (typeof f === "undefined" ? "undefined" : _typeof(f)) && null !== f && f.type === hc && null === f.key && (f = f.props.children);var k = "object" === (typeof f === "undefined" ? "undefined" : _typeof(f)) && null !== f;if (k) switch (f.$$typeof) {case fc:
        a: {
          var n = f.key;for (k = d; null !== k;) {
            if (k.key === n) {
              if (10 === k.tag ? f.type === hc : k.type === f.type) {
                c(a, k.sibling);d = e(k, f.type === hc ? f.props.children : f.props, h);d.ref = qg(a, k, f);d.return = a;a = d;break a;
              } else {
                c(a, k);break;
              }
            } else b(a, k);k = k.sibling;
          }f.type === hc ? (d = xf(f.props.children, a.mode, h, f.key), d.return = a, a = d) : (h = wf(f, a.mode, h), h.ref = qg(a, d, f), h.return = a, a = h);
        }return g(a);case gc:
        a: {
          for (k = f.key; null !== d;) {
            if (d.key === k) {
              if (4 === d.tag && d.stateNode.containerInfo === f.containerInfo && d.stateNode.implementation === f.implementation) {
                c(a, d.sibling);d = e(d, f.children || [], h);d.return = a;a = d;break a;
              } else {
                c(a, d);break;
              }
            } else b(a, d);d = d.sibling;
          }d = zf(f, a.mode, h);d.return = a;a = d;
        }return g(a);}if ("string" === typeof f || "number" === typeof f) return f = "" + f, null !== d && 6 === d.tag ? (c(a, d.sibling), d = e(d, f, h), d.return = a, a = d) : (c(a, d), d = yf(f, a.mode, h), d.return = a, a = d), g(a);if (pg(f)) return Hd(a, d, f, h);if (sc(f)) return E(a, d, f, h);k && rg(a, f);if ("undefined" === typeof f) switch (a.tag) {case 2:case 1:
        h = a.type, A("152", h.displayName || h.name || "Component");}return c(a, d);
  };
}var tg = sg(!0),
    ug = sg(!1),
    vg = null,
    wg = null,
    xg = !1;function yg(a, b) {
  var c = new uf(5, null, null, 0);c.type = "DELETED";c.stateNode = b;c.return = a;c.effectTag = 8;null !== a.lastEffect ? (a.lastEffect.nextEffect = c, a.lastEffect = c) : a.firstEffect = a.lastEffect = c;
}
function zg(a, b) {
  switch (a.tag) {case 5:
      var c = a.type;b = 1 !== b.nodeType || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;return null !== b ? (a.stateNode = b, !0) : !1;case 6:
      return b = "" === a.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a.stateNode = b, !0) : !1;default:
      return !1;}
}function Ag(a) {
  if (xg) {
    var b = wg;if (b) {
      var c = b;if (!zg(a, b)) {
        b = df(c);if (!b || !zg(a, b)) {
          a.effectTag |= 2;xg = !1;vg = a;return;
        }yg(vg, c);
      }vg = a;wg = ef(b);
    } else a.effectTag |= 2, xg = !1, vg = a;
  }
}
function Bg(a) {
  for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag;) {
    a = a.return;
  }vg = a;
}function Cg(a) {
  if (a !== vg) return !1;if (!xg) return Bg(a), xg = !0, !1;var b = a.type;if (5 !== a.tag || "head" !== b && "body" !== b && !$e(b, a.memoizedProps)) for (b = wg; b;) {
    yg(a, b), b = df(b);
  }Bg(a);wg = vg ? df(a.stateNode) : null;return !0;
}function Dg() {
  wg = vg = null;xg = !1;
}function Q(a, b, c) {
  Eg(a, b, c, b.expirationTime);
}function Eg(a, b, c, d) {
  b.child = null === a ? ug(b, null, c, d) : tg(b, a.child, c, d);
}
function Fg(a, b) {
  var c = b.ref;if (null === a && null !== c || null !== a && a.ref !== c) b.effectTag |= 128;
}function Gg(a, b, c, d, e) {
  Fg(a, b);var f = 0 !== (b.effectTag & 64);if (!c && !f) return d && tf(b, !1), R(a, b);c = b.stateNode;ec.current = b;var g = f ? null : c.render();b.effectTag |= 1;f && (Eg(a, b, null, e), b.child = null);Eg(a, b, g, e);b.memoizedState = c.state;b.memoizedProps = c.props;d && tf(b, !0);return b.child;
}
function Hg(a) {
  var b = a.stateNode;b.pendingContext ? qf(a, b.pendingContext, b.pendingContext !== b.context) : b.context && qf(a, b.context, !1);dg(a, b.containerInfo);
}
function Ig(a, b, c, d) {
  var e = a.child;null !== e && (e.return = a);for (; null !== e;) {
    switch (e.tag) {case 12:
        var f = e.stateNode | 0;if (e.type === b && 0 !== (f & c)) {
          for (f = e; null !== f;) {
            var g = f.alternate;if (0 === f.expirationTime || f.expirationTime > d) f.expirationTime = d, null !== g && (0 === g.expirationTime || g.expirationTime > d) && (g.expirationTime = d);else if (null !== g && (0 === g.expirationTime || g.expirationTime > d)) g.expirationTime = d;else break;f = f.return;
          }f = null;
        } else f = e.child;break;case 13:
        f = e.type === a.type ? null : e.child;break;default:
        f = e.child;}if (null !== f) f.return = e;else for (f = e; null !== f;) {
      if (f === a) {
        f = null;break;
      }e = f.sibling;if (null !== e) {
        e.return = f.return;f = e;break;
      }f = f.return;
    }e = f;
  }
}
function Jg(a, b, c) {
  var d = b.type._context,
      e = b.pendingProps,
      f = b.memoizedProps,
      g = !0;if (O.current) g = !1;else if (f === e) return b.stateNode = 0, Xf(b), R(a, b);var h = e.value;b.memoizedProps = e;if (null === f) h = 1073741823;else if (f.value === e.value) {
    if (f.children === e.children && g) return b.stateNode = 0, Xf(b), R(a, b);h = 0;
  } else {
    var k = f.value;if (k === h && (0 !== k || 1 / k === 1 / h) || k !== k && h !== h) {
      if (f.children === e.children && g) return b.stateNode = 0, Xf(b), R(a, b);h = 0;
    } else if (h = "function" === typeof d._calculateChangedBits ? d._calculateChangedBits(k, h) : 1073741823, h |= 0, 0 === h) {
      if (f.children === e.children && g) return b.stateNode = 0, Xf(b), R(a, b);
    } else Ig(b, d, h, c);
  }b.stateNode = h;Xf(b);Q(a, b, e.children);return b.child;
}function R(a, b) {
  null !== a && b.child !== a.child ? A("153") : void 0;if (null !== b.child) {
    a = b.child;var c = vf(a, a.pendingProps, a.expirationTime);b.child = c;for (c.return = b; null !== a.sibling;) {
      a = a.sibling, c = c.sibling = vf(a, a.pendingProps, a.expirationTime), c.return = b;
    }c.sibling = null;
  }return b.child;
}
function Kg(a, b, c) {
  if (0 === b.expirationTime || b.expirationTime > c) {
    switch (b.tag) {case 3:
        Hg(b);break;case 2:
        sf(b);break;case 4:
        dg(b, b.stateNode.containerInfo);break;case 13:
        Xf(b);}return null;
  }switch (b.tag) {case 0:
      null !== a ? A("155") : void 0;var d = b.type,
          e = b.pendingProps,
          f = lf(b);f = nf(b, f);d = d(e, f);b.effectTag |= 1;"object" === (typeof d === "undefined" ? "undefined" : _typeof(d)) && null !== d && "function" === typeof d.render && void 0 === d.$$typeof ? (f = b.type, b.tag = 2, b.memoizedState = null !== d.state && void 0 !== d.state ? d.state : null, f = f.getDerivedStateFromProps, "function" === typeof f && hg(b, f, e), e = sf(b), d.updater = lg, b.stateNode = d, d._reactInternalFiber = b, og(b, c), a = Gg(a, b, !0, e, c)) : (b.tag = 1, Q(a, b, d), b.memoizedProps = e, a = b.child);return a;case 1:
      return e = b.type, c = b.pendingProps, O.current || b.memoizedProps !== c ? (d = lf(b), d = nf(b, d), e = e(c, d), b.effectTag |= 1, Q(a, b, e), b.memoizedProps = c, a = b.child) : a = R(a, b), a;case 2:
      e = sf(b);if (null === a) {
        if (null === b.stateNode) {
          var g = b.pendingProps,
              h = b.type;d = lf(b);var k = 2 === b.tag && null != b.type.contextTypes;f = k ? nf(b, d) : ha;g = new h(g, f);b.memoizedState = null !== g.state && void 0 !== g.state ? g.state : null;g.updater = lg;b.stateNode = g;g._reactInternalFiber = b;k && (k = b.stateNode, k.__reactInternalMemoizedUnmaskedChildContext = d, k.__reactInternalMemoizedMaskedChildContext = f);og(b, c);d = !0;
        } else {
          h = b.type;d = b.stateNode;k = b.memoizedProps;f = b.pendingProps;d.props = k;var n = d.context;g = lf(b);g = nf(b, g);var r = h.getDerivedStateFromProps;(h = "function" === typeof r || "function" === typeof d.getSnapshotBeforeUpdate) || "function" !== typeof d.UNSAFE_componentWillReceiveProps && "function" !== typeof d.componentWillReceiveProps || (k !== f || n !== g) && ng(b, d, f, g);Hf = !1;var w = b.memoizedState;n = d.state = w;var P = b.updateQueue;null !== P && (Qf(b, P, f, d, c), n = b.memoizedState);k !== f || w !== n || O.current || Hf ? ("function" === typeof r && (hg(b, r, f), n = b.memoizedState), (k = Hf || mg(b, k, f, w, n, g)) ? (h || "function" !== typeof d.UNSAFE_componentWillMount && "function" !== typeof d.componentWillMount || ("function" === typeof d.componentWillMount && d.componentWillMount(), "function" === typeof d.UNSAFE_componentWillMount && d.UNSAFE_componentWillMount()), "function" === typeof d.componentDidMount && (b.effectTag |= 4)) : ("function" === typeof d.componentDidMount && (b.effectTag |= 4), b.memoizedProps = f, b.memoizedState = n), d.props = f, d.state = n, d.context = g, d = k) : ("function" === typeof d.componentDidMount && (b.effectTag |= 4), d = !1);
        }
      } else h = b.type, d = b.stateNode, f = b.memoizedProps, k = b.pendingProps, d.props = f, n = d.context, g = lf(b), g = nf(b, g), r = h.getDerivedStateFromProps, (h = "function" === typeof r || "function" === typeof d.getSnapshotBeforeUpdate) || "function" !== typeof d.UNSAFE_componentWillReceiveProps && "function" !== typeof d.componentWillReceiveProps || (f !== k || n !== g) && ng(b, d, k, g), Hf = !1, n = b.memoizedState, w = d.state = n, P = b.updateQueue, null !== P && (Qf(b, P, k, d, c), w = b.memoizedState), f !== k || n !== w || O.current || Hf ? ("function" === typeof r && (hg(b, r, k), w = b.memoizedState), (r = Hf || mg(b, f, k, n, w, g)) ? (h || "function" !== typeof d.UNSAFE_componentWillUpdate && "function" !== typeof d.componentWillUpdate || ("function" === typeof d.componentWillUpdate && d.componentWillUpdate(k, w, g), "function" === typeof d.UNSAFE_componentWillUpdate && d.UNSAFE_componentWillUpdate(k, w, g)), "function" === typeof d.componentDidUpdate && (b.effectTag |= 4), "function" === typeof d.getSnapshotBeforeUpdate && (b.effectTag |= 256)) : ("function" !== typeof d.componentDidUpdate || f === a.memoizedProps && n === a.memoizedState || (b.effectTag |= 4), "function" !== typeof d.getSnapshotBeforeUpdate || f === a.memoizedProps && n === a.memoizedState || (b.effectTag |= 256), b.memoizedProps = k, b.memoizedState = w), d.props = k, d.state = w, d.context = g, d = r) : ("function" !== typeof d.componentDidUpdate || f === a.memoizedProps && n === a.memoizedState || (b.effectTag |= 4), "function" !== typeof d.getSnapshotBeforeUpdate || f === a.memoizedProps && n === a.memoizedState || (b.effectTag |= 256), d = !1);return Gg(a, b, d, e, c);case 3:
      Hg(b);e = b.updateQueue;if (null !== e) {
        if (d = b.memoizedState, d = null !== d ? d.element : null, Qf(b, e, b.pendingProps, null, c), e = b.memoizedState.element, e === d) Dg(), a = R(a, b);else {
          d = b.stateNode;if (d = (null === a || null === a.child) && d.hydrate) wg = ef(b.stateNode.containerInfo), vg = b, d = xg = !0;d ? (b.effectTag |= 2, b.child = ug(b, null, e, c)) : (Dg(), Q(a, b, e));a = b.child;
        }
      } else Dg(), a = R(a, b);return a;case 5:
      a: {
        cg(bg.current);e = cg($f.current);d = De(e, b.type);e !== d && (N(ag, b, b), N($f, d, b));null === a && Ag(b);e = b.type;k = b.memoizedProps;d = b.pendingProps;f = null !== a ? a.memoizedProps : null;if (!O.current && k === d) {
          if (k = b.mode & 1 && !!d.hidden) b.expirationTime = 1073741823;if (!k || 1073741823 !== c) {
            a = R(a, b);break a;
          }
        }k = d.children;$e(e, d) ? k = null : f && $e(e, f) && (b.effectTag |= 16);Fg(a, b);1073741823 !== c && b.mode & 1 && d.hidden ? (b.expirationTime = 1073741823, b.memoizedProps = d, a = null) : (Q(a, b, k), b.memoizedProps = d, a = b.child);
      }return a;case 6:
      return null === a && Ag(b), b.memoizedProps = b.pendingProps, null;case 16:
      return null;case 4:
      return dg(b, b.stateNode.containerInfo), e = b.pendingProps, O.current || b.memoizedProps !== e ? (null === a ? b.child = tg(b, null, e, c) : Q(a, b, e), b.memoizedProps = e, a = b.child) : a = R(a, b), a;case 14:
      return e = b.type.render, c = b.pendingProps, d = b.ref, O.current || b.memoizedProps !== c || d !== (null !== a ? a.ref : null) ? (e = e(c, d), Q(a, b, e), b.memoizedProps = c, a = b.child) : a = R(a, b), a;case 10:
      return c = b.pendingProps, O.current || b.memoizedProps !== c ? (Q(a, b, c), b.memoizedProps = c, a = b.child) : a = R(a, b), a;case 11:
      return c = b.pendingProps.children, O.current || null !== c && b.memoizedProps !== c ? (Q(a, b, c), b.memoizedProps = c, a = b.child) : a = R(a, b), a;case 15:
      return c = b.pendingProps, b.memoizedProps === c ? a = R(a, b) : (Q(a, b, c.children), b.memoizedProps = c, a = b.child), a;case 13:
      return Jg(a, b, c);case 12:
      a: if (d = b.type, f = b.pendingProps, k = b.memoizedProps, e = d._currentValue, g = d._changedBits, O.current || 0 !== g || k !== f) {
        b.memoizedProps = f;h = f.unstable_observedBits;if (void 0 === h || null === h) h = 1073741823;b.stateNode = h;if (0 !== (g & h)) Ig(b, d, g, c);else if (k === f) {
          a = R(a, b);break a;
        }c = f.children;c = c(e);b.effectTag |= 1;Q(a, b, c);a = b.child;
      } else a = R(a, b);return a;default:
      A("156");}
}function Lg(a) {
  a.effectTag |= 4;
}var Pg = void 0,
    Qg = void 0,
    Rg = void 0;Pg = function Pg() {};Qg = function Qg(a, b, c) {
  (b.updateQueue = c) && Lg(b);
};Rg = function Rg(a, b, c, d) {
  c !== d && Lg(b);
};
function Sg(a, b) {
  var c = b.pendingProps;switch (b.tag) {case 1:
      return null;case 2:
      return of(b), null;case 3:
      eg(b);pf(b);var d = b.stateNode;d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);if (null === a || null === a.child) Cg(b), b.effectTag &= -3;Pg(b);return null;case 5:
      fg(b);d = cg(bg.current);var e = b.type;if (null !== a && null != b.stateNode) {
        var f = a.memoizedProps,
            g = b.stateNode,
            h = cg($f.current);g = Se(g, e, f, c, d);Qg(a, b, g, e, f, c, d, h);a.ref !== b.ref && (b.effectTag |= 128);
      } else {
        if (!c) return null === b.stateNode ? A("166") : void 0, null;a = cg($f.current);if (Cg(b)) c = b.stateNode, e = b.type, f = b.memoizedProps, c[C] = b, c[Ma] = f, d = Ue(c, e, f, a, d), b.updateQueue = d, null !== d && Lg(b);else {
          a = Pe(e, c, d, a);a[C] = b;a[Ma] = c;a: for (f = b.child; null !== f;) {
            if (5 === f.tag || 6 === f.tag) a.appendChild(f.stateNode);else if (4 !== f.tag && null !== f.child) {
              f.child.return = f;f = f.child;continue;
            }if (f === b) break;for (; null === f.sibling;) {
              if (null === f.return || f.return === b) break a;f = f.return;
            }f.sibling.return = f.return;f = f.sibling;
          }Re(a, e, c, d);Ze(e, c) && Lg(b);b.stateNode = a;
        }null !== b.ref && (b.effectTag |= 128);
      }return null;case 6:
      if (a && null != b.stateNode) Rg(a, b, a.memoizedProps, c);else {
        if ("string" !== typeof c) return null === b.stateNode ? A("166") : void 0, null;d = cg(bg.current);cg($f.current);Cg(b) ? (d = b.stateNode, c = b.memoizedProps, d[C] = b, Ve(d, c) && Lg(b)) : (d = Qe(c, d), d[C] = b, b.stateNode = d);
      }return null;case 14:
      return null;case 16:
      return null;case 10:
      return null;case 11:
      return null;case 15:
      return null;case 4:
      return eg(b), Pg(b), null;case 13:
      return Yf(b), null;case 12:
      return null;case 0:
      A("167");
    default:
      A("156");}
}function Tg(a, b) {
  var c = b.source;null === b.stack && null !== c && vc(c);null !== c && tc(c);b = b.value;null !== a && 2 === a.tag && tc(a);try {
    b && b.suppressReactErrorLogging || console.error(b);
  } catch (d) {
    d && d.suppressReactErrorLogging || console.error(d);
  }
}function Ug(a) {
  var b = a.ref;if (null !== b) if ("function" === typeof b) try {
    b(null);
  } catch (c) {
    Vg(a, c);
  } else b.current = null;
}
function Wg(a) {
  "function" === typeof Gf && Gf(a);switch (a.tag) {case 2:
      Ug(a);var b = a.stateNode;if ("function" === typeof b.componentWillUnmount) try {
        b.props = a.memoizedProps, b.state = a.memoizedState, b.componentWillUnmount();
      } catch (c) {
        Vg(a, c);
      }break;case 5:
      Ug(a);break;case 4:
      Xg(a);}
}function Yg(a) {
  return 5 === a.tag || 3 === a.tag || 4 === a.tag;
}
function Zg(a) {
  a: {
    for (var b = a.return; null !== b;) {
      if (Yg(b)) {
        var c = b;break a;
      }b = b.return;
    }A("160");c = void 0;
  }var d = b = void 0;switch (c.tag) {case 5:
      b = c.stateNode;d = !1;break;case 3:
      b = c.stateNode.containerInfo;d = !0;break;case 4:
      b = c.stateNode.containerInfo;d = !0;break;default:
      A("161");}c.effectTag & 16 && (Ge(b, ""), c.effectTag &= -17);a: b: for (c = a;;) {
    for (; null === c.sibling;) {
      if (null === c.return || Yg(c.return)) {
        c = null;break a;
      }c = c.return;
    }c.sibling.return = c.return;for (c = c.sibling; 5 !== c.tag && 6 !== c.tag;) {
      if (c.effectTag & 2) continue b;
      if (null === c.child || 4 === c.tag) continue b;else c.child.return = c, c = c.child;
    }if (!(c.effectTag & 2)) {
      c = c.stateNode;break a;
    }
  }for (var e = a;;) {
    if (5 === e.tag || 6 === e.tag) {
      if (c) {
        if (d) {
          var f = b,
              g = e.stateNode,
              h = c;8 === f.nodeType ? f.parentNode.insertBefore(g, h) : f.insertBefore(g, h);
        } else b.insertBefore(e.stateNode, c);
      } else d ? (f = b, g = e.stateNode, 8 === f.nodeType ? f.parentNode.insertBefore(g, f) : f.appendChild(g)) : b.appendChild(e.stateNode);
    } else if (4 !== e.tag && null !== e.child) {
      e.child.return = e;e = e.child;continue;
    }if (e === a) break;for (; null === e.sibling;) {
      if (null === e.return || e.return === a) return;e = e.return;
    }e.sibling.return = e.return;e = e.sibling;
  }
}
function Xg(a) {
  for (var b = a, c = !1, d = void 0, e = void 0;;) {
    if (!c) {
      c = b.return;a: for (;;) {
        null === c ? A("160") : void 0;switch (c.tag) {case 5:
            d = c.stateNode;e = !1;break a;case 3:
            d = c.stateNode.containerInfo;e = !0;break a;case 4:
            d = c.stateNode.containerInfo;e = !0;break a;}c = c.return;
      }c = !0;
    }if (5 === b.tag || 6 === b.tag) {
      a: for (var f = b, g = f;;) {
        if (Wg(g), null !== g.child && 4 !== g.tag) g.child.return = g, g = g.child;else {
          if (g === f) break;for (; null === g.sibling;) {
            if (null === g.return || g.return === f) break a;g = g.return;
          }g.sibling.return = g.return;g = g.sibling;
        }
      }e ? (f = d, g = b.stateNode, 8 === f.nodeType ? f.parentNode.removeChild(g) : f.removeChild(g)) : d.removeChild(b.stateNode);
    } else if (4 === b.tag ? d = b.stateNode.containerInfo : Wg(b), null !== b.child) {
      b.child.return = b;b = b.child;continue;
    }if (b === a) break;for (; null === b.sibling;) {
      if (null === b.return || b.return === a) return;b = b.return;4 === b.tag && (c = !1);
    }b.sibling.return = b.return;b = b.sibling;
  }
}
function $g(a, b) {
  switch (b.tag) {case 2:
      break;case 5:
      var c = b.stateNode;if (null != c) {
        var d = b.memoizedProps;a = null !== a ? a.memoizedProps : d;var e = b.type,
            f = b.updateQueue;b.updateQueue = null;null !== f && (c[Ma] = d, Te(c, f, e, a, d));
      }break;case 6:
      null === b.stateNode ? A("162") : void 0;b.stateNode.nodeValue = b.memoizedProps;break;case 3:
      break;case 15:
      break;case 16:
      break;default:
      A("163");}
}function ah(a, b, c) {
  c = Kf(c);c.tag = 3;c.payload = { element: null };var d = b.value;c.callback = function () {
    bh(d);Tg(a, b);
  };return c;
}
function ch(a, b, c) {
  c = Kf(c);c.tag = 3;var d = a.stateNode;null !== d && "function" === typeof d.componentDidCatch && (c.callback = function () {
    null === dh ? dh = new Set([this]) : dh.add(this);var c = b.value,
        d = b.stack;Tg(a, b);this.componentDidCatch(c, { componentStack: null !== d ? d : "" });
  });return c;
}
function eh(a, b, c, d, e, f) {
  c.effectTag |= 512;c.firstEffect = c.lastEffect = null;d = Tf(d, c);a = b;do {
    switch (a.tag) {case 3:
        a.effectTag |= 1024;d = ah(a, d, f);Nf(a, d, f);return;case 2:
        if (b = d, c = a.stateNode, 0 === (a.effectTag & 64) && null !== c && "function" === typeof c.componentDidCatch && (null === dh || !dh.has(c))) {
          a.effectTag |= 1024;d = ch(a, b, f);Nf(a, d, f);return;
        }}a = a.return;
  } while (null !== a);
}
function fh(a) {
  switch (a.tag) {case 2:
      of(a);var b = a.effectTag;return b & 1024 ? (a.effectTag = b & -1025 | 64, a) : null;case 3:
      return eg(a), pf(a), b = a.effectTag, b & 1024 ? (a.effectTag = b & -1025 | 64, a) : null;case 5:
      return fg(a), null;case 16:
      return b = a.effectTag, b & 1024 ? (a.effectTag = b & -1025 | 64, a) : null;case 4:
      return eg(a), null;case 13:
      return Yf(a), null;default:
      return null;}
}var gh = af(),
    hh = 2,
    ih = gh,
    jh = 0,
    kh = 0,
    lh = !1,
    S = null,
    mh = null,
    T = 0,
    nh = -1,
    oh = !1,
    U = null,
    ph = !1,
    qh = !1,
    dh = null;
function rh() {
  if (null !== S) for (var a = S.return; null !== a;) {
    var b = a;switch (b.tag) {case 2:
        of(b);break;case 3:
        eg(b);pf(b);break;case 5:
        fg(b);break;case 4:
        eg(b);break;case 13:
        Yf(b);}a = a.return;
  }mh = null;T = 0;nh = -1;oh = !1;S = null;qh = !1;
}
function sh(a) {
  for (;;) {
    var b = a.alternate,
        c = a.return,
        d = a.sibling;if (0 === (a.effectTag & 512)) {
      b = Sg(b, a, T);var e = a;if (1073741823 === T || 1073741823 !== e.expirationTime) {
        var f = 0;switch (e.tag) {case 3:case 2:
            var g = e.updateQueue;null !== g && (f = g.expirationTime);}for (g = e.child; null !== g;) {
          0 !== g.expirationTime && (0 === f || f > g.expirationTime) && (f = g.expirationTime), g = g.sibling;
        }e.expirationTime = f;
      }if (null !== b) return b;null !== c && 0 === (c.effectTag & 512) && (null === c.firstEffect && (c.firstEffect = a.firstEffect), null !== a.lastEffect && (null !== c.lastEffect && (c.lastEffect.nextEffect = a.firstEffect), c.lastEffect = a.lastEffect), 1 < a.effectTag && (null !== c.lastEffect ? c.lastEffect.nextEffect = a : c.firstEffect = a, c.lastEffect = a));if (null !== d) return d;if (null !== c) a = c;else {
        qh = !0;break;
      }
    } else {
      a = fh(a, oh, T);if (null !== a) return a.effectTag &= 511, a;null !== c && (c.firstEffect = c.lastEffect = null, c.effectTag |= 512);if (null !== d) return d;if (null !== c) a = c;else break;
    }
  }return null;
}
function th(a) {
  var b = Kg(a.alternate, a, T);null === b && (b = sh(a));ec.current = null;return b;
}
function uh(a, b, c) {
  lh ? A("243") : void 0;lh = !0;if (b !== T || a !== mh || null === S) rh(), mh = a, T = b, nh = -1, S = vf(mh.current, null, T), a.pendingCommitExpirationTime = 0;var d = !1;oh = !c || T <= hh;do {
    try {
      if (c) for (; null !== S && !vh();) {
        S = th(S);
      } else for (; null !== S;) {
        S = th(S);
      }
    } catch (f) {
      if (null === S) d = !0, bh(f);else {
        null === S ? A("271") : void 0;c = S;var e = c.return;if (null === e) {
          d = !0;bh(f);break;
        }eh(a, e, c, f, oh, T, ih);S = sh(c);
      }
    }break;
  } while (1);lh = !1;if (d) return null;if (null === S) {
    if (qh) return a.pendingCommitExpirationTime = b, a.current.alternate;oh ? A("262") : void 0;0 <= nh && setTimeout(function () {
      var b = a.current.expirationTime;0 !== b && (0 === a.remainingExpirationTime || a.remainingExpirationTime < b) && wh(a, b);
    }, nh);xh(a.current.expirationTime);
  }return null;
}
function Vg(a, b) {
  var c;a: {
    lh && !ph ? A("263") : void 0;for (c = a.return; null !== c;) {
      switch (c.tag) {case 2:
          var d = c.stateNode;if ("function" === typeof c.type.getDerivedStateFromCatch || "function" === typeof d.componentDidCatch && (null === dh || !dh.has(d))) {
            a = Tf(b, a);a = ch(c, a, 1);Mf(c, a, 1);kg(c, 1);c = void 0;break a;
          }break;case 3:
          a = Tf(b, a);a = ah(c, a, 1);Mf(c, a, 1);kg(c, 1);c = void 0;break a;}c = c.return;
    }3 === a.tag && (c = Tf(b, a), c = ah(a, c, 1), Mf(a, c, 1), kg(a, 1));c = void 0;
  }return c;
}
function yh() {
  var a = 2 + 25 * (((ig() - 2 + 500) / 25 | 0) + 1);a <= jh && (a = jh + 1);return jh = a;
}function jg(a, b) {
  a = 0 !== kh ? kh : lh ? ph ? 1 : T : b.mode & 1 ? zh ? 2 + 10 * (((a - 2 + 15) / 10 | 0) + 1) : 2 + 25 * (((a - 2 + 500) / 25 | 0) + 1) : 1;zh && (0 === Ah || a > Ah) && (Ah = a);return a;
}
function kg(a, b) {
  for (; null !== a;) {
    if (0 === a.expirationTime || a.expirationTime > b) a.expirationTime = b;null !== a.alternate && (0 === a.alternate.expirationTime || a.alternate.expirationTime > b) && (a.alternate.expirationTime = b);if (null === a.return) if (3 === a.tag) {
      var c = a.stateNode;!lh && 0 !== T && b < T && rh();var d = c.current.expirationTime;lh && !ph && mh === c || wh(c, d);Bh > Ch && A("185");
    } else break;a = a.return;
  }
}function ig() {
  ih = af() - gh;return hh = (ih / 10 | 0) + 2;
}
function Dh(a) {
  var b = kh;kh = 2 + 25 * (((ig() - 2 + 500) / 25 | 0) + 1);try {
    return a();
  } finally {
    kh = b;
  }
}function Eh(a, b, c, d, e) {
  var f = kh;kh = 1;try {
    return a(b, c, d, e);
  } finally {
    kh = f;
  }
}var Fh = null,
    V = null,
    Gh = 0,
    Hh = -1,
    W = !1,
    X = null,
    Y = 0,
    Ah = 0,
    Ih = !1,
    Jh = !1,
    Kh = null,
    Lh = null,
    Z = !1,
    Mh = !1,
    zh = !1,
    Nh = null,
    Ch = 1E3,
    Bh = 0,
    Oh = 1;function Ph(a) {
  if (0 !== Gh) {
    if (a > Gh) return;cf(Hh);
  }var b = af() - gh;Gh = a;Hh = bf(Qh, { timeout: 10 * (a - 2) - b });
}
function wh(a, b) {
  if (null === a.nextScheduledRoot) a.remainingExpirationTime = b, null === V ? (Fh = V = a, a.nextScheduledRoot = a) : (V = V.nextScheduledRoot = a, V.nextScheduledRoot = Fh);else {
    var c = a.remainingExpirationTime;if (0 === c || b < c) a.remainingExpirationTime = b;
  }W || (Z ? Mh && (X = a, Y = 1, Rh(a, 1, !1)) : 1 === b ? Sh() : Ph(b));
}
function Th() {
  var a = 0,
      b = null;if (null !== V) for (var c = V, d = Fh; null !== d;) {
    var e = d.remainingExpirationTime;if (0 === e) {
      null === c || null === V ? A("244") : void 0;if (d === d.nextScheduledRoot) {
        Fh = V = d.nextScheduledRoot = null;break;
      } else if (d === Fh) Fh = e = d.nextScheduledRoot, V.nextScheduledRoot = e, d.nextScheduledRoot = null;else if (d === V) {
        V = c;V.nextScheduledRoot = Fh;d.nextScheduledRoot = null;break;
      } else c.nextScheduledRoot = d.nextScheduledRoot, d.nextScheduledRoot = null;d = c.nextScheduledRoot;
    } else {
      if (0 === a || e < a) a = e, b = d;if (d === V) break;
      c = d;d = d.nextScheduledRoot;
    }
  }c = X;null !== c && c === b && 1 === a ? Bh++ : Bh = 0;X = b;Y = a;
}function Qh(a) {
  Uh(0, !0, a);
}function Sh() {
  Uh(1, !1, null);
}function Uh(a, b, c) {
  Lh = c;Th();if (b) for (; null !== X && 0 !== Y && (0 === a || a >= Y) && (!Ih || ig() >= Y);) {
    ig(), Rh(X, Y, !Ih), Th();
  } else for (; null !== X && 0 !== Y && (0 === a || a >= Y);) {
    Rh(X, Y, !1), Th();
  }null !== Lh && (Gh = 0, Hh = -1);0 !== Y && Ph(Y);Lh = null;Ih = !1;Vh();
}function Wh(a, b) {
  W ? A("253") : void 0;X = a;Y = b;Rh(a, b, !1);Sh();Vh();
}
function Vh() {
  Bh = 0;if (null !== Nh) {
    var a = Nh;Nh = null;for (var b = 0; b < a.length; b++) {
      var c = a[b];try {
        c._onComplete();
      } catch (d) {
        Jh || (Jh = !0, Kh = d);
      }
    }
  }if (Jh) throw a = Kh, Kh = null, Jh = !1, a;
}function Rh(a, b, c) {
  W ? A("245") : void 0;W = !0;c ? (c = a.finishedWork, null !== c ? Xh(a, c, b) : (a.finishedWork = null, c = uh(a, b, !0), null !== c && (vh() ? a.finishedWork = c : Xh(a, c, b)))) : (c = a.finishedWork, null !== c ? Xh(a, c, b) : (a.finishedWork = null, c = uh(a, b, !1), null !== c && Xh(a, c, b)));W = !1;
}
function Xh(a, b, c) {
  var d = a.firstBatch;if (null !== d && d._expirationTime <= c && (null === Nh ? Nh = [d] : Nh.push(d), d._defer)) {
    a.finishedWork = b;a.remainingExpirationTime = 0;return;
  }a.finishedWork = null;ph = lh = !0;c = b.stateNode;c.current === b ? A("177") : void 0;d = c.pendingCommitExpirationTime;0 === d ? A("261") : void 0;c.pendingCommitExpirationTime = 0;ig();ec.current = null;if (1 < b.effectTag) {
    if (null !== b.lastEffect) {
      b.lastEffect.nextEffect = b;var e = b.firstEffect;
    } else e = b;
  } else e = b.firstEffect;Xe = Gd;var f = da();if (Td(f)) {
    if ("selectionStart" in f) var g = { start: f.selectionStart, end: f.selectionEnd };else a: {
      var h = window.getSelection && window.getSelection();if (h && 0 !== h.rangeCount) {
        g = h.anchorNode;var k = h.anchorOffset,
            n = h.focusNode;h = h.focusOffset;try {
          g.nodeType, n.nodeType;
        } catch (Wa) {
          g = null;break a;
        }var r = 0,
            w = -1,
            P = -1,
            kc = 0,
            Hd = 0,
            E = f,
            t = null;b: for (;;) {
          for (var x;;) {
            E !== g || 0 !== k && 3 !== E.nodeType || (w = r + k);E !== n || 0 !== h && 3 !== E.nodeType || (P = r + h);3 === E.nodeType && (r += E.nodeValue.length);if (null === (x = E.firstChild)) break;t = E;E = x;
          }for (;;) {
            if (E === f) break b;t === g && ++kc === k && (w = r);t === n && ++Hd === h && (P = r);if (null !== (x = E.nextSibling)) break;E = t;t = E.parentNode;
          }E = x;
        }g = -1 === w || -1 === P ? null : { start: w, end: P };
      } else g = null;
    }g = g || { start: 0, end: 0 };
  } else g = null;Ye = { focusedElem: f, selectionRange: g };Id(!1);for (U = e; null !== U;) {
    f = !1;g = void 0;try {
      for (; null !== U;) {
        if (U.effectTag & 256) {
          var u = U.alternate;k = U;switch (k.tag) {case 2:
              if (k.effectTag & 256 && null !== u) {
                var y = u.memoizedProps,
                    D = u.memoizedState,
                    ja = k.stateNode;ja.props = k.memoizedProps;ja.state = k.memoizedState;var hi = ja.getSnapshotBeforeUpdate(y, D);ja.__reactInternalSnapshotBeforeUpdate = hi;
              }break;case 3:case 5:case 6:case 4:
              break;default:
              A("163");}
        }U = U.nextEffect;
      }
    } catch (Wa) {
      f = !0, g = Wa;
    }f && (null === U ? A("178") : void 0, Vg(U, g), null !== U && (U = U.nextEffect));
  }for (U = e; null !== U;) {
    u = !1;y = void 0;try {
      for (; null !== U;) {
        var q = U.effectTag;q & 16 && Ge(U.stateNode, "");if (q & 128) {
          var z = U.alternate;if (null !== z) {
            var l = z.ref;null !== l && ("function" === typeof l ? l(null) : l.current = null);
          }
        }switch (q & 14) {case 2:
            Zg(U);U.effectTag &= -3;break;case 6:
            Zg(U);U.effectTag &= -3;$g(U.alternate, U);break;case 4:
            $g(U.alternate, U);break;case 8:
            D = U, Xg(D), D.return = null, D.child = null, D.alternate && (D.alternate.child = null, D.alternate.return = null);}U = U.nextEffect;
      }
    } catch (Wa) {
      u = !0, y = Wa;
    }u && (null === U ? A("178") : void 0, Vg(U, y), null !== U && (U = U.nextEffect));
  }l = Ye;z = da();q = l.focusedElem;u = l.selectionRange;if (z !== q && fa(document.documentElement, q)) {
    Td(q) && (z = u.start, l = u.end, void 0 === l && (l = z), "selectionStart" in q ? (q.selectionStart = z, q.selectionEnd = Math.min(l, q.value.length)) : window.getSelection && (z = window.getSelection(), y = q[lb()].length, l = Math.min(u.start, y), u = void 0 === u.end ? l : Math.min(u.end, y), !z.extend && l > u && (y = u, u = l, l = y), y = Sd(q, l), D = Sd(q, u), y && D && (1 !== z.rangeCount || z.anchorNode !== y.node || z.anchorOffset !== y.offset || z.focusNode !== D.node || z.focusOffset !== D.offset) && (ja = document.createRange(), ja.setStart(y.node, y.offset), z.removeAllRanges(), l > u ? (z.addRange(ja), z.extend(D.node, D.offset)) : (ja.setEnd(D.node, D.offset), z.addRange(ja)))));z = [];for (l = q; l = l.parentNode;) {
      1 === l.nodeType && z.push({ element: l, left: l.scrollLeft,
        top: l.scrollTop });
    }q.focus();for (q = 0; q < z.length; q++) {
      l = z[q], l.element.scrollLeft = l.left, l.element.scrollTop = l.top;
    }
  }Ye = null;Id(Xe);Xe = null;c.current = b;for (U = e; null !== U;) {
    e = !1;q = void 0;try {
      for (z = d; null !== U;) {
        var gg = U.effectTag;if (gg & 36) {
          var lc = U.alternate;l = U;u = z;switch (l.tag) {case 2:
              var ba = l.stateNode;if (l.effectTag & 4) if (null === lc) ba.props = l.memoizedProps, ba.state = l.memoizedState, ba.componentDidMount();else {
                var ri = lc.memoizedProps,
                    si = lc.memoizedState;ba.props = l.memoizedProps;ba.state = l.memoizedState;
                ba.componentDidUpdate(ri, si, ba.__reactInternalSnapshotBeforeUpdate);
              }var Mg = l.updateQueue;null !== Mg && (ba.props = l.memoizedProps, ba.state = l.memoizedState, Sf(l, Mg, ba, u));break;case 3:
              var Ng = l.updateQueue;if (null !== Ng) {
                y = null;if (null !== l.child) switch (l.child.tag) {case 5:
                    y = l.child.stateNode;break;case 2:
                    y = l.child.stateNode;}Sf(l, Ng, y, u);
              }break;case 5:
              var ti = l.stateNode;null === lc && l.effectTag & 4 && Ze(l.type, l.memoizedProps) && ti.focus();break;case 6:
              break;case 4:
              break;case 15:
              break;case 16:
              break;default:
              A("163");}
        }if (gg & 128) {
          l = void 0;var uc = U.ref;if (null !== uc) {
            var Og = U.stateNode;switch (U.tag) {case 5:
                l = Og;break;default:
                l = Og;}"function" === typeof uc ? uc(l) : uc.current = l;
          }
        }var ui = U.nextEffect;U.nextEffect = null;U = ui;
      }
    } catch (Wa) {
      e = !0, q = Wa;
    }e && (null === U ? A("178") : void 0, Vg(U, q), null !== U && (U = U.nextEffect));
  }lh = ph = !1;"function" === typeof Ff && Ff(b.stateNode);b = c.current.expirationTime;0 === b && (dh = null);a.remainingExpirationTime = b;
}function vh() {
  return null === Lh || Lh.timeRemaining() > Oh ? !1 : Ih = !0;
}
function bh(a) {
  null === X ? A("246") : void 0;X.remainingExpirationTime = 0;Jh || (Jh = !0, Kh = a);
}function xh(a) {
  null === X ? A("246") : void 0;X.remainingExpirationTime = a;
}function Yh(a, b) {
  var c = Z;Z = !0;try {
    return a(b);
  } finally {
    (Z = c) || W || Sh();
  }
}function Zh(a, b) {
  if (Z && !Mh) {
    Mh = !0;try {
      return a(b);
    } finally {
      Mh = !1;
    }
  }return a(b);
}function $h(a, b) {
  W ? A("187") : void 0;var c = Z;Z = !0;try {
    return Eh(a, b);
  } finally {
    Z = c, Sh();
  }
}function ai(a) {
  var b = Z;Z = !0;try {
    Eh(a);
  } finally {
    (Z = b) || W || Uh(1, !1, null);
  }
}
function bi(a, b, c, d, e) {
  var f = b.current;if (c) {
    c = c._reactInternalFiber;var g;b: {
      2 === id(c) && 2 === c.tag ? void 0 : A("170");for (g = c; 3 !== g.tag;) {
        if (mf(g)) {
          g = g.stateNode.__reactInternalMemoizedMergedChildContext;break b;
        }(g = g.return) ? void 0 : A("171");
      }g = g.stateNode.context;
    }c = mf(c) ? rf(c, g) : g;
  } else c = ha;null === b.context ? b.context = c : b.pendingContext = c;b = e;e = Kf(d);e.payload = { element: a };b = void 0 === b ? null : b;null !== b && (e.callback = b);Mf(f, e, d);kg(f, d);return d;
}
function ci(a) {
  var b = a._reactInternalFiber;void 0 === b && ("function" === typeof a.render ? A("188") : A("268", Object.keys(a)));a = ld(b);return null === a ? null : a.stateNode;
}function di(a, b, c, d) {
  var e = b.current,
      f = ig();e = jg(f, e);return bi(a, b, c, e, d);
}function ei(a) {
  a = a.current;if (!a.child) return null;switch (a.child.tag) {case 5:
      return a.child.stateNode;default:
      return a.child.stateNode;}
}
function fi(a) {
  var b = a.findFiberByHostInstance;return Ef(p({}, a, { findHostInstanceByFiber: function findHostInstanceByFiber(a) {
      a = ld(a);return null === a ? null : a.stateNode;
    }, findFiberByHostInstance: function findFiberByHostInstance(a) {
      return b ? b(a) : null;
    } }));
}
var gi = { updateContainerAtExpirationTime: bi, createContainer: function createContainer(a, b, c) {
    return Af(a, b, c);
  }, updateContainer: di, flushRoot: Wh, requestWork: wh, computeUniqueAsyncExpiration: yh, batchedUpdates: Yh, unbatchedUpdates: Zh, deferredUpdates: Dh, syncUpdates: Eh, interactiveUpdates: function interactiveUpdates(a, b, c) {
    if (zh) return a(b, c);Z || W || 0 === Ah || (Uh(Ah, !1, null), Ah = 0);var d = zh,
        e = Z;Z = zh = !0;try {
      return a(b, c);
    } finally {
      zh = d, (Z = e) || W || Sh();
    }
  }, flushInteractiveUpdates: function flushInteractiveUpdates() {
    W || 0 === Ah || (Uh(Ah, !1, null), Ah = 0);
  }, flushControlled: ai, flushSync: $h,
  getPublicRootInstance: ei, findHostInstance: ci, findHostInstanceWithNoPortals: function findHostInstanceWithNoPortals(a) {
    a = md(a);return null === a ? null : a.stateNode;
  }, injectIntoDevTools: fi };function ii(a, b, c) {
  var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;return { $$typeof: gc, key: null == d ? null : "" + d, children: a, containerInfo: b, implementation: c };
}Kb.injectFiberControlledHostComponent(We);
function ji(a) {
  this._expirationTime = yh();this._root = a;this._callbacks = this._next = null;this._hasChildren = this._didComplete = !1;this._children = null;this._defer = !0;
}ji.prototype.render = function (a) {
  this._defer ? void 0 : A("250");this._hasChildren = !0;this._children = a;var b = this._root._internalRoot,
      c = this._expirationTime,
      d = new ki();bi(a, b, null, c, d._onCommit);return d;
};ji.prototype.then = function (a) {
  if (this._didComplete) a();else {
    var b = this._callbacks;null === b && (b = this._callbacks = []);b.push(a);
  }
};
ji.prototype.commit = function () {
  var a = this._root._internalRoot,
      b = a.firstBatch;this._defer && null !== b ? void 0 : A("251");if (this._hasChildren) {
    var c = this._expirationTime;if (b !== this) {
      this._hasChildren && (c = this._expirationTime = b._expirationTime, this.render(this._children));for (var d = null, e = b; e !== this;) {
        d = e, e = e._next;
      }null === d ? A("251") : void 0;d._next = e._next;this._next = b;a.firstBatch = this;
    }this._defer = !1;Wh(a, c);b = this._next;this._next = null;b = a.firstBatch = b;null !== b && b._hasChildren && b.render(b._children);
  } else this._next = null, this._defer = !1;
};ji.prototype._onComplete = function () {
  if (!this._didComplete) {
    this._didComplete = !0;var a = this._callbacks;if (null !== a) for (var b = 0; b < a.length; b++) {
      (0, a[b])();
    }
  }
};function ki() {
  this._callbacks = null;this._didCommit = !1;this._onCommit = this._onCommit.bind(this);
}ki.prototype.then = function (a) {
  if (this._didCommit) a();else {
    var b = this._callbacks;null === b && (b = this._callbacks = []);b.push(a);
  }
};
ki.prototype._onCommit = function () {
  if (!this._didCommit) {
    this._didCommit = !0;var a = this._callbacks;if (null !== a) for (var b = 0; b < a.length; b++) {
      var c = a[b];"function" !== typeof c ? A("191", c) : void 0;c();
    }
  }
};function li(a, b, c) {
  this._internalRoot = Af(a, b, c);
}li.prototype.render = function (a, b) {
  var c = this._internalRoot,
      d = new ki();b = void 0 === b ? null : b;null !== b && d.then(b);di(a, c, null, d._onCommit);return d;
};
li.prototype.unmount = function (a) {
  var b = this._internalRoot,
      c = new ki();a = void 0 === a ? null : a;null !== a && c.then(a);di(null, b, null, c._onCommit);return c;
};li.prototype.legacy_renderSubtreeIntoContainer = function (a, b, c) {
  var d = this._internalRoot,
      e = new ki();c = void 0 === c ? null : c;null !== c && e.then(c);di(b, d, a, e._onCommit);return e;
};
li.prototype.createBatch = function () {
  var a = new ji(this),
      b = a._expirationTime,
      c = this._internalRoot,
      d = c.firstBatch;if (null === d) c.firstBatch = a, a._next = null;else {
    for (c = null; null !== d && d._expirationTime <= b;) {
      c = d, d = d._next;
    }a._next = d;null !== c && (c._next = a);
  }return a;
};function mi(a) {
  return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
}Sb = gi.batchedUpdates;Tb = gi.interactiveUpdates;Ub = gi.flushInteractiveUpdates;
function ni(a, b) {
  b || (b = a ? 9 === a.nodeType ? a.documentElement : a.firstChild : null, b = !(!b || 1 !== b.nodeType || !b.hasAttribute("data-reactroot")));if (!b) for (var c; c = a.lastChild;) {
    a.removeChild(c);
  }return new li(a, !1, b);
}
function oi(a, b, c, d, e) {
  mi(c) ? void 0 : A("200");var f = c._reactRootContainer;if (f) {
    if ("function" === typeof e) {
      var g = e;e = function e() {
        var a = ei(f._internalRoot);g.call(a);
      };
    }null != a ? f.legacy_renderSubtreeIntoContainer(a, b, e) : f.render(b, e);
  } else {
    f = c._reactRootContainer = ni(c, d);if ("function" === typeof e) {
      var h = e;e = function e() {
        var a = ei(f._internalRoot);h.call(a);
      };
    }Zh(function () {
      null != a ? f.legacy_renderSubtreeIntoContainer(a, b, e) : f.render(b, e);
    });
  }return ei(f._internalRoot);
}
function pi(a, b) {
  var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;mi(b) ? void 0 : A("200");return ii(a, b, null, c);
}
var qi = { createPortal: pi, findDOMNode: function findDOMNode(a) {
    return null == a ? null : 1 === a.nodeType ? a : ci(a);
  }, hydrate: function hydrate(a, b, c) {
    return oi(null, a, b, !0, c);
  }, render: function render(a, b, c) {
    return oi(null, a, b, !1, c);
  }, unstable_renderSubtreeIntoContainer: function unstable_renderSubtreeIntoContainer(a, b, c, d) {
    null == a || void 0 === a._reactInternalFiber ? A("38") : void 0;return oi(a, b, c, !1, d);
  }, unmountComponentAtNode: function unmountComponentAtNode(a) {
    mi(a) ? void 0 : A("40");return a._reactRootContainer ? (Zh(function () {
      oi(null, null, a, !1, function () {
        a._reactRootContainer = null;
      });
    }), !0) : !1;
  }, unstable_createPortal: function unstable_createPortal() {
    return pi.apply(void 0, arguments);
  }, unstable_batchedUpdates: Yh, unstable_deferredUpdates: Dh, flushSync: $h, unstable_flushControlled: ai, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: { EventPluginHub: Ka, EventPluginRegistry: va, EventPropagators: $a, ReactControlledComponent: Rb, ReactDOMComponentTree: Qa, ReactDOMEventListener: Md }, unstable_createRoot: function unstable_createRoot(a, b) {
    return new li(a, !0, null != b && !0 === b.hydrate);
  } };fi({ findFiberByHostInstance: Na, bundleType: 0, version: "16.4.0", rendererPackageName: "react-dom" });
var vi = { default: qi },
    wi = vi && qi || vi;module.exports = wi.default ? wi.default : wi;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var isNode = __webpack_require__(25);

/**
 * @param {*} object The object to check.
 * @return {boolean} Whether or not the object is a DOM text node.
 */
function isTextNode(object) {
  return isNode(object) && object.nodeType == 3;
}

module.exports = isTextNode;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

/**
 * @param {*} object The object to check.
 * @return {boolean} Whether or not the object is a DOM node.
 */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function isNode(object) {
  var doc = object ? object.ownerDocument || object : document;
  var defaultView = doc.defaultView || window;
  return !!(object && (typeof defaultView.Node === 'function' ? object instanceof defaultView.Node : (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string'));
}

module.exports = isNode;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/** @license React v16.4.0
 * react-dom.development.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};if(process.env.NODE_ENV!=="production"){(function(){'use strict';var invariant=__webpack_require__(2);var React=__webpack_require__(1);var warning=__webpack_require__(6);var ExecutionEnvironment=__webpack_require__(9);var _assign=__webpack_require__(4);var emptyFunction=__webpack_require__(3);var checkPropTypes=__webpack_require__(8);var getActiveElement=__webpack_require__(10);var shallowEqual=__webpack_require__(11);var containsNode=__webpack_require__(12);var emptyObject=__webpack_require__(5);var hyphenateStyleName=__webpack_require__(27);var camelizeStyleName=__webpack_require__(29);// Relying on the `invariant()` implementation lets us
// have preserve the format and params in the www builds.
!React?invariant(false,'ReactDOM was loaded before React. Make sure you load the React package before loading ReactDOM.'):void 0;var invokeGuardedCallback=function invokeGuardedCallback(name,func,context,a,b,c,d,e,f){this._hasCaughtError=false;this._caughtError=null;var funcArgs=Array.prototype.slice.call(arguments,3);try{func.apply(context,funcArgs);}catch(error){this._caughtError=error;this._hasCaughtError=true;}};{// In DEV mode, we swap out invokeGuardedCallback for a special version
// that plays more nicely with the browser's DevTools. The idea is to preserve
// "Pause on exceptions" behavior. Because React wraps all user-provided
// functions in invokeGuardedCallback, and the production version of
// invokeGuardedCallback uses a try-catch, all user exceptions are treated
// like caught exceptions, and the DevTools won't pause unless the developer
// takes the extra step of enabling pause on caught exceptions. This is
// untintuitive, though, because even though React has caught the error, from
// the developer's perspective, the error is uncaught.
//
// To preserve the expected "Pause on exceptions" behavior, we don't use a
// try-catch in DEV. Instead, we synchronously dispatch a fake event to a fake
// DOM node, and call the user-provided callback from inside an event handler
// for that fake event. If the callback throws, the error is "captured" using
// a global event handler. But because the error happens in a different
// event loop context, it does not interrupt the normal program flow.
// Effectively, this gives us try-catch behavior without actually using
// try-catch. Neat!
// Check that the browser supports the APIs we need to implement our special
// DEV version of invokeGuardedCallback
if(typeof window!=='undefined'&&typeof window.dispatchEvent==='function'&&typeof document!=='undefined'&&typeof document.createEvent==='function'){var fakeNode=document.createElement('react');var invokeGuardedCallbackDev=function invokeGuardedCallbackDev(name,func,context,a,b,c,d,e,f){// If document doesn't exist we know for sure we will crash in this method
// when we call document.createEvent(). However this can cause confusing
// errors: https://github.com/facebookincubator/create-react-app/issues/3482
// So we preemptively throw with a better message instead.
!(typeof document!=='undefined')?invariant(false,'The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.'):void 0;var evt=document.createEvent('Event');// Keeps track of whether the user-provided callback threw an error. We
// set this to true at the beginning, then set it to false right after
// calling the function. If the function errors, `didError` will never be
// set to false. This strategy works even if the browser is flaky and
// fails to call our global error handler, because it doesn't rely on
// the error event at all.
var didError=true;// Create an event handler for our fake event. We will synchronously
// dispatch our fake event using `dispatchEvent`. Inside the handler, we
// call the user-provided callback.
var funcArgs=Array.prototype.slice.call(arguments,3);function callCallback(){// We immediately remove the callback from event listeners so that
// nested `invokeGuardedCallback` calls do not clash. Otherwise, a
// nested call would trigger the fake event handlers of any call higher
// in the stack.
fakeNode.removeEventListener(evtType,callCallback,false);func.apply(context,funcArgs);didError=false;}// Create a global error event handler. We use this to capture the value
// that was thrown. It's possible that this error handler will fire more
// than once; for example, if non-React code also calls `dispatchEvent`
// and a handler for that event throws. We should be resilient to most of
// those cases. Even if our error event handler fires more than once, the
// last error event is always used. If the callback actually does error,
// we know that the last error event is the correct one, because it's not
// possible for anything else to have happened in between our callback
// erroring and the code that follows the `dispatchEvent` call below. If
// the callback doesn't error, but the error event was fired, we know to
// ignore it because `didError` will be false, as described above.
var error=void 0;// Use this to track whether the error event is ever called.
var didSetError=false;var isCrossOriginError=false;function onError(event){error=event.error;didSetError=true;if(error===null&&event.colno===0&&event.lineno===0){isCrossOriginError=true;}}// Create a fake event type.
var evtType='react-'+(name?name:'invokeguardedcallback');// Attach our event handlers
window.addEventListener('error',onError);fakeNode.addEventListener(evtType,callCallback,false);// Synchronously dispatch our fake event. If the user-provided function
// errors, it will trigger our global error handler.
evt.initEvent(evtType,false,false);fakeNode.dispatchEvent(evt);if(didError){if(!didSetError){// The callback errored, but the error event never fired.
error=new Error('An error was thrown inside one of your components, but React '+"doesn't know what it was. This is likely due to browser "+'flakiness. React does its best to preserve the "Pause on '+'exceptions" behavior of the DevTools, which requires some '+"DEV-mode only tricks. It's possible that these don't work in "+'your browser. Try triggering the error in production mode, '+'or switching to a modern browser. If you suspect that this is '+'actually an issue with React, please file an issue.');}else if(isCrossOriginError){error=new Error("A cross-origin error was thrown. React doesn't have access to "+'the actual error object in development. '+'See https://fb.me/react-crossorigin-error for more information.');}this._hasCaughtError=true;this._caughtError=error;}else{this._hasCaughtError=false;this._caughtError=null;}// Remove our event listeners
window.removeEventListener('error',onError);};invokeGuardedCallback=invokeGuardedCallbackDev;}}var invokeGuardedCallback$1=invokeGuardedCallback;var ReactErrorUtils={// Used by Fiber to simulate a try-catch.
_caughtError:null,_hasCaughtError:false,// Used by event system to capture/rethrow the first error.
_rethrowError:null,_hasRethrowError:false,/**
   * Call a function while guarding against errors that happens within it.
   * Returns an error if it throws, otherwise null.
   *
   * In production, this is implemented using a try-catch. The reason we don't
   * use a try-catch directly is so that we can swap out a different
   * implementation in DEV mode.
   *
   * @param {String} name of the guard to use for logging or debugging
   * @param {Function} func The function to invoke
   * @param {*} context The context to use when calling the function
   * @param {...*} args Arguments for function
   */invokeGuardedCallback:function invokeGuardedCallback(name,func,context,a,b,c,d,e,f){invokeGuardedCallback$1.apply(ReactErrorUtils,arguments);},/**
   * Same as invokeGuardedCallback, but instead of returning an error, it stores
   * it in a global so it can be rethrown by `rethrowCaughtError` later.
   * TODO: See if _caughtError and _rethrowError can be unified.
   *
   * @param {String} name of the guard to use for logging or debugging
   * @param {Function} func The function to invoke
   * @param {*} context The context to use when calling the function
   * @param {...*} args Arguments for function
   */invokeGuardedCallbackAndCatchFirstError:function invokeGuardedCallbackAndCatchFirstError(name,func,context,a,b,c,d,e,f){ReactErrorUtils.invokeGuardedCallback.apply(this,arguments);if(ReactErrorUtils.hasCaughtError()){var error=ReactErrorUtils.clearCaughtError();if(!ReactErrorUtils._hasRethrowError){ReactErrorUtils._hasRethrowError=true;ReactErrorUtils._rethrowError=error;}}},/**
   * During execution of guarded functions we will capture the first error which
   * we will rethrow to be handled by the top level error handler.
   */rethrowCaughtError:function rethrowCaughtError(){return _rethrowCaughtError.apply(ReactErrorUtils,arguments);},hasCaughtError:function hasCaughtError(){return ReactErrorUtils._hasCaughtError;},clearCaughtError:function clearCaughtError(){if(ReactErrorUtils._hasCaughtError){var error=ReactErrorUtils._caughtError;ReactErrorUtils._caughtError=null;ReactErrorUtils._hasCaughtError=false;return error;}else{invariant(false,'clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.');}}};var _rethrowCaughtError=function _rethrowCaughtError(){if(ReactErrorUtils._hasRethrowError){var error=ReactErrorUtils._rethrowError;ReactErrorUtils._rethrowError=null;ReactErrorUtils._hasRethrowError=false;throw error;}};/**
 * Injectable ordering of event plugins.
 */var eventPluginOrder=null;/**
 * Injectable mapping from names to event plugin modules.
 */var namesToPlugins={};/**
 * Recomputes the plugin list using the injected plugins and plugin ordering.
 *
 * @private
 */function recomputePluginOrdering(){if(!eventPluginOrder){// Wait until an `eventPluginOrder` is injected.
return;}for(var pluginName in namesToPlugins){var pluginModule=namesToPlugins[pluginName];var pluginIndex=eventPluginOrder.indexOf(pluginName);!(pluginIndex>-1)?invariant(false,'EventPluginRegistry: Cannot inject event plugins that do not exist in the plugin ordering, `%s`.',pluginName):void 0;if(plugins[pluginIndex]){continue;}!pluginModule.extractEvents?invariant(false,'EventPluginRegistry: Event plugins must implement an `extractEvents` method, but `%s` does not.',pluginName):void 0;plugins[pluginIndex]=pluginModule;var publishedEvents=pluginModule.eventTypes;for(var eventName in publishedEvents){!publishEventForPlugin(publishedEvents[eventName],pluginModule,eventName)?invariant(false,'EventPluginRegistry: Failed to publish event `%s` for plugin `%s`.',eventName,pluginName):void 0;}}}/**
 * Publishes an event so that it can be dispatched by the supplied plugin.
 *
 * @param {object} dispatchConfig Dispatch configuration for the event.
 * @param {object} PluginModule Plugin publishing the event.
 * @return {boolean} True if the event was successfully published.
 * @private
 */function publishEventForPlugin(dispatchConfig,pluginModule,eventName){!!eventNameDispatchConfigs.hasOwnProperty(eventName)?invariant(false,'EventPluginHub: More than one plugin attempted to publish the same event name, `%s`.',eventName):void 0;eventNameDispatchConfigs[eventName]=dispatchConfig;var phasedRegistrationNames=dispatchConfig.phasedRegistrationNames;if(phasedRegistrationNames){for(var phaseName in phasedRegistrationNames){if(phasedRegistrationNames.hasOwnProperty(phaseName)){var phasedRegistrationName=phasedRegistrationNames[phaseName];publishRegistrationName(phasedRegistrationName,pluginModule,eventName);}}return true;}else if(dispatchConfig.registrationName){publishRegistrationName(dispatchConfig.registrationName,pluginModule,eventName);return true;}return false;}/**
 * Publishes a registration name that is used to identify dispatched events.
 *
 * @param {string} registrationName Registration name to add.
 * @param {object} PluginModule Plugin publishing the event.
 * @private
 */function publishRegistrationName(registrationName,pluginModule,eventName){!!registrationNameModules[registrationName]?invariant(false,'EventPluginHub: More than one plugin attempted to publish the same registration name, `%s`.',registrationName):void 0;registrationNameModules[registrationName]=pluginModule;registrationNameDependencies[registrationName]=pluginModule.eventTypes[eventName].dependencies;{var lowerCasedName=registrationName.toLowerCase();possibleRegistrationNames[lowerCasedName]=registrationName;if(registrationName==='onDoubleClick'){possibleRegistrationNames.ondblclick=registrationName;}}}/**
 * Registers plugins so that they can extract and dispatch events.
 *
 * @see {EventPluginHub}
 *//**
 * Ordered list of injected plugins.
 */var plugins=[];/**
 * Mapping from event name to dispatch config
 */var eventNameDispatchConfigs={};/**
 * Mapping from registration name to plugin module
 */var registrationNameModules={};/**
 * Mapping from registration name to event name
 */var registrationNameDependencies={};/**
 * Mapping from lowercase registration names to the properly cased version,
 * used to warn in the case of missing event handlers. Available
 * only in true.
 * @type {Object}
 */var possibleRegistrationNames={};// Trust the developer to only use possibleRegistrationNames in true
/**
 * Injects an ordering of plugins (by plugin name). This allows the ordering
 * to be decoupled from injection of the actual plugins so that ordering is
 * always deterministic regardless of packaging, on-the-fly injection, etc.
 *
 * @param {array} InjectedEventPluginOrder
 * @internal
 * @see {EventPluginHub.injection.injectEventPluginOrder}
 */function injectEventPluginOrder(injectedEventPluginOrder){!!eventPluginOrder?invariant(false,'EventPluginRegistry: Cannot inject event plugin ordering more than once. You are likely trying to load more than one copy of React.'):void 0;// Clone the ordering so it cannot be dynamically mutated.
eventPluginOrder=Array.prototype.slice.call(injectedEventPluginOrder);recomputePluginOrdering();}/**
 * Injects plugins to be used by `EventPluginHub`. The plugin names must be
 * in the ordering injected by `injectEventPluginOrder`.
 *
 * Plugins can be injected as part of page initialization or on-the-fly.
 *
 * @param {object} injectedNamesToPlugins Map from names to plugin modules.
 * @internal
 * @see {EventPluginHub.injection.injectEventPluginsByName}
 */function injectEventPluginsByName(injectedNamesToPlugins){var isOrderingDirty=false;for(var pluginName in injectedNamesToPlugins){if(!injectedNamesToPlugins.hasOwnProperty(pluginName)){continue;}var pluginModule=injectedNamesToPlugins[pluginName];if(!namesToPlugins.hasOwnProperty(pluginName)||namesToPlugins[pluginName]!==pluginModule){!!namesToPlugins[pluginName]?invariant(false,'EventPluginRegistry: Cannot inject two different event plugins using the same name, `%s`.',pluginName):void 0;namesToPlugins[pluginName]=pluginModule;isOrderingDirty=true;}}if(isOrderingDirty){recomputePluginOrdering();}}var EventPluginRegistry=Object.freeze({plugins:plugins,eventNameDispatchConfigs:eventNameDispatchConfigs,registrationNameModules:registrationNameModules,registrationNameDependencies:registrationNameDependencies,possibleRegistrationNames:possibleRegistrationNames,injectEventPluginOrder:injectEventPluginOrder,injectEventPluginsByName:injectEventPluginsByName});var getFiberCurrentPropsFromNode=null;var getInstanceFromNode=null;var getNodeFromInstance=null;var injection$1={injectComponentTree:function injectComponentTree(Injected){getFiberCurrentPropsFromNode=Injected.getFiberCurrentPropsFromNode;getInstanceFromNode=Injected.getInstanceFromNode;getNodeFromInstance=Injected.getNodeFromInstance;{!(getNodeFromInstance&&getInstanceFromNode)?warning(false,'EventPluginUtils.injection.injectComponentTree(...): Injected '+'module is missing getNodeFromInstance or getInstanceFromNode.'):void 0;}}};var validateEventDispatches=void 0;{validateEventDispatches=function validateEventDispatches(event){var dispatchListeners=event._dispatchListeners;var dispatchInstances=event._dispatchInstances;var listenersIsArr=Array.isArray(dispatchListeners);var listenersLen=listenersIsArr?dispatchListeners.length:dispatchListeners?1:0;var instancesIsArr=Array.isArray(dispatchInstances);var instancesLen=instancesIsArr?dispatchInstances.length:dispatchInstances?1:0;!(instancesIsArr===listenersIsArr&&instancesLen===listenersLen)?warning(false,'EventPluginUtils: Invalid `event`.'):void 0;};}/**
 * Dispatch the event to the listener.
 * @param {SyntheticEvent} event SyntheticEvent to handle
 * @param {boolean} simulated If the event is simulated (changes exn behavior)
 * @param {function} listener Application-level callback
 * @param {*} inst Internal component instance
 */function executeDispatch(event,simulated,listener,inst){var type=event.type||'unknown-event';event.currentTarget=getNodeFromInstance(inst);ReactErrorUtils.invokeGuardedCallbackAndCatchFirstError(type,listener,undefined,event);event.currentTarget=null;}/**
 * Standard/simple iteration through an event's collected dispatches.
 */function executeDispatchesInOrder(event,simulated){var dispatchListeners=event._dispatchListeners;var dispatchInstances=event._dispatchInstances;{validateEventDispatches(event);}if(Array.isArray(dispatchListeners)){for(var i=0;i<dispatchListeners.length;i++){if(event.isPropagationStopped()){break;}// Listeners and Instances are two parallel arrays that are always in sync.
executeDispatch(event,simulated,dispatchListeners[i],dispatchInstances[i]);}}else if(dispatchListeners){executeDispatch(event,simulated,dispatchListeners,dispatchInstances);}event._dispatchListeners=null;event._dispatchInstances=null;}/**
 * @see executeDispatchesInOrderStopAtTrueImpl
 *//**
 * Execution of a "direct" dispatch - there must be at most one dispatch
 * accumulated on the event or it is considered an error. It doesn't really make
 * sense for an event with multiple dispatches (bubbled) to keep track of the
 * return values at each dispatch execution, but it does tend to make sense when
 * dealing with "direct" dispatches.
 *
 * @return {*} The return value of executing the single dispatch.
 *//**
 * @param {SyntheticEvent} event
 * @return {boolean} True iff number of dispatches accumulated is greater than 0.
 *//**
 * Accumulates items that must not be null or undefined into the first one. This
 * is used to conserve memory by avoiding array allocations, and thus sacrifices
 * API cleanness. Since `current` can be null before being passed in and not
 * null after this function, make sure to assign it back to `current`:
 *
 * `a = accumulateInto(a, b);`
 *
 * This API should be sparingly used. Try `accumulate` for something cleaner.
 *
 * @return {*|array<*>} An accumulation of items.
 */function accumulateInto(current,next){!(next!=null)?invariant(false,'accumulateInto(...): Accumulated items must not be null or undefined.'):void 0;if(current==null){return next;}// Both are not empty. Warning: Never call x.concat(y) when you are not
// certain that x is an Array (x could be a string with concat method).
if(Array.isArray(current)){if(Array.isArray(next)){current.push.apply(current,next);return current;}current.push(next);return current;}if(Array.isArray(next)){// A bit too dangerous to mutate `next`.
return[current].concat(next);}return[current,next];}/**
 * @param {array} arr an "accumulation" of items which is either an Array or
 * a single item. Useful when paired with the `accumulate` module. This is a
 * simple utility that allows us to reason about a collection of items, but
 * handling the case when there is exactly one item (and we do not need to
 * allocate an array).
 * @param {function} cb Callback invoked with each element or a collection.
 * @param {?} [scope] Scope used as `this` in a callback.
 */function forEachAccumulated(arr,cb,scope){if(Array.isArray(arr)){arr.forEach(cb,scope);}else if(arr){cb.call(scope,arr);}}/**
 * Internal queue of events that have accumulated their dispatches and are
 * waiting to have their dispatches executed.
 */var eventQueue=null;/**
 * Dispatches an event and releases it back into the pool, unless persistent.
 *
 * @param {?object} event Synthetic event to be dispatched.
 * @param {boolean} simulated If the event is simulated (changes exn behavior)
 * @private
 */var executeDispatchesAndRelease=function executeDispatchesAndRelease(event,simulated){if(event){executeDispatchesInOrder(event,simulated);if(!event.isPersistent()){event.constructor.release(event);}}};var executeDispatchesAndReleaseSimulated=function executeDispatchesAndReleaseSimulated(e){return executeDispatchesAndRelease(e,true);};var executeDispatchesAndReleaseTopLevel=function executeDispatchesAndReleaseTopLevel(e){return executeDispatchesAndRelease(e,false);};function isInteractive(tag){return tag==='button'||tag==='input'||tag==='select'||tag==='textarea';}function shouldPreventMouseEvent(name,type,props){switch(name){case'onClick':case'onClickCapture':case'onDoubleClick':case'onDoubleClickCapture':case'onMouseDown':case'onMouseDownCapture':case'onMouseMove':case'onMouseMoveCapture':case'onMouseUp':case'onMouseUpCapture':return!!(props.disabled&&isInteractive(type));default:return false;}}/**
 * This is a unified interface for event plugins to be installed and configured.
 *
 * Event plugins can implement the following properties:
 *
 *   `extractEvents` {function(string, DOMEventTarget, string, object): *}
 *     Required. When a top-level event is fired, this method is expected to
 *     extract synthetic events that will in turn be queued and dispatched.
 *
 *   `eventTypes` {object}
 *     Optional, plugins that fire events must publish a mapping of registration
 *     names that are used to register listeners. Values of this mapping must
 *     be objects that contain `registrationName` or `phasedRegistrationNames`.
 *
 *   `executeDispatch` {function(object, function, string)}
 *     Optional, allows plugins to override how an event gets dispatched. By
 *     default, the listener is simply invoked.
 *
 * Each plugin that is injected into `EventsPluginHub` is immediately operable.
 *
 * @public
 *//**
 * Methods for injecting dependencies.
 */var injection={/**
   * @param {array} InjectedEventPluginOrder
   * @public
   */injectEventPluginOrder:injectEventPluginOrder,/**
   * @param {object} injectedNamesToPlugins Map from names to plugin modules.
   */injectEventPluginsByName:injectEventPluginsByName};/**
 * @param {object} inst The instance, which is the source of events.
 * @param {string} registrationName Name of listener (e.g. `onClick`).
 * @return {?function} The stored callback.
 */function getListener(inst,registrationName){var listener=void 0;// TODO: shouldPreventMouseEvent is DOM-specific and definitely should not
// live here; needs to be moved to a better place soon
var stateNode=inst.stateNode;if(!stateNode){// Work in progress (ex: onload events in incremental mode).
return null;}var props=getFiberCurrentPropsFromNode(stateNode);if(!props){// Work in progress.
return null;}listener=props[registrationName];if(shouldPreventMouseEvent(registrationName,inst.type,props)){return null;}!(!listener||typeof listener==='function')?invariant(false,'Expected `%s` listener to be a function, instead got a value of `%s` type.',registrationName,typeof listener==='undefined'?'undefined':_typeof(listener)):void 0;return listener;}/**
 * Allows registered plugins an opportunity to extract events from top-level
 * native browser events.
 *
 * @return {*} An accumulation of synthetic events.
 * @internal
 */function extractEvents(topLevelType,targetInst,nativeEvent,nativeEventTarget){var events=null;for(var i=0;i<plugins.length;i++){// Not every plugin in the ordering may be loaded at runtime.
var possiblePlugin=plugins[i];if(possiblePlugin){var extractedEvents=possiblePlugin.extractEvents(topLevelType,targetInst,nativeEvent,nativeEventTarget);if(extractedEvents){events=accumulateInto(events,extractedEvents);}}}return events;}function runEventsInBatch(events,simulated){if(events!==null){eventQueue=accumulateInto(eventQueue,events);}// Set `eventQueue` to null before processing it so that we can tell if more
// events get enqueued while processing.
var processingEventQueue=eventQueue;eventQueue=null;if(!processingEventQueue){return;}if(simulated){forEachAccumulated(processingEventQueue,executeDispatchesAndReleaseSimulated);}else{forEachAccumulated(processingEventQueue,executeDispatchesAndReleaseTopLevel);}!!eventQueue?invariant(false,'processEventQueue(): Additional events were enqueued while processing an event queue. Support for this has not yet been implemented.'):void 0;// This would be a good time to rethrow if any of the event handlers threw.
ReactErrorUtils.rethrowCaughtError();}function runExtractedEventsInBatch(topLevelType,targetInst,nativeEvent,nativeEventTarget){var events=extractEvents(topLevelType,targetInst,nativeEvent,nativeEventTarget);runEventsInBatch(events,false);}var EventPluginHub=Object.freeze({injection:injection,getListener:getListener,runEventsInBatch:runEventsInBatch,runExtractedEventsInBatch:runExtractedEventsInBatch});var IndeterminateComponent=0;// Before we know whether it is functional or class
var FunctionalComponent=1;var ClassComponent=2;var HostRoot=3;// Root of a host tree. Could be nested inside another node.
var HostPortal=4;// A subtree. Could be an entry point to a different renderer.
var HostComponent=5;var HostText=6;var Fragment=10;var Mode=11;var ContextConsumer=12;var ContextProvider=13;var ForwardRef=14;var Profiler=15;var TimeoutComponent=16;var randomKey=Math.random().toString(36).slice(2);var internalInstanceKey='__reactInternalInstance$'+randomKey;var internalEventHandlersKey='__reactEventHandlers$'+randomKey;function precacheFiberNode(hostInst,node){node[internalInstanceKey]=hostInst;}/**
 * Given a DOM node, return the closest ReactDOMComponent or
 * ReactDOMTextComponent instance ancestor.
 */function getClosestInstanceFromNode(node){if(node[internalInstanceKey]){return node[internalInstanceKey];}while(!node[internalInstanceKey]){if(node.parentNode){node=node.parentNode;}else{// Top of the tree. This node must not be part of a React tree (or is
// unmounted, potentially).
return null;}}var inst=node[internalInstanceKey];if(inst.tag===HostComponent||inst.tag===HostText){// In Fiber, this will always be the deepest root.
return inst;}return null;}/**
 * Given a DOM node, return the ReactDOMComponent or ReactDOMTextComponent
 * instance, or null if the node was not rendered by this React.
 */function getInstanceFromNode$1(node){var inst=node[internalInstanceKey];if(inst){if(inst.tag===HostComponent||inst.tag===HostText){return inst;}else{return null;}}return null;}/**
 * Given a ReactDOMComponent or ReactDOMTextComponent, return the corresponding
 * DOM node.
 */function getNodeFromInstance$1(inst){if(inst.tag===HostComponent||inst.tag===HostText){// In Fiber this, is just the state node right now. We assume it will be
// a host component or host text.
return inst.stateNode;}// Without this first invariant, passing a non-DOM-component triggers the next
// invariant for a missing parent, which is super confusing.
invariant(false,'getNodeFromInstance: Invalid argument.');}function getFiberCurrentPropsFromNode$1(node){return node[internalEventHandlersKey]||null;}function updateFiberProps(node,props){node[internalEventHandlersKey]=props;}var ReactDOMComponentTree=Object.freeze({precacheFiberNode:precacheFiberNode,getClosestInstanceFromNode:getClosestInstanceFromNode,getInstanceFromNode:getInstanceFromNode$1,getNodeFromInstance:getNodeFromInstance$1,getFiberCurrentPropsFromNode:getFiberCurrentPropsFromNode$1,updateFiberProps:updateFiberProps});function getParent(inst){do{inst=inst.return;// TODO: If this is a HostRoot we might want to bail out.
// That is depending on if we want nested subtrees (layers) to bubble
// events to their parent. We could also go through parentNode on the
// host node but that wouldn't work for React Native and doesn't let us
// do the portal feature.
}while(inst&&inst.tag!==HostComponent);if(inst){return inst;}return null;}/**
 * Return the lowest common ancestor of A and B, or null if they are in
 * different trees.
 */function getLowestCommonAncestor(instA,instB){var depthA=0;for(var tempA=instA;tempA;tempA=getParent(tempA)){depthA++;}var depthB=0;for(var tempB=instB;tempB;tempB=getParent(tempB)){depthB++;}// If A is deeper, crawl up.
while(depthA-depthB>0){instA=getParent(instA);depthA--;}// If B is deeper, crawl up.
while(depthB-depthA>0){instB=getParent(instB);depthB--;}// Walk in lockstep until we find a match.
var depth=depthA;while(depth--){if(instA===instB||instA===instB.alternate){return instA;}instA=getParent(instA);instB=getParent(instB);}return null;}/**
 * Return if A is an ancestor of B.
 *//**
 * Return the parent instance of the passed-in instance.
 */function getParentInstance(inst){return getParent(inst);}/**
 * Simulates the traversal of a two-phase, capture/bubble event dispatch.
 */function traverseTwoPhase(inst,fn,arg){var path=[];while(inst){path.push(inst);inst=getParent(inst);}var i=void 0;for(i=path.length;i-->0;){fn(path[i],'captured',arg);}for(i=0;i<path.length;i++){fn(path[i],'bubbled',arg);}}/**
 * Traverses the ID hierarchy and invokes the supplied `cb` on any IDs that
 * should would receive a `mouseEnter` or `mouseLeave` event.
 *
 * Does not invoke the callback on the nearest common ancestor because nothing
 * "entered" or "left" that element.
 */function traverseEnterLeave(from,to,fn,argFrom,argTo){var common=from&&to?getLowestCommonAncestor(from,to):null;var pathFrom=[];while(true){if(!from){break;}if(from===common){break;}var alternate=from.alternate;if(alternate!==null&&alternate===common){break;}pathFrom.push(from);from=getParent(from);}var pathTo=[];while(true){if(!to){break;}if(to===common){break;}var _alternate=to.alternate;if(_alternate!==null&&_alternate===common){break;}pathTo.push(to);to=getParent(to);}for(var i=0;i<pathFrom.length;i++){fn(pathFrom[i],'bubbled',argFrom);}for(var _i=pathTo.length;_i-->0;){fn(pathTo[_i],'captured',argTo);}}/**
 * Some event types have a notion of different registration names for different
 * "phases" of propagation. This finds listeners by a given phase.
 */function listenerAtPhase(inst,event,propagationPhase){var registrationName=event.dispatchConfig.phasedRegistrationNames[propagationPhase];return getListener(inst,registrationName);}/**
 * A small set of propagation patterns, each of which will accept a small amount
 * of information, and generate a set of "dispatch ready event objects" - which
 * are sets of events that have already been annotated with a set of dispatched
 * listener functions/ids. The API is designed this way to discourage these
 * propagation strategies from actually executing the dispatches, since we
 * always want to collect the entire set of dispatches before executing even a
 * single one.
 *//**
 * Tags a `SyntheticEvent` with dispatched listeners. Creating this function
 * here, allows us to not have to bind or create functions for each event.
 * Mutating the event's members allows us to not have to create a wrapping
 * "dispatch" object that pairs the event with the listener.
 */function accumulateDirectionalDispatches(inst,phase,event){{!inst?warning(false,'Dispatching inst must not be null'):void 0;}var listener=listenerAtPhase(inst,event,phase);if(listener){event._dispatchListeners=accumulateInto(event._dispatchListeners,listener);event._dispatchInstances=accumulateInto(event._dispatchInstances,inst);}}/**
 * Collect dispatches (must be entirely collected before dispatching - see unit
 * tests). Lazily allocate the array to conserve memory.  We must loop through
 * each event and perform the traversal for each one. We cannot perform a
 * single traversal for the entire collection of events because each event may
 * have a different target.
 */function accumulateTwoPhaseDispatchesSingle(event){if(event&&event.dispatchConfig.phasedRegistrationNames){traverseTwoPhase(event._targetInst,accumulateDirectionalDispatches,event);}}/**
 * Same as `accumulateTwoPhaseDispatchesSingle`, but skips over the targetID.
 */function accumulateTwoPhaseDispatchesSingleSkipTarget(event){if(event&&event.dispatchConfig.phasedRegistrationNames){var targetInst=event._targetInst;var parentInst=targetInst?getParentInstance(targetInst):null;traverseTwoPhase(parentInst,accumulateDirectionalDispatches,event);}}/**
 * Accumulates without regard to direction, does not look for phased
 * registration names. Same as `accumulateDirectDispatchesSingle` but without
 * requiring that the `dispatchMarker` be the same as the dispatched ID.
 */function accumulateDispatches(inst,ignoredDirection,event){if(inst&&event&&event.dispatchConfig.registrationName){var registrationName=event.dispatchConfig.registrationName;var listener=getListener(inst,registrationName);if(listener){event._dispatchListeners=accumulateInto(event._dispatchListeners,listener);event._dispatchInstances=accumulateInto(event._dispatchInstances,inst);}}}/**
 * Accumulates dispatches on an `SyntheticEvent`, but only for the
 * `dispatchMarker`.
 * @param {SyntheticEvent} event
 */function accumulateDirectDispatchesSingle(event){if(event&&event.dispatchConfig.registrationName){accumulateDispatches(event._targetInst,null,event);}}function accumulateTwoPhaseDispatches(events){forEachAccumulated(events,accumulateTwoPhaseDispatchesSingle);}function accumulateTwoPhaseDispatchesSkipTarget(events){forEachAccumulated(events,accumulateTwoPhaseDispatchesSingleSkipTarget);}function accumulateEnterLeaveDispatches(leave,enter,from,to){traverseEnterLeave(from,to,accumulateDispatches,leave,enter);}function accumulateDirectDispatches(events){forEachAccumulated(events,accumulateDirectDispatchesSingle);}var EventPropagators=Object.freeze({accumulateTwoPhaseDispatches:accumulateTwoPhaseDispatches,accumulateTwoPhaseDispatchesSkipTarget:accumulateTwoPhaseDispatchesSkipTarget,accumulateEnterLeaveDispatches:accumulateEnterLeaveDispatches,accumulateDirectDispatches:accumulateDirectDispatches});// Do not uses the below two methods directly!
// Instead use constants exported from DOMTopLevelEventTypes in ReactDOM.
// (It is the only module that is allowed to access these methods.)
function unsafeCastStringToDOMTopLevelType(topLevelType){return topLevelType;}function unsafeCastDOMTopLevelTypeToString(topLevelType){return topLevelType;}/**
 * Generate a mapping of standard vendor prefixes using the defined style property and event name.
 *
 * @param {string} styleProp
 * @param {string} eventName
 * @returns {object}
 */function makePrefixMap(styleProp,eventName){var prefixes={};prefixes[styleProp.toLowerCase()]=eventName.toLowerCase();prefixes['Webkit'+styleProp]='webkit'+eventName;prefixes['Moz'+styleProp]='moz'+eventName;prefixes['ms'+styleProp]='MS'+eventName;prefixes['O'+styleProp]='o'+eventName.toLowerCase();return prefixes;}/**
 * A list of event names to a configurable list of vendor prefixes.
 */var vendorPrefixes={animationend:makePrefixMap('Animation','AnimationEnd'),animationiteration:makePrefixMap('Animation','AnimationIteration'),animationstart:makePrefixMap('Animation','AnimationStart'),transitionend:makePrefixMap('Transition','TransitionEnd')};/**
 * Event names that have already been detected and prefixed (if applicable).
 */var prefixedEventNames={};/**
 * Element to check for prefixes on.
 */var style={};/**
 * Bootstrap if a DOM exists.
 */if(ExecutionEnvironment.canUseDOM){style=document.createElement('div').style;// On some platforms, in particular some releases of Android 4.x,
// the un-prefixed "animation" and "transition" properties are defined on the
// style object but the events that fire will still be prefixed, so we need
// to check if the un-prefixed events are usable, and if not remove them from the map.
if(!('AnimationEvent'in window)){delete vendorPrefixes.animationend.animation;delete vendorPrefixes.animationiteration.animation;delete vendorPrefixes.animationstart.animation;}// Same as above
if(!('TransitionEvent'in window)){delete vendorPrefixes.transitionend.transition;}}/**
 * Attempts to determine the correct vendor prefixed event name.
 *
 * @param {string} eventName
 * @returns {string}
 */function getVendorPrefixedEventName(eventName){if(prefixedEventNames[eventName]){return prefixedEventNames[eventName];}else if(!vendorPrefixes[eventName]){return eventName;}var prefixMap=vendorPrefixes[eventName];for(var styleProp in prefixMap){if(prefixMap.hasOwnProperty(styleProp)&&styleProp in style){return prefixedEventNames[eventName]=prefixMap[styleProp];}}return eventName;}/**
 * To identify top level events in ReactDOM, we use constants defined by this
 * module. This is the only module that uses the unsafe* methods to express
 * that the constants actually correspond to the browser event names. This lets
 * us save some bundle size by avoiding a top level type -> event name map.
 * The rest of ReactDOM code should import top level types from this file.
 */var TOP_ABORT=unsafeCastStringToDOMTopLevelType('abort');var TOP_ANIMATION_END=unsafeCastStringToDOMTopLevelType(getVendorPrefixedEventName('animationend'));var TOP_ANIMATION_ITERATION=unsafeCastStringToDOMTopLevelType(getVendorPrefixedEventName('animationiteration'));var TOP_ANIMATION_START=unsafeCastStringToDOMTopLevelType(getVendorPrefixedEventName('animationstart'));var TOP_BLUR=unsafeCastStringToDOMTopLevelType('blur');var TOP_CAN_PLAY=unsafeCastStringToDOMTopLevelType('canplay');var TOP_CAN_PLAY_THROUGH=unsafeCastStringToDOMTopLevelType('canplaythrough');var TOP_CANCEL=unsafeCastStringToDOMTopLevelType('cancel');var TOP_CHANGE=unsafeCastStringToDOMTopLevelType('change');var TOP_CLICK=unsafeCastStringToDOMTopLevelType('click');var TOP_CLOSE=unsafeCastStringToDOMTopLevelType('close');var TOP_COMPOSITION_END=unsafeCastStringToDOMTopLevelType('compositionend');var TOP_COMPOSITION_START=unsafeCastStringToDOMTopLevelType('compositionstart');var TOP_COMPOSITION_UPDATE=unsafeCastStringToDOMTopLevelType('compositionupdate');var TOP_CONTEXT_MENU=unsafeCastStringToDOMTopLevelType('contextmenu');var TOP_COPY=unsafeCastStringToDOMTopLevelType('copy');var TOP_CUT=unsafeCastStringToDOMTopLevelType('cut');var TOP_DOUBLE_CLICK=unsafeCastStringToDOMTopLevelType('dblclick');var TOP_DRAG=unsafeCastStringToDOMTopLevelType('drag');var TOP_DRAG_END=unsafeCastStringToDOMTopLevelType('dragend');var TOP_DRAG_ENTER=unsafeCastStringToDOMTopLevelType('dragenter');var TOP_DRAG_EXIT=unsafeCastStringToDOMTopLevelType('dragexit');var TOP_DRAG_LEAVE=unsafeCastStringToDOMTopLevelType('dragleave');var TOP_DRAG_OVER=unsafeCastStringToDOMTopLevelType('dragover');var TOP_DRAG_START=unsafeCastStringToDOMTopLevelType('dragstart');var TOP_DROP=unsafeCastStringToDOMTopLevelType('drop');var TOP_DURATION_CHANGE=unsafeCastStringToDOMTopLevelType('durationchange');var TOP_EMPTIED=unsafeCastStringToDOMTopLevelType('emptied');var TOP_ENCRYPTED=unsafeCastStringToDOMTopLevelType('encrypted');var TOP_ENDED=unsafeCastStringToDOMTopLevelType('ended');var TOP_ERROR=unsafeCastStringToDOMTopLevelType('error');var TOP_FOCUS=unsafeCastStringToDOMTopLevelType('focus');var TOP_GOT_POINTER_CAPTURE=unsafeCastStringToDOMTopLevelType('gotpointercapture');var TOP_INPUT=unsafeCastStringToDOMTopLevelType('input');var TOP_INVALID=unsafeCastStringToDOMTopLevelType('invalid');var TOP_KEY_DOWN=unsafeCastStringToDOMTopLevelType('keydown');var TOP_KEY_PRESS=unsafeCastStringToDOMTopLevelType('keypress');var TOP_KEY_UP=unsafeCastStringToDOMTopLevelType('keyup');var TOP_LOAD=unsafeCastStringToDOMTopLevelType('load');var TOP_LOAD_START=unsafeCastStringToDOMTopLevelType('loadstart');var TOP_LOADED_DATA=unsafeCastStringToDOMTopLevelType('loadeddata');var TOP_LOADED_METADATA=unsafeCastStringToDOMTopLevelType('loadedmetadata');var TOP_LOST_POINTER_CAPTURE=unsafeCastStringToDOMTopLevelType('lostpointercapture');var TOP_MOUSE_DOWN=unsafeCastStringToDOMTopLevelType('mousedown');var TOP_MOUSE_MOVE=unsafeCastStringToDOMTopLevelType('mousemove');var TOP_MOUSE_OUT=unsafeCastStringToDOMTopLevelType('mouseout');var TOP_MOUSE_OVER=unsafeCastStringToDOMTopLevelType('mouseover');var TOP_MOUSE_UP=unsafeCastStringToDOMTopLevelType('mouseup');var TOP_PASTE=unsafeCastStringToDOMTopLevelType('paste');var TOP_PAUSE=unsafeCastStringToDOMTopLevelType('pause');var TOP_PLAY=unsafeCastStringToDOMTopLevelType('play');var TOP_PLAYING=unsafeCastStringToDOMTopLevelType('playing');var TOP_POINTER_CANCEL=unsafeCastStringToDOMTopLevelType('pointercancel');var TOP_POINTER_DOWN=unsafeCastStringToDOMTopLevelType('pointerdown');var TOP_POINTER_MOVE=unsafeCastStringToDOMTopLevelType('pointermove');var TOP_POINTER_OUT=unsafeCastStringToDOMTopLevelType('pointerout');var TOP_POINTER_OVER=unsafeCastStringToDOMTopLevelType('pointerover');var TOP_POINTER_UP=unsafeCastStringToDOMTopLevelType('pointerup');var TOP_PROGRESS=unsafeCastStringToDOMTopLevelType('progress');var TOP_RATE_CHANGE=unsafeCastStringToDOMTopLevelType('ratechange');var TOP_RESET=unsafeCastStringToDOMTopLevelType('reset');var TOP_SCROLL=unsafeCastStringToDOMTopLevelType('scroll');var TOP_SEEKED=unsafeCastStringToDOMTopLevelType('seeked');var TOP_SEEKING=unsafeCastStringToDOMTopLevelType('seeking');var TOP_SELECTION_CHANGE=unsafeCastStringToDOMTopLevelType('selectionchange');var TOP_STALLED=unsafeCastStringToDOMTopLevelType('stalled');var TOP_SUBMIT=unsafeCastStringToDOMTopLevelType('submit');var TOP_SUSPEND=unsafeCastStringToDOMTopLevelType('suspend');var TOP_TEXT_INPUT=unsafeCastStringToDOMTopLevelType('textInput');var TOP_TIME_UPDATE=unsafeCastStringToDOMTopLevelType('timeupdate');var TOP_TOGGLE=unsafeCastStringToDOMTopLevelType('toggle');var TOP_TOUCH_CANCEL=unsafeCastStringToDOMTopLevelType('touchcancel');var TOP_TOUCH_END=unsafeCastStringToDOMTopLevelType('touchend');var TOP_TOUCH_MOVE=unsafeCastStringToDOMTopLevelType('touchmove');var TOP_TOUCH_START=unsafeCastStringToDOMTopLevelType('touchstart');var TOP_TRANSITION_END=unsafeCastStringToDOMTopLevelType(getVendorPrefixedEventName('transitionend'));var TOP_VOLUME_CHANGE=unsafeCastStringToDOMTopLevelType('volumechange');var TOP_WAITING=unsafeCastStringToDOMTopLevelType('waiting');var TOP_WHEEL=unsafeCastStringToDOMTopLevelType('wheel');// List of events that need to be individually attached to media elements.
// Note that events in this list will *not* be listened to at the top level
// unless they're explicitly whitelisted in `ReactBrowserEventEmitter.listenTo`.
var mediaEventTypes=[TOP_ABORT,TOP_CAN_PLAY,TOP_CAN_PLAY_THROUGH,TOP_DURATION_CHANGE,TOP_EMPTIED,TOP_ENCRYPTED,TOP_ENDED,TOP_ERROR,TOP_LOADED_DATA,TOP_LOADED_METADATA,TOP_LOAD_START,TOP_PAUSE,TOP_PLAY,TOP_PLAYING,TOP_PROGRESS,TOP_RATE_CHANGE,TOP_SEEKED,TOP_SEEKING,TOP_STALLED,TOP_SUSPEND,TOP_TIME_UPDATE,TOP_VOLUME_CHANGE,TOP_WAITING];function getRawEventName(topLevelType){return unsafeCastDOMTopLevelTypeToString(topLevelType);}var contentKey=null;/**
 * Gets the key used to access text content on a DOM node.
 *
 * @return {?string} Key used to access text content.
 * @internal
 */function getTextContentAccessor(){if(!contentKey&&ExecutionEnvironment.canUseDOM){// Prefer textContent to innerText because many browsers support both but
// SVG <text> elements don't support innerText even when <div> does.
contentKey='textContent'in document.documentElement?'textContent':'innerText';}return contentKey;}/**
 * This helper object stores information about text content of a target node,
 * allowing comparison of content before and after a given event.
 *
 * Identify the node where selection currently begins, then observe
 * both its text content and its current position in the DOM. Since the
 * browser may natively replace the target node during composition, we can
 * use its position to find its replacement.
 *
 *
 */var compositionState={_root:null,_startText:null,_fallbackText:null};function initialize(nativeEventTarget){compositionState._root=nativeEventTarget;compositionState._startText=getText();return true;}function reset(){compositionState._root=null;compositionState._startText=null;compositionState._fallbackText=null;}function getData(){if(compositionState._fallbackText){return compositionState._fallbackText;}var start=void 0;var startValue=compositionState._startText;var startLength=startValue.length;var end=void 0;var endValue=getText();var endLength=endValue.length;for(start=0;start<startLength;start++){if(startValue[start]!==endValue[start]){break;}}var minEnd=startLength-start;for(end=1;end<=minEnd;end++){if(startValue[startLength-end]!==endValue[endLength-end]){break;}}var sliceTail=end>1?1-end:undefined;compositionState._fallbackText=endValue.slice(start,sliceTail);return compositionState._fallbackText;}function getText(){if('value'in compositionState._root){return compositionState._root.value;}return compositionState._root[getTextContentAccessor()];}/* eslint valid-typeof: 0 */var didWarnForAddedNewProperty=false;var EVENT_POOL_SIZE=10;var shouldBeReleasedProperties=['dispatchConfig','_targetInst','nativeEvent','isDefaultPrevented','isPropagationStopped','_dispatchListeners','_dispatchInstances'];/**
 * @interface Event
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */var EventInterface={type:null,target:null,// currentTarget is set when dispatching; no use in copying it here
currentTarget:emptyFunction.thatReturnsNull,eventPhase:null,bubbles:null,cancelable:null,timeStamp:function timeStamp(event){return event.timeStamp||Date.now();},defaultPrevented:null,isTrusted:null};/**
 * Synthetic events are dispatched by event plugins, typically in response to a
 * top-level event delegation handler.
 *
 * These systems should generally use pooling to reduce the frequency of garbage
 * collection. The system should check `isPersistent` to determine whether the
 * event should be released into the pool after being dispatched. Users that
 * need a persisted event should invoke `persist`.
 *
 * Synthetic events (and subclasses) implement the DOM Level 3 Events API by
 * normalizing browser quirks. Subclasses do not necessarily have to implement a
 * DOM interface; custom application-specific events can also subclass this.
 *
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {*} targetInst Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @param {DOMEventTarget} nativeEventTarget Target node.
 */function SyntheticEvent(dispatchConfig,targetInst,nativeEvent,nativeEventTarget){{// these have a getter/setter for warnings
delete this.nativeEvent;delete this.preventDefault;delete this.stopPropagation;}this.dispatchConfig=dispatchConfig;this._targetInst=targetInst;this.nativeEvent=nativeEvent;var Interface=this.constructor.Interface;for(var propName in Interface){if(!Interface.hasOwnProperty(propName)){continue;}{delete this[propName];// this has a getter/setter for warnings
}var normalize=Interface[propName];if(normalize){this[propName]=normalize(nativeEvent);}else{if(propName==='target'){this.target=nativeEventTarget;}else{this[propName]=nativeEvent[propName];}}}var defaultPrevented=nativeEvent.defaultPrevented!=null?nativeEvent.defaultPrevented:nativeEvent.returnValue===false;if(defaultPrevented){this.isDefaultPrevented=emptyFunction.thatReturnsTrue;}else{this.isDefaultPrevented=emptyFunction.thatReturnsFalse;}this.isPropagationStopped=emptyFunction.thatReturnsFalse;return this;}_assign(SyntheticEvent.prototype,{preventDefault:function preventDefault(){this.defaultPrevented=true;var event=this.nativeEvent;if(!event){return;}if(event.preventDefault){event.preventDefault();}else if(typeof event.returnValue!=='unknown'){event.returnValue=false;}this.isDefaultPrevented=emptyFunction.thatReturnsTrue;},stopPropagation:function stopPropagation(){var event=this.nativeEvent;if(!event){return;}if(event.stopPropagation){event.stopPropagation();}else if(typeof event.cancelBubble!=='unknown'){// The ChangeEventPlugin registers a "propertychange" event for
// IE. This event does not support bubbling or cancelling, and
// any references to cancelBubble throw "Member not found".  A
// typeof check of "unknown" circumvents this issue (and is also
// IE specific).
event.cancelBubble=true;}this.isPropagationStopped=emptyFunction.thatReturnsTrue;},/**
   * We release all dispatched `SyntheticEvent`s after each event loop, adding
   * them back into the pool. This allows a way to hold onto a reference that
   * won't be added back into the pool.
   */persist:function persist(){this.isPersistent=emptyFunction.thatReturnsTrue;},/**
   * Checks if this event should be released back into the pool.
   *
   * @return {boolean} True if this should not be released, false otherwise.
   */isPersistent:emptyFunction.thatReturnsFalse,/**
   * `PooledClass` looks for `destructor` on each instance it releases.
   */destructor:function destructor(){var Interface=this.constructor.Interface;for(var propName in Interface){{Object.defineProperty(this,propName,getPooledWarningPropertyDefinition(propName,Interface[propName]));}}for(var i=0;i<shouldBeReleasedProperties.length;i++){this[shouldBeReleasedProperties[i]]=null;}{Object.defineProperty(this,'nativeEvent',getPooledWarningPropertyDefinition('nativeEvent',null));Object.defineProperty(this,'preventDefault',getPooledWarningPropertyDefinition('preventDefault',emptyFunction));Object.defineProperty(this,'stopPropagation',getPooledWarningPropertyDefinition('stopPropagation',emptyFunction));}}});SyntheticEvent.Interface=EventInterface;/**
 * Helper to reduce boilerplate when creating subclasses.
 */SyntheticEvent.extend=function(Interface){var Super=this;var E=function E(){};E.prototype=Super.prototype;var prototype=new E();function Class(){return Super.apply(this,arguments);}_assign(prototype,Class.prototype);Class.prototype=prototype;Class.prototype.constructor=Class;Class.Interface=_assign({},Super.Interface,Interface);Class.extend=Super.extend;addEventPoolingTo(Class);return Class;};/** Proxying after everything set on SyntheticEvent
 * to resolve Proxy issue on some WebKit browsers
 * in which some Event properties are set to undefined (GH#10010)
 */{var isProxySupported=typeof Proxy==='function'&&// https://github.com/facebook/react/issues/12011
!Object.isSealed(new Proxy({},{}));if(isProxySupported){/*eslint-disable no-func-assign */SyntheticEvent=new Proxy(SyntheticEvent,{construct:function construct(target,args){return this.apply(target,Object.create(target.prototype),args);},apply:function apply(constructor,that,args){return new Proxy(constructor.apply(that,args),{set:function set(target,prop,value){if(prop!=='isPersistent'&&!target.constructor.Interface.hasOwnProperty(prop)&&shouldBeReleasedProperties.indexOf(prop)===-1){!(didWarnForAddedNewProperty||target.isPersistent())?warning(false,"This synthetic event is reused for performance reasons. If you're "+"seeing this, you're adding a new property in the synthetic event object. "+'The property is never released. See '+'https://fb.me/react-event-pooling for more information.'):void 0;didWarnForAddedNewProperty=true;}target[prop]=value;return true;}});}});/*eslint-enable no-func-assign */}}addEventPoolingTo(SyntheticEvent);/**
 * Helper to nullify syntheticEvent instance properties when destructing
 *
 * @param {String} propName
 * @param {?object} getVal
 * @return {object} defineProperty object
 */function getPooledWarningPropertyDefinition(propName,getVal){var isFunction=typeof getVal==='function';return{configurable:true,set:set,get:get};function set(val){var action=isFunction?'setting the method':'setting the property';warn(action,'This is effectively a no-op');return val;}function get(){var action=isFunction?'accessing the method':'accessing the property';var result=isFunction?'This is a no-op function':'This is set to null';warn(action,result);return getVal;}function warn(action,result){var warningCondition=false;!warningCondition?warning(false,"This synthetic event is reused for performance reasons. If you're seeing this, "+"you're %s `%s` on a released/nullified synthetic event. %s. "+'If you must keep the original synthetic event around, use event.persist(). '+'See https://fb.me/react-event-pooling for more information.',action,propName,result):void 0;}}function getPooledEvent(dispatchConfig,targetInst,nativeEvent,nativeInst){var EventConstructor=this;if(EventConstructor.eventPool.length){var instance=EventConstructor.eventPool.pop();EventConstructor.call(instance,dispatchConfig,targetInst,nativeEvent,nativeInst);return instance;}return new EventConstructor(dispatchConfig,targetInst,nativeEvent,nativeInst);}function releasePooledEvent(event){var EventConstructor=this;!(event instanceof EventConstructor)?invariant(false,'Trying to release an event instance  into a pool of a different type.'):void 0;event.destructor();if(EventConstructor.eventPool.length<EVENT_POOL_SIZE){EventConstructor.eventPool.push(event);}}function addEventPoolingTo(EventConstructor){EventConstructor.eventPool=[];EventConstructor.getPooled=getPooledEvent;EventConstructor.release=releasePooledEvent;}var SyntheticEvent$1=SyntheticEvent;/**
 * @interface Event
 * @see http://www.w3.org/TR/DOM-Level-3-Events/#events-compositionevents
 */var SyntheticCompositionEvent=SyntheticEvent$1.extend({data:null});/**
 * @interface Event
 * @see http://www.w3.org/TR/2013/WD-DOM-Level-3-Events-20131105
 *      /#events-inputevents
 */var SyntheticInputEvent=SyntheticEvent$1.extend({data:null});var END_KEYCODES=[9,13,27,32];// Tab, Return, Esc, Space
var START_KEYCODE=229;var canUseCompositionEvent=ExecutionEnvironment.canUseDOM&&'CompositionEvent'in window;var documentMode=null;if(ExecutionEnvironment.canUseDOM&&'documentMode'in document){documentMode=document.documentMode;}// Webkit offers a very useful `textInput` event that can be used to
// directly represent `beforeInput`. The IE `textinput` event is not as
// useful, so we don't use it.
var canUseTextInputEvent=ExecutionEnvironment.canUseDOM&&'TextEvent'in window&&!documentMode;// In IE9+, we have access to composition events, but the data supplied
// by the native compositionend event may be incorrect. Japanese ideographic
// spaces, for instance (\u3000) are not recorded correctly.
var useFallbackCompositionData=ExecutionEnvironment.canUseDOM&&(!canUseCompositionEvent||documentMode&&documentMode>8&&documentMode<=11);var SPACEBAR_CODE=32;var SPACEBAR_CHAR=String.fromCharCode(SPACEBAR_CODE);// Events and their corresponding property names.
var eventTypes={beforeInput:{phasedRegistrationNames:{bubbled:'onBeforeInput',captured:'onBeforeInputCapture'},dependencies:[TOP_COMPOSITION_END,TOP_KEY_PRESS,TOP_TEXT_INPUT,TOP_PASTE]},compositionEnd:{phasedRegistrationNames:{bubbled:'onCompositionEnd',captured:'onCompositionEndCapture'},dependencies:[TOP_BLUR,TOP_COMPOSITION_END,TOP_KEY_DOWN,TOP_KEY_PRESS,TOP_KEY_UP,TOP_MOUSE_DOWN]},compositionStart:{phasedRegistrationNames:{bubbled:'onCompositionStart',captured:'onCompositionStartCapture'},dependencies:[TOP_BLUR,TOP_COMPOSITION_START,TOP_KEY_DOWN,TOP_KEY_PRESS,TOP_KEY_UP,TOP_MOUSE_DOWN]},compositionUpdate:{phasedRegistrationNames:{bubbled:'onCompositionUpdate',captured:'onCompositionUpdateCapture'},dependencies:[TOP_BLUR,TOP_COMPOSITION_UPDATE,TOP_KEY_DOWN,TOP_KEY_PRESS,TOP_KEY_UP,TOP_MOUSE_DOWN]}};// Track whether we've ever handled a keypress on the space key.
var hasSpaceKeypress=false;/**
 * Return whether a native keypress event is assumed to be a command.
 * This is required because Firefox fires `keypress` events for key commands
 * (cut, copy, select-all, etc.) even though no character is inserted.
 */function isKeypressCommand(nativeEvent){return(nativeEvent.ctrlKey||nativeEvent.altKey||nativeEvent.metaKey)&&// ctrlKey && altKey is equivalent to AltGr, and is not a command.
!(nativeEvent.ctrlKey&&nativeEvent.altKey);}/**
 * Translate native top level events into event types.
 *
 * @param {string} topLevelType
 * @return {object}
 */function getCompositionEventType(topLevelType){switch(topLevelType){case TOP_COMPOSITION_START:return eventTypes.compositionStart;case TOP_COMPOSITION_END:return eventTypes.compositionEnd;case TOP_COMPOSITION_UPDATE:return eventTypes.compositionUpdate;}}/**
 * Does our fallback best-guess model think this event signifies that
 * composition has begun?
 *
 * @param {string} topLevelType
 * @param {object} nativeEvent
 * @return {boolean}
 */function isFallbackCompositionStart(topLevelType,nativeEvent){return topLevelType===TOP_KEY_DOWN&&nativeEvent.keyCode===START_KEYCODE;}/**
 * Does our fallback mode think that this event is the end of composition?
 *
 * @param {string} topLevelType
 * @param {object} nativeEvent
 * @return {boolean}
 */function isFallbackCompositionEnd(topLevelType,nativeEvent){switch(topLevelType){case TOP_KEY_UP:// Command keys insert or clear IME input.
return END_KEYCODES.indexOf(nativeEvent.keyCode)!==-1;case TOP_KEY_DOWN:// Expect IME keyCode on each keydown. If we get any other
// code we must have exited earlier.
return nativeEvent.keyCode!==START_KEYCODE;case TOP_KEY_PRESS:case TOP_MOUSE_DOWN:case TOP_BLUR:// Events are not possible without cancelling IME.
return true;default:return false;}}/**
 * Google Input Tools provides composition data via a CustomEvent,
 * with the `data` property populated in the `detail` object. If this
 * is available on the event object, use it. If not, this is a plain
 * composition event and we have nothing special to extract.
 *
 * @param {object} nativeEvent
 * @return {?string}
 */function getDataFromCustomEvent(nativeEvent){var detail=nativeEvent.detail;if((typeof detail==='undefined'?'undefined':_typeof(detail))==='object'&&'data'in detail){return detail.data;}return null;}// Track the current IME composition status, if any.
var isComposing=false;/**
 * @return {?object} A SyntheticCompositionEvent.
 */function extractCompositionEvent(topLevelType,targetInst,nativeEvent,nativeEventTarget){var eventType=void 0;var fallbackData=void 0;if(canUseCompositionEvent){eventType=getCompositionEventType(topLevelType);}else if(!isComposing){if(isFallbackCompositionStart(topLevelType,nativeEvent)){eventType=eventTypes.compositionStart;}}else if(isFallbackCompositionEnd(topLevelType,nativeEvent)){eventType=eventTypes.compositionEnd;}if(!eventType){return null;}if(useFallbackCompositionData){// The current composition is stored statically and must not be
// overwritten while composition continues.
if(!isComposing&&eventType===eventTypes.compositionStart){isComposing=initialize(nativeEventTarget);}else if(eventType===eventTypes.compositionEnd){if(isComposing){fallbackData=getData();}}}var event=SyntheticCompositionEvent.getPooled(eventType,targetInst,nativeEvent,nativeEventTarget);if(fallbackData){// Inject data generated from fallback path into the synthetic event.
// This matches the property of native CompositionEventInterface.
event.data=fallbackData;}else{var customData=getDataFromCustomEvent(nativeEvent);if(customData!==null){event.data=customData;}}accumulateTwoPhaseDispatches(event);return event;}/**
 * @param {TopLevelType} topLevelType Number from `TopLevelType`.
 * @param {object} nativeEvent Native browser event.
 * @return {?string} The string corresponding to this `beforeInput` event.
 */function getNativeBeforeInputChars(topLevelType,nativeEvent){switch(topLevelType){case TOP_COMPOSITION_END:return getDataFromCustomEvent(nativeEvent);case TOP_KEY_PRESS:/**
       * If native `textInput` events are available, our goal is to make
       * use of them. However, there is a special case: the spacebar key.
       * In Webkit, preventing default on a spacebar `textInput` event
       * cancels character insertion, but it *also* causes the browser
       * to fall back to its default spacebar behavior of scrolling the
       * page.
       *
       * Tracking at:
       * https://code.google.com/p/chromium/issues/detail?id=355103
       *
       * To avoid this issue, use the keypress event as if no `textInput`
       * event is available.
       */var which=nativeEvent.which;if(which!==SPACEBAR_CODE){return null;}hasSpaceKeypress=true;return SPACEBAR_CHAR;case TOP_TEXT_INPUT:// Record the characters to be added to the DOM.
var chars=nativeEvent.data;// If it's a spacebar character, assume that we have already handled
// it at the keypress level and bail immediately. Android Chrome
// doesn't give us keycodes, so we need to blacklist it.
if(chars===SPACEBAR_CHAR&&hasSpaceKeypress){return null;}return chars;default:// For other native event types, do nothing.
return null;}}/**
 * For browsers that do not provide the `textInput` event, extract the
 * appropriate string to use for SyntheticInputEvent.
 *
 * @param {number} topLevelType Number from `TopLevelEventTypes`.
 * @param {object} nativeEvent Native browser event.
 * @return {?string} The fallback string for this `beforeInput` event.
 */function getFallbackBeforeInputChars(topLevelType,nativeEvent){// If we are currently composing (IME) and using a fallback to do so,
// try to extract the composed characters from the fallback object.
// If composition event is available, we extract a string only at
// compositionevent, otherwise extract it at fallback events.
if(isComposing){if(topLevelType===TOP_COMPOSITION_END||!canUseCompositionEvent&&isFallbackCompositionEnd(topLevelType,nativeEvent)){var chars=getData();reset();isComposing=false;return chars;}return null;}switch(topLevelType){case TOP_PASTE:// If a paste event occurs after a keypress, throw out the input
// chars. Paste events should not lead to BeforeInput events.
return null;case TOP_KEY_PRESS:/**
       * As of v27, Firefox may fire keypress events even when no character
       * will be inserted. A few possibilities:
       *
       * - `which` is `0`. Arrow keys, Esc key, etc.
       *
       * - `which` is the pressed key code, but no char is available.
       *   Ex: 'AltGr + d` in Polish. There is no modified character for
       *   this key combination and no character is inserted into the
       *   document, but FF fires the keypress for char code `100` anyway.
       *   No `input` event will occur.
       *
       * - `which` is the pressed key code, but a command combination is
       *   being used. Ex: `Cmd+C`. No character is inserted, and no
       *   `input` event will occur.
       */if(!isKeypressCommand(nativeEvent)){// IE fires the `keypress` event when a user types an emoji via
// Touch keyboard of Windows.  In such a case, the `char` property
// holds an emoji character like `\uD83D\uDE0A`.  Because its length
// is 2, the property `which` does not represent an emoji correctly.
// In such a case, we directly return the `char` property instead of
// using `which`.
if(nativeEvent.char&&nativeEvent.char.length>1){return nativeEvent.char;}else if(nativeEvent.which){return String.fromCharCode(nativeEvent.which);}}return null;case TOP_COMPOSITION_END:return useFallbackCompositionData?null:nativeEvent.data;default:return null;}}/**
 * Extract a SyntheticInputEvent for `beforeInput`, based on either native
 * `textInput` or fallback behavior.
 *
 * @return {?object} A SyntheticInputEvent.
 */function extractBeforeInputEvent(topLevelType,targetInst,nativeEvent,nativeEventTarget){var chars=void 0;if(canUseTextInputEvent){chars=getNativeBeforeInputChars(topLevelType,nativeEvent);}else{chars=getFallbackBeforeInputChars(topLevelType,nativeEvent);}// If no characters are being inserted, no BeforeInput event should
// be fired.
if(!chars){return null;}var event=SyntheticInputEvent.getPooled(eventTypes.beforeInput,targetInst,nativeEvent,nativeEventTarget);event.data=chars;accumulateTwoPhaseDispatches(event);return event;}/**
 * Create an `onBeforeInput` event to match
 * http://www.w3.org/TR/2013/WD-DOM-Level-3-Events-20131105/#events-inputevents.
 *
 * This event plugin is based on the native `textInput` event
 * available in Chrome, Safari, Opera, and IE. This event fires after
 * `onKeyPress` and `onCompositionEnd`, but before `onInput`.
 *
 * `beforeInput` is spec'd but not implemented in any browsers, and
 * the `input` event does not provide any useful information about what has
 * actually been added, contrary to the spec. Thus, `textInput` is the best
 * available event to identify the characters that have actually been inserted
 * into the target node.
 *
 * This plugin is also responsible for emitting `composition` events, thus
 * allowing us to share composition fallback code for both `beforeInput` and
 * `composition` event types.
 */var BeforeInputEventPlugin={eventTypes:eventTypes,extractEvents:function extractEvents(topLevelType,targetInst,nativeEvent,nativeEventTarget){var composition=extractCompositionEvent(topLevelType,targetInst,nativeEvent,nativeEventTarget);var beforeInput=extractBeforeInputEvent(topLevelType,targetInst,nativeEvent,nativeEventTarget);if(composition===null){return beforeInput;}if(beforeInput===null){return composition;}return[composition,beforeInput];}};// Use to restore controlled state after a change event has fired.
var fiberHostComponent=null;var ReactControlledComponentInjection={injectFiberControlledHostComponent:function injectFiberControlledHostComponent(hostComponentImpl){// The fiber implementation doesn't use dynamic dispatch so we need to
// inject the implementation.
fiberHostComponent=hostComponentImpl;}};var restoreTarget=null;var restoreQueue=null;function restoreStateOfTarget(target){// We perform this translation at the end of the event loop so that we
// always receive the correct fiber here
var internalInstance=getInstanceFromNode(target);if(!internalInstance){// Unmounted
return;}!(fiberHostComponent&&typeof fiberHostComponent.restoreControlledState==='function')?invariant(false,'Fiber needs to be injected to handle a fiber target for controlled events. This error is likely caused by a bug in React. Please file an issue.'):void 0;var props=getFiberCurrentPropsFromNode(internalInstance.stateNode);fiberHostComponent.restoreControlledState(internalInstance.stateNode,internalInstance.type,props);}var injection$2=ReactControlledComponentInjection;function enqueueStateRestore(target){if(restoreTarget){if(restoreQueue){restoreQueue.push(target);}else{restoreQueue=[target];}}else{restoreTarget=target;}}function needsStateRestore(){return restoreTarget!==null||restoreQueue!==null;}function restoreStateIfNeeded(){if(!restoreTarget){return;}var target=restoreTarget;var queuedTargets=restoreQueue;restoreTarget=null;restoreQueue=null;restoreStateOfTarget(target);if(queuedTargets){for(var i=0;i<queuedTargets.length;i++){restoreStateOfTarget(queuedTargets[i]);}}}var ReactControlledComponent=Object.freeze({injection:injection$2,enqueueStateRestore:enqueueStateRestore,needsStateRestore:needsStateRestore,restoreStateIfNeeded:restoreStateIfNeeded});// Used as a way to call batchedUpdates when we don't have a reference to
// the renderer. Such as when we're dispatching events or if third party
// libraries need to call batchedUpdates. Eventually, this API will go away when
// everything is batched by default. We'll then have a similar API to opt-out of
// scheduled work and instead do synchronous work.
// Defaults
var _batchedUpdates=function _batchedUpdates(fn,bookkeeping){return fn(bookkeeping);};var _interactiveUpdates=function _interactiveUpdates(fn,a,b){return fn(a,b);};var _flushInteractiveUpdates=function _flushInteractiveUpdates(){};var isBatching=false;function batchedUpdates(fn,bookkeeping){if(isBatching){// If we are currently inside another batch, we need to wait until it
// fully completes before restoring state.
return fn(bookkeeping);}isBatching=true;try{return _batchedUpdates(fn,bookkeeping);}finally{// Here we wait until all updates have propagated, which is important
// when using controlled components within layers:
// https://github.com/facebook/react/issues/1698
// Then we restore state of any controlled component.
isBatching=false;var controlledComponentsHavePendingUpdates=needsStateRestore();if(controlledComponentsHavePendingUpdates){// If a controlled event was fired, we may need to restore the state of
// the DOM node back to the controlled value. This is necessary when React
// bails out of the update without touching the DOM.
_flushInteractiveUpdates();restoreStateIfNeeded();}}}function interactiveUpdates(fn,a,b){return _interactiveUpdates(fn,a,b);}var injection$3={injectRenderer:function injectRenderer(renderer){_batchedUpdates=renderer.batchedUpdates;_interactiveUpdates=renderer.interactiveUpdates;_flushInteractiveUpdates=renderer.flushInteractiveUpdates;}};/**
 * @see http://www.whatwg.org/specs/web-apps/current-work/multipage/the-input-element.html#input-type-attr-summary
 */var supportedInputTypes={color:true,date:true,datetime:true,'datetime-local':true,email:true,month:true,number:true,password:true,range:true,search:true,tel:true,text:true,time:true,url:true,week:true};function isTextInputElement(elem){var nodeName=elem&&elem.nodeName&&elem.nodeName.toLowerCase();if(nodeName==='input'){return!!supportedInputTypes[elem.type];}if(nodeName==='textarea'){return true;}return false;}/**
 * HTML nodeType values that represent the type of the node
 */var ELEMENT_NODE=1;var TEXT_NODE=3;var COMMENT_NODE=8;var DOCUMENT_NODE=9;var DOCUMENT_FRAGMENT_NODE=11;/**
 * Gets the target node from a native browser event by accounting for
 * inconsistencies in browser DOM APIs.
 *
 * @param {object} nativeEvent Native browser event.
 * @return {DOMEventTarget} Target node.
 */function getEventTarget(nativeEvent){var target=nativeEvent.target||window;// Normalize SVG <use> element events #4963
if(target.correspondingUseElement){target=target.correspondingUseElement;}// Safari may fire events on text nodes (Node.TEXT_NODE is 3).
// @see http://www.quirksmode.org/js/events_properties.html
return target.nodeType===TEXT_NODE?target.parentNode:target;}/**
 * Checks if an event is supported in the current execution environment.
 *
 * NOTE: This will not work correctly for non-generic events such as `change`,
 * `reset`, `load`, `error`, and `select`.
 *
 * Borrows from Modernizr.
 *
 * @param {string} eventNameSuffix Event name, e.g. "click".
 * @param {?boolean} capture Check if the capture phase is supported.
 * @return {boolean} True if the event is supported.
 * @internal
 * @license Modernizr 3.0.0pre (Custom Build) | MIT
 */function isEventSupported(eventNameSuffix,capture){if(!ExecutionEnvironment.canUseDOM||capture&&!('addEventListener'in document)){return false;}var eventName='on'+eventNameSuffix;var isSupported=eventName in document;if(!isSupported){var element=document.createElement('div');element.setAttribute(eventName,'return;');isSupported=typeof element[eventName]==='function';}return isSupported;}function isCheckable(elem){var type=elem.type;var nodeName=elem.nodeName;return nodeName&&nodeName.toLowerCase()==='input'&&(type==='checkbox'||type==='radio');}function getTracker(node){return node._valueTracker;}function detachTracker(node){node._valueTracker=null;}function getValueFromNode(node){var value='';if(!node){return value;}if(isCheckable(node)){value=node.checked?'true':'false';}else{value=node.value;}return value;}function trackValueOnNode(node){var valueField=isCheckable(node)?'checked':'value';var descriptor=Object.getOwnPropertyDescriptor(node.constructor.prototype,valueField);var currentValue=''+node[valueField];// if someone has already defined a value or Safari, then bail
// and don't track value will cause over reporting of changes,
// but it's better then a hard failure
// (needed for certain tests that spyOn input values and Safari)
if(node.hasOwnProperty(valueField)||typeof descriptor==='undefined'||typeof descriptor.get!=='function'||typeof descriptor.set!=='function'){return;}var _get=descriptor.get,_set=descriptor.set;Object.defineProperty(node,valueField,{configurable:true,get:function get(){return _get.call(this);},set:function set(value){currentValue=''+value;_set.call(this,value);}});// We could've passed this the first time
// but it triggers a bug in IE11 and Edge 14/15.
// Calling defineProperty() again should be equivalent.
// https://github.com/facebook/react/issues/11768
Object.defineProperty(node,valueField,{enumerable:descriptor.enumerable});var tracker={getValue:function getValue(){return currentValue;},setValue:function setValue(value){currentValue=''+value;},stopTracking:function stopTracking(){detachTracker(node);delete node[valueField];}};return tracker;}function track(node){if(getTracker(node)){return;}// TODO: Once it's just Fiber we can move this to node._wrapperState
node._valueTracker=trackValueOnNode(node);}function updateValueIfChanged(node){if(!node){return false;}var tracker=getTracker(node);// if there is no tracker at this point it's unlikely
// that trying again will succeed
if(!tracker){return true;}var lastValue=tracker.getValue();var nextValue=getValueFromNode(node);if(nextValue!==lastValue){tracker.setValue(nextValue);return true;}return false;}var ReactInternals=React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;var ReactCurrentOwner=ReactInternals.ReactCurrentOwner;var ReactDebugCurrentFrame=ReactInternals.ReactDebugCurrentFrame;var describeComponentFrame=function describeComponentFrame(name,source,ownerName){return'\n    in '+(name||'Unknown')+(source?' (at '+source.fileName.replace(/^.*[\\\/]/,'')+':'+source.lineNumber+')':ownerName?' (created by '+ownerName+')':'');};// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol=typeof Symbol==='function'&&Symbol.for;var REACT_ELEMENT_TYPE=hasSymbol?Symbol.for('react.element'):0xeac7;var REACT_PORTAL_TYPE=hasSymbol?Symbol.for('react.portal'):0xeaca;var REACT_FRAGMENT_TYPE=hasSymbol?Symbol.for('react.fragment'):0xeacb;var REACT_STRICT_MODE_TYPE=hasSymbol?Symbol.for('react.strict_mode'):0xeacc;var REACT_PROFILER_TYPE=hasSymbol?Symbol.for('react.profiler'):0xead2;var REACT_PROVIDER_TYPE=hasSymbol?Symbol.for('react.provider'):0xeacd;var REACT_CONTEXT_TYPE=hasSymbol?Symbol.for('react.context'):0xeace;var REACT_ASYNC_MODE_TYPE=hasSymbol?Symbol.for('react.async_mode'):0xeacf;var REACT_FORWARD_REF_TYPE=hasSymbol?Symbol.for('react.forward_ref'):0xead0;var REACT_TIMEOUT_TYPE=hasSymbol?Symbol.for('react.timeout'):0xead1;var MAYBE_ITERATOR_SYMBOL=typeof Symbol==='function'&&Symbol.iterator;var FAUX_ITERATOR_SYMBOL='@@iterator';function getIteratorFn(maybeIterable){if(maybeIterable===null||typeof maybeIterable==='undefined'){return null;}var maybeIterator=MAYBE_ITERATOR_SYMBOL&&maybeIterable[MAYBE_ITERATOR_SYMBOL]||maybeIterable[FAUX_ITERATOR_SYMBOL];if(typeof maybeIterator==='function'){return maybeIterator;}return null;}function getComponentName(fiber){var type=fiber.type;if(typeof type==='function'){return type.displayName||type.name;}if(typeof type==='string'){return type;}switch(type){case REACT_ASYNC_MODE_TYPE:return'AsyncMode';case REACT_CONTEXT_TYPE:return'Context.Consumer';case REACT_FRAGMENT_TYPE:return'ReactFragment';case REACT_PORTAL_TYPE:return'ReactPortal';case REACT_PROFILER_TYPE:return'Profiler('+fiber.pendingProps.id+')';case REACT_PROVIDER_TYPE:return'Context.Provider';case REACT_STRICT_MODE_TYPE:return'StrictMode';case REACT_TIMEOUT_TYPE:return'Timeout';}if((typeof type==='undefined'?'undefined':_typeof(type))==='object'&&type!==null){switch(type.$$typeof){case REACT_FORWARD_REF_TYPE:var functionName=type.render.displayName||type.render.name||'';return functionName!==''?'ForwardRef('+functionName+')':'ForwardRef';}}return null;}function describeFiber(fiber){switch(fiber.tag){case IndeterminateComponent:case FunctionalComponent:case ClassComponent:case HostComponent:var owner=fiber._debugOwner;var source=fiber._debugSource;var name=getComponentName(fiber);var ownerName=null;if(owner){ownerName=getComponentName(owner);}return describeComponentFrame(name,source,ownerName);default:return'';}}// This function can only be called with a work-in-progress fiber and
// only during begin or complete phase. Do not call it under any other
// circumstances.
function getStackAddendumByWorkInProgressFiber(workInProgress){var info='';var node=workInProgress;do{info+=describeFiber(node);// Otherwise this return pointer might point to the wrong tree:
node=node.return;}while(node);return info;}function getCurrentFiberOwnerName$1(){{var fiber=ReactDebugCurrentFiber.current;if(fiber===null){return null;}var owner=fiber._debugOwner;if(owner!==null&&typeof owner!=='undefined'){return getComponentName(owner);}}return null;}function getCurrentFiberStackAddendum$1(){{var fiber=ReactDebugCurrentFiber.current;if(fiber===null){return null;}// Safe because if current fiber exists, we are reconciling,
// and it is guaranteed to be the work-in-progress version.
return getStackAddendumByWorkInProgressFiber(fiber);}return null;}function resetCurrentFiber(){ReactDebugCurrentFrame.getCurrentStack=null;ReactDebugCurrentFiber.current=null;ReactDebugCurrentFiber.phase=null;}function setCurrentFiber(fiber){ReactDebugCurrentFrame.getCurrentStack=getCurrentFiberStackAddendum$1;ReactDebugCurrentFiber.current=fiber;ReactDebugCurrentFiber.phase=null;}function setCurrentPhase(phase){ReactDebugCurrentFiber.phase=phase;}var ReactDebugCurrentFiber={current:null,phase:null,resetCurrentFiber:resetCurrentFiber,setCurrentFiber:setCurrentFiber,setCurrentPhase:setCurrentPhase,getCurrentFiberOwnerName:getCurrentFiberOwnerName$1,getCurrentFiberStackAddendum:getCurrentFiberStackAddendum$1};// A reserved attribute.
// It is handled by React separately and shouldn't be written to the DOM.
var RESERVED=0;// A simple string attribute.
// Attributes that aren't in the whitelist are presumed to have this type.
var STRING=1;// A string attribute that accepts booleans in React. In HTML, these are called
// "enumerated" attributes with "true" and "false" as possible values.
// When true, it should be set to a "true" string.
// When false, it should be set to a "false" string.
var BOOLEANISH_STRING=2;// A real boolean attribute.
// When true, it should be present (set either to an empty string or its name).
// When false, it should be omitted.
var BOOLEAN=3;// An attribute that can be used as a flag as well as with a value.
// When true, it should be present (set either to an empty string or its name).
// When false, it should be omitted.
// For any other value, should be present with that value.
var OVERLOADED_BOOLEAN=4;// An attribute that must be numeric or parse as a numeric.
// When falsy, it should be removed.
var NUMERIC=5;// An attribute that must be positive numeric or parse as a positive numeric.
// When falsy, it should be removed.
var POSITIVE_NUMERIC=6;/* eslint-disable max-len */var ATTRIBUTE_NAME_START_CHAR=':A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD';/* eslint-enable max-len */var ATTRIBUTE_NAME_CHAR=ATTRIBUTE_NAME_START_CHAR+'\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040';var ROOT_ATTRIBUTE_NAME='data-reactroot';var VALID_ATTRIBUTE_NAME_REGEX=new RegExp('^['+ATTRIBUTE_NAME_START_CHAR+']['+ATTRIBUTE_NAME_CHAR+']*$');var illegalAttributeNameCache={};var validatedAttributeNameCache={};function isAttributeNameSafe(attributeName){if(validatedAttributeNameCache.hasOwnProperty(attributeName)){return true;}if(illegalAttributeNameCache.hasOwnProperty(attributeName)){return false;}if(VALID_ATTRIBUTE_NAME_REGEX.test(attributeName)){validatedAttributeNameCache[attributeName]=true;return true;}illegalAttributeNameCache[attributeName]=true;{warning(false,'Invalid attribute name: `%s`',attributeName);}return false;}function shouldIgnoreAttribute(name,propertyInfo,isCustomComponentTag){if(propertyInfo!==null){return propertyInfo.type===RESERVED;}if(isCustomComponentTag){return false;}if(name.length>2&&(name[0]==='o'||name[0]==='O')&&(name[1]==='n'||name[1]==='N')){return true;}return false;}function shouldRemoveAttributeWithWarning(name,value,propertyInfo,isCustomComponentTag){if(propertyInfo!==null&&propertyInfo.type===RESERVED){return false;}switch(typeof value==='undefined'?'undefined':_typeof(value)){case'function':// $FlowIssue symbol is perfectly valid here
case'symbol':// eslint-disable-line
return true;case'boolean':{if(isCustomComponentTag){return false;}if(propertyInfo!==null){return!propertyInfo.acceptsBooleans;}else{var prefix=name.toLowerCase().slice(0,5);return prefix!=='data-'&&prefix!=='aria-';}}default:return false;}}function shouldRemoveAttribute(name,value,propertyInfo,isCustomComponentTag){if(value===null||typeof value==='undefined'){return true;}if(shouldRemoveAttributeWithWarning(name,value,propertyInfo,isCustomComponentTag)){return true;}if(isCustomComponentTag){return false;}if(propertyInfo!==null){switch(propertyInfo.type){case BOOLEAN:return!value;case OVERLOADED_BOOLEAN:return value===false;case NUMERIC:return isNaN(value);case POSITIVE_NUMERIC:return isNaN(value)||value<1;}}return false;}function getPropertyInfo(name){return properties.hasOwnProperty(name)?properties[name]:null;}function PropertyInfoRecord(name,type,mustUseProperty,attributeName,attributeNamespace){this.acceptsBooleans=type===BOOLEANISH_STRING||type===BOOLEAN||type===OVERLOADED_BOOLEAN;this.attributeName=attributeName;this.attributeNamespace=attributeNamespace;this.mustUseProperty=mustUseProperty;this.propertyName=name;this.type=type;}// When adding attributes to this list, be sure to also add them to
// the `possibleStandardNames` module to ensure casing and incorrect
// name warnings.
var properties={};// These props are reserved by React. They shouldn't be written to the DOM.
['children','dangerouslySetInnerHTML',// TODO: This prevents the assignment of defaultValue to regular
// elements (not just inputs). Now that ReactDOMInput assigns to the
// defaultValue property -- do we need this?
'defaultValue','defaultChecked','innerHTML','suppressContentEditableWarning','suppressHydrationWarning','style'].forEach(function(name){properties[name]=new PropertyInfoRecord(name,RESERVED,false,// mustUseProperty
name,// attributeName
null);}// attributeNamespace
);// A few React string attributes have a different name.
// This is a mapping from React prop names to the attribute names.
[['acceptCharset','accept-charset'],['className','class'],['htmlFor','for'],['httpEquiv','http-equiv']].forEach(function(_ref){var name=_ref[0],attributeName=_ref[1];properties[name]=new PropertyInfoRecord(name,STRING,false,// mustUseProperty
attributeName,// attributeName
null);}// attributeNamespace
);// These are "enumerated" HTML attributes that accept "true" and "false".
// In React, we let users pass `true` and `false` even though technically
// these aren't boolean attributes (they are coerced to strings).
['contentEditable','draggable','spellCheck','value'].forEach(function(name){properties[name]=new PropertyInfoRecord(name,BOOLEANISH_STRING,false,// mustUseProperty
name.toLowerCase(),// attributeName
null);}// attributeNamespace
);// These are "enumerated" SVG attributes that accept "true" and "false".
// In React, we let users pass `true` and `false` even though technically
// these aren't boolean attributes (they are coerced to strings).
// Since these are SVG attributes, their attribute names are case-sensitive.
['autoReverse','externalResourcesRequired','preserveAlpha'].forEach(function(name){properties[name]=new PropertyInfoRecord(name,BOOLEANISH_STRING,false,// mustUseProperty
name,// attributeName
null);}// attributeNamespace
);// These are HTML boolean attributes.
['allowFullScreen','async',// Note: there is a special case that prevents it from being written to the DOM
// on the client side because the browsers are inconsistent. Instead we call focus().
'autoFocus','autoPlay','controls','default','defer','disabled','formNoValidate','hidden','loop','noModule','noValidate','open','playsInline','readOnly','required','reversed','scoped','seamless',// Microdata
'itemScope'].forEach(function(name){properties[name]=new PropertyInfoRecord(name,BOOLEAN,false,// mustUseProperty
name.toLowerCase(),// attributeName
null);}// attributeNamespace
);// These are the few React props that we set as DOM properties
// rather than attributes. These are all booleans.
['checked',// Note: `option.selected` is not updated if `select.multiple` is
// disabled with `removeAttribute`. We have special logic for handling this.
'multiple','muted','selected'].forEach(function(name){properties[name]=new PropertyInfoRecord(name,BOOLEAN,true,// mustUseProperty
name.toLowerCase(),// attributeName
null);}// attributeNamespace
);// These are HTML attributes that are "overloaded booleans": they behave like
// booleans, but can also accept a string value.
['capture','download'].forEach(function(name){properties[name]=new PropertyInfoRecord(name,OVERLOADED_BOOLEAN,false,// mustUseProperty
name.toLowerCase(),// attributeName
null);}// attributeNamespace
);// These are HTML attributes that must be positive numbers.
['cols','rows','size','span'].forEach(function(name){properties[name]=new PropertyInfoRecord(name,POSITIVE_NUMERIC,false,// mustUseProperty
name.toLowerCase(),// attributeName
null);}// attributeNamespace
);// These are HTML attributes that must be numbers.
['rowSpan','start'].forEach(function(name){properties[name]=new PropertyInfoRecord(name,NUMERIC,false,// mustUseProperty
name.toLowerCase(),// attributeName
null);}// attributeNamespace
);var CAMELIZE=/[\-\:]([a-z])/g;var capitalize=function capitalize(token){return token[1].toUpperCase();};// This is a list of all SVG attributes that need special casing, namespacing,
// or boolean value assignment. Regular attributes that just accept strings
// and have the same names are omitted, just like in the HTML whitelist.
// Some of these attributes can be hard to find. This list was created by
// scrapping the MDN documentation.
['accent-height','alignment-baseline','arabic-form','baseline-shift','cap-height','clip-path','clip-rule','color-interpolation','color-interpolation-filters','color-profile','color-rendering','dominant-baseline','enable-background','fill-opacity','fill-rule','flood-color','flood-opacity','font-family','font-size','font-size-adjust','font-stretch','font-style','font-variant','font-weight','glyph-name','glyph-orientation-horizontal','glyph-orientation-vertical','horiz-adv-x','horiz-origin-x','image-rendering','letter-spacing','lighting-color','marker-end','marker-mid','marker-start','overline-position','overline-thickness','paint-order','panose-1','pointer-events','rendering-intent','shape-rendering','stop-color','stop-opacity','strikethrough-position','strikethrough-thickness','stroke-dasharray','stroke-dashoffset','stroke-linecap','stroke-linejoin','stroke-miterlimit','stroke-opacity','stroke-width','text-anchor','text-decoration','text-rendering','underline-position','underline-thickness','unicode-bidi','unicode-range','units-per-em','v-alphabetic','v-hanging','v-ideographic','v-mathematical','vector-effect','vert-adv-y','vert-origin-x','vert-origin-y','word-spacing','writing-mode','xmlns:xlink','x-height'].forEach(function(attributeName){var name=attributeName.replace(CAMELIZE,capitalize);properties[name]=new PropertyInfoRecord(name,STRING,false,// mustUseProperty
attributeName,null);}// attributeNamespace
);// String SVG attributes with the xlink namespace.
['xlink:actuate','xlink:arcrole','xlink:href','xlink:role','xlink:show','xlink:title','xlink:type'].forEach(function(attributeName){var name=attributeName.replace(CAMELIZE,capitalize);properties[name]=new PropertyInfoRecord(name,STRING,false,// mustUseProperty
attributeName,'http://www.w3.org/1999/xlink');});// String SVG attributes with the xml namespace.
['xml:base','xml:lang','xml:space'].forEach(function(attributeName){var name=attributeName.replace(CAMELIZE,capitalize);properties[name]=new PropertyInfoRecord(name,STRING,false,// mustUseProperty
attributeName,'http://www.w3.org/XML/1998/namespace');});// Special case: this attribute exists both in HTML and SVG.
// Its "tabindex" attribute name is case-sensitive in SVG so we can't just use
// its React `tabIndex` name, like we do for attributes that exist only in HTML.
properties.tabIndex=new PropertyInfoRecord('tabIndex',STRING,false,// mustUseProperty
'tabindex',// attributeName
null);/**
 * Get the value for a property on a node. Only used in DEV for SSR validation.
 * The "expected" argument is used as a hint of what the expected value is.
 * Some properties have multiple equivalent values.
 */function getValueForProperty(node,name,expected,propertyInfo){{if(propertyInfo.mustUseProperty){var propertyName=propertyInfo.propertyName;return node[propertyName];}else{var attributeName=propertyInfo.attributeName;var stringValue=null;if(propertyInfo.type===OVERLOADED_BOOLEAN){if(node.hasAttribute(attributeName)){var value=node.getAttribute(attributeName);if(value===''){return true;}if(shouldRemoveAttribute(name,expected,propertyInfo,false)){return value;}if(value===''+expected){return expected;}return value;}}else if(node.hasAttribute(attributeName)){if(shouldRemoveAttribute(name,expected,propertyInfo,false)){// We had an attribute but shouldn't have had one, so read it
// for the error message.
return node.getAttribute(attributeName);}if(propertyInfo.type===BOOLEAN){// If this was a boolean, it doesn't matter what the value is
// the fact that we have it is the same as the expected.
return expected;}// Even if this property uses a namespace we use getAttribute
// because we assume its namespaced name is the same as our config.
// To use getAttributeNS we need the local name which we don't have
// in our config atm.
stringValue=node.getAttribute(attributeName);}if(shouldRemoveAttribute(name,expected,propertyInfo,false)){return stringValue===null?expected:stringValue;}else if(stringValue===''+expected){return expected;}else{return stringValue;}}}}/**
 * Get the value for a attribute on a node. Only used in DEV for SSR validation.
 * The third argument is used as a hint of what the expected value is. Some
 * attributes have multiple equivalent values.
 */function getValueForAttribute(node,name,expected){{if(!isAttributeNameSafe(name)){return;}if(!node.hasAttribute(name)){return expected===undefined?undefined:null;}var value=node.getAttribute(name);if(value===''+expected){return expected;}return value;}}/**
 * Sets the value for a property on a node.
 *
 * @param {DOMElement} node
 * @param {string} name
 * @param {*} value
 */function setValueForProperty(node,name,value,isCustomComponentTag){var propertyInfo=getPropertyInfo(name);if(shouldIgnoreAttribute(name,propertyInfo,isCustomComponentTag)){return;}if(shouldRemoveAttribute(name,value,propertyInfo,isCustomComponentTag)){value=null;}// If the prop isn't in the special list, treat it as a simple attribute.
if(isCustomComponentTag||propertyInfo===null){if(isAttributeNameSafe(name)){var _attributeName=name;if(value===null){node.removeAttribute(_attributeName);}else{node.setAttribute(_attributeName,''+value);}}return;}var mustUseProperty=propertyInfo.mustUseProperty;if(mustUseProperty){var propertyName=propertyInfo.propertyName;if(value===null){var type=propertyInfo.type;node[propertyName]=type===BOOLEAN?false:'';}else{// Contrary to `setAttribute`, object properties are properly
// `toString`ed by IE8/9.
node[propertyName]=value;}return;}// The rest are treated as attributes with special cases.
var attributeName=propertyInfo.attributeName,attributeNamespace=propertyInfo.attributeNamespace;if(value===null){node.removeAttribute(attributeName);}else{var _type=propertyInfo.type;var attributeValue=void 0;if(_type===BOOLEAN||_type===OVERLOADED_BOOLEAN&&value===true){attributeValue='';}else{// `setAttribute` with objects becomes only `[object]` in IE8/9,
// ('' + value) makes it output the correct toString()-value.
attributeValue=''+value;}if(attributeNamespace){node.setAttributeNS(attributeNamespace,attributeName,attributeValue);}else{node.setAttribute(attributeName,attributeValue);}}}var ReactControlledValuePropTypes={checkPropTypes:null};{var hasReadOnlyValue={button:true,checkbox:true,image:true,hidden:true,radio:true,reset:true,submit:true};var propTypes={value:function value(props,propName,componentName){if(!props[propName]||hasReadOnlyValue[props.type]||props.onChange||props.readOnly||props.disabled){return null;}return new Error('You provided a `value` prop to a form field without an '+'`onChange` handler. This will render a read-only field. If '+'the field should be mutable use `defaultValue`. Otherwise, '+'set either `onChange` or `readOnly`.');},checked:function checked(props,propName,componentName){if(!props[propName]||props.onChange||props.readOnly||props.disabled){return null;}return new Error('You provided a `checked` prop to a form field without an '+'`onChange` handler. This will render a read-only field. If '+'the field should be mutable use `defaultChecked`. Otherwise, '+'set either `onChange` or `readOnly`.');}};/**
   * Provide a linked `value` attribute for controlled forms. You should not use
   * this outside of the ReactDOM controlled form components.
   */ReactControlledValuePropTypes.checkPropTypes=function(tagName,props,getStack){checkPropTypes(propTypes,props,'prop',tagName,getStack);};}// TODO: direct imports like some-package/src/* are bad. Fix me.
var getCurrentFiberOwnerName=ReactDebugCurrentFiber.getCurrentFiberOwnerName;var getCurrentFiberStackAddendum=ReactDebugCurrentFiber.getCurrentFiberStackAddendum;var didWarnValueDefaultValue=false;var didWarnCheckedDefaultChecked=false;var didWarnControlledToUncontrolled=false;var didWarnUncontrolledToControlled=false;function isControlled(props){var usesChecked=props.type==='checkbox'||props.type==='radio';return usesChecked?props.checked!=null:props.value!=null;}/**
 * Implements an <input> host component that allows setting these optional
 * props: `checked`, `value`, `defaultChecked`, and `defaultValue`.
 *
 * If `checked` or `value` are not supplied (or null/undefined), user actions
 * that affect the checked state or value will trigger updates to the element.
 *
 * If they are supplied (and not null/undefined), the rendered element will not
 * trigger updates to the element. Instead, the props must change in order for
 * the rendered element to be updated.
 *
 * The rendered element will be initialized as unchecked (or `defaultChecked`)
 * with an empty value (or `defaultValue`).
 *
 * See http://www.w3.org/TR/2012/WD-html5-20121025/the-input-element.html
 */function getHostProps(element,props){var node=element;var checked=props.checked;var hostProps=_assign({},props,{defaultChecked:undefined,defaultValue:undefined,value:undefined,checked:checked!=null?checked:node._wrapperState.initialChecked});return hostProps;}function initWrapperState(element,props){{ReactControlledValuePropTypes.checkPropTypes('input',props,getCurrentFiberStackAddendum);if(props.checked!==undefined&&props.defaultChecked!==undefined&&!didWarnCheckedDefaultChecked){warning(false,'%s contains an input of type %s with both checked and defaultChecked props. '+'Input elements must be either controlled or uncontrolled '+'(specify either the checked prop, or the defaultChecked prop, but not '+'both). Decide between using a controlled or uncontrolled input '+'element and remove one of these props. More info: '+'https://fb.me/react-controlled-components',getCurrentFiberOwnerName()||'A component',props.type);didWarnCheckedDefaultChecked=true;}if(props.value!==undefined&&props.defaultValue!==undefined&&!didWarnValueDefaultValue){warning(false,'%s contains an input of type %s with both value and defaultValue props. '+'Input elements must be either controlled or uncontrolled '+'(specify either the value prop, or the defaultValue prop, but not '+'both). Decide between using a controlled or uncontrolled input '+'element and remove one of these props. More info: '+'https://fb.me/react-controlled-components',getCurrentFiberOwnerName()||'A component',props.type);didWarnValueDefaultValue=true;}}var node=element;var defaultValue=props.defaultValue==null?'':props.defaultValue;node._wrapperState={initialChecked:props.checked!=null?props.checked:props.defaultChecked,initialValue:getSafeValue(props.value!=null?props.value:defaultValue),controlled:isControlled(props)};}function updateChecked(element,props){var node=element;var checked=props.checked;if(checked!=null){setValueForProperty(node,'checked',checked,false);}}function updateWrapper(element,props){var node=element;{var _controlled=isControlled(props);if(!node._wrapperState.controlled&&_controlled&&!didWarnUncontrolledToControlled){warning(false,'A component is changing an uncontrolled input of type %s to be controlled. '+'Input elements should not switch from uncontrolled to controlled (or vice versa). '+'Decide between using a controlled or uncontrolled input '+'element for the lifetime of the component. More info: https://fb.me/react-controlled-components%s',props.type,getCurrentFiberStackAddendum());didWarnUncontrolledToControlled=true;}if(node._wrapperState.controlled&&!_controlled&&!didWarnControlledToUncontrolled){warning(false,'A component is changing a controlled input of type %s to be uncontrolled. '+'Input elements should not switch from controlled to uncontrolled (or vice versa). '+'Decide between using a controlled or uncontrolled input '+'element for the lifetime of the component. More info: https://fb.me/react-controlled-components%s',props.type,getCurrentFiberStackAddendum());didWarnControlledToUncontrolled=true;}}updateChecked(element,props);var value=getSafeValue(props.value);if(value!=null){if(props.type==='number'){if(value===0&&node.value===''||// eslint-disable-next-line
node.value!=value){node.value=''+value;}}else if(node.value!==''+value){node.value=''+value;}}if(props.hasOwnProperty('value')){setDefaultValue(node,props.type,value);}else if(props.hasOwnProperty('defaultValue')){setDefaultValue(node,props.type,getSafeValue(props.defaultValue));}if(props.checked==null&&props.defaultChecked!=null){node.defaultChecked=!!props.defaultChecked;}}function postMountWrapper(element,props){var node=element;if(props.hasOwnProperty('value')||props.hasOwnProperty('defaultValue')){// Do not assign value if it is already set. This prevents user text input
// from being lost during SSR hydration.
if(node.value===''){node.value=''+node._wrapperState.initialValue;}// value must be assigned before defaultValue. This fixes an issue where the
// visually displayed value of date inputs disappears on mobile Safari and Chrome:
// https://github.com/facebook/react/issues/7233
node.defaultValue=''+node._wrapperState.initialValue;}// Normally, we'd just do `node.checked = node.checked` upon initial mount, less this bug
// this is needed to work around a chrome bug where setting defaultChecked
// will sometimes influence the value of checked (even after detachment).
// Reference: https://bugs.chromium.org/p/chromium/issues/detail?id=608416
// We need to temporarily unset name to avoid disrupting radio button groups.
var name=node.name;if(name!==''){node.name='';}node.defaultChecked=!node.defaultChecked;node.defaultChecked=!node.defaultChecked;if(name!==''){node.name=name;}}function restoreControlledState(element,props){var node=element;updateWrapper(node,props);updateNamedCousins(node,props);}function updateNamedCousins(rootNode,props){var name=props.name;if(props.type==='radio'&&name!=null){var queryRoot=rootNode;while(queryRoot.parentNode){queryRoot=queryRoot.parentNode;}// If `rootNode.form` was non-null, then we could try `form.elements`,
// but that sometimes behaves strangely in IE8. We could also try using
// `form.getElementsByName`, but that will only return direct children
// and won't include inputs that use the HTML5 `form=` attribute. Since
// the input might not even be in a form. It might not even be in the
// document. Let's just use the local `querySelectorAll` to ensure we don't
// miss anything.
var group=queryRoot.querySelectorAll('input[name='+JSON.stringify(''+name)+'][type="radio"]');for(var i=0;i<group.length;i++){var otherNode=group[i];if(otherNode===rootNode||otherNode.form!==rootNode.form){continue;}// This will throw if radio buttons rendered by different copies of React
// and the same name are rendered into the same form (same as #1939).
// That's probably okay; we don't support it just as we don't support
// mixing React radio buttons with non-React ones.
var otherProps=getFiberCurrentPropsFromNode$1(otherNode);!otherProps?invariant(false,'ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.'):void 0;// We need update the tracked value on the named cousin since the value
// was changed but the input saw no event or value set
updateValueIfChanged(otherNode);// If this is a controlled radio button group, forcing the input that
// was previously checked to update will cause it to be come re-checked
// as appropriate.
updateWrapper(otherNode,otherProps);}}}// In Chrome, assigning defaultValue to certain input types triggers input validation.
// For number inputs, the display value loses trailing decimal points. For email inputs,
// Chrome raises "The specified value <x> is not a valid email address".
//
// Here we check to see if the defaultValue has actually changed, avoiding these problems
// when the user is inputting text
//
// https://github.com/facebook/react/issues/7253
function setDefaultValue(node,type,value){if(// Focused number inputs synchronize on blur. See ChangeEventPlugin.js
type!=='number'||node.ownerDocument.activeElement!==node){if(value==null){node.defaultValue=''+node._wrapperState.initialValue;}else if(node.defaultValue!==''+value){node.defaultValue=''+value;}}}function getSafeValue(value){switch(typeof value==='undefined'?'undefined':_typeof(value)){case'boolean':case'number':case'object':case'string':case'undefined':return value;default:// function, symbol are assigned as empty strings
return'';}}var eventTypes$1={change:{phasedRegistrationNames:{bubbled:'onChange',captured:'onChangeCapture'},dependencies:[TOP_BLUR,TOP_CHANGE,TOP_CLICK,TOP_FOCUS,TOP_INPUT,TOP_KEY_DOWN,TOP_KEY_UP,TOP_SELECTION_CHANGE]}};function createAndAccumulateChangeEvent(inst,nativeEvent,target){var event=SyntheticEvent$1.getPooled(eventTypes$1.change,inst,nativeEvent,target);event.type='change';// Flag this event loop as needing state restore.
enqueueStateRestore(target);accumulateTwoPhaseDispatches(event);return event;}/**
 * For IE shims
 */var activeElement=null;var activeElementInst=null;/**
 * SECTION: handle `change` event
 */function shouldUseChangeEvent(elem){var nodeName=elem.nodeName&&elem.nodeName.toLowerCase();return nodeName==='select'||nodeName==='input'&&elem.type==='file';}function manualDispatchChangeEvent(nativeEvent){var event=createAndAccumulateChangeEvent(activeElementInst,nativeEvent,getEventTarget(nativeEvent));// If change and propertychange bubbled, we'd just bind to it like all the
// other events and have it go through ReactBrowserEventEmitter. Since it
// doesn't, we manually listen for the events and so we have to enqueue and
// process the abstract event manually.
//
// Batching is necessary here in order to ensure that all event handlers run
// before the next rerender (including event handlers attached to ancestor
// elements instead of directly on the input). Without this, controlled
// components don't work properly in conjunction with event bubbling because
// the component is rerendered and the value reverted before all the event
// handlers can run. See https://github.com/facebook/react/issues/708.
batchedUpdates(runEventInBatch,event);}function runEventInBatch(event){runEventsInBatch(event,false);}function getInstIfValueChanged(targetInst){var targetNode=getNodeFromInstance$1(targetInst);if(updateValueIfChanged(targetNode)){return targetInst;}}function getTargetInstForChangeEvent(topLevelType,targetInst){if(topLevelType===TOP_CHANGE){return targetInst;}}/**
 * SECTION: handle `input` event
 */var isInputEventSupported=false;if(ExecutionEnvironment.canUseDOM){// IE9 claims to support the input event but fails to trigger it when
// deleting text, so we ignore its input events.
isInputEventSupported=isEventSupported('input')&&(!document.documentMode||document.documentMode>9);}/**
 * (For IE <=9) Starts tracking propertychange events on the passed-in element
 * and override the value property so that we can distinguish user events from
 * value changes in JS.
 */function startWatchingForValueChange(target,targetInst){activeElement=target;activeElementInst=targetInst;activeElement.attachEvent('onpropertychange',handlePropertyChange);}/**
 * (For IE <=9) Removes the event listeners from the currently-tracked element,
 * if any exists.
 */function stopWatchingForValueChange(){if(!activeElement){return;}activeElement.detachEvent('onpropertychange',handlePropertyChange);activeElement=null;activeElementInst=null;}/**
 * (For IE <=9) Handles a propertychange event, sending a `change` event if
 * the value of the active element has changed.
 */function handlePropertyChange(nativeEvent){if(nativeEvent.propertyName!=='value'){return;}if(getInstIfValueChanged(activeElementInst)){manualDispatchChangeEvent(nativeEvent);}}function handleEventsForInputEventPolyfill(topLevelType,target,targetInst){if(topLevelType===TOP_FOCUS){// In IE9, propertychange fires for most input events but is buggy and
// doesn't fire when text is deleted, but conveniently, selectionchange
// appears to fire in all of the remaining cases so we catch those and
// forward the event if the value has changed
// In either case, we don't want to call the event handler if the value
// is changed from JS so we redefine a setter for `.value` that updates
// our activeElementValue variable, allowing us to ignore those changes
//
// stopWatching() should be a noop here but we call it just in case we
// missed a blur event somehow.
stopWatchingForValueChange();startWatchingForValueChange(target,targetInst);}else if(topLevelType===TOP_BLUR){stopWatchingForValueChange();}}// For IE8 and IE9.
function getTargetInstForInputEventPolyfill(topLevelType,targetInst){if(topLevelType===TOP_SELECTION_CHANGE||topLevelType===TOP_KEY_UP||topLevelType===TOP_KEY_DOWN){// On the selectionchange event, the target is just document which isn't
// helpful for us so just check activeElement instead.
//
// 99% of the time, keydown and keyup aren't necessary. IE8 fails to fire
// propertychange on the first input event after setting `value` from a
// script and fires only keydown, keypress, keyup. Catching keyup usually
// gets it and catching keydown lets us fire an event for the first
// keystroke if user does a key repeat (it'll be a little delayed: right
// before the second keystroke). Other input methods (e.g., paste) seem to
// fire selectionchange normally.
return getInstIfValueChanged(activeElementInst);}}/**
 * SECTION: handle `click` event
 */function shouldUseClickEvent(elem){// Use the `click` event to detect changes to checkbox and radio inputs.
// This approach works across all browsers, whereas `change` does not fire
// until `blur` in IE8.
var nodeName=elem.nodeName;return nodeName&&nodeName.toLowerCase()==='input'&&(elem.type==='checkbox'||elem.type==='radio');}function getTargetInstForClickEvent(topLevelType,targetInst){if(topLevelType===TOP_CLICK){return getInstIfValueChanged(targetInst);}}function getTargetInstForInputOrChangeEvent(topLevelType,targetInst){if(topLevelType===TOP_INPUT||topLevelType===TOP_CHANGE){return getInstIfValueChanged(targetInst);}}function handleControlledInputBlur(inst,node){// TODO: In IE, inst is occasionally null. Why?
if(inst==null){return;}// Fiber and ReactDOM keep wrapper state in separate places
var state=inst._wrapperState||node._wrapperState;if(!state||!state.controlled||node.type!=='number'){return;}// If controlled, assign the value attribute to the current value on blur
setDefaultValue(node,'number',node.value);}/**
 * This plugin creates an `onChange` event that normalizes change events
 * across form elements. This event fires at a time when it's possible to
 * change the element's value without seeing a flicker.
 *
 * Supported elements are:
 * - input (see `isTextInputElement`)
 * - textarea
 * - select
 */var ChangeEventPlugin={eventTypes:eventTypes$1,_isInputEventSupported:isInputEventSupported,extractEvents:function extractEvents(topLevelType,targetInst,nativeEvent,nativeEventTarget){var targetNode=targetInst?getNodeFromInstance$1(targetInst):window;var getTargetInstFunc=void 0,handleEventFunc=void 0;if(shouldUseChangeEvent(targetNode)){getTargetInstFunc=getTargetInstForChangeEvent;}else if(isTextInputElement(targetNode)){if(isInputEventSupported){getTargetInstFunc=getTargetInstForInputOrChangeEvent;}else{getTargetInstFunc=getTargetInstForInputEventPolyfill;handleEventFunc=handleEventsForInputEventPolyfill;}}else if(shouldUseClickEvent(targetNode)){getTargetInstFunc=getTargetInstForClickEvent;}if(getTargetInstFunc){var inst=getTargetInstFunc(topLevelType,targetInst);if(inst){var event=createAndAccumulateChangeEvent(inst,nativeEvent,nativeEventTarget);return event;}}if(handleEventFunc){handleEventFunc(topLevelType,targetNode,targetInst);}// When blurring, set the value attribute for number inputs
if(topLevelType===TOP_BLUR){handleControlledInputBlur(targetInst,targetNode);}}};/**
 * Module that is injectable into `EventPluginHub`, that specifies a
 * deterministic ordering of `EventPlugin`s. A convenient way to reason about
 * plugins, without having to package every one of them. This is better than
 * having plugins be ordered in the same order that they are injected because
 * that ordering would be influenced by the packaging order.
 * `ResponderEventPlugin` must occur before `SimpleEventPlugin` so that
 * preventing default on events is convenient in `SimpleEventPlugin` handlers.
 */var DOMEventPluginOrder=['ResponderEventPlugin','SimpleEventPlugin','TapEventPlugin','EnterLeaveEventPlugin','ChangeEventPlugin','SelectEventPlugin','BeforeInputEventPlugin'];var SyntheticUIEvent=SyntheticEvent$1.extend({view:null,detail:null});/**
 * Translation from modifier key to the associated property in the event.
 * @see http://www.w3.org/TR/DOM-Level-3-Events/#keys-Modifiers
 */var modifierKeyToProp={Alt:'altKey',Control:'ctrlKey',Meta:'metaKey',Shift:'shiftKey'};// IE8 does not implement getModifierState so we simply map it to the only
// modifier keys exposed by the event itself, does not support Lock-keys.
// Currently, all major browsers except Chrome seems to support Lock-keys.
function modifierStateGetter(keyArg){var syntheticEvent=this;var nativeEvent=syntheticEvent.nativeEvent;if(nativeEvent.getModifierState){return nativeEvent.getModifierState(keyArg);}var keyProp=modifierKeyToProp[keyArg];return keyProp?!!nativeEvent[keyProp]:false;}function getEventModifierState(nativeEvent){return modifierStateGetter;}/**
 * @interface MouseEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */var SyntheticMouseEvent=SyntheticUIEvent.extend({screenX:null,screenY:null,clientX:null,clientY:null,pageX:null,pageY:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,getModifierState:getEventModifierState,button:null,buttons:null,relatedTarget:function relatedTarget(event){return event.relatedTarget||(event.fromElement===event.srcElement?event.toElement:event.fromElement);}});/**
 * @interface PointerEvent
 * @see http://www.w3.org/TR/pointerevents/
 */var SyntheticPointerEvent=SyntheticMouseEvent.extend({pointerId:null,width:null,height:null,pressure:null,tiltX:null,tiltY:null,pointerType:null,isPrimary:null});var eventTypes$2={mouseEnter:{registrationName:'onMouseEnter',dependencies:[TOP_MOUSE_OUT,TOP_MOUSE_OVER]},mouseLeave:{registrationName:'onMouseLeave',dependencies:[TOP_MOUSE_OUT,TOP_MOUSE_OVER]},pointerEnter:{registrationName:'onPointerEnter',dependencies:[TOP_POINTER_OUT,TOP_POINTER_OVER]},pointerLeave:{registrationName:'onPointerLeave',dependencies:[TOP_POINTER_OUT,TOP_POINTER_OVER]}};var EnterLeaveEventPlugin={eventTypes:eventTypes$2,/**
   * For almost every interaction we care about, there will be both a top-level
   * `mouseover` and `mouseout` event that occurs. Only use `mouseout` so that
   * we do not extract duplicate events. However, moving the mouse into the
   * browser from outside will not fire a `mouseout` event. In this case, we use
   * the `mouseover` top-level event.
   */extractEvents:function extractEvents(topLevelType,targetInst,nativeEvent,nativeEventTarget){var isOverEvent=topLevelType===TOP_MOUSE_OVER||topLevelType===TOP_POINTER_OVER;var isOutEvent=topLevelType===TOP_MOUSE_OUT||topLevelType===TOP_POINTER_OUT;if(isOverEvent&&(nativeEvent.relatedTarget||nativeEvent.fromElement)){return null;}if(!isOutEvent&&!isOverEvent){// Must not be a mouse or pointer in or out - ignoring.
return null;}var win=void 0;if(nativeEventTarget.window===nativeEventTarget){// `nativeEventTarget` is probably a window object.
win=nativeEventTarget;}else{// TODO: Figure out why `ownerDocument` is sometimes undefined in IE8.
var doc=nativeEventTarget.ownerDocument;if(doc){win=doc.defaultView||doc.parentWindow;}else{win=window;}}var from=void 0;var to=void 0;if(isOutEvent){from=targetInst;var related=nativeEvent.relatedTarget||nativeEvent.toElement;to=related?getClosestInstanceFromNode(related):null;}else{// Moving to a node from outside the window.
from=null;to=targetInst;}if(from===to){// Nothing pertains to our managed components.
return null;}var eventInterface=void 0,leaveEventType=void 0,enterEventType=void 0,eventTypePrefix=void 0;if(topLevelType===TOP_MOUSE_OUT||topLevelType===TOP_MOUSE_OVER){eventInterface=SyntheticMouseEvent;leaveEventType=eventTypes$2.mouseLeave;enterEventType=eventTypes$2.mouseEnter;eventTypePrefix='mouse';}else if(topLevelType===TOP_POINTER_OUT||topLevelType===TOP_POINTER_OVER){eventInterface=SyntheticPointerEvent;leaveEventType=eventTypes$2.pointerLeave;enterEventType=eventTypes$2.pointerEnter;eventTypePrefix='pointer';}var fromNode=from==null?win:getNodeFromInstance$1(from);var toNode=to==null?win:getNodeFromInstance$1(to);var leave=eventInterface.getPooled(leaveEventType,from,nativeEvent,nativeEventTarget);leave.type=eventTypePrefix+'leave';leave.target=fromNode;leave.relatedTarget=toNode;var enter=eventInterface.getPooled(enterEventType,to,nativeEvent,nativeEventTarget);enter.type=eventTypePrefix+'enter';enter.target=toNode;enter.relatedTarget=fromNode;accumulateEnterLeaveDispatches(leave,enter,from,to);return[leave,enter];}};/**
 * `ReactInstanceMap` maintains a mapping from a public facing stateful
 * instance (key) and the internal representation (value). This allows public
 * methods to accept the user facing instance as an argument and map them back
 * to internal methods.
 *
 * Note that this module is currently shared and assumed to be stateless.
 * If this becomes an actual Map, that will break.
 *//**
 * This API should be called `delete` but we'd have to make sure to always
 * transform these to strings for IE support. When this transform is fully
 * supported we can rename it.
 */function get(key){return key._reactInternalFiber;}function has(key){return key._reactInternalFiber!==undefined;}function set(key,value){key._reactInternalFiber=value;}// Don't change these two values. They're used by React Dev Tools.
var NoEffect=/*              */0;var PerformedWork=/*         */1;// You can change the rest (and add more).
var Placement=/*             */2;var Update=/*                */4;var PlacementAndUpdate=/*    */6;var Deletion=/*              */8;var ContentReset=/*          */16;var Callback=/*              */32;var DidCapture=/*            */64;var Ref=/*                   */128;var Snapshot=/*              */256;// Union of all host effects
var HostEffectMask=/*        */511;var Incomplete=/*            */512;var ShouldCapture=/*         */1024;var MOUNTING=1;var MOUNTED=2;var UNMOUNTED=3;function isFiberMountedImpl(fiber){var node=fiber;if(!fiber.alternate){// If there is no alternate, this might be a new tree that isn't inserted
// yet. If it is, then it will have a pending insertion effect on it.
if((node.effectTag&Placement)!==NoEffect){return MOUNTING;}while(node.return){node=node.return;if((node.effectTag&Placement)!==NoEffect){return MOUNTING;}}}else{while(node.return){node=node.return;}}if(node.tag===HostRoot){// TODO: Check if this was a nested HostRoot when used with
// renderContainerIntoSubtree.
return MOUNTED;}// If we didn't hit the root, that means that we're in an disconnected tree
// that has been unmounted.
return UNMOUNTED;}function isFiberMounted(fiber){return isFiberMountedImpl(fiber)===MOUNTED;}function isMounted(component){{var owner=ReactCurrentOwner.current;if(owner!==null&&owner.tag===ClassComponent){var ownerFiber=owner;var instance=ownerFiber.stateNode;!instance._warnedAboutRefsInRender?warning(false,'%s is accessing isMounted inside its render() function. '+'render() should be a pure function of props and state. It should '+'never access something that requires stale data from the previous '+'render, such as refs. Move this logic to componentDidMount and '+'componentDidUpdate instead.',getComponentName(ownerFiber)||'A component'):void 0;instance._warnedAboutRefsInRender=true;}}var fiber=get(component);if(!fiber){return false;}return isFiberMountedImpl(fiber)===MOUNTED;}function assertIsMounted(fiber){!(isFiberMountedImpl(fiber)===MOUNTED)?invariant(false,'Unable to find node on an unmounted component.'):void 0;}function findCurrentFiberUsingSlowPath(fiber){var alternate=fiber.alternate;if(!alternate){// If there is no alternate, then we only need to check if it is mounted.
var state=isFiberMountedImpl(fiber);!(state!==UNMOUNTED)?invariant(false,'Unable to find node on an unmounted component.'):void 0;if(state===MOUNTING){return null;}return fiber;}// If we have two possible branches, we'll walk backwards up to the root
// to see what path the root points to. On the way we may hit one of the
// special cases and we'll deal with them.
var a=fiber;var b=alternate;while(true){var parentA=a.return;var parentB=parentA?parentA.alternate:null;if(!parentA||!parentB){// We're at the root.
break;}// If both copies of the parent fiber point to the same child, we can
// assume that the child is current. This happens when we bailout on low
// priority: the bailed out fiber's child reuses the current child.
if(parentA.child===parentB.child){var child=parentA.child;while(child){if(child===a){// We've determined that A is the current branch.
assertIsMounted(parentA);return fiber;}if(child===b){// We've determined that B is the current branch.
assertIsMounted(parentA);return alternate;}child=child.sibling;}// We should never have an alternate for any mounting node. So the only
// way this could possibly happen is if this was unmounted, if at all.
invariant(false,'Unable to find node on an unmounted component.');}if(a.return!==b.return){// The return pointer of A and the return pointer of B point to different
// fibers. We assume that return pointers never criss-cross, so A must
// belong to the child set of A.return, and B must belong to the child
// set of B.return.
a=parentA;b=parentB;}else{// The return pointers point to the same fiber. We'll have to use the
// default, slow path: scan the child sets of each parent alternate to see
// which child belongs to which set.
//
// Search parent A's child set
var didFindChild=false;var _child=parentA.child;while(_child){if(_child===a){didFindChild=true;a=parentA;b=parentB;break;}if(_child===b){didFindChild=true;b=parentA;a=parentB;break;}_child=_child.sibling;}if(!didFindChild){// Search parent B's child set
_child=parentB.child;while(_child){if(_child===a){didFindChild=true;a=parentB;b=parentA;break;}if(_child===b){didFindChild=true;b=parentB;a=parentA;break;}_child=_child.sibling;}!didFindChild?invariant(false,'Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.'):void 0;}}!(a.alternate===b)?invariant(false,'Return fibers should always be each others\' alternates. This error is likely caused by a bug in React. Please file an issue.'):void 0;}// If the root is not a host container, we're in a disconnected tree. I.e.
// unmounted.
!(a.tag===HostRoot)?invariant(false,'Unable to find node on an unmounted component.'):void 0;if(a.stateNode.current===a){// We've determined that A is the current branch.
return fiber;}// Otherwise B has to be current branch.
return alternate;}function findCurrentHostFiber(parent){var currentParent=findCurrentFiberUsingSlowPath(parent);if(!currentParent){return null;}// Next we'll drill down this component to find the first HostComponent/Text.
var node=currentParent;while(true){if(node.tag===HostComponent||node.tag===HostText){return node;}else if(node.child){node.child.return=node;node=node.child;continue;}if(node===currentParent){return null;}while(!node.sibling){if(!node.return||node.return===currentParent){return null;}node=node.return;}node.sibling.return=node.return;node=node.sibling;}// Flow needs the return null here, but ESLint complains about it.
// eslint-disable-next-line no-unreachable
return null;}function findCurrentHostFiberWithNoPortals(parent){var currentParent=findCurrentFiberUsingSlowPath(parent);if(!currentParent){return null;}// Next we'll drill down this component to find the first HostComponent/Text.
var node=currentParent;while(true){if(node.tag===HostComponent||node.tag===HostText){return node;}else if(node.child&&node.tag!==HostPortal){node.child.return=node;node=node.child;continue;}if(node===currentParent){return null;}while(!node.sibling){if(!node.return||node.return===currentParent){return null;}node=node.return;}node.sibling.return=node.return;node=node.sibling;}// Flow needs the return null here, but ESLint complains about it.
// eslint-disable-next-line no-unreachable
return null;}function addEventBubbleListener(element,eventType,listener){element.addEventListener(eventType,listener,false);}function addEventCaptureListener(element,eventType,listener){element.addEventListener(eventType,listener,true);}/**
 * @interface Event
 * @see http://www.w3.org/TR/css3-animations/#AnimationEvent-interface
 * @see https://developer.mozilla.org/en-US/docs/Web/API/AnimationEvent
 */var SyntheticAnimationEvent=SyntheticEvent$1.extend({animationName:null,elapsedTime:null,pseudoElement:null});/**
 * @interface Event
 * @see http://www.w3.org/TR/clipboard-apis/
 */var SyntheticClipboardEvent=SyntheticEvent$1.extend({clipboardData:function clipboardData(event){return'clipboardData'in event?event.clipboardData:window.clipboardData;}});/**
 * @interface FocusEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */var SyntheticFocusEvent=SyntheticUIEvent.extend({relatedTarget:null});/**
 * `charCode` represents the actual "character code" and is safe to use with
 * `String.fromCharCode`. As such, only keys that correspond to printable
 * characters produce a valid `charCode`, the only exception to this is Enter.
 * The Tab-key is considered non-printable and does not have a `charCode`,
 * presumably because it does not produce a tab-character in browsers.
 *
 * @param {object} nativeEvent Native browser event.
 * @return {number} Normalized `charCode` property.
 */function getEventCharCode(nativeEvent){var charCode=void 0;var keyCode=nativeEvent.keyCode;if('charCode'in nativeEvent){charCode=nativeEvent.charCode;// FF does not set `charCode` for the Enter-key, check against `keyCode`.
if(charCode===0&&keyCode===13){charCode=13;}}else{// IE8 does not implement `charCode`, but `keyCode` has the correct value.
charCode=keyCode;}// IE and Edge (on Windows) and Chrome / Safari (on Windows and Linux)
// report Enter as charCode 10 when ctrl is pressed.
if(charCode===10){charCode=13;}// Some non-printable keys are reported in `charCode`/`keyCode`, discard them.
// Must not discard the (non-)printable Enter-key.
if(charCode>=32||charCode===13){return charCode;}return 0;}/**
 * Normalization of deprecated HTML5 `key` values
 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Key_names
 */var normalizeKey={Esc:'Escape',Spacebar:' ',Left:'ArrowLeft',Up:'ArrowUp',Right:'ArrowRight',Down:'ArrowDown',Del:'Delete',Win:'OS',Menu:'ContextMenu',Apps:'ContextMenu',Scroll:'ScrollLock',MozPrintableKey:'Unidentified'};/**
 * Translation from legacy `keyCode` to HTML5 `key`
 * Only special keys supported, all others depend on keyboard layout or browser
 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Key_names
 */var translateToKey={'8':'Backspace','9':'Tab','12':'Clear','13':'Enter','16':'Shift','17':'Control','18':'Alt','19':'Pause','20':'CapsLock','27':'Escape','32':' ','33':'PageUp','34':'PageDown','35':'End','36':'Home','37':'ArrowLeft','38':'ArrowUp','39':'ArrowRight','40':'ArrowDown','45':'Insert','46':'Delete','112':'F1','113':'F2','114':'F3','115':'F4','116':'F5','117':'F6','118':'F7','119':'F8','120':'F9','121':'F10','122':'F11','123':'F12','144':'NumLock','145':'ScrollLock','224':'Meta'};/**
 * @param {object} nativeEvent Native browser event.
 * @return {string} Normalized `key` property.
 */function getEventKey(nativeEvent){if(nativeEvent.key){// Normalize inconsistent values reported by browsers due to
// implementations of a working draft specification.
// FireFox implements `key` but returns `MozPrintableKey` for all
// printable characters (normalized to `Unidentified`), ignore it.
var key=normalizeKey[nativeEvent.key]||nativeEvent.key;if(key!=='Unidentified'){return key;}}// Browser does not implement `key`, polyfill as much of it as we can.
if(nativeEvent.type==='keypress'){var charCode=getEventCharCode(nativeEvent);// The enter-key is technically both printable and non-printable and can
// thus be captured by `keypress`, no other non-printable key should.
return charCode===13?'Enter':String.fromCharCode(charCode);}if(nativeEvent.type==='keydown'||nativeEvent.type==='keyup'){// While user keyboard layout determines the actual meaning of each
// `keyCode` value, almost all function keys have a universal value.
return translateToKey[nativeEvent.keyCode]||'Unidentified';}return'';}/**
 * @interface KeyboardEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */var SyntheticKeyboardEvent=SyntheticUIEvent.extend({key:getEventKey,location:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,repeat:null,locale:null,getModifierState:getEventModifierState,// Legacy Interface
charCode:function charCode(event){// `charCode` is the result of a KeyPress event and represents the value of
// the actual printable character.
// KeyPress is deprecated, but its replacement is not yet final and not
// implemented in any major browser. Only KeyPress has charCode.
if(event.type==='keypress'){return getEventCharCode(event);}return 0;},keyCode:function keyCode(event){// `keyCode` is the result of a KeyDown/Up event and represents the value of
// physical keyboard key.
// The actual meaning of the value depends on the users' keyboard layout
// which cannot be detected. Assuming that it is a US keyboard layout
// provides a surprisingly accurate mapping for US and European users.
// Due to this, it is left to the user to implement at this time.
if(event.type==='keydown'||event.type==='keyup'){return event.keyCode;}return 0;},which:function which(event){// `which` is an alias for either `keyCode` or `charCode` depending on the
// type of the event.
if(event.type==='keypress'){return getEventCharCode(event);}if(event.type==='keydown'||event.type==='keyup'){return event.keyCode;}return 0;}});/**
 * @interface DragEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */var SyntheticDragEvent=SyntheticMouseEvent.extend({dataTransfer:null});/**
 * @interface TouchEvent
 * @see http://www.w3.org/TR/touch-events/
 */var SyntheticTouchEvent=SyntheticUIEvent.extend({touches:null,targetTouches:null,changedTouches:null,altKey:null,metaKey:null,ctrlKey:null,shiftKey:null,getModifierState:getEventModifierState});/**
 * @interface Event
 * @see http://www.w3.org/TR/2009/WD-css3-transitions-20090320/#transition-events-
 * @see https://developer.mozilla.org/en-US/docs/Web/API/TransitionEvent
 */var SyntheticTransitionEvent=SyntheticEvent$1.extend({propertyName:null,elapsedTime:null,pseudoElement:null});/**
 * @interface WheelEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */var SyntheticWheelEvent=SyntheticMouseEvent.extend({deltaX:function deltaX(event){return'deltaX'in event?event.deltaX:// Fallback to `wheelDeltaX` for Webkit and normalize (right is positive).
'wheelDeltaX'in event?-event.wheelDeltaX:0;},deltaY:function deltaY(event){return'deltaY'in event?event.deltaY:// Fallback to `wheelDeltaY` for Webkit and normalize (down is positive).
'wheelDeltaY'in event?-event.wheelDeltaY:// Fallback to `wheelDelta` for IE<9 and normalize (down is positive).
'wheelDelta'in event?-event.wheelDelta:0;},deltaZ:null,// Browsers without "deltaMode" is reporting in raw wheel delta where one
// notch on the scroll is always +/- 120, roughly equivalent to pixels.
// A good approximation of DOM_DELTA_LINE (1) is 5% of viewport size or
// ~40 pixels, for DOM_DELTA_SCREEN (2) it is 87.5% of viewport size.
deltaMode:null});/**
 * Turns
 * ['abort', ...]
 * into
 * eventTypes = {
 *   'abort': {
 *     phasedRegistrationNames: {
 *       bubbled: 'onAbort',
 *       captured: 'onAbortCapture',
 *     },
 *     dependencies: [TOP_ABORT],
 *   },
 *   ...
 * };
 * topLevelEventsToDispatchConfig = new Map([
 *   [TOP_ABORT, { sameConfig }],
 * ]);
 */var interactiveEventTypeNames=[[TOP_BLUR,'blur'],[TOP_CANCEL,'cancel'],[TOP_CLICK,'click'],[TOP_CLOSE,'close'],[TOP_CONTEXT_MENU,'contextMenu'],[TOP_COPY,'copy'],[TOP_CUT,'cut'],[TOP_DOUBLE_CLICK,'doubleClick'],[TOP_DRAG_END,'dragEnd'],[TOP_DRAG_START,'dragStart'],[TOP_DROP,'drop'],[TOP_FOCUS,'focus'],[TOP_INPUT,'input'],[TOP_INVALID,'invalid'],[TOP_KEY_DOWN,'keyDown'],[TOP_KEY_PRESS,'keyPress'],[TOP_KEY_UP,'keyUp'],[TOP_MOUSE_DOWN,'mouseDown'],[TOP_MOUSE_UP,'mouseUp'],[TOP_PASTE,'paste'],[TOP_PAUSE,'pause'],[TOP_PLAY,'play'],[TOP_POINTER_CANCEL,'pointerCancel'],[TOP_POINTER_DOWN,'pointerDown'],[TOP_POINTER_UP,'pointerUp'],[TOP_RATE_CHANGE,'rateChange'],[TOP_RESET,'reset'],[TOP_SEEKED,'seeked'],[TOP_SUBMIT,'submit'],[TOP_TOUCH_CANCEL,'touchCancel'],[TOP_TOUCH_END,'touchEnd'],[TOP_TOUCH_START,'touchStart'],[TOP_VOLUME_CHANGE,'volumeChange']];var nonInteractiveEventTypeNames=[[TOP_ABORT,'abort'],[TOP_ANIMATION_END,'animationEnd'],[TOP_ANIMATION_ITERATION,'animationIteration'],[TOP_ANIMATION_START,'animationStart'],[TOP_CAN_PLAY,'canPlay'],[TOP_CAN_PLAY_THROUGH,'canPlayThrough'],[TOP_DRAG,'drag'],[TOP_DRAG_ENTER,'dragEnter'],[TOP_DRAG_EXIT,'dragExit'],[TOP_DRAG_LEAVE,'dragLeave'],[TOP_DRAG_OVER,'dragOver'],[TOP_DURATION_CHANGE,'durationChange'],[TOP_EMPTIED,'emptied'],[TOP_ENCRYPTED,'encrypted'],[TOP_ENDED,'ended'],[TOP_ERROR,'error'],[TOP_GOT_POINTER_CAPTURE,'gotPointerCapture'],[TOP_LOAD,'load'],[TOP_LOADED_DATA,'loadedData'],[TOP_LOADED_METADATA,'loadedMetadata'],[TOP_LOAD_START,'loadStart'],[TOP_LOST_POINTER_CAPTURE,'lostPointerCapture'],[TOP_MOUSE_MOVE,'mouseMove'],[TOP_MOUSE_OUT,'mouseOut'],[TOP_MOUSE_OVER,'mouseOver'],[TOP_PLAYING,'playing'],[TOP_POINTER_MOVE,'pointerMove'],[TOP_POINTER_OUT,'pointerOut'],[TOP_POINTER_OVER,'pointerOver'],[TOP_PROGRESS,'progress'],[TOP_SCROLL,'scroll'],[TOP_SEEKING,'seeking'],[TOP_STALLED,'stalled'],[TOP_SUSPEND,'suspend'],[TOP_TIME_UPDATE,'timeUpdate'],[TOP_TOGGLE,'toggle'],[TOP_TOUCH_MOVE,'touchMove'],[TOP_TRANSITION_END,'transitionEnd'],[TOP_WAITING,'waiting'],[TOP_WHEEL,'wheel']];var eventTypes$4={};var topLevelEventsToDispatchConfig={};function addEventTypeNameToConfig(_ref,isInteractive){var topEvent=_ref[0],event=_ref[1];var capitalizedEvent=event[0].toUpperCase()+event.slice(1);var onEvent='on'+capitalizedEvent;var type={phasedRegistrationNames:{bubbled:onEvent,captured:onEvent+'Capture'},dependencies:[topEvent],isInteractive:isInteractive};eventTypes$4[event]=type;topLevelEventsToDispatchConfig[topEvent]=type;}interactiveEventTypeNames.forEach(function(eventTuple){addEventTypeNameToConfig(eventTuple,true);});nonInteractiveEventTypeNames.forEach(function(eventTuple){addEventTypeNameToConfig(eventTuple,false);});// Only used in DEV for exhaustiveness validation.
var knownHTMLTopLevelTypes=[TOP_ABORT,TOP_CANCEL,TOP_CAN_PLAY,TOP_CAN_PLAY_THROUGH,TOP_CLOSE,TOP_DURATION_CHANGE,TOP_EMPTIED,TOP_ENCRYPTED,TOP_ENDED,TOP_ERROR,TOP_INPUT,TOP_INVALID,TOP_LOAD,TOP_LOADED_DATA,TOP_LOADED_METADATA,TOP_LOAD_START,TOP_PAUSE,TOP_PLAY,TOP_PLAYING,TOP_PROGRESS,TOP_RATE_CHANGE,TOP_RESET,TOP_SEEKED,TOP_SEEKING,TOP_STALLED,TOP_SUBMIT,TOP_SUSPEND,TOP_TIME_UPDATE,TOP_TOGGLE,TOP_VOLUME_CHANGE,TOP_WAITING];var SimpleEventPlugin={eventTypes:eventTypes$4,isInteractiveTopLevelEventType:function isInteractiveTopLevelEventType(topLevelType){var config=topLevelEventsToDispatchConfig[topLevelType];return config!==undefined&&config.isInteractive===true;},extractEvents:function extractEvents(topLevelType,targetInst,nativeEvent,nativeEventTarget){var dispatchConfig=topLevelEventsToDispatchConfig[topLevelType];if(!dispatchConfig){return null;}var EventConstructor=void 0;switch(topLevelType){case TOP_KEY_PRESS:// Firefox creates a keypress event for function keys too. This removes
// the unwanted keypress events. Enter is however both printable and
// non-printable. One would expect Tab to be as well (but it isn't).
if(getEventCharCode(nativeEvent)===0){return null;}/* falls through */case TOP_KEY_DOWN:case TOP_KEY_UP:EventConstructor=SyntheticKeyboardEvent;break;case TOP_BLUR:case TOP_FOCUS:EventConstructor=SyntheticFocusEvent;break;case TOP_CLICK:// Firefox creates a click event on right mouse clicks. This removes the
// unwanted click events.
if(nativeEvent.button===2){return null;}/* falls through */case TOP_DOUBLE_CLICK:case TOP_MOUSE_DOWN:case TOP_MOUSE_MOVE:case TOP_MOUSE_UP:// TODO: Disabled elements should not respond to mouse events
/* falls through */case TOP_MOUSE_OUT:case TOP_MOUSE_OVER:case TOP_CONTEXT_MENU:EventConstructor=SyntheticMouseEvent;break;case TOP_DRAG:case TOP_DRAG_END:case TOP_DRAG_ENTER:case TOP_DRAG_EXIT:case TOP_DRAG_LEAVE:case TOP_DRAG_OVER:case TOP_DRAG_START:case TOP_DROP:EventConstructor=SyntheticDragEvent;break;case TOP_TOUCH_CANCEL:case TOP_TOUCH_END:case TOP_TOUCH_MOVE:case TOP_TOUCH_START:EventConstructor=SyntheticTouchEvent;break;case TOP_ANIMATION_END:case TOP_ANIMATION_ITERATION:case TOP_ANIMATION_START:EventConstructor=SyntheticAnimationEvent;break;case TOP_TRANSITION_END:EventConstructor=SyntheticTransitionEvent;break;case TOP_SCROLL:EventConstructor=SyntheticUIEvent;break;case TOP_WHEEL:EventConstructor=SyntheticWheelEvent;break;case TOP_COPY:case TOP_CUT:case TOP_PASTE:EventConstructor=SyntheticClipboardEvent;break;case TOP_GOT_POINTER_CAPTURE:case TOP_LOST_POINTER_CAPTURE:case TOP_POINTER_CANCEL:case TOP_POINTER_DOWN:case TOP_POINTER_MOVE:case TOP_POINTER_OUT:case TOP_POINTER_OVER:case TOP_POINTER_UP:EventConstructor=SyntheticPointerEvent;break;default:{if(knownHTMLTopLevelTypes.indexOf(topLevelType)===-1){warning(false,'SimpleEventPlugin: Unhandled event type, `%s`. This warning '+'is likely caused by a bug in React. Please file an issue.',topLevelType);}}// HTML Events
// @see http://www.w3.org/TR/html5/index.html#events-0
EventConstructor=SyntheticEvent$1;break;}var event=EventConstructor.getPooled(dispatchConfig,targetInst,nativeEvent,nativeEventTarget);accumulateTwoPhaseDispatches(event);return event;}};var isInteractiveTopLevelEventType=SimpleEventPlugin.isInteractiveTopLevelEventType;var CALLBACK_BOOKKEEPING_POOL_SIZE=10;var callbackBookkeepingPool=[];/**
 * Find the deepest React component completely containing the root of the
 * passed-in instance (for use when entire React trees are nested within each
 * other). If React trees are not nested, returns null.
 */function findRootContainerNode(inst){// TODO: It may be a good idea to cache this to prevent unnecessary DOM
// traversal, but caching is difficult to do correctly without using a
// mutation observer to listen for all DOM changes.
while(inst.return){inst=inst.return;}if(inst.tag!==HostRoot){// This can happen if we're in a detached tree.
return null;}return inst.stateNode.containerInfo;}// Used to store ancestor hierarchy in top level callback
function getTopLevelCallbackBookKeeping(topLevelType,nativeEvent,targetInst){if(callbackBookkeepingPool.length){var instance=callbackBookkeepingPool.pop();instance.topLevelType=topLevelType;instance.nativeEvent=nativeEvent;instance.targetInst=targetInst;return instance;}return{topLevelType:topLevelType,nativeEvent:nativeEvent,targetInst:targetInst,ancestors:[]};}function releaseTopLevelCallbackBookKeeping(instance){instance.topLevelType=null;instance.nativeEvent=null;instance.targetInst=null;instance.ancestors.length=0;if(callbackBookkeepingPool.length<CALLBACK_BOOKKEEPING_POOL_SIZE){callbackBookkeepingPool.push(instance);}}function handleTopLevel(bookKeeping){var targetInst=bookKeeping.targetInst;// Loop through the hierarchy, in case there's any nested components.
// It's important that we build the array of ancestors before calling any
// event handlers, because event handlers can modify the DOM, leading to
// inconsistencies with ReactMount's node cache. See #1105.
var ancestor=targetInst;do{if(!ancestor){bookKeeping.ancestors.push(ancestor);break;}var root=findRootContainerNode(ancestor);if(!root){break;}bookKeeping.ancestors.push(ancestor);ancestor=getClosestInstanceFromNode(root);}while(ancestor);for(var i=0;i<bookKeeping.ancestors.length;i++){targetInst=bookKeeping.ancestors[i];runExtractedEventsInBatch(bookKeeping.topLevelType,targetInst,bookKeeping.nativeEvent,getEventTarget(bookKeeping.nativeEvent));}}// TODO: can we stop exporting these?
var _enabled=true;function setEnabled(enabled){_enabled=!!enabled;}function isEnabled(){return _enabled;}/**
 * Traps top-level events by using event bubbling.
 *
 * @param {number} topLevelType Number from `TopLevelEventTypes`.
 * @param {object} element Element on which to attach listener.
 * @return {?object} An object with a remove function which will forcefully
 *                  remove the listener.
 * @internal
 */function trapBubbledEvent(topLevelType,element){if(!element){return null;}var dispatch=isInteractiveTopLevelEventType(topLevelType)?dispatchInteractiveEvent:dispatchEvent;addEventBubbleListener(element,getRawEventName(topLevelType),// Check if interactive and wrap in interactiveUpdates
dispatch.bind(null,topLevelType));}/**
 * Traps a top-level event by using event capturing.
 *
 * @param {number} topLevelType Number from `TopLevelEventTypes`.
 * @param {object} element Element on which to attach listener.
 * @return {?object} An object with a remove function which will forcefully
 *                  remove the listener.
 * @internal
 */function trapCapturedEvent(topLevelType,element){if(!element){return null;}var dispatch=isInteractiveTopLevelEventType(topLevelType)?dispatchInteractiveEvent:dispatchEvent;addEventCaptureListener(element,getRawEventName(topLevelType),// Check if interactive and wrap in interactiveUpdates
dispatch.bind(null,topLevelType));}function dispatchInteractiveEvent(topLevelType,nativeEvent){interactiveUpdates(dispatchEvent,topLevelType,nativeEvent);}function dispatchEvent(topLevelType,nativeEvent){if(!_enabled){return;}var nativeEventTarget=getEventTarget(nativeEvent);var targetInst=getClosestInstanceFromNode(nativeEventTarget);if(targetInst!==null&&typeof targetInst.tag==='number'&&!isFiberMounted(targetInst)){// If we get an event (ex: img onload) before committing that
// component's mount, ignore it for now (that is, treat it as if it was an
// event on a non-React tree). We might also consider queueing events and
// dispatching them after the mount.
targetInst=null;}var bookKeeping=getTopLevelCallbackBookKeeping(topLevelType,nativeEvent,targetInst);try{// Event queue being processed in the same cycle allows
// `preventDefault`.
batchedUpdates(handleTopLevel,bookKeeping);}finally{releaseTopLevelCallbackBookKeeping(bookKeeping);}}var ReactDOMEventListener=Object.freeze({get _enabled(){return _enabled;},setEnabled:setEnabled,isEnabled:isEnabled,trapBubbledEvent:trapBubbledEvent,trapCapturedEvent:trapCapturedEvent,dispatchEvent:dispatchEvent});/**
 * Summary of `ReactBrowserEventEmitter` event handling:
 *
 *  - Top-level delegation is used to trap most native browser events. This
 *    may only occur in the main thread and is the responsibility of
 *    ReactDOMEventListener, which is injected and can therefore support
 *    pluggable event sources. This is the only work that occurs in the main
 *    thread.
 *
 *  - We normalize and de-duplicate events to account for browser quirks. This
 *    may be done in the worker thread.
 *
 *  - Forward these native events (with the associated top-level type used to
 *    trap it) to `EventPluginHub`, which in turn will ask plugins if they want
 *    to extract any synthetic events.
 *
 *  - The `EventPluginHub` will then process each event by annotating them with
 *    "dispatches", a sequence of listeners and IDs that care about that event.
 *
 *  - The `EventPluginHub` then dispatches the events.
 *
 * Overview of React and the event system:
 *
 * +------------+    .
 * |    DOM     |    .
 * +------------+    .
 *       |           .
 *       v           .
 * +------------+    .
 * | ReactEvent |    .
 * |  Listener  |    .
 * +------------+    .                         +-----------+
 *       |           .               +--------+|SimpleEvent|
 *       |           .               |         |Plugin     |
 * +-----|------+    .               v         +-----------+
 * |     |      |    .    +--------------+                    +------------+
 * |     +-----------.--->|EventPluginHub|                    |    Event   |
 * |            |    .    |              |     +-----------+  | Propagators|
 * | ReactEvent |    .    |              |     |TapEvent   |  |------------|
 * |  Emitter   |    .    |              |<---+|Plugin     |  |other plugin|
 * |            |    .    |              |     +-----------+  |  utilities |
 * |     +-----------.--->|              |                    +------------+
 * |     |      |    .    +--------------+
 * +-----|------+    .                ^        +-----------+
 *       |           .                |        |Enter/Leave|
 *       +           .                +-------+|Plugin     |
 * +-------------+   .                         +-----------+
 * | application |   .
 * |-------------|   .
 * |             |   .
 * |             |   .
 * +-------------+   .
 *                   .
 *    React Core     .  General Purpose Event Plugin System
 */var alreadyListeningTo={};var reactTopListenersCounter=0;/**
 * To ensure no conflicts with other potential React instances on the page
 */var topListenersIDKey='_reactListenersID'+(''+Math.random()).slice(2);function getListeningForDocument(mountAt){// In IE8, `mountAt` is a host object and doesn't have `hasOwnProperty`
// directly.
if(!Object.prototype.hasOwnProperty.call(mountAt,topListenersIDKey)){mountAt[topListenersIDKey]=reactTopListenersCounter++;alreadyListeningTo[mountAt[topListenersIDKey]]={};}return alreadyListeningTo[mountAt[topListenersIDKey]];}/**
 * We listen for bubbled touch events on the document object.
 *
 * Firefox v8.01 (and possibly others) exhibited strange behavior when
 * mounting `onmousemove` events at some node that was not the document
 * element. The symptoms were that if your mouse is not moving over something
 * contained within that mount point (for example on the background) the
 * top-level listeners for `onmousemove` won't be called. However, if you
 * register the `mousemove` on the document object, then it will of course
 * catch all `mousemove`s. This along with iOS quirks, justifies restricting
 * top-level listeners to the document object only, at least for these
 * movement types of events and possibly all events.
 *
 * @see http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html
 *
 * Also, `keyup`/`keypress`/`keydown` do not bubble to the window on IE, but
 * they bubble to document.
 *
 * @param {string} registrationName Name of listener (e.g. `onClick`).
 * @param {object} mountAt Container where to mount the listener
 */function listenTo(registrationName,mountAt){var isListening=getListeningForDocument(mountAt);var dependencies=registrationNameDependencies[registrationName];for(var i=0;i<dependencies.length;i++){var dependency=dependencies[i];if(!(isListening.hasOwnProperty(dependency)&&isListening[dependency])){switch(dependency){case TOP_SCROLL:trapCapturedEvent(TOP_SCROLL,mountAt);break;case TOP_FOCUS:case TOP_BLUR:trapCapturedEvent(TOP_FOCUS,mountAt);trapCapturedEvent(TOP_BLUR,mountAt);// We set the flag for a single dependency later in this function,
// but this ensures we mark both as attached rather than just one.
isListening[TOP_BLUR]=true;isListening[TOP_FOCUS]=true;break;case TOP_CANCEL:case TOP_CLOSE:if(isEventSupported(getRawEventName(dependency),true)){trapCapturedEvent(dependency,mountAt);}break;case TOP_INVALID:case TOP_SUBMIT:case TOP_RESET:// We listen to them on the target DOM elements.
// Some of them bubble so we don't want them to fire twice.
break;default:// By default, listen on the top level to all non-media events.
// Media events don't bubble so adding the listener wouldn't do anything.
var isMediaEvent=mediaEventTypes.indexOf(dependency)!==-1;if(!isMediaEvent){trapBubbledEvent(dependency,mountAt);}break;}isListening[dependency]=true;}}}function isListeningToAllDependencies(registrationName,mountAt){var isListening=getListeningForDocument(mountAt);var dependencies=registrationNameDependencies[registrationName];for(var i=0;i<dependencies.length;i++){var dependency=dependencies[i];if(!(isListening.hasOwnProperty(dependency)&&isListening[dependency])){return false;}}return true;}/**
 * Given any node return the first leaf node without children.
 *
 * @param {DOMElement|DOMTextNode} node
 * @return {DOMElement|DOMTextNode}
 */function getLeafNode(node){while(node&&node.firstChild){node=node.firstChild;}return node;}/**
 * Get the next sibling within a container. This will walk up the
 * DOM if a node's siblings have been exhausted.
 *
 * @param {DOMElement|DOMTextNode} node
 * @return {?DOMElement|DOMTextNode}
 */function getSiblingNode(node){while(node){if(node.nextSibling){return node.nextSibling;}node=node.parentNode;}}/**
 * Get object describing the nodes which contain characters at offset.
 *
 * @param {DOMElement|DOMTextNode} root
 * @param {number} offset
 * @return {?object}
 */function getNodeForCharacterOffset(root,offset){var node=getLeafNode(root);var nodeStart=0;var nodeEnd=0;while(node){if(node.nodeType===TEXT_NODE){nodeEnd=nodeStart+node.textContent.length;if(nodeStart<=offset&&nodeEnd>=offset){return{node:node,offset:offset-nodeStart};}nodeStart=nodeEnd;}node=getLeafNode(getSiblingNode(node));}}/**
 * @param {DOMElement} outerNode
 * @return {?object}
 */function getOffsets(outerNode){var selection=window.getSelection&&window.getSelection();if(!selection||selection.rangeCount===0){return null;}var anchorNode=selection.anchorNode,anchorOffset=selection.anchorOffset,focusNode=selection.focusNode,focusOffset=selection.focusOffset;// In Firefox, anchorNode and focusNode can be "anonymous divs", e.g. the
// up/down buttons on an <input type="number">. Anonymous divs do not seem to
// expose properties, triggering a "Permission denied error" if any of its
// properties are accessed. The only seemingly possible way to avoid erroring
// is to access a property that typically works for non-anonymous divs and
// catch any error that may otherwise arise. See
// https://bugzilla.mozilla.org/show_bug.cgi?id=208427
try{/* eslint-disable no-unused-expressions */anchorNode.nodeType;focusNode.nodeType;/* eslint-enable no-unused-expressions */}catch(e){return null;}return getModernOffsetsFromPoints(outerNode,anchorNode,anchorOffset,focusNode,focusOffset);}/**
 * Returns {start, end} where `start` is the character/codepoint index of
 * (anchorNode, anchorOffset) within the textContent of `outerNode`, and
 * `end` is the index of (focusNode, focusOffset).
 *
 * Returns null if you pass in garbage input but we should probably just crash.
 *
 * Exported only for testing.
 */function getModernOffsetsFromPoints(outerNode,anchorNode,anchorOffset,focusNode,focusOffset){var length=0;var start=-1;var end=-1;var indexWithinAnchor=0;var indexWithinFocus=0;var node=outerNode;var parentNode=null;outer:while(true){var next=null;while(true){if(node===anchorNode&&(anchorOffset===0||node.nodeType===TEXT_NODE)){start=length+anchorOffset;}if(node===focusNode&&(focusOffset===0||node.nodeType===TEXT_NODE)){end=length+focusOffset;}if(node.nodeType===TEXT_NODE){length+=node.nodeValue.length;}if((next=node.firstChild)===null){break;}// Moving from `node` to its first child `next`.
parentNode=node;node=next;}while(true){if(node===outerNode){// If `outerNode` has children, this is always the second time visiting
// it. If it has no children, this is still the first loop, and the only
// valid selection is anchorNode and focusNode both equal to this node
// and both offsets 0, in which case we will have handled above.
break outer;}if(parentNode===anchorNode&&++indexWithinAnchor===anchorOffset){start=length;}if(parentNode===focusNode&&++indexWithinFocus===focusOffset){end=length;}if((next=node.nextSibling)!==null){break;}node=parentNode;parentNode=node.parentNode;}// Moving from `node` to its next sibling `next`.
node=next;}if(start===-1||end===-1){// This should never happen. (Would happen if the anchor/focus nodes aren't
// actually inside the passed-in node.)
return null;}return{start:start,end:end};}/**
 * In modern non-IE browsers, we can support both forward and backward
 * selections.
 *
 * Note: IE10+ supports the Selection object, but it does not support
 * the `extend` method, which means that even in modern IE, it's not possible
 * to programmatically create a backward selection. Thus, for all IE
 * versions, we use the old IE API to create our selections.
 *
 * @param {DOMElement|DOMTextNode} node
 * @param {object} offsets
 */function setOffsets(node,offsets){if(!window.getSelection){return;}var selection=window.getSelection();var length=node[getTextContentAccessor()].length;var start=Math.min(offsets.start,length);var end=offsets.end===undefined?start:Math.min(offsets.end,length);// IE 11 uses modern selection, but doesn't support the extend method.
// Flip backward selections, so we can set with a single range.
if(!selection.extend&&start>end){var temp=end;end=start;start=temp;}var startMarker=getNodeForCharacterOffset(node,start);var endMarker=getNodeForCharacterOffset(node,end);if(startMarker&&endMarker){if(selection.rangeCount===1&&selection.anchorNode===startMarker.node&&selection.anchorOffset===startMarker.offset&&selection.focusNode===endMarker.node&&selection.focusOffset===endMarker.offset){return;}var range=document.createRange();range.setStart(startMarker.node,startMarker.offset);selection.removeAllRanges();if(start>end){selection.addRange(range);selection.extend(endMarker.node,endMarker.offset);}else{range.setEnd(endMarker.node,endMarker.offset);selection.addRange(range);}}}function isInDocument(node){return containsNode(document.documentElement,node);}/**
 * @ReactInputSelection: React input selection module. Based on Selection.js,
 * but modified to be suitable for react and has a couple of bug fixes (doesn't
 * assume buttons have range selections allowed).
 * Input selection module for React.
 */function hasSelectionCapabilities(elem){var nodeName=elem&&elem.nodeName&&elem.nodeName.toLowerCase();return nodeName&&(nodeName==='input'&&elem.type==='text'||nodeName==='textarea'||elem.contentEditable==='true');}function getSelectionInformation(){var focusedElem=getActiveElement();return{focusedElem:focusedElem,selectionRange:hasSelectionCapabilities(focusedElem)?getSelection$1(focusedElem):null};}/**
 * @restoreSelection: If any selection information was potentially lost,
 * restore it. This is useful when performing operations that could remove dom
 * nodes and place them back in, resulting in focus being lost.
 */function restoreSelection(priorSelectionInformation){var curFocusedElem=getActiveElement();var priorFocusedElem=priorSelectionInformation.focusedElem;var priorSelectionRange=priorSelectionInformation.selectionRange;if(curFocusedElem!==priorFocusedElem&&isInDocument(priorFocusedElem)){if(hasSelectionCapabilities(priorFocusedElem)){setSelection(priorFocusedElem,priorSelectionRange);}// Focusing a node can change the scroll position, which is undesirable
var ancestors=[];var ancestor=priorFocusedElem;while(ancestor=ancestor.parentNode){if(ancestor.nodeType===ELEMENT_NODE){ancestors.push({element:ancestor,left:ancestor.scrollLeft,top:ancestor.scrollTop});}}priorFocusedElem.focus();for(var i=0;i<ancestors.length;i++){var info=ancestors[i];info.element.scrollLeft=info.left;info.element.scrollTop=info.top;}}}/**
 * @getSelection: Gets the selection bounds of a focused textarea, input or
 * contentEditable node.
 * -@input: Look up selection bounds of this input
 * -@return {start: selectionStart, end: selectionEnd}
 */function getSelection$1(input){var selection=void 0;if('selectionStart'in input){// Modern browser with input or textarea.
selection={start:input.selectionStart,end:input.selectionEnd};}else{// Content editable or old IE textarea.
selection=getOffsets(input);}return selection||{start:0,end:0};}/**
 * @setSelection: Sets the selection bounds of a textarea or input and focuses
 * the input.
 * -@input     Set selection bounds of this input or textarea
 * -@offsets   Object of same form that is returned from get*
 */function setSelection(input,offsets){var start=offsets.start,end=offsets.end;if(end===undefined){end=start;}if('selectionStart'in input){input.selectionStart=start;input.selectionEnd=Math.min(end,input.value.length);}else{setOffsets(input,offsets);}}var skipSelectionChangeEvent=ExecutionEnvironment.canUseDOM&&'documentMode'in document&&document.documentMode<=11;var eventTypes$3={select:{phasedRegistrationNames:{bubbled:'onSelect',captured:'onSelectCapture'},dependencies:[TOP_BLUR,TOP_CONTEXT_MENU,TOP_FOCUS,TOP_KEY_DOWN,TOP_KEY_UP,TOP_MOUSE_DOWN,TOP_MOUSE_UP,TOP_SELECTION_CHANGE]}};var activeElement$1=null;var activeElementInst$1=null;var lastSelection=null;var mouseDown=false;/**
 * Get an object which is a unique representation of the current selection.
 *
 * The return value will not be consistent across nodes or browsers, but
 * two identical selections on the same node will return identical objects.
 *
 * @param {DOMElement} node
 * @return {object}
 */function getSelection(node){if('selectionStart'in node&&hasSelectionCapabilities(node)){return{start:node.selectionStart,end:node.selectionEnd};}else if(window.getSelection){var selection=window.getSelection();return{anchorNode:selection.anchorNode,anchorOffset:selection.anchorOffset,focusNode:selection.focusNode,focusOffset:selection.focusOffset};}}/**
 * Poll selection to see whether it's changed.
 *
 * @param {object} nativeEvent
 * @return {?SyntheticEvent}
 */function constructSelectEvent(nativeEvent,nativeEventTarget){// Ensure we have the right element, and that the user is not dragging a
// selection (this matches native `select` event behavior). In HTML5, select
// fires only on input and textarea thus if there's no focused element we
// won't dispatch.
if(mouseDown||activeElement$1==null||activeElement$1!==getActiveElement()){return null;}// Only fire when selection has actually changed.
var currentSelection=getSelection(activeElement$1);if(!lastSelection||!shallowEqual(lastSelection,currentSelection)){lastSelection=currentSelection;var syntheticEvent=SyntheticEvent$1.getPooled(eventTypes$3.select,activeElementInst$1,nativeEvent,nativeEventTarget);syntheticEvent.type='select';syntheticEvent.target=activeElement$1;accumulateTwoPhaseDispatches(syntheticEvent);return syntheticEvent;}return null;}/**
 * This plugin creates an `onSelect` event that normalizes select events
 * across form elements.
 *
 * Supported elements are:
 * - input (see `isTextInputElement`)
 * - textarea
 * - contentEditable
 *
 * This differs from native browser implementations in the following ways:
 * - Fires on contentEditable fields as well as inputs.
 * - Fires for collapsed selection.
 * - Fires after user input.
 */var SelectEventPlugin={eventTypes:eventTypes$3,extractEvents:function extractEvents(topLevelType,targetInst,nativeEvent,nativeEventTarget){var doc=nativeEventTarget.window===nativeEventTarget?nativeEventTarget.document:nativeEventTarget.nodeType===DOCUMENT_NODE?nativeEventTarget:nativeEventTarget.ownerDocument;// Track whether all listeners exists for this plugin. If none exist, we do
// not extract events. See #3639.
if(!doc||!isListeningToAllDependencies('onSelect',doc)){return null;}var targetNode=targetInst?getNodeFromInstance$1(targetInst):window;switch(topLevelType){// Track the input node that has focus.
case TOP_FOCUS:if(isTextInputElement(targetNode)||targetNode.contentEditable==='true'){activeElement$1=targetNode;activeElementInst$1=targetInst;lastSelection=null;}break;case TOP_BLUR:activeElement$1=null;activeElementInst$1=null;lastSelection=null;break;// Don't fire the event while the user is dragging. This matches the
// semantics of the native select event.
case TOP_MOUSE_DOWN:mouseDown=true;break;case TOP_CONTEXT_MENU:case TOP_MOUSE_UP:mouseDown=false;return constructSelectEvent(nativeEvent,nativeEventTarget);// Chrome and IE fire non-standard event when selection is changed (and
// sometimes when it hasn't). IE's event fires out of order with respect
// to key and input events on deletion, so we discard it.
//
// Firefox doesn't support selectionchange, so check selection status
// after each key entry. The selection changes after keydown and before
// keyup, but we check on keydown as well in the case of holding down a
// key, when multiple keydown events are fired but only one keyup is.
// This is also our approach for IE handling, for the reason above.
case TOP_SELECTION_CHANGE:if(skipSelectionChangeEvent){break;}// falls through
case TOP_KEY_DOWN:case TOP_KEY_UP:return constructSelectEvent(nativeEvent,nativeEventTarget);}return null;}};/**
 * Inject modules for resolving DOM hierarchy and plugin ordering.
 */injection.injectEventPluginOrder(DOMEventPluginOrder);injection$1.injectComponentTree(ReactDOMComponentTree);/**
 * Some important event plugins included by default (without having to require
 * them).
 */injection.injectEventPluginsByName({SimpleEventPlugin:SimpleEventPlugin,EnterLeaveEventPlugin:EnterLeaveEventPlugin,ChangeEventPlugin:ChangeEventPlugin,SelectEventPlugin:SelectEventPlugin,BeforeInputEventPlugin:BeforeInputEventPlugin});{if(ExecutionEnvironment.canUseDOM&&typeof requestAnimationFrame!=='function'){warning(false,'React depends on requestAnimationFrame. Make sure that you load a '+'polyfill in older browsers. https://fb.me/react-polyfills');}}/**
 * A scheduling library to allow scheduling work with more granular priority and
 * control than requestAnimationFrame and requestIdleCallback.
 * Current TODO items:
 * X- Pull out the scheduleWork polyfill built into React
 * X- Initial test coverage
 * X- Support for multiple callbacks
 * - Support for two priorities; serial and deferred
 * - Better test coverage
 * - Better docblock
 * - Polish documentation, API
 */// This is a built-in polyfill for requestIdleCallback. It works by scheduling
// a requestAnimationFrame, storing the time for the start of the frame, then
// scheduling a postMessage which gets scheduled after paint. Within the
// postMessage handler do as much work as possible until time + frame rate.
// By separating the idle call into a separate event tick we ensure that
// layout, paint and other browser work is counted against the available time.
// The frame rate is dynamically adjusted.
var hasNativePerformanceNow=(typeof performance==='undefined'?'undefined':_typeof(performance))==='object'&&typeof performance.now==='function';var now$1=void 0;if(hasNativePerformanceNow){now$1=function now$1(){return performance.now();};}else{now$1=function now$1(){return Date.now();};}// TODO: There's no way to cancel, because Fiber doesn't atm.
var scheduleWork=void 0;var cancelScheduledWork=void 0;if(!ExecutionEnvironment.canUseDOM){var callbackIdCounter=0;// Timeouts are objects in Node.
// For consistency, we'll use numbers in the public API anyway.
var timeoutIds={};scheduleWork=function scheduleWork(callback,options){var callbackId=callbackIdCounter++;var timeoutId=setTimeout(function(){callback({timeRemaining:function timeRemaining(){return Infinity;},didTimeout:false});});timeoutIds[callbackId]=timeoutId;return callbackId;};cancelScheduledWork=function cancelScheduledWork(callbackId){var timeoutId=timeoutIds[callbackId];delete timeoutIds[callbackId];clearTimeout(timeoutId);};}else{// We keep callbacks in a queue.
// Calling scheduleWork will push in a new callback at the end of the queue.
// When we get idle time, callbacks are removed from the front of the queue
var pendingCallbacks=[];var _callbackIdCounter=0;var getCallbackId=function getCallbackId(){_callbackIdCounter++;return _callbackIdCounter;};// When a callback is scheduled, we register it by adding it's id to this
// object.
// If the user calls 'cancelScheduledWork' with the id of that callback, it will be
// unregistered by removing the id from this object.
// Then we skip calling any callback which is not registered.
// This means cancelling is an O(1) time complexity instead of O(n).
var registeredCallbackIds={};// We track what the next soonest timeoutTime is, to be able to quickly tell
// if none of the scheduled callbacks have timed out.
var nextSoonestTimeoutTime=-1;var isIdleScheduled=false;var isAnimationFrameScheduled=false;var frameDeadline=0;// We start out assuming that we run at 30fps but then the heuristic tracking
// will adjust this value to a faster fps if we get more frequent animation
// frames.
var previousFrameTime=33;var activeFrameTime=33;var frameDeadlineObject={didTimeout:false,timeRemaining:function timeRemaining(){var remaining=frameDeadline-now$1();return remaining>0?remaining:0;}};var safelyCallScheduledCallback=function safelyCallScheduledCallback(callback,callbackId){if(!registeredCallbackIds[callbackId]){// ignore cancelled callbacks
return;}try{callback(frameDeadlineObject);// Avoid using 'catch' to keep errors easy to debug
}finally{// always clean up the callbackId, even if the callback throws
delete registeredCallbackIds[callbackId];}};/**
   * Checks for timed out callbacks, runs them, and then checks again to see if
   * any more have timed out.
   * Keeps doing this until there are none which have currently timed out.
   */var callTimedOutCallbacks=function callTimedOutCallbacks(){if(pendingCallbacks.length===0){return;}var currentTime=now$1();// TODO: this would be more efficient if deferred callbacks are stored in
// min heap.
// Or in a linked list with links for both timeoutTime order and insertion
// order.
// For now an easy compromise is the current approach:
// Keep a pointer to the soonest timeoutTime, and check that first.
// If it has not expired, we can skip traversing the whole list.
// If it has expired, then we step through all the callbacks.
if(nextSoonestTimeoutTime===-1||nextSoonestTimeoutTime>currentTime){// We know that none of them have timed out yet.
return;}nextSoonestTimeoutTime=-1;// we will reset it below
// keep checking until we don't find any more timed out callbacks
frameDeadlineObject.didTimeout=true;for(var i=0,len=pendingCallbacks.length;i<len;i++){var currentCallbackConfig=pendingCallbacks[i];var _timeoutTime=currentCallbackConfig.timeoutTime;if(_timeoutTime!==-1&&_timeoutTime<=currentTime){// it has timed out!
// call it
var _callback=currentCallbackConfig.scheduledCallback;safelyCallScheduledCallback(_callback,currentCallbackConfig.callbackId);}else{if(_timeoutTime!==-1&&(nextSoonestTimeoutTime===-1||_timeoutTime<nextSoonestTimeoutTime)){nextSoonestTimeoutTime=_timeoutTime;}}}};// We use the postMessage trick to defer idle work until after the repaint.
var messageKey='__reactIdleCallback$'+Math.random().toString(36).slice(2);var idleTick=function idleTick(event){if(event.source!==window||event.data!==messageKey){return;}isIdleScheduled=false;if(pendingCallbacks.length===0){return;}// First call anything which has timed out, until we have caught up.
callTimedOutCallbacks();var currentTime=now$1();// Next, as long as we have idle time, try calling more callbacks.
while(frameDeadline-currentTime>0&&pendingCallbacks.length>0){var latestCallbackConfig=pendingCallbacks.shift();frameDeadlineObject.didTimeout=false;var latestCallback=latestCallbackConfig.scheduledCallback;var newCallbackId=latestCallbackConfig.callbackId;safelyCallScheduledCallback(latestCallback,newCallbackId);currentTime=now$1();}if(pendingCallbacks.length>0){if(!isAnimationFrameScheduled){// Schedule another animation callback so we retry later.
isAnimationFrameScheduled=true;requestAnimationFrame(animationTick);}}};// Assumes that we have addEventListener in this environment. Might need
// something better for old IE.
window.addEventListener('message',idleTick,false);var animationTick=function animationTick(rafTime){isAnimationFrameScheduled=false;var nextFrameTime=rafTime-frameDeadline+activeFrameTime;if(nextFrameTime<activeFrameTime&&previousFrameTime<activeFrameTime){if(nextFrameTime<8){// Defensive coding. We don't support higher frame rates than 120hz.
// If we get lower than that, it is probably a bug.
nextFrameTime=8;}// If one frame goes long, then the next one can be short to catch up.
// If two frames are short in a row, then that's an indication that we
// actually have a higher frame rate than what we're currently optimizing.
// We adjust our heuristic dynamically accordingly. For example, if we're
// running on 120hz display or 90hz VR display.
// Take the max of the two in case one of them was an anomaly due to
// missed frame deadlines.
activeFrameTime=nextFrameTime<previousFrameTime?previousFrameTime:nextFrameTime;}else{previousFrameTime=nextFrameTime;}frameDeadline=rafTime+activeFrameTime;if(!isIdleScheduled){isIdleScheduled=true;window.postMessage(messageKey,'*');}};scheduleWork=function scheduleWork(callback,options){var timeoutTime=-1;if(options!=null&&typeof options.timeout==='number'){timeoutTime=now$1()+options.timeout;}if(nextSoonestTimeoutTime===-1||timeoutTime!==-1&&timeoutTime<nextSoonestTimeoutTime){nextSoonestTimeoutTime=timeoutTime;}var newCallbackId=getCallbackId();var scheduledCallbackConfig={scheduledCallback:callback,callbackId:newCallbackId,timeoutTime:timeoutTime};pendingCallbacks.push(scheduledCallbackConfig);registeredCallbackIds[newCallbackId]=true;if(!isAnimationFrameScheduled){// If rAF didn't already schedule one, we need to schedule a frame.
// TODO: If this rAF doesn't materialize because the browser throttles, we
// might want to still have setTimeout trigger scheduleWork as a backup to ensure
// that we keep performing work.
isAnimationFrameScheduled=true;requestAnimationFrame(animationTick);}return newCallbackId;};cancelScheduledWork=function cancelScheduledWork(callbackId){delete registeredCallbackIds[callbackId];};}var didWarnSelectedSetOnOption=false;function flattenChildren(children){var content='';// Flatten children and warn if they aren't strings or numbers;
// invalid types are ignored.
// We can silently skip them because invalid DOM nesting warning
// catches these cases in Fiber.
React.Children.forEach(children,function(child){if(child==null){return;}if(typeof child==='string'||typeof child==='number'){content+=child;}});return content;}/**
 * Implements an <option> host component that warns when `selected` is set.
 */function validateProps(element,props){// TODO (yungsters): Remove support for `selected` in <option>.
{if(props.selected!=null&&!didWarnSelectedSetOnOption){warning(false,'Use the `defaultValue` or `value` props on <select> instead of '+'setting `selected` on <option>.');didWarnSelectedSetOnOption=true;}}}function postMountWrapper$1(element,props){// value="" should make a value attribute (#6219)
if(props.value!=null){element.setAttribute('value',props.value);}}function getHostProps$1(element,props){var hostProps=_assign({children:undefined},props);var content=flattenChildren(props.children);if(content){hostProps.children=content;}return hostProps;}// TODO: direct imports like some-package/src/* are bad. Fix me.
var getCurrentFiberOwnerName$3=ReactDebugCurrentFiber.getCurrentFiberOwnerName;var getCurrentFiberStackAddendum$3=ReactDebugCurrentFiber.getCurrentFiberStackAddendum;var didWarnValueDefaultValue$1=void 0;{didWarnValueDefaultValue$1=false;}function getDeclarationErrorAddendum(){var ownerName=getCurrentFiberOwnerName$3();if(ownerName){return'\n\nCheck the render method of `'+ownerName+'`.';}return'';}var valuePropNames=['value','defaultValue'];/**
 * Validation function for `value` and `defaultValue`.
 */function checkSelectPropTypes(props){ReactControlledValuePropTypes.checkPropTypes('select',props,getCurrentFiberStackAddendum$3);for(var i=0;i<valuePropNames.length;i++){var propName=valuePropNames[i];if(props[propName]==null){continue;}var isArray=Array.isArray(props[propName]);if(props.multiple&&!isArray){warning(false,'The `%s` prop supplied to <select> must be an array if '+'`multiple` is true.%s',propName,getDeclarationErrorAddendum());}else if(!props.multiple&&isArray){warning(false,'The `%s` prop supplied to <select> must be a scalar '+'value if `multiple` is false.%s',propName,getDeclarationErrorAddendum());}}}function updateOptions(node,multiple,propValue,setDefaultSelected){var options=node.options;if(multiple){var selectedValues=propValue;var selectedValue={};for(var i=0;i<selectedValues.length;i++){// Prefix to avoid chaos with special keys.
selectedValue['$'+selectedValues[i]]=true;}for(var _i=0;_i<options.length;_i++){var selected=selectedValue.hasOwnProperty('$'+options[_i].value);if(options[_i].selected!==selected){options[_i].selected=selected;}if(selected&&setDefaultSelected){options[_i].defaultSelected=true;}}}else{// Do not set `select.value` as exact behavior isn't consistent across all
// browsers for all cases.
var _selectedValue=''+propValue;var defaultSelected=null;for(var _i2=0;_i2<options.length;_i2++){if(options[_i2].value===_selectedValue){options[_i2].selected=true;if(setDefaultSelected){options[_i2].defaultSelected=true;}return;}if(defaultSelected===null&&!options[_i2].disabled){defaultSelected=options[_i2];}}if(defaultSelected!==null){defaultSelected.selected=true;}}}/**
 * Implements a <select> host component that allows optionally setting the
 * props `value` and `defaultValue`. If `multiple` is false, the prop must be a
 * stringable. If `multiple` is true, the prop must be an array of stringables.
 *
 * If `value` is not supplied (or null/undefined), user actions that change the
 * selected option will trigger updates to the rendered options.
 *
 * If it is supplied (and not null/undefined), the rendered options will not
 * update in response to user actions. Instead, the `value` prop must change in
 * order for the rendered options to update.
 *
 * If `defaultValue` is provided, any options with the supplied values will be
 * selected.
 */function getHostProps$2(element,props){return _assign({},props,{value:undefined});}function initWrapperState$1(element,props){var node=element;{checkSelectPropTypes(props);}var value=props.value;node._wrapperState={initialValue:value!=null?value:props.defaultValue,wasMultiple:!!props.multiple};{if(props.value!==undefined&&props.defaultValue!==undefined&&!didWarnValueDefaultValue$1){warning(false,'Select elements must be either controlled or uncontrolled '+'(specify either the value prop, or the defaultValue prop, but not '+'both). Decide between using a controlled or uncontrolled select '+'element and remove one of these props. More info: '+'https://fb.me/react-controlled-components');didWarnValueDefaultValue$1=true;}}}function postMountWrapper$2(element,props){var node=element;node.multiple=!!props.multiple;var value=props.value;if(value!=null){updateOptions(node,!!props.multiple,value,false);}else if(props.defaultValue!=null){updateOptions(node,!!props.multiple,props.defaultValue,true);}}function postUpdateWrapper(element,props){var node=element;// After the initial mount, we control selected-ness manually so don't pass
// this value down
node._wrapperState.initialValue=undefined;var wasMultiple=node._wrapperState.wasMultiple;node._wrapperState.wasMultiple=!!props.multiple;var value=props.value;if(value!=null){updateOptions(node,!!props.multiple,value,false);}else if(wasMultiple!==!!props.multiple){// For simplicity, reapply `defaultValue` if `multiple` is toggled.
if(props.defaultValue!=null){updateOptions(node,!!props.multiple,props.defaultValue,true);}else{// Revert the select back to its default unselected state.
updateOptions(node,!!props.multiple,props.multiple?[]:'',false);}}}function restoreControlledState$2(element,props){var node=element;var value=props.value;if(value!=null){updateOptions(node,!!props.multiple,value,false);}}// TODO: direct imports like some-package/src/* are bad. Fix me.
var getCurrentFiberStackAddendum$4=ReactDebugCurrentFiber.getCurrentFiberStackAddendum;var didWarnValDefaultVal=false;/**
 * Implements a <textarea> host component that allows setting `value`, and
 * `defaultValue`. This differs from the traditional DOM API because value is
 * usually set as PCDATA children.
 *
 * If `value` is not supplied (or null/undefined), user actions that affect the
 * value will trigger updates to the element.
 *
 * If `value` is supplied (and not null/undefined), the rendered element will
 * not trigger updates to the element. Instead, the `value` prop must change in
 * order for the rendered element to be updated.
 *
 * The rendered element will be initialized with an empty value, the prop
 * `defaultValue` if specified, or the children content (deprecated).
 */function getHostProps$3(element,props){var node=element;!(props.dangerouslySetInnerHTML==null)?invariant(false,'`dangerouslySetInnerHTML` does not make sense on <textarea>.'):void 0;// Always set children to the same thing. In IE9, the selection range will
// get reset if `textContent` is mutated.  We could add a check in setTextContent
// to only set the value if/when the value differs from the node value (which would
// completely solve this IE9 bug), but Sebastian+Sophie seemed to like this
// solution. The value can be a boolean or object so that's why it's forced
// to be a string.
var hostProps=_assign({},props,{value:undefined,defaultValue:undefined,children:''+node._wrapperState.initialValue});return hostProps;}function initWrapperState$2(element,props){var node=element;{ReactControlledValuePropTypes.checkPropTypes('textarea',props,getCurrentFiberStackAddendum$4);if(props.value!==undefined&&props.defaultValue!==undefined&&!didWarnValDefaultVal){warning(false,'Textarea elements must be either controlled or uncontrolled '+'(specify either the value prop, or the defaultValue prop, but not '+'both). Decide between using a controlled or uncontrolled textarea '+'and remove one of these props. More info: '+'https://fb.me/react-controlled-components');didWarnValDefaultVal=true;}}var initialValue=props.value;// Only bother fetching default value if we're going to use it
if(initialValue==null){var defaultValue=props.defaultValue;// TODO (yungsters): Remove support for children content in <textarea>.
var children=props.children;if(children!=null){{warning(false,'Use the `defaultValue` or `value` props instead of setting '+'children on <textarea>.');}!(defaultValue==null)?invariant(false,'If you supply `defaultValue` on a <textarea>, do not pass children.'):void 0;if(Array.isArray(children)){!(children.length<=1)?invariant(false,'<textarea> can only have at most one child.'):void 0;children=children[0];}defaultValue=''+children;}if(defaultValue==null){defaultValue='';}initialValue=defaultValue;}node._wrapperState={initialValue:''+initialValue};}function updateWrapper$1(element,props){var node=element;var value=props.value;if(value!=null){// Cast `value` to a string to ensure the value is set correctly. While
// browsers typically do this as necessary, jsdom doesn't.
var newValue=''+value;// To avoid side effects (such as losing text selection), only set value if changed
if(newValue!==node.value){node.value=newValue;}if(props.defaultValue==null){node.defaultValue=newValue;}}if(props.defaultValue!=null){node.defaultValue=props.defaultValue;}}function postMountWrapper$3(element,props){var node=element;// This is in postMount because we need access to the DOM node, which is not
// available until after the component has mounted.
var textContent=node.textContent;// Only set node.value if textContent is equal to the expected
// initial value. In IE10/IE11 there is a bug where the placeholder attribute
// will populate textContent as well.
// https://developer.microsoft.com/microsoft-edge/platform/issues/101525/
if(textContent===node._wrapperState.initialValue){node.value=textContent;}}function restoreControlledState$3(element,props){// DOM component is still mounted; update
updateWrapper$1(element,props);}var HTML_NAMESPACE$1='http://www.w3.org/1999/xhtml';var MATH_NAMESPACE='http://www.w3.org/1998/Math/MathML';var SVG_NAMESPACE='http://www.w3.org/2000/svg';var Namespaces={html:HTML_NAMESPACE$1,mathml:MATH_NAMESPACE,svg:SVG_NAMESPACE};// Assumes there is no parent namespace.
function getIntrinsicNamespace(type){switch(type){case'svg':return SVG_NAMESPACE;case'math':return MATH_NAMESPACE;default:return HTML_NAMESPACE$1;}}function getChildNamespace(parentNamespace,type){if(parentNamespace==null||parentNamespace===HTML_NAMESPACE$1){// No (or default) parent namespace: potential entry point.
return getIntrinsicNamespace(type);}if(parentNamespace===SVG_NAMESPACE&&type==='foreignObject'){// We're leaving SVG.
return HTML_NAMESPACE$1;}// By default, pass namespace below.
return parentNamespace;}/* globals MSApp *//**
 * Create a function which has 'unsafe' privileges (required by windows8 apps)
 */var createMicrosoftUnsafeLocalFunction=function createMicrosoftUnsafeLocalFunction(func){if(typeof MSApp!=='undefined'&&MSApp.execUnsafeLocalFunction){return function(arg0,arg1,arg2,arg3){MSApp.execUnsafeLocalFunction(function(){return func(arg0,arg1,arg2,arg3);});};}else{return func;}};// SVG temp container for IE lacking innerHTML
var reusableSVGContainer=void 0;/**
 * Set the innerHTML property of a node
 *
 * @param {DOMElement} node
 * @param {string} html
 * @internal
 */var setInnerHTML=createMicrosoftUnsafeLocalFunction(function(node,html){// IE does not have innerHTML for SVG nodes, so instead we inject the
// new markup in a temp node and then move the child nodes across into
// the target node
if(node.namespaceURI===Namespaces.svg&&!('innerHTML'in node)){reusableSVGContainer=reusableSVGContainer||document.createElement('div');reusableSVGContainer.innerHTML='<svg>'+html+'</svg>';var svgNode=reusableSVGContainer.firstChild;while(node.firstChild){node.removeChild(node.firstChild);}while(svgNode.firstChild){node.appendChild(svgNode.firstChild);}}else{node.innerHTML=html;}});/**
 * Set the textContent property of a node. For text updates, it's faster
 * to set the `nodeValue` of the Text node directly instead of using
 * `.textContent` which will remove the existing node and create a new one.
 *
 * @param {DOMElement} node
 * @param {string} text
 * @internal
 */var setTextContent=function setTextContent(node,text){if(text){var firstChild=node.firstChild;if(firstChild&&firstChild===node.lastChild&&firstChild.nodeType===TEXT_NODE){firstChild.nodeValue=text;return;}}node.textContent=text;};/**
 * CSS properties which accept numbers but are not in units of "px".
 */var isUnitlessNumber={animationIterationCount:true,borderImageOutset:true,borderImageSlice:true,borderImageWidth:true,boxFlex:true,boxFlexGroup:true,boxOrdinalGroup:true,columnCount:true,columns:true,flex:true,flexGrow:true,flexPositive:true,flexShrink:true,flexNegative:true,flexOrder:true,gridRow:true,gridRowEnd:true,gridRowSpan:true,gridRowStart:true,gridColumn:true,gridColumnEnd:true,gridColumnSpan:true,gridColumnStart:true,fontWeight:true,lineClamp:true,lineHeight:true,opacity:true,order:true,orphans:true,tabSize:true,widows:true,zIndex:true,zoom:true,// SVG-related properties
fillOpacity:true,floodOpacity:true,stopOpacity:true,strokeDasharray:true,strokeDashoffset:true,strokeMiterlimit:true,strokeOpacity:true,strokeWidth:true};/**
 * @param {string} prefix vendor-specific prefix, eg: Webkit
 * @param {string} key style name, eg: transitionDuration
 * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
 * WebkitTransitionDuration
 */function prefixKey(prefix,key){return prefix+key.charAt(0).toUpperCase()+key.substring(1);}/**
 * Support style names that may come passed in prefixed by adding permutations
 * of vendor prefixes.
 */var prefixes=['Webkit','ms','Moz','O'];// Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
// infinite loop, because it iterates over the newly added props too.
Object.keys(isUnitlessNumber).forEach(function(prop){prefixes.forEach(function(prefix){isUnitlessNumber[prefixKey(prefix,prop)]=isUnitlessNumber[prop];});});/**
 * Convert a value into the proper css writable value. The style name `name`
 * should be logical (no hyphens), as specified
 * in `CSSProperty.isUnitlessNumber`.
 *
 * @param {string} name CSS property name such as `topMargin`.
 * @param {*} value CSS property value such as `10px`.
 * @return {string} Normalized style value with dimensions applied.
 */function dangerousStyleValue(name,value,isCustomProperty){// Note that we've removed escapeTextForBrowser() calls here since the
// whole string will be escaped when the attribute is injected into
// the markup. If you provide unsafe user data here they can inject
// arbitrary CSS which may be problematic (I couldn't repro this):
// https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
// http://www.thespanner.co.uk/2007/11/26/ultimate-xss-css-injection/
// This is not an XSS hole but instead a potential CSS injection issue
// which has lead to a greater discussion about how we're going to
// trust URLs moving forward. See #2115901
var isEmpty=value==null||typeof value==='boolean'||value==='';if(isEmpty){return'';}if(!isCustomProperty&&typeof value==='number'&&value!==0&&!(isUnitlessNumber.hasOwnProperty(name)&&isUnitlessNumber[name])){return value+'px';// Presumes implicit 'px' suffix for unitless numbers
}return(''+value).trim();}var warnValidStyle=emptyFunction;{// 'msTransform' is correct, but the other prefixes should be capitalized
var badVendoredStyleNamePattern=/^(?:webkit|moz|o)[A-Z]/;// style values shouldn't contain a semicolon
var badStyleValueWithSemicolonPattern=/;\s*$/;var warnedStyleNames={};var warnedStyleValues={};var warnedForNaNValue=false;var warnedForInfinityValue=false;var warnHyphenatedStyleName=function warnHyphenatedStyleName(name,getStack){if(warnedStyleNames.hasOwnProperty(name)&&warnedStyleNames[name]){return;}warnedStyleNames[name]=true;warning(false,'Unsupported style property %s. Did you mean %s?%s',name,camelizeStyleName(name),getStack());};var warnBadVendoredStyleName=function warnBadVendoredStyleName(name,getStack){if(warnedStyleNames.hasOwnProperty(name)&&warnedStyleNames[name]){return;}warnedStyleNames[name]=true;warning(false,'Unsupported vendor-prefixed style property %s. Did you mean %s?%s',name,name.charAt(0).toUpperCase()+name.slice(1),getStack());};var warnStyleValueWithSemicolon=function warnStyleValueWithSemicolon(name,value,getStack){if(warnedStyleValues.hasOwnProperty(value)&&warnedStyleValues[value]){return;}warnedStyleValues[value]=true;warning(false,"Style property values shouldn't contain a semicolon. "+'Try "%s: %s" instead.%s',name,value.replace(badStyleValueWithSemicolonPattern,''),getStack());};var warnStyleValueIsNaN=function warnStyleValueIsNaN(name,value,getStack){if(warnedForNaNValue){return;}warnedForNaNValue=true;warning(false,'`NaN` is an invalid value for the `%s` css style property.%s',name,getStack());};var warnStyleValueIsInfinity=function warnStyleValueIsInfinity(name,value,getStack){if(warnedForInfinityValue){return;}warnedForInfinityValue=true;warning(false,'`Infinity` is an invalid value for the `%s` css style property.%s',name,getStack());};warnValidStyle=function warnValidStyle(name,value,getStack){if(name.indexOf('-')>-1){warnHyphenatedStyleName(name,getStack);}else if(badVendoredStyleNamePattern.test(name)){warnBadVendoredStyleName(name,getStack);}else if(badStyleValueWithSemicolonPattern.test(value)){warnStyleValueWithSemicolon(name,value,getStack);}if(typeof value==='number'){if(isNaN(value)){warnStyleValueIsNaN(name,value,getStack);}else if(!isFinite(value)){warnStyleValueIsInfinity(name,value,getStack);}}};}var warnValidStyle$1=warnValidStyle;/**
 * Operations for dealing with CSS properties.
 *//**
 * This creates a string that is expected to be equivalent to the style
 * attribute generated by server-side rendering. It by-passes warnings and
 * security checks so it's not safe to use this value for anything other than
 * comparison. It is only used in DEV for SSR validation.
 */function createDangerousStringForStyles(styles){{var serialized='';var delimiter='';for(var styleName in styles){if(!styles.hasOwnProperty(styleName)){continue;}var styleValue=styles[styleName];if(styleValue!=null){var isCustomProperty=styleName.indexOf('--')===0;serialized+=delimiter+hyphenateStyleName(styleName)+':';serialized+=dangerousStyleValue(styleName,styleValue,isCustomProperty);delimiter=';';}}return serialized||null;}}/**
 * Sets the value for multiple styles on a node.  If a value is specified as
 * '' (empty string), the corresponding style property will be unset.
 *
 * @param {DOMElement} node
 * @param {object} styles
 */function setValueForStyles(node,styles,getStack){var style=node.style;for(var styleName in styles){if(!styles.hasOwnProperty(styleName)){continue;}var isCustomProperty=styleName.indexOf('--')===0;{if(!isCustomProperty){warnValidStyle$1(styleName,styles[styleName],getStack);}}var styleValue=dangerousStyleValue(styleName,styles[styleName],isCustomProperty);if(styleName==='float'){styleName='cssFloat';}if(isCustomProperty){style.setProperty(styleName,styleValue);}else{style[styleName]=styleValue;}}}// For HTML, certain tags should omit their close tag. We keep a whitelist for
// those special-case tags.
var omittedCloseTags={area:true,base:true,br:true,col:true,embed:true,hr:true,img:true,input:true,keygen:true,link:true,meta:true,param:true,source:true,track:true,wbr:true// NOTE: menuitem's close tag should be omitted, but that causes problems.
};// For HTML, certain tags cannot have children. This has the same purpose as
// `omittedCloseTags` except that `menuitem` should still have its closing tag.
var voidElementTags=_assign({menuitem:true},omittedCloseTags);var HTML$1='__html';function assertValidProps(tag,props,getStack){if(!props){return;}// Note the use of `==` which checks for null or undefined.
if(voidElementTags[tag]){!(props.children==null&&props.dangerouslySetInnerHTML==null)?invariant(false,'%s is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.%s',tag,getStack()):void 0;}if(props.dangerouslySetInnerHTML!=null){!(props.children==null)?invariant(false,'Can only set one of `children` or `props.dangerouslySetInnerHTML`.'):void 0;!(_typeof(props.dangerouslySetInnerHTML)==='object'&&HTML$1 in props.dangerouslySetInnerHTML)?invariant(false,'`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://fb.me/react-invariant-dangerously-set-inner-html for more information.'):void 0;}{!(props.suppressContentEditableWarning||!props.contentEditable||props.children==null)?warning(false,'A component is `contentEditable` and contains `children` managed by '+'React. It is now your responsibility to guarantee that none of '+'those nodes are unexpectedly modified or duplicated. This is '+'probably not intentional.%s',getStack()):void 0;}!(props.style==null||_typeof(props.style)==='object')?invariant(false,'The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + \'em\'}} when using JSX.%s',getStack()):void 0;}function isCustomComponent(tagName,props){if(tagName.indexOf('-')===-1){return typeof props.is==='string';}switch(tagName){// These are reserved SVG and MathML elements.
// We don't mind this whitelist too much because we expect it to never grow.
// The alternative is to track the namespace in a few places which is convoluted.
// https://w3c.github.io/webcomponents/spec/custom/#custom-elements-core-concepts
case'annotation-xml':case'color-profile':case'font-face':case'font-face-src':case'font-face-uri':case'font-face-format':case'font-face-name':case'missing-glyph':return false;default:return true;}}// When adding attributes to the HTML or SVG whitelist, be sure to
// also add them to this module to ensure casing and incorrect name
// warnings.
var possibleStandardNames={// HTML
accept:'accept',acceptcharset:'acceptCharset','accept-charset':'acceptCharset',accesskey:'accessKey',action:'action',allowfullscreen:'allowFullScreen',alt:'alt',as:'as',async:'async',autocapitalize:'autoCapitalize',autocomplete:'autoComplete',autocorrect:'autoCorrect',autofocus:'autoFocus',autoplay:'autoPlay',autosave:'autoSave',capture:'capture',cellpadding:'cellPadding',cellspacing:'cellSpacing',challenge:'challenge',charset:'charSet',checked:'checked',children:'children',cite:'cite',class:'className',classid:'classID',classname:'className',cols:'cols',colspan:'colSpan',content:'content',contenteditable:'contentEditable',contextmenu:'contextMenu',controls:'controls',controlslist:'controlsList',coords:'coords',crossorigin:'crossOrigin',dangerouslysetinnerhtml:'dangerouslySetInnerHTML',data:'data',datetime:'dateTime',default:'default',defaultchecked:'defaultChecked',defaultvalue:'defaultValue',defer:'defer',dir:'dir',disabled:'disabled',download:'download',draggable:'draggable',enctype:'encType',for:'htmlFor',form:'form',formmethod:'formMethod',formaction:'formAction',formenctype:'formEncType',formnovalidate:'formNoValidate',formtarget:'formTarget',frameborder:'frameBorder',headers:'headers',height:'height',hidden:'hidden',high:'high',href:'href',hreflang:'hrefLang',htmlfor:'htmlFor',httpequiv:'httpEquiv','http-equiv':'httpEquiv',icon:'icon',id:'id',innerhtml:'innerHTML',inputmode:'inputMode',integrity:'integrity',is:'is',itemid:'itemID',itemprop:'itemProp',itemref:'itemRef',itemscope:'itemScope',itemtype:'itemType',keyparams:'keyParams',keytype:'keyType',kind:'kind',label:'label',lang:'lang',list:'list',loop:'loop',low:'low',manifest:'manifest',marginwidth:'marginWidth',marginheight:'marginHeight',max:'max',maxlength:'maxLength',media:'media',mediagroup:'mediaGroup',method:'method',min:'min',minlength:'minLength',multiple:'multiple',muted:'muted',name:'name',nomodule:'noModule',nonce:'nonce',novalidate:'noValidate',open:'open',optimum:'optimum',pattern:'pattern',placeholder:'placeholder',playsinline:'playsInline',poster:'poster',preload:'preload',profile:'profile',radiogroup:'radioGroup',readonly:'readOnly',referrerpolicy:'referrerPolicy',rel:'rel',required:'required',reversed:'reversed',role:'role',rows:'rows',rowspan:'rowSpan',sandbox:'sandbox',scope:'scope',scoped:'scoped',scrolling:'scrolling',seamless:'seamless',selected:'selected',shape:'shape',size:'size',sizes:'sizes',span:'span',spellcheck:'spellCheck',src:'src',srcdoc:'srcDoc',srclang:'srcLang',srcset:'srcSet',start:'start',step:'step',style:'style',summary:'summary',tabindex:'tabIndex',target:'target',title:'title',type:'type',usemap:'useMap',value:'value',width:'width',wmode:'wmode',wrap:'wrap',// SVG
about:'about',accentheight:'accentHeight','accent-height':'accentHeight',accumulate:'accumulate',additive:'additive',alignmentbaseline:'alignmentBaseline','alignment-baseline':'alignmentBaseline',allowreorder:'allowReorder',alphabetic:'alphabetic',amplitude:'amplitude',arabicform:'arabicForm','arabic-form':'arabicForm',ascent:'ascent',attributename:'attributeName',attributetype:'attributeType',autoreverse:'autoReverse',azimuth:'azimuth',basefrequency:'baseFrequency',baselineshift:'baselineShift','baseline-shift':'baselineShift',baseprofile:'baseProfile',bbox:'bbox',begin:'begin',bias:'bias',by:'by',calcmode:'calcMode',capheight:'capHeight','cap-height':'capHeight',clip:'clip',clippath:'clipPath','clip-path':'clipPath',clippathunits:'clipPathUnits',cliprule:'clipRule','clip-rule':'clipRule',color:'color',colorinterpolation:'colorInterpolation','color-interpolation':'colorInterpolation',colorinterpolationfilters:'colorInterpolationFilters','color-interpolation-filters':'colorInterpolationFilters',colorprofile:'colorProfile','color-profile':'colorProfile',colorrendering:'colorRendering','color-rendering':'colorRendering',contentscripttype:'contentScriptType',contentstyletype:'contentStyleType',cursor:'cursor',cx:'cx',cy:'cy',d:'d',datatype:'datatype',decelerate:'decelerate',descent:'descent',diffuseconstant:'diffuseConstant',direction:'direction',display:'display',divisor:'divisor',dominantbaseline:'dominantBaseline','dominant-baseline':'dominantBaseline',dur:'dur',dx:'dx',dy:'dy',edgemode:'edgeMode',elevation:'elevation',enablebackground:'enableBackground','enable-background':'enableBackground',end:'end',exponent:'exponent',externalresourcesrequired:'externalResourcesRequired',fill:'fill',fillopacity:'fillOpacity','fill-opacity':'fillOpacity',fillrule:'fillRule','fill-rule':'fillRule',filter:'filter',filterres:'filterRes',filterunits:'filterUnits',floodopacity:'floodOpacity','flood-opacity':'floodOpacity',floodcolor:'floodColor','flood-color':'floodColor',focusable:'focusable',fontfamily:'fontFamily','font-family':'fontFamily',fontsize:'fontSize','font-size':'fontSize',fontsizeadjust:'fontSizeAdjust','font-size-adjust':'fontSizeAdjust',fontstretch:'fontStretch','font-stretch':'fontStretch',fontstyle:'fontStyle','font-style':'fontStyle',fontvariant:'fontVariant','font-variant':'fontVariant',fontweight:'fontWeight','font-weight':'fontWeight',format:'format',from:'from',fx:'fx',fy:'fy',g1:'g1',g2:'g2',glyphname:'glyphName','glyph-name':'glyphName',glyphorientationhorizontal:'glyphOrientationHorizontal','glyph-orientation-horizontal':'glyphOrientationHorizontal',glyphorientationvertical:'glyphOrientationVertical','glyph-orientation-vertical':'glyphOrientationVertical',glyphref:'glyphRef',gradienttransform:'gradientTransform',gradientunits:'gradientUnits',hanging:'hanging',horizadvx:'horizAdvX','horiz-adv-x':'horizAdvX',horizoriginx:'horizOriginX','horiz-origin-x':'horizOriginX',ideographic:'ideographic',imagerendering:'imageRendering','image-rendering':'imageRendering',in2:'in2',in:'in',inlist:'inlist',intercept:'intercept',k1:'k1',k2:'k2',k3:'k3',k4:'k4',k:'k',kernelmatrix:'kernelMatrix',kernelunitlength:'kernelUnitLength',kerning:'kerning',keypoints:'keyPoints',keysplines:'keySplines',keytimes:'keyTimes',lengthadjust:'lengthAdjust',letterspacing:'letterSpacing','letter-spacing':'letterSpacing',lightingcolor:'lightingColor','lighting-color':'lightingColor',limitingconeangle:'limitingConeAngle',local:'local',markerend:'markerEnd','marker-end':'markerEnd',markerheight:'markerHeight',markermid:'markerMid','marker-mid':'markerMid',markerstart:'markerStart','marker-start':'markerStart',markerunits:'markerUnits',markerwidth:'markerWidth',mask:'mask',maskcontentunits:'maskContentUnits',maskunits:'maskUnits',mathematical:'mathematical',mode:'mode',numoctaves:'numOctaves',offset:'offset',opacity:'opacity',operator:'operator',order:'order',orient:'orient',orientation:'orientation',origin:'origin',overflow:'overflow',overlineposition:'overlinePosition','overline-position':'overlinePosition',overlinethickness:'overlineThickness','overline-thickness':'overlineThickness',paintorder:'paintOrder','paint-order':'paintOrder',panose1:'panose1','panose-1':'panose1',pathlength:'pathLength',patterncontentunits:'patternContentUnits',patterntransform:'patternTransform',patternunits:'patternUnits',pointerevents:'pointerEvents','pointer-events':'pointerEvents',points:'points',pointsatx:'pointsAtX',pointsaty:'pointsAtY',pointsatz:'pointsAtZ',prefix:'prefix',preservealpha:'preserveAlpha',preserveaspectratio:'preserveAspectRatio',primitiveunits:'primitiveUnits',property:'property',r:'r',radius:'radius',refx:'refX',refy:'refY',renderingintent:'renderingIntent','rendering-intent':'renderingIntent',repeatcount:'repeatCount',repeatdur:'repeatDur',requiredextensions:'requiredExtensions',requiredfeatures:'requiredFeatures',resource:'resource',restart:'restart',result:'result',results:'results',rotate:'rotate',rx:'rx',ry:'ry',scale:'scale',security:'security',seed:'seed',shaperendering:'shapeRendering','shape-rendering':'shapeRendering',slope:'slope',spacing:'spacing',specularconstant:'specularConstant',specularexponent:'specularExponent',speed:'speed',spreadmethod:'spreadMethod',startoffset:'startOffset',stddeviation:'stdDeviation',stemh:'stemh',stemv:'stemv',stitchtiles:'stitchTiles',stopcolor:'stopColor','stop-color':'stopColor',stopopacity:'stopOpacity','stop-opacity':'stopOpacity',strikethroughposition:'strikethroughPosition','strikethrough-position':'strikethroughPosition',strikethroughthickness:'strikethroughThickness','strikethrough-thickness':'strikethroughThickness',string:'string',stroke:'stroke',strokedasharray:'strokeDasharray','stroke-dasharray':'strokeDasharray',strokedashoffset:'strokeDashoffset','stroke-dashoffset':'strokeDashoffset',strokelinecap:'strokeLinecap','stroke-linecap':'strokeLinecap',strokelinejoin:'strokeLinejoin','stroke-linejoin':'strokeLinejoin',strokemiterlimit:'strokeMiterlimit','stroke-miterlimit':'strokeMiterlimit',strokewidth:'strokeWidth','stroke-width':'strokeWidth',strokeopacity:'strokeOpacity','stroke-opacity':'strokeOpacity',suppresscontenteditablewarning:'suppressContentEditableWarning',suppresshydrationwarning:'suppressHydrationWarning',surfacescale:'surfaceScale',systemlanguage:'systemLanguage',tablevalues:'tableValues',targetx:'targetX',targety:'targetY',textanchor:'textAnchor','text-anchor':'textAnchor',textdecoration:'textDecoration','text-decoration':'textDecoration',textlength:'textLength',textrendering:'textRendering','text-rendering':'textRendering',to:'to',transform:'transform',typeof:'typeof',u1:'u1',u2:'u2',underlineposition:'underlinePosition','underline-position':'underlinePosition',underlinethickness:'underlineThickness','underline-thickness':'underlineThickness',unicode:'unicode',unicodebidi:'unicodeBidi','unicode-bidi':'unicodeBidi',unicoderange:'unicodeRange','unicode-range':'unicodeRange',unitsperem:'unitsPerEm','units-per-em':'unitsPerEm',unselectable:'unselectable',valphabetic:'vAlphabetic','v-alphabetic':'vAlphabetic',values:'values',vectoreffect:'vectorEffect','vector-effect':'vectorEffect',version:'version',vertadvy:'vertAdvY','vert-adv-y':'vertAdvY',vertoriginx:'vertOriginX','vert-origin-x':'vertOriginX',vertoriginy:'vertOriginY','vert-origin-y':'vertOriginY',vhanging:'vHanging','v-hanging':'vHanging',videographic:'vIdeographic','v-ideographic':'vIdeographic',viewbox:'viewBox',viewtarget:'viewTarget',visibility:'visibility',vmathematical:'vMathematical','v-mathematical':'vMathematical',vocab:'vocab',widths:'widths',wordspacing:'wordSpacing','word-spacing':'wordSpacing',writingmode:'writingMode','writing-mode':'writingMode',x1:'x1',x2:'x2',x:'x',xchannelselector:'xChannelSelector',xheight:'xHeight','x-height':'xHeight',xlinkactuate:'xlinkActuate','xlink:actuate':'xlinkActuate',xlinkarcrole:'xlinkArcrole','xlink:arcrole':'xlinkArcrole',xlinkhref:'xlinkHref','xlink:href':'xlinkHref',xlinkrole:'xlinkRole','xlink:role':'xlinkRole',xlinkshow:'xlinkShow','xlink:show':'xlinkShow',xlinktitle:'xlinkTitle','xlink:title':'xlinkTitle',xlinktype:'xlinkType','xlink:type':'xlinkType',xmlbase:'xmlBase','xml:base':'xmlBase',xmllang:'xmlLang','xml:lang':'xmlLang',xmlns:'xmlns','xml:space':'xmlSpace',xmlnsxlink:'xmlnsXlink','xmlns:xlink':'xmlnsXlink',xmlspace:'xmlSpace',y1:'y1',y2:'y2',y:'y',ychannelselector:'yChannelSelector',z:'z',zoomandpan:'zoomAndPan'};var ariaProperties={'aria-current':0,// state
'aria-details':0,'aria-disabled':0,// state
'aria-hidden':0,// state
'aria-invalid':0,// state
'aria-keyshortcuts':0,'aria-label':0,'aria-roledescription':0,// Widget Attributes
'aria-autocomplete':0,'aria-checked':0,'aria-expanded':0,'aria-haspopup':0,'aria-level':0,'aria-modal':0,'aria-multiline':0,'aria-multiselectable':0,'aria-orientation':0,'aria-placeholder':0,'aria-pressed':0,'aria-readonly':0,'aria-required':0,'aria-selected':0,'aria-sort':0,'aria-valuemax':0,'aria-valuemin':0,'aria-valuenow':0,'aria-valuetext':0,// Live Region Attributes
'aria-atomic':0,'aria-busy':0,'aria-live':0,'aria-relevant':0,// Drag-and-Drop Attributes
'aria-dropeffect':0,'aria-grabbed':0,// Relationship Attributes
'aria-activedescendant':0,'aria-colcount':0,'aria-colindex':0,'aria-colspan':0,'aria-controls':0,'aria-describedby':0,'aria-errormessage':0,'aria-flowto':0,'aria-labelledby':0,'aria-owns':0,'aria-posinset':0,'aria-rowcount':0,'aria-rowindex':0,'aria-rowspan':0,'aria-setsize':0};var warnedProperties={};var rARIA=new RegExp('^(aria)-['+ATTRIBUTE_NAME_CHAR+']*$');var rARIACamel=new RegExp('^(aria)[A-Z]['+ATTRIBUTE_NAME_CHAR+']*$');var hasOwnProperty=Object.prototype.hasOwnProperty;function getStackAddendum(){var stack=ReactDebugCurrentFrame.getStackAddendum();return stack!=null?stack:'';}function validateProperty(tagName,name){if(hasOwnProperty.call(warnedProperties,name)&&warnedProperties[name]){return true;}if(rARIACamel.test(name)){var ariaName='aria-'+name.slice(4).toLowerCase();var correctName=ariaProperties.hasOwnProperty(ariaName)?ariaName:null;// If this is an aria-* attribute, but is not listed in the known DOM
// DOM properties, then it is an invalid aria-* attribute.
if(correctName==null){warning(false,'Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.%s',name,getStackAddendum());warnedProperties[name]=true;return true;}// aria-* attributes should be lowercase; suggest the lowercase version.
if(name!==correctName){warning(false,'Invalid ARIA attribute `%s`. Did you mean `%s`?%s',name,correctName,getStackAddendum());warnedProperties[name]=true;return true;}}if(rARIA.test(name)){var lowerCasedName=name.toLowerCase();var standardName=ariaProperties.hasOwnProperty(lowerCasedName)?lowerCasedName:null;// If this is an aria-* attribute, but is not listed in the known DOM
// DOM properties, then it is an invalid aria-* attribute.
if(standardName==null){warnedProperties[name]=true;return false;}// aria-* attributes should be lowercase; suggest the lowercase version.
if(name!==standardName){warning(false,'Unknown ARIA attribute `%s`. Did you mean `%s`?%s',name,standardName,getStackAddendum());warnedProperties[name]=true;return true;}}return true;}function warnInvalidARIAProps(type,props){var invalidProps=[];for(var key in props){var isValid=validateProperty(type,key);if(!isValid){invalidProps.push(key);}}var unknownPropString=invalidProps.map(function(prop){return'`'+prop+'`';}).join(', ');if(invalidProps.length===1){warning(false,'Invalid aria prop %s on <%s> tag. '+'For details, see https://fb.me/invalid-aria-prop%s',unknownPropString,type,getStackAddendum());}else if(invalidProps.length>1){warning(false,'Invalid aria props %s on <%s> tag. '+'For details, see https://fb.me/invalid-aria-prop%s',unknownPropString,type,getStackAddendum());}}function validateProperties(type,props){if(isCustomComponent(type,props)){return;}warnInvalidARIAProps(type,props);}var didWarnValueNull=false;function getStackAddendum$1(){var stack=ReactDebugCurrentFrame.getStackAddendum();return stack!=null?stack:'';}function validateProperties$1(type,props){if(type!=='input'&&type!=='textarea'&&type!=='select'){return;}if(props!=null&&props.value===null&&!didWarnValueNull){didWarnValueNull=true;if(type==='select'&&props.multiple){warning(false,'`value` prop on `%s` should not be null. '+'Consider using an empty array when `multiple` is set to `true` '+'to clear the component or `undefined` for uncontrolled components.%s',type,getStackAddendum$1());}else{warning(false,'`value` prop on `%s` should not be null. '+'Consider using an empty string to clear the component or `undefined` '+'for uncontrolled components.%s',type,getStackAddendum$1());}}}function getStackAddendum$2(){var stack=ReactDebugCurrentFrame.getStackAddendum();return stack!=null?stack:'';}var validateProperty$1=function validateProperty$1(){};{var warnedProperties$1={};var _hasOwnProperty=Object.prototype.hasOwnProperty;var EVENT_NAME_REGEX=/^on./;var INVALID_EVENT_NAME_REGEX=/^on[^A-Z]/;var rARIA$1=new RegExp('^(aria)-['+ATTRIBUTE_NAME_CHAR+']*$');var rARIACamel$1=new RegExp('^(aria)[A-Z]['+ATTRIBUTE_NAME_CHAR+']*$');validateProperty$1=function validateProperty$1(tagName,name,value,canUseEventSystem){if(_hasOwnProperty.call(warnedProperties$1,name)&&warnedProperties$1[name]){return true;}var lowerCasedName=name.toLowerCase();if(lowerCasedName==='onfocusin'||lowerCasedName==='onfocusout'){warning(false,'React uses onFocus and onBlur instead of onFocusIn and onFocusOut. '+'All React events are normalized to bubble, so onFocusIn and onFocusOut '+'are not needed/supported by React.');warnedProperties$1[name]=true;return true;}// We can't rely on the event system being injected on the server.
if(canUseEventSystem){if(registrationNameModules.hasOwnProperty(name)){return true;}var registrationName=possibleRegistrationNames.hasOwnProperty(lowerCasedName)?possibleRegistrationNames[lowerCasedName]:null;if(registrationName!=null){warning(false,'Invalid event handler property `%s`. Did you mean `%s`?%s',name,registrationName,getStackAddendum$2());warnedProperties$1[name]=true;return true;}if(EVENT_NAME_REGEX.test(name)){warning(false,'Unknown event handler property `%s`. It will be ignored.%s',name,getStackAddendum$2());warnedProperties$1[name]=true;return true;}}else if(EVENT_NAME_REGEX.test(name)){// If no event plugins have been injected, we are in a server environment.
// So we can't tell if the event name is correct for sure, but we can filter
// out known bad ones like `onclick`. We can't suggest a specific replacement though.
if(INVALID_EVENT_NAME_REGEX.test(name)){warning(false,'Invalid event handler property `%s`. '+'React events use the camelCase naming convention, for example `onClick`.%s',name,getStackAddendum$2());}warnedProperties$1[name]=true;return true;}// Let the ARIA attribute hook validate ARIA attributes
if(rARIA$1.test(name)||rARIACamel$1.test(name)){return true;}if(lowerCasedName==='innerhtml'){warning(false,'Directly setting property `innerHTML` is not permitted. '+'For more information, lookup documentation on `dangerouslySetInnerHTML`.');warnedProperties$1[name]=true;return true;}if(lowerCasedName==='aria'){warning(false,'The `aria` attribute is reserved for future use in React. '+'Pass individual `aria-` attributes instead.');warnedProperties$1[name]=true;return true;}if(lowerCasedName==='is'&&value!==null&&value!==undefined&&typeof value!=='string'){warning(false,'Received a `%s` for a string attribute `is`. If this is expected, cast '+'the value to a string.%s',typeof value==='undefined'?'undefined':_typeof(value),getStackAddendum$2());warnedProperties$1[name]=true;return true;}if(typeof value==='number'&&isNaN(value)){warning(false,'Received NaN for the `%s` attribute. If this is expected, cast '+'the value to a string.%s',name,getStackAddendum$2());warnedProperties$1[name]=true;return true;}var propertyInfo=getPropertyInfo(name);var isReserved=propertyInfo!==null&&propertyInfo.type===RESERVED;// Known attributes should match the casing specified in the property config.
if(possibleStandardNames.hasOwnProperty(lowerCasedName)){var standardName=possibleStandardNames[lowerCasedName];if(standardName!==name){warning(false,'Invalid DOM property `%s`. Did you mean `%s`?%s',name,standardName,getStackAddendum$2());warnedProperties$1[name]=true;return true;}}else if(!isReserved&&name!==lowerCasedName){// Unknown attributes should have lowercase casing since that's how they
// will be cased anyway with server rendering.
warning(false,'React does not recognize the `%s` prop on a DOM element. If you '+'intentionally want it to appear in the DOM as a custom '+'attribute, spell it as lowercase `%s` instead. '+'If you accidentally passed it from a parent component, remove '+'it from the DOM element.%s',name,lowerCasedName,getStackAddendum$2());warnedProperties$1[name]=true;return true;}if(typeof value==='boolean'&&shouldRemoveAttributeWithWarning(name,value,propertyInfo,false)){if(value){warning(false,'Received `%s` for a non-boolean attribute `%s`.\n\n'+'If you want to write it to the DOM, pass a string instead: '+'%s="%s" or %s={value.toString()}.%s',value,name,name,value,name,getStackAddendum$2());}else{warning(false,'Received `%s` for a non-boolean attribute `%s`.\n\n'+'If you want to write it to the DOM, pass a string instead: '+'%s="%s" or %s={value.toString()}.\n\n'+'If you used to conditionally omit it with %s={condition && value}, '+'pass %s={condition ? value : undefined} instead.%s',value,name,name,value,name,name,name,getStackAddendum$2());}warnedProperties$1[name]=true;return true;}// Now that we've validated casing, do not validate
// data types for reserved props
if(isReserved){return true;}// Warn when a known attribute is a bad type
if(shouldRemoveAttributeWithWarning(name,value,propertyInfo,false)){warnedProperties$1[name]=true;return false;}return true;};}var warnUnknownProperties=function warnUnknownProperties(type,props,canUseEventSystem){var unknownProps=[];for(var key in props){var isValid=validateProperty$1(type,key,props[key],canUseEventSystem);if(!isValid){unknownProps.push(key);}}var unknownPropString=unknownProps.map(function(prop){return'`'+prop+'`';}).join(', ');if(unknownProps.length===1){warning(false,'Invalid value for prop %s on <%s> tag. Either remove it from the element, '+'or pass a string or number value to keep it in the DOM. '+'For details, see https://fb.me/react-attribute-behavior%s',unknownPropString,type,getStackAddendum$2());}else if(unknownProps.length>1){warning(false,'Invalid values for props %s on <%s> tag. Either remove them from the element, '+'or pass a string or number value to keep them in the DOM. '+'For details, see https://fb.me/react-attribute-behavior%s',unknownPropString,type,getStackAddendum$2());}};function validateProperties$2(type,props,canUseEventSystem){if(isCustomComponent(type,props)){return;}warnUnknownProperties(type,props,canUseEventSystem);}// TODO: direct imports like some-package/src/* are bad. Fix me.
var getCurrentFiberOwnerName$2=ReactDebugCurrentFiber.getCurrentFiberOwnerName;var getCurrentFiberStackAddendum$2=ReactDebugCurrentFiber.getCurrentFiberStackAddendum;var didWarnInvalidHydration=false;var didWarnShadyDOM=false;var DANGEROUSLY_SET_INNER_HTML='dangerouslySetInnerHTML';var SUPPRESS_CONTENT_EDITABLE_WARNING='suppressContentEditableWarning';var SUPPRESS_HYDRATION_WARNING$1='suppressHydrationWarning';var AUTOFOCUS='autoFocus';var CHILDREN='children';var STYLE='style';var HTML='__html';var HTML_NAMESPACE=Namespaces.html;var getStack=emptyFunction.thatReturns('');var warnedUnknownTags=void 0;var suppressHydrationWarning=void 0;var validatePropertiesInDevelopment=void 0;var warnForTextDifference=void 0;var warnForPropDifference=void 0;var warnForExtraAttributes=void 0;var warnForInvalidEventListener=void 0;var normalizeMarkupForTextOrAttribute=void 0;var normalizeHTML=void 0;{getStack=getCurrentFiberStackAddendum$2;warnedUnknownTags={// Chrome is the only major browser not shipping <time>. But as of July
// 2017 it intends to ship it due to widespread usage. We intentionally
// *don't* warn for <time> even if it's unrecognized by Chrome because
// it soon will be, and many apps have been using it anyway.
time:true,// There are working polyfills for <dialog>. Let people use it.
dialog:true};validatePropertiesInDevelopment=function validatePropertiesInDevelopment(type,props){validateProperties(type,props);validateProperties$1(type,props);validateProperties$2(type,props,/* canUseEventSystem */true);};// HTML parsing normalizes CR and CRLF to LF.
// It also can turn \u0000 into \uFFFD inside attributes.
// https://www.w3.org/TR/html5/single-page.html#preprocessing-the-input-stream
// If we have a mismatch, it might be caused by that.
// We will still patch up in this case but not fire the warning.
var NORMALIZE_NEWLINES_REGEX=/\r\n?/g;var NORMALIZE_NULL_AND_REPLACEMENT_REGEX=/\u0000|\uFFFD/g;normalizeMarkupForTextOrAttribute=function normalizeMarkupForTextOrAttribute(markup){var markupString=typeof markup==='string'?markup:''+markup;return markupString.replace(NORMALIZE_NEWLINES_REGEX,'\n').replace(NORMALIZE_NULL_AND_REPLACEMENT_REGEX,'');};warnForTextDifference=function warnForTextDifference(serverText,clientText){if(didWarnInvalidHydration){return;}var normalizedClientText=normalizeMarkupForTextOrAttribute(clientText);var normalizedServerText=normalizeMarkupForTextOrAttribute(serverText);if(normalizedServerText===normalizedClientText){return;}didWarnInvalidHydration=true;warning(false,'Text content did not match. Server: "%s" Client: "%s"',normalizedServerText,normalizedClientText);};warnForPropDifference=function warnForPropDifference(propName,serverValue,clientValue){if(didWarnInvalidHydration){return;}var normalizedClientValue=normalizeMarkupForTextOrAttribute(clientValue);var normalizedServerValue=normalizeMarkupForTextOrAttribute(serverValue);if(normalizedServerValue===normalizedClientValue){return;}didWarnInvalidHydration=true;warning(false,'Prop `%s` did not match. Server: %s Client: %s',propName,JSON.stringify(normalizedServerValue),JSON.stringify(normalizedClientValue));};warnForExtraAttributes=function warnForExtraAttributes(attributeNames){if(didWarnInvalidHydration){return;}didWarnInvalidHydration=true;var names=[];attributeNames.forEach(function(name){names.push(name);});warning(false,'Extra attributes from the server: %s',names);};warnForInvalidEventListener=function warnForInvalidEventListener(registrationName,listener){if(listener===false){warning(false,'Expected `%s` listener to be a function, instead got `false`.\n\n'+'If you used to conditionally omit it with %s={condition && value}, '+'pass %s={condition ? value : undefined} instead.%s',registrationName,registrationName,registrationName,getCurrentFiberStackAddendum$2());}else{warning(false,'Expected `%s` listener to be a function, instead got a value of `%s` type.%s',registrationName,typeof listener==='undefined'?'undefined':_typeof(listener),getCurrentFiberStackAddendum$2());}};// Parse the HTML and read it back to normalize the HTML string so that it
// can be used for comparison.
normalizeHTML=function normalizeHTML(parent,html){// We could have created a separate document here to avoid
// re-initializing custom elements if they exist. But this breaks
// how <noscript> is being handled. So we use the same document.
// See the discussion in https://github.com/facebook/react/pull/11157.
var testElement=parent.namespaceURI===HTML_NAMESPACE?parent.ownerDocument.createElement(parent.tagName):parent.ownerDocument.createElementNS(parent.namespaceURI,parent.tagName);testElement.innerHTML=html;return testElement.innerHTML;};}function ensureListeningTo(rootContainerElement,registrationName){var isDocumentOrFragment=rootContainerElement.nodeType===DOCUMENT_NODE||rootContainerElement.nodeType===DOCUMENT_FRAGMENT_NODE;var doc=isDocumentOrFragment?rootContainerElement:rootContainerElement.ownerDocument;listenTo(registrationName,doc);}function getOwnerDocumentFromRootContainer(rootContainerElement){return rootContainerElement.nodeType===DOCUMENT_NODE?rootContainerElement:rootContainerElement.ownerDocument;}function trapClickOnNonInteractiveElement(node){// Mobile Safari does not fire properly bubble click events on
// non-interactive elements, which means delegated click listeners do not
// fire. The workaround for this bug involves attaching an empty click
// listener on the target node.
// http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html
// Just set it using the onclick property so that we don't have to manage any
// bookkeeping for it. Not sure if we need to clear it when the listener is
// removed.
// TODO: Only do this for the relevant Safaris maybe?
node.onclick=emptyFunction;}function setInitialDOMProperties(tag,domElement,rootContainerElement,nextProps,isCustomComponentTag){for(var propKey in nextProps){if(!nextProps.hasOwnProperty(propKey)){continue;}var nextProp=nextProps[propKey];if(propKey===STYLE){{if(nextProp){// Freeze the next style object so that we can assume it won't be
// mutated. We have already warned for this in the past.
Object.freeze(nextProp);}}// Relies on `updateStylesByID` not mutating `styleUpdates`.
setValueForStyles(domElement,nextProp,getStack);}else if(propKey===DANGEROUSLY_SET_INNER_HTML){var nextHtml=nextProp?nextProp[HTML]:undefined;if(nextHtml!=null){setInnerHTML(domElement,nextHtml);}}else if(propKey===CHILDREN){if(typeof nextProp==='string'){// Avoid setting initial textContent when the text is empty. In IE11 setting
// textContent on a <textarea> will cause the placeholder to not
// show within the <textarea> until it has been focused and blurred again.
// https://github.com/facebook/react/issues/6731#issuecomment-254874553
var canSetTextContent=tag!=='textarea'||nextProp!=='';if(canSetTextContent){setTextContent(domElement,nextProp);}}else if(typeof nextProp==='number'){setTextContent(domElement,''+nextProp);}}else if(propKey===SUPPRESS_CONTENT_EDITABLE_WARNING||propKey===SUPPRESS_HYDRATION_WARNING$1){// Noop
}else if(propKey===AUTOFOCUS){// We polyfill it separately on the client during commit.
// We blacklist it here rather than in the property list because we emit it in SSR.
}else if(registrationNameModules.hasOwnProperty(propKey)){if(nextProp!=null){if(true&&typeof nextProp!=='function'){warnForInvalidEventListener(propKey,nextProp);}ensureListeningTo(rootContainerElement,propKey);}}else if(nextProp!=null){setValueForProperty(domElement,propKey,nextProp,isCustomComponentTag);}}}function updateDOMProperties(domElement,updatePayload,wasCustomComponentTag,isCustomComponentTag){// TODO: Handle wasCustomComponentTag
for(var i=0;i<updatePayload.length;i+=2){var propKey=updatePayload[i];var propValue=updatePayload[i+1];if(propKey===STYLE){setValueForStyles(domElement,propValue,getStack);}else if(propKey===DANGEROUSLY_SET_INNER_HTML){setInnerHTML(domElement,propValue);}else if(propKey===CHILDREN){setTextContent(domElement,propValue);}else{setValueForProperty(domElement,propKey,propValue,isCustomComponentTag);}}}function createElement$1(type,props,rootContainerElement,parentNamespace){var isCustomComponentTag=void 0;// We create tags in the namespace of their parent container, except HTML
// tags get no namespace.
var ownerDocument=getOwnerDocumentFromRootContainer(rootContainerElement);var domElement=void 0;var namespaceURI=parentNamespace;if(namespaceURI===HTML_NAMESPACE){namespaceURI=getIntrinsicNamespace(type);}if(namespaceURI===HTML_NAMESPACE){{isCustomComponentTag=isCustomComponent(type,props);// Should this check be gated by parent namespace? Not sure we want to
// allow <SVG> or <mATH>.
!(isCustomComponentTag||type===type.toLowerCase())?warning(false,'<%s /> is using incorrect casing. '+'Use PascalCase for React components, '+'or lowercase for HTML elements.',type):void 0;}if(type==='script'){// Create the script via .innerHTML so its "parser-inserted" flag is
// set to true and it does not execute
var div=ownerDocument.createElement('div');div.innerHTML='<script><'+'/script>';// eslint-disable-line
// This is guaranteed to yield a script element.
var firstChild=div.firstChild;domElement=div.removeChild(firstChild);}else if(typeof props.is==='string'){// $FlowIssue `createElement` should be updated for Web Components
domElement=ownerDocument.createElement(type,{is:props.is});}else{// Separate else branch instead of using `props.is || undefined` above because of a Firefox bug.
// See discussion in https://github.com/facebook/react/pull/6896
// and discussion in https://bugzilla.mozilla.org/show_bug.cgi?id=1276240
domElement=ownerDocument.createElement(type);}}else{domElement=ownerDocument.createElementNS(namespaceURI,type);}{if(namespaceURI===HTML_NAMESPACE){if(!isCustomComponentTag&&Object.prototype.toString.call(domElement)==='[object HTMLUnknownElement]'&&!Object.prototype.hasOwnProperty.call(warnedUnknownTags,type)){warnedUnknownTags[type]=true;warning(false,'The tag <%s> is unrecognized in this browser. '+'If you meant to render a React component, start its name with '+'an uppercase letter.',type);}}}return domElement;}function createTextNode$1(text,rootContainerElement){return getOwnerDocumentFromRootContainer(rootContainerElement).createTextNode(text);}function setInitialProperties$1(domElement,tag,rawProps,rootContainerElement){var isCustomComponentTag=isCustomComponent(tag,rawProps);{validatePropertiesInDevelopment(tag,rawProps);if(isCustomComponentTag&&!didWarnShadyDOM&&domElement.shadyRoot){warning(false,'%s is using shady DOM. Using shady DOM with React can '+'cause things to break subtly.',getCurrentFiberOwnerName$2()||'A component');didWarnShadyDOM=true;}}// TODO: Make sure that we check isMounted before firing any of these events.
var props=void 0;switch(tag){case'iframe':case'object':trapBubbledEvent(TOP_LOAD,domElement);props=rawProps;break;case'video':case'audio':// Create listener for each media event
for(var i=0;i<mediaEventTypes.length;i++){trapBubbledEvent(mediaEventTypes[i],domElement);}props=rawProps;break;case'source':trapBubbledEvent(TOP_ERROR,domElement);props=rawProps;break;case'img':case'image':case'link':trapBubbledEvent(TOP_ERROR,domElement);trapBubbledEvent(TOP_LOAD,domElement);props=rawProps;break;case'form':trapBubbledEvent(TOP_RESET,domElement);trapBubbledEvent(TOP_SUBMIT,domElement);props=rawProps;break;case'details':trapBubbledEvent(TOP_TOGGLE,domElement);props=rawProps;break;case'input':initWrapperState(domElement,rawProps);props=getHostProps(domElement,rawProps);trapBubbledEvent(TOP_INVALID,domElement);// For controlled components we always need to ensure we're listening
// to onChange. Even if there is no listener.
ensureListeningTo(rootContainerElement,'onChange');break;case'option':validateProps(domElement,rawProps);props=getHostProps$1(domElement,rawProps);break;case'select':initWrapperState$1(domElement,rawProps);props=getHostProps$2(domElement,rawProps);trapBubbledEvent(TOP_INVALID,domElement);// For controlled components we always need to ensure we're listening
// to onChange. Even if there is no listener.
ensureListeningTo(rootContainerElement,'onChange');break;case'textarea':initWrapperState$2(domElement,rawProps);props=getHostProps$3(domElement,rawProps);trapBubbledEvent(TOP_INVALID,domElement);// For controlled components we always need to ensure we're listening
// to onChange. Even if there is no listener.
ensureListeningTo(rootContainerElement,'onChange');break;default:props=rawProps;}assertValidProps(tag,props,getStack);setInitialDOMProperties(tag,domElement,rootContainerElement,props,isCustomComponentTag);switch(tag){case'input':// TODO: Make sure we check if this is still unmounted or do any clean
// up necessary since we never stop tracking anymore.
track(domElement);postMountWrapper(domElement,rawProps);break;case'textarea':// TODO: Make sure we check if this is still unmounted or do any clean
// up necessary since we never stop tracking anymore.
track(domElement);postMountWrapper$3(domElement,rawProps);break;case'option':postMountWrapper$1(domElement,rawProps);break;case'select':postMountWrapper$2(domElement,rawProps);break;default:if(typeof props.onClick==='function'){// TODO: This cast may not be sound for SVG, MathML or custom elements.
trapClickOnNonInteractiveElement(domElement);}break;}}// Calculate the diff between the two objects.
function diffProperties$1(domElement,tag,lastRawProps,nextRawProps,rootContainerElement){{validatePropertiesInDevelopment(tag,nextRawProps);}var updatePayload=null;var lastProps=void 0;var nextProps=void 0;switch(tag){case'input':lastProps=getHostProps(domElement,lastRawProps);nextProps=getHostProps(domElement,nextRawProps);updatePayload=[];break;case'option':lastProps=getHostProps$1(domElement,lastRawProps);nextProps=getHostProps$1(domElement,nextRawProps);updatePayload=[];break;case'select':lastProps=getHostProps$2(domElement,lastRawProps);nextProps=getHostProps$2(domElement,nextRawProps);updatePayload=[];break;case'textarea':lastProps=getHostProps$3(domElement,lastRawProps);nextProps=getHostProps$3(domElement,nextRawProps);updatePayload=[];break;default:lastProps=lastRawProps;nextProps=nextRawProps;if(typeof lastProps.onClick!=='function'&&typeof nextProps.onClick==='function'){// TODO: This cast may not be sound for SVG, MathML or custom elements.
trapClickOnNonInteractiveElement(domElement);}break;}assertValidProps(tag,nextProps,getStack);var propKey=void 0;var styleName=void 0;var styleUpdates=null;for(propKey in lastProps){if(nextProps.hasOwnProperty(propKey)||!lastProps.hasOwnProperty(propKey)||lastProps[propKey]==null){continue;}if(propKey===STYLE){var lastStyle=lastProps[propKey];for(styleName in lastStyle){if(lastStyle.hasOwnProperty(styleName)){if(!styleUpdates){styleUpdates={};}styleUpdates[styleName]='';}}}else if(propKey===DANGEROUSLY_SET_INNER_HTML||propKey===CHILDREN){// Noop. This is handled by the clear text mechanism.
}else if(propKey===SUPPRESS_CONTENT_EDITABLE_WARNING||propKey===SUPPRESS_HYDRATION_WARNING$1){// Noop
}else if(propKey===AUTOFOCUS){// Noop. It doesn't work on updates anyway.
}else if(registrationNameModules.hasOwnProperty(propKey)){// This is a special case. If any listener updates we need to ensure
// that the "current" fiber pointer gets updated so we need a commit
// to update this element.
if(!updatePayload){updatePayload=[];}}else{// For all other deleted properties we add it to the queue. We use
// the whitelist in the commit phase instead.
(updatePayload=updatePayload||[]).push(propKey,null);}}for(propKey in nextProps){var nextProp=nextProps[propKey];var lastProp=lastProps!=null?lastProps[propKey]:undefined;if(!nextProps.hasOwnProperty(propKey)||nextProp===lastProp||nextProp==null&&lastProp==null){continue;}if(propKey===STYLE){{if(nextProp){// Freeze the next style object so that we can assume it won't be
// mutated. We have already warned for this in the past.
Object.freeze(nextProp);}}if(lastProp){// Unset styles on `lastProp` but not on `nextProp`.
for(styleName in lastProp){if(lastProp.hasOwnProperty(styleName)&&(!nextProp||!nextProp.hasOwnProperty(styleName))){if(!styleUpdates){styleUpdates={};}styleUpdates[styleName]='';}}// Update styles that changed since `lastProp`.
for(styleName in nextProp){if(nextProp.hasOwnProperty(styleName)&&lastProp[styleName]!==nextProp[styleName]){if(!styleUpdates){styleUpdates={};}styleUpdates[styleName]=nextProp[styleName];}}}else{// Relies on `updateStylesByID` not mutating `styleUpdates`.
if(!styleUpdates){if(!updatePayload){updatePayload=[];}updatePayload.push(propKey,styleUpdates);}styleUpdates=nextProp;}}else if(propKey===DANGEROUSLY_SET_INNER_HTML){var nextHtml=nextProp?nextProp[HTML]:undefined;var lastHtml=lastProp?lastProp[HTML]:undefined;if(nextHtml!=null){if(lastHtml!==nextHtml){(updatePayload=updatePayload||[]).push(propKey,''+nextHtml);}}else{// TODO: It might be too late to clear this if we have children
// inserted already.
}}else if(propKey===CHILDREN){if(lastProp!==nextProp&&(typeof nextProp==='string'||typeof nextProp==='number')){(updatePayload=updatePayload||[]).push(propKey,''+nextProp);}}else if(propKey===SUPPRESS_CONTENT_EDITABLE_WARNING||propKey===SUPPRESS_HYDRATION_WARNING$1){// Noop
}else if(registrationNameModules.hasOwnProperty(propKey)){if(nextProp!=null){// We eagerly listen to this even though we haven't committed yet.
if(true&&typeof nextProp!=='function'){warnForInvalidEventListener(propKey,nextProp);}ensureListeningTo(rootContainerElement,propKey);}if(!updatePayload&&lastProp!==nextProp){// This is a special case. If any listener updates we need to ensure
// that the "current" props pointer gets updated so we need a commit
// to update this element.
updatePayload=[];}}else{// For any other property we always add it to the queue and then we
// filter it out using the whitelist during the commit.
(updatePayload=updatePayload||[]).push(propKey,nextProp);}}if(styleUpdates){(updatePayload=updatePayload||[]).push(STYLE,styleUpdates);}return updatePayload;}// Apply the diff.
function updateProperties$1(domElement,updatePayload,tag,lastRawProps,nextRawProps){// Update checked *before* name.
// In the middle of an update, it is possible to have multiple checked.
// When a checked radio tries to change name, browser makes another radio's checked false.
if(tag==='input'&&nextRawProps.type==='radio'&&nextRawProps.name!=null){updateChecked(domElement,nextRawProps);}var wasCustomComponentTag=isCustomComponent(tag,lastRawProps);var isCustomComponentTag=isCustomComponent(tag,nextRawProps);// Apply the diff.
updateDOMProperties(domElement,updatePayload,wasCustomComponentTag,isCustomComponentTag);// TODO: Ensure that an update gets scheduled if any of the special props
// changed.
switch(tag){case'input':// Update the wrapper around inputs *after* updating props. This has to
// happen after `updateDOMProperties`. Otherwise HTML5 input validations
// raise warnings and prevent the new value from being assigned.
updateWrapper(domElement,nextRawProps);break;case'textarea':updateWrapper$1(domElement,nextRawProps);break;case'select':// <select> value update needs to occur after <option> children
// reconciliation
postUpdateWrapper(domElement,nextRawProps);break;}}function getPossibleStandardName(propName){{var lowerCasedName=propName.toLowerCase();if(!possibleStandardNames.hasOwnProperty(lowerCasedName)){return null;}return possibleStandardNames[lowerCasedName]||null;}return null;}function diffHydratedProperties$1(domElement,tag,rawProps,parentNamespace,rootContainerElement){var isCustomComponentTag=void 0;var extraAttributeNames=void 0;{suppressHydrationWarning=rawProps[SUPPRESS_HYDRATION_WARNING$1]===true;isCustomComponentTag=isCustomComponent(tag,rawProps);validatePropertiesInDevelopment(tag,rawProps);if(isCustomComponentTag&&!didWarnShadyDOM&&domElement.shadyRoot){warning(false,'%s is using shady DOM. Using shady DOM with React can '+'cause things to break subtly.',getCurrentFiberOwnerName$2()||'A component');didWarnShadyDOM=true;}}// TODO: Make sure that we check isMounted before firing any of these events.
switch(tag){case'iframe':case'object':trapBubbledEvent(TOP_LOAD,domElement);break;case'video':case'audio':// Create listener for each media event
for(var i=0;i<mediaEventTypes.length;i++){trapBubbledEvent(mediaEventTypes[i],domElement);}break;case'source':trapBubbledEvent(TOP_ERROR,domElement);break;case'img':case'image':case'link':trapBubbledEvent(TOP_ERROR,domElement);trapBubbledEvent(TOP_LOAD,domElement);break;case'form':trapBubbledEvent(TOP_RESET,domElement);trapBubbledEvent(TOP_SUBMIT,domElement);break;case'details':trapBubbledEvent(TOP_TOGGLE,domElement);break;case'input':initWrapperState(domElement,rawProps);trapBubbledEvent(TOP_INVALID,domElement);// For controlled components we always need to ensure we're listening
// to onChange. Even if there is no listener.
ensureListeningTo(rootContainerElement,'onChange');break;case'option':validateProps(domElement,rawProps);break;case'select':initWrapperState$1(domElement,rawProps);trapBubbledEvent(TOP_INVALID,domElement);// For controlled components we always need to ensure we're listening
// to onChange. Even if there is no listener.
ensureListeningTo(rootContainerElement,'onChange');break;case'textarea':initWrapperState$2(domElement,rawProps);trapBubbledEvent(TOP_INVALID,domElement);// For controlled components we always need to ensure we're listening
// to onChange. Even if there is no listener.
ensureListeningTo(rootContainerElement,'onChange');break;}assertValidProps(tag,rawProps,getStack);{extraAttributeNames=new Set();var attributes=domElement.attributes;for(var _i=0;_i<attributes.length;_i++){var name=attributes[_i].name.toLowerCase();switch(name){// Built-in SSR attribute is whitelisted
case'data-reactroot':break;// Controlled attributes are not validated
// TODO: Only ignore them on controlled tags.
case'value':break;case'checked':break;case'selected':break;default:// Intentionally use the original name.
// See discussion in https://github.com/facebook/react/pull/10676.
extraAttributeNames.add(attributes[_i].name);}}}var updatePayload=null;for(var propKey in rawProps){if(!rawProps.hasOwnProperty(propKey)){continue;}var nextProp=rawProps[propKey];if(propKey===CHILDREN){// For text content children we compare against textContent. This
// might match additional HTML that is hidden when we read it using
// textContent. E.g. "foo" will match "f<span>oo</span>" but that still
// satisfies our requirement. Our requirement is not to produce perfect
// HTML and attributes. Ideally we should preserve structure but it's
// ok not to if the visible content is still enough to indicate what
// even listeners these nodes might be wired up to.
// TODO: Warn if there is more than a single textNode as a child.
// TODO: Should we use domElement.firstChild.nodeValue to compare?
if(typeof nextProp==='string'){if(domElement.textContent!==nextProp){if(true&&!suppressHydrationWarning){warnForTextDifference(domElement.textContent,nextProp);}updatePayload=[CHILDREN,nextProp];}}else if(typeof nextProp==='number'){if(domElement.textContent!==''+nextProp){if(true&&!suppressHydrationWarning){warnForTextDifference(domElement.textContent,nextProp);}updatePayload=[CHILDREN,''+nextProp];}}}else if(registrationNameModules.hasOwnProperty(propKey)){if(nextProp!=null){if(true&&typeof nextProp!=='function'){warnForInvalidEventListener(propKey,nextProp);}ensureListeningTo(rootContainerElement,propKey);}}else if(true&&// Convince Flow we've calculated it (it's DEV-only in this method.)
typeof isCustomComponentTag==='boolean'){// Validate that the properties correspond to their expected values.
var serverValue=void 0;var propertyInfo=getPropertyInfo(propKey);if(suppressHydrationWarning){// Don't bother comparing. We're ignoring all these warnings.
}else if(propKey===SUPPRESS_CONTENT_EDITABLE_WARNING||propKey===SUPPRESS_HYDRATION_WARNING$1||// Controlled attributes are not validated
// TODO: Only ignore them on controlled tags.
propKey==='value'||propKey==='checked'||propKey==='selected'){// Noop
}else if(propKey===DANGEROUSLY_SET_INNER_HTML){var rawHtml=nextProp?nextProp[HTML]||'':'';var serverHTML=domElement.innerHTML;var expectedHTML=normalizeHTML(domElement,rawHtml);if(expectedHTML!==serverHTML){warnForPropDifference(propKey,serverHTML,expectedHTML);}}else if(propKey===STYLE){// $FlowFixMe - Should be inferred as not undefined.
extraAttributeNames.delete(propKey);var expectedStyle=createDangerousStringForStyles(nextProp);serverValue=domElement.getAttribute('style');if(expectedStyle!==serverValue){warnForPropDifference(propKey,serverValue,expectedStyle);}}else if(isCustomComponentTag){// $FlowFixMe - Should be inferred as not undefined.
extraAttributeNames.delete(propKey.toLowerCase());serverValue=getValueForAttribute(domElement,propKey,nextProp);if(nextProp!==serverValue){warnForPropDifference(propKey,serverValue,nextProp);}}else if(!shouldIgnoreAttribute(propKey,propertyInfo,isCustomComponentTag)&&!shouldRemoveAttribute(propKey,nextProp,propertyInfo,isCustomComponentTag)){var isMismatchDueToBadCasing=false;if(propertyInfo!==null){// $FlowFixMe - Should be inferred as not undefined.
extraAttributeNames.delete(propertyInfo.attributeName);serverValue=getValueForProperty(domElement,propKey,nextProp,propertyInfo);}else{var ownNamespace=parentNamespace;if(ownNamespace===HTML_NAMESPACE){ownNamespace=getIntrinsicNamespace(tag);}if(ownNamespace===HTML_NAMESPACE){// $FlowFixMe - Should be inferred as not undefined.
extraAttributeNames.delete(propKey.toLowerCase());}else{var standardName=getPossibleStandardName(propKey);if(standardName!==null&&standardName!==propKey){// If an SVG prop is supplied with bad casing, it will
// be successfully parsed from HTML, but will produce a mismatch
// (and would be incorrectly rendered on the client).
// However, we already warn about bad casing elsewhere.
// So we'll skip the misleading extra mismatch warning in this case.
isMismatchDueToBadCasing=true;// $FlowFixMe - Should be inferred as not undefined.
extraAttributeNames.delete(standardName);}// $FlowFixMe - Should be inferred as not undefined.
extraAttributeNames.delete(propKey);}serverValue=getValueForAttribute(domElement,propKey,nextProp);}if(nextProp!==serverValue&&!isMismatchDueToBadCasing){warnForPropDifference(propKey,serverValue,nextProp);}}}}{// $FlowFixMe - Should be inferred as not undefined.
if(extraAttributeNames.size>0&&!suppressHydrationWarning){// $FlowFixMe - Should be inferred as not undefined.
warnForExtraAttributes(extraAttributeNames);}}switch(tag){case'input':// TODO: Make sure we check if this is still unmounted or do any clean
// up necessary since we never stop tracking anymore.
track(domElement);postMountWrapper(domElement,rawProps);break;case'textarea':// TODO: Make sure we check if this is still unmounted or do any clean
// up necessary since we never stop tracking anymore.
track(domElement);postMountWrapper$3(domElement,rawProps);break;case'select':case'option':// For input and textarea we current always set the value property at
// post mount to force it to diverge from attributes. However, for
// option and select we don't quite do the same thing and select
// is not resilient to the DOM state changing so we don't do that here.
// TODO: Consider not doing this for input and textarea.
break;default:if(typeof rawProps.onClick==='function'){// TODO: This cast may not be sound for SVG, MathML or custom elements.
trapClickOnNonInteractiveElement(domElement);}break;}return updatePayload;}function diffHydratedText$1(textNode,text){var isDifferent=textNode.nodeValue!==text;return isDifferent;}function warnForUnmatchedText$1(textNode,text){{warnForTextDifference(textNode.nodeValue,text);}}function warnForDeletedHydratableElement$1(parentNode,child){{if(didWarnInvalidHydration){return;}didWarnInvalidHydration=true;warning(false,'Did not expect server HTML to contain a <%s> in <%s>.',child.nodeName.toLowerCase(),parentNode.nodeName.toLowerCase());}}function warnForDeletedHydratableText$1(parentNode,child){{if(didWarnInvalidHydration){return;}didWarnInvalidHydration=true;warning(false,'Did not expect server HTML to contain the text node "%s" in <%s>.',child.nodeValue,parentNode.nodeName.toLowerCase());}}function warnForInsertedHydratedElement$1(parentNode,tag,props){{if(didWarnInvalidHydration){return;}didWarnInvalidHydration=true;warning(false,'Expected server HTML to contain a matching <%s> in <%s>.',tag,parentNode.nodeName.toLowerCase());}}function warnForInsertedHydratedText$1(parentNode,text){{if(text===''){// We expect to insert empty text nodes since they're not represented in
// the HTML.
// TODO: Remove this special case if we can just avoid inserting empty
// text nodes.
return;}if(didWarnInvalidHydration){return;}didWarnInvalidHydration=true;warning(false,'Expected server HTML to contain a matching text node for "%s" in <%s>.',text,parentNode.nodeName.toLowerCase());}}function restoreControlledState$1(domElement,tag,props){switch(tag){case'input':restoreControlledState(domElement,props);return;case'textarea':restoreControlledState$3(domElement,props);return;case'select':restoreControlledState$2(domElement,props);return;}}var ReactDOMFiberComponent=Object.freeze({createElement:createElement$1,createTextNode:createTextNode$1,setInitialProperties:setInitialProperties$1,diffProperties:diffProperties$1,updateProperties:updateProperties$1,diffHydratedProperties:diffHydratedProperties$1,diffHydratedText:diffHydratedText$1,warnForUnmatchedText:warnForUnmatchedText$1,warnForDeletedHydratableElement:warnForDeletedHydratableElement$1,warnForDeletedHydratableText:warnForDeletedHydratableText$1,warnForInsertedHydratedElement:warnForInsertedHydratedElement$1,warnForInsertedHydratedText:warnForInsertedHydratedText$1,restoreControlledState:restoreControlledState$1});// TODO: direct imports like some-package/src/* are bad. Fix me.
var getCurrentFiberStackAddendum$5=ReactDebugCurrentFiber.getCurrentFiberStackAddendum;var validateDOMNesting=emptyFunction;{// This validation code was written based on the HTML5 parsing spec:
// https://html.spec.whatwg.org/multipage/syntax.html#has-an-element-in-scope
//
// Note: this does not catch all invalid nesting, nor does it try to (as it's
// not clear what practical benefit doing so provides); instead, we warn only
// for cases where the parser will give a parse tree differing from what React
// intended. For example, <b><div></div></b> is invalid but we don't warn
// because it still parses correctly; we do warn for other cases like nested
// <p> tags where the beginning of the second element implicitly closes the
// first, causing a confusing mess.
// https://html.spec.whatwg.org/multipage/syntax.html#special
var specialTags=['address','applet','area','article','aside','base','basefont','bgsound','blockquote','body','br','button','caption','center','col','colgroup','dd','details','dir','div','dl','dt','embed','fieldset','figcaption','figure','footer','form','frame','frameset','h1','h2','h3','h4','h5','h6','head','header','hgroup','hr','html','iframe','img','input','isindex','li','link','listing','main','marquee','menu','menuitem','meta','nav','noembed','noframes','noscript','object','ol','p','param','plaintext','pre','script','section','select','source','style','summary','table','tbody','td','template','textarea','tfoot','th','thead','title','tr','track','ul','wbr','xmp'];// https://html.spec.whatwg.org/multipage/syntax.html#has-an-element-in-scope
var inScopeTags=['applet','caption','html','table','td','th','marquee','object','template',// https://html.spec.whatwg.org/multipage/syntax.html#html-integration-point
// TODO: Distinguish by namespace here -- for <title>, including it here
// errs on the side of fewer warnings
'foreignObject','desc','title'];// https://html.spec.whatwg.org/multipage/syntax.html#has-an-element-in-button-scope
var buttonScopeTags=inScopeTags.concat(['button']);// https://html.spec.whatwg.org/multipage/syntax.html#generate-implied-end-tags
var impliedEndTags=['dd','dt','li','option','optgroup','p','rp','rt'];var emptyAncestorInfo={current:null,formTag:null,aTagInScope:null,buttonTagInScope:null,nobrTagInScope:null,pTagInButtonScope:null,listItemTagAutoclosing:null,dlItemTagAutoclosing:null};var updatedAncestorInfo$1=function updatedAncestorInfo$1(oldInfo,tag,instance){var ancestorInfo=_assign({},oldInfo||emptyAncestorInfo);var info={tag:tag,instance:instance};if(inScopeTags.indexOf(tag)!==-1){ancestorInfo.aTagInScope=null;ancestorInfo.buttonTagInScope=null;ancestorInfo.nobrTagInScope=null;}if(buttonScopeTags.indexOf(tag)!==-1){ancestorInfo.pTagInButtonScope=null;}// See rules for 'li', 'dd', 'dt' start tags in
// https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inbody
if(specialTags.indexOf(tag)!==-1&&tag!=='address'&&tag!=='div'&&tag!=='p'){ancestorInfo.listItemTagAutoclosing=null;ancestorInfo.dlItemTagAutoclosing=null;}ancestorInfo.current=info;if(tag==='form'){ancestorInfo.formTag=info;}if(tag==='a'){ancestorInfo.aTagInScope=info;}if(tag==='button'){ancestorInfo.buttonTagInScope=info;}if(tag==='nobr'){ancestorInfo.nobrTagInScope=info;}if(tag==='p'){ancestorInfo.pTagInButtonScope=info;}if(tag==='li'){ancestorInfo.listItemTagAutoclosing=info;}if(tag==='dd'||tag==='dt'){ancestorInfo.dlItemTagAutoclosing=info;}return ancestorInfo;};/**
   * Returns whether
   */var isTagValidWithParent=function isTagValidWithParent(tag,parentTag){// First, let's check if we're in an unusual parsing mode...
switch(parentTag){// https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inselect
case'select':return tag==='option'||tag==='optgroup'||tag==='#text';case'optgroup':return tag==='option'||tag==='#text';// Strictly speaking, seeing an <option> doesn't mean we're in a <select>
// but
case'option':return tag==='#text';// https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intd
// https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-incaption
// No special behavior since these rules fall back to "in body" mode for
// all except special table nodes which cause bad parsing behavior anyway.
// https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intr
case'tr':return tag==='th'||tag==='td'||tag==='style'||tag==='script'||tag==='template';// https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intbody
case'tbody':case'thead':case'tfoot':return tag==='tr'||tag==='style'||tag==='script'||tag==='template';// https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-incolgroup
case'colgroup':return tag==='col'||tag==='template';// https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intable
case'table':return tag==='caption'||tag==='colgroup'||tag==='tbody'||tag==='tfoot'||tag==='thead'||tag==='style'||tag==='script'||tag==='template';// https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inhead
case'head':return tag==='base'||tag==='basefont'||tag==='bgsound'||tag==='link'||tag==='meta'||tag==='title'||tag==='noscript'||tag==='noframes'||tag==='style'||tag==='script'||tag==='template';// https://html.spec.whatwg.org/multipage/semantics.html#the-html-element
case'html':return tag==='head'||tag==='body';case'#document':return tag==='html';}// Probably in the "in body" parsing mode, so we outlaw only tag combos
// where the parsing rules cause implicit opens or closes to be added.
// https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inbody
switch(tag){case'h1':case'h2':case'h3':case'h4':case'h5':case'h6':return parentTag!=='h1'&&parentTag!=='h2'&&parentTag!=='h3'&&parentTag!=='h4'&&parentTag!=='h5'&&parentTag!=='h6';case'rp':case'rt':return impliedEndTags.indexOf(parentTag)===-1;case'body':case'caption':case'col':case'colgroup':case'frame':case'head':case'html':case'tbody':case'td':case'tfoot':case'th':case'thead':case'tr':// These tags are only valid with a few parents that have special child
// parsing rules -- if we're down here, then none of those matched and
// so we allow it only if we don't know what the parent is, as all other
// cases are invalid.
return parentTag==null;}return true;};/**
   * Returns whether
   */var findInvalidAncestorForTag=function findInvalidAncestorForTag(tag,ancestorInfo){switch(tag){case'address':case'article':case'aside':case'blockquote':case'center':case'details':case'dialog':case'dir':case'div':case'dl':case'fieldset':case'figcaption':case'figure':case'footer':case'header':case'hgroup':case'main':case'menu':case'nav':case'ol':case'p':case'section':case'summary':case'ul':case'pre':case'listing':case'table':case'hr':case'xmp':case'h1':case'h2':case'h3':case'h4':case'h5':case'h6':return ancestorInfo.pTagInButtonScope;case'form':return ancestorInfo.formTag||ancestorInfo.pTagInButtonScope;case'li':return ancestorInfo.listItemTagAutoclosing;case'dd':case'dt':return ancestorInfo.dlItemTagAutoclosing;case'button':return ancestorInfo.buttonTagInScope;case'a':// Spec says something about storing a list of markers, but it sounds
// equivalent to this check.
return ancestorInfo.aTagInScope;case'nobr':return ancestorInfo.nobrTagInScope;}return null;};var didWarn={};validateDOMNesting=function validateDOMNesting(childTag,childText,ancestorInfo){ancestorInfo=ancestorInfo||emptyAncestorInfo;var parentInfo=ancestorInfo.current;var parentTag=parentInfo&&parentInfo.tag;if(childText!=null){!(childTag==null)?warning(false,'validateDOMNesting: when childText is passed, childTag should be null'):void 0;childTag='#text';}var invalidParent=isTagValidWithParent(childTag,parentTag)?null:parentInfo;var invalidAncestor=invalidParent?null:findInvalidAncestorForTag(childTag,ancestorInfo);var invalidParentOrAncestor=invalidParent||invalidAncestor;if(!invalidParentOrAncestor){return;}var ancestorTag=invalidParentOrAncestor.tag;var addendum=getCurrentFiberStackAddendum$5();var warnKey=!!invalidParent+'|'+childTag+'|'+ancestorTag+'|'+addendum;if(didWarn[warnKey]){return;}didWarn[warnKey]=true;var tagDisplayName=childTag;var whitespaceInfo='';if(childTag==='#text'){if(/\S/.test(childText)){tagDisplayName='Text nodes';}else{tagDisplayName='Whitespace text nodes';whitespaceInfo=" Make sure you don't have any extra whitespace between tags on "+'each line of your source code.';}}else{tagDisplayName='<'+childTag+'>';}if(invalidParent){var info='';if(ancestorTag==='table'&&childTag==='tr'){info+=' Add a <tbody> to your code to match the DOM tree generated by '+'the browser.';}warning(false,'validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s%s',tagDisplayName,ancestorTag,whitespaceInfo,info,addendum);}else{warning(false,'validateDOMNesting(...): %s cannot appear as a descendant of '+'<%s>.%s',tagDisplayName,ancestorTag,addendum);}};// TODO: turn this into a named export
validateDOMNesting.updatedAncestorInfo=updatedAncestorInfo$1;}var validateDOMNesting$1=validateDOMNesting;// Renderers that don't support persistence
// can re-export everything from this module.
function shim(){invariant(false,'The current renderer does not support persistence. This error is likely caused by a bug in React. Please file an issue.');}// Persistence (when unsupported)
var supportsPersistence=false;var cloneInstance=shim;var createContainerChildSet=shim;var appendChildToContainerChildSet=shim;var finalizeContainerChildren=shim;var replaceContainerChildren=shim;// Unused
var createElement=createElement$1;var createTextNode=createTextNode$1;var setInitialProperties=setInitialProperties$1;var diffProperties=diffProperties$1;var updateProperties=updateProperties$1;var diffHydratedProperties=diffHydratedProperties$1;var diffHydratedText=diffHydratedText$1;var warnForUnmatchedText=warnForUnmatchedText$1;var warnForDeletedHydratableElement=warnForDeletedHydratableElement$1;var warnForDeletedHydratableText=warnForDeletedHydratableText$1;var warnForInsertedHydratedElement=warnForInsertedHydratedElement$1;var warnForInsertedHydratedText=warnForInsertedHydratedText$1;var updatedAncestorInfo=validateDOMNesting$1.updatedAncestorInfo;var precacheFiberNode$1=precacheFiberNode;var updateFiberProps$1=updateFiberProps;var SUPPRESS_HYDRATION_WARNING=void 0;{SUPPRESS_HYDRATION_WARNING='suppressHydrationWarning';}var eventsEnabled=null;var selectionInformation=null;function shouldAutoFocusHostComponent(type,props){switch(type){case'button':case'input':case'select':case'textarea':return!!props.autoFocus;}return false;}function getRootHostContext(rootContainerInstance){var type=void 0;var namespace=void 0;var nodeType=rootContainerInstance.nodeType;switch(nodeType){case DOCUMENT_NODE:case DOCUMENT_FRAGMENT_NODE:{type=nodeType===DOCUMENT_NODE?'#document':'#fragment';var root=rootContainerInstance.documentElement;namespace=root?root.namespaceURI:getChildNamespace(null,'');break;}default:{var container=nodeType===COMMENT_NODE?rootContainerInstance.parentNode:rootContainerInstance;var ownNamespace=container.namespaceURI||null;type=container.tagName;namespace=getChildNamespace(ownNamespace,type);break;}}{var validatedTag=type.toLowerCase();var _ancestorInfo=updatedAncestorInfo(null,validatedTag,null);return{namespace:namespace,ancestorInfo:_ancestorInfo};}return namespace;}function getChildHostContext(parentHostContext,type,rootContainerInstance){{var parentHostContextDev=parentHostContext;var _namespace=getChildNamespace(parentHostContextDev.namespace,type);var _ancestorInfo2=updatedAncestorInfo(parentHostContextDev.ancestorInfo,type,null);return{namespace:_namespace,ancestorInfo:_ancestorInfo2};}var parentNamespace=parentHostContext;return getChildNamespace(parentNamespace,type);}function getPublicInstance(instance){return instance;}function prepareForCommit(containerInfo){eventsEnabled=isEnabled();selectionInformation=getSelectionInformation();setEnabled(false);}function resetAfterCommit(containerInfo){restoreSelection(selectionInformation);selectionInformation=null;setEnabled(eventsEnabled);eventsEnabled=null;}function createInstance(type,props,rootContainerInstance,hostContext,internalInstanceHandle){var parentNamespace=void 0;{// TODO: take namespace into account when validating.
var hostContextDev=hostContext;validateDOMNesting$1(type,null,hostContextDev.ancestorInfo);if(typeof props.children==='string'||typeof props.children==='number'){var string=''+props.children;var ownAncestorInfo=updatedAncestorInfo(hostContextDev.ancestorInfo,type,null);validateDOMNesting$1(null,string,ownAncestorInfo);}parentNamespace=hostContextDev.namespace;}var domElement=createElement(type,props,rootContainerInstance,parentNamespace);precacheFiberNode$1(internalInstanceHandle,domElement);updateFiberProps$1(domElement,props);return domElement;}function appendInitialChild(parentInstance,child){parentInstance.appendChild(child);}function finalizeInitialChildren(domElement,type,props,rootContainerInstance,hostContext){setInitialProperties(domElement,type,props,rootContainerInstance);return shouldAutoFocusHostComponent(type,props);}function prepareUpdate(domElement,type,oldProps,newProps,rootContainerInstance,hostContext){{var hostContextDev=hostContext;if(_typeof(newProps.children)!==_typeof(oldProps.children)&&(typeof newProps.children==='string'||typeof newProps.children==='number')){var string=''+newProps.children;var ownAncestorInfo=updatedAncestorInfo(hostContextDev.ancestorInfo,type,null);validateDOMNesting$1(null,string,ownAncestorInfo);}}return diffProperties(domElement,type,oldProps,newProps,rootContainerInstance);}function shouldSetTextContent(type,props){return type==='textarea'||typeof props.children==='string'||typeof props.children==='number'||_typeof(props.dangerouslySetInnerHTML)==='object'&&props.dangerouslySetInnerHTML!==null&&typeof props.dangerouslySetInnerHTML.__html==='string';}function shouldDeprioritizeSubtree(type,props){return!!props.hidden;}function createTextInstance(text,rootContainerInstance,hostContext,internalInstanceHandle){{var hostContextDev=hostContext;validateDOMNesting$1(null,text,hostContextDev.ancestorInfo);}var textNode=createTextNode(text,rootContainerInstance);precacheFiberNode$1(internalInstanceHandle,textNode);return textNode;}var now=now$1;var isPrimaryRenderer=true;var scheduleDeferredCallback=scheduleWork;var cancelDeferredCallback=cancelScheduledWork;// -------------------
//     Mutation
// -------------------
var supportsMutation=true;function commitMount(domElement,type,newProps,internalInstanceHandle){// Despite the naming that might imply otherwise, this method only
// fires if there is an `Update` effect scheduled during mounting.
// This happens if `finalizeInitialChildren` returns `true` (which it
// does to implement the `autoFocus` attribute on the client). But
// there are also other cases when this might happen (such as patching
// up text content during hydration mismatch). So we'll check this again.
if(shouldAutoFocusHostComponent(type,newProps)){domElement.focus();}}function commitUpdate(domElement,updatePayload,type,oldProps,newProps,internalInstanceHandle){// Update the props handle so that we know which props are the ones with
// with current event handlers.
updateFiberProps$1(domElement,newProps);// Apply the diff to the DOM node.
updateProperties(domElement,updatePayload,type,oldProps,newProps);}function resetTextContent(domElement){setTextContent(domElement,'');}function commitTextUpdate(textInstance,oldText,newText){textInstance.nodeValue=newText;}function appendChild(parentInstance,child){parentInstance.appendChild(child);}function appendChildToContainer(container,child){if(container.nodeType===COMMENT_NODE){container.parentNode.insertBefore(child,container);}else{container.appendChild(child);}}function insertBefore(parentInstance,child,beforeChild){parentInstance.insertBefore(child,beforeChild);}function insertInContainerBefore(container,child,beforeChild){if(container.nodeType===COMMENT_NODE){container.parentNode.insertBefore(child,beforeChild);}else{container.insertBefore(child,beforeChild);}}function removeChild(parentInstance,child){parentInstance.removeChild(child);}function removeChildFromContainer(container,child){if(container.nodeType===COMMENT_NODE){container.parentNode.removeChild(child);}else{container.removeChild(child);}}// -------------------
//     Hydration
// -------------------
var supportsHydration=true;function canHydrateInstance(instance,type,props){if(instance.nodeType!==ELEMENT_NODE||type.toLowerCase()!==instance.nodeName.toLowerCase()){return null;}// This has now been refined to an element node.
return instance;}function canHydrateTextInstance(instance,text){if(text===''||instance.nodeType!==TEXT_NODE){// Empty strings are not parsed by HTML so there won't be a correct match here.
return null;}// This has now been refined to a text node.
return instance;}function getNextHydratableSibling(instance){var node=instance.nextSibling;// Skip non-hydratable nodes.
while(node&&node.nodeType!==ELEMENT_NODE&&node.nodeType!==TEXT_NODE){node=node.nextSibling;}return node;}function getFirstHydratableChild(parentInstance){var next=parentInstance.firstChild;// Skip non-hydratable nodes.
while(next&&next.nodeType!==ELEMENT_NODE&&next.nodeType!==TEXT_NODE){next=next.nextSibling;}return next;}function hydrateInstance(instance,type,props,rootContainerInstance,hostContext,internalInstanceHandle){precacheFiberNode$1(internalInstanceHandle,instance);// TODO: Possibly defer this until the commit phase where all the events
// get attached.
updateFiberProps$1(instance,props);var parentNamespace=void 0;{var hostContextDev=hostContext;parentNamespace=hostContextDev.namespace;}return diffHydratedProperties(instance,type,props,parentNamespace,rootContainerInstance);}function hydrateTextInstance(textInstance,text,internalInstanceHandle){precacheFiberNode$1(internalInstanceHandle,textInstance);return diffHydratedText(textInstance,text);}function didNotMatchHydratedContainerTextInstance(parentContainer,textInstance,text){{warnForUnmatchedText(textInstance,text);}}function didNotMatchHydratedTextInstance(parentType,parentProps,parentInstance,textInstance,text){if(true&&parentProps[SUPPRESS_HYDRATION_WARNING]!==true){warnForUnmatchedText(textInstance,text);}}function didNotHydrateContainerInstance(parentContainer,instance){{if(instance.nodeType===1){warnForDeletedHydratableElement(parentContainer,instance);}else{warnForDeletedHydratableText(parentContainer,instance);}}}function didNotHydrateInstance(parentType,parentProps,parentInstance,instance){if(true&&parentProps[SUPPRESS_HYDRATION_WARNING]!==true){if(instance.nodeType===1){warnForDeletedHydratableElement(parentInstance,instance);}else{warnForDeletedHydratableText(parentInstance,instance);}}}function didNotFindHydratableContainerInstance(parentContainer,type,props){{warnForInsertedHydratedElement(parentContainer,type,props);}}function didNotFindHydratableContainerTextInstance(parentContainer,text){{warnForInsertedHydratedText(parentContainer,text);}}function didNotFindHydratableInstance(parentType,parentProps,parentInstance,type,props){if(true&&parentProps[SUPPRESS_HYDRATION_WARNING]!==true){warnForInsertedHydratedElement(parentInstance,type,props);}}function didNotFindHydratableTextInstance(parentType,parentProps,parentInstance,text){if(true&&parentProps[SUPPRESS_HYDRATION_WARNING]!==true){warnForInsertedHydratedText(parentInstance,text);}}// Exports ReactDOM.createRoot
var enableUserTimingAPI=true;// Experimental error-boundary API that can recover from errors within a single
// render phase
var enableGetDerivedStateFromCatch=false;// Suspense
var enableSuspense=false;// Helps identify side effects in begin-phase lifecycle hooks and setState reducers:
var debugRenderPhaseSideEffects=false;// In some cases, StrictMode should also double-render lifecycles.
// This can be confusing for tests though,
// And it can be bad for performance in production.
// This feature flag can be used to control the behavior:
var debugRenderPhaseSideEffectsForStrictMode=true;// To preserve the "Pause on caught exceptions" behavior of the debugger, we
// replay the begin phase of a failed component inside invokeGuardedCallback.
var replayFailedUnitOfWorkWithInvokeGuardedCallback=true;// Warn about deprecated, async-unsafe lifecycles; relates to RFC #6:
var warnAboutDeprecatedLifecycles=false;// Warn about legacy context API
var warnAboutLegacyContextAPI=false;// Gather advanced timing metrics for Profiler subtrees.
var enableProfilerTimer=true;// Fires getDerivedStateFromProps for state *or* props changes
var fireGetDerivedStateFromPropsOnStateUpdates=true;// Only used in www builds.
// Prefix measurements so that it's possible to filter them.
// Longer prefixes are hard to read in DevTools.
var reactEmoji='\u269B';var warningEmoji='\u26D4';var supportsUserTiming=typeof performance!=='undefined'&&typeof performance.mark==='function'&&typeof performance.clearMarks==='function'&&typeof performance.measure==='function'&&typeof performance.clearMeasures==='function';// Keep track of current fiber so that we know the path to unwind on pause.
// TODO: this looks the same as nextUnitOfWork in scheduler. Can we unify them?
var currentFiber=null;// If we're in the middle of user code, which fiber and method is it?
// Reusing `currentFiber` would be confusing for this because user code fiber
// can change during commit phase too, but we don't need to unwind it (since
// lifecycles in the commit phase don't resemble a tree).
var currentPhase=null;var currentPhaseFiber=null;// Did lifecycle hook schedule an update? This is often a performance problem,
// so we will keep track of it, and include it in the report.
// Track commits caused by cascading updates.
var isCommitting=false;var hasScheduledUpdateInCurrentCommit=false;var hasScheduledUpdateInCurrentPhase=false;var commitCountInCurrentWorkLoop=0;var effectCountInCurrentCommit=0;var isWaitingForCallback=false;// During commits, we only show a measurement once per method name
// to avoid stretch the commit phase with measurement overhead.
var labelsInCurrentCommit=new Set();var formatMarkName=function formatMarkName(markName){return reactEmoji+' '+markName;};var formatLabel=function formatLabel(label,warning$$1){var prefix=warning$$1?warningEmoji+' ':reactEmoji+' ';var suffix=warning$$1?' Warning: '+warning$$1:'';return''+prefix+label+suffix;};var beginMark=function beginMark(markName){performance.mark(formatMarkName(markName));};var clearMark=function clearMark(markName){performance.clearMarks(formatMarkName(markName));};var endMark=function endMark(label,markName,warning$$1){var formattedMarkName=formatMarkName(markName);var formattedLabel=formatLabel(label,warning$$1);try{performance.measure(formattedLabel,formattedMarkName);}catch(err){}// If previous mark was missing for some reason, this will throw.
// This could only happen if React crashed in an unexpected place earlier.
// Don't pile on with more errors.
// Clear marks immediately to avoid growing buffer.
performance.clearMarks(formattedMarkName);performance.clearMeasures(formattedLabel);};var getFiberMarkName=function getFiberMarkName(label,debugID){return label+' (#'+debugID+')';};var getFiberLabel=function getFiberLabel(componentName,isMounted,phase){if(phase===null){// These are composite component total time measurements.
return componentName+' ['+(isMounted?'update':'mount')+']';}else{// Composite component methods.
return componentName+'.'+phase;}};var beginFiberMark=function beginFiberMark(fiber,phase){var componentName=getComponentName(fiber)||'Unknown';var debugID=fiber._debugID;var isMounted=fiber.alternate!==null;var label=getFiberLabel(componentName,isMounted,phase);if(isCommitting&&labelsInCurrentCommit.has(label)){// During the commit phase, we don't show duplicate labels because
// there is a fixed overhead for every measurement, and we don't
// want to stretch the commit phase beyond necessary.
return false;}labelsInCurrentCommit.add(label);var markName=getFiberMarkName(label,debugID);beginMark(markName);return true;};var clearFiberMark=function clearFiberMark(fiber,phase){var componentName=getComponentName(fiber)||'Unknown';var debugID=fiber._debugID;var isMounted=fiber.alternate!==null;var label=getFiberLabel(componentName,isMounted,phase);var markName=getFiberMarkName(label,debugID);clearMark(markName);};var endFiberMark=function endFiberMark(fiber,phase,warning$$1){var componentName=getComponentName(fiber)||'Unknown';var debugID=fiber._debugID;var isMounted=fiber.alternate!==null;var label=getFiberLabel(componentName,isMounted,phase);var markName=getFiberMarkName(label,debugID);endMark(label,markName,warning$$1);};var shouldIgnoreFiber=function shouldIgnoreFiber(fiber){// Host components should be skipped in the timeline.
// We could check typeof fiber.type, but does this work with RN?
switch(fiber.tag){case HostRoot:case HostComponent:case HostText:case HostPortal:case Fragment:case ContextProvider:case ContextConsumer:case Mode:return true;default:return false;}};var clearPendingPhaseMeasurement=function clearPendingPhaseMeasurement(){if(currentPhase!==null&&currentPhaseFiber!==null){clearFiberMark(currentPhaseFiber,currentPhase);}currentPhaseFiber=null;currentPhase=null;hasScheduledUpdateInCurrentPhase=false;};var pauseTimers=function pauseTimers(){// Stops all currently active measurements so that they can be resumed
// if we continue in a later deferred loop from the same unit of work.
var fiber=currentFiber;while(fiber){if(fiber._debugIsCurrentlyTiming){endFiberMark(fiber,null,null);}fiber=fiber.return;}};var resumeTimersRecursively=function resumeTimersRecursively(fiber){if(fiber.return!==null){resumeTimersRecursively(fiber.return);}if(fiber._debugIsCurrentlyTiming){beginFiberMark(fiber,null);}};var resumeTimers=function resumeTimers(){// Resumes all measurements that were active during the last deferred loop.
if(currentFiber!==null){resumeTimersRecursively(currentFiber);}};function recordEffect(){if(enableUserTimingAPI){effectCountInCurrentCommit++;}}function recordScheduleUpdate(){if(enableUserTimingAPI){if(isCommitting){hasScheduledUpdateInCurrentCommit=true;}if(currentPhase!==null&&currentPhase!=='componentWillMount'&&currentPhase!=='componentWillReceiveProps'){hasScheduledUpdateInCurrentPhase=true;}}}function startRequestCallbackTimer(){if(enableUserTimingAPI){if(supportsUserTiming&&!isWaitingForCallback){isWaitingForCallback=true;beginMark('(Waiting for async callback...)');}}}function stopRequestCallbackTimer(didExpire,expirationTime){if(enableUserTimingAPI){if(supportsUserTiming){isWaitingForCallback=false;var warning$$1=didExpire?'React was blocked by main thread':null;endMark('(Waiting for async callback... will force flush in '+expirationTime+' ms)','(Waiting for async callback...)',warning$$1);}}}function startWorkTimer(fiber){if(enableUserTimingAPI){if(!supportsUserTiming||shouldIgnoreFiber(fiber)){return;}// If we pause, this is the fiber to unwind from.
currentFiber=fiber;if(!beginFiberMark(fiber,null)){return;}fiber._debugIsCurrentlyTiming=true;}}function cancelWorkTimer(fiber){if(enableUserTimingAPI){if(!supportsUserTiming||shouldIgnoreFiber(fiber)){return;}// Remember we shouldn't complete measurement for this fiber.
// Otherwise flamechart will be deep even for small updates.
fiber._debugIsCurrentlyTiming=false;clearFiberMark(fiber,null);}}function stopWorkTimer(fiber){if(enableUserTimingAPI){if(!supportsUserTiming||shouldIgnoreFiber(fiber)){return;}// If we pause, its parent is the fiber to unwind from.
currentFiber=fiber.return;if(!fiber._debugIsCurrentlyTiming){return;}fiber._debugIsCurrentlyTiming=false;endFiberMark(fiber,null,null);}}function stopFailedWorkTimer(fiber){if(enableUserTimingAPI){if(!supportsUserTiming||shouldIgnoreFiber(fiber)){return;}// If we pause, its parent is the fiber to unwind from.
currentFiber=fiber.return;if(!fiber._debugIsCurrentlyTiming){return;}fiber._debugIsCurrentlyTiming=false;var warning$$1='An error was thrown inside this error boundary';endFiberMark(fiber,null,warning$$1);}}function startPhaseTimer(fiber,phase){if(enableUserTimingAPI){if(!supportsUserTiming){return;}clearPendingPhaseMeasurement();if(!beginFiberMark(fiber,phase)){return;}currentPhaseFiber=fiber;currentPhase=phase;}}function stopPhaseTimer(){if(enableUserTimingAPI){if(!supportsUserTiming){return;}if(currentPhase!==null&&currentPhaseFiber!==null){var warning$$1=hasScheduledUpdateInCurrentPhase?'Scheduled a cascading update':null;endFiberMark(currentPhaseFiber,currentPhase,warning$$1);}currentPhase=null;currentPhaseFiber=null;}}function startWorkLoopTimer(nextUnitOfWork){if(enableUserTimingAPI){currentFiber=nextUnitOfWork;if(!supportsUserTiming){return;}commitCountInCurrentWorkLoop=0;// This is top level call.
// Any other measurements are performed within.
beginMark('(React Tree Reconciliation)');// Resume any measurements that were in progress during the last loop.
resumeTimers();}}function stopWorkLoopTimer(interruptedBy,didCompleteRoot){if(enableUserTimingAPI){if(!supportsUserTiming){return;}var warning$$1=null;if(interruptedBy!==null){if(interruptedBy.tag===HostRoot){warning$$1='A top-level update interrupted the previous render';}else{var componentName=getComponentName(interruptedBy)||'Unknown';warning$$1='An update to '+componentName+' interrupted the previous render';}}else if(commitCountInCurrentWorkLoop>1){warning$$1='There were cascading updates';}commitCountInCurrentWorkLoop=0;var label=didCompleteRoot?'(React Tree Reconciliation: Completed Root)':'(React Tree Reconciliation: Yielded)';// Pause any measurements until the next loop.
pauseTimers();endMark(label,'(React Tree Reconciliation)',warning$$1);}}function startCommitTimer(){if(enableUserTimingAPI){if(!supportsUserTiming){return;}isCommitting=true;hasScheduledUpdateInCurrentCommit=false;labelsInCurrentCommit.clear();beginMark('(Committing Changes)');}}function stopCommitTimer(){if(enableUserTimingAPI){if(!supportsUserTiming){return;}var warning$$1=null;if(hasScheduledUpdateInCurrentCommit){warning$$1='Lifecycle hook scheduled a cascading update';}else if(commitCountInCurrentWorkLoop>0){warning$$1='Caused by a cascading update in earlier commit';}hasScheduledUpdateInCurrentCommit=false;commitCountInCurrentWorkLoop++;isCommitting=false;labelsInCurrentCommit.clear();endMark('(Committing Changes)','(Committing Changes)',warning$$1);}}function startCommitSnapshotEffectsTimer(){if(enableUserTimingAPI){if(!supportsUserTiming){return;}effectCountInCurrentCommit=0;beginMark('(Committing Snapshot Effects)');}}function stopCommitSnapshotEffectsTimer(){if(enableUserTimingAPI){if(!supportsUserTiming){return;}var count=effectCountInCurrentCommit;effectCountInCurrentCommit=0;endMark('(Committing Snapshot Effects: '+count+' Total)','(Committing Snapshot Effects)',null);}}function startCommitHostEffectsTimer(){if(enableUserTimingAPI){if(!supportsUserTiming){return;}effectCountInCurrentCommit=0;beginMark('(Committing Host Effects)');}}function stopCommitHostEffectsTimer(){if(enableUserTimingAPI){if(!supportsUserTiming){return;}var count=effectCountInCurrentCommit;effectCountInCurrentCommit=0;endMark('(Committing Host Effects: '+count+' Total)','(Committing Host Effects)',null);}}function startCommitLifeCyclesTimer(){if(enableUserTimingAPI){if(!supportsUserTiming){return;}effectCountInCurrentCommit=0;beginMark('(Calling Lifecycle Methods)');}}function stopCommitLifeCyclesTimer(){if(enableUserTimingAPI){if(!supportsUserTiming){return;}var count=effectCountInCurrentCommit;effectCountInCurrentCommit=0;endMark('(Calling Lifecycle Methods: '+count+' Total)','(Calling Lifecycle Methods)',null);}}var valueStack=[];var fiberStack=void 0;{fiberStack=[];}var index=-1;function createCursor(defaultValue){return{current:defaultValue};}function pop(cursor,fiber){if(index<0){{warning(false,'Unexpected pop.');}return;}{if(fiber!==fiberStack[index]){warning(false,'Unexpected Fiber popped.');}}cursor.current=valueStack[index];valueStack[index]=null;{fiberStack[index]=null;}index--;}function push(cursor,value,fiber){index++;valueStack[index]=cursor.current;{fiberStack[index]=fiber;}cursor.current=value;}function checkThatStackIsEmpty(){{if(index!==-1){warning(false,'Expected an empty stack. Something was not reset properly.');}}}function resetStackAfterFatalErrorInDev(){{index=-1;valueStack.length=0;fiberStack.length=0;}}var warnedAboutMissingGetChildContext=void 0;{warnedAboutMissingGetChildContext={};}// A cursor to the current merged context object on the stack.
var contextStackCursor=createCursor(emptyObject);// A cursor to a boolean indicating whether the context has changed.
var didPerformWorkStackCursor=createCursor(false);// Keep track of the previous context object that was on the stack.
// We use this to get access to the parent context after we have already
// pushed the next context provider, and now need to merge their contexts.
var previousContext=emptyObject;function getUnmaskedContext(workInProgress){var hasOwnContext=isContextProvider(workInProgress);if(hasOwnContext){// If the fiber is a context provider itself, when we read its context
// we have already pushed its own child context on the stack. A context
// provider should not "see" its own child context. Therefore we read the
// previous (parent) context instead for a context provider.
return previousContext;}return contextStackCursor.current;}function cacheContext(workInProgress,unmaskedContext,maskedContext){var instance=workInProgress.stateNode;instance.__reactInternalMemoizedUnmaskedChildContext=unmaskedContext;instance.__reactInternalMemoizedMaskedChildContext=maskedContext;}function getMaskedContext(workInProgress,unmaskedContext){var type=workInProgress.type;var contextTypes=type.contextTypes;if(!contextTypes){return emptyObject;}// Avoid recreating masked context unless unmasked context has changed.
// Failing to do this will result in unnecessary calls to componentWillReceiveProps.
// This may trigger infinite loops if componentWillReceiveProps calls setState.
var instance=workInProgress.stateNode;if(instance&&instance.__reactInternalMemoizedUnmaskedChildContext===unmaskedContext){return instance.__reactInternalMemoizedMaskedChildContext;}var context={};for(var key in contextTypes){context[key]=unmaskedContext[key];}{var name=getComponentName(workInProgress)||'Unknown';checkPropTypes(contextTypes,context,'context',name,ReactDebugCurrentFiber.getCurrentFiberStackAddendum);}// Cache unmasked context so we can avoid recreating masked context unless necessary.
// Context is created before the class component is instantiated so check for instance.
if(instance){cacheContext(workInProgress,unmaskedContext,context);}return context;}function hasContextChanged(){return didPerformWorkStackCursor.current;}function isContextConsumer(fiber){return fiber.tag===ClassComponent&&fiber.type.contextTypes!=null;}function isContextProvider(fiber){return fiber.tag===ClassComponent&&fiber.type.childContextTypes!=null;}function popContextProvider(fiber){if(!isContextProvider(fiber)){return;}pop(didPerformWorkStackCursor,fiber);pop(contextStackCursor,fiber);}function popTopLevelContextObject(fiber){pop(didPerformWorkStackCursor,fiber);pop(contextStackCursor,fiber);}function pushTopLevelContextObject(fiber,context,didChange){!(contextStackCursor.current===emptyObject)?invariant(false,'Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.'):void 0;push(contextStackCursor,context,fiber);push(didPerformWorkStackCursor,didChange,fiber);}function processChildContext(fiber,parentContext){var instance=fiber.stateNode;var childContextTypes=fiber.type.childContextTypes;// TODO (bvaughn) Replace this behavior with an invariant() in the future.
// It has only been added in Fiber to match the (unintentional) behavior in Stack.
if(typeof instance.getChildContext!=='function'){{var componentName=getComponentName(fiber)||'Unknown';if(!warnedAboutMissingGetChildContext[componentName]){warnedAboutMissingGetChildContext[componentName]=true;warning(false,'%s.childContextTypes is specified but there is no getChildContext() method '+'on the instance. You can either define getChildContext() on %s or remove '+'childContextTypes from it.',componentName,componentName);}}return parentContext;}var childContext=void 0;{ReactDebugCurrentFiber.setCurrentPhase('getChildContext');}startPhaseTimer(fiber,'getChildContext');childContext=instance.getChildContext();stopPhaseTimer();{ReactDebugCurrentFiber.setCurrentPhase(null);}for(var contextKey in childContext){!(contextKey in childContextTypes)?invariant(false,'%s.getChildContext(): key "%s" is not defined in childContextTypes.',getComponentName(fiber)||'Unknown',contextKey):void 0;}{var name=getComponentName(fiber)||'Unknown';checkPropTypes(childContextTypes,childContext,'child context',name,// In practice, there is one case in which we won't get a stack. It's when
// somebody calls unstable_renderSubtreeIntoContainer() and we process
// context from the parent component instance. The stack will be missing
// because it's outside of the reconciliation, and so the pointer has not
// been set. This is rare and doesn't matter. We'll also remove that API.
ReactDebugCurrentFiber.getCurrentFiberStackAddendum);}return _assign({},parentContext,childContext);}function pushContextProvider(workInProgress){if(!isContextProvider(workInProgress)){return false;}var instance=workInProgress.stateNode;// We push the context as early as possible to ensure stack integrity.
// If the instance does not exist yet, we will push null at first,
// and replace it on the stack later when invalidating the context.
var memoizedMergedChildContext=instance&&instance.__reactInternalMemoizedMergedChildContext||emptyObject;// Remember the parent context so we can merge with it later.
// Inherit the parent's did-perform-work value to avoid inadvertently blocking updates.
previousContext=contextStackCursor.current;push(contextStackCursor,memoizedMergedChildContext,workInProgress);push(didPerformWorkStackCursor,didPerformWorkStackCursor.current,workInProgress);return true;}function invalidateContextProvider(workInProgress,didChange){var instance=workInProgress.stateNode;!instance?invariant(false,'Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.'):void 0;if(didChange){// Merge parent and own context.
// Skip this if we're not updating due to sCU.
// This avoids unnecessarily recomputing memoized values.
var mergedContext=processChildContext(workInProgress,previousContext);instance.__reactInternalMemoizedMergedChildContext=mergedContext;// Replace the old (or empty) context with the new one.
// It is important to unwind the context in the reverse order.
pop(didPerformWorkStackCursor,workInProgress);pop(contextStackCursor,workInProgress);// Now push the new context and mark that it has changed.
push(contextStackCursor,mergedContext,workInProgress);push(didPerformWorkStackCursor,didChange,workInProgress);}else{pop(didPerformWorkStackCursor,workInProgress);push(didPerformWorkStackCursor,didChange,workInProgress);}}function findCurrentUnmaskedContext(fiber){// Currently this is only used with renderSubtreeIntoContainer; not sure if it
// makes sense elsewhere
!(isFiberMounted(fiber)&&fiber.tag===ClassComponent)?invariant(false,'Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.'):void 0;var node=fiber;while(node.tag!==HostRoot){if(isContextProvider(node)){return node.stateNode.__reactInternalMemoizedMergedChildContext;}var parent=node.return;!parent?invariant(false,'Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.'):void 0;node=parent;}return node.stateNode.context;}// Max 31 bit integer. The max integer size in V8 for 32-bit systems.
// Math.pow(2, 30) - 1
// 0b111111111111111111111111111111
var MAX_SIGNED_31_BIT_INT=1073741823;// TODO: Use an opaque type once ESLint et al support the syntax
var NoWork=0;var Sync=1;var Never=MAX_SIGNED_31_BIT_INT;var UNIT_SIZE=10;var MAGIC_NUMBER_OFFSET=2;// 1 unit of expiration time represents 10ms.
function msToExpirationTime(ms){// Always add an offset so that we don't clash with the magic number for NoWork.
return(ms/UNIT_SIZE|0)+MAGIC_NUMBER_OFFSET;}function expirationTimeToMs(expirationTime){return(expirationTime-MAGIC_NUMBER_OFFSET)*UNIT_SIZE;}function ceiling(num,precision){return((num/precision|0)+1)*precision;}function computeExpirationBucket(currentTime,expirationInMs,bucketSizeMs){return MAGIC_NUMBER_OFFSET+ceiling(currentTime-MAGIC_NUMBER_OFFSET+expirationInMs/UNIT_SIZE,bucketSizeMs/UNIT_SIZE);}var NoContext=0;var AsyncMode=1;var StrictMode=2;var ProfileMode=4;var hasBadMapPolyfill=void 0;{hasBadMapPolyfill=false;try{var nonExtensibleObject=Object.preventExtensions({});var testMap=new Map([[nonExtensibleObject,null]]);var testSet=new Set([nonExtensibleObject]);// This is necessary for Rollup to not consider these unused.
// https://github.com/rollup/rollup/issues/1771
// TODO: we can remove these if Rollup fixes the bug.
testMap.set(0,0);testSet.add(0);}catch(e){// TODO: Consider warning about bad polyfills
hasBadMapPolyfill=true;}}// A Fiber is work on a Component that needs to be done or was done. There can
// be more than one per component.
var debugCounter=void 0;{debugCounter=1;}function FiberNode(tag,pendingProps,key,mode){// Instance
this.tag=tag;this.key=key;this.type=null;this.stateNode=null;// Fiber
this.return=null;this.child=null;this.sibling=null;this.index=0;this.ref=null;this.pendingProps=pendingProps;this.memoizedProps=null;this.updateQueue=null;this.memoizedState=null;this.mode=mode;// Effects
this.effectTag=NoEffect;this.nextEffect=null;this.firstEffect=null;this.lastEffect=null;this.expirationTime=NoWork;this.alternate=null;if(enableProfilerTimer){this.selfBaseTime=0;this.treeBaseTime=0;}{this._debugID=debugCounter++;this._debugSource=null;this._debugOwner=null;this._debugIsCurrentlyTiming=false;if(!hasBadMapPolyfill&&typeof Object.preventExtensions==='function'){Object.preventExtensions(this);}}}// This is a constructor function, rather than a POJO constructor, still
// please ensure we do the following:
// 1) Nobody should add any instance methods on this. Instance methods can be
//    more difficult to predict when they get optimized and they are almost
//    never inlined properly in static compilers.
// 2) Nobody should rely on `instanceof Fiber` for type testing. We should
//    always know when it is a fiber.
// 3) We might want to experiment with using numeric keys since they are easier
//    to optimize in a non-JIT environment.
// 4) We can easily go from a constructor to a createFiber object literal if that
//    is faster.
// 5) It should be easy to port this to a C struct and keep a C implementation
//    compatible.
var createFiber=function createFiber(tag,pendingProps,key,mode){// $FlowFixMe: the shapes are exact here but Flow doesn't like constructors
return new FiberNode(tag,pendingProps,key,mode);};function shouldConstruct(Component){return!!(Component.prototype&&Component.prototype.isReactComponent);}// This is used to create an alternate fiber to do work on.
function createWorkInProgress(current,pendingProps,expirationTime){var workInProgress=current.alternate;if(workInProgress===null){// We use a double buffering pooling technique because we know that we'll
// only ever need at most two versions of a tree. We pool the "other" unused
// node that we're free to reuse. This is lazily created to avoid allocating
// extra objects for things that are never updated. It also allow us to
// reclaim the extra memory if needed.
workInProgress=createFiber(current.tag,pendingProps,current.key,current.mode);workInProgress.type=current.type;workInProgress.stateNode=current.stateNode;{// DEV-only fields
workInProgress._debugID=current._debugID;workInProgress._debugSource=current._debugSource;workInProgress._debugOwner=current._debugOwner;}workInProgress.alternate=current;current.alternate=workInProgress;}else{workInProgress.pendingProps=pendingProps;// We already have an alternate.
// Reset the effect tag.
workInProgress.effectTag=NoEffect;// The effect list is no longer valid.
workInProgress.nextEffect=null;workInProgress.firstEffect=null;workInProgress.lastEffect=null;}workInProgress.expirationTime=expirationTime;workInProgress.child=current.child;workInProgress.memoizedProps=current.memoizedProps;workInProgress.memoizedState=current.memoizedState;workInProgress.updateQueue=current.updateQueue;// These will be overridden during the parent's reconciliation
workInProgress.sibling=current.sibling;workInProgress.index=current.index;workInProgress.ref=current.ref;if(enableProfilerTimer){workInProgress.selfBaseTime=current.selfBaseTime;workInProgress.treeBaseTime=current.treeBaseTime;}return workInProgress;}function createHostRootFiber(isAsync){var mode=isAsync?AsyncMode|StrictMode:NoContext;return createFiber(HostRoot,null,null,mode);}function createFiberFromElement(element,mode,expirationTime){var owner=null;{owner=element._owner;}var fiber=void 0;var type=element.type;var key=element.key;var pendingProps=element.props;var fiberTag=void 0;if(typeof type==='function'){fiberTag=shouldConstruct(type)?ClassComponent:IndeterminateComponent;}else if(typeof type==='string'){fiberTag=HostComponent;}else{switch(type){case REACT_FRAGMENT_TYPE:return createFiberFromFragment(pendingProps.children,mode,expirationTime,key);case REACT_ASYNC_MODE_TYPE:fiberTag=Mode;mode|=AsyncMode|StrictMode;break;case REACT_STRICT_MODE_TYPE:fiberTag=Mode;mode|=StrictMode;break;case REACT_PROFILER_TYPE:return createFiberFromProfiler(pendingProps,mode,expirationTime,key);case REACT_TIMEOUT_TYPE:fiberTag=TimeoutComponent;// Suspense does not require async, but its children should be strict
// mode compatible.
mode|=StrictMode;break;default:fiberTag=getFiberTagFromObjectType(type,owner);break;}}fiber=createFiber(fiberTag,pendingProps,key,mode);fiber.type=type;fiber.expirationTime=expirationTime;{fiber._debugSource=element._source;fiber._debugOwner=element._owner;}return fiber;}function getFiberTagFromObjectType(type,owner){var $$typeof=(typeof type==='undefined'?'undefined':_typeof(type))==='object'&&type!==null?type.$$typeof:null;switch($$typeof){case REACT_PROVIDER_TYPE:return ContextProvider;case REACT_CONTEXT_TYPE:// This is a consumer
return ContextConsumer;case REACT_FORWARD_REF_TYPE:return ForwardRef;default:{var info='';{if(type===undefined||(typeof type==='undefined'?'undefined':_typeof(type))==='object'&&type!==null&&Object.keys(type).length===0){info+=' You likely forgot to export your component from the file '+"it's defined in, or you might have mixed up default and "+'named imports.';}var ownerName=owner?getComponentName(owner):null;if(ownerName){info+='\n\nCheck the render method of `'+ownerName+'`.';}}invariant(false,'Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s',type==null?type:typeof type==='undefined'?'undefined':_typeof(type),info);}}}function createFiberFromFragment(elements,mode,expirationTime,key){var fiber=createFiber(Fragment,elements,key,mode);fiber.expirationTime=expirationTime;return fiber;}function createFiberFromProfiler(pendingProps,mode,expirationTime,key){{if(typeof pendingProps.id!=='string'||typeof pendingProps.onRender!=='function'){invariant(false,'Profiler must specify an "id" string and "onRender" function as props');}}var fiber=createFiber(Profiler,pendingProps,key,mode|ProfileMode);fiber.type=REACT_PROFILER_TYPE;fiber.expirationTime=expirationTime;if(enableProfilerTimer){fiber.stateNode={elapsedPauseTimeAtStart:0,duration:0,startTime:0};}return fiber;}function createFiberFromText(content,mode,expirationTime){var fiber=createFiber(HostText,content,null,mode);fiber.expirationTime=expirationTime;return fiber;}function createFiberFromHostInstanceForDeletion(){var fiber=createFiber(HostComponent,null,null,NoContext);fiber.type='DELETED';return fiber;}function createFiberFromPortal(portal,mode,expirationTime){var pendingProps=portal.children!==null?portal.children:[];var fiber=createFiber(HostPortal,pendingProps,portal.key,mode);fiber.expirationTime=expirationTime;fiber.stateNode={containerInfo:portal.containerInfo,pendingChildren:null,// Used by persistent updates
implementation:portal.implementation};return fiber;}// Used for stashing WIP properties to replay failed work in DEV.
function assignFiberPropertiesInDEV(target,source){if(target===null){// This Fiber's initial properties will always be overwritten.
// We only use a Fiber to ensure the same hidden class so DEV isn't slow.
target=createFiber(IndeterminateComponent,null,null,NoContext);}// This is intentionally written as a list of all properties.
// We tried to use Object.assign() instead but this is called in
// the hottest path, and Object.assign() was too slow:
// https://github.com/facebook/react/issues/12502
// This code is DEV-only so size is not a concern.
target.tag=source.tag;target.key=source.key;target.type=source.type;target.stateNode=source.stateNode;target.return=source.return;target.child=source.child;target.sibling=source.sibling;target.index=source.index;target.ref=source.ref;target.pendingProps=source.pendingProps;target.memoizedProps=source.memoizedProps;target.updateQueue=source.updateQueue;target.memoizedState=source.memoizedState;target.mode=source.mode;target.effectTag=source.effectTag;target.nextEffect=source.nextEffect;target.firstEffect=source.firstEffect;target.lastEffect=source.lastEffect;target.expirationTime=source.expirationTime;target.alternate=source.alternate;if(enableProfilerTimer){target.selfBaseTime=source.selfBaseTime;target.treeBaseTime=source.treeBaseTime;}target._debugID=source._debugID;target._debugSource=source._debugSource;target._debugOwner=source._debugOwner;target._debugIsCurrentlyTiming=source._debugIsCurrentlyTiming;return target;}// TODO: This should be lifted into the renderer.
function createFiberRoot(containerInfo,isAsync,hydrate){// Cyclic construction. This cheats the type system right now because
// stateNode is any.
var uninitializedFiber=createHostRootFiber(isAsync);var root={current:uninitializedFiber,containerInfo:containerInfo,pendingChildren:null,earliestPendingTime:NoWork,latestPendingTime:NoWork,earliestSuspendedTime:NoWork,latestSuspendedTime:NoWork,latestPingedTime:NoWork,pendingCommitExpirationTime:NoWork,finishedWork:null,context:null,pendingContext:null,hydrate:hydrate,remainingExpirationTime:NoWork,firstBatch:null,nextScheduledRoot:null};uninitializedFiber.stateNode=root;return root;}var onCommitFiberRoot=null;var onCommitFiberUnmount=null;var hasLoggedError=false;function catchErrors(fn){return function(arg){try{return fn(arg);}catch(err){if(true&&!hasLoggedError){hasLoggedError=true;warning(false,'React DevTools encountered an error: %s',err);}}};}function injectInternals(internals){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__==='undefined'){// No DevTools
return false;}var hook=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(hook.isDisabled){// This isn't a real property on the hook, but it can be set to opt out
// of DevTools integration and associated warnings and logs.
// https://github.com/facebook/react/issues/3877
return true;}if(!hook.supportsFiber){{warning(false,'The installed version of React DevTools is too old and will not work '+'with the current version of React. Please update React DevTools. '+'https://fb.me/react-devtools');}// DevTools exists, even though it doesn't support Fiber.
return true;}try{var rendererID=hook.inject(internals);// We have successfully injected, so now it is safe to set up hooks.
onCommitFiberRoot=catchErrors(function(root){return hook.onCommitFiberRoot(rendererID,root);});onCommitFiberUnmount=catchErrors(function(fiber){return hook.onCommitFiberUnmount(rendererID,fiber);});}catch(err){// Catch all errors because it is unsafe to throw during initialization.
{warning(false,'React DevTools encountered an error: %s.',err);}}// DevTools exists
return true;}function onCommitRoot(root){if(typeof onCommitFiberRoot==='function'){onCommitFiberRoot(root);}}function onCommitUnmount(fiber){if(typeof onCommitFiberUnmount==='function'){onCommitFiberUnmount(fiber);}}/**
 * Forked from fbjs/warning:
 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
 *
 * Only change is we use console.warn instead of console.error,
 * and do nothing when 'console' is not supported.
 * This really simplifies the code.
 * ---
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */var lowPriorityWarning=function lowPriorityWarning(){};{var printWarning=function printWarning(format){for(var _len=arguments.length,args=Array(_len>1?_len-1:0),_key=1;_key<_len;_key++){args[_key-1]=arguments[_key];}var argIndex=0;var message='Warning: '+format.replace(/%s/g,function(){return args[argIndex++];});if(typeof console!=='undefined'){console.warn(message);}try{// --- Welcome to debugging React ---
// This error was thrown as a convenience so that you can use this stack
// to find the callsite that caused this warning to fire.
throw new Error(message);}catch(x){}};lowPriorityWarning=function lowPriorityWarning(condition,format){if(format===undefined){throw new Error('`warning(condition, format, ...args)` requires a warning '+'message argument');}if(!condition){for(var _len2=arguments.length,args=Array(_len2>2?_len2-2:0),_key2=2;_key2<_len2;_key2++){args[_key2-2]=arguments[_key2];}printWarning.apply(undefined,[format].concat(args));}};}var lowPriorityWarning$1=lowPriorityWarning;var ReactStrictModeWarnings={discardPendingWarnings:function discardPendingWarnings(){},flushPendingDeprecationWarnings:function flushPendingDeprecationWarnings(){},flushPendingUnsafeLifecycleWarnings:function flushPendingUnsafeLifecycleWarnings(){},recordDeprecationWarnings:function recordDeprecationWarnings(fiber,instance){},recordUnsafeLifecycleWarnings:function recordUnsafeLifecycleWarnings(fiber,instance){},recordLegacyContextWarning:function recordLegacyContextWarning(fiber,instance){},flushLegacyContextWarning:function flushLegacyContextWarning(){}};{var LIFECYCLE_SUGGESTIONS={UNSAFE_componentWillMount:'componentDidMount',UNSAFE_componentWillReceiveProps:'static getDerivedStateFromProps',UNSAFE_componentWillUpdate:'componentDidUpdate'};var pendingComponentWillMountWarnings=[];var pendingComponentWillReceivePropsWarnings=[];var pendingComponentWillUpdateWarnings=[];var pendingUnsafeLifecycleWarnings=new Map();var pendingLegacyContextWarning=new Map();// Tracks components we have already warned about.
var didWarnAboutDeprecatedLifecycles=new Set();var didWarnAboutUnsafeLifecycles=new Set();var didWarnAboutLegacyContext=new Set();var setToSortedString=function setToSortedString(set){var array=[];set.forEach(function(value){array.push(value);});return array.sort().join(', ');};ReactStrictModeWarnings.discardPendingWarnings=function(){pendingComponentWillMountWarnings=[];pendingComponentWillReceivePropsWarnings=[];pendingComponentWillUpdateWarnings=[];pendingUnsafeLifecycleWarnings=new Map();pendingLegacyContextWarning=new Map();};ReactStrictModeWarnings.flushPendingUnsafeLifecycleWarnings=function(){pendingUnsafeLifecycleWarnings.forEach(function(lifecycleWarningsMap,strictRoot){var lifecyclesWarningMesages=[];Object.keys(lifecycleWarningsMap).forEach(function(lifecycle){var lifecycleWarnings=lifecycleWarningsMap[lifecycle];if(lifecycleWarnings.length>0){var componentNames=new Set();lifecycleWarnings.forEach(function(fiber){componentNames.add(getComponentName(fiber)||'Component');didWarnAboutUnsafeLifecycles.add(fiber.type);});var formatted=lifecycle.replace('UNSAFE_','');var suggestion=LIFECYCLE_SUGGESTIONS[lifecycle];var sortedComponentNames=setToSortedString(componentNames);lifecyclesWarningMesages.push(formatted+': Please update the following components to use '+(suggestion+' instead: '+sortedComponentNames));}});if(lifecyclesWarningMesages.length>0){var strictRootComponentStack=getStackAddendumByWorkInProgressFiber(strictRoot);warning(false,'Unsafe lifecycle methods were found within a strict-mode tree:%s'+'\n\n%s'+'\n\nLearn more about this warning here:'+'\nhttps://fb.me/react-strict-mode-warnings',strictRootComponentStack,lifecyclesWarningMesages.join('\n\n'));}});pendingUnsafeLifecycleWarnings=new Map();};var findStrictRoot=function findStrictRoot(fiber){var maybeStrictRoot=null;var node=fiber;while(node!==null){if(node.mode&StrictMode){maybeStrictRoot=node;}node=node.return;}return maybeStrictRoot;};ReactStrictModeWarnings.flushPendingDeprecationWarnings=function(){if(pendingComponentWillMountWarnings.length>0){var uniqueNames=new Set();pendingComponentWillMountWarnings.forEach(function(fiber){uniqueNames.add(getComponentName(fiber)||'Component');didWarnAboutDeprecatedLifecycles.add(fiber.type);});var sortedNames=setToSortedString(uniqueNames);lowPriorityWarning$1(false,'componentWillMount is deprecated and will be removed in the next major version. '+'Use componentDidMount instead. As a temporary workaround, '+'you can rename to UNSAFE_componentWillMount.'+'\n\nPlease update the following components: %s'+'\n\nLearn more about this warning here:'+'\nhttps://fb.me/react-async-component-lifecycle-hooks',sortedNames);pendingComponentWillMountWarnings=[];}if(pendingComponentWillReceivePropsWarnings.length>0){var _uniqueNames=new Set();pendingComponentWillReceivePropsWarnings.forEach(function(fiber){_uniqueNames.add(getComponentName(fiber)||'Component');didWarnAboutDeprecatedLifecycles.add(fiber.type);});var _sortedNames=setToSortedString(_uniqueNames);lowPriorityWarning$1(false,'componentWillReceiveProps is deprecated and will be removed in the next major version. '+'Use static getDerivedStateFromProps instead.'+'\n\nPlease update the following components: %s'+'\n\nLearn more about this warning here:'+'\nhttps://fb.me/react-async-component-lifecycle-hooks',_sortedNames);pendingComponentWillReceivePropsWarnings=[];}if(pendingComponentWillUpdateWarnings.length>0){var _uniqueNames2=new Set();pendingComponentWillUpdateWarnings.forEach(function(fiber){_uniqueNames2.add(getComponentName(fiber)||'Component');didWarnAboutDeprecatedLifecycles.add(fiber.type);});var _sortedNames2=setToSortedString(_uniqueNames2);lowPriorityWarning$1(false,'componentWillUpdate is deprecated and will be removed in the next major version. '+'Use componentDidUpdate instead. As a temporary workaround, '+'you can rename to UNSAFE_componentWillUpdate.'+'\n\nPlease update the following components: %s'+'\n\nLearn more about this warning here:'+'\nhttps://fb.me/react-async-component-lifecycle-hooks',_sortedNames2);pendingComponentWillUpdateWarnings=[];}};ReactStrictModeWarnings.recordDeprecationWarnings=function(fiber,instance){// Dedup strategy: Warn once per component.
if(didWarnAboutDeprecatedLifecycles.has(fiber.type)){return;}// Don't warn about react-lifecycles-compat polyfilled components.
if(typeof instance.componentWillMount==='function'&&instance.componentWillMount.__suppressDeprecationWarning!==true){pendingComponentWillMountWarnings.push(fiber);}if(typeof instance.componentWillReceiveProps==='function'&&instance.componentWillReceiveProps.__suppressDeprecationWarning!==true){pendingComponentWillReceivePropsWarnings.push(fiber);}if(typeof instance.componentWillUpdate==='function'&&instance.componentWillUpdate.__suppressDeprecationWarning!==true){pendingComponentWillUpdateWarnings.push(fiber);}};ReactStrictModeWarnings.recordUnsafeLifecycleWarnings=function(fiber,instance){var strictRoot=findStrictRoot(fiber);if(strictRoot===null){warning(false,'Expected to find a StrictMode component in a strict mode tree. '+'This error is likely caused by a bug in React. Please file an issue.');return;}// Dedup strategy: Warn once per component.
// This is difficult to track any other way since component names
// are often vague and are likely to collide between 3rd party libraries.
// An expand property is probably okay to use here since it's DEV-only,
// and will only be set in the event of serious warnings.
if(didWarnAboutUnsafeLifecycles.has(fiber.type)){return;}var warningsForRoot=void 0;if(!pendingUnsafeLifecycleWarnings.has(strictRoot)){warningsForRoot={UNSAFE_componentWillMount:[],UNSAFE_componentWillReceiveProps:[],UNSAFE_componentWillUpdate:[]};pendingUnsafeLifecycleWarnings.set(strictRoot,warningsForRoot);}else{warningsForRoot=pendingUnsafeLifecycleWarnings.get(strictRoot);}var unsafeLifecycles=[];if(typeof instance.componentWillMount==='function'&&instance.componentWillMount.__suppressDeprecationWarning!==true||typeof instance.UNSAFE_componentWillMount==='function'){unsafeLifecycles.push('UNSAFE_componentWillMount');}if(typeof instance.componentWillReceiveProps==='function'&&instance.componentWillReceiveProps.__suppressDeprecationWarning!==true||typeof instance.UNSAFE_componentWillReceiveProps==='function'){unsafeLifecycles.push('UNSAFE_componentWillReceiveProps');}if(typeof instance.componentWillUpdate==='function'&&instance.componentWillUpdate.__suppressDeprecationWarning!==true||typeof instance.UNSAFE_componentWillUpdate==='function'){unsafeLifecycles.push('UNSAFE_componentWillUpdate');}if(unsafeLifecycles.length>0){unsafeLifecycles.forEach(function(lifecycle){warningsForRoot[lifecycle].push(fiber);});}};ReactStrictModeWarnings.recordLegacyContextWarning=function(fiber,instance){var strictRoot=findStrictRoot(fiber);if(strictRoot===null){warning(false,'Expected to find a StrictMode component in a strict mode tree. '+'This error is likely caused by a bug in React. Please file an issue.');return;}// Dedup strategy: Warn once per component.
if(didWarnAboutLegacyContext.has(fiber.type)){return;}var warningsForRoot=pendingLegacyContextWarning.get(strictRoot);if(fiber.type.contextTypes!=null||fiber.type.childContextTypes!=null||instance!==null&&typeof instance.getChildContext==='function'){if(warningsForRoot===undefined){warningsForRoot=[];pendingLegacyContextWarning.set(strictRoot,warningsForRoot);}warningsForRoot.push(fiber);}};ReactStrictModeWarnings.flushLegacyContextWarning=function(){pendingLegacyContextWarning.forEach(function(fiberArray,strictRoot){var uniqueNames=new Set();fiberArray.forEach(function(fiber){uniqueNames.add(getComponentName(fiber)||'Component');didWarnAboutLegacyContext.add(fiber.type);});var sortedNames=setToSortedString(uniqueNames);var strictRootComponentStack=getStackAddendumByWorkInProgressFiber(strictRoot);warning(false,'Legacy context API has been detected within a strict-mode tree: %s'+'\n\nPlease update the following components: %s'+'\n\nLearn more about this warning here:'+'\nhttps://fb.me/react-strict-mode-warnings',strictRootComponentStack,sortedNames);});};}// This lets us hook into Fiber to debug what it's doing.
// See https://github.com/facebook/react/pull/8033.
// This is not part of the public API, not even for React DevTools.
// You may only inject a debugTool if you work on React Fiber itself.
var ReactFiberInstrumentation={debugTool:null};var ReactFiberInstrumentation_1=ReactFiberInstrumentation;// TODO: Offscreen updates
function markPendingPriorityLevel(root,expirationTime){if(enableSuspense){// Update the latest and earliest pending times
var earliestPendingTime=root.earliestPendingTime;if(earliestPendingTime===NoWork){// No other pending updates.
root.earliestPendingTime=root.latestPendingTime=expirationTime;}else{if(earliestPendingTime>expirationTime){// This is the earliest pending update.
root.earliestPendingTime=expirationTime;}else{var latestPendingTime=root.latestPendingTime;if(latestPendingTime<expirationTime){// This is the latest pending update
root.latestPendingTime=expirationTime;}}}}}function markCommittedPriorityLevels(root,currentTime,earliestRemainingTime){if(enableSuspense){if(earliestRemainingTime===NoWork){// Fast path. There's no remaining work. Clear everything.
root.earliestPendingTime=NoWork;root.latestPendingTime=NoWork;root.earliestSuspendedTime=NoWork;root.latestSuspendedTime=NoWork;root.latestPingedTime=NoWork;return;}// Let's see if the previous latest known pending level was just flushed.
var latestPendingTime=root.latestPendingTime;if(latestPendingTime!==NoWork){if(latestPendingTime<earliestRemainingTime){// We've flushed all the known pending levels.
root.earliestPendingTime=root.latestPendingTime=NoWork;}else{var earliestPendingTime=root.earliestPendingTime;if(earliestPendingTime<earliestRemainingTime){// We've flushed the earliest known pending level. Set this to the
// latest pending time.
root.earliestPendingTime=root.latestPendingTime;}}}// Now let's handle the earliest remaining level in the whole tree. We need to
// decide whether to treat it as a pending level or as suspended. Check
// it falls within the range of known suspended levels.
var earliestSuspendedTime=root.earliestSuspendedTime;if(earliestSuspendedTime===NoWork){// There's no suspended work. Treat the earliest remaining level as a
// pending level.
markPendingPriorityLevel(root,earliestRemainingTime);return;}var latestSuspendedTime=root.latestSuspendedTime;if(earliestRemainingTime>latestSuspendedTime){// The earliest remaining level is later than all the suspended work. That
// means we've flushed all the suspended work.
root.earliestSuspendedTime=NoWork;root.latestSuspendedTime=NoWork;root.latestPingedTime=NoWork;// There's no suspended work. Treat the earliest remaining level as a
// pending level.
markPendingPriorityLevel(root,earliestRemainingTime);return;}if(earliestRemainingTime<earliestSuspendedTime){// The earliest remaining time is earlier than all the suspended work.
// Treat it as a pending update.
markPendingPriorityLevel(root,earliestRemainingTime);return;}// The earliest remaining time falls within the range of known suspended
// levels. We should treat this as suspended work.
}}function markSuspendedPriorityLevel(root,suspendedTime){if(enableSuspense){// First, check the known pending levels and update them if needed.
var earliestPendingTime=root.earliestPendingTime;var latestPendingTime=root.latestPendingTime;if(earliestPendingTime===suspendedTime){if(latestPendingTime===suspendedTime){// Both known pending levels were suspended. Clear them.
root.earliestPendingTime=root.latestPendingTime=NoWork;}else{// The earliest pending level was suspended. Clear by setting it to the
// latest pending level.
root.earliestPendingTime=latestPendingTime;}}else if(latestPendingTime===suspendedTime){// The latest pending level was suspended. Clear by setting it to the
// latest pending level.
root.latestPendingTime=earliestPendingTime;}// Next, if we're working on the lowest known suspended level, clear the ping.
// TODO: What if a promise suspends and pings before the root completes?
var latestSuspendedTime=root.latestSuspendedTime;if(latestSuspendedTime===suspendedTime){root.latestPingedTime=NoWork;}// Finally, update the known suspended levels.
var earliestSuspendedTime=root.earliestSuspendedTime;if(earliestSuspendedTime===NoWork){// No other suspended levels.
root.earliestSuspendedTime=root.latestSuspendedTime=suspendedTime;}else{if(earliestSuspendedTime>suspendedTime){// This is the earliest suspended level.
root.earliestSuspendedTime=suspendedTime;}else if(latestSuspendedTime<suspendedTime){// This is the latest suspended level
root.latestSuspendedTime=suspendedTime;}}}}function markPingedPriorityLevel(root,pingedTime){if(enableSuspense){var latestSuspendedTime=root.latestSuspendedTime;if(latestSuspendedTime!==NoWork&&latestSuspendedTime<=pingedTime){var latestPingedTime=root.latestPingedTime;if(latestPingedTime===NoWork||latestPingedTime<pingedTime){root.latestPingedTime=pingedTime;}}}}function findNextPendingPriorityLevel(root){if(enableSuspense){var earliestSuspendedTime=root.earliestSuspendedTime;var earliestPendingTime=root.earliestPendingTime;if(earliestSuspendedTime===NoWork){// Fast path. There's no suspended work.
return earliestPendingTime;}// First, check if there's known pending work.
if(earliestPendingTime!==NoWork){return earliestPendingTime;}// Finally, if a suspended level was pinged, work on that. Otherwise there's
// nothing to work on.
return root.latestPingedTime;}else{return root.current.expirationTime;}}// UpdateQueue is a linked list of prioritized updates.
//
// Like fibers, update queues come in pairs: a current queue, which represents
// the visible state of the screen, and a work-in-progress queue, which is
// can be mutated and processed asynchronously before it is committed — a form
// of double buffering. If a work-in-progress render is discarded before
// finishing, we create a new work-in-progress by cloning the current queue.
//
// Both queues share a persistent, singly-linked list structure. To schedule an
// update, we append it to the end of both queues. Each queue maintains a
// pointer to first update in the persistent list that hasn't been processed.
// The work-in-progress pointer always has a position equal to or greater than
// the current queue, since we always work on that one. The current queue's
// pointer is only updated during the commit phase, when we swap in the
// work-in-progress.
//
// For example:
//
//   Current pointer:           A - B - C - D - E - F
//   Work-in-progress pointer:              D - E - F
//                                          ^
//                                          The work-in-progress queue has
//                                          processed more updates than current.
//
// The reason we append to both queues is because otherwise we might drop
// updates without ever processing them. For example, if we only add updates to
// the work-in-progress queue, some updates could be lost whenever a work-in
// -progress render restarts by cloning from current. Similarly, if we only add
// updates to the current queue, the updates will be lost whenever an already
// in-progress queue commits and swaps with the current queue. However, by
// adding to both queues, we guarantee that the update will be part of the next
// work-in-progress. (And because the work-in-progress queue becomes the
// current queue once it commits, there's no danger of applying the same
// update twice.)
//
// Prioritization
// --------------
//
// Updates are not sorted by priority, but by insertion; new updates are always
// appended to the end of the list.
//
// The priority is still important, though. When processing the update queue
// during the render phase, only the updates with sufficient priority are
// included in the result. If we skip an update because it has insufficient
// priority, it remains in the queue to be processed later, during a lower
// priority render. Crucially, all updates subsequent to a skipped update also
// remain in the queue *regardless of their priority*. That means high priority
// updates are sometimes processed twice, at two separate priorities. We also
// keep track of a base state, that represents the state before the first
// update in the queue is applied.
//
// For example:
//
//   Given a base state of '', and the following queue of updates
//
//     A1 - B2 - C1 - D2
//
//   where the number indicates the priority, and the update is applied to the
//   previous state by appending a letter, React will process these updates as
//   two separate renders, one per distinct priority level:
//
//   First render, at priority 1:
//     Base state: ''
//     Updates: [A1, C1]
//     Result state: 'AC'
//
//   Second render, at priority 2:
//     Base state: 'A'            <-  The base state does not include C1,
//                                    because B2 was skipped.
//     Updates: [B2, C1, D2]      <-  C1 was rebased on top of B2
//     Result state: 'ABCD'
//
// Because we process updates in insertion order, and rebase high priority
// updates when preceding updates are skipped, the final result is deterministic
// regardless of priority. Intermediate state may vary according to system
// resources, but the final state is always the same.
var UpdateState=0;var ReplaceState=1;var ForceUpdate=2;var CaptureUpdate=3;// Global state that is reset at the beginning of calling `processUpdateQueue`.
// It should only be read right after calling `processUpdateQueue`, via
// `checkHasForceUpdateAfterProcessing`.
var hasForceUpdate=false;var didWarnUpdateInsideUpdate=void 0;var currentlyProcessingQueue=void 0;var resetCurrentlyProcessingQueue=void 0;{didWarnUpdateInsideUpdate=false;currentlyProcessingQueue=null;resetCurrentlyProcessingQueue=function resetCurrentlyProcessingQueue(){currentlyProcessingQueue=null;};}function createUpdateQueue(baseState){var queue={expirationTime:NoWork,baseState:baseState,firstUpdate:null,lastUpdate:null,firstCapturedUpdate:null,lastCapturedUpdate:null,firstEffect:null,lastEffect:null,firstCapturedEffect:null,lastCapturedEffect:null};return queue;}function cloneUpdateQueue(currentQueue){var queue={expirationTime:currentQueue.expirationTime,baseState:currentQueue.baseState,firstUpdate:currentQueue.firstUpdate,lastUpdate:currentQueue.lastUpdate,// TODO: With resuming, if we bail out and resuse the child tree, we should
// keep these effects.
firstCapturedUpdate:null,lastCapturedUpdate:null,firstEffect:null,lastEffect:null,firstCapturedEffect:null,lastCapturedEffect:null};return queue;}function createUpdate(expirationTime){return{expirationTime:expirationTime,tag:UpdateState,payload:null,callback:null,next:null,nextEffect:null};}function appendUpdateToQueue(queue,update,expirationTime){// Append the update to the end of the list.
if(queue.lastUpdate===null){// Queue is empty
queue.firstUpdate=queue.lastUpdate=update;}else{queue.lastUpdate.next=update;queue.lastUpdate=update;}if(queue.expirationTime===NoWork||queue.expirationTime>expirationTime){// The incoming update has the earliest expiration of any update in the
// queue. Update the queue's expiration time.
queue.expirationTime=expirationTime;}}function enqueueUpdate(fiber,update,expirationTime){// Update queues are created lazily.
var alternate=fiber.alternate;var queue1=void 0;var queue2=void 0;if(alternate===null){// There's only one fiber.
queue1=fiber.updateQueue;queue2=null;if(queue1===null){queue1=fiber.updateQueue=createUpdateQueue(fiber.memoizedState);}}else{// There are two owners.
queue1=fiber.updateQueue;queue2=alternate.updateQueue;if(queue1===null){if(queue2===null){// Neither fiber has an update queue. Create new ones.
queue1=fiber.updateQueue=createUpdateQueue(fiber.memoizedState);queue2=alternate.updateQueue=createUpdateQueue(alternate.memoizedState);}else{// Only one fiber has an update queue. Clone to create a new one.
queue1=fiber.updateQueue=cloneUpdateQueue(queue2);}}else{if(queue2===null){// Only one fiber has an update queue. Clone to create a new one.
queue2=alternate.updateQueue=cloneUpdateQueue(queue1);}else{// Both owners have an update queue.
}}}if(queue2===null||queue1===queue2){// There's only a single queue.
appendUpdateToQueue(queue1,update,expirationTime);}else{// There are two queues. We need to append the update to both queues,
// while accounting for the persistent structure of the list — we don't
// want the same update to be added multiple times.
if(queue1.lastUpdate===null||queue2.lastUpdate===null){// One of the queues is not empty. We must add the update to both queues.
appendUpdateToQueue(queue1,update,expirationTime);appendUpdateToQueue(queue2,update,expirationTime);}else{// Both queues are non-empty. The last update is the same in both lists,
// because of structural sharing. So, only append to one of the lists.
appendUpdateToQueue(queue1,update,expirationTime);// But we still need to update the `lastUpdate` pointer of queue2.
queue2.lastUpdate=update;}}{if(fiber.tag===ClassComponent&&(currentlyProcessingQueue===queue1||queue2!==null&&currentlyProcessingQueue===queue2)&&!didWarnUpdateInsideUpdate){warning(false,'An update (setState, replaceState, or forceUpdate) was scheduled '+'from inside an update function. Update functions should be pure, '+'with zero side-effects. Consider using componentDidUpdate or a '+'callback.');didWarnUpdateInsideUpdate=true;}}}function enqueueCapturedUpdate(workInProgress,update,renderExpirationTime){// Captured updates go into a separate list, and only on the work-in-
// progress queue.
var workInProgressQueue=workInProgress.updateQueue;if(workInProgressQueue===null){workInProgressQueue=workInProgress.updateQueue=createUpdateQueue(workInProgress.memoizedState);}else{// TODO: I put this here rather than createWorkInProgress so that we don't
// clone the queue unnecessarily. There's probably a better way to
// structure this.
workInProgressQueue=ensureWorkInProgressQueueIsAClone(workInProgress,workInProgressQueue);}// Append the update to the end of the list.
if(workInProgressQueue.lastCapturedUpdate===null){// This is the first render phase update
workInProgressQueue.firstCapturedUpdate=workInProgressQueue.lastCapturedUpdate=update;}else{workInProgressQueue.lastCapturedUpdate.next=update;workInProgressQueue.lastCapturedUpdate=update;}if(workInProgressQueue.expirationTime===NoWork||workInProgressQueue.expirationTime>renderExpirationTime){// The incoming update has the earliest expiration of any update in the
// queue. Update the queue's expiration time.
workInProgressQueue.expirationTime=renderExpirationTime;}}function ensureWorkInProgressQueueIsAClone(workInProgress,queue){var current=workInProgress.alternate;if(current!==null){// If the work-in-progress queue is equal to the current queue,
// we need to clone it first.
if(queue===current.updateQueue){queue=workInProgress.updateQueue=cloneUpdateQueue(queue);}}return queue;}function getStateFromUpdate(workInProgress,queue,update,prevState,nextProps,instance){switch(update.tag){case ReplaceState:{var _payload=update.payload;if(typeof _payload==='function'){// Updater function
{if(debugRenderPhaseSideEffects||debugRenderPhaseSideEffectsForStrictMode&&workInProgress.mode&StrictMode){_payload.call(instance,prevState,nextProps);}}return _payload.call(instance,prevState,nextProps);}// State object
return _payload;}case CaptureUpdate:{workInProgress.effectTag=workInProgress.effectTag&~ShouldCapture|DidCapture;}// Intentional fallthrough
case UpdateState:{var _payload2=update.payload;var partialState=void 0;if(typeof _payload2==='function'){// Updater function
{if(debugRenderPhaseSideEffects||debugRenderPhaseSideEffectsForStrictMode&&workInProgress.mode&StrictMode){_payload2.call(instance,prevState,nextProps);}}partialState=_payload2.call(instance,prevState,nextProps);}else{// Partial state object
partialState=_payload2;}if(partialState===null||partialState===undefined){// Null and undefined are treated as no-ops.
return prevState;}// Merge the partial state and the previous state.
return _assign({},prevState,partialState);}case ForceUpdate:{hasForceUpdate=true;return prevState;}}return prevState;}function processUpdateQueue(workInProgress,queue,props,instance,renderExpirationTime){hasForceUpdate=false;if(queue.expirationTime===NoWork||queue.expirationTime>renderExpirationTime){// Insufficient priority. Bailout.
return;}queue=ensureWorkInProgressQueueIsAClone(workInProgress,queue);{currentlyProcessingQueue=queue;}// These values may change as we process the queue.
var newBaseState=queue.baseState;var newFirstUpdate=null;var newExpirationTime=NoWork;// Iterate through the list of updates to compute the result.
var update=queue.firstUpdate;var resultState=newBaseState;while(update!==null){var updateExpirationTime=update.expirationTime;if(updateExpirationTime>renderExpirationTime){// This update does not have sufficient priority. Skip it.
if(newFirstUpdate===null){// This is the first skipped update. It will be the first update in
// the new list.
newFirstUpdate=update;// Since this is the first update that was skipped, the current result
// is the new base state.
newBaseState=resultState;}// Since this update will remain in the list, update the remaining
// expiration time.
if(newExpirationTime===NoWork||newExpirationTime>updateExpirationTime){newExpirationTime=updateExpirationTime;}}else{// This update does have sufficient priority. Process it and compute
// a new result.
resultState=getStateFromUpdate(workInProgress,queue,update,resultState,props,instance);var _callback=update.callback;if(_callback!==null){workInProgress.effectTag|=Callback;// Set this to null, in case it was mutated during an aborted render.
update.nextEffect=null;if(queue.lastEffect===null){queue.firstEffect=queue.lastEffect=update;}else{queue.lastEffect.nextEffect=update;queue.lastEffect=update;}}}// Continue to the next update.
update=update.next;}// Separately, iterate though the list of captured updates.
var newFirstCapturedUpdate=null;update=queue.firstCapturedUpdate;while(update!==null){var _updateExpirationTime=update.expirationTime;if(_updateExpirationTime>renderExpirationTime){// This update does not have sufficient priority. Skip it.
if(newFirstCapturedUpdate===null){// This is the first skipped captured update. It will be the first
// update in the new list.
newFirstCapturedUpdate=update;// If this is the first update that was skipped, the current result is
// the new base state.
if(newFirstUpdate===null){newBaseState=resultState;}}// Since this update will remain in the list, update the remaining
// expiration time.
if(newExpirationTime===NoWork||newExpirationTime>_updateExpirationTime){newExpirationTime=_updateExpirationTime;}}else{// This update does have sufficient priority. Process it and compute
// a new result.
resultState=getStateFromUpdate(workInProgress,queue,update,resultState,props,instance);var _callback2=update.callback;if(_callback2!==null){workInProgress.effectTag|=Callback;// Set this to null, in case it was mutated during an aborted render.
update.nextEffect=null;if(queue.lastCapturedEffect===null){queue.firstCapturedEffect=queue.lastCapturedEffect=update;}else{queue.lastCapturedEffect.nextEffect=update;queue.lastCapturedEffect=update;}}}update=update.next;}if(newFirstUpdate===null){queue.lastUpdate=null;}if(newFirstCapturedUpdate===null){queue.lastCapturedUpdate=null;}else{workInProgress.effectTag|=Callback;}if(newFirstUpdate===null&&newFirstCapturedUpdate===null){// We processed every update, without skipping. That means the new base
// state is the same as the result state.
newBaseState=resultState;}queue.baseState=newBaseState;queue.firstUpdate=newFirstUpdate;queue.firstCapturedUpdate=newFirstCapturedUpdate;queue.expirationTime=newExpirationTime;workInProgress.memoizedState=resultState;{currentlyProcessingQueue=null;}}function callCallback(callback,context){!(typeof callback==='function')?invariant(false,'Invalid argument passed as callback. Expected a function. Instead received: %s',callback):void 0;callback.call(context);}function resetHasForceUpdateBeforeProcessing(){hasForceUpdate=false;}function checkHasForceUpdateAfterProcessing(){return hasForceUpdate;}function commitUpdateQueue(finishedWork,finishedQueue,instance,renderExpirationTime){// If the finished render included captured updates, and there are still
// lower priority updates left over, we need to keep the captured updates
// in the queue so that they are rebased and not dropped once we process the
// queue again at the lower priority.
if(finishedQueue.firstCapturedUpdate!==null){// Join the captured update list to the end of the normal list.
if(finishedQueue.lastUpdate!==null){finishedQueue.lastUpdate.next=finishedQueue.firstCapturedUpdate;finishedQueue.lastUpdate=finishedQueue.lastCapturedUpdate;}// Clear the list of captured updates.
finishedQueue.firstCapturedUpdate=finishedQueue.lastCapturedUpdate=null;}// Commit the effects
var effect=finishedQueue.firstEffect;finishedQueue.firstEffect=finishedQueue.lastEffect=null;while(effect!==null){var _callback3=effect.callback;if(_callback3!==null){effect.callback=null;callCallback(_callback3,instance);}effect=effect.nextEffect;}effect=finishedQueue.firstCapturedEffect;finishedQueue.firstCapturedEffect=finishedQueue.lastCapturedEffect=null;while(effect!==null){var _callback4=effect.callback;if(_callback4!==null){effect.callback=null;callCallback(_callback4,instance);}effect=effect.nextEffect;}}function createCapturedValue(value,source){// If the value is an error, call this function immediately after it is thrown
// so the stack is accurate.
return{value:value,source:source,stack:getStackAddendumByWorkInProgressFiber(source)};}var providerCursor=createCursor(null);var valueCursor=createCursor(null);var changedBitsCursor=createCursor(0);var rendererSigil=void 0;{// Use this to detect multiple renderers using the same context
rendererSigil={};}function pushProvider(providerFiber){var context=providerFiber.type._context;if(isPrimaryRenderer){push(changedBitsCursor,context._changedBits,providerFiber);push(valueCursor,context._currentValue,providerFiber);push(providerCursor,providerFiber,providerFiber);context._currentValue=providerFiber.pendingProps.value;context._changedBits=providerFiber.stateNode;{!(context._currentRenderer===undefined||context._currentRenderer===null||context._currentRenderer===rendererSigil)?warning(false,'Detected multiple renderers concurrently rendering the '+'same context provider. This is currently unsupported.'):void 0;context._currentRenderer=rendererSigil;}}else{push(changedBitsCursor,context._changedBits2,providerFiber);push(valueCursor,context._currentValue2,providerFiber);push(providerCursor,providerFiber,providerFiber);context._currentValue2=providerFiber.pendingProps.value;context._changedBits2=providerFiber.stateNode;{!(context._currentRenderer2===undefined||context._currentRenderer2===null||context._currentRenderer2===rendererSigil)?warning(false,'Detected multiple renderers concurrently rendering the '+'same context provider. This is currently unsupported.'):void 0;context._currentRenderer2=rendererSigil;}}}function popProvider(providerFiber){var changedBits=changedBitsCursor.current;var currentValue=valueCursor.current;pop(providerCursor,providerFiber);pop(valueCursor,providerFiber);pop(changedBitsCursor,providerFiber);var context=providerFiber.type._context;if(isPrimaryRenderer){context._currentValue=currentValue;context._changedBits=changedBits;}else{context._currentValue2=currentValue;context._changedBits2=changedBits;}}function getContextCurrentValue(context){return isPrimaryRenderer?context._currentValue:context._currentValue2;}function getContextChangedBits(context){return isPrimaryRenderer?context._changedBits:context._changedBits2;}var NO_CONTEXT={};var contextStackCursor$1=createCursor(NO_CONTEXT);var contextFiberStackCursor=createCursor(NO_CONTEXT);var rootInstanceStackCursor=createCursor(NO_CONTEXT);function requiredContext(c){!(c!==NO_CONTEXT)?invariant(false,'Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.'):void 0;return c;}function getRootHostContainer(){var rootInstance=requiredContext(rootInstanceStackCursor.current);return rootInstance;}function pushHostContainer(fiber,nextRootInstance){// Push current root instance onto the stack;
// This allows us to reset root when portals are popped.
push(rootInstanceStackCursor,nextRootInstance,fiber);// Track the context and the Fiber that provided it.
// This enables us to pop only Fibers that provide unique contexts.
push(contextFiberStackCursor,fiber,fiber);// Finally, we need to push the host context to the stack.
// However, we can't just call getRootHostContext() and push it because
// we'd have a different number of entries on the stack depending on
// whether getRootHostContext() throws somewhere in renderer code or not.
// So we push an empty value first. This lets us safely unwind on errors.
push(contextStackCursor$1,NO_CONTEXT,fiber);var nextRootContext=getRootHostContext(nextRootInstance);// Now that we know this function doesn't throw, replace it.
pop(contextStackCursor$1,fiber);push(contextStackCursor$1,nextRootContext,fiber);}function popHostContainer(fiber){pop(contextStackCursor$1,fiber);pop(contextFiberStackCursor,fiber);pop(rootInstanceStackCursor,fiber);}function getHostContext(){var context=requiredContext(contextStackCursor$1.current);return context;}function pushHostContext(fiber){var rootInstance=requiredContext(rootInstanceStackCursor.current);var context=requiredContext(contextStackCursor$1.current);var nextContext=getChildHostContext(context,fiber.type,rootInstance);// Don't push this Fiber's context unless it's unique.
if(context===nextContext){return;}// Track the context and the Fiber that provided it.
// This enables us to pop only Fibers that provide unique contexts.
push(contextFiberStackCursor,fiber,fiber);push(contextStackCursor$1,nextContext,fiber);}function popHostContext(fiber){// Do not pop unless this Fiber provided the current context.
// pushHostContext() only pushes Fibers that provide unique contexts.
if(contextFiberStackCursor.current!==fiber){return;}pop(contextStackCursor$1,fiber);pop(contextFiberStackCursor,fiber);}var commitTime=0;function getCommitTime(){return commitTime;}function recordCommitTime(){if(!enableProfilerTimer){return;}commitTime=now();}/**
 * The "actual" render time is total time required to render the descendants of a Profiler component.
 * This time is stored as a stack, since Profilers can be nested.
 * This time is started during the "begin" phase and stopped during the "complete" phase.
 * It is paused (and accumulated) in the event of an interruption or an aborted render.
 */var fiberStack$1=void 0;{fiberStack$1=[];}var timerPausedAt=0;var totalElapsedPauseTime=0;function checkActualRenderTimeStackEmpty(){if(!enableProfilerTimer){return;}{!(fiberStack$1.length===0)?warning(false,'Expected an empty stack. Something was not reset properly.'):void 0;}}function markActualRenderTimeStarted(fiber){if(!enableProfilerTimer){return;}{fiberStack$1.push(fiber);}var stateNode=fiber.stateNode;stateNode.elapsedPauseTimeAtStart=totalElapsedPauseTime;stateNode.startTime=now();}function pauseActualRenderTimerIfRunning(){if(!enableProfilerTimer){return;}if(timerPausedAt===0){timerPausedAt=now();}}function recordElapsedActualRenderTime(fiber){if(!enableProfilerTimer){return;}{!(fiber===fiberStack$1.pop())?warning(false,'Unexpected Fiber popped.'):void 0;}var stateNode=fiber.stateNode;stateNode.duration+=now()-(totalElapsedPauseTime-stateNode.elapsedPauseTimeAtStart)-stateNode.startTime;}function resetActualRenderTimer(){if(!enableProfilerTimer){return;}totalElapsedPauseTime=0;}function resumeActualRenderTimerIfPaused(){if(!enableProfilerTimer){return;}if(timerPausedAt>0){totalElapsedPauseTime+=now()-timerPausedAt;timerPausedAt=0;}}/**
 * The "base" render time is the duration of the “begin” phase of work for a particular fiber.
 * This time is measured and stored on each fiber.
 * The time for all sibling fibers are accumulated and stored on their parent during the "complete" phase.
 * If a fiber bails out (sCU false) then its "base" timer is cancelled and the fiber is not updated.
 */var baseStartTime=-1;function recordElapsedBaseRenderTimeIfRunning(fiber){if(!enableProfilerTimer){return;}if(baseStartTime!==-1){fiber.selfBaseTime=now()-baseStartTime;}}function startBaseRenderTimer(){if(!enableProfilerTimer){return;}{if(baseStartTime!==-1){warning(false,'Cannot start base timer that is already running. '+'This error is likely caused by a bug in React. '+'Please file an issue.');}}baseStartTime=now();}function stopBaseRenderTimerIfRunning(){if(!enableProfilerTimer){return;}baseStartTime=-1;}var fakeInternalInstance={};var isArray=Array.isArray;var didWarnAboutStateAssignmentForComponent=void 0;var didWarnAboutUninitializedState=void 0;var didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate=void 0;var didWarnAboutLegacyLifecyclesAndDerivedState=void 0;var didWarnAboutUndefinedDerivedState=void 0;var warnOnUndefinedDerivedState=void 0;var warnOnInvalidCallback$1=void 0;{didWarnAboutStateAssignmentForComponent=new Set();didWarnAboutUninitializedState=new Set();didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate=new Set();didWarnAboutLegacyLifecyclesAndDerivedState=new Set();didWarnAboutUndefinedDerivedState=new Set();var didWarnOnInvalidCallback=new Set();warnOnInvalidCallback$1=function warnOnInvalidCallback$1(callback,callerName){if(callback===null||typeof callback==='function'){return;}var key=callerName+'_'+callback;if(!didWarnOnInvalidCallback.has(key)){didWarnOnInvalidCallback.add(key);warning(false,'%s(...): Expected the last optional `callback` argument to be a '+'function. Instead received: %s.',callerName,callback);}};warnOnUndefinedDerivedState=function warnOnUndefinedDerivedState(workInProgress,partialState){if(partialState===undefined){var componentName=getComponentName(workInProgress)||'Component';if(!didWarnAboutUndefinedDerivedState.has(componentName)){didWarnAboutUndefinedDerivedState.add(componentName);warning(false,'%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. '+'You have returned undefined.',componentName);}}};// This is so gross but it's at least non-critical and can be removed if
// it causes problems. This is meant to give a nicer error message for
// ReactDOM15.unstable_renderSubtreeIntoContainer(reactDOM16Component,
// ...)) which otherwise throws a "_processChildContext is not a function"
// exception.
Object.defineProperty(fakeInternalInstance,'_processChildContext',{enumerable:false,value:function value(){invariant(false,'_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn\'t supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).');}});Object.freeze(fakeInternalInstance);}function applyDerivedStateFromProps(workInProgress,getDerivedStateFromProps,nextProps){var prevState=workInProgress.memoizedState;{if(debugRenderPhaseSideEffects||debugRenderPhaseSideEffectsForStrictMode&&workInProgress.mode&StrictMode){// Invoke the function an extra time to help detect side-effects.
getDerivedStateFromProps(nextProps,prevState);}}var partialState=getDerivedStateFromProps(nextProps,prevState);{warnOnUndefinedDerivedState(workInProgress,partialState);}// Merge the partial state and the previous state.
var memoizedState=partialState===null||partialState===undefined?prevState:_assign({},prevState,partialState);workInProgress.memoizedState=memoizedState;// Once the update queue is empty, persist the derived state onto the
// base state.
var updateQueue=workInProgress.updateQueue;if(updateQueue!==null&&updateQueue.expirationTime===NoWork){updateQueue.baseState=memoizedState;}}var classComponentUpdater={isMounted:isMounted,enqueueSetState:function enqueueSetState(inst,payload,callback){var fiber=get(inst);var currentTime=recalculateCurrentTime();var expirationTime=computeExpirationForFiber(currentTime,fiber);var update=createUpdate(expirationTime);update.payload=payload;if(callback!==undefined&&callback!==null){{warnOnInvalidCallback$1(callback,'setState');}update.callback=callback;}enqueueUpdate(fiber,update,expirationTime);scheduleWork$1(fiber,expirationTime);},enqueueReplaceState:function enqueueReplaceState(inst,payload,callback){var fiber=get(inst);var currentTime=recalculateCurrentTime();var expirationTime=computeExpirationForFiber(currentTime,fiber);var update=createUpdate(expirationTime);update.tag=ReplaceState;update.payload=payload;if(callback!==undefined&&callback!==null){{warnOnInvalidCallback$1(callback,'replaceState');}update.callback=callback;}enqueueUpdate(fiber,update,expirationTime);scheduleWork$1(fiber,expirationTime);},enqueueForceUpdate:function enqueueForceUpdate(inst,callback){var fiber=get(inst);var currentTime=recalculateCurrentTime();var expirationTime=computeExpirationForFiber(currentTime,fiber);var update=createUpdate(expirationTime);update.tag=ForceUpdate;if(callback!==undefined&&callback!==null){{warnOnInvalidCallback$1(callback,'forceUpdate');}update.callback=callback;}enqueueUpdate(fiber,update,expirationTime);scheduleWork$1(fiber,expirationTime);}};function checkShouldComponentUpdate(workInProgress,oldProps,newProps,oldState,newState,newContext){var instance=workInProgress.stateNode;var ctor=workInProgress.type;if(typeof instance.shouldComponentUpdate==='function'){startPhaseTimer(workInProgress,'shouldComponentUpdate');var shouldUpdate=instance.shouldComponentUpdate(newProps,newState,newContext);stopPhaseTimer();{!(shouldUpdate!==undefined)?warning(false,'%s.shouldComponentUpdate(): Returned undefined instead of a '+'boolean value. Make sure to return true or false.',getComponentName(workInProgress)||'Component'):void 0;}return shouldUpdate;}if(ctor.prototype&&ctor.prototype.isPureReactComponent){return!shallowEqual(oldProps,newProps)||!shallowEqual(oldState,newState);}return true;}function checkClassInstance(workInProgress){var instance=workInProgress.stateNode;var type=workInProgress.type;{var name=getComponentName(workInProgress)||'Component';var renderPresent=instance.render;if(!renderPresent){if(type.prototype&&typeof type.prototype.render==='function'){warning(false,'%s(...): No `render` method found on the returned component '+'instance: did you accidentally return an object from the constructor?',name);}else{warning(false,'%s(...): No `render` method found on the returned component '+'instance: you may have forgotten to define `render`.',name);}}var noGetInitialStateOnES6=!instance.getInitialState||instance.getInitialState.isReactClassApproved||instance.state;!noGetInitialStateOnES6?warning(false,'getInitialState was defined on %s, a plain JavaScript class. '+'This is only supported for classes created using React.createClass. '+'Did you mean to define a state property instead?',name):void 0;var noGetDefaultPropsOnES6=!instance.getDefaultProps||instance.getDefaultProps.isReactClassApproved;!noGetDefaultPropsOnES6?warning(false,'getDefaultProps was defined on %s, a plain JavaScript class. '+'This is only supported for classes created using React.createClass. '+'Use a static property to define defaultProps instead.',name):void 0;var noInstancePropTypes=!instance.propTypes;!noInstancePropTypes?warning(false,'propTypes was defined as an instance property on %s. Use a static '+'property to define propTypes instead.',name):void 0;var noInstanceContextTypes=!instance.contextTypes;!noInstanceContextTypes?warning(false,'contextTypes was defined as an instance property on %s. Use a static '+'property to define contextTypes instead.',name):void 0;var noComponentShouldUpdate=typeof instance.componentShouldUpdate!=='function';!noComponentShouldUpdate?warning(false,'%s has a method called '+'componentShouldUpdate(). Did you mean shouldComponentUpdate()? '+'The name is phrased as a question because the function is '+'expected to return a value.',name):void 0;if(type.prototype&&type.prototype.isPureReactComponent&&typeof instance.shouldComponentUpdate!=='undefined'){warning(false,'%s has a method called shouldComponentUpdate(). '+'shouldComponentUpdate should not be used when extending React.PureComponent. '+'Please extend React.Component if shouldComponentUpdate is used.',getComponentName(workInProgress)||'A pure component');}var noComponentDidUnmount=typeof instance.componentDidUnmount!=='function';!noComponentDidUnmount?warning(false,'%s has a method called '+'componentDidUnmount(). But there is no such lifecycle method. '+'Did you mean componentWillUnmount()?',name):void 0;var noComponentDidReceiveProps=typeof instance.componentDidReceiveProps!=='function';!noComponentDidReceiveProps?warning(false,'%s has a method called '+'componentDidReceiveProps(). But there is no such lifecycle method. '+'If you meant to update the state in response to changing props, '+'use componentWillReceiveProps(). If you meant to fetch data or '+'run side-effects or mutations after React has updated the UI, use componentDidUpdate().',name):void 0;var noComponentWillRecieveProps=typeof instance.componentWillRecieveProps!=='function';!noComponentWillRecieveProps?warning(false,'%s has a method called '+'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?',name):void 0;var noUnsafeComponentWillRecieveProps=typeof instance.UNSAFE_componentWillRecieveProps!=='function';!noUnsafeComponentWillRecieveProps?warning(false,'%s has a method called '+'UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?',name):void 0;var hasMutatedProps=instance.props!==workInProgress.pendingProps;!(instance.props===undefined||!hasMutatedProps)?warning(false,'%s(...): When calling super() in `%s`, make sure to pass '+"up the same props that your component's constructor was passed.",name,name):void 0;var noInstanceDefaultProps=!instance.defaultProps;!noInstanceDefaultProps?warning(false,'Setting defaultProps as an instance property on %s is not supported and will be ignored.'+' Instead, define defaultProps as a static property on %s.',name,name):void 0;if(typeof instance.getSnapshotBeforeUpdate==='function'&&typeof instance.componentDidUpdate!=='function'&&!didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.has(type)){didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.add(type);warning(false,'%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). '+'This component defines getSnapshotBeforeUpdate() only.',getComponentName(workInProgress));}var noInstanceGetDerivedStateFromProps=typeof instance.getDerivedStateFromProps!=='function';!noInstanceGetDerivedStateFromProps?warning(false,'%s: getDerivedStateFromProps() is defined as an instance method '+'and will be ignored. Instead, declare it as a static method.',name):void 0;var noInstanceGetDerivedStateFromCatch=typeof instance.getDerivedStateFromCatch!=='function';!noInstanceGetDerivedStateFromCatch?warning(false,'%s: getDerivedStateFromCatch() is defined as an instance method '+'and will be ignored. Instead, declare it as a static method.',name):void 0;var noStaticGetSnapshotBeforeUpdate=typeof type.getSnapshotBeforeUpdate!=='function';!noStaticGetSnapshotBeforeUpdate?warning(false,'%s: getSnapshotBeforeUpdate() is defined as a static method '+'and will be ignored. Instead, declare it as an instance method.',name):void 0;var _state=instance.state;if(_state&&((typeof _state==='undefined'?'undefined':_typeof(_state))!=='object'||isArray(_state))){warning(false,'%s.state: must be set to an object or null',name);}if(typeof instance.getChildContext==='function'){!(_typeof(type.childContextTypes)==='object')?warning(false,'%s.getChildContext(): childContextTypes must be defined in order to '+'use getChildContext().',name):void 0;}}}function adoptClassInstance(workInProgress,instance){instance.updater=classComponentUpdater;workInProgress.stateNode=instance;// The instance needs access to the fiber so that it can schedule updates
set(instance,workInProgress);{instance._reactInternalInstance=fakeInternalInstance;}}function constructClassInstance(workInProgress,props,renderExpirationTime){var ctor=workInProgress.type;var unmaskedContext=getUnmaskedContext(workInProgress);var needsContext=isContextConsumer(workInProgress);var context=needsContext?getMaskedContext(workInProgress,unmaskedContext):emptyObject;// Instantiate twice to help detect side-effects.
{if(debugRenderPhaseSideEffects||debugRenderPhaseSideEffectsForStrictMode&&workInProgress.mode&StrictMode){new ctor(props,context);// eslint-disable-line no-new
}}var instance=new ctor(props,context);var state=workInProgress.memoizedState=instance.state!==null&&instance.state!==undefined?instance.state:null;adoptClassInstance(workInProgress,instance);{if(typeof ctor.getDerivedStateFromProps==='function'&&state===null){var componentName=getComponentName(workInProgress)||'Component';if(!didWarnAboutUninitializedState.has(componentName)){didWarnAboutUninitializedState.add(componentName);warning(false,'%s: Did not properly initialize state during construction. '+'Expected state to be an object, but it was %s.',componentName,instance.state===null?'null':'undefined');}}// If new component APIs are defined, "unsafe" lifecycles won't be called.
// Warn about these lifecycles if they are present.
// Don't warn about react-lifecycles-compat polyfilled methods though.
if(typeof ctor.getDerivedStateFromProps==='function'||typeof instance.getSnapshotBeforeUpdate==='function'){var foundWillMountName=null;var foundWillReceivePropsName=null;var foundWillUpdateName=null;if(typeof instance.componentWillMount==='function'&&instance.componentWillMount.__suppressDeprecationWarning!==true){foundWillMountName='componentWillMount';}else if(typeof instance.UNSAFE_componentWillMount==='function'){foundWillMountName='UNSAFE_componentWillMount';}if(typeof instance.componentWillReceiveProps==='function'&&instance.componentWillReceiveProps.__suppressDeprecationWarning!==true){foundWillReceivePropsName='componentWillReceiveProps';}else if(typeof instance.UNSAFE_componentWillReceiveProps==='function'){foundWillReceivePropsName='UNSAFE_componentWillReceiveProps';}if(typeof instance.componentWillUpdate==='function'&&instance.componentWillUpdate.__suppressDeprecationWarning!==true){foundWillUpdateName='componentWillUpdate';}else if(typeof instance.UNSAFE_componentWillUpdate==='function'){foundWillUpdateName='UNSAFE_componentWillUpdate';}if(foundWillMountName!==null||foundWillReceivePropsName!==null||foundWillUpdateName!==null){var _componentName=getComponentName(workInProgress)||'Component';var newApiName=typeof ctor.getDerivedStateFromProps==='function'?'getDerivedStateFromProps()':'getSnapshotBeforeUpdate()';if(!didWarnAboutLegacyLifecyclesAndDerivedState.has(_componentName)){didWarnAboutLegacyLifecyclesAndDerivedState.add(_componentName);warning(false,'Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n'+'%s uses %s but also contains the following legacy lifecycles:%s%s%s\n\n'+'The above lifecycles should be removed. Learn more about this warning here:\n'+'https://fb.me/react-async-component-lifecycle-hooks',_componentName,newApiName,foundWillMountName!==null?'\n  '+foundWillMountName:'',foundWillReceivePropsName!==null?'\n  '+foundWillReceivePropsName:'',foundWillUpdateName!==null?'\n  '+foundWillUpdateName:'');}}}}// Cache unmasked context so we can avoid recreating masked context unless necessary.
// ReactFiberContext usually updates this cache but can't for newly-created instances.
if(needsContext){cacheContext(workInProgress,unmaskedContext,context);}return instance;}function callComponentWillMount(workInProgress,instance){startPhaseTimer(workInProgress,'componentWillMount');var oldState=instance.state;if(typeof instance.componentWillMount==='function'){instance.componentWillMount();}if(typeof instance.UNSAFE_componentWillMount==='function'){instance.UNSAFE_componentWillMount();}stopPhaseTimer();if(oldState!==instance.state){{warning(false,'%s.componentWillMount(): Assigning directly to this.state is '+"deprecated (except inside a component's "+'constructor). Use setState instead.',getComponentName(workInProgress)||'Component');}classComponentUpdater.enqueueReplaceState(instance,instance.state,null);}}function callComponentWillReceiveProps(workInProgress,instance,newProps,newContext){var oldState=instance.state;startPhaseTimer(workInProgress,'componentWillReceiveProps');if(typeof instance.componentWillReceiveProps==='function'){instance.componentWillReceiveProps(newProps,newContext);}if(typeof instance.UNSAFE_componentWillReceiveProps==='function'){instance.UNSAFE_componentWillReceiveProps(newProps,newContext);}stopPhaseTimer();if(instance.state!==oldState){{var componentName=getComponentName(workInProgress)||'Component';if(!didWarnAboutStateAssignmentForComponent.has(componentName)){didWarnAboutStateAssignmentForComponent.add(componentName);warning(false,'%s.componentWillReceiveProps(): Assigning directly to '+"this.state is deprecated (except inside a component's "+'constructor). Use setState instead.',componentName);}}classComponentUpdater.enqueueReplaceState(instance,instance.state,null);}}// Invokes the mount life-cycles on a previously never rendered instance.
function mountClassInstance(workInProgress,renderExpirationTime){var ctor=workInProgress.type;{checkClassInstance(workInProgress);}var instance=workInProgress.stateNode;var props=workInProgress.pendingProps;var unmaskedContext=getUnmaskedContext(workInProgress);instance.props=props;instance.state=workInProgress.memoizedState;instance.refs=emptyObject;instance.context=getMaskedContext(workInProgress,unmaskedContext);{if(workInProgress.mode&StrictMode){ReactStrictModeWarnings.recordUnsafeLifecycleWarnings(workInProgress,instance);ReactStrictModeWarnings.recordLegacyContextWarning(workInProgress,instance);}if(warnAboutDeprecatedLifecycles){ReactStrictModeWarnings.recordDeprecationWarnings(workInProgress,instance);}}var updateQueue=workInProgress.updateQueue;if(updateQueue!==null){processUpdateQueue(workInProgress,updateQueue,props,instance,renderExpirationTime);instance.state=workInProgress.memoizedState;}var getDerivedStateFromProps=workInProgress.type.getDerivedStateFromProps;if(typeof getDerivedStateFromProps==='function'){applyDerivedStateFromProps(workInProgress,getDerivedStateFromProps,props);instance.state=workInProgress.memoizedState;}// In order to support react-lifecycles-compat polyfilled components,
// Unsafe lifecycles should not be invoked for components using the new APIs.
if(typeof ctor.getDerivedStateFromProps!=='function'&&typeof instance.getSnapshotBeforeUpdate!=='function'&&(typeof instance.UNSAFE_componentWillMount==='function'||typeof instance.componentWillMount==='function')){callComponentWillMount(workInProgress,instance);// If we had additional state updates during this life-cycle, let's
// process them now.
updateQueue=workInProgress.updateQueue;if(updateQueue!==null){processUpdateQueue(workInProgress,updateQueue,props,instance,renderExpirationTime);instance.state=workInProgress.memoizedState;}}if(typeof instance.componentDidMount==='function'){workInProgress.effectTag|=Update;}}function resumeMountClassInstance(workInProgress,renderExpirationTime){var ctor=workInProgress.type;var instance=workInProgress.stateNode;var oldProps=workInProgress.memoizedProps;var newProps=workInProgress.pendingProps;instance.props=oldProps;var oldContext=instance.context;var newUnmaskedContext=getUnmaskedContext(workInProgress);var newContext=getMaskedContext(workInProgress,newUnmaskedContext);var getDerivedStateFromProps=ctor.getDerivedStateFromProps;var hasNewLifecycles=typeof getDerivedStateFromProps==='function'||typeof instance.getSnapshotBeforeUpdate==='function';// Note: During these life-cycles, instance.props/instance.state are what
// ever the previously attempted to render - not the "current". However,
// during componentDidUpdate we pass the "current" props.
// In order to support react-lifecycles-compat polyfilled components,
// Unsafe lifecycles should not be invoked for components using the new APIs.
if(!hasNewLifecycles&&(typeof instance.UNSAFE_componentWillReceiveProps==='function'||typeof instance.componentWillReceiveProps==='function')){if(oldProps!==newProps||oldContext!==newContext){callComponentWillReceiveProps(workInProgress,instance,newProps,newContext);}}resetHasForceUpdateBeforeProcessing();var oldState=workInProgress.memoizedState;var newState=instance.state=oldState;var updateQueue=workInProgress.updateQueue;if(updateQueue!==null){processUpdateQueue(workInProgress,updateQueue,newProps,instance,renderExpirationTime);newState=workInProgress.memoizedState;}if(oldProps===newProps&&oldState===newState&&!hasContextChanged()&&!checkHasForceUpdateAfterProcessing()){// If an update was already in progress, we should schedule an Update
// effect even though we're bailing out, so that cWU/cDU are called.
if(typeof instance.componentDidMount==='function'){workInProgress.effectTag|=Update;}return false;}if(typeof getDerivedStateFromProps==='function'){applyDerivedStateFromProps(workInProgress,getDerivedStateFromProps,newProps);newState=workInProgress.memoizedState;}var shouldUpdate=checkHasForceUpdateAfterProcessing()||checkShouldComponentUpdate(workInProgress,oldProps,newProps,oldState,newState,newContext);if(shouldUpdate){// In order to support react-lifecycles-compat polyfilled components,
// Unsafe lifecycles should not be invoked for components using the new APIs.
if(!hasNewLifecycles&&(typeof instance.UNSAFE_componentWillMount==='function'||typeof instance.componentWillMount==='function')){startPhaseTimer(workInProgress,'componentWillMount');if(typeof instance.componentWillMount==='function'){instance.componentWillMount();}if(typeof instance.UNSAFE_componentWillMount==='function'){instance.UNSAFE_componentWillMount();}stopPhaseTimer();}if(typeof instance.componentDidMount==='function'){workInProgress.effectTag|=Update;}}else{// If an update was already in progress, we should schedule an Update
// effect even though we're bailing out, so that cWU/cDU are called.
if(typeof instance.componentDidMount==='function'){workInProgress.effectTag|=Update;}// If shouldComponentUpdate returned false, we should still update the
// memoized state to indicate that this work can be reused.
workInProgress.memoizedProps=newProps;workInProgress.memoizedState=newState;}// Update the existing instance's state, props, and context pointers even
// if shouldComponentUpdate returns false.
instance.props=newProps;instance.state=newState;instance.context=newContext;return shouldUpdate;}// Invokes the update life-cycles and returns false if it shouldn't rerender.
function updateClassInstance(current,workInProgress,renderExpirationTime){var ctor=workInProgress.type;var instance=workInProgress.stateNode;var oldProps=workInProgress.memoizedProps;var newProps=workInProgress.pendingProps;instance.props=oldProps;var oldContext=instance.context;var newUnmaskedContext=getUnmaskedContext(workInProgress);var newContext=getMaskedContext(workInProgress,newUnmaskedContext);var getDerivedStateFromProps=ctor.getDerivedStateFromProps;var hasNewLifecycles=typeof getDerivedStateFromProps==='function'||typeof instance.getSnapshotBeforeUpdate==='function';// Note: During these life-cycles, instance.props/instance.state are what
// ever the previously attempted to render - not the "current". However,
// during componentDidUpdate we pass the "current" props.
// In order to support react-lifecycles-compat polyfilled components,
// Unsafe lifecycles should not be invoked for components using the new APIs.
if(!hasNewLifecycles&&(typeof instance.UNSAFE_componentWillReceiveProps==='function'||typeof instance.componentWillReceiveProps==='function')){if(oldProps!==newProps||oldContext!==newContext){callComponentWillReceiveProps(workInProgress,instance,newProps,newContext);}}resetHasForceUpdateBeforeProcessing();var oldState=workInProgress.memoizedState;var newState=instance.state=oldState;var updateQueue=workInProgress.updateQueue;if(updateQueue!==null){processUpdateQueue(workInProgress,updateQueue,newProps,instance,renderExpirationTime);newState=workInProgress.memoizedState;}if(oldProps===newProps&&oldState===newState&&!hasContextChanged()&&!checkHasForceUpdateAfterProcessing()){// If an update was already in progress, we should schedule an Update
// effect even though we're bailing out, so that cWU/cDU are called.
if(typeof instance.componentDidUpdate==='function'){if(oldProps!==current.memoizedProps||oldState!==current.memoizedState){workInProgress.effectTag|=Update;}}if(typeof instance.getSnapshotBeforeUpdate==='function'){if(oldProps!==current.memoizedProps||oldState!==current.memoizedState){workInProgress.effectTag|=Snapshot;}}return false;}if(typeof getDerivedStateFromProps==='function'){if(fireGetDerivedStateFromPropsOnStateUpdates||oldProps!==newProps){applyDerivedStateFromProps(workInProgress,getDerivedStateFromProps,newProps);newState=workInProgress.memoizedState;}}var shouldUpdate=checkHasForceUpdateAfterProcessing()||checkShouldComponentUpdate(workInProgress,oldProps,newProps,oldState,newState,newContext);if(shouldUpdate){// In order to support react-lifecycles-compat polyfilled components,
// Unsafe lifecycles should not be invoked for components using the new APIs.
if(!hasNewLifecycles&&(typeof instance.UNSAFE_componentWillUpdate==='function'||typeof instance.componentWillUpdate==='function')){startPhaseTimer(workInProgress,'componentWillUpdate');if(typeof instance.componentWillUpdate==='function'){instance.componentWillUpdate(newProps,newState,newContext);}if(typeof instance.UNSAFE_componentWillUpdate==='function'){instance.UNSAFE_componentWillUpdate(newProps,newState,newContext);}stopPhaseTimer();}if(typeof instance.componentDidUpdate==='function'){workInProgress.effectTag|=Update;}if(typeof instance.getSnapshotBeforeUpdate==='function'){workInProgress.effectTag|=Snapshot;}}else{// If an update was already in progress, we should schedule an Update
// effect even though we're bailing out, so that cWU/cDU are called.
if(typeof instance.componentDidUpdate==='function'){if(oldProps!==current.memoizedProps||oldState!==current.memoizedState){workInProgress.effectTag|=Update;}}if(typeof instance.getSnapshotBeforeUpdate==='function'){if(oldProps!==current.memoizedProps||oldState!==current.memoizedState){workInProgress.effectTag|=Snapshot;}}// If shouldComponentUpdate returned false, we should still update the
// memoized props/state to indicate that this work can be reused.
workInProgress.memoizedProps=newProps;workInProgress.memoizedState=newState;}// Update the existing instance's state, props, and context pointers even
// if shouldComponentUpdate returns false.
instance.props=newProps;instance.state=newState;instance.context=newContext;return shouldUpdate;}var getCurrentFiberStackAddendum$7=ReactDebugCurrentFiber.getCurrentFiberStackAddendum;var didWarnAboutMaps=void 0;var didWarnAboutStringRefInStrictMode=void 0;var ownerHasKeyUseWarning=void 0;var ownerHasFunctionTypeWarning=void 0;var warnForMissingKey=function warnForMissingKey(child){};{didWarnAboutMaps=false;didWarnAboutStringRefInStrictMode={};/**
   * Warn if there's no key explicitly set on dynamic arrays of children or
   * object keys are not valid. This allows us to keep track of children between
   * updates.
   */ownerHasKeyUseWarning={};ownerHasFunctionTypeWarning={};warnForMissingKey=function warnForMissingKey(child){if(child===null||(typeof child==='undefined'?'undefined':_typeof(child))!=='object'){return;}if(!child._store||child._store.validated||child.key!=null){return;}!(_typeof(child._store)==='object')?invariant(false,'React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.'):void 0;child._store.validated=true;var currentComponentErrorInfo='Each child in an array or iterator should have a unique '+'"key" prop. See https://fb.me/react-warning-keys for '+'more information.'+(getCurrentFiberStackAddendum$7()||'');if(ownerHasKeyUseWarning[currentComponentErrorInfo]){return;}ownerHasKeyUseWarning[currentComponentErrorInfo]=true;warning(false,'Each child in an array or iterator should have a unique '+'"key" prop. See https://fb.me/react-warning-keys for '+'more information.%s',getCurrentFiberStackAddendum$7());};}var isArray$1=Array.isArray;function coerceRef(returnFiber,current,element){var mixedRef=element.ref;if(mixedRef!==null&&typeof mixedRef!=='function'&&(typeof mixedRef==='undefined'?'undefined':_typeof(mixedRef))!=='object'){{if(returnFiber.mode&StrictMode){var componentName=getComponentName(returnFiber)||'Component';if(!didWarnAboutStringRefInStrictMode[componentName]){warning(false,'A string ref, "%s", has been found within a strict mode tree. '+'String refs are a source of potential bugs and should be avoided. '+'We recommend using createRef() instead.'+'\n%s'+'\n\nLearn more about using refs safely here:'+'\nhttps://fb.me/react-strict-mode-string-ref',mixedRef,getStackAddendumByWorkInProgressFiber(returnFiber));didWarnAboutStringRefInStrictMode[componentName]=true;}}}if(element._owner){var owner=element._owner;var inst=void 0;if(owner){var ownerFiber=owner;!(ownerFiber.tag===ClassComponent)?invariant(false,'Stateless function components cannot have refs.'):void 0;inst=ownerFiber.stateNode;}!inst?invariant(false,'Missing owner for string ref %s. This error is likely caused by a bug in React. Please file an issue.',mixedRef):void 0;var stringRef=''+mixedRef;// Check if previous string ref matches new string ref
if(current!==null&&current.ref!==null&&typeof current.ref==='function'&&current.ref._stringRef===stringRef){return current.ref;}var ref=function ref(value){var refs=inst.refs===emptyObject?inst.refs={}:inst.refs;if(value===null){delete refs[stringRef];}else{refs[stringRef]=value;}};ref._stringRef=stringRef;return ref;}else{!(typeof mixedRef==='string')?invariant(false,'Expected ref to be a function or a string.'):void 0;!element._owner?invariant(false,'Element ref was specified as a string (%s) but no owner was set. This could happen for one of the following reasons:\n1. You may be adding a ref to a functional component\n2. You may be adding a ref to a component that was not created inside a component\'s render method\n3. You have multiple copies of React loaded\nSee https://fb.me/react-refs-must-have-owner for more information.',mixedRef):void 0;}}return mixedRef;}function throwOnInvalidObjectType(returnFiber,newChild){if(returnFiber.type!=='textarea'){var addendum='';{addendum=' If you meant to render a collection of children, use an array '+'instead.'+(getCurrentFiberStackAddendum$7()||'');}invariant(false,'Objects are not valid as a React child (found: %s).%s',Object.prototype.toString.call(newChild)==='[object Object]'?'object with keys {'+Object.keys(newChild).join(', ')+'}':newChild,addendum);}}function warnOnFunctionType(){var currentComponentErrorInfo='Functions are not valid as a React child. This may happen if '+'you return a Component instead of <Component /> from render. '+'Or maybe you meant to call this function rather than return it.'+(getCurrentFiberStackAddendum$7()||'');if(ownerHasFunctionTypeWarning[currentComponentErrorInfo]){return;}ownerHasFunctionTypeWarning[currentComponentErrorInfo]=true;warning(false,'Functions are not valid as a React child. This may happen if '+'you return a Component instead of <Component /> from render. '+'Or maybe you meant to call this function rather than return it.%s',getCurrentFiberStackAddendum$7()||'');}// This wrapper function exists because I expect to clone the code in each path
// to be able to optimize each path individually by branching early. This needs
// a compiler or we can do it manually. Helpers that don't need this branching
// live outside of this function.
function ChildReconciler(shouldTrackSideEffects){function deleteChild(returnFiber,childToDelete){if(!shouldTrackSideEffects){// Noop.
return;}// Deletions are added in reversed order so we add it to the front.
// At this point, the return fiber's effect list is empty except for
// deletions, so we can just append the deletion to the list. The remaining
// effects aren't added until the complete phase. Once we implement
// resuming, this may not be true.
var last=returnFiber.lastEffect;if(last!==null){last.nextEffect=childToDelete;returnFiber.lastEffect=childToDelete;}else{returnFiber.firstEffect=returnFiber.lastEffect=childToDelete;}childToDelete.nextEffect=null;childToDelete.effectTag=Deletion;}function deleteRemainingChildren(returnFiber,currentFirstChild){if(!shouldTrackSideEffects){// Noop.
return null;}// TODO: For the shouldClone case, this could be micro-optimized a bit by
// assuming that after the first child we've already added everything.
var childToDelete=currentFirstChild;while(childToDelete!==null){deleteChild(returnFiber,childToDelete);childToDelete=childToDelete.sibling;}return null;}function mapRemainingChildren(returnFiber,currentFirstChild){// Add the remaining children to a temporary map so that we can find them by
// keys quickly. Implicit (null) keys get added to this set with their index
var existingChildren=new Map();var existingChild=currentFirstChild;while(existingChild!==null){if(existingChild.key!==null){existingChildren.set(existingChild.key,existingChild);}else{existingChildren.set(existingChild.index,existingChild);}existingChild=existingChild.sibling;}return existingChildren;}function useFiber(fiber,pendingProps,expirationTime){// We currently set sibling to null and index to 0 here because it is easy
// to forget to do before returning it. E.g. for the single child case.
var clone=createWorkInProgress(fiber,pendingProps,expirationTime);clone.index=0;clone.sibling=null;return clone;}function placeChild(newFiber,lastPlacedIndex,newIndex){newFiber.index=newIndex;if(!shouldTrackSideEffects){// Noop.
return lastPlacedIndex;}var current=newFiber.alternate;if(current!==null){var oldIndex=current.index;if(oldIndex<lastPlacedIndex){// This is a move.
newFiber.effectTag=Placement;return lastPlacedIndex;}else{// This item can stay in place.
return oldIndex;}}else{// This is an insertion.
newFiber.effectTag=Placement;return lastPlacedIndex;}}function placeSingleChild(newFiber){// This is simpler for the single child case. We only need to do a
// placement for inserting new children.
if(shouldTrackSideEffects&&newFiber.alternate===null){newFiber.effectTag=Placement;}return newFiber;}function updateTextNode(returnFiber,current,textContent,expirationTime){if(current===null||current.tag!==HostText){// Insert
var created=createFiberFromText(textContent,returnFiber.mode,expirationTime);created.return=returnFiber;return created;}else{// Update
var existing=useFiber(current,textContent,expirationTime);existing.return=returnFiber;return existing;}}function updateElement(returnFiber,current,element,expirationTime){if(current!==null&&current.type===element.type){// Move based on index
var existing=useFiber(current,element.props,expirationTime);existing.ref=coerceRef(returnFiber,current,element);existing.return=returnFiber;{existing._debugSource=element._source;existing._debugOwner=element._owner;}return existing;}else{// Insert
var created=createFiberFromElement(element,returnFiber.mode,expirationTime);created.ref=coerceRef(returnFiber,current,element);created.return=returnFiber;return created;}}function updatePortal(returnFiber,current,portal,expirationTime){if(current===null||current.tag!==HostPortal||current.stateNode.containerInfo!==portal.containerInfo||current.stateNode.implementation!==portal.implementation){// Insert
var created=createFiberFromPortal(portal,returnFiber.mode,expirationTime);created.return=returnFiber;return created;}else{// Update
var existing=useFiber(current,portal.children||[],expirationTime);existing.return=returnFiber;return existing;}}function updateFragment(returnFiber,current,fragment,expirationTime,key){if(current===null||current.tag!==Fragment){// Insert
var created=createFiberFromFragment(fragment,returnFiber.mode,expirationTime,key);created.return=returnFiber;return created;}else{// Update
var existing=useFiber(current,fragment,expirationTime);existing.return=returnFiber;return existing;}}function createChild(returnFiber,newChild,expirationTime){if(typeof newChild==='string'||typeof newChild==='number'){// Text nodes don't have keys. If the previous node is implicitly keyed
// we can continue to replace it without aborting even if it is not a text
// node.
var created=createFiberFromText(''+newChild,returnFiber.mode,expirationTime);created.return=returnFiber;return created;}if((typeof newChild==='undefined'?'undefined':_typeof(newChild))==='object'&&newChild!==null){switch(newChild.$$typeof){case REACT_ELEMENT_TYPE:{var _created=createFiberFromElement(newChild,returnFiber.mode,expirationTime);_created.ref=coerceRef(returnFiber,null,newChild);_created.return=returnFiber;return _created;}case REACT_PORTAL_TYPE:{var _created2=createFiberFromPortal(newChild,returnFiber.mode,expirationTime);_created2.return=returnFiber;return _created2;}}if(isArray$1(newChild)||getIteratorFn(newChild)){var _created3=createFiberFromFragment(newChild,returnFiber.mode,expirationTime,null);_created3.return=returnFiber;return _created3;}throwOnInvalidObjectType(returnFiber,newChild);}{if(typeof newChild==='function'){warnOnFunctionType();}}return null;}function updateSlot(returnFiber,oldFiber,newChild,expirationTime){// Update the fiber if the keys match, otherwise return null.
var key=oldFiber!==null?oldFiber.key:null;if(typeof newChild==='string'||typeof newChild==='number'){// Text nodes don't have keys. If the previous node is implicitly keyed
// we can continue to replace it without aborting even if it is not a text
// node.
if(key!==null){return null;}return updateTextNode(returnFiber,oldFiber,''+newChild,expirationTime);}if((typeof newChild==='undefined'?'undefined':_typeof(newChild))==='object'&&newChild!==null){switch(newChild.$$typeof){case REACT_ELEMENT_TYPE:{if(newChild.key===key){if(newChild.type===REACT_FRAGMENT_TYPE){return updateFragment(returnFiber,oldFiber,newChild.props.children,expirationTime,key);}return updateElement(returnFiber,oldFiber,newChild,expirationTime);}else{return null;}}case REACT_PORTAL_TYPE:{if(newChild.key===key){return updatePortal(returnFiber,oldFiber,newChild,expirationTime);}else{return null;}}}if(isArray$1(newChild)||getIteratorFn(newChild)){if(key!==null){return null;}return updateFragment(returnFiber,oldFiber,newChild,expirationTime,null);}throwOnInvalidObjectType(returnFiber,newChild);}{if(typeof newChild==='function'){warnOnFunctionType();}}return null;}function updateFromMap(existingChildren,returnFiber,newIdx,newChild,expirationTime){if(typeof newChild==='string'||typeof newChild==='number'){// Text nodes don't have keys, so we neither have to check the old nor
// new node for the key. If both are text nodes, they match.
var matchedFiber=existingChildren.get(newIdx)||null;return updateTextNode(returnFiber,matchedFiber,''+newChild,expirationTime);}if((typeof newChild==='undefined'?'undefined':_typeof(newChild))==='object'&&newChild!==null){switch(newChild.$$typeof){case REACT_ELEMENT_TYPE:{var _matchedFiber=existingChildren.get(newChild.key===null?newIdx:newChild.key)||null;if(newChild.type===REACT_FRAGMENT_TYPE){return updateFragment(returnFiber,_matchedFiber,newChild.props.children,expirationTime,newChild.key);}return updateElement(returnFiber,_matchedFiber,newChild,expirationTime);}case REACT_PORTAL_TYPE:{var _matchedFiber2=existingChildren.get(newChild.key===null?newIdx:newChild.key)||null;return updatePortal(returnFiber,_matchedFiber2,newChild,expirationTime);}}if(isArray$1(newChild)||getIteratorFn(newChild)){var _matchedFiber3=existingChildren.get(newIdx)||null;return updateFragment(returnFiber,_matchedFiber3,newChild,expirationTime,null);}throwOnInvalidObjectType(returnFiber,newChild);}{if(typeof newChild==='function'){warnOnFunctionType();}}return null;}/**
   * Warns if there is a duplicate or missing key
   */function warnOnInvalidKey(child,knownKeys){{if((typeof child==='undefined'?'undefined':_typeof(child))!=='object'||child===null){return knownKeys;}switch(child.$$typeof){case REACT_ELEMENT_TYPE:case REACT_PORTAL_TYPE:warnForMissingKey(child);var key=child.key;if(typeof key!=='string'){break;}if(knownKeys===null){knownKeys=new Set();knownKeys.add(key);break;}if(!knownKeys.has(key)){knownKeys.add(key);break;}warning(false,'Encountered two children with the same key, `%s`. '+'Keys should be unique so that components maintain their identity '+'across updates. Non-unique keys may cause children to be '+'duplicated and/or omitted — the behavior is unsupported and '+'could change in a future version.%s',key,getCurrentFiberStackAddendum$7());break;default:break;}}return knownKeys;}function reconcileChildrenArray(returnFiber,currentFirstChild,newChildren,expirationTime){// This algorithm can't optimize by searching from boths ends since we
// don't have backpointers on fibers. I'm trying to see how far we can get
// with that model. If it ends up not being worth the tradeoffs, we can
// add it later.
// Even with a two ended optimization, we'd want to optimize for the case
// where there are few changes and brute force the comparison instead of
// going for the Map. It'd like to explore hitting that path first in
// forward-only mode and only go for the Map once we notice that we need
// lots of look ahead. This doesn't handle reversal as well as two ended
// search but that's unusual. Besides, for the two ended optimization to
// work on Iterables, we'd need to copy the whole set.
// In this first iteration, we'll just live with hitting the bad case
// (adding everything to a Map) in for every insert/move.
// If you change this code, also update reconcileChildrenIterator() which
// uses the same algorithm.
{// First, validate keys.
var knownKeys=null;for(var i=0;i<newChildren.length;i++){var child=newChildren[i];knownKeys=warnOnInvalidKey(child,knownKeys);}}var resultingFirstChild=null;var previousNewFiber=null;var oldFiber=currentFirstChild;var lastPlacedIndex=0;var newIdx=0;var nextOldFiber=null;for(;oldFiber!==null&&newIdx<newChildren.length;newIdx++){if(oldFiber.index>newIdx){nextOldFiber=oldFiber;oldFiber=null;}else{nextOldFiber=oldFiber.sibling;}var newFiber=updateSlot(returnFiber,oldFiber,newChildren[newIdx],expirationTime);if(newFiber===null){// TODO: This breaks on empty slots like null children. That's
// unfortunate because it triggers the slow path all the time. We need
// a better way to communicate whether this was a miss or null,
// boolean, undefined, etc.
if(oldFiber===null){oldFiber=nextOldFiber;}break;}if(shouldTrackSideEffects){if(oldFiber&&newFiber.alternate===null){// We matched the slot, but we didn't reuse the existing fiber, so we
// need to delete the existing child.
deleteChild(returnFiber,oldFiber);}}lastPlacedIndex=placeChild(newFiber,lastPlacedIndex,newIdx);if(previousNewFiber===null){// TODO: Move out of the loop. This only happens for the first run.
resultingFirstChild=newFiber;}else{// TODO: Defer siblings if we're not at the right index for this slot.
// I.e. if we had null values before, then we want to defer this
// for each null value. However, we also don't want to call updateSlot
// with the previous one.
previousNewFiber.sibling=newFiber;}previousNewFiber=newFiber;oldFiber=nextOldFiber;}if(newIdx===newChildren.length){// We've reached the end of the new children. We can delete the rest.
deleteRemainingChildren(returnFiber,oldFiber);return resultingFirstChild;}if(oldFiber===null){// If we don't have any more existing children we can choose a fast path
// since the rest will all be insertions.
for(;newIdx<newChildren.length;newIdx++){var _newFiber=createChild(returnFiber,newChildren[newIdx],expirationTime);if(!_newFiber){continue;}lastPlacedIndex=placeChild(_newFiber,lastPlacedIndex,newIdx);if(previousNewFiber===null){// TODO: Move out of the loop. This only happens for the first run.
resultingFirstChild=_newFiber;}else{previousNewFiber.sibling=_newFiber;}previousNewFiber=_newFiber;}return resultingFirstChild;}// Add all children to a key map for quick lookups.
var existingChildren=mapRemainingChildren(returnFiber,oldFiber);// Keep scanning and use the map to restore deleted items as moves.
for(;newIdx<newChildren.length;newIdx++){var _newFiber2=updateFromMap(existingChildren,returnFiber,newIdx,newChildren[newIdx],expirationTime);if(_newFiber2){if(shouldTrackSideEffects){if(_newFiber2.alternate!==null){// The new fiber is a work in progress, but if there exists a
// current, that means that we reused the fiber. We need to delete
// it from the child list so that we don't add it to the deletion
// list.
existingChildren.delete(_newFiber2.key===null?newIdx:_newFiber2.key);}}lastPlacedIndex=placeChild(_newFiber2,lastPlacedIndex,newIdx);if(previousNewFiber===null){resultingFirstChild=_newFiber2;}else{previousNewFiber.sibling=_newFiber2;}previousNewFiber=_newFiber2;}}if(shouldTrackSideEffects){// Any existing children that weren't consumed above were deleted. We need
// to add them to the deletion list.
existingChildren.forEach(function(child){return deleteChild(returnFiber,child);});}return resultingFirstChild;}function reconcileChildrenIterator(returnFiber,currentFirstChild,newChildrenIterable,expirationTime){// This is the same implementation as reconcileChildrenArray(),
// but using the iterator instead.
var iteratorFn=getIteratorFn(newChildrenIterable);!(typeof iteratorFn==='function')?invariant(false,'An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.'):void 0;{// Warn about using Maps as children
if(newChildrenIterable.entries===iteratorFn){!didWarnAboutMaps?warning(false,'Using Maps as children is unsupported and will likely yield '+'unexpected results. Convert it to a sequence/iterable of keyed '+'ReactElements instead.%s',getCurrentFiberStackAddendum$7()):void 0;didWarnAboutMaps=true;}// First, validate keys.
// We'll get a different iterator later for the main pass.
var _newChildren=iteratorFn.call(newChildrenIterable);if(_newChildren){var knownKeys=null;var _step=_newChildren.next();for(;!_step.done;_step=_newChildren.next()){var child=_step.value;knownKeys=warnOnInvalidKey(child,knownKeys);}}}var newChildren=iteratorFn.call(newChildrenIterable);!(newChildren!=null)?invariant(false,'An iterable object provided no iterator.'):void 0;var resultingFirstChild=null;var previousNewFiber=null;var oldFiber=currentFirstChild;var lastPlacedIndex=0;var newIdx=0;var nextOldFiber=null;var step=newChildren.next();for(;oldFiber!==null&&!step.done;newIdx++,step=newChildren.next()){if(oldFiber.index>newIdx){nextOldFiber=oldFiber;oldFiber=null;}else{nextOldFiber=oldFiber.sibling;}var newFiber=updateSlot(returnFiber,oldFiber,step.value,expirationTime);if(newFiber===null){// TODO: This breaks on empty slots like null children. That's
// unfortunate because it triggers the slow path all the time. We need
// a better way to communicate whether this was a miss or null,
// boolean, undefined, etc.
if(!oldFiber){oldFiber=nextOldFiber;}break;}if(shouldTrackSideEffects){if(oldFiber&&newFiber.alternate===null){// We matched the slot, but we didn't reuse the existing fiber, so we
// need to delete the existing child.
deleteChild(returnFiber,oldFiber);}}lastPlacedIndex=placeChild(newFiber,lastPlacedIndex,newIdx);if(previousNewFiber===null){// TODO: Move out of the loop. This only happens for the first run.
resultingFirstChild=newFiber;}else{// TODO: Defer siblings if we're not at the right index for this slot.
// I.e. if we had null values before, then we want to defer this
// for each null value. However, we also don't want to call updateSlot
// with the previous one.
previousNewFiber.sibling=newFiber;}previousNewFiber=newFiber;oldFiber=nextOldFiber;}if(step.done){// We've reached the end of the new children. We can delete the rest.
deleteRemainingChildren(returnFiber,oldFiber);return resultingFirstChild;}if(oldFiber===null){// If we don't have any more existing children we can choose a fast path
// since the rest will all be insertions.
for(;!step.done;newIdx++,step=newChildren.next()){var _newFiber3=createChild(returnFiber,step.value,expirationTime);if(_newFiber3===null){continue;}lastPlacedIndex=placeChild(_newFiber3,lastPlacedIndex,newIdx);if(previousNewFiber===null){// TODO: Move out of the loop. This only happens for the first run.
resultingFirstChild=_newFiber3;}else{previousNewFiber.sibling=_newFiber3;}previousNewFiber=_newFiber3;}return resultingFirstChild;}// Add all children to a key map for quick lookups.
var existingChildren=mapRemainingChildren(returnFiber,oldFiber);// Keep scanning and use the map to restore deleted items as moves.
for(;!step.done;newIdx++,step=newChildren.next()){var _newFiber4=updateFromMap(existingChildren,returnFiber,newIdx,step.value,expirationTime);if(_newFiber4!==null){if(shouldTrackSideEffects){if(_newFiber4.alternate!==null){// The new fiber is a work in progress, but if there exists a
// current, that means that we reused the fiber. We need to delete
// it from the child list so that we don't add it to the deletion
// list.
existingChildren.delete(_newFiber4.key===null?newIdx:_newFiber4.key);}}lastPlacedIndex=placeChild(_newFiber4,lastPlacedIndex,newIdx);if(previousNewFiber===null){resultingFirstChild=_newFiber4;}else{previousNewFiber.sibling=_newFiber4;}previousNewFiber=_newFiber4;}}if(shouldTrackSideEffects){// Any existing children that weren't consumed above were deleted. We need
// to add them to the deletion list.
existingChildren.forEach(function(child){return deleteChild(returnFiber,child);});}return resultingFirstChild;}function reconcileSingleTextNode(returnFiber,currentFirstChild,textContent,expirationTime){// There's no need to check for keys on text nodes since we don't have a
// way to define them.
if(currentFirstChild!==null&&currentFirstChild.tag===HostText){// We already have an existing node so let's just update it and delete
// the rest.
deleteRemainingChildren(returnFiber,currentFirstChild.sibling);var existing=useFiber(currentFirstChild,textContent,expirationTime);existing.return=returnFiber;return existing;}// The existing first child is not a text node so we need to create one
// and delete the existing ones.
deleteRemainingChildren(returnFiber,currentFirstChild);var created=createFiberFromText(textContent,returnFiber.mode,expirationTime);created.return=returnFiber;return created;}function reconcileSingleElement(returnFiber,currentFirstChild,element,expirationTime){var key=element.key;var child=currentFirstChild;while(child!==null){// TODO: If key === null and child.key === null, then this only applies to
// the first item in the list.
if(child.key===key){if(child.tag===Fragment?element.type===REACT_FRAGMENT_TYPE:child.type===element.type){deleteRemainingChildren(returnFiber,child.sibling);var existing=useFiber(child,element.type===REACT_FRAGMENT_TYPE?element.props.children:element.props,expirationTime);existing.ref=coerceRef(returnFiber,child,element);existing.return=returnFiber;{existing._debugSource=element._source;existing._debugOwner=element._owner;}return existing;}else{deleteRemainingChildren(returnFiber,child);break;}}else{deleteChild(returnFiber,child);}child=child.sibling;}if(element.type===REACT_FRAGMENT_TYPE){var created=createFiberFromFragment(element.props.children,returnFiber.mode,expirationTime,element.key);created.return=returnFiber;return created;}else{var _created4=createFiberFromElement(element,returnFiber.mode,expirationTime);_created4.ref=coerceRef(returnFiber,currentFirstChild,element);_created4.return=returnFiber;return _created4;}}function reconcileSinglePortal(returnFiber,currentFirstChild,portal,expirationTime){var key=portal.key;var child=currentFirstChild;while(child!==null){// TODO: If key === null and child.key === null, then this only applies to
// the first item in the list.
if(child.key===key){if(child.tag===HostPortal&&child.stateNode.containerInfo===portal.containerInfo&&child.stateNode.implementation===portal.implementation){deleteRemainingChildren(returnFiber,child.sibling);var existing=useFiber(child,portal.children||[],expirationTime);existing.return=returnFiber;return existing;}else{deleteRemainingChildren(returnFiber,child);break;}}else{deleteChild(returnFiber,child);}child=child.sibling;}var created=createFiberFromPortal(portal,returnFiber.mode,expirationTime);created.return=returnFiber;return created;}// This API will tag the children with the side-effect of the reconciliation
// itself. They will be added to the side-effect list as we pass through the
// children and the parent.
function reconcileChildFibers(returnFiber,currentFirstChild,newChild,expirationTime){// This function is not recursive.
// If the top level item is an array, we treat it as a set of children,
// not as a fragment. Nested arrays on the other hand will be treated as
// fragment nodes. Recursion happens at the normal flow.
// Handle top level unkeyed fragments as if they were arrays.
// This leads to an ambiguity between <>{[...]}</> and <>...</>.
// We treat the ambiguous cases above the same.
if((typeof newChild==='undefined'?'undefined':_typeof(newChild))==='object'&&newChild!==null&&newChild.type===REACT_FRAGMENT_TYPE&&newChild.key===null){newChild=newChild.props.children;}// Handle object types
var isObject=(typeof newChild==='undefined'?'undefined':_typeof(newChild))==='object'&&newChild!==null;if(isObject){switch(newChild.$$typeof){case REACT_ELEMENT_TYPE:return placeSingleChild(reconcileSingleElement(returnFiber,currentFirstChild,newChild,expirationTime));case REACT_PORTAL_TYPE:return placeSingleChild(reconcileSinglePortal(returnFiber,currentFirstChild,newChild,expirationTime));}}if(typeof newChild==='string'||typeof newChild==='number'){return placeSingleChild(reconcileSingleTextNode(returnFiber,currentFirstChild,''+newChild,expirationTime));}if(isArray$1(newChild)){return reconcileChildrenArray(returnFiber,currentFirstChild,newChild,expirationTime);}if(getIteratorFn(newChild)){return reconcileChildrenIterator(returnFiber,currentFirstChild,newChild,expirationTime);}if(isObject){throwOnInvalidObjectType(returnFiber,newChild);}{if(typeof newChild==='function'){warnOnFunctionType();}}if(typeof newChild==='undefined'){// If the new child is undefined, and the return fiber is a composite
// component, throw an error. If Fiber return types are disabled,
// we already threw above.
switch(returnFiber.tag){case ClassComponent:{{var instance=returnFiber.stateNode;if(instance.render._isMockFunction){// We allow auto-mocks to proceed as if they're returning null.
break;}}}// Intentionally fall through to the next case, which handles both
// functions and classes
// eslint-disable-next-lined no-fallthrough
case FunctionalComponent:{var Component=returnFiber.type;invariant(false,'%s(...): Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null.',Component.displayName||Component.name||'Component');}}}// Remaining cases are all treated as empty.
return deleteRemainingChildren(returnFiber,currentFirstChild);}return reconcileChildFibers;}var reconcileChildFibers=ChildReconciler(true);var mountChildFibers=ChildReconciler(false);function cloneChildFibers(current,workInProgress){!(current===null||workInProgress.child===current.child)?invariant(false,'Resuming work not yet implemented.'):void 0;if(workInProgress.child===null){return;}var currentChild=workInProgress.child;var newChild=createWorkInProgress(currentChild,currentChild.pendingProps,currentChild.expirationTime);workInProgress.child=newChild;newChild.return=workInProgress;while(currentChild.sibling!==null){currentChild=currentChild.sibling;newChild=newChild.sibling=createWorkInProgress(currentChild,currentChild.pendingProps,currentChild.expirationTime);newChild.return=workInProgress;}newChild.sibling=null;}// The deepest Fiber on the stack involved in a hydration context.
// This may have been an insertion or a hydration.
var hydrationParentFiber=null;var nextHydratableInstance=null;var isHydrating=false;function enterHydrationState(fiber){if(!supportsHydration){return false;}var parentInstance=fiber.stateNode.containerInfo;nextHydratableInstance=getFirstHydratableChild(parentInstance);hydrationParentFiber=fiber;isHydrating=true;return true;}function deleteHydratableInstance(returnFiber,instance){{switch(returnFiber.tag){case HostRoot:didNotHydrateContainerInstance(returnFiber.stateNode.containerInfo,instance);break;case HostComponent:didNotHydrateInstance(returnFiber.type,returnFiber.memoizedProps,returnFiber.stateNode,instance);break;}}var childToDelete=createFiberFromHostInstanceForDeletion();childToDelete.stateNode=instance;childToDelete.return=returnFiber;childToDelete.effectTag=Deletion;// This might seem like it belongs on progressedFirstDeletion. However,
// these children are not part of the reconciliation list of children.
// Even if we abort and rereconcile the children, that will try to hydrate
// again and the nodes are still in the host tree so these will be
// recreated.
if(returnFiber.lastEffect!==null){returnFiber.lastEffect.nextEffect=childToDelete;returnFiber.lastEffect=childToDelete;}else{returnFiber.firstEffect=returnFiber.lastEffect=childToDelete;}}function insertNonHydratedInstance(returnFiber,fiber){fiber.effectTag|=Placement;{switch(returnFiber.tag){case HostRoot:{var parentContainer=returnFiber.stateNode.containerInfo;switch(fiber.tag){case HostComponent:var type=fiber.type;var props=fiber.pendingProps;didNotFindHydratableContainerInstance(parentContainer,type,props);break;case HostText:var text=fiber.pendingProps;didNotFindHydratableContainerTextInstance(parentContainer,text);break;}break;}case HostComponent:{var parentType=returnFiber.type;var parentProps=returnFiber.memoizedProps;var parentInstance=returnFiber.stateNode;switch(fiber.tag){case HostComponent:var _type=fiber.type;var _props=fiber.pendingProps;didNotFindHydratableInstance(parentType,parentProps,parentInstance,_type,_props);break;case HostText:var _text=fiber.pendingProps;didNotFindHydratableTextInstance(parentType,parentProps,parentInstance,_text);break;}break;}default:return;}}}function tryHydrate(fiber,nextInstance){switch(fiber.tag){case HostComponent:{var type=fiber.type;var props=fiber.pendingProps;var instance=canHydrateInstance(nextInstance,type,props);if(instance!==null){fiber.stateNode=instance;return true;}return false;}case HostText:{var text=fiber.pendingProps;var textInstance=canHydrateTextInstance(nextInstance,text);if(textInstance!==null){fiber.stateNode=textInstance;return true;}return false;}default:return false;}}function tryToClaimNextHydratableInstance(fiber){if(!isHydrating){return;}var nextInstance=nextHydratableInstance;if(!nextInstance){// Nothing to hydrate. Make it an insertion.
insertNonHydratedInstance(hydrationParentFiber,fiber);isHydrating=false;hydrationParentFiber=fiber;return;}var firstAttemptedInstance=nextInstance;if(!tryHydrate(fiber,nextInstance)){// If we can't hydrate this instance let's try the next one.
// We use this as a heuristic. It's based on intuition and not data so it
// might be flawed or unnecessary.
nextInstance=getNextHydratableSibling(firstAttemptedInstance);if(!nextInstance||!tryHydrate(fiber,nextInstance)){// Nothing to hydrate. Make it an insertion.
insertNonHydratedInstance(hydrationParentFiber,fiber);isHydrating=false;hydrationParentFiber=fiber;return;}// We matched the next one, we'll now assume that the first one was
// superfluous and we'll delete it. Since we can't eagerly delete it
// we'll have to schedule a deletion. To do that, this node needs a dummy
// fiber associated with it.
deleteHydratableInstance(hydrationParentFiber,firstAttemptedInstance);}hydrationParentFiber=fiber;nextHydratableInstance=getFirstHydratableChild(nextInstance);}function prepareToHydrateHostInstance(fiber,rootContainerInstance,hostContext){if(!supportsHydration){invariant(false,'Expected prepareToHydrateHostInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.');}var instance=fiber.stateNode;var updatePayload=hydrateInstance(instance,fiber.type,fiber.memoizedProps,rootContainerInstance,hostContext,fiber);// TODO: Type this specific to this type of component.
fiber.updateQueue=updatePayload;// If the update payload indicates that there is a change or if there
// is a new ref we mark this as an update.
if(updatePayload!==null){return true;}return false;}function prepareToHydrateHostTextInstance(fiber){if(!supportsHydration){invariant(false,'Expected prepareToHydrateHostTextInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.');}var textInstance=fiber.stateNode;var textContent=fiber.memoizedProps;var shouldUpdate=hydrateTextInstance(textInstance,textContent,fiber);{if(shouldUpdate){// We assume that prepareToHydrateHostTextInstance is called in a context where the
// hydration parent is the parent host component of this host text.
var returnFiber=hydrationParentFiber;if(returnFiber!==null){switch(returnFiber.tag){case HostRoot:{var parentContainer=returnFiber.stateNode.containerInfo;didNotMatchHydratedContainerTextInstance(parentContainer,textInstance,textContent);break;}case HostComponent:{var parentType=returnFiber.type;var parentProps=returnFiber.memoizedProps;var parentInstance=returnFiber.stateNode;didNotMatchHydratedTextInstance(parentType,parentProps,parentInstance,textInstance,textContent);break;}}}}}return shouldUpdate;}function popToNextHostParent(fiber){var parent=fiber.return;while(parent!==null&&parent.tag!==HostComponent&&parent.tag!==HostRoot){parent=parent.return;}hydrationParentFiber=parent;}function popHydrationState(fiber){if(!supportsHydration){return false;}if(fiber!==hydrationParentFiber){// We're deeper than the current hydration context, inside an inserted
// tree.
return false;}if(!isHydrating){// If we're not currently hydrating but we're in a hydration context, then
// we were an insertion and now need to pop up reenter hydration of our
// siblings.
popToNextHostParent(fiber);isHydrating=true;return false;}var type=fiber.type;// If we have any remaining hydratable nodes, we need to delete them now.
// We only do this deeper than head and body since they tend to have random
// other nodes in them. We also ignore components with pure text content in
// side of them.
// TODO: Better heuristic.
if(fiber.tag!==HostComponent||type!=='head'&&type!=='body'&&!shouldSetTextContent(type,fiber.memoizedProps)){var nextInstance=nextHydratableInstance;while(nextInstance){deleteHydratableInstance(fiber,nextInstance);nextInstance=getNextHydratableSibling(nextInstance);}}popToNextHostParent(fiber);nextHydratableInstance=hydrationParentFiber?getNextHydratableSibling(fiber.stateNode):null;return true;}function resetHydrationState(){if(!supportsHydration){return;}hydrationParentFiber=null;nextHydratableInstance=null;isHydrating=false;}var getCurrentFiberStackAddendum$6=ReactDebugCurrentFiber.getCurrentFiberStackAddendum;var didWarnAboutBadClass=void 0;var didWarnAboutGetDerivedStateOnFunctionalComponent=void 0;var didWarnAboutStatelessRefs=void 0;{didWarnAboutBadClass={};didWarnAboutGetDerivedStateOnFunctionalComponent={};didWarnAboutStatelessRefs={};}// TODO: Remove this and use reconcileChildrenAtExpirationTime directly.
function reconcileChildren(current,workInProgress,nextChildren){reconcileChildrenAtExpirationTime(current,workInProgress,nextChildren,workInProgress.expirationTime);}function reconcileChildrenAtExpirationTime(current,workInProgress,nextChildren,renderExpirationTime){if(current===null){// If this is a fresh new component that hasn't been rendered yet, we
// won't update its child set by applying minimal side-effects. Instead,
// we will add them all to the child before it gets rendered. That means
// we can optimize this reconciliation pass by not tracking side-effects.
workInProgress.child=mountChildFibers(workInProgress,null,nextChildren,renderExpirationTime);}else{// If the current child is the same as the work in progress, it means that
// we haven't yet started any work on these children. Therefore, we use
// the clone algorithm to create a copy of all the current children.
// If we had any progressed work already, that is invalid at this point so
// let's throw it out.
workInProgress.child=reconcileChildFibers(workInProgress,current.child,nextChildren,renderExpirationTime);}}function updateForwardRef(current,workInProgress){var render=workInProgress.type.render;var nextProps=workInProgress.pendingProps;var ref=workInProgress.ref;if(hasContextChanged()){// Normally we can bail out on props equality but if context has changed
// we don't do the bailout and we have to reuse existing props instead.
}else if(workInProgress.memoizedProps===nextProps){var currentRef=current!==null?current.ref:null;if(ref===currentRef){return bailoutOnAlreadyFinishedWork(current,workInProgress);}}var nextChildren=void 0;{ReactCurrentOwner.current=workInProgress;ReactDebugCurrentFiber.setCurrentPhase('render');nextChildren=render(nextProps,ref);ReactDebugCurrentFiber.setCurrentPhase(null);}reconcileChildren(current,workInProgress,nextChildren);memoizeProps(workInProgress,nextProps);return workInProgress.child;}function updateFragment(current,workInProgress){var nextChildren=workInProgress.pendingProps;if(hasContextChanged()){// Normally we can bail out on props equality but if context has changed
// we don't do the bailout and we have to reuse existing props instead.
}else if(workInProgress.memoizedProps===nextChildren){return bailoutOnAlreadyFinishedWork(current,workInProgress);}reconcileChildren(current,workInProgress,nextChildren);memoizeProps(workInProgress,nextChildren);return workInProgress.child;}function updateMode(current,workInProgress){var nextChildren=workInProgress.pendingProps.children;if(hasContextChanged()){// Normally we can bail out on props equality but if context has changed
// we don't do the bailout and we have to reuse existing props instead.
}else if(nextChildren===null||workInProgress.memoizedProps===nextChildren){return bailoutOnAlreadyFinishedWork(current,workInProgress);}reconcileChildren(current,workInProgress,nextChildren);memoizeProps(workInProgress,nextChildren);return workInProgress.child;}function updateProfiler(current,workInProgress){var nextProps=workInProgress.pendingProps;if(enableProfilerTimer){// Start render timer here and push start time onto queue
markActualRenderTimeStarted(workInProgress);// Let the "complete" phase know to stop the timer,
// And the scheduler to record the measured time.
workInProgress.effectTag|=Update;}if(workInProgress.memoizedProps===nextProps){return bailoutOnAlreadyFinishedWork(current,workInProgress);}var nextChildren=nextProps.children;reconcileChildren(current,workInProgress,nextChildren);memoizeProps(workInProgress,nextProps);return workInProgress.child;}function markRef(current,workInProgress){var ref=workInProgress.ref;if(current===null&&ref!==null||current!==null&&current.ref!==ref){// Schedule a Ref effect
workInProgress.effectTag|=Ref;}}function updateFunctionalComponent(current,workInProgress){var fn=workInProgress.type;var nextProps=workInProgress.pendingProps;if(hasContextChanged()){// Normally we can bail out on props equality but if context has changed
// we don't do the bailout and we have to reuse existing props instead.
}else{if(workInProgress.memoizedProps===nextProps){return bailoutOnAlreadyFinishedWork(current,workInProgress);}// TODO: consider bringing fn.shouldComponentUpdate() back.
// It used to be here.
}var unmaskedContext=getUnmaskedContext(workInProgress);var context=getMaskedContext(workInProgress,unmaskedContext);var nextChildren=void 0;{ReactCurrentOwner.current=workInProgress;ReactDebugCurrentFiber.setCurrentPhase('render');nextChildren=fn(nextProps,context);ReactDebugCurrentFiber.setCurrentPhase(null);}// React DevTools reads this flag.
workInProgress.effectTag|=PerformedWork;reconcileChildren(current,workInProgress,nextChildren);memoizeProps(workInProgress,nextProps);return workInProgress.child;}function updateClassComponent(current,workInProgress,renderExpirationTime){// Push context providers early to prevent context stack mismatches.
// During mounting we don't know the child context yet as the instance doesn't exist.
// We will invalidate the child context in finishClassComponent() right after rendering.
var hasContext=pushContextProvider(workInProgress);var shouldUpdate=void 0;if(current===null){if(workInProgress.stateNode===null){// In the initial pass we might need to construct the instance.
constructClassInstance(workInProgress,workInProgress.pendingProps,renderExpirationTime);mountClassInstance(workInProgress,renderExpirationTime);shouldUpdate=true;}else{// In a resume, we'll already have an instance we can reuse.
shouldUpdate=resumeMountClassInstance(workInProgress,renderExpirationTime);}}else{shouldUpdate=updateClassInstance(current,workInProgress,renderExpirationTime);}return finishClassComponent(current,workInProgress,shouldUpdate,hasContext,renderExpirationTime);}function finishClassComponent(current,workInProgress,shouldUpdate,hasContext,renderExpirationTime){// Refs should update even if shouldComponentUpdate returns false
markRef(current,workInProgress);var didCaptureError=(workInProgress.effectTag&DidCapture)!==NoEffect;if(!shouldUpdate&&!didCaptureError){// Context providers should defer to sCU for rendering
if(hasContext){invalidateContextProvider(workInProgress,false);}return bailoutOnAlreadyFinishedWork(current,workInProgress);}var ctor=workInProgress.type;var instance=workInProgress.stateNode;// Rerender
ReactCurrentOwner.current=workInProgress;var nextChildren=void 0;if(didCaptureError&&(!enableGetDerivedStateFromCatch||typeof ctor.getDerivedStateFromCatch!=='function')){// If we captured an error, but getDerivedStateFrom catch is not defined,
// unmount all the children. componentDidCatch will schedule an update to
// re-render a fallback. This is temporary until we migrate everyone to
// the new API.
// TODO: Warn in a future release.
nextChildren=null;if(enableProfilerTimer){stopBaseRenderTimerIfRunning();}}else{{ReactDebugCurrentFiber.setCurrentPhase('render');nextChildren=instance.render();if(debugRenderPhaseSideEffects||debugRenderPhaseSideEffectsForStrictMode&&workInProgress.mode&StrictMode){instance.render();}ReactDebugCurrentFiber.setCurrentPhase(null);}}// React DevTools reads this flag.
workInProgress.effectTag|=PerformedWork;if(didCaptureError){// If we're recovering from an error, reconcile twice: first to delete
// all the existing children.
reconcileChildrenAtExpirationTime(current,workInProgress,null,renderExpirationTime);workInProgress.child=null;// Now we can continue reconciling like normal. This has the effect of
// remounting all children regardless of whether their their
// identity matches.
}reconcileChildrenAtExpirationTime(current,workInProgress,nextChildren,renderExpirationTime);// Memoize props and state using the values we just used to render.
// TODO: Restructure so we never read values from the instance.
memoizeState(workInProgress,instance.state);memoizeProps(workInProgress,instance.props);// The context might have changed so we need to recalculate it.
if(hasContext){invalidateContextProvider(workInProgress,true);}return workInProgress.child;}function pushHostRootContext(workInProgress){var root=workInProgress.stateNode;if(root.pendingContext){pushTopLevelContextObject(workInProgress,root.pendingContext,root.pendingContext!==root.context);}else if(root.context){// Should always be set
pushTopLevelContextObject(workInProgress,root.context,false);}pushHostContainer(workInProgress,root.containerInfo);}function updateHostRoot(current,workInProgress,renderExpirationTime){pushHostRootContext(workInProgress);var updateQueue=workInProgress.updateQueue;if(updateQueue!==null){var nextProps=workInProgress.pendingProps;var prevState=workInProgress.memoizedState;var prevChildren=prevState!==null?prevState.element:null;processUpdateQueue(workInProgress,updateQueue,nextProps,null,renderExpirationTime);var nextState=workInProgress.memoizedState;// Caution: React DevTools currently depends on this property
// being called "element".
var nextChildren=nextState.element;if(nextChildren===prevChildren){// If the state is the same as before, that's a bailout because we had
// no work that expires at this time.
resetHydrationState();return bailoutOnAlreadyFinishedWork(current,workInProgress);}var root=workInProgress.stateNode;if((current===null||current.child===null)&&root.hydrate&&enterHydrationState(workInProgress)){// If we don't have any current children this might be the first pass.
// We always try to hydrate. If this isn't a hydration pass there won't
// be any children to hydrate which is effectively the same thing as
// not hydrating.
// This is a bit of a hack. We track the host root as a placement to
// know that we're currently in a mounting state. That way isMounted
// works as expected. We must reset this before committing.
// TODO: Delete this when we delete isMounted and findDOMNode.
workInProgress.effectTag|=Placement;// Ensure that children mount into this root without tracking
// side-effects. This ensures that we don't store Placement effects on
// nodes that will be hydrated.
workInProgress.child=mountChildFibers(workInProgress,null,nextChildren,renderExpirationTime);}else{// Otherwise reset hydration state in case we aborted and resumed another
// root.
resetHydrationState();reconcileChildren(current,workInProgress,nextChildren);}return workInProgress.child;}resetHydrationState();// If there is no update queue, that's a bailout because the root has no props.
return bailoutOnAlreadyFinishedWork(current,workInProgress);}function updateHostComponent(current,workInProgress,renderExpirationTime){pushHostContext(workInProgress);if(current===null){tryToClaimNextHydratableInstance(workInProgress);}var type=workInProgress.type;var memoizedProps=workInProgress.memoizedProps;var nextProps=workInProgress.pendingProps;var prevProps=current!==null?current.memoizedProps:null;if(hasContextChanged()){// Normally we can bail out on props equality but if context has changed
// we don't do the bailout and we have to reuse existing props instead.
}else if(memoizedProps===nextProps){var isHidden=workInProgress.mode&AsyncMode&&shouldDeprioritizeSubtree(type,nextProps);if(isHidden){// Before bailing out, make sure we've deprioritized a hidden component.
workInProgress.expirationTime=Never;}if(!isHidden||renderExpirationTime!==Never){return bailoutOnAlreadyFinishedWork(current,workInProgress);}// If we're rendering a hidden node at hidden priority, don't bailout. The
// parent is complete, but the children may not be.
}var nextChildren=nextProps.children;var isDirectTextChild=shouldSetTextContent(type,nextProps);if(isDirectTextChild){// We special case a direct text child of a host node. This is a common
// case. We won't handle it as a reified child. We will instead handle
// this in the host environment that also have access to this prop. That
// avoids allocating another HostText fiber and traversing it.
nextChildren=null;}else if(prevProps&&shouldSetTextContent(type,prevProps)){// If we're switching from a direct text child to a normal child, or to
// empty, we need to schedule the text content to be reset.
workInProgress.effectTag|=ContentReset;}markRef(current,workInProgress);// Check the host config to see if the children are offscreen/hidden.
if(renderExpirationTime!==Never&&workInProgress.mode&AsyncMode&&shouldDeprioritizeSubtree(type,nextProps)){// Down-prioritize the children.
workInProgress.expirationTime=Never;// Bailout and come back to this fiber later.
workInProgress.memoizedProps=nextProps;return null;}reconcileChildren(current,workInProgress,nextChildren);memoizeProps(workInProgress,nextProps);return workInProgress.child;}function updateHostText(current,workInProgress){if(current===null){tryToClaimNextHydratableInstance(workInProgress);}var nextProps=workInProgress.pendingProps;memoizeProps(workInProgress,nextProps);// Nothing to do here. This is terminal. We'll do the completion step
// immediately after.
return null;}function mountIndeterminateComponent(current,workInProgress,renderExpirationTime){!(current===null)?invariant(false,'An indeterminate component should never have mounted. This error is likely caused by a bug in React. Please file an issue.'):void 0;var fn=workInProgress.type;var props=workInProgress.pendingProps;var unmaskedContext=getUnmaskedContext(workInProgress);var context=getMaskedContext(workInProgress,unmaskedContext);var value=void 0;{if(fn.prototype&&typeof fn.prototype.render==='function'){var componentName=getComponentName(workInProgress)||'Unknown';if(!didWarnAboutBadClass[componentName]){warning(false,"The <%s /> component appears to have a render method, but doesn't extend React.Component. "+'This is likely to cause errors. Change %s to extend React.Component instead.',componentName,componentName);didWarnAboutBadClass[componentName]=true;}}if(workInProgress.mode&StrictMode){ReactStrictModeWarnings.recordLegacyContextWarning(workInProgress,null);}ReactCurrentOwner.current=workInProgress;value=fn(props,context);}// React DevTools reads this flag.
workInProgress.effectTag|=PerformedWork;if((typeof value==='undefined'?'undefined':_typeof(value))==='object'&&value!==null&&typeof value.render==='function'&&value.$$typeof===undefined){var Component=workInProgress.type;// Proceed under the assumption that this is a class instance
workInProgress.tag=ClassComponent;workInProgress.memoizedState=value.state!==null&&value.state!==undefined?value.state:null;var getDerivedStateFromProps=Component.getDerivedStateFromProps;if(typeof getDerivedStateFromProps==='function'){applyDerivedStateFromProps(workInProgress,getDerivedStateFromProps,props);}// Push context providers early to prevent context stack mismatches.
// During mounting we don't know the child context yet as the instance doesn't exist.
// We will invalidate the child context in finishClassComponent() right after rendering.
var hasContext=pushContextProvider(workInProgress);adoptClassInstance(workInProgress,value);mountClassInstance(workInProgress,renderExpirationTime);return finishClassComponent(current,workInProgress,true,hasContext,renderExpirationTime);}else{// Proceed under the assumption that this is a functional component
workInProgress.tag=FunctionalComponent;{var _Component=workInProgress.type;if(_Component){!!_Component.childContextTypes?warning(false,'%s(...): childContextTypes cannot be defined on a functional component.',_Component.displayName||_Component.name||'Component'):void 0;}if(workInProgress.ref!==null){var info='';var ownerName=ReactDebugCurrentFiber.getCurrentFiberOwnerName();if(ownerName){info+='\n\nCheck the render method of `'+ownerName+'`.';}var warningKey=ownerName||workInProgress._debugID||'';var debugSource=workInProgress._debugSource;if(debugSource){warningKey=debugSource.fileName+':'+debugSource.lineNumber;}if(!didWarnAboutStatelessRefs[warningKey]){didWarnAboutStatelessRefs[warningKey]=true;warning(false,'Stateless function components cannot be given refs. '+'Attempts to access this ref will fail.%s%s',info,ReactDebugCurrentFiber.getCurrentFiberStackAddendum());}}if(typeof fn.getDerivedStateFromProps==='function'){var _componentName=getComponentName(workInProgress)||'Unknown';if(!didWarnAboutGetDerivedStateOnFunctionalComponent[_componentName]){warning(false,'%s: Stateless functional components do not support getDerivedStateFromProps.',_componentName);didWarnAboutGetDerivedStateOnFunctionalComponent[_componentName]=true;}}}reconcileChildren(current,workInProgress,value);memoizeProps(workInProgress,props);return workInProgress.child;}}function updateTimeoutComponent(current,workInProgress,renderExpirationTime){if(enableSuspense){var nextProps=workInProgress.pendingProps;var prevProps=workInProgress.memoizedProps;var prevDidTimeout=workInProgress.memoizedState;// Check if we already attempted to render the normal state. If we did,
// and we timed out, render the placeholder state.
var alreadyCaptured=(workInProgress.effectTag&DidCapture)===NoEffect;var nextDidTimeout=!alreadyCaptured;if(hasContextChanged()){// Normally we can bail out on props equality but if context has changed
// we don't do the bailout and we have to reuse existing props instead.
}else if(nextProps===prevProps&&nextDidTimeout===prevDidTimeout){return bailoutOnAlreadyFinishedWork(current,workInProgress);}var render=nextProps.children;var nextChildren=render(nextDidTimeout);workInProgress.memoizedProps=nextProps;workInProgress.memoizedState=nextDidTimeout;reconcileChildren(current,workInProgress,nextChildren);return workInProgress.child;}else{return null;}}function updatePortalComponent(current,workInProgress,renderExpirationTime){pushHostContainer(workInProgress,workInProgress.stateNode.containerInfo);var nextChildren=workInProgress.pendingProps;if(hasContextChanged()){// Normally we can bail out on props equality but if context has changed
// we don't do the bailout and we have to reuse existing props instead.
}else if(workInProgress.memoizedProps===nextChildren){return bailoutOnAlreadyFinishedWork(current,workInProgress);}if(current===null){// Portals are special because we don't append the children during mount
// but at commit. Therefore we need to track insertions which the normal
// flow doesn't do during mount. This doesn't happen at the root because
// the root always starts with a "current" with a null child.
// TODO: Consider unifying this with how the root works.
workInProgress.child=reconcileChildFibers(workInProgress,null,nextChildren,renderExpirationTime);memoizeProps(workInProgress,nextChildren);}else{reconcileChildren(current,workInProgress,nextChildren);memoizeProps(workInProgress,nextChildren);}return workInProgress.child;}function propagateContextChange(workInProgress,context,changedBits,renderExpirationTime){var fiber=workInProgress.child;if(fiber!==null){// Set the return pointer of the child to the work-in-progress fiber.
fiber.return=workInProgress;}while(fiber!==null){var nextFiber=void 0;// Visit this fiber.
switch(fiber.tag){case ContextConsumer:// Check if the context matches.
var observedBits=fiber.stateNode|0;if(fiber.type===context&&(observedBits&changedBits)!==0){// Update the expiration time of all the ancestors, including
// the alternates.
var node=fiber;while(node!==null){var alternate=node.alternate;if(node.expirationTime===NoWork||node.expirationTime>renderExpirationTime){node.expirationTime=renderExpirationTime;if(alternate!==null&&(alternate.expirationTime===NoWork||alternate.expirationTime>renderExpirationTime)){alternate.expirationTime=renderExpirationTime;}}else if(alternate!==null&&(alternate.expirationTime===NoWork||alternate.expirationTime>renderExpirationTime)){alternate.expirationTime=renderExpirationTime;}else{// Neither alternate was updated, which means the rest of the
// ancestor path already has sufficient priority.
break;}node=node.return;}// Don't scan deeper than a matching consumer. When we render the
// consumer, we'll continue scanning from that point. This way the
// scanning work is time-sliced.
nextFiber=null;}else{// Traverse down.
nextFiber=fiber.child;}break;case ContextProvider:// Don't scan deeper if this is a matching provider
nextFiber=fiber.type===workInProgress.type?null:fiber.child;break;default:// Traverse down.
nextFiber=fiber.child;break;}if(nextFiber!==null){// Set the return pointer of the child to the work-in-progress fiber.
nextFiber.return=fiber;}else{// No child. Traverse to next sibling.
nextFiber=fiber;while(nextFiber!==null){if(nextFiber===workInProgress){// We're back to the root of this subtree. Exit.
nextFiber=null;break;}var sibling=nextFiber.sibling;if(sibling!==null){// Set the return pointer of the sibling to the work-in-progress fiber.
sibling.return=nextFiber.return;nextFiber=sibling;break;}// No more siblings. Traverse up.
nextFiber=nextFiber.return;}}fiber=nextFiber;}}function updateContextProvider(current,workInProgress,renderExpirationTime){var providerType=workInProgress.type;var context=providerType._context;var newProps=workInProgress.pendingProps;var oldProps=workInProgress.memoizedProps;var canBailOnProps=true;if(hasContextChanged()){canBailOnProps=false;// Normally we can bail out on props equality but if context has changed
// we don't do the bailout and we have to reuse existing props instead.
}else if(oldProps===newProps){workInProgress.stateNode=0;pushProvider(workInProgress);return bailoutOnAlreadyFinishedWork(current,workInProgress);}var newValue=newProps.value;workInProgress.memoizedProps=newProps;{var providerPropTypes=workInProgress.type.propTypes;if(providerPropTypes){checkPropTypes(providerPropTypes,newProps,'prop','Context.Provider',getCurrentFiberStackAddendum$6);}}var changedBits=void 0;if(oldProps===null){// Initial render
changedBits=MAX_SIGNED_31_BIT_INT;}else{if(oldProps.value===newProps.value){// No change. Bailout early if children are the same.
if(oldProps.children===newProps.children&&canBailOnProps){workInProgress.stateNode=0;pushProvider(workInProgress);return bailoutOnAlreadyFinishedWork(current,workInProgress);}changedBits=0;}else{var oldValue=oldProps.value;// Use Object.is to compare the new context value to the old value.
// Inlined Object.is polyfill.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
if(oldValue===newValue&&(oldValue!==0||1/oldValue===1/newValue)||oldValue!==oldValue&&newValue!==newValue// eslint-disable-line no-self-compare
){// No change. Bailout early if children are the same.
if(oldProps.children===newProps.children&&canBailOnProps){workInProgress.stateNode=0;pushProvider(workInProgress);return bailoutOnAlreadyFinishedWork(current,workInProgress);}changedBits=0;}else{changedBits=typeof context._calculateChangedBits==='function'?context._calculateChangedBits(oldValue,newValue):MAX_SIGNED_31_BIT_INT;{!((changedBits&MAX_SIGNED_31_BIT_INT)===changedBits)?warning(false,'calculateChangedBits: Expected the return value to be a '+'31-bit integer. Instead received: %s',changedBits):void 0;}changedBits|=0;if(changedBits===0){// No change. Bailout early if children are the same.
if(oldProps.children===newProps.children&&canBailOnProps){workInProgress.stateNode=0;pushProvider(workInProgress);return bailoutOnAlreadyFinishedWork(current,workInProgress);}}else{propagateContextChange(workInProgress,context,changedBits,renderExpirationTime);}}}}workInProgress.stateNode=changedBits;pushProvider(workInProgress);var newChildren=newProps.children;reconcileChildren(current,workInProgress,newChildren);return workInProgress.child;}function updateContextConsumer(current,workInProgress,renderExpirationTime){var context=workInProgress.type;var newProps=workInProgress.pendingProps;var oldProps=workInProgress.memoizedProps;var newValue=getContextCurrentValue(context);var changedBits=getContextChangedBits(context);if(hasContextChanged()){// Normally we can bail out on props equality but if context has changed
// we don't do the bailout and we have to reuse existing props instead.
}else if(changedBits===0&&oldProps===newProps){return bailoutOnAlreadyFinishedWork(current,workInProgress);}workInProgress.memoizedProps=newProps;var observedBits=newProps.unstable_observedBits;if(observedBits===undefined||observedBits===null){// Subscribe to all changes by default
observedBits=MAX_SIGNED_31_BIT_INT;}// Store the observedBits on the fiber's stateNode for quick access.
workInProgress.stateNode=observedBits;if((changedBits&observedBits)!==0){// Context change propagation stops at matching consumers, for time-
// slicing. Continue the propagation here.
propagateContextChange(workInProgress,context,changedBits,renderExpirationTime);}else if(oldProps===newProps){// Skip over a memoized parent with a bitmask bailout even
// if we began working on it because of a deeper matching child.
return bailoutOnAlreadyFinishedWork(current,workInProgress);}// There is no bailout on `children` equality because we expect people
// to often pass a bound method as a child, but it may reference
// `this.state` or `this.props` (and thus needs to re-render on `setState`).
var render=newProps.children;{!(typeof render==='function')?warning(false,'A context consumer was rendered with multiple children, or a child '+"that isn't a function. A context consumer expects a single child "+'that is a function. If you did pass a function, make sure there '+'is no trailing or leading whitespace around it.'):void 0;}var newChildren=void 0;{ReactCurrentOwner.current=workInProgress;ReactDebugCurrentFiber.setCurrentPhase('render');newChildren=render(newValue);ReactDebugCurrentFiber.setCurrentPhase(null);}// React DevTools reads this flag.
workInProgress.effectTag|=PerformedWork;reconcileChildren(current,workInProgress,newChildren);return workInProgress.child;}/*
  function reuseChildrenEffects(returnFiber : Fiber, firstChild : Fiber) {
    let child = firstChild;
    do {
      // Ensure that the first and last effect of the parent corresponds
      // to the children's first and last effect.
      if (!returnFiber.firstEffect) {
        returnFiber.firstEffect = child.firstEffect;
      }
      if (child.lastEffect) {
        if (returnFiber.lastEffect) {
          returnFiber.lastEffect.nextEffect = child.firstEffect;
        }
        returnFiber.lastEffect = child.lastEffect;
      }
    } while (child = child.sibling);
  }
  */function bailoutOnAlreadyFinishedWork(current,workInProgress){cancelWorkTimer(workInProgress);if(enableProfilerTimer){// Don't update "base" render times for bailouts.
stopBaseRenderTimerIfRunning();}// TODO: We should ideally be able to bail out early if the children have no
// more work to do. However, since we don't have a separation of this
// Fiber's priority and its children yet - we don't know without doing lots
// of the same work we do anyway. Once we have that separation we can just
// bail out here if the children has no more work at this priority level.
// if (workInProgress.priorityOfChildren <= priorityLevel) {
//   // If there are side-effects in these children that have not yet been
//   // committed we need to ensure that they get properly transferred up.
//   if (current && current.child !== workInProgress.child) {
//     reuseChildrenEffects(workInProgress, child);
//   }
//   return null;
// }
cloneChildFibers(current,workInProgress);return workInProgress.child;}function bailoutOnLowPriority(current,workInProgress){cancelWorkTimer(workInProgress);if(enableProfilerTimer){// Don't update "base" render times for bailouts.
stopBaseRenderTimerIfRunning();}// TODO: Handle HostComponent tags here as well and call pushHostContext()?
// See PR 8590 discussion for context
switch(workInProgress.tag){case HostRoot:pushHostRootContext(workInProgress);break;case ClassComponent:pushContextProvider(workInProgress);break;case HostPortal:pushHostContainer(workInProgress,workInProgress.stateNode.containerInfo);break;case ContextProvider:pushProvider(workInProgress);break;case Profiler:if(enableProfilerTimer){markActualRenderTimeStarted(workInProgress);}break;}// TODO: What if this is currently in progress?
// How can that happen? How is this not being cloned?
return null;}// TODO: Delete memoizeProps/State and move to reconcile/bailout instead
function memoizeProps(workInProgress,nextProps){workInProgress.memoizedProps=nextProps;}function memoizeState(workInProgress,nextState){workInProgress.memoizedState=nextState;// Don't reset the updateQueue, in case there are pending updates. Resetting
// is handled by processUpdateQueue.
}function beginWork(current,workInProgress,renderExpirationTime){if(workInProgress.expirationTime===NoWork||workInProgress.expirationTime>renderExpirationTime){return bailoutOnLowPriority(current,workInProgress);}switch(workInProgress.tag){case IndeterminateComponent:return mountIndeterminateComponent(current,workInProgress,renderExpirationTime);case FunctionalComponent:return updateFunctionalComponent(current,workInProgress);case ClassComponent:return updateClassComponent(current,workInProgress,renderExpirationTime);case HostRoot:return updateHostRoot(current,workInProgress,renderExpirationTime);case HostComponent:return updateHostComponent(current,workInProgress,renderExpirationTime);case HostText:return updateHostText(current,workInProgress);case TimeoutComponent:return updateTimeoutComponent(current,workInProgress,renderExpirationTime);case HostPortal:return updatePortalComponent(current,workInProgress,renderExpirationTime);case ForwardRef:return updateForwardRef(current,workInProgress);case Fragment:return updateFragment(current,workInProgress);case Mode:return updateMode(current,workInProgress);case Profiler:return updateProfiler(current,workInProgress);case ContextProvider:return updateContextProvider(current,workInProgress,renderExpirationTime);case ContextConsumer:return updateContextConsumer(current,workInProgress,renderExpirationTime);default:invariant(false,'Unknown unit of work tag. This error is likely caused by a bug in React. Please file an issue.');}}function markUpdate(workInProgress){// Tag the fiber with an update effect. This turns a Placement into
// a PlacementAndUpdate.
workInProgress.effectTag|=Update;}function markRef$1(workInProgress){workInProgress.effectTag|=Ref;}function appendAllChildren(parent,workInProgress){// We only have the top Fiber that was created but we need recurse down its
// children to find all the terminal nodes.
var node=workInProgress.child;while(node!==null){if(node.tag===HostComponent||node.tag===HostText){appendInitialChild(parent,node.stateNode);}else if(node.tag===HostPortal){// If we have a portal child, then we don't want to traverse
// down its children. Instead, we'll get insertions from each child in
// the portal directly.
}else if(node.child!==null){node.child.return=node;node=node.child;continue;}if(node===workInProgress){return;}while(node.sibling===null){if(node.return===null||node.return===workInProgress){return;}node=node.return;}node.sibling.return=node.return;node=node.sibling;}}var updateHostContainer=void 0;var updateHostComponent$1=void 0;var updateHostText$1=void 0;if(supportsMutation){// Mutation mode
updateHostContainer=function updateHostContainer(workInProgress){// Noop
};updateHostComponent$1=function updateHostComponent$1(current,workInProgress,updatePayload,type,oldProps,newProps,rootContainerInstance,currentHostContext){// TODO: Type this specific to this type of component.
workInProgress.updateQueue=updatePayload;// If the update payload indicates that there is a change or if there
// is a new ref we mark this as an update. All the work is done in commitWork.
if(updatePayload){markUpdate(workInProgress);}};updateHostText$1=function updateHostText$1(current,workInProgress,oldText,newText){// If the text differs, mark it as an update. All the work in done in commitWork.
if(oldText!==newText){markUpdate(workInProgress);}};}else if(supportsPersistence){// Persistent host tree mode
// An unfortunate fork of appendAllChildren because we have two different parent types.
var appendAllChildrenToContainer=function appendAllChildrenToContainer(containerChildSet,workInProgress){// We only have the top Fiber that was created but we need recurse down its
// children to find all the terminal nodes.
var node=workInProgress.child;while(node!==null){if(node.tag===HostComponent||node.tag===HostText){appendChildToContainerChildSet(containerChildSet,node.stateNode);}else if(node.tag===HostPortal){// If we have a portal child, then we don't want to traverse
// down its children. Instead, we'll get insertions from each child in
// the portal directly.
}else if(node.child!==null){node.child.return=node;node=node.child;continue;}if(node===workInProgress){return;}while(node.sibling===null){if(node.return===null||node.return===workInProgress){return;}node=node.return;}node.sibling.return=node.return;node=node.sibling;}};updateHostContainer=function updateHostContainer(workInProgress){var portalOrRoot=workInProgress.stateNode;var childrenUnchanged=workInProgress.firstEffect===null;if(childrenUnchanged){// No changes, just reuse the existing instance.
}else{var container=portalOrRoot.containerInfo;var newChildSet=createContainerChildSet(container);// If children might have changed, we have to add them all to the set.
appendAllChildrenToContainer(newChildSet,workInProgress);portalOrRoot.pendingChildren=newChildSet;// Schedule an update on the container to swap out the container.
markUpdate(workInProgress);finalizeContainerChildren(container,newChildSet);}};updateHostComponent$1=function updateHostComponent$1(current,workInProgress,updatePayload,type,oldProps,newProps,rootContainerInstance,currentHostContext){// If there are no effects associated with this node, then none of our children had any updates.
// This guarantees that we can reuse all of them.
var childrenUnchanged=workInProgress.firstEffect===null;var currentInstance=current.stateNode;if(childrenUnchanged&&updatePayload===null){// No changes, just reuse the existing instance.
// Note that this might release a previous clone.
workInProgress.stateNode=currentInstance;}else{var recyclableInstance=workInProgress.stateNode;var newInstance=cloneInstance(currentInstance,updatePayload,type,oldProps,newProps,workInProgress,childrenUnchanged,recyclableInstance);if(finalizeInitialChildren(newInstance,type,newProps,rootContainerInstance,currentHostContext)){markUpdate(workInProgress);}workInProgress.stateNode=newInstance;if(childrenUnchanged){// If there are no other effects in this tree, we need to flag this node as having one.
// Even though we're not going to use it for anything.
// Otherwise parents won't know that there are new children to propagate upwards.
markUpdate(workInProgress);}else{// If children might have changed, we have to add them all to the set.
appendAllChildren(newInstance,workInProgress);}}};updateHostText$1=function updateHostText$1(current,workInProgress,oldText,newText){if(oldText!==newText){// If the text content differs, we'll create a new text instance for it.
var rootContainerInstance=getRootHostContainer();var currentHostContext=getHostContext();workInProgress.stateNode=createTextInstance(newText,rootContainerInstance,currentHostContext,workInProgress);// We'll have to mark it as having an effect, even though we won't use the effect for anything.
// This lets the parents know that at least one of their children has changed.
markUpdate(workInProgress);}};}else{// No host operations
updateHostContainer=function updateHostContainer(workInProgress){// Noop
};updateHostComponent$1=function updateHostComponent$1(current,workInProgress,updatePayload,type,oldProps,newProps,rootContainerInstance,currentHostContext){// Noop
};updateHostText$1=function updateHostText$1(current,workInProgress,oldText,newText){// Noop
};}function completeWork(current,workInProgress,renderExpirationTime){var newProps=workInProgress.pendingProps;switch(workInProgress.tag){case FunctionalComponent:return null;case ClassComponent:{// We are leaving this subtree, so pop context if any.
popContextProvider(workInProgress);return null;}case HostRoot:{popHostContainer(workInProgress);popTopLevelContextObject(workInProgress);var fiberRoot=workInProgress.stateNode;if(fiberRoot.pendingContext){fiberRoot.context=fiberRoot.pendingContext;fiberRoot.pendingContext=null;}if(current===null||current.child===null){// If we hydrated, pop so that we can delete any remaining children
// that weren't hydrated.
popHydrationState(workInProgress);// This resets the hacky state to fix isMounted before committing.
// TODO: Delete this when we delete isMounted and findDOMNode.
workInProgress.effectTag&=~Placement;}updateHostContainer(workInProgress);return null;}case HostComponent:{popHostContext(workInProgress);var rootContainerInstance=getRootHostContainer();var type=workInProgress.type;if(current!==null&&workInProgress.stateNode!=null){// If we have an alternate, that means this is an update and we need to
// schedule a side-effect to do the updates.
var oldProps=current.memoizedProps;// If we get updated because one of our children updated, we don't
// have newProps so we'll have to reuse them.
// TODO: Split the update API as separate for the props vs. children.
// Even better would be if children weren't special cased at all tho.
var instance=workInProgress.stateNode;var currentHostContext=getHostContext();// TODO: Experiencing an error where oldProps is null. Suggests a host
// component is hitting the resume path. Figure out why. Possibly
// related to `hidden`.
var updatePayload=prepareUpdate(instance,type,oldProps,newProps,rootContainerInstance,currentHostContext);updateHostComponent$1(current,workInProgress,updatePayload,type,oldProps,newProps,rootContainerInstance,currentHostContext);if(current.ref!==workInProgress.ref){markRef$1(workInProgress);}}else{if(!newProps){!(workInProgress.stateNode!==null)?invariant(false,'We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.'):void 0;// This can happen when we abort work.
return null;}var _currentHostContext=getHostContext();// TODO: Move createInstance to beginWork and keep it on a context
// "stack" as the parent. Then append children as we go in beginWork
// or completeWork depending on we want to add then top->down or
// bottom->up. Top->down is faster in IE11.
var wasHydrated=popHydrationState(workInProgress);if(wasHydrated){// TODO: Move this and createInstance step into the beginPhase
// to consolidate.
if(prepareToHydrateHostInstance(workInProgress,rootContainerInstance,_currentHostContext)){// If changes to the hydrated node needs to be applied at the
// commit-phase we mark this as such.
markUpdate(workInProgress);}}else{var _instance=createInstance(type,newProps,rootContainerInstance,_currentHostContext,workInProgress);appendAllChildren(_instance,workInProgress);// Certain renderers require commit-time effects for initial mount.
// (eg DOM renderer supports auto-focus for certain elements).
// Make sure such renderers get scheduled for later work.
if(finalizeInitialChildren(_instance,type,newProps,rootContainerInstance,_currentHostContext)){markUpdate(workInProgress);}workInProgress.stateNode=_instance;}if(workInProgress.ref!==null){// If there is a ref on a host node we need to schedule a callback
markRef$1(workInProgress);}}return null;}case HostText:{var newText=newProps;if(current&&workInProgress.stateNode!=null){var oldText=current.memoizedProps;// If we have an alternate, that means this is an update and we need
// to schedule a side-effect to do the updates.
updateHostText$1(current,workInProgress,oldText,newText);}else{if(typeof newText!=='string'){!(workInProgress.stateNode!==null)?invariant(false,'We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.'):void 0;// This can happen when we abort work.
return null;}var _rootContainerInstance=getRootHostContainer();var _currentHostContext2=getHostContext();var _wasHydrated=popHydrationState(workInProgress);if(_wasHydrated){if(prepareToHydrateHostTextInstance(workInProgress)){markUpdate(workInProgress);}}else{workInProgress.stateNode=createTextInstance(newText,_rootContainerInstance,_currentHostContext2,workInProgress);}}return null;}case ForwardRef:return null;case TimeoutComponent:return null;case Fragment:return null;case Mode:return null;case Profiler:if(enableProfilerTimer){recordElapsedActualRenderTime(workInProgress);}return null;case HostPortal:popHostContainer(workInProgress);updateHostContainer(workInProgress);return null;case ContextProvider:// Pop provider fiber
popProvider(workInProgress);return null;case ContextConsumer:return null;// Error cases
case IndeterminateComponent:invariant(false,'An indeterminate component should have become determinate before completing. This error is likely caused by a bug in React. Please file an issue.');// eslint-disable-next-line no-fallthrough
default:invariant(false,'Unknown unit of work tag. This error is likely caused by a bug in React. Please file an issue.');}}// This module is forked in different environments.
// By default, return `true` to log errors to the console.
// Forks can return `false` if this isn't desirable.
function showErrorDialog(capturedError){return true;}function logCapturedError(capturedError){var logError=showErrorDialog(capturedError);// Allow injected showErrorDialog() to prevent default console.error logging.
// This enables renderers like ReactNative to better manage redbox behavior.
if(logError===false){return;}var error=capturedError.error;var suppressLogging=error&&error.suppressReactErrorLogging;if(suppressLogging){return;}{var componentName=capturedError.componentName,componentStack=capturedError.componentStack,errorBoundaryName=capturedError.errorBoundaryName,errorBoundaryFound=capturedError.errorBoundaryFound,willRetry=capturedError.willRetry;var componentNameMessage=componentName?'The above error occurred in the <'+componentName+'> component:':'The above error occurred in one of your React components:';var errorBoundaryMessage=void 0;// errorBoundaryFound check is sufficient; errorBoundaryName check is to satisfy Flow.
if(errorBoundaryFound&&errorBoundaryName){if(willRetry){errorBoundaryMessage='React will try to recreate this component tree from scratch '+('using the error boundary you provided, '+errorBoundaryName+'.');}else{errorBoundaryMessage='This error was initially handled by the error boundary '+errorBoundaryName+'.\n'+'Recreating the tree from scratch failed so React will unmount the tree.';}}else{errorBoundaryMessage='Consider adding an error boundary to your tree to customize error handling behavior.\n'+'Visit https://fb.me/react-error-boundaries to learn more about error boundaries.';}var combinedMessage=''+componentNameMessage+componentStack+'\n\n'+(''+errorBoundaryMessage);// In development, we provide our own message with just the component stack.
// We don't include the original error message and JS stack because the browser
// has already printed it. Even if the application swallows the error, it is still
// displayed by the browser thanks to the DEV-only fake event trick in ReactErrorUtils.
console.error(combinedMessage);}}var invokeGuardedCallback$3=ReactErrorUtils.invokeGuardedCallback;var hasCaughtError$1=ReactErrorUtils.hasCaughtError;var clearCaughtError$1=ReactErrorUtils.clearCaughtError;var didWarnAboutUndefinedSnapshotBeforeUpdate=null;{didWarnAboutUndefinedSnapshotBeforeUpdate=new Set();}function logError(boundary,errorInfo){var source=errorInfo.source;var stack=errorInfo.stack;if(stack===null&&source!==null){stack=getStackAddendumByWorkInProgressFiber(source);}var capturedError={componentName:source!==null?getComponentName(source):null,componentStack:stack!==null?stack:'',error:errorInfo.value,errorBoundary:null,errorBoundaryName:null,errorBoundaryFound:false,willRetry:false};if(boundary!==null&&boundary.tag===ClassComponent){capturedError.errorBoundary=boundary.stateNode;capturedError.errorBoundaryName=getComponentName(boundary);capturedError.errorBoundaryFound=true;capturedError.willRetry=true;}try{logCapturedError(capturedError);}catch(e){// Prevent cycle if logCapturedError() throws.
// A cycle may still occur if logCapturedError renders a component that throws.
var suppressLogging=e&&e.suppressReactErrorLogging;if(!suppressLogging){console.error(e);}}}var callComponentWillUnmountWithTimer=function callComponentWillUnmountWithTimer(current,instance){startPhaseTimer(current,'componentWillUnmount');instance.props=current.memoizedProps;instance.state=current.memoizedState;instance.componentWillUnmount();stopPhaseTimer();};// Capture errors so they don't interrupt unmounting.
function safelyCallComponentWillUnmount(current,instance){{invokeGuardedCallback$3(null,callComponentWillUnmountWithTimer,null,current,instance);if(hasCaughtError$1()){var unmountError=clearCaughtError$1();captureCommitPhaseError(current,unmountError);}}}function safelyDetachRef(current){var ref=current.ref;if(ref!==null){if(typeof ref==='function'){{invokeGuardedCallback$3(null,ref,null,null);if(hasCaughtError$1()){var refError=clearCaughtError$1();captureCommitPhaseError(current,refError);}}}else{ref.current=null;}}}function commitBeforeMutationLifeCycles(current,finishedWork){switch(finishedWork.tag){case ClassComponent:{if(finishedWork.effectTag&Snapshot){if(current!==null){var prevProps=current.memoizedProps;var prevState=current.memoizedState;startPhaseTimer(finishedWork,'getSnapshotBeforeUpdate');var instance=finishedWork.stateNode;instance.props=finishedWork.memoizedProps;instance.state=finishedWork.memoizedState;var snapshot=instance.getSnapshotBeforeUpdate(prevProps,prevState);{var didWarnSet=didWarnAboutUndefinedSnapshotBeforeUpdate;if(snapshot===undefined&&!didWarnSet.has(finishedWork.type)){didWarnSet.add(finishedWork.type);warning(false,'%s.getSnapshotBeforeUpdate(): A snapshot value (or null) '+'must be returned. You have returned undefined.',getComponentName(finishedWork));}}instance.__reactInternalSnapshotBeforeUpdate=snapshot;stopPhaseTimer();}}return;}case HostRoot:case HostComponent:case HostText:case HostPortal:// Nothing to do for these component types
return;default:{invariant(false,'This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.');}}}function commitLifeCycles(finishedRoot,current,finishedWork,currentTime,committedExpirationTime){switch(finishedWork.tag){case ClassComponent:{var instance=finishedWork.stateNode;if(finishedWork.effectTag&Update){if(current===null){startPhaseTimer(finishedWork,'componentDidMount');instance.props=finishedWork.memoizedProps;instance.state=finishedWork.memoizedState;instance.componentDidMount();stopPhaseTimer();}else{var prevProps=current.memoizedProps;var prevState=current.memoizedState;startPhaseTimer(finishedWork,'componentDidUpdate');instance.props=finishedWork.memoizedProps;instance.state=finishedWork.memoizedState;instance.componentDidUpdate(prevProps,prevState,instance.__reactInternalSnapshotBeforeUpdate);stopPhaseTimer();}}var updateQueue=finishedWork.updateQueue;if(updateQueue!==null){instance.props=finishedWork.memoizedProps;instance.state=finishedWork.memoizedState;commitUpdateQueue(finishedWork,updateQueue,instance,committedExpirationTime);}return;}case HostRoot:{var _updateQueue=finishedWork.updateQueue;if(_updateQueue!==null){var _instance=null;if(finishedWork.child!==null){switch(finishedWork.child.tag){case HostComponent:_instance=getPublicInstance(finishedWork.child.stateNode);break;case ClassComponent:_instance=finishedWork.child.stateNode;break;}}commitUpdateQueue(finishedWork,_updateQueue,_instance,committedExpirationTime);}return;}case HostComponent:{var _instance2=finishedWork.stateNode;// Renderers may schedule work to be done after host components are mounted
// (eg DOM renderer may schedule auto-focus for inputs and form controls).
// These effects should only be committed when components are first mounted,
// aka when there is no current/alternate.
if(current===null&&finishedWork.effectTag&Update){var type=finishedWork.type;var props=finishedWork.memoizedProps;commitMount(_instance2,type,props,finishedWork);}return;}case HostText:{// We have no life-cycles associated with text.
return;}case HostPortal:{// We have no life-cycles associated with portals.
return;}case Profiler:{// We have no life-cycles associated with Profiler.
return;}case TimeoutComponent:{// We have no life-cycles associated with Timeouts.
return;}default:{invariant(false,'This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.');}}}function commitAttachRef(finishedWork){var ref=finishedWork.ref;if(ref!==null){var instance=finishedWork.stateNode;var instanceToUse=void 0;switch(finishedWork.tag){case HostComponent:instanceToUse=getPublicInstance(instance);break;default:instanceToUse=instance;}if(typeof ref==='function'){ref(instanceToUse);}else{{if(!ref.hasOwnProperty('current')){warning(false,'Unexpected ref object provided for %s. '+'Use either a ref-setter function or React.createRef().%s',getComponentName(finishedWork),getStackAddendumByWorkInProgressFiber(finishedWork));}}ref.current=instanceToUse;}}}function commitDetachRef(current){var currentRef=current.ref;if(currentRef!==null){if(typeof currentRef==='function'){currentRef(null);}else{currentRef.current=null;}}}// User-originating errors (lifecycles and refs) should not interrupt
// deletion, so don't let them throw. Host-originating errors should
// interrupt deletion, so it's okay
function commitUnmount(current){if(typeof onCommitUnmount==='function'){onCommitUnmount(current);}switch(current.tag){case ClassComponent:{safelyDetachRef(current);var instance=current.stateNode;if(typeof instance.componentWillUnmount==='function'){safelyCallComponentWillUnmount(current,instance);}return;}case HostComponent:{safelyDetachRef(current);return;}case HostPortal:{// TODO: this is recursive.
// We are also not using this parent because
// the portal will get pushed immediately.
if(supportsMutation){unmountHostComponents(current);}else if(supportsPersistence){emptyPortalContainer(current);}return;}}}function commitNestedUnmounts(root){// While we're inside a removed host node we don't want to call
// removeChild on the inner nodes because they're removed by the top
// call anyway. We also want to call componentWillUnmount on all
// composites before this host node is removed from the tree. Therefore
var node=root;while(true){commitUnmount(node);// Visit children because they may contain more composite or host nodes.
// Skip portals because commitUnmount() currently visits them recursively.
if(node.child!==null&&(// If we use mutation we drill down into portals using commitUnmount above.
// If we don't use mutation we drill down into portals here instead.
!supportsMutation||node.tag!==HostPortal)){node.child.return=node;node=node.child;continue;}if(node===root){return;}while(node.sibling===null){if(node.return===null||node.return===root){return;}node=node.return;}node.sibling.return=node.return;node=node.sibling;}}function detachFiber(current){// Cut off the return pointers to disconnect it from the tree. Ideally, we
// should clear the child pointer of the parent alternate to let this
// get GC:ed but we don't know which for sure which parent is the current
// one so we'll settle for GC:ing the subtree of this child. This child
// itself will be GC:ed when the parent updates the next time.
current.return=null;current.child=null;if(current.alternate){current.alternate.child=null;current.alternate.return=null;}}function emptyPortalContainer(current){if(!supportsPersistence){return;}var portal=current.stateNode;var containerInfo=portal.containerInfo;var emptyChildSet=createContainerChildSet(containerInfo);replaceContainerChildren(containerInfo,emptyChildSet);}function commitContainer(finishedWork){if(!supportsPersistence){return;}switch(finishedWork.tag){case ClassComponent:{return;}case HostComponent:{return;}case HostText:{return;}case HostRoot:case HostPortal:{var portalOrRoot=finishedWork.stateNode;var containerInfo=portalOrRoot.containerInfo,_pendingChildren=portalOrRoot.pendingChildren;replaceContainerChildren(containerInfo,_pendingChildren);return;}default:{invariant(false,'This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.');}}}function getHostParentFiber(fiber){var parent=fiber.return;while(parent!==null){if(isHostParent(parent)){return parent;}parent=parent.return;}invariant(false,'Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.');}function isHostParent(fiber){return fiber.tag===HostComponent||fiber.tag===HostRoot||fiber.tag===HostPortal;}function getHostSibling(fiber){// We're going to search forward into the tree until we find a sibling host
// node. Unfortunately, if multiple insertions are done in a row we have to
// search past them. This leads to exponential search for the next sibling.
var node=fiber;siblings:while(true){// If we didn't find anything, let's try the next sibling.
while(node.sibling===null){if(node.return===null||isHostParent(node.return)){// If we pop out of the root or hit the parent the fiber we are the
// last sibling.
return null;}node=node.return;}node.sibling.return=node.return;node=node.sibling;while(node.tag!==HostComponent&&node.tag!==HostText){// If it is not host node and, we might have a host node inside it.
// Try to search down until we find one.
if(node.effectTag&Placement){// If we don't have a child, try the siblings instead.
continue siblings;}// If we don't have a child, try the siblings instead.
// We also skip portals because they are not part of this host tree.
if(node.child===null||node.tag===HostPortal){continue siblings;}else{node.child.return=node;node=node.child;}}// Check if this host node is stable or about to be placed.
if(!(node.effectTag&Placement)){// Found it!
return node.stateNode;}}}function commitPlacement(finishedWork){if(!supportsMutation){return;}// Recursively insert all host nodes into the parent.
var parentFiber=getHostParentFiber(finishedWork);var parent=void 0;var isContainer=void 0;switch(parentFiber.tag){case HostComponent:parent=parentFiber.stateNode;isContainer=false;break;case HostRoot:parent=parentFiber.stateNode.containerInfo;isContainer=true;break;case HostPortal:parent=parentFiber.stateNode.containerInfo;isContainer=true;break;default:invariant(false,'Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.');}if(parentFiber.effectTag&ContentReset){// Reset the text content of the parent before doing any insertions
resetTextContent(parent);// Clear ContentReset from the effect tag
parentFiber.effectTag&=~ContentReset;}var before=getHostSibling(finishedWork);// We only have the top Fiber that was inserted but we need recurse down its
// children to find all the terminal nodes.
var node=finishedWork;while(true){if(node.tag===HostComponent||node.tag===HostText){if(before){if(isContainer){insertInContainerBefore(parent,node.stateNode,before);}else{insertBefore(parent,node.stateNode,before);}}else{if(isContainer){appendChildToContainer(parent,node.stateNode);}else{appendChild(parent,node.stateNode);}}}else if(node.tag===HostPortal){// If the insertion itself is a portal, then we don't want to traverse
// down its children. Instead, we'll get insertions from each child in
// the portal directly.
}else if(node.child!==null){node.child.return=node;node=node.child;continue;}if(node===finishedWork){return;}while(node.sibling===null){if(node.return===null||node.return===finishedWork){return;}node=node.return;}node.sibling.return=node.return;node=node.sibling;}}function unmountHostComponents(current){// We only have the top Fiber that was inserted but we need recurse down its
var node=current;// Each iteration, currentParent is populated with node's host parent if not
// currentParentIsValid.
var currentParentIsValid=false;var currentParent=void 0;var currentParentIsContainer=void 0;while(true){if(!currentParentIsValid){var parent=node.return;findParent:while(true){!(parent!==null)?invariant(false,'Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.'):void 0;switch(parent.tag){case HostComponent:currentParent=parent.stateNode;currentParentIsContainer=false;break findParent;case HostRoot:currentParent=parent.stateNode.containerInfo;currentParentIsContainer=true;break findParent;case HostPortal:currentParent=parent.stateNode.containerInfo;currentParentIsContainer=true;break findParent;}parent=parent.return;}currentParentIsValid=true;}if(node.tag===HostComponent||node.tag===HostText){commitNestedUnmounts(node);// After all the children have unmounted, it is now safe to remove the
// node from the tree.
if(currentParentIsContainer){removeChildFromContainer(currentParent,node.stateNode);}else{removeChild(currentParent,node.stateNode);}// Don't visit children because we already visited them.
}else if(node.tag===HostPortal){// When we go into a portal, it becomes the parent to remove from.
// We will reassign it back when we pop the portal on the way up.
currentParent=node.stateNode.containerInfo;// Visit children because portals might contain host components.
if(node.child!==null){node.child.return=node;node=node.child;continue;}}else{commitUnmount(node);// Visit children because we may find more host components below.
if(node.child!==null){node.child.return=node;node=node.child;continue;}}if(node===current){return;}while(node.sibling===null){if(node.return===null||node.return===current){return;}node=node.return;if(node.tag===HostPortal){// When we go out of the portal, we need to restore the parent.
// Since we don't keep a stack of them, we will search for it.
currentParentIsValid=false;}}node.sibling.return=node.return;node=node.sibling;}}function commitDeletion(current){if(supportsMutation){// Recursively delete all host nodes from the parent.
// Detach refs and call componentWillUnmount() on the whole subtree.
unmountHostComponents(current);}else{// Detach refs and call componentWillUnmount() on the whole subtree.
commitNestedUnmounts(current);}detachFiber(current);}function commitWork(current,finishedWork){if(!supportsMutation){commitContainer(finishedWork);return;}switch(finishedWork.tag){case ClassComponent:{return;}case HostComponent:{var instance=finishedWork.stateNode;if(instance!=null){// Commit the work prepared earlier.
var newProps=finishedWork.memoizedProps;// For hydration we reuse the update path but we treat the oldProps
// as the newProps. The updatePayload will contain the real change in
// this case.
var oldProps=current!==null?current.memoizedProps:newProps;var type=finishedWork.type;// TODO: Type the updateQueue to be specific to host components.
var updatePayload=finishedWork.updateQueue;finishedWork.updateQueue=null;if(updatePayload!==null){commitUpdate(instance,updatePayload,type,oldProps,newProps,finishedWork);}}return;}case HostText:{!(finishedWork.stateNode!==null)?invariant(false,'This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.'):void 0;var textInstance=finishedWork.stateNode;var newText=finishedWork.memoizedProps;// For hydration we reuse the update path but we treat the oldProps
// as the newProps. The updatePayload will contain the real change in
// this case.
var oldText=current!==null?current.memoizedProps:newText;commitTextUpdate(textInstance,oldText,newText);return;}case HostRoot:{return;}case Profiler:{if(enableProfilerTimer){var onRender=finishedWork.memoizedProps.onRender;onRender(finishedWork.memoizedProps.id,current===null?'mount':'update',finishedWork.stateNode.duration,finishedWork.treeBaseTime,finishedWork.stateNode.startTime,getCommitTime());// Reset actualTime after successful commit.
// By default, we append to this time to account for errors and pauses.
finishedWork.stateNode.duration=0;}return;}case TimeoutComponent:{return;}default:{invariant(false,'This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.');}}}function commitResetTextContent(current){if(!supportsMutation){return;}resetTextContent(current.stateNode);}function createRootErrorUpdate(fiber,errorInfo,expirationTime){var update=createUpdate(expirationTime);// Unmount the root by rendering null.
update.tag=CaptureUpdate;// Caution: React DevTools currently depends on this property
// being called "element".
update.payload={element:null};var error=errorInfo.value;update.callback=function(){onUncaughtError(error);logError(fiber,errorInfo);};return update;}function createClassErrorUpdate(fiber,errorInfo,expirationTime){var update=createUpdate(expirationTime);update.tag=CaptureUpdate;var getDerivedStateFromCatch=fiber.type.getDerivedStateFromCatch;if(enableGetDerivedStateFromCatch&&typeof getDerivedStateFromCatch==='function'){var error=errorInfo.value;update.payload=function(){return getDerivedStateFromCatch(error);};}var inst=fiber.stateNode;if(inst!==null&&typeof inst.componentDidCatch==='function'){update.callback=function callback(){if(!enableGetDerivedStateFromCatch||getDerivedStateFromCatch!=='function'){// To preserve the preexisting retry behavior of error boundaries,
// we keep track of which ones already failed during this batch.
// This gets reset before we yield back to the browser.
// TODO: Warn in strict mode if getDerivedStateFromCatch is
// not defined.
markLegacyErrorBoundaryAsFailed(this);}var error=errorInfo.value;var stack=errorInfo.stack;logError(fiber,errorInfo);this.componentDidCatch(error,{componentStack:stack!==null?stack:''});};}return update;}function schedulePing(finishedWork){// Once the promise resolves, we should try rendering the non-
// placeholder state again.
var currentTime=recalculateCurrentTime();var expirationTime=computeExpirationForFiber(currentTime,finishedWork);var recoveryUpdate=createUpdate(expirationTime);enqueueUpdate(finishedWork,recoveryUpdate,expirationTime);scheduleWork$1(finishedWork,expirationTime);}function throwException(root,returnFiber,sourceFiber,value,renderIsExpired,renderExpirationTime,currentTimeMs){// The source fiber did not complete.
sourceFiber.effectTag|=Incomplete;// Its effect list is no longer valid.
sourceFiber.firstEffect=sourceFiber.lastEffect=null;if(enableSuspense&&value!==null&&(typeof value==='undefined'?'undefined':_typeof(value))==='object'&&typeof value.then==='function'){// This is a thenable.
var thenable=value;var expirationTimeMs=expirationTimeToMs(renderExpirationTime);var startTimeMs=expirationTimeMs-5000;var elapsedMs=currentTimeMs-startTimeMs;if(elapsedMs<0){elapsedMs=0;}var remainingTimeMs=expirationTimeMs-currentTimeMs;// Find the earliest timeout of all the timeouts in the ancestor path.
// TODO: Alternatively, we could store the earliest timeout on the context
// stack, rather than searching on every suspend.
var _workInProgress=returnFiber;var earliestTimeoutMs=-1;searchForEarliestTimeout:do{if(_workInProgress.tag===TimeoutComponent){var current=_workInProgress.alternate;if(current!==null&&current.memoizedState===true){// A parent Timeout already committed in a placeholder state. We
// need to handle this promise immediately. In other words, we
// should never suspend inside a tree that already expired.
earliestTimeoutMs=0;break searchForEarliestTimeout;}var timeoutPropMs=_workInProgress.pendingProps.ms;if(typeof timeoutPropMs==='number'){if(timeoutPropMs<=0){earliestTimeoutMs=0;break searchForEarliestTimeout;}else if(earliestTimeoutMs===-1||timeoutPropMs<earliestTimeoutMs){earliestTimeoutMs=timeoutPropMs;}}else if(earliestTimeoutMs===-1){earliestTimeoutMs=remainingTimeMs;}}_workInProgress=_workInProgress.return;}while(_workInProgress!==null);// Compute the remaining time until the timeout.
var msUntilTimeout=earliestTimeoutMs-elapsedMs;if(renderExpirationTime===Never||msUntilTimeout>0){// There's still time remaining.
suspendRoot(root,thenable,msUntilTimeout,renderExpirationTime);var onResolveOrReject=function onResolveOrReject(){retrySuspendedRoot(root,renderExpirationTime);};thenable.then(onResolveOrReject,onResolveOrReject);return;}else{// No time remaining. Need to fallback to placeholder.
// Find the nearest timeout that can be retried.
_workInProgress=returnFiber;do{switch(_workInProgress.tag){case HostRoot:{// The root expired, but no fallback was provided. Throw a
// helpful error.
var message=renderExpirationTime===Sync?'A synchronous update was suspended, but no fallback UI '+'was provided.':'An update was suspended for longer than the timeout, '+'but no fallback UI was provided.';value=new Error(message);break;}case TimeoutComponent:{if((_workInProgress.effectTag&DidCapture)===NoEffect){_workInProgress.effectTag|=ShouldCapture;var _onResolveOrReject=schedulePing.bind(null,_workInProgress);thenable.then(_onResolveOrReject,_onResolveOrReject);return;}// Already captured during this render. Continue to the next
// Timeout ancestor.
break;}}_workInProgress=_workInProgress.return;}while(_workInProgress!==null);}}// We didn't find a boundary that could handle this type of exception. Start
// over and traverse parent path again, this time treating the exception
// as an error.
value=createCapturedValue(value,sourceFiber);var workInProgress=returnFiber;do{switch(workInProgress.tag){case HostRoot:{var _errorInfo=value;workInProgress.effectTag|=ShouldCapture;var update=createRootErrorUpdate(workInProgress,_errorInfo,renderExpirationTime);enqueueCapturedUpdate(workInProgress,update,renderExpirationTime);return;}case ClassComponent:// Capture and retry
var errorInfo=value;var ctor=workInProgress.type;var instance=workInProgress.stateNode;if((workInProgress.effectTag&DidCapture)===NoEffect&&(typeof ctor.getDerivedStateFromCatch==='function'&&enableGetDerivedStateFromCatch||instance!==null&&typeof instance.componentDidCatch==='function'&&!isAlreadyFailedLegacyErrorBoundary(instance))){workInProgress.effectTag|=ShouldCapture;// Schedule the error boundary to re-render using updated state
var _update=createClassErrorUpdate(workInProgress,errorInfo,renderExpirationTime);enqueueCapturedUpdate(workInProgress,_update,renderExpirationTime);return;}break;default:break;}workInProgress=workInProgress.return;}while(workInProgress!==null);}function unwindWork(workInProgress,renderIsExpired,renderExpirationTime){switch(workInProgress.tag){case ClassComponent:{popContextProvider(workInProgress);var effectTag=workInProgress.effectTag;if(effectTag&ShouldCapture){workInProgress.effectTag=effectTag&~ShouldCapture|DidCapture;return workInProgress;}return null;}case HostRoot:{popHostContainer(workInProgress);popTopLevelContextObject(workInProgress);var _effectTag=workInProgress.effectTag;if(_effectTag&ShouldCapture){workInProgress.effectTag=_effectTag&~ShouldCapture|DidCapture;return workInProgress;}return null;}case HostComponent:{popHostContext(workInProgress);return null;}case TimeoutComponent:{var _effectTag2=workInProgress.effectTag;if(_effectTag2&ShouldCapture){workInProgress.effectTag=_effectTag2&~ShouldCapture|DidCapture;return workInProgress;}return null;}case HostPortal:popHostContainer(workInProgress);return null;case ContextProvider:popProvider(workInProgress);return null;default:return null;}}function unwindInterruptedWork(interruptedWork){switch(interruptedWork.tag){case ClassComponent:{popContextProvider(interruptedWork);break;}case HostRoot:{popHostContainer(interruptedWork);popTopLevelContextObject(interruptedWork);break;}case HostComponent:{popHostContext(interruptedWork);break;}case HostPortal:popHostContainer(interruptedWork);break;case ContextProvider:popProvider(interruptedWork);break;case Profiler:if(enableProfilerTimer){// Resume in case we're picking up on work that was paused.
resumeActualRenderTimerIfPaused();recordElapsedActualRenderTime(interruptedWork);}break;default:break;}}var invokeGuardedCallback$2=ReactErrorUtils.invokeGuardedCallback;var hasCaughtError=ReactErrorUtils.hasCaughtError;var clearCaughtError=ReactErrorUtils.clearCaughtError;var didWarnAboutStateTransition=void 0;var didWarnSetStateChildContext=void 0;var warnAboutUpdateOnUnmounted=void 0;var warnAboutInvalidUpdates=void 0;{didWarnAboutStateTransition=false;didWarnSetStateChildContext=false;var didWarnStateUpdateForUnmountedComponent={};warnAboutUpdateOnUnmounted=function warnAboutUpdateOnUnmounted(fiber){// We show the whole stack but dedupe on the top component's name because
// the problematic code almost always lies inside that component.
var componentName=getComponentName(fiber)||'ReactClass';if(didWarnStateUpdateForUnmountedComponent[componentName]){return;}warning(false,"Can't call setState (or forceUpdate) on an unmounted component. This "+'is a no-op, but it indicates a memory leak in your application. To '+'fix, cancel all subscriptions and asynchronous tasks in the '+'componentWillUnmount method.%s',getStackAddendumByWorkInProgressFiber(fiber));didWarnStateUpdateForUnmountedComponent[componentName]=true;};warnAboutInvalidUpdates=function warnAboutInvalidUpdates(instance){switch(ReactDebugCurrentFiber.phase){case'getChildContext':if(didWarnSetStateChildContext){return;}warning(false,'setState(...): Cannot call setState() inside getChildContext()');didWarnSetStateChildContext=true;break;case'render':if(didWarnAboutStateTransition){return;}warning(false,'Cannot update during an existing state transition (such as within '+"`render` or another component's constructor). Render methods should "+'be a pure function of props and state; constructor side-effects are '+'an anti-pattern, but can be moved to `componentWillMount`.');didWarnAboutStateTransition=true;break;}};}// Represents the current time in ms.
var originalStartTimeMs=now();var mostRecentCurrentTime=msToExpirationTime(0);var mostRecentCurrentTimeMs=originalStartTimeMs;// Used to ensure computeUniqueAsyncExpiration is monotonically increases.
var lastUniqueAsyncExpiration=0;// Represents the expiration time that incoming updates should use. (If this
// is NoWork, use the default strategy: async updates in async mode, sync
// updates in sync mode.)
var expirationContext=NoWork;var isWorking=false;// The next work in progress fiber that we're currently working on.
var nextUnitOfWork=null;var nextRoot=null;// The time at which we're currently rendering work.
var nextRenderExpirationTime=NoWork;var nextLatestTimeoutMs=-1;var nextRenderIsExpired=false;// The next fiber with an effect that we're currently committing.
var nextEffect=null;var isCommitting$1=false;var isRootReadyForCommit=false;var legacyErrorBoundariesThatAlreadyFailed=null;// Used for performance tracking.
var interruptedBy=null;var stashedWorkInProgressProperties=void 0;var replayUnitOfWork=void 0;var isReplayingFailedUnitOfWork=void 0;var originalReplayError=void 0;var rethrowOriginalError=void 0;if(true&&replayFailedUnitOfWorkWithInvokeGuardedCallback){stashedWorkInProgressProperties=null;isReplayingFailedUnitOfWork=false;originalReplayError=null;replayUnitOfWork=function replayUnitOfWork(failedUnitOfWork,thrownValue,isAsync){if(thrownValue!==null&&(typeof thrownValue==='undefined'?'undefined':_typeof(thrownValue))==='object'&&typeof thrownValue.then==='function'){// Don't replay promises. Treat everything else like an error.
// TODO: Need to figure out a different strategy if/when we add
// support for catching other types.
return;}// Restore the original state of the work-in-progress
if(stashedWorkInProgressProperties===null){// This should never happen. Don't throw because this code is DEV-only.
warning(false,'Could not replay rendering after an error. This is likely a bug in React. '+'Please file an issue.');return;}assignFiberPropertiesInDEV(failedUnitOfWork,stashedWorkInProgressProperties);switch(failedUnitOfWork.tag){case HostRoot:popHostContainer(failedUnitOfWork);popTopLevelContextObject(failedUnitOfWork);break;case HostComponent:popHostContext(failedUnitOfWork);break;case ClassComponent:popContextProvider(failedUnitOfWork);break;case HostPortal:popHostContainer(failedUnitOfWork);break;case ContextProvider:popProvider(failedUnitOfWork);break;}// Replay the begin phase.
isReplayingFailedUnitOfWork=true;originalReplayError=thrownValue;invokeGuardedCallback$2(null,workLoop,null,isAsync);isReplayingFailedUnitOfWork=false;originalReplayError=null;if(hasCaughtError()){clearCaughtError();if(enableProfilerTimer){// Stop "base" render timer again (after the re-thrown error).
stopBaseRenderTimerIfRunning();}}else{// If the begin phase did not fail the second time, set this pointer
// back to the original value.
nextUnitOfWork=failedUnitOfWork;}};rethrowOriginalError=function rethrowOriginalError(){throw originalReplayError;};}function resetStack(){if(nextUnitOfWork!==null){var interruptedWork=nextUnitOfWork.return;while(interruptedWork!==null){unwindInterruptedWork(interruptedWork);interruptedWork=interruptedWork.return;}}{ReactStrictModeWarnings.discardPendingWarnings();checkThatStackIsEmpty();}nextRoot=null;nextRenderExpirationTime=NoWork;nextLatestTimeoutMs=-1;nextRenderIsExpired=false;nextUnitOfWork=null;isRootReadyForCommit=false;}function commitAllHostEffects(){while(nextEffect!==null){{ReactDebugCurrentFiber.setCurrentFiber(nextEffect);}recordEffect();var effectTag=nextEffect.effectTag;if(effectTag&ContentReset){commitResetTextContent(nextEffect);}if(effectTag&Ref){var current=nextEffect.alternate;if(current!==null){commitDetachRef(current);}}// The following switch statement is only concerned about placement,
// updates, and deletions. To avoid needing to add a case for every
// possible bitmap value, we remove the secondary effects from the
// effect tag and switch on that value.
var primaryEffectTag=effectTag&(Placement|Update|Deletion);switch(primaryEffectTag){case Placement:{commitPlacement(nextEffect);// Clear the "placement" from effect tag so that we know that this is inserted, before
// any life-cycles like componentDidMount gets called.
// TODO: findDOMNode doesn't rely on this any more but isMounted
// does and isMounted is deprecated anyway so we should be able
// to kill this.
nextEffect.effectTag&=~Placement;break;}case PlacementAndUpdate:{// Placement
commitPlacement(nextEffect);// Clear the "placement" from effect tag so that we know that this is inserted, before
// any life-cycles like componentDidMount gets called.
nextEffect.effectTag&=~Placement;// Update
var _current=nextEffect.alternate;commitWork(_current,nextEffect);break;}case Update:{var _current2=nextEffect.alternate;commitWork(_current2,nextEffect);break;}case Deletion:{commitDeletion(nextEffect);break;}}nextEffect=nextEffect.nextEffect;}{ReactDebugCurrentFiber.resetCurrentFiber();}}function commitBeforeMutationLifecycles(){while(nextEffect!==null){var effectTag=nextEffect.effectTag;if(effectTag&Snapshot){recordEffect();var current=nextEffect.alternate;commitBeforeMutationLifeCycles(current,nextEffect);}// Don't cleanup effects yet;
// This will be done by commitAllLifeCycles()
nextEffect=nextEffect.nextEffect;}}function commitAllLifeCycles(finishedRoot,currentTime,committedExpirationTime){{ReactStrictModeWarnings.flushPendingUnsafeLifecycleWarnings();if(warnAboutDeprecatedLifecycles){ReactStrictModeWarnings.flushPendingDeprecationWarnings();}if(warnAboutLegacyContextAPI){ReactStrictModeWarnings.flushLegacyContextWarning();}}while(nextEffect!==null){var effectTag=nextEffect.effectTag;if(effectTag&(Update|Callback)){recordEffect();var current=nextEffect.alternate;commitLifeCycles(finishedRoot,current,nextEffect,currentTime,committedExpirationTime);}if(effectTag&Ref){recordEffect();commitAttachRef(nextEffect);}var next=nextEffect.nextEffect;// Ensure that we clean these up so that we don't accidentally keep them.
// I'm not actually sure this matters because we can't reset firstEffect
// and lastEffect since they're on every node, not just the effectful
// ones. So we have to clean everything as we reuse nodes anyway.
nextEffect.nextEffect=null;// Ensure that we reset the effectTag here so that we can rely on effect
// tags to reason about the current life-cycle.
nextEffect=next;}}function isAlreadyFailedLegacyErrorBoundary(instance){return legacyErrorBoundariesThatAlreadyFailed!==null&&legacyErrorBoundariesThatAlreadyFailed.has(instance);}function markLegacyErrorBoundaryAsFailed(instance){if(legacyErrorBoundariesThatAlreadyFailed===null){legacyErrorBoundariesThatAlreadyFailed=new Set([instance]);}else{legacyErrorBoundariesThatAlreadyFailed.add(instance);}}function commitRoot(finishedWork){isWorking=true;isCommitting$1=true;startCommitTimer();var root=finishedWork.stateNode;!(root.current!==finishedWork)?invariant(false,'Cannot commit the same tree as before. This is probably a bug related to the return field. This error is likely caused by a bug in React. Please file an issue.'):void 0;var committedExpirationTime=root.pendingCommitExpirationTime;!(committedExpirationTime!==NoWork)?invariant(false,'Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.'):void 0;root.pendingCommitExpirationTime=NoWork;var currentTime=recalculateCurrentTime();// Reset this to null before calling lifecycles
ReactCurrentOwner.current=null;var firstEffect=void 0;if(finishedWork.effectTag>PerformedWork){// A fiber's effect list consists only of its children, not itself. So if
// the root has an effect, we need to add it to the end of the list. The
// resulting list is the set that would belong to the root's parent, if
// it had one; that is, all the effects in the tree including the root.
if(finishedWork.lastEffect!==null){finishedWork.lastEffect.nextEffect=finishedWork;firstEffect=finishedWork.firstEffect;}else{firstEffect=finishedWork;}}else{// There is no effect on the root.
firstEffect=finishedWork.firstEffect;}prepareForCommit(root.containerInfo);// Invoke instances of getSnapshotBeforeUpdate before mutation.
nextEffect=firstEffect;startCommitSnapshotEffectsTimer();while(nextEffect!==null){var didError=false;var error=void 0;{invokeGuardedCallback$2(null,commitBeforeMutationLifecycles,null);if(hasCaughtError()){didError=true;error=clearCaughtError();}}if(didError){!(nextEffect!==null)?invariant(false,'Should have next effect. This error is likely caused by a bug in React. Please file an issue.'):void 0;captureCommitPhaseError(nextEffect,error);// Clean-up
if(nextEffect!==null){nextEffect=nextEffect.nextEffect;}}}stopCommitSnapshotEffectsTimer();if(enableProfilerTimer){recordCommitTime();}// Commit all the side-effects within a tree. We'll do this in two passes.
// The first pass performs all the host insertions, updates, deletions and
// ref unmounts.
nextEffect=firstEffect;startCommitHostEffectsTimer();while(nextEffect!==null){var _didError=false;var _error=void 0;{invokeGuardedCallback$2(null,commitAllHostEffects,null);if(hasCaughtError()){_didError=true;_error=clearCaughtError();}}if(_didError){!(nextEffect!==null)?invariant(false,'Should have next effect. This error is likely caused by a bug in React. Please file an issue.'):void 0;captureCommitPhaseError(nextEffect,_error);// Clean-up
if(nextEffect!==null){nextEffect=nextEffect.nextEffect;}}}stopCommitHostEffectsTimer();resetAfterCommit(root.containerInfo);// The work-in-progress tree is now the current tree. This must come after
// the first pass of the commit phase, so that the previous tree is still
// current during componentWillUnmount, but before the second pass, so that
// the finished work is current during componentDidMount/Update.
root.current=finishedWork;// In the second pass we'll perform all life-cycles and ref callbacks.
// Life-cycles happen as a separate pass so that all placements, updates,
// and deletions in the entire tree have already been invoked.
// This pass also triggers any renderer-specific initial effects.
nextEffect=firstEffect;startCommitLifeCyclesTimer();while(nextEffect!==null){var _didError2=false;var _error2=void 0;{invokeGuardedCallback$2(null,commitAllLifeCycles,null,root,currentTime,committedExpirationTime);if(hasCaughtError()){_didError2=true;_error2=clearCaughtError();}}if(_didError2){!(nextEffect!==null)?invariant(false,'Should have next effect. This error is likely caused by a bug in React. Please file an issue.'):void 0;captureCommitPhaseError(nextEffect,_error2);if(nextEffect!==null){nextEffect=nextEffect.nextEffect;}}}if(enableProfilerTimer){{checkActualRenderTimeStackEmpty();}resetActualRenderTimer();}isCommitting$1=false;isWorking=false;stopCommitLifeCyclesTimer();stopCommitTimer();if(typeof onCommitRoot==='function'){onCommitRoot(finishedWork.stateNode);}if(true&&ReactFiberInstrumentation_1.debugTool){ReactFiberInstrumentation_1.debugTool.onCommitWork(finishedWork);}markCommittedPriorityLevels(root,currentTime,root.current.expirationTime);var remainingTime=findNextPendingPriorityLevel(root);if(remainingTime===NoWork){// If there's no remaining work, we can clear the set of already failed
// error boundaries.
legacyErrorBoundariesThatAlreadyFailed=null;}return remainingTime;}function resetExpirationTime(workInProgress,renderTime){if(renderTime!==Never&&workInProgress.expirationTime===Never){// The children of this component are hidden. Don't bubble their
// expiration times.
return;}// Check for pending updates.
var newExpirationTime=NoWork;switch(workInProgress.tag){case HostRoot:case ClassComponent:{var updateQueue=workInProgress.updateQueue;if(updateQueue!==null){newExpirationTime=updateQueue.expirationTime;}}}// TODO: Calls need to visit stateNode
// Bubble up the earliest expiration time.
// (And "base" render timers if that feature flag is enabled)
if(enableProfilerTimer&&workInProgress.mode&ProfileMode){var treeBaseTime=workInProgress.selfBaseTime;var child=workInProgress.child;while(child!==null){treeBaseTime+=child.treeBaseTime;if(child.expirationTime!==NoWork&&(newExpirationTime===NoWork||newExpirationTime>child.expirationTime)){newExpirationTime=child.expirationTime;}child=child.sibling;}workInProgress.treeBaseTime=treeBaseTime;}else{var _child=workInProgress.child;while(_child!==null){if(_child.expirationTime!==NoWork&&(newExpirationTime===NoWork||newExpirationTime>_child.expirationTime)){newExpirationTime=_child.expirationTime;}_child=_child.sibling;}}workInProgress.expirationTime=newExpirationTime;}function completeUnitOfWork(workInProgress){// Attempt to complete the current unit of work, then move to the
// next sibling. If there are no more siblings, return to the
// parent fiber.
while(true){// The current, flushed, state of this fiber is the alternate.
// Ideally nothing should rely on this, but relying on it here
// means that we don't need an additional field on the work in
// progress.
var current=workInProgress.alternate;{ReactDebugCurrentFiber.setCurrentFiber(workInProgress);}var returnFiber=workInProgress.return;var siblingFiber=workInProgress.sibling;if((workInProgress.effectTag&Incomplete)===NoEffect){// This fiber completed.
var next=completeWork(current,workInProgress,nextRenderExpirationTime);stopWorkTimer(workInProgress);resetExpirationTime(workInProgress,nextRenderExpirationTime);{ReactDebugCurrentFiber.resetCurrentFiber();}if(next!==null){stopWorkTimer(workInProgress);if(true&&ReactFiberInstrumentation_1.debugTool){ReactFiberInstrumentation_1.debugTool.onCompleteWork(workInProgress);}// If completing this work spawned new work, do that next. We'll come
// back here again.
return next;}if(returnFiber!==null&&// Do not append effects to parents if a sibling failed to complete
(returnFiber.effectTag&Incomplete)===NoEffect){// Append all the effects of the subtree and this fiber onto the effect
// list of the parent. The completion order of the children affects the
// side-effect order.
if(returnFiber.firstEffect===null){returnFiber.firstEffect=workInProgress.firstEffect;}if(workInProgress.lastEffect!==null){if(returnFiber.lastEffect!==null){returnFiber.lastEffect.nextEffect=workInProgress.firstEffect;}returnFiber.lastEffect=workInProgress.lastEffect;}// If this fiber had side-effects, we append it AFTER the children's
// side-effects. We can perform certain side-effects earlier if
// needed, by doing multiple passes over the effect list. We don't want
// to schedule our own side-effect on our own list because if end up
// reusing children we'll schedule this effect onto itself since we're
// at the end.
var effectTag=workInProgress.effectTag;// Skip both NoWork and PerformedWork tags when creating the effect list.
// PerformedWork effect is read by React DevTools but shouldn't be committed.
if(effectTag>PerformedWork){if(returnFiber.lastEffect!==null){returnFiber.lastEffect.nextEffect=workInProgress;}else{returnFiber.firstEffect=workInProgress;}returnFiber.lastEffect=workInProgress;}}if(true&&ReactFiberInstrumentation_1.debugTool){ReactFiberInstrumentation_1.debugTool.onCompleteWork(workInProgress);}if(siblingFiber!==null){// If there is more work to do in this returnFiber, do that next.
return siblingFiber;}else if(returnFiber!==null){// If there's no more work in this returnFiber. Complete the returnFiber.
workInProgress=returnFiber;continue;}else{// We've reached the root.
isRootReadyForCommit=true;return null;}}else{// This fiber did not complete because something threw. Pop values off
// the stack without entering the complete phase. If this is a boundary,
// capture values if possible.
var _next=unwindWork(workInProgress,nextRenderIsExpired,nextRenderExpirationTime);// Because this fiber did not complete, don't reset its expiration time.
if(workInProgress.effectTag&DidCapture){// Restarting an error boundary
stopFailedWorkTimer(workInProgress);}else{stopWorkTimer(workInProgress);}{ReactDebugCurrentFiber.resetCurrentFiber();}if(_next!==null){stopWorkTimer(workInProgress);if(true&&ReactFiberInstrumentation_1.debugTool){ReactFiberInstrumentation_1.debugTool.onCompleteWork(workInProgress);}// If completing this work spawned new work, do that next. We'll come
// back here again.
// Since we're restarting, remove anything that is not a host effect
// from the effect tag.
_next.effectTag&=HostEffectMask;return _next;}if(returnFiber!==null){// Mark the parent fiber as incomplete and clear its effect list.
returnFiber.firstEffect=returnFiber.lastEffect=null;returnFiber.effectTag|=Incomplete;}if(true&&ReactFiberInstrumentation_1.debugTool){ReactFiberInstrumentation_1.debugTool.onCompleteWork(workInProgress);}if(siblingFiber!==null){// If there is more work to do in this returnFiber, do that next.
return siblingFiber;}else if(returnFiber!==null){// If there's no more work in this returnFiber. Complete the returnFiber.
workInProgress=returnFiber;continue;}else{return null;}}}// Without this explicit null return Flow complains of invalid return type
// TODO Remove the above while(true) loop
// eslint-disable-next-line no-unreachable
return null;}function performUnitOfWork(workInProgress){// The current, flushed, state of this fiber is the alternate.
// Ideally nothing should rely on this, but relying on it here
// means that we don't need an additional field on the work in
// progress.
var current=workInProgress.alternate;// See if beginning this work spawns more work.
startWorkTimer(workInProgress);{ReactDebugCurrentFiber.setCurrentFiber(workInProgress);}if(true&&replayFailedUnitOfWorkWithInvokeGuardedCallback){stashedWorkInProgressProperties=assignFiberPropertiesInDEV(stashedWorkInProgressProperties,workInProgress);}var next=void 0;if(enableProfilerTimer){if(workInProgress.mode&ProfileMode){startBaseRenderTimer();}next=beginWork(current,workInProgress,nextRenderExpirationTime);if(workInProgress.mode&ProfileMode){// Update "base" time if the render wasn't bailed out on.
recordElapsedBaseRenderTimeIfRunning(workInProgress);stopBaseRenderTimerIfRunning();}}else{next=beginWork(current,workInProgress,nextRenderExpirationTime);}{ReactDebugCurrentFiber.resetCurrentFiber();if(isReplayingFailedUnitOfWork){// Currently replaying a failed unit of work. This should be unreachable,
// because the render phase is meant to be idempotent, and it should
// have thrown again. Since it didn't, rethrow the original error, so
// React's internal stack is not misaligned.
rethrowOriginalError();}}if(true&&ReactFiberInstrumentation_1.debugTool){ReactFiberInstrumentation_1.debugTool.onBeginWork(workInProgress);}if(next===null){// If this doesn't spawn new work, complete the current work.
next=completeUnitOfWork(workInProgress);}ReactCurrentOwner.current=null;return next;}function workLoop(isAsync){if(!isAsync){// Flush all expired work.
while(nextUnitOfWork!==null){nextUnitOfWork=performUnitOfWork(nextUnitOfWork);}}else{// Flush asynchronous work until the deadline runs out of time.
while(nextUnitOfWork!==null&&!shouldYield()){nextUnitOfWork=performUnitOfWork(nextUnitOfWork);}if(enableProfilerTimer){// If we didn't finish, pause the "actual" render timer.
// We'll restart it when we resume work.
pauseActualRenderTimerIfRunning();}}}function renderRoot(root,expirationTime,isAsync){!!isWorking?invariant(false,'renderRoot was called recursively. This error is likely caused by a bug in React. Please file an issue.'):void 0;isWorking=true;// Check if we're starting from a fresh stack, or if we're resuming from
// previously yielded work.
if(expirationTime!==nextRenderExpirationTime||root!==nextRoot||nextUnitOfWork===null){// Reset the stack and start working from the root.
resetStack();nextRoot=root;nextRenderExpirationTime=expirationTime;nextLatestTimeoutMs=-1;nextUnitOfWork=createWorkInProgress(nextRoot.current,null,nextRenderExpirationTime);root.pendingCommitExpirationTime=NoWork;}var didFatal=false;nextRenderIsExpired=!isAsync||nextRenderExpirationTime<=mostRecentCurrentTime;startWorkLoopTimer(nextUnitOfWork);do{try{workLoop(isAsync);}catch(thrownValue){if(enableProfilerTimer){// Stop "base" render timer in the event of an error.
stopBaseRenderTimerIfRunning();}if(nextUnitOfWork===null){// This is a fatal error.
didFatal=true;onUncaughtError(thrownValue);}else{{// Reset global debug state
// We assume this is defined in DEV
resetCurrentlyProcessingQueue();}var failedUnitOfWork=nextUnitOfWork;if(true&&replayFailedUnitOfWorkWithInvokeGuardedCallback){replayUnitOfWork(failedUnitOfWork,thrownValue,isAsync);}// TODO: we already know this isn't true in some cases.
// At least this shows a nicer error message until we figure out the cause.
// https://github.com/facebook/react/issues/12449#issuecomment-386727431
!(nextUnitOfWork!==null)?invariant(false,'Failed to replay rendering after an error. This is likely caused by a bug in React. Please file an issue with a reproducing case to help us find it.'):void 0;var sourceFiber=nextUnitOfWork;var returnFiber=sourceFiber.return;if(returnFiber===null){// This is the root. The root could capture its own errors. However,
// we don't know if it errors before or after we pushed the host
// context. This information is needed to avoid a stack mismatch.
// Because we're not sure, treat this as a fatal error. We could track
// which phase it fails in, but doesn't seem worth it. At least
// for now.
didFatal=true;onUncaughtError(thrownValue);break;}throwException(root,returnFiber,sourceFiber,thrownValue,nextRenderIsExpired,nextRenderExpirationTime,mostRecentCurrentTimeMs);nextUnitOfWork=completeUnitOfWork(sourceFiber);}}break;}while(true);// We're done performing work. Time to clean up.
var didCompleteRoot=false;isWorking=false;// Yield back to main thread.
if(didFatal){stopWorkLoopTimer(interruptedBy,didCompleteRoot);interruptedBy=null;// There was a fatal error.
{resetStackAfterFatalErrorInDev();}return null;}else if(nextUnitOfWork===null){// We reached the root.
if(isRootReadyForCommit){didCompleteRoot=true;stopWorkLoopTimer(interruptedBy,didCompleteRoot);interruptedBy=null;// The root successfully completed. It's ready for commit.
root.pendingCommitExpirationTime=expirationTime;var finishedWork=root.current.alternate;return finishedWork;}else{// The root did not complete.
stopWorkLoopTimer(interruptedBy,didCompleteRoot);interruptedBy=null;!!nextRenderIsExpired?invariant(false,'Expired work should have completed. This error is likely caused by a bug in React. Please file an issue.'):void 0;markSuspendedPriorityLevel(root,expirationTime);if(nextLatestTimeoutMs>=0){setTimeout(function(){retrySuspendedRoot(root,expirationTime);},nextLatestTimeoutMs);}var firstUnblockedExpirationTime=findNextPendingPriorityLevel(root);onBlock(firstUnblockedExpirationTime);return null;}}else{stopWorkLoopTimer(interruptedBy,didCompleteRoot);interruptedBy=null;// There's more work to do, but we ran out of time. Yield back to
// the renderer.
return null;}}function dispatch(sourceFiber,value,expirationTime){!(!isWorking||isCommitting$1)?invariant(false,'dispatch: Cannot dispatch during the render phase.'):void 0;var fiber=sourceFiber.return;while(fiber!==null){switch(fiber.tag){case ClassComponent:var ctor=fiber.type;var instance=fiber.stateNode;if(typeof ctor.getDerivedStateFromCatch==='function'||typeof instance.componentDidCatch==='function'&&!isAlreadyFailedLegacyErrorBoundary(instance)){var errorInfo=createCapturedValue(value,sourceFiber);var update=createClassErrorUpdate(fiber,errorInfo,expirationTime);enqueueUpdate(fiber,update,expirationTime);scheduleWork$1(fiber,expirationTime);return;}break;case HostRoot:{var _errorInfo=createCapturedValue(value,sourceFiber);var _update=createRootErrorUpdate(fiber,_errorInfo,expirationTime);enqueueUpdate(fiber,_update,expirationTime);scheduleWork$1(fiber,expirationTime);return;}}fiber=fiber.return;}if(sourceFiber.tag===HostRoot){// Error was thrown at the root. There is no parent, so the root
// itself should capture it.
var rootFiber=sourceFiber;var _errorInfo2=createCapturedValue(value,rootFiber);var _update2=createRootErrorUpdate(rootFiber,_errorInfo2,expirationTime);enqueueUpdate(rootFiber,_update2,expirationTime);scheduleWork$1(rootFiber,expirationTime);}}function captureCommitPhaseError(fiber,error){return dispatch(fiber,error,Sync);}function computeAsyncExpiration(currentTime){// Given the current clock time, returns an expiration time. We use rounding
// to batch like updates together.
// Should complete within ~1000ms. 1200ms max.
var expirationMs=5000;var bucketSizeMs=250;return computeExpirationBucket(currentTime,expirationMs,bucketSizeMs);}function computeInteractiveExpiration(currentTime){var expirationMs=void 0;// We intentionally set a higher expiration time for interactive updates in
// dev than in production.
// If the main thread is being blocked so long that you hit the expiration,
// it's a problem that could be solved with better scheduling.
// People will be more likely to notice this and fix it with the long
// expiration time in development.
// In production we opt for better UX at the risk of masking scheduling
// problems, by expiring fast.
{// Should complete within ~500ms. 600ms max.
expirationMs=500;}var bucketSizeMs=100;return computeExpirationBucket(currentTime,expirationMs,bucketSizeMs);}// Creates a unique async expiration time.
function computeUniqueAsyncExpiration(){var currentTime=recalculateCurrentTime();var result=computeAsyncExpiration(currentTime);if(result<=lastUniqueAsyncExpiration){// Since we assume the current time monotonically increases, we only hit
// this branch when computeUniqueAsyncExpiration is fired multiple times
// within a 200ms window (or whatever the async bucket size is).
result=lastUniqueAsyncExpiration+1;}lastUniqueAsyncExpiration=result;return lastUniqueAsyncExpiration;}function computeExpirationForFiber(currentTime,fiber){var expirationTime=void 0;if(expirationContext!==NoWork){// An explicit expiration context was set;
expirationTime=expirationContext;}else if(isWorking){if(isCommitting$1){// Updates that occur during the commit phase should have sync priority
// by default.
expirationTime=Sync;}else{// Updates during the render phase should expire at the same time as
// the work that is being rendered.
expirationTime=nextRenderExpirationTime;}}else{// No explicit expiration context was set, and we're not currently
// performing work. Calculate a new expiration time.
if(fiber.mode&AsyncMode){if(isBatchingInteractiveUpdates){// This is an interactive update
expirationTime=computeInteractiveExpiration(currentTime);}else{// This is an async update
expirationTime=computeAsyncExpiration(currentTime);}}else{// This is a sync update
expirationTime=Sync;}}if(isBatchingInteractiveUpdates){// This is an interactive update. Keep track of the lowest pending
// interactive expiration time. This allows us to synchronously flush
// all interactive updates when needed.
if(lowestPendingInteractiveExpirationTime===NoWork||expirationTime>lowestPendingInteractiveExpirationTime){lowestPendingInteractiveExpirationTime=expirationTime;}}return expirationTime;}// TODO: Rename this to scheduleTimeout or something
function suspendRoot(root,thenable,timeoutMs,suspendedTime){// Schedule the timeout.
if(timeoutMs>=0&&nextLatestTimeoutMs<timeoutMs){nextLatestTimeoutMs=timeoutMs;}}function retrySuspendedRoot(root,suspendedTime){markPingedPriorityLevel(root,suspendedTime);var retryTime=findNextPendingPriorityLevel(root);if(retryTime!==NoWork){requestRetry(root,retryTime);}}function scheduleWork$1(fiber,expirationTime){recordScheduleUpdate();{if(fiber.tag===ClassComponent){var instance=fiber.stateNode;warnAboutInvalidUpdates(instance);}}var node=fiber;while(node!==null){// Walk the parent path to the root and update each node's
// expiration time.
if(node.expirationTime===NoWork||node.expirationTime>expirationTime){node.expirationTime=expirationTime;}if(node.alternate!==null){if(node.alternate.expirationTime===NoWork||node.alternate.expirationTime>expirationTime){node.alternate.expirationTime=expirationTime;}}if(node.return===null){if(node.tag===HostRoot){var root=node.stateNode;if(!isWorking&&nextRenderExpirationTime!==NoWork&&expirationTime<nextRenderExpirationTime){// This is an interruption. (Used for performance tracking.)
interruptedBy=fiber;resetStack();}markPendingPriorityLevel(root,expirationTime);var nextExpirationTimeToWorkOn=findNextPendingPriorityLevel(root);if(// If we're in the render phase, we don't need to schedule this root
// for an update, because we'll do it before we exit...
!isWorking||isCommitting$1||// ...unless this is a different root than the one we're rendering.
nextRoot!==root){requestWork(root,nextExpirationTimeToWorkOn);}if(nestedUpdateCount>NESTED_UPDATE_LIMIT){invariant(false,'Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.');}}else{{if(fiber.tag===ClassComponent){warnAboutUpdateOnUnmounted(fiber);}}return;}}node=node.return;}}function recalculateCurrentTime(){// Subtract initial time so it fits inside 32bits
mostRecentCurrentTimeMs=now()-originalStartTimeMs;mostRecentCurrentTime=msToExpirationTime(mostRecentCurrentTimeMs);return mostRecentCurrentTime;}function deferredUpdates(fn){var previousExpirationContext=expirationContext;var currentTime=recalculateCurrentTime();expirationContext=computeAsyncExpiration(currentTime);try{return fn();}finally{expirationContext=previousExpirationContext;}}function syncUpdates(fn,a,b,c,d){var previousExpirationContext=expirationContext;expirationContext=Sync;try{return fn(a,b,c,d);}finally{expirationContext=previousExpirationContext;}}// TODO: Everything below this is written as if it has been lifted to the
// renderers. I'll do this in a follow-up.
// Linked-list of roots
var firstScheduledRoot=null;var lastScheduledRoot=null;var callbackExpirationTime=NoWork;var callbackID=-1;var isRendering=false;var nextFlushedRoot=null;var nextFlushedExpirationTime=NoWork;var lowestPendingInteractiveExpirationTime=NoWork;var deadlineDidExpire=false;var hasUnhandledError=false;var unhandledError=null;var deadline=null;var isBatchingUpdates=false;var isUnbatchingUpdates=false;var isBatchingInteractiveUpdates=false;var completedBatches=null;// Use these to prevent an infinite loop of nested updates
var NESTED_UPDATE_LIMIT=1000;var nestedUpdateCount=0;var timeHeuristicForUnitOfWork=1;function scheduleCallbackWithExpiration(expirationTime){if(callbackExpirationTime!==NoWork){// A callback is already scheduled. Check its expiration time (timeout).
if(expirationTime>callbackExpirationTime){// Existing callback has sufficient timeout. Exit.
return;}else{// Existing callback has insufficient timeout. Cancel and schedule a
// new one.
cancelDeferredCallback(callbackID);}// The request callback timer is already running. Don't start a new one.
}else{startRequestCallbackTimer();}// Compute a timeout for the given expiration time.
var currentMs=now()-originalStartTimeMs;var expirationMs=expirationTimeToMs(expirationTime);var timeout=expirationMs-currentMs;callbackExpirationTime=expirationTime;callbackID=scheduleDeferredCallback(performAsyncWork,{timeout:timeout});}function requestRetry(root,expirationTime){if(root.remainingExpirationTime===NoWork||root.remainingExpirationTime<expirationTime){// For a retry, only update the remaining expiration time if it has a
// *lower priority* than the existing value. This is because, on a retry,
// we should attempt to coalesce as much as possible.
requestWork(root,expirationTime);}}// requestWork is called by the scheduler whenever a root receives an update.
// It's up to the renderer to call renderRoot at some point in the future.
function requestWork(root,expirationTime){addRootToSchedule(root,expirationTime);if(isRendering){// Prevent reentrancy. Remaining work will be scheduled at the end of
// the currently rendering batch.
return;}if(isBatchingUpdates){// Flush work at the end of the batch.
if(isUnbatchingUpdates){// ...unless we're inside unbatchedUpdates, in which case we should
// flush it now.
nextFlushedRoot=root;nextFlushedExpirationTime=Sync;performWorkOnRoot(root,Sync,false);}return;}// TODO: Get rid of Sync and use current time?
if(expirationTime===Sync){performSyncWork();}else{scheduleCallbackWithExpiration(expirationTime);}}function addRootToSchedule(root,expirationTime){// Add the root to the schedule.
// Check if this root is already part of the schedule.
if(root.nextScheduledRoot===null){// This root is not already scheduled. Add it.
root.remainingExpirationTime=expirationTime;if(lastScheduledRoot===null){firstScheduledRoot=lastScheduledRoot=root;root.nextScheduledRoot=root;}else{lastScheduledRoot.nextScheduledRoot=root;lastScheduledRoot=root;lastScheduledRoot.nextScheduledRoot=firstScheduledRoot;}}else{// This root is already scheduled, but its priority may have increased.
var remainingExpirationTime=root.remainingExpirationTime;if(remainingExpirationTime===NoWork||expirationTime<remainingExpirationTime){// Update the priority.
root.remainingExpirationTime=expirationTime;}}}function findHighestPriorityRoot(){var highestPriorityWork=NoWork;var highestPriorityRoot=null;if(lastScheduledRoot!==null){var previousScheduledRoot=lastScheduledRoot;var root=firstScheduledRoot;while(root!==null){var remainingExpirationTime=root.remainingExpirationTime;if(remainingExpirationTime===NoWork){// This root no longer has work. Remove it from the scheduler.
// TODO: This check is redudant, but Flow is confused by the branch
// below where we set lastScheduledRoot to null, even though we break
// from the loop right after.
!(previousScheduledRoot!==null&&lastScheduledRoot!==null)?invariant(false,'Should have a previous and last root. This error is likely caused by a bug in React. Please file an issue.'):void 0;if(root===root.nextScheduledRoot){// This is the only root in the list.
root.nextScheduledRoot=null;firstScheduledRoot=lastScheduledRoot=null;break;}else if(root===firstScheduledRoot){// This is the first root in the list.
var next=root.nextScheduledRoot;firstScheduledRoot=next;lastScheduledRoot.nextScheduledRoot=next;root.nextScheduledRoot=null;}else if(root===lastScheduledRoot){// This is the last root in the list.
lastScheduledRoot=previousScheduledRoot;lastScheduledRoot.nextScheduledRoot=firstScheduledRoot;root.nextScheduledRoot=null;break;}else{previousScheduledRoot.nextScheduledRoot=root.nextScheduledRoot;root.nextScheduledRoot=null;}root=previousScheduledRoot.nextScheduledRoot;}else{if(highestPriorityWork===NoWork||remainingExpirationTime<highestPriorityWork){// Update the priority, if it's higher
highestPriorityWork=remainingExpirationTime;highestPriorityRoot=root;}if(root===lastScheduledRoot){break;}previousScheduledRoot=root;root=root.nextScheduledRoot;}}}// If the next root is the same as the previous root, this is a nested
// update. To prevent an infinite loop, increment the nested update count.
var previousFlushedRoot=nextFlushedRoot;if(previousFlushedRoot!==null&&previousFlushedRoot===highestPriorityRoot&&highestPriorityWork===Sync){nestedUpdateCount++;}else{// Reset whenever we switch roots.
nestedUpdateCount=0;}nextFlushedRoot=highestPriorityRoot;nextFlushedExpirationTime=highestPriorityWork;}function performAsyncWork(dl){performWork(NoWork,true,dl);}function performSyncWork(){performWork(Sync,false,null);}function performWork(minExpirationTime,isAsync,dl){deadline=dl;// Keep working on roots until there's no more work, or until the we reach
// the deadline.
findHighestPriorityRoot();if(enableProfilerTimer){resumeActualRenderTimerIfPaused();}if(enableUserTimingAPI&&deadline!==null){var didExpire=nextFlushedExpirationTime<recalculateCurrentTime();var timeout=expirationTimeToMs(nextFlushedExpirationTime);stopRequestCallbackTimer(didExpire,timeout);}if(isAsync){while(nextFlushedRoot!==null&&nextFlushedExpirationTime!==NoWork&&(minExpirationTime===NoWork||minExpirationTime>=nextFlushedExpirationTime)&&(!deadlineDidExpire||recalculateCurrentTime()>=nextFlushedExpirationTime)){recalculateCurrentTime();performWorkOnRoot(nextFlushedRoot,nextFlushedExpirationTime,!deadlineDidExpire);findHighestPriorityRoot();}}else{while(nextFlushedRoot!==null&&nextFlushedExpirationTime!==NoWork&&(minExpirationTime===NoWork||minExpirationTime>=nextFlushedExpirationTime)){performWorkOnRoot(nextFlushedRoot,nextFlushedExpirationTime,false);findHighestPriorityRoot();}}// We're done flushing work. Either we ran out of time in this callback,
// or there's no more work left with sufficient priority.
// If we're inside a callback, set this to false since we just completed it.
if(deadline!==null){callbackExpirationTime=NoWork;callbackID=-1;}// If there's work left over, schedule a new callback.
if(nextFlushedExpirationTime!==NoWork){scheduleCallbackWithExpiration(nextFlushedExpirationTime);}// Clean-up.
deadline=null;deadlineDidExpire=false;finishRendering();}function flushRoot(root,expirationTime){!!isRendering?invariant(false,'work.commit(): Cannot commit while already rendering. This likely means you attempted to commit from inside a lifecycle method.'):void 0;// Perform work on root as if the given expiration time is the current time.
// This has the effect of synchronously flushing all work up to and
// including the given time.
nextFlushedRoot=root;nextFlushedExpirationTime=expirationTime;performWorkOnRoot(root,expirationTime,false);// Flush any sync work that was scheduled by lifecycles
performSyncWork();finishRendering();}function finishRendering(){nestedUpdateCount=0;if(completedBatches!==null){var batches=completedBatches;completedBatches=null;for(var i=0;i<batches.length;i++){var batch=batches[i];try{batch._onComplete();}catch(error){if(!hasUnhandledError){hasUnhandledError=true;unhandledError=error;}}}}if(hasUnhandledError){var error=unhandledError;unhandledError=null;hasUnhandledError=false;throw error;}}function performWorkOnRoot(root,expirationTime,isAsync){!!isRendering?invariant(false,'performWorkOnRoot was called recursively. This error is likely caused by a bug in React. Please file an issue.'):void 0;isRendering=true;// Check if this is async work or sync/expired work.
if(!isAsync){// Flush sync work.
var finishedWork=root.finishedWork;if(finishedWork!==null){// This root is already complete. We can commit it.
completeRoot(root,finishedWork,expirationTime);}else{root.finishedWork=null;finishedWork=renderRoot(root,expirationTime,false);if(finishedWork!==null){// We've completed the root. Commit it.
completeRoot(root,finishedWork,expirationTime);}}}else{// Flush async work.
var _finishedWork=root.finishedWork;if(_finishedWork!==null){// This root is already complete. We can commit it.
completeRoot(root,_finishedWork,expirationTime);}else{root.finishedWork=null;_finishedWork=renderRoot(root,expirationTime,true);if(_finishedWork!==null){// We've completed the root. Check the deadline one more time
// before committing.
if(!shouldYield()){// Still time left. Commit the root.
completeRoot(root,_finishedWork,expirationTime);}else{// There's no time left. Mark this root as complete. We'll come
// back and commit it later.
root.finishedWork=_finishedWork;if(enableProfilerTimer){// If we didn't finish, pause the "actual" render timer.
// We'll restart it when we resume work.
pauseActualRenderTimerIfRunning();}}}}}isRendering=false;}function completeRoot(root,finishedWork,expirationTime){// Check if there's a batch that matches this expiration time.
var firstBatch=root.firstBatch;if(firstBatch!==null&&firstBatch._expirationTime<=expirationTime){if(completedBatches===null){completedBatches=[firstBatch];}else{completedBatches.push(firstBatch);}if(firstBatch._defer){// This root is blocked from committing by a batch. Unschedule it until
// we receive another update.
root.finishedWork=finishedWork;root.remainingExpirationTime=NoWork;return;}}// Commit the root.
root.finishedWork=null;root.remainingExpirationTime=commitRoot(finishedWork);}// When working on async work, the reconciler asks the renderer if it should
// yield execution. For DOM, we implement this with requestIdleCallback.
function shouldYield(){if(deadline===null){return false;}if(deadline.timeRemaining()>timeHeuristicForUnitOfWork){// Disregard deadline.didTimeout. Only expired work should be flushed
// during a timeout. This path is only hit for non-expired work.
return false;}deadlineDidExpire=true;return true;}function onUncaughtError(error){!(nextFlushedRoot!==null)?invariant(false,'Should be working on a root. This error is likely caused by a bug in React. Please file an issue.'):void 0;// Unschedule this root so we don't work on it again until there's
// another update.
nextFlushedRoot.remainingExpirationTime=NoWork;if(!hasUnhandledError){hasUnhandledError=true;unhandledError=error;}}function onBlock(remainingExpirationTime){!(nextFlushedRoot!==null)?invariant(false,'Should be working on a root. This error is likely caused by a bug in React. Please file an issue.'):void 0;// This root was blocked. Unschedule it until there's another update.
nextFlushedRoot.remainingExpirationTime=remainingExpirationTime;}// TODO: Batching should be implemented at the renderer level, not inside
// the reconciler.
function batchedUpdates$1(fn,a){var previousIsBatchingUpdates=isBatchingUpdates;isBatchingUpdates=true;try{return fn(a);}finally{isBatchingUpdates=previousIsBatchingUpdates;if(!isBatchingUpdates&&!isRendering){performSyncWork();}}}// TODO: Batching should be implemented at the renderer level, not inside
// the reconciler.
function unbatchedUpdates(fn,a){if(isBatchingUpdates&&!isUnbatchingUpdates){isUnbatchingUpdates=true;try{return fn(a);}finally{isUnbatchingUpdates=false;}}return fn(a);}// TODO: Batching should be implemented at the renderer level, not within
// the reconciler.
function flushSync(fn,a){!!isRendering?invariant(false,'flushSync was called from inside a lifecycle method. It cannot be called when React is already rendering.'):void 0;var previousIsBatchingUpdates=isBatchingUpdates;isBatchingUpdates=true;try{return syncUpdates(fn,a);}finally{isBatchingUpdates=previousIsBatchingUpdates;performSyncWork();}}function interactiveUpdates$1(fn,a,b){if(isBatchingInteractiveUpdates){return fn(a,b);}// If there are any pending interactive updates, synchronously flush them.
// This needs to happen before we read any handlers, because the effect of
// the previous event may influence which handlers are called during
// this event.
if(!isBatchingUpdates&&!isRendering&&lowestPendingInteractiveExpirationTime!==NoWork){// Synchronously flush pending interactive updates.
performWork(lowestPendingInteractiveExpirationTime,false,null);lowestPendingInteractiveExpirationTime=NoWork;}var previousIsBatchingInteractiveUpdates=isBatchingInteractiveUpdates;var previousIsBatchingUpdates=isBatchingUpdates;isBatchingInteractiveUpdates=true;isBatchingUpdates=true;try{return fn(a,b);}finally{isBatchingInteractiveUpdates=previousIsBatchingInteractiveUpdates;isBatchingUpdates=previousIsBatchingUpdates;if(!isBatchingUpdates&&!isRendering){performSyncWork();}}}function flushInteractiveUpdates$1(){if(!isRendering&&lowestPendingInteractiveExpirationTime!==NoWork){// Synchronously flush pending interactive updates.
performWork(lowestPendingInteractiveExpirationTime,false,null);lowestPendingInteractiveExpirationTime=NoWork;}}function flushControlled(fn){var previousIsBatchingUpdates=isBatchingUpdates;isBatchingUpdates=true;try{syncUpdates(fn);}finally{isBatchingUpdates=previousIsBatchingUpdates;if(!isBatchingUpdates&&!isRendering){performWork(Sync,false,null);}}}// 0 is PROD, 1 is DEV.
// Might add PROFILE later.
var didWarnAboutNestedUpdates=void 0;{didWarnAboutNestedUpdates=false;}function getContextForSubtree(parentComponent){if(!parentComponent){return emptyObject;}var fiber=get(parentComponent);var parentContext=findCurrentUnmaskedContext(fiber);return isContextProvider(fiber)?processChildContext(fiber,parentContext):parentContext;}function scheduleRootUpdate(current,element,expirationTime,callback){{if(ReactDebugCurrentFiber.phase==='render'&&ReactDebugCurrentFiber.current!==null&&!didWarnAboutNestedUpdates){didWarnAboutNestedUpdates=true;warning(false,'Render methods should be a pure function of props and state; '+'triggering nested component updates from render is not allowed. '+'If necessary, trigger nested updates in componentDidUpdate.\n\n'+'Check the render method of %s.',getComponentName(ReactDebugCurrentFiber.current)||'Unknown');}}var update=createUpdate(expirationTime);// Caution: React DevTools currently depends on this property
// being called "element".
update.payload={element:element};callback=callback===undefined?null:callback;if(callback!==null){!(typeof callback==='function')?warning(false,'render(...): Expected the last optional `callback` argument to be a '+'function. Instead received: %s.',callback):void 0;update.callback=callback;}enqueueUpdate(current,update,expirationTime);scheduleWork$1(current,expirationTime);return expirationTime;}function updateContainerAtExpirationTime(element,container,parentComponent,expirationTime,callback){// TODO: If this is a nested container, this won't be the root.
var current=container.current;{if(ReactFiberInstrumentation_1.debugTool){if(current.alternate===null){ReactFiberInstrumentation_1.debugTool.onMountContainer(container);}else if(element===null){ReactFiberInstrumentation_1.debugTool.onUnmountContainer(container);}else{ReactFiberInstrumentation_1.debugTool.onUpdateContainer(container);}}}var context=getContextForSubtree(parentComponent);if(container.context===null){container.context=context;}else{container.pendingContext=context;}return scheduleRootUpdate(current,element,expirationTime,callback);}function findHostInstance(component){var fiber=get(component);if(fiber===undefined){if(typeof component.render==='function'){invariant(false,'Unable to find node on an unmounted component.');}else{invariant(false,'Argument appears to not be a ReactComponent. Keys: %s',Object.keys(component));}}var hostFiber=findCurrentHostFiber(fiber);if(hostFiber===null){return null;}return hostFiber.stateNode;}function createContainer(containerInfo,isAsync,hydrate){return createFiberRoot(containerInfo,isAsync,hydrate);}function updateContainer(element,container,parentComponent,callback){var current=container.current;var currentTime=recalculateCurrentTime();var expirationTime=computeExpirationForFiber(currentTime,current);return updateContainerAtExpirationTime(element,container,parentComponent,expirationTime,callback);}function getPublicRootInstance(container){var containerFiber=container.current;if(!containerFiber.child){return null;}switch(containerFiber.child.tag){case HostComponent:return getPublicInstance(containerFiber.child.stateNode);default:return containerFiber.child.stateNode;}}function findHostInstanceWithNoPortals(fiber){var hostFiber=findCurrentHostFiberWithNoPortals(fiber);if(hostFiber===null){return null;}return hostFiber.stateNode;}function injectIntoDevTools(devToolsConfig){var _findFiberByHostInstance=devToolsConfig.findFiberByHostInstance;return injectInternals(_assign({},devToolsConfig,{findHostInstanceByFiber:function findHostInstanceByFiber(fiber){var hostFiber=findCurrentHostFiber(fiber);if(hostFiber===null){return null;}return hostFiber.stateNode;},findFiberByHostInstance:function findFiberByHostInstance(instance){if(!_findFiberByHostInstance){// Might not be implemented by the renderer.
return null;}return _findFiberByHostInstance(instance);}}));}// This file intentionally does *not* have the Flow annotation.
// Don't add it. See `./inline-typed.js` for an explanation.
var DOMRenderer=Object.freeze({updateContainerAtExpirationTime:updateContainerAtExpirationTime,createContainer:createContainer,updateContainer:updateContainer,flushRoot:flushRoot,requestWork:requestWork,computeUniqueAsyncExpiration:computeUniqueAsyncExpiration,batchedUpdates:batchedUpdates$1,unbatchedUpdates:unbatchedUpdates,deferredUpdates:deferredUpdates,syncUpdates:syncUpdates,interactiveUpdates:interactiveUpdates$1,flushInteractiveUpdates:flushInteractiveUpdates$1,flushControlled:flushControlled,flushSync:flushSync,getPublicRootInstance:getPublicRootInstance,findHostInstance:findHostInstance,findHostInstanceWithNoPortals:findHostInstanceWithNoPortals,injectIntoDevTools:injectIntoDevTools});function createPortal$1(children,containerInfo,// TODO: figure out the API for cross-renderer implementation.
implementation){var key=arguments.length>3&&arguments[3]!==undefined?arguments[3]:null;return{// This tag allow us to uniquely identify this as a React Portal
$$typeof:REACT_PORTAL_TYPE,key:key==null?null:''+key,children:children,containerInfo:containerInfo,implementation:implementation};}// TODO: this is special because it gets imported during build.
var ReactVersion='16.4.0';// TODO: This type is shared between the reconciler and ReactDOM, but will
// eventually be lifted out to the renderer.
var topLevelUpdateWarnings=void 0;var warnOnInvalidCallback=void 0;var didWarnAboutUnstableCreatePortal=false;{if(typeof Map!=='function'||// $FlowIssue Flow incorrectly thinks Map has no prototype
Map.prototype==null||typeof Map.prototype.forEach!=='function'||typeof Set!=='function'||// $FlowIssue Flow incorrectly thinks Set has no prototype
Set.prototype==null||typeof Set.prototype.clear!=='function'||typeof Set.prototype.forEach!=='function'){warning(false,'React depends on Map and Set built-in types. Make sure that you load a '+'polyfill in older browsers. https://fb.me/react-polyfills');}topLevelUpdateWarnings=function topLevelUpdateWarnings(container){if(container._reactRootContainer&&container.nodeType!==COMMENT_NODE){var hostInstance=findHostInstanceWithNoPortals(container._reactRootContainer._internalRoot.current);if(hostInstance){!(hostInstance.parentNode===container)?warning(false,'render(...): It looks like the React-rendered content of this '+'container was removed without using React. This is not '+'supported and will cause errors. Instead, call '+'ReactDOM.unmountComponentAtNode to empty a container.'):void 0;}}var isRootRenderedBySomeReact=!!container._reactRootContainer;var rootEl=getReactRootElementInContainer(container);var hasNonRootReactChild=!!(rootEl&&getInstanceFromNode$1(rootEl));!(!hasNonRootReactChild||isRootRenderedBySomeReact)?warning(false,'render(...): Replacing React-rendered children with a new root '+'component. If you intended to update the children of this node, '+'you should instead have the existing children update their state '+'and render the new components instead of calling ReactDOM.render.'):void 0;!(container.nodeType!==ELEMENT_NODE||!container.tagName||container.tagName.toUpperCase()!=='BODY')?warning(false,'render(): Rendering components directly into document.body is '+'discouraged, since its children are often manipulated by third-party '+'scripts and browser extensions. This may lead to subtle '+'reconciliation issues. Try rendering into a container element created '+'for your app.'):void 0;};warnOnInvalidCallback=function warnOnInvalidCallback(callback,callerName){!(callback===null||typeof callback==='function')?warning(false,'%s(...): Expected the last optional `callback` argument to be a '+'function. Instead received: %s.',callerName,callback):void 0;};}injection$2.injectFiberControlledHostComponent(ReactDOMFiberComponent);function ReactBatch(root){var expirationTime=computeUniqueAsyncExpiration();this._expirationTime=expirationTime;this._root=root;this._next=null;this._callbacks=null;this._didComplete=false;this._hasChildren=false;this._children=null;this._defer=true;}ReactBatch.prototype.render=function(children){!this._defer?invariant(false,'batch.render: Cannot render a batch that already committed.'):void 0;this._hasChildren=true;this._children=children;var internalRoot=this._root._internalRoot;var expirationTime=this._expirationTime;var work=new ReactWork();updateContainerAtExpirationTime(children,internalRoot,null,expirationTime,work._onCommit);return work;};ReactBatch.prototype.then=function(onComplete){if(this._didComplete){onComplete();return;}var callbacks=this._callbacks;if(callbacks===null){callbacks=this._callbacks=[];}callbacks.push(onComplete);};ReactBatch.prototype.commit=function(){var internalRoot=this._root._internalRoot;var firstBatch=internalRoot.firstBatch;!(this._defer&&firstBatch!==null)?invariant(false,'batch.commit: Cannot commit a batch multiple times.'):void 0;if(!this._hasChildren){// This batch is empty. Return.
this._next=null;this._defer=false;return;}var expirationTime=this._expirationTime;// Ensure this is the first batch in the list.
if(firstBatch!==this){// This batch is not the earliest batch. We need to move it to the front.
// Update its expiration time to be the expiration time of the earliest
// batch, so that we can flush it without flushing the other batches.
if(this._hasChildren){expirationTime=this._expirationTime=firstBatch._expirationTime;// Rendering this batch again ensures its children will be the final state
// when we flush (updates are processed in insertion order: last
// update wins).
// TODO: This forces a restart. Should we print a warning?
this.render(this._children);}// Remove the batch from the list.
var previous=null;var batch=firstBatch;while(batch!==this){previous=batch;batch=batch._next;}!(previous!==null)?invariant(false,'batch.commit: Cannot commit a batch multiple times.'):void 0;previous._next=batch._next;// Add it to the front.
this._next=firstBatch;firstBatch=internalRoot.firstBatch=this;}// Synchronously flush all the work up to this batch's expiration time.
this._defer=false;flushRoot(internalRoot,expirationTime);// Pop the batch from the list.
var next=this._next;this._next=null;firstBatch=internalRoot.firstBatch=next;// Append the next earliest batch's children to the update queue.
if(firstBatch!==null&&firstBatch._hasChildren){firstBatch.render(firstBatch._children);}};ReactBatch.prototype._onComplete=function(){if(this._didComplete){return;}this._didComplete=true;var callbacks=this._callbacks;if(callbacks===null){return;}// TODO: Error handling.
for(var i=0;i<callbacks.length;i++){var _callback=callbacks[i];_callback();}};function ReactWork(){this._callbacks=null;this._didCommit=false;// TODO: Avoid need to bind by replacing callbacks in the update queue with
// list of Work objects.
this._onCommit=this._onCommit.bind(this);}ReactWork.prototype.then=function(onCommit){if(this._didCommit){onCommit();return;}var callbacks=this._callbacks;if(callbacks===null){callbacks=this._callbacks=[];}callbacks.push(onCommit);};ReactWork.prototype._onCommit=function(){if(this._didCommit){return;}this._didCommit=true;var callbacks=this._callbacks;if(callbacks===null){return;}// TODO: Error handling.
for(var i=0;i<callbacks.length;i++){var _callback2=callbacks[i];!(typeof _callback2==='function')?invariant(false,'Invalid argument passed as callback. Expected a function. Instead received: %s',_callback2):void 0;_callback2();}};function ReactRoot(container,isAsync,hydrate){var root=createContainer(container,isAsync,hydrate);this._internalRoot=root;}ReactRoot.prototype.render=function(children,callback){var root=this._internalRoot;var work=new ReactWork();callback=callback===undefined?null:callback;{warnOnInvalidCallback(callback,'render');}if(callback!==null){work.then(callback);}updateContainer(children,root,null,work._onCommit);return work;};ReactRoot.prototype.unmount=function(callback){var root=this._internalRoot;var work=new ReactWork();callback=callback===undefined?null:callback;{warnOnInvalidCallback(callback,'render');}if(callback!==null){work.then(callback);}updateContainer(null,root,null,work._onCommit);return work;};ReactRoot.prototype.legacy_renderSubtreeIntoContainer=function(parentComponent,children,callback){var root=this._internalRoot;var work=new ReactWork();callback=callback===undefined?null:callback;{warnOnInvalidCallback(callback,'render');}if(callback!==null){work.then(callback);}updateContainer(children,root,parentComponent,work._onCommit);return work;};ReactRoot.prototype.createBatch=function(){var batch=new ReactBatch(this);var expirationTime=batch._expirationTime;var internalRoot=this._internalRoot;var firstBatch=internalRoot.firstBatch;if(firstBatch===null){internalRoot.firstBatch=batch;batch._next=null;}else{// Insert sorted by expiration time then insertion order
var insertAfter=null;var insertBefore=firstBatch;while(insertBefore!==null&&insertBefore._expirationTime<=expirationTime){insertAfter=insertBefore;insertBefore=insertBefore._next;}batch._next=insertBefore;if(insertAfter!==null){insertAfter._next=batch;}}return batch;};/**
 * True if the supplied DOM node is a valid node element.
 *
 * @param {?DOMElement} node The candidate DOM node.
 * @return {boolean} True if the DOM is a valid DOM node.
 * @internal
 */function isValidContainer(node){return!!(node&&(node.nodeType===ELEMENT_NODE||node.nodeType===DOCUMENT_NODE||node.nodeType===DOCUMENT_FRAGMENT_NODE||node.nodeType===COMMENT_NODE&&node.nodeValue===' react-mount-point-unstable '));}function getReactRootElementInContainer(container){if(!container){return null;}if(container.nodeType===DOCUMENT_NODE){return container.documentElement;}else{return container.firstChild;}}function shouldHydrateDueToLegacyHeuristic(container){var rootElement=getReactRootElementInContainer(container);return!!(rootElement&&rootElement.nodeType===ELEMENT_NODE&&rootElement.hasAttribute(ROOT_ATTRIBUTE_NAME));}injection$3.injectRenderer(DOMRenderer);var warnedAboutHydrateAPI=false;function legacyCreateRootFromDOMContainer(container,forceHydrate){var shouldHydrate=forceHydrate||shouldHydrateDueToLegacyHeuristic(container);// First clear any existing content.
if(!shouldHydrate){var warned=false;var rootSibling=void 0;while(rootSibling=container.lastChild){{if(!warned&&rootSibling.nodeType===ELEMENT_NODE&&rootSibling.hasAttribute(ROOT_ATTRIBUTE_NAME)){warned=true;warning(false,'render(): Target node has markup rendered by React, but there '+'are unrelated nodes as well. This is most commonly caused by '+'white-space inserted around server-rendered markup.');}}container.removeChild(rootSibling);}}{if(shouldHydrate&&!forceHydrate&&!warnedAboutHydrateAPI){warnedAboutHydrateAPI=true;lowPriorityWarning$1(false,'render(): Calling ReactDOM.render() to hydrate server-rendered markup '+'will stop working in React v17. Replace the ReactDOM.render() call '+'with ReactDOM.hydrate() if you want React to attach to the server HTML.');}}// Legacy roots are not async by default.
var isAsync=false;return new ReactRoot(container,isAsync,shouldHydrate);}function legacyRenderSubtreeIntoContainer(parentComponent,children,container,forceHydrate,callback){// TODO: Ensure all entry points contain this check
!isValidContainer(container)?invariant(false,'Target container is not a DOM element.'):void 0;{topLevelUpdateWarnings(container);}// TODO: Without `any` type, Flow says "Property cannot be accessed on any
// member of intersection type." Whyyyyyy.
var root=container._reactRootContainer;if(!root){// Initial mount
root=container._reactRootContainer=legacyCreateRootFromDOMContainer(container,forceHydrate);if(typeof callback==='function'){var originalCallback=callback;callback=function callback(){var instance=getPublicRootInstance(root._internalRoot);originalCallback.call(instance);};}// Initial mount should not be batched.
unbatchedUpdates(function(){if(parentComponent!=null){root.legacy_renderSubtreeIntoContainer(parentComponent,children,callback);}else{root.render(children,callback);}});}else{if(typeof callback==='function'){var _originalCallback=callback;callback=function callback(){var instance=getPublicRootInstance(root._internalRoot);_originalCallback.call(instance);};}// Update
if(parentComponent!=null){root.legacy_renderSubtreeIntoContainer(parentComponent,children,callback);}else{root.render(children,callback);}}return getPublicRootInstance(root._internalRoot);}function createPortal(children,container){var key=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;!isValidContainer(container)?invariant(false,'Target container is not a DOM element.'):void 0;// TODO: pass ReactDOM portal implementation as third argument
return createPortal$1(children,container,null,key);}var ReactDOM={createPortal:createPortal,findDOMNode:function findDOMNode(componentOrElement){{var owner=ReactCurrentOwner.current;if(owner!==null&&owner.stateNode!==null){var warnedAboutRefsInRender=owner.stateNode._warnedAboutRefsInRender;!warnedAboutRefsInRender?warning(false,'%s is accessing findDOMNode inside its render(). '+'render() should be a pure function of props and state. It should '+'never access something that requires stale data from the previous '+'render, such as refs. Move this logic to componentDidMount and '+'componentDidUpdate instead.',getComponentName(owner)||'A component'):void 0;owner.stateNode._warnedAboutRefsInRender=true;}}if(componentOrElement==null){return null;}if(componentOrElement.nodeType===ELEMENT_NODE){return componentOrElement;}return findHostInstance(componentOrElement);},hydrate:function hydrate(element,container,callback){// TODO: throw or warn if we couldn't hydrate?
return legacyRenderSubtreeIntoContainer(null,element,container,true,callback);},render:function render(element,container,callback){return legacyRenderSubtreeIntoContainer(null,element,container,false,callback);},unstable_renderSubtreeIntoContainer:function unstable_renderSubtreeIntoContainer(parentComponent,element,containerNode,callback){!(parentComponent!=null&&has(parentComponent))?invariant(false,'parentComponent must be a valid React Component'):void 0;return legacyRenderSubtreeIntoContainer(parentComponent,element,containerNode,false,callback);},unmountComponentAtNode:function unmountComponentAtNode(container){!isValidContainer(container)?invariant(false,'unmountComponentAtNode(...): Target container is not a DOM element.'):void 0;if(container._reactRootContainer){{var rootEl=getReactRootElementInContainer(container);var renderedByDifferentReact=rootEl&&!getInstanceFromNode$1(rootEl);!!renderedByDifferentReact?warning(false,"unmountComponentAtNode(): The node you're attempting to unmount "+'was rendered by another copy of React.'):void 0;}// Unmount should not be batched.
unbatchedUpdates(function(){legacyRenderSubtreeIntoContainer(null,null,container,false,function(){container._reactRootContainer=null;});});// If you call unmountComponentAtNode twice in quick succession, you'll
// get `true` twice. That's probably fine?
return true;}else{{var _rootEl=getReactRootElementInContainer(container);var hasNonRootReactChild=!!(_rootEl&&getInstanceFromNode$1(_rootEl));// Check if the container itself is a React root node.
var isContainerReactRoot=container.nodeType===1&&isValidContainer(container.parentNode)&&!!container.parentNode._reactRootContainer;!!hasNonRootReactChild?warning(false,"unmountComponentAtNode(): The node you're attempting to unmount "+'was rendered by React and is not a top-level container. %s',isContainerReactRoot?'You may have accidentally passed in a React root node instead '+'of its container.':'Instead, have the parent component update its state and '+'rerender in order to remove this component.'):void 0;}return false;}},// Temporary alias since we already shipped React 16 RC with it.
// TODO: remove in React 17.
unstable_createPortal:function unstable_createPortal(){if(!didWarnAboutUnstableCreatePortal){didWarnAboutUnstableCreatePortal=true;lowPriorityWarning$1(false,'The ReactDOM.unstable_createPortal() alias has been deprecated, '+'and will be removed in React 17+. Update your code to use '+'ReactDOM.createPortal() instead. It has the exact same API, '+'but without the "unstable_" prefix.');}return createPortal.apply(undefined,arguments);},unstable_batchedUpdates:batchedUpdates$1,unstable_deferredUpdates:deferredUpdates,flushSync:flushSync,unstable_flushControlled:flushControlled,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{// For TapEventPlugin which is popular in open source
EventPluginHub:EventPluginHub,// Used by test-utils
EventPluginRegistry:EventPluginRegistry,EventPropagators:EventPropagators,ReactControlledComponent:ReactControlledComponent,ReactDOMComponentTree:ReactDOMComponentTree,ReactDOMEventListener:ReactDOMEventListener}};ReactDOM.unstable_createRoot=function createRoot(container,options){var hydrate=options!=null&&options.hydrate===true;return new ReactRoot(container,true,hydrate);};var foundDevTools=injectIntoDevTools({findFiberByHostInstance:getClosestInstanceFromNode,bundleType:1,version:ReactVersion,rendererPackageName:'react-dom'});{if(!foundDevTools&&ExecutionEnvironment.canUseDOM&&window.top===window.self){// If we're in Chrome or Firefox, provide a download link if not installed.
if(navigator.userAgent.indexOf('Chrome')>-1&&navigator.userAgent.indexOf('Edge')===-1||navigator.userAgent.indexOf('Firefox')>-1){var protocol=window.location.protocol;// Don't warn in exotic cases like chrome-extension://.
if(/^(https?|file):$/.test(protocol)){console.info('%cDownload the React DevTools '+'for a better development experience: '+'https://fb.me/react-devtools'+(protocol==='file:'?'\nYou might need to use a local HTTP server (instead of file://): '+'https://fb.me/react-devtools-faq':''),'font-weight:bold');}}}}var ReactDOM$2=Object.freeze({default:ReactDOM});var ReactDOM$3=ReactDOM$2&&ReactDOM||ReactDOM$2;// TODO: decide on the top-level export form.
// This is hacky but makes it work with both Rollup and Jest.
var reactDom=ReactDOM$3.default?ReactDOM$3.default:ReactDOM$3;module.exports=reactDom;})();}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */



var hyphenate = __webpack_require__(28);

var msPattern = /^ms-/;

/**
 * Hyphenates a camelcased CSS property name, for example:
 *
 *   > hyphenateStyleName('backgroundColor')
 *   < "background-color"
 *   > hyphenateStyleName('MozTransition')
 *   < "-moz-transition"
 *   > hyphenateStyleName('msTransition')
 *   < "-ms-transition"
 *
 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
 * is converted to `-ms-`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenateStyleName(string) {
  return hyphenate(string).replace(msPattern, '-ms-');
}

module.exports = hyphenateStyleName;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var _uppercasePattern = /([A-Z])/g;

/**
 * Hyphenates a camelcased string, for example:
 *
 *   > hyphenate('backgroundColor')
 *   < "background-color"
 *
 * For CSS style names, use `hyphenateStyleName` instead which works properly
 * with all vendor prefixes, including `ms`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenate(string) {
  return string.replace(_uppercasePattern, '-$1').toLowerCase();
}

module.exports = hyphenate;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */



var camelize = __webpack_require__(30);

var msPattern = /^-ms-/;

/**
 * Camelcases a hyphenated CSS property name, for example:
 *
 *   > camelizeStyleName('background-color')
 *   < "backgroundColor"
 *   > camelizeStyleName('-moz-transition')
 *   < "MozTransition"
 *   > camelizeStyleName('-ms-transition')
 *   < "msTransition"
 *
 * As Andi Smith suggests
 * (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
 * is converted to lowercase `ms`.
 *
 * @param {string} string
 * @return {string}
 */
function camelizeStyleName(string) {
  return camelize(string.replace(msPattern, 'ms-'));
}

module.exports = camelizeStyleName;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var _hyphenPattern = /-(.)/g;

/**
 * Camelcases a hyphenated string, for example:
 *
 *   > camelize('background-color')
 *   < "backgroundColor"
 *
 * @param {string} string
 * @return {string}
 */
function camelize(string) {
  return string.replace(_hyphenPattern, function (_, character) {
    return character.toUpperCase();
  });
}

module.exports = camelize;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _teacher = __webpack_require__(32);

var _teacher2 = _interopRequireDefault(_teacher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Teachers = function (_Component) {
    _inherits(Teachers, _Component);

    function Teachers() {
        _classCallCheck(this, Teachers);

        return _possibleConstructorReturn(this, (Teachers.__proto__ || Object.getPrototypeOf(Teachers)).apply(this, arguments));
    }

    _createClass(Teachers, [{
        key: 'render',
        value: function render() {
            console.log(this.props.data.teachers);

            return _react2.default.createElement(
                'ul',
                { className: 'Teachers' },
                this.props.data.teachers.map(function (teacherData) {
                    return _react2.default.createElement(_teacher2.default, teacherData);
                })
            );
        }
    }]);

    return Teachers;
}(_react.Component);

exports.default = Teachers;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Teacher(props) {
    console.log('carlos: ' + props);
    return _react2.default.createElement(
        'li',
        { className: 'Teacher' },
        props.name,
        ' ',
        _react2.default.createElement(
            'a',
            { href: 'https://twitter.com/' + props.twitter },
            props.twitter
        )
    );
}

exports.default = Teacher;

/***/ })
/******/ ]);