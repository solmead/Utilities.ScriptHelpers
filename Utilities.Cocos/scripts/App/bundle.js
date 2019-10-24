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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return geometry; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);

var RE_PAIR = /\{\s*([\d.\-]+)\s*,\s*([\d.\-]+)\s*\}/, RE_DOUBLE_PAIR = /\{\s*(\{[\s\d,.\-]+\})\s*,\s*(\{[\s\d,.\-]+\})\s*\}/;
Math.PI_2 = 1.57079632679489661923132169163975144; /* pi/2 */
var geometry;
(function (geometry) {
    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }
    geometry.Point = Point;
    class Size {
        constructor(w, h) {
            this.w = w;
            this.h = h;
            this.width = w;
            this.height = h;
        }
    }
    geometry.Size = Size;
    class Rect {
        constructor(x, y, w, h) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.origin = new Point(x, y);
            this.size = new Size(w, h);
        }
    }
    geometry.Rect = Rect;
    class TransformMatrix {
        constructor(a, b, c, d, tx, ty) {
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.tx = tx;
            this.ty = ty;
        }
    }
    geometry.TransformMatrix = TransformMatrix;
    class BezierConfig {
        constructor(p1, p2, ep) {
            this.p1 = p1;
            this.p2 = p2;
            this.ep = ep;
            this.controlPoint1 = _util__WEBPACK_IMPORTED_MODULE_0__[/* util */ "a"].copy(p1);
            this.controlPoint2 = _util__WEBPACK_IMPORTED_MODULE_0__[/* util */ "a"].copy(p2);
            this.endPosition = _util__WEBPACK_IMPORTED_MODULE_0__[/* util */ "a"].copy(ep);
        }
    }
    geometry.BezierConfig = BezierConfig;
    /**
     * Creates a geometry.Point instance
     *
     * @param {Float} x X coordinate
     * @param {Float} y Y coordinate
     * @returns {geometry.Point}
     */
    function ccp(x, y) {
        return module.exports.pointMake(x, y);
    }
    geometry.ccp = ccp;
    /**
     * Add the values of two points together
     *
     * @param {geometry.Point} p1 First point
     * @param {geometry.Point} p2 Second point
     * @returns {geometry.Point} New point
     */
    function ccpAdd(p1, p2) {
        return geometry.ccp(p1.x + p2.x, p1.y + p2.y);
    }
    geometry.ccpAdd = ccpAdd;
    /**
     * Subtract the values of two points
     *
     * @param {geometry.Point} p1 First point
     * @param {geometry.Point} p2 Second point
     * @returns {geometry.Point} New point
     */
    function ccpSub(p1, p2) {
        return geometry.ccp(p1.x - p2.x, p1.y - p2.y);
    }
    geometry.ccpSub = ccpSub;
    /**
     * Muliply the values of two points together
     *
     * @param {geometry.Point} p1 First point
     * @param {geometry.Point} p2 Second point
     * @returns {geometry.Point} New point
     */
    function ccpMult(p1, p2) {
        return geometry.ccp(p1.x * p2.x, p1.y * p2.y);
    }
    geometry.ccpMult = ccpMult;
    /**
     * Invert the values of a geometry.Point
     *
     * @param {geometry.Point} p Point to invert
     * @returns {geometry.Point} New point
     */
    function ccpNeg(p) {
        return geometry.ccp(-p.x, -p.y);
    }
    geometry.ccpNeg = ccpNeg;
    /**
     * Round values on a geometry.Point to whole numbers
     *
     * @param {geometry.Point} p Point to round
     * @returns {geometry.Point} New point
     */
    function ccpRound(p) {
        return geometry.ccp(Math.round(p.x), Math.round(p.y));
    }
    geometry.ccpRound = ccpRound;
    /**
     * Round up values on a geometry.Point to whole numbers
     *
     * @param {geometry.Point} p Point to round
     * @returns {geometry.Point} New point
     */
    function ccpCeil(p) {
        return geometry.ccp(Math.ceil(p.x), Math.ceil(p.y));
    }
    geometry.ccpCeil = ccpCeil;
    /**
     * Round down values on a geometry.Point to whole numbers
     *
     * @param {geometry.Point} p Point to round
     * @returns {geometry.Point} New point
     */
    function ccpFloor(p) {
        return geometry.ccp(Math.floor(p.x), Math.floor(p.y));
    }
    geometry.ccpFloor = ccpFloor;
    function PointZero() {
        return ccp(0, 0);
    }
    geometry.PointZero = PointZero;
    function rectMake(x, y, w, h) {
        return new Rect(x, y, w, h);
    }
    geometry.rectMake = rectMake;
    function rectFromString(str) {
        var matches = str.match(RE_DOUBLE_PAIR), p = pointFromString(matches[1]), s = sizeFromString(matches[2]);
        return rectMake(p.x, p.y, s.width, s.height);
    }
    geometry.rectFromString = rectFromString;
    function sizeMake(w, h) {
        return new geometry.Size(w, h);
    }
    geometry.sizeMake = sizeMake;
    function sizeFromString(str) {
        var matches = str.match(RE_PAIR), w = parseFloat(matches[1]), h = parseFloat(matches[2]);
        return geometry.sizeMake(w, h);
    }
    geometry.sizeFromString = sizeFromString;
    function pointMake(x, y) {
        return new geometry.Point(x, y);
    }
    geometry.pointMake = pointMake;
    function pointFromString(str) {
        var matches = str.match(RE_PAIR), x = parseFloat(matches[1]), y = parseFloat(matches[2]);
        return geometry.pointMake(x, y);
    }
    geometry.pointFromString = pointFromString;
    function rectContainsPoint(r, p) {
        return ((p.x >= r.origin.x && p.x <= r.origin.x + r.size.width) &&
            (p.y >= r.origin.y && p.y <= r.origin.y + r.size.height));
    }
    geometry.rectContainsPoint = rectContainsPoint;
    function rectUnion(r1, r2) {
        var rect = new geometry.Rect(0, 0, 0, 0);
        rect.origin.x = Math.min(r1.origin.x, r2.origin.x);
        rect.origin.y = Math.min(r1.origin.y, r2.origin.y);
        rect.size.width = Math.max(r1.origin.x + r1.size.width, r2.origin.x + r2.size.width) - rect.origin.x;
        rect.size.height = Math.max(r1.origin.y + r1.size.height, r2.origin.y + r2.size.height) - rect.origin.y;
        return rect;
    }
    geometry.rectUnion = rectUnion;
    function rectOverlapsRect(r1, r2) {
        if (r1.origin.x + r1.size.width < r2.origin.x) {
            return false;
        }
        if (r2.origin.x + r2.size.width < r1.origin.x) {
            return false;
        }
        if (r1.origin.y + r1.size.height < r2.origin.y) {
            return false;
        }
        if (r2.origin.y + r2.size.height < r1.origin.y) {
            return false;
        }
        return true;
    }
    geometry.rectOverlapsRect = rectOverlapsRect;
    function rectIntersection(lhsRect, rhsRect) {
        var intersection = new geometry.Rect(Math.max(geometry.rectGetMinX(lhsRect), geometry.rectGetMinX(rhsRect)), Math.max(geometry.rectGetMinY(lhsRect), geometry.rectGetMinY(rhsRect)), 0, 0);
        intersection.size.width = Math.min(geometry.rectGetMaxX(lhsRect), geometry.rectGetMaxX(rhsRect)) - geometry.rectGetMinX(intersection);
        intersection.size.height = Math.min(geometry.rectGetMaxY(lhsRect), geometry.rectGetMaxY(rhsRect)) - geometry.rectGetMinY(intersection);
        return intersection;
    }
    geometry.rectIntersection = rectIntersection;
    function pointEqualToPoint(point1, point2) {
        return (point1.x == point2.x && point1.y == point2.y);
    }
    geometry.pointEqualToPoint = pointEqualToPoint;
    function sizeEqualToSize(size1, size2) {
        return (size1.width == size2.width && size1.height == size2.height);
    }
    geometry.sizeEqualToSize = sizeEqualToSize;
    function rectEqualToRect(rect1, rect2) {
        return (module.exports.sizeEqualToSize(rect1.size, rect2.size) && module.exports.pointEqualToPoint(rect1.origin, rect2.origin));
    }
    geometry.rectEqualToRect = rectEqualToRect;
    function rectGetMinX(rect) {
        return rect.origin.x;
    }
    geometry.rectGetMinX = rectGetMinX;
    function rectGetMinY(rect) {
        return rect.origin.y;
    }
    geometry.rectGetMinY = rectGetMinY;
    function rectGetMaxX(rect) {
        return rect.origin.x + rect.size.width;
    }
    geometry.rectGetMaxX = rectGetMaxX;
    function rectGetMaxY(rect) {
        return rect.origin.y + rect.size.height;
    }
    geometry.rectGetMaxY = rectGetMaxY;
    function boundingRectMake(p1, p2, p3, p4) {
        var minX = Math.min(p1.x, p2.x, p3.x, p4.x);
        var minY = Math.min(p1.y, p2.y, p3.y, p4.y);
        var maxX = Math.max(p1.x, p2.x, p3.x, p4.x);
        var maxY = Math.max(p1.y, p2.y, p3.y, p4.y);
        return new geometry.Rect(minX, minY, (maxX - minX), (maxY - minY));
    }
    geometry.boundingRectMake = boundingRectMake;
    function pointApplyAffineTransform(point, t) {
        /*
        aPoint.x * aTransform.a + aPoint.y * aTransform.c + aTransform.tx,
        aPoint.x * aTransform.b + aPoint.y * aTransform.d + aTransform.ty
        */
        return new geometry.Point(t.a * point.x + t.c * point.y + t.tx, t.b * point.x + t.d * point.y + t.ty);
    }
    geometry.pointApplyAffineTransform = pointApplyAffineTransform;
    function rectApplyAffineTransform(rect, trans) {
        var p1 = geometry.ccp(geometry.rectGetMinX(rect), geometry.rectGetMinY(rect));
        var p2 = geometry.ccp(geometry.rectGetMaxX(rect), geometry.rectGetMinY(rect));
        var p3 = geometry.ccp(geometry.rectGetMinX(rect), geometry.rectGetMaxY(rect));
        var p4 = geometry.ccp(geometry.rectGetMaxX(rect), geometry.rectGetMaxY(rect));
        p1 = geometry.pointApplyAffineTransform(p1, trans);
        p2 = geometry.pointApplyAffineTransform(p2, trans);
        p3 = geometry.pointApplyAffineTransform(p3, trans);
        p4 = geometry.pointApplyAffineTransform(p4, trans);
        return geometry.boundingRectMake(p1, p2, p3, p4);
    }
    geometry.rectApplyAffineTransform = rectApplyAffineTransform;
    function affineTransformInvert(trans) {
        var determinant = 1 / (trans.a * trans.d - trans.b * trans.c);
        return new geometry.TransformMatrix(determinant * trans.d, -determinant * trans.b, -determinant * trans.c, determinant * trans.a, determinant * (trans.c * trans.ty - trans.d * trans.tx), determinant * (trans.b * trans.tx - trans.a * trans.ty));
    }
    geometry.affineTransformInvert = affineTransformInvert;
    function affineTransformConcat(lhs, rhs) {
        return new geometry.TransformMatrix(lhs.a * rhs.a + lhs.b * rhs.c, lhs.a * rhs.b + lhs.b * rhs.d, lhs.c * rhs.a + lhs.d * rhs.c, lhs.c * rhs.b + lhs.d * rhs.d, lhs.tx * rhs.a + lhs.ty * rhs.c + rhs.tx, lhs.tx * rhs.b + lhs.ty * rhs.d + rhs.ty);
    }
    geometry.affineTransformConcat = affineTransformConcat;
    function degreesToRadians(angle) {
        return angle / 180.0 * Math.PI;
    }
    geometry.degreesToRadians = degreesToRadians;
    function radiansToDegrees(angle) {
        return angle * (180.0 / Math.PI);
    }
    geometry.radiansToDegrees = radiansToDegrees;
    /**
     * Translate (move) a transform matrix
     *
     * @param {geometry.TransformMatrix} trans TransformMatrix to translate
     * @param {Float} tx Amount to translate along X axis
     * @param {Float} ty Amount to translate along Y axis
     * @returns {geometry.TransformMatrix} A new TransformMatrix
     */
    function affineTransformTranslate(trans, tx, ty) {
        var newTrans = _util__WEBPACK_IMPORTED_MODULE_0__[/* util */ "a"].copy(trans);
        newTrans.tx = trans.tx + trans.a * tx + trans.c * ty;
        newTrans.ty = trans.ty + trans.b * tx + trans.d * ty;
        return newTrans;
    }
    geometry.affineTransformTranslate = affineTransformTranslate;
    /**
     * Rotate a transform matrix
     *
     * @param {geometry.TransformMatrix} trans TransformMatrix to rotate
     * @param {Float} angle Angle in radians
     * @returns {geometry.TransformMatrix} A new TransformMatrix
     */
    function affineTransformRotate(trans, angle) {
        var sin = Math.sin(angle), cos = Math.cos(angle);
        return new geometry.TransformMatrix(trans.a * cos + trans.c * sin, trans.b * cos + trans.d * sin, trans.c * cos - trans.a * sin, trans.d * cos - trans.b * sin, trans.tx, trans.ty);
    }
    geometry.affineTransformRotate = affineTransformRotate;
    /**
     * Scale a transform matrix
     *
     * @param {geometry.TransformMatrix} trans TransformMatrix to scale
     * @param {Float} sx X scale factor
     * @param {Float} [sy=sx] Y scale factor
     * @returns {geometry.TransformMatrix} A new TransformMatrix
     */
    function affineTransformScale(trans, sx, sy) {
        if (sy === undefined) {
            sy = sx;
        }
        return new geometry.TransformMatrix(trans.a * sx, trans.b * sx, trans.c * sy, trans.d * sy, trans.tx, trans.ty);
    }
    geometry.affineTransformScale = affineTransformScale;
    /**
     * @returns {geometry.TransformMatrix} identity matrix
     */
    function affineTransformIdentity() {
        return new geometry.TransformMatrix(1, 0, 0, 1, 0, 0);
    }
    geometry.affineTransformIdentity = affineTransformIdentity;
})(geometry || (geometry = {}));
//# sourceMappingURL=geometry.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(2)(module)))

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return util; });
/**
 * @namespace
 * Useful utility functions
 */
var util;
(function (util) {
    /**
     * Merge two or more objects and return the result.
     *
     * @param {Object} firstObject First object to merge with
     * @param {Object} secondObject Second object to merge with
     * @param {Object} [...] More objects to merge
     * @returns {Object} A new object containing the properties of all the objects passed in
     */
    function merge(firstObject, secondObject) {
        var result = {};
        for (var i = 0; i < arguments.length; i++) {
            var obj = arguments[i];
            for (var x in obj) {
                if (!obj.hasOwnProperty(x)) {
                    continue;
                }
                result[x] = obj[x];
            }
        }
        ;
        return result;
    }
    util.merge = merge;
    /**
    * Creates a deep copy of an object
    *
    * @param {Object} obj The Object to copy
    * @returns {Object} A copy of the original Object
    */
    function copy(obj) {
        if (obj === null) {
            return null;
        }
        var copy;
        if (obj instanceof Array) {
            copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = util.copy(obj[i]);
            }
        }
        else if (typeof (obj) == 'object') {
            if (typeof (obj.copy) == 'function') {
                copy = obj.copy();
            }
            else {
                copy = {};
                var o, x;
                for (x in obj) {
                    copy[x] = util.copy(obj[x]);
                }
            }
        }
        else {
            // Primative type. Doesn't need copying
            copy = obj;
        }
        return copy;
    }
    util.copy = copy;
    /**
     * Iterates over an array and calls a function for each item.
     *
     * @param {Array} arr An Array to iterate over
     * @param {Function} func A function to call for each item in the array
     * @returns {Array} The original array
     */
    function each(arr, func) {
        var i = 0, len = arr.length;
        for (i = 0; i < len; i++) {
            func(arr[i], i);
        }
        return arr;
    }
    util.each = each;
    /**
     * Iterates over an array, calls a function for each item and returns the results.
     *
     * @param {Array} arr An Array to iterate over
     * @param {Function} func A function to call for each item in the array
     * @returns {Array} The return values from each function call
     */
    function map(arr, func) {
        var i = 0, len = arr.length, result = new Array();
        for (i = 0; i < len; i++) {
            result.push(func(arr[i], i));
        }
        return result;
    }
    util.map = map;
    function callback(target, method) {
        var m2;
        if (typeof (method) == 'string') {
            var methodName = method;
            method = target[method];
            if (!method) {
                throw "Callback to undefined method: " + methodName;
            }
        }
        m2 = method;
        if (!method) {
            throw "Callback with no method to call";
        }
        return function () {
            m2.apply(target, arguments);
        };
    }
    util.callback = callback;
})(util || (util = {}));
//# sourceMappingURL=util.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if (!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./scripts/Cocos2d/libs/events.js
/**
 * @private
 * @ignore
 * Returns the event listener property of an object, creating it if it doesn't
 * already exist.
 *
 * @returns {Object}
 */
var events;
(function (events) {
    function getListeners(obj, eventName) {
        if (!obj.js_listeners_) {
            obj.js_listeners_ = {};
        }
        if (!eventName) {
            return obj.js_listeners_;
        }
        if (!obj.js_listeners_[eventName]) {
            obj.js_listeners_[eventName] = {};
        }
        return obj.js_listeners_[eventName];
    }
    /**
     * @private
     * @ignore
     * Keep track of the next ID for each new EventListener
     */
    var eventID = 0;
    class EventListener {
        constructor(source, eventName, handler) {
            this.source = source;
            this.eventName = eventName;
            this.handler = handler;
            this.id = 0;
            this.id = ++eventID;
            getListeners(source, eventName)[this.id] = this;
        }
    }
    events.EventListener = EventListener;
    /**
     * Register an event listener
     *
     * @param {Object} source Object to listen to for an event
     * @param {String|Stringp[} eventName Name or Array of names of the event(s) to listen for
     * @param {Function} handler Callback to fire when the event triggers
     *
     * @returns {events.EventListener|events.EventListener[]} The event listener(s). Pass to removeListener to destroy it.
     */
    function addListener(source, eventName, handler) {
        if (eventName instanceof Array) {
            var listeners = [];
            for (var i = 0, len = eventName.length; i < len; i++) {
                listeners.push(new events.EventListener(source, eventName[i], handler));
            }
            return listeners;
        }
        else {
            return new EventListener(source, eventName, handler);
        }
    }
    events.addListener = addListener;
    /**
 * Trigger an event. All listeners will be notified.
 *
 * @param {Object} source Object to trigger the event on
 * @param {String} eventName Name of the event to trigger
 */
    function trigger(source, eventName, ...args) {
        var listeners = getListeners(source, eventName), 
        //args = Array.prototype.slice.call(arguments, 2),
        eventID, l;
        for (eventID in listeners) {
            if (listeners.hasOwnProperty(eventID)) {
                l = listeners[eventID];
                if (l) {
                    l.handler.apply(undefined, ...args);
                }
            }
        }
    }
    events.trigger = trigger;
    /**
 * Remove a previously registered event listener
 *
 * @param {events.EventListener} listener EventListener to remove, as returned by events.addListener
 */
    function removeListener(listener) {
        delete getListeners(listener.source, listener.eventName)[listener.id];
    }
    events.removeListener = removeListener;
    /**
 * Remove a all event listeners for a given event
 *
 * @param {Object} source Object to remove listeners from
 * @param {String} eventName Name of event to remove listeners from
 */
    function clearListeners(source, eventName) {
        var listeners = getListeners(source, eventName), eventID;
        for (eventID in listeners) {
            if (listeners.hasOwnProperty(eventID)) {
                var l = listeners[eventID];
                if (l) {
                    events.removeListener(l);
                }
            }
        }
    }
    events.clearListeners = clearListeners;
    /**
 * Remove all event listeners on an object
 *
 * @param {Object} source Object to remove listeners from
 */
    function clearInstanceListeners(source) {
        var listeners = getListeners(source, null), eventID;
        for (var eventName in listeners) {
            if (listeners.hasOwnProperty(eventName)) {
                var el = listeners[eventName];
                for (eventID in el) {
                    if (el.hasOwnProperty(eventID)) {
                        var l = el[eventID];
                        if (l) {
                            events.removeListener(l);
                        }
                    }
                }
            }
        }
    }
    events.clearInstanceListeners = clearInstanceListeners;
})(events || (events = {}));
//# sourceMappingURL=events.js.map
// CONCATENATED MODULE: ./scripts/Cocos2d/libs/bobject.js

/**
 * @ignore
 */
function getAllAccessors(obj) {
    if (!obj.js_accessors_) {
        obj.js_accessors_ = {};
    }
    return obj.js_accessors_;
}
function getAccessor(obj, key) {
    if (!obj.js_accessors_) {
        obj.js_accessors_ = {};
    }
    return (obj.js_accessors_[key]);
}
/**
 * @ignore
 */
function getBindings(obj) {
    if (!obj.js_bindings_) {
        obj.js_bindings_ = {};
    }
    return obj.js_bindings_;
}
/**
 * @ignore
 */
function addAccessor(obj, key, target, targetKey, noNotify) {
    getAllAccessors(obj)[key] = {
        key: targetKey,
        target: target
    };
    if (!noNotify) {
        obj.triggerChanged(key);
    }
}
/**
 * @ignore
 */
var objectID = 0;
class bobject_BObject {
    constructor() {
        this._id = 0;
        //protected init(args:any):void {
        //}
        this.getValue = (key) => {
            var next = false;
            if (~key.indexOf('.')) {
                var tokens = key.split('.');
                key = tokens.shift();
                next = tokens.join('.');
            }
            var accessor = getAccessor(this, key), val;
            if (accessor) {
                val = accessor.target.getValue(accessor.key);
            }
            else {
                // Call getting function
                if (this['get_' + key]) {
                    val = this['get_' + key]();
                }
                else {
                    val = this[key];
                }
            }
            if (next) {
                return val.get(next);
            }
            else {
                return val;
            }
        };
        this.setValue = (key, oldVal, value, setProp = false) => {
            if (oldVal == null) {
                oldVal = this.getValue(key);
            }
            //var oldVal = this.getValue<t>(key);
            if (setProp) {
                this.triggerBeforeChanged(key, oldVal);
                if (this['set_' + key]) {
                    this['set_' + key](value);
                }
                else {
                    this[key] = value;
                }
            }
            //if (triggerEvents) {
            var accessor = getAccessor(this, key);
            if (accessor) {
                accessor.target.setValue(accessor.key, oldVal, value, true);
            }
            this.triggerChanged(key, oldVal);
            //}
        };
        //public setValues=(kvp: Array<any>): void=> {
        //    for (var x in kvp) {
        //        if (kvp.hasOwnProperty(x)) {
        //            this.set(x, kvp[x]);
        //        }
        //    }
        //}
        this.changed = (key) => {
        };
        this.notify = (key, oldVal) => {
            var accessor = getAccessor(this, key);
            if (accessor) {
                accessor.target.notify(accessor.key, oldVal);
            }
        };
        this.triggerBeforeChanged = (key, oldVal) => {
            events.trigger(this, key.toLowerCase() + '_before_changed', oldVal);
        };
        this.triggerChanged = (key, oldVal) => {
            events.trigger(this, key.toLowerCase() + '_changed', oldVal);
        };
        /**
         * Bind the value of a property on this object to that of another object so
         * they always have the same value. Setting the value on either object will update
         * the other too.
         *
         * @param {String} key Name of the property on this object that should be bound
         * @param {BOject} target Object to bind to
         * @param {String} [targetKey=key] Key on the target object to bind to
         * @param {Boolean} [noNotify=false] Set to true to prevent this object's property triggering a 'changed' event when adding the binding
         */
        this.bindTo = (key, target, targetKey, noNotify) => {
            targetKey = targetKey || key;
            var self = this;
            this.unbind(key);
            this[key] = this.getValue(key);
            // When bound property changes, trigger a 'changed' event on this one too
            getBindings(this)[key] = events.addListener(target, targetKey.toLowerCase() + '_changed', (oldVal) => {
                this[key] = this.getValue(key);
                self.triggerChanged(key, oldVal);
            });
            addAccessor(this, key, target, targetKey, noNotify);
        };
        /**
         * Remove binding from a property which set setup using BObject#bindTo.
         *
         * @param {String} key Name of the property on this object to unbind
         */
        this.unbind = (key) => {
            var binding = getBindings(this)[key];
            if (!binding) {
                return;
            }
            delete getBindings(this)[key];
            events.removeListener(binding);
            // Grab current value from bound property
            var val = this.getValue(key);
            delete getAllAccessors(this)[key];
            // Set bound value
            this[key] = val;
        };
        /**
         * Remove all bindings on this object
         */
        this.unbindAll = () => {
            var keys = [], bindings = getBindings(this);
            for (var k in bindings) {
                if (bindings.hasOwnProperty(k)) {
                    this.unbind(k);
                }
            }
        };
        //this.init.apply(this, ...args);
    }
    /**
     * Unique ID for this object
     * @getter id
     * @type Integer
     */
    get id() {
        if (!this._id) {
            this._id = ++objectID;
        }
        return this._id;
    }
}
//# sourceMappingURL=bobject.js.map
// EXTERNAL MODULE: ./scripts/Cocos2d/libs/util.js
var util = __webpack_require__(1);

// CONCATENATED MODULE: ./scripts/Cocos2d/Scheduler.js


var Scheduler_Scheduler;
(function (Scheduler_1) {
    class HashUpdateEntry {
        //public timers: Array<Timer> = new Array<Timer>();
        //public timerIndex:number = 0;
        //public currentTimer:Timer = null;
        //public currentTimerSalvaged:boolean = false;
        //;
        constructor(target = null, priority = 0, paused = false) {
            this.target = target;
            this.priority = priority;
            this.paused = paused;
        }
    }
    class HashMethodEntry {
        constructor() {
            this.timers = new Array();
            this.timerIndex = 0;
            this.currentTimer = null;
            this.currentTimerSalvaged = false;
            this.paused = false;
            this.target = null;
        }
    }
    class Timer extends bobject_BObject {
        constructor(_callback, _interval) {
            super();
            this._callback = _callback;
            this._interval = _interval;
            this._elapsed = -1;
            this.interval = this.interval || 0;
            this.elapsed = -1;
        }
        //protected _callback: (elapsed:number) => void = null;
        get callback() {
            return this.getValue("_callback");
        }
        set callback(value) {
            this.setValue("_callback", null, value, true);
        }
        //protected _interval: number = 0;
        get interval() {
            return this.getValue("_interval");
        }
        set interval(value) {
            this.setValue("_interval", null, value, true);
        }
        get elapsed() {
            return this.getValue("_elapsed");
        }
        set elapsed(value) {
            this.setValue("_elapsed", null, value, true);
        }
        update(dt) {
            if (this.elapsed == -1) {
                this.elapsed = 0;
            }
            else {
                this.elapsed += dt;
            }
            if (this.elapsed >= this.interval) {
                this.callback(this.elapsed);
                this.elapsed = 0;
            }
        }
    }
    Scheduler_1.Timer = Timer;
    class ScheduleOptions {
        constructor(target, method, interval = 1, paused = false, priority = 1) {
            this.target = target;
            this.method = method;
            this.interval = interval;
            this.paused = paused;
            this.priority = priority;
        }
    }
    Scheduler_1.ScheduleOptions = ScheduleOptions;
    class Scheduler extends bobject_BObject {
        constructor() {
            super();
            this._updates0 = null;
            this._updatesNeg = null;
            this._updatesPos = null;
            this._hashForUpdates = null;
            this._hashForMethods = null;
            this._timeScale = 1.0;
            //ScheduleOptions
            /**
             * The scheduled method will be called every 'interval' seconds.
             * If paused is YES, then it won't be called until it is resumed.
             * If 'interval' is 0, it will be called every frame, but if so, it recommened to use 'scheduleUpdateForTarget:' instead.
             * If the selector is already scheduled, then only the interval parameter will be updated without re-scheduling it again.
             */
            this.schedule = (opts) => {
                var target = opts.target, method = opts.method, interval = opts.interval, paused = opts.paused || false;
                var element = this.hashForMethods[target.id];
                if (!element) {
                    element = new HashMethodEntry();
                    this.hashForMethods[target.id] = element;
                    element.target = target;
                    element.paused = paused;
                }
                else if (element.paused != paused) {
                    throw "cocos.Scheduler. Trying to schedule a method with a pause value different than the target";
                }
                var timer = new Timer(util["a" /* util */].callback(target, method), interval);
                element.timers.push(timer);
            };
            /**
             * Schedules the 'update' selector for a given target with a given priority.
             * The 'update' selector will be called every frame.
             * The lower the priority, the earlier it is called.
             */
            this.scheduleUpdate = (opts) => {
                var target = opts.target, priority = opts.priority, paused = opts.paused;
                var i, len;
                var entry = new HashUpdateEntry(target, priority, paused);
                var added = false;
                if (priority === 0) {
                    this.updates0.push(entry);
                }
                else if (priority < 0) {
                    for (i = 0, len = this.updatesNeg.length; i < len; i++) {
                        if (priority < this.updatesNeg[i].priority) {
                            this.updatesNeg.splice(i, 0, entry);
                            added = true;
                            break;
                        }
                    }
                    if (!added) {
                        this.updatesNeg.push(entry);
                    }
                }
                else /* priority > 0 */ {
                    for (i = 0, len = this.updatesPos.length; i < len; i++) {
                        if (priority < this.updatesPos[i].priority) {
                            this.updatesPos.splice(i, 0, entry);
                            added = true;
                            break;
                        }
                    }
                    if (!added) {
                        this.updatesPos.push(entry);
                    }
                }
                this.hashForUpdates[target.id] = entry;
            };
            /**
             * 'tick' the scheduler.
             * You should NEVER call this method, unless you know what you are doing.
             */
            this.tick = (dt) => {
                var i, len, x;
                if (this.timeScale != 1.0) {
                    dt *= this.timeScale;
                }
                var entry;
                for (i = 0, len = this.updatesNeg.length; i < len; i++) {
                    entry = this.updatesNeg[i];
                    if (entry && !entry.paused) {
                        entry.target.update(dt);
                    }
                }
                for (i = 0, len = this.updates0.length; i < len; i++) {
                    entry = this.updates0[i];
                    if (entry && !entry.paused) {
                        entry.target.update(dt);
                    }
                }
                for (i = 0, len = this.updatesPos.length; i < len; i++) {
                    entry = this.updatesPos[i];
                    if (entry && !entry.paused) {
                        entry.target.update(dt);
                    }
                }
                var entry2;
                for (x in this.hashForMethods) {
                    if (this.hashForMethods.hasOwnProperty(x)) {
                        entry2 = this.hashForMethods[x];
                        if (entry2) {
                            for (i = 0, len = entry2.timers.length; i < len; i++) {
                                var timer = entry2.timers[i];
                                if (timer) {
                                    timer.update(dt);
                                }
                            }
                        }
                    }
                }
            };
            /**
         * Unshedules a selector for a given target.
         * If you want to unschedule the "update", use unscheduleUpdateForTarget.
         */
            this.unschedule = (opts) => {
                if (!opts.target || !opts.method) {
                    return;
                }
                var element = this.hashForMethods[opts.target.id];
                if (element) {
                    for (var i = 0; i < element.timers.length; i++) {
                        // Compare callback function
                        if (element.timers[i].callback == util["a" /* util */].callback(opts.target, opts.method)) {
                            var timer = element.timers.splice(i, 1);
                            timer = null;
                        }
                    }
                }
            };
            /**
             * Unschedules the update selector for a given target
             */
            this.unscheduleUpdateForTarget = (target) => {
                if (!target) {
                    return;
                }
                var id = target.id, elementUpdate = this.hashForUpdates[id];
                if (elementUpdate) {
                    // Remove from updates list
                    if (elementUpdate.priority === 0) {
                        this.updates0.splice(this.updates0.indexOf(elementUpdate), 1);
                    }
                    else if (elementUpdate.priority < 0) {
                        this.updatesNeg.splice(this.updatesNeg.indexOf(elementUpdate), 1);
                    }
                    else /* priority > 0 */ {
                        this.updatesPos.splice(this.updatesPos.indexOf(elementUpdate), 1);
                    }
                }
                // Release HashMethodEntry object
                this.hashForUpdates[id] = null;
            };
            /**
         * Unschedules all selectors from all targets.
         * You should NEVER call this method, unless you know what you are doing.
         */
            this.unscheduleAllSelectors = () => {
                var i, x, entry, len;
                // Custom selectors
                for (x in this.hashForMethods) {
                    if (this.hashForMethods.hasOwnProperty(x)) {
                        entry = this.hashForMethods[x];
                        this.unscheduleAllSelectorsForTarget(entry.target);
                    }
                }
                var entry2;
                // Updates selectors
                for (i = 0, len = this.updatesNeg.length; i < len; i++) {
                    entry2 = this.updatesNeg[i];
                    if (entry) {
                        this.unscheduleUpdateForTarget(entry2.target);
                    }
                }
                for (i = 0, len = this.updates0.length; i < len; i++) {
                    entry2 = this.updates0[i];
                    if (entry) {
                        this.unscheduleUpdateForTarget(entry2.target);
                    }
                }
                for (i = 0, len = this.updatesPos.length; i < len; i++) {
                    entry2 = this.updatesPos[i];
                    if (entry) {
                        this.unscheduleUpdateForTarget(entry2.target);
                    }
                }
            };
            /**
             * Unschedules all selectors for a given target.
             * This also includes the "update" selector.
             */
            this.unscheduleAllSelectorsForTarget = (target) => {
                if (!target) {
                    return;
                }
                // Custom selector
                var element = this.hashForMethods[target.id];
                if (element) {
                    element.paused = true;
                    element.timers = []; // Clear all timers
                }
                // Release HashMethodEntry object
                this.hashForMethods[target.id] = null;
                // Update selector
                this.unscheduleUpdateForTarget(target);
            };
            /**
         * Pauses the target.
         * All scheduled selectors/update for a given target won't be 'ticked' until the target is resumed.
         * If the target is not present, nothing happens.
         */
            this.pauseTarget = (target) => {
                var element = this.hashForMethods[target.id];
                if (element) {
                    element.paused = true;
                }
                var elementUpdate = this.hashForUpdates[target.id];
                if (elementUpdate) {
                    elementUpdate.paused = true;
                }
            };
            /**
         * Resumes the target.
         * The 'target' will be unpaused, so all schedule selectors/update will be 'ticked' again.
         * If the target is not present, nothing happens.
         */
            this.resumeTarget = (target) => {
                var element = this.hashForMethods[target.id];
                if (element) {
                    element.paused = false;
                }
                var elementUpdate = this.hashForUpdates[target.id];
                //console.log('foo', target.get('id'), elementUpdate);
                if (elementUpdate) {
                    elementUpdate.paused = false;
                }
            };
            this.updates0 = [];
            this.updatesNeg = [];
            this.updatesPos = [];
            this.hashForUpdates = {};
            this.hashForMethods = {};
        }
        get updates0() {
            return this.getValue("_updates0");
        }
        set updates0(value) {
            this.setValue("_updates0", null, value, true);
        }
        get updatesNeg() {
            return this.getValue("_updatesNeg");
        }
        set updatesNeg(value) {
            this.setValue("_updatesNeg", null, value, true);
        }
        get updatesPos() {
            return this.getValue("_updatesPos");
        }
        set updatesPos(value) {
            this.setValue("_updatesPos", null, value, true);
        }
        get hashForUpdates() {
            return this.getValue("_hashForUpdates");
        }
        set hashForUpdates(value) {
            this.setValue("_hashForUpdates", null, value, true);
        }
        get hashForMethods() {
            return this.getValue("_hashForMethods");
        }
        set hashForMethods(value) {
            this.setValue("_hashForMethods", null, value, true);
        }
        get timeScale() {
            return this.getValue("_timeScale");
        }
        set timeScale(value) {
            this.setValue("_timeScale", null, value, true);
        }
    }
    Scheduler_1.Scheduler = Scheduler;
    var _instance = null;
    function sharedScheduler() {
        if (!_instance) {
            _instance = new Scheduler();
        }
        return _instance;
    }
    Scheduler_1.sharedScheduler = sharedScheduler;
})(Scheduler_Scheduler || (Scheduler_Scheduler = {}));
//# sourceMappingURL=Scheduler.js.map
// CONCATENATED MODULE: ./scripts/Cocos2d/ActionManager.js



var ActionManager_ActionManager;
(function (ActionManager_1) {
    class ActionEntry {
        constructor(target, paused = false) {
            this.target = target;
            this.paused = paused;
            this.actions = new Array();
            this.currentAction = null;
            this.currentActionSalvaged = false;
        }
    }
    ActionManager_1.ActionEntry = ActionEntry;
    class ActionManager extends bobject_BObject {
        constructor() {
            super();
            this._targets = null;
            this._currentTarget = null;
            this._currentTargetSalvaged = false;
            /**
         * Adds an action with a target. If the target is already present, then the
         * action will be added to the existing target. If the target is not
         * present, a new instance of this target will be created either paused or
         * paused, and the action will be added to the newly created target. When
         * the target is paused, the queued actions won't be 'ticked'.
         *
         * @opt {cocos.nodes.Node} target Node to run the action on
         */
            this.addAction = (target, action, paused = false) => {
                var targetID = target.id;
                var element = this.targets[targetID];
                if (!element) {
                    element = new ActionEntry(target, paused);
                    this.targets[targetID] = element;
                }
                element.actions.push(action);
                action.startWithTarget(target);
            };
            /**
         * Remove an action
         *
         * @param {cocos.actions.Action} action Action to remove
         */
            this.removeAction = (action) => {
                var targetID = action.originalTarget.id, element = this.targets[targetID];
                if (!element) {
                    return;
                }
                var actionIndex = element.actions.indexOf(action);
                if (actionIndex == -1) {
                    return;
                }
                if (this.currentTarget == element) {
                    element.currentActionSalvaged = true;
                }
                element.actions[actionIndex] = null;
                element.actions.splice(actionIndex, 1); // Delete array item
                if (element.actions.length === 0) {
                    if (this.currentTarget == element) {
                        this.currentTargetSalvaged = true;
                    }
                }
            };
            /**
         * Fetch an action belonging to a cocos.nodes.Node
         *
         * @returns {cocos.actions.Action}
         *
         * @opts {cocos.nodes.Node} target Target of the action
         * @opts {String} tag Tag of the action
         */
            this.getActionFromTarget = (target, tag) => {
                var tag = tag, targetID = target.id;
                var element = this.targets[targetID];
                if (!element) {
                    return null;
                }
                for (var i = 0; i < element.actions.length; i++) {
                    if (element.actions[i] &&
                        (element.actions[i].tag === tag)) {
                        return element.actions[i];
                    }
                }
                // Not found
                return null;
            };
            /**
         * Remove all actions for a cocos.nodes.Node
         *
         * @param {cocos.nodes.Node} target Node to remove all actions for
         */
            this.removeAllActionsFromTarget = (target) => {
                var targetID = target.id;
                var element = this.targets[targetID];
                if (!element) {
                    return;
                }
                // Delete everything in array but don't replace it incase something else has a reference
                element.actions.splice(0, element.actions.length);
            };
            /**
             * @private
             */
            this.update = (dt) => {
                util["a" /* util */].each(this.targets, (currentTarget, i) => {
                    if (!currentTarget) {
                        return;
                    }
                    this.currentTarget = currentTarget;
                    if (!currentTarget.paused) {
                        util["a" /* util */].each(currentTarget.actions, (currentAction, j) => {
                            if (!currentAction) {
                                return;
                            }
                            currentTarget.currentAction = currentAction;
                            currentTarget.currentActionSalvaged = false;
                            currentTarget.currentAction.step(dt);
                            if (currentTarget.currentAction.isDone) {
                                currentTarget.currentAction.stop();
                                var a = currentTarget.currentAction;
                                currentTarget.currentAction = null;
                                this.removeAction(a);
                            }
                            currentTarget.currentAction = null;
                        });
                    }
                    if (this.currentTargetSalvaged && currentTarget.actions.length === 0) {
                        this.targets[i] = null;
                        delete this.targets[i];
                    }
                });
            };
            this.pauseTarget = (target) => {
            };
            this.resumeTarget = (target) => {
                // TODO
            };
            Scheduler_Scheduler.sharedScheduler().scheduleUpdate(new Scheduler_Scheduler.ScheduleOptions(this, null, 1, false, 0));
            this.targets = [];
        }
        get targets() {
            return this.getValue("_targets");
        }
        set targets(value) {
            this.setValue("_targets", null, value, true);
        }
        get currentTarget() {
            return this.getValue("_currentTarget");
        }
        set currentTarget(value) {
            this.setValue("_currentTarget", null, value, true);
        }
        get currentTargetSalvaged() {
            return this.getValue("_currentTargetSalvaged");
        }
        set currentTargetSalvaged(value) {
            this.setValue("_currentTargetSalvaged", null, value, true);
        }
    }
    ActionManager_1.ActionManager = ActionManager;
    var _instance = null;
    function sharedManager() {
        if (!_instance) {
            _instance = new ActionManager();
        }
        return _instance;
    }
    ActionManager_1.sharedManager = sharedManager;
})(ActionManager_ActionManager || (ActionManager_ActionManager = {}));
//# sourceMappingURL=ActionManager.js.map
// EXTERNAL MODULE: ./scripts/Cocos2d/libs/geometry.js
var geometry = __webpack_require__(0);

// CONCATENATED MODULE: ./scripts/Cocos2d/libs/Primitives.js
var Primitives;
(function (Primitives) {
    function fillArc(context, pos, radius, startangle, endangle, color) {
        context.beginPath();
        context.fillStyle = color;
        context.arc(pos.x, pos.y, radius, startangle, endangle, false);
        context.closePath();
        context.fill();
    }
    Primitives.fillArc = fillArc;
    ;
    function fillCircle(context, pos, radius, color) {
        fillArc(context, pos, radius, 0, 2 * Math.PI, color);
    }
    Primitives.fillCircle = fillCircle;
    ;
    function fillPoly(context, refPnt, points, color) {
        context.fillStyle = color;
        context.beginPath();
        context.moveTo((refPnt.x + points[0].x), (refPnt.y + points[0].y));
        for (var j = 1; j < points.length; j++) {
            context.lineTo((points[j].x + refPnt.x), (points[j].y + refPnt.y));
        }
        context.lineTo((refPnt.x + points[0].x), (refPnt.y + points[0].y));
        context.closePath();
        context.fill();
    }
    Primitives.fillPoly = fillPoly;
    ;
    function fillRect(context, rect, color) {
        context.beginPath();
        context.fillStyle = color;
        context.fillRect(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
        context.closePath();
        context.fill();
    }
    Primitives.fillRect = fillRect;
    ;
    function fillPoint(context, pos, color) {
        context.beginPath();
        context.fillStyle = color;
        context.fillRect(pos.x, pos.y, 1, 1);
        context.closePath();
        context.fill();
    }
    Primitives.fillPoint = fillPoint;
    ;
    function drawArc(context, pos, radius, startangle, endangle, color, lineWidth) {
        if (lineWidth == null) {
            lineWidth = 1;
        }
        context.beginPath();
        context.lineWidth = lineWidth;
        context.strokeStyle = color;
        context.arc(pos.x, pos.y, radius, startangle, endangle, false);
        context.closePath();
        context.stroke();
    }
    Primitives.drawArc = drawArc;
    ;
    function drawCircle(context, pos, radius, color, lineWidth) {
        drawArc(context, pos, radius, 0, 2 * Math.PI, color, lineWidth);
    }
    Primitives.drawCircle = drawCircle;
    ;
    function drawPoly(context, refPnt, points, color, lineWidth) {
        if (points.length == 0) {
            return;
        }
        if (lineWidth == null) {
            lineWidth = 1;
        }
        context.strokeStyle = color;
        context.beginPath();
        context.lineWidth = lineWidth;
        context.moveTo((refPnt.x + points[0].x), (refPnt.y + points[0].y));
        for (var j = 1; j < points.length; j++) {
            context.lineTo((points[j].x + refPnt.x), (points[j].y + refPnt.y));
        }
        context.lineTo((refPnt.x + points[0].x), (refPnt.y + points[0].y));
        context.closePath();
        context.stroke();
    }
    Primitives.drawPoly = drawPoly;
    ;
    function drawRect(context, rect, color, lineWidth) {
        if (lineWidth == null) {
            lineWidth = 1;
        }
        context.beginPath();
        context.lineWidth = lineWidth;
        context.strokeStyle = color;
        context.strokeRect(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
        context.closePath();
        context.stroke();
    }
    Primitives.drawRect = drawRect;
    ;
    function drawPoint(context, pos, color) {
        context.beginPath();
        context.strokeStyle = color;
        context.strokeRect(pos.x, pos.y, 1, 1);
        context.closePath();
        context.stroke();
    }
    Primitives.drawPoint = drawPoint;
    ;
})(Primitives || (Primitives = {}));
//# sourceMappingURL=Primitives.js.map
// CONCATENATED MODULE: ./scripts/Cocos2d/nodes/Node.js








class Node_Node extends bobject_BObject {
    constructor() {
        super();
        this._isCocosNode = true;
        /**
            * Is the node visible
            * @type boolean
            */
        this._visible = true;
        /**
            * Position relative to parent node
            * @type geometry.Point
            */
        this._position = null;
        /**
            * Parent node
            * @type cocos.nodes.Node
            */
        this._parent = null;
        /**
         * Unique tag to identify the node
         * @type *
         */
        this._tag = null;
        /**
         * Size of the node
         * @type geometry.Size
         */
        this._contentSize = null;
        /**
     * Nodes Z index. i.e. draw order
     * @type Integer
     */
        this._zOrder = 0;
        /**
     * Anchor point for scaling and rotation. 0x0 is top left and 1x1 is bottom right
     * @type geometry.Point
     */
        this._anchorPoint = null;
        /**
     * Anchor point for scaling and rotation in pixels from top left
     * @type geometry.Point
     */
        this._anchorPointInPixels = null;
        /**
     * Rotation angle in degrees
     * @type Float
     */
        this._rotation = 0;
        /**
     * X scale factor
     * @type Float
     */
        this._scaleX = 1;
        /**
     * Y scale factor
     * @type Float
     */
        this._scaleY = 1;
        /**
     * Opacity of the Node. 0 is totally transparent, 255 is totally opaque
     * @type Float
     */
        this._opacity = 255;
        this._isRunning = false;
        this._isRelativeAnchorPoint = true;
        this._isTransformDirty = true;
        this._isInverseDirty = true;
        this._inverse = null;
        this._transformMatrix = null;
        /**
         * The child Nodes
         * @type cocos.nodes.Node[]
         */
        this._children = null;
        this.detatchChild = (child, cleanup = false) => {
            var children = this.children, isRunning = this.isRunning, idx = children.indexOf(child);
            if (isRunning) {
                child.onExit();
            }
            if (cleanup) {
                child.cleanup();
            }
            child.parent = null;
            children.splice(idx, 1);
        };
        /**
     * Unschedules a custom method
     *
     * @param {String|Function} method
     */
        this.unschedule = (method) => {
            if (!method) {
                return;
            }
            if (typeof method == 'string') {
                method = this[method];
            }
            Scheduler_Scheduler.sharedScheduler().unschedule(new Scheduler_Scheduler.ScheduleOptions(this, method));
        };
        this.contentSize = new geometry["a" /* geometry */].Size(0, 0);
        this.anchorPoint = geometry["a" /* geometry */].ccp(0.5, 0.5);
        this.anchorPointInPixels = geometry["a" /* geometry */].ccp(0, 0);
        this.position = geometry["a" /* geometry */].ccp(0, 0);
        this.children = [];
        util["a" /* util */].each(['scaleX', 'scaleY', 'rotation', 'position', 'anchorPoint', 'contentSize', 'isRelativeAnchorPoint'], util["a" /* util */].callback(this, (key) => {
            events.addListener(this, key.toLowerCase() + '_changed', util["a" /* util */].callback(this, this._dirtyTransform));
        }));
        events.addListener(this, 'anchorpoint_changed', util["a" /* util */].callback(this, this._updateAnchorPointInPixels));
        events.addListener(this, 'contentsize_changed', util["a" /* util */].callback(this, this._updateAnchorPointInPixels));
    }
    get isCocosNode() {
        return this.getValue("_isCocosNode");
    }
    set isCocosNode(value) {
        this.setValue("_isCocosNode", null, value, true);
    }
    get visible() {
        return this.getValue("_visible");
    }
    set visible(value) {
        this.setValue("_visible", null, value, true);
    }
    get position() {
        return this.getValue("_position");
    }
    set position(value) {
        this.setValue("_position", null, value, true);
    }
    get parent() {
        return this.getValue("_parent");
    }
    set parent(value) {
        this.setValue("_parent", null, value, true);
    }
    get tag() {
        return this.getValue("_tag");
    }
    set tag(value) {
        this.setValue("_tag", null, value, true);
    }
    get contentSize() {
        return this.getValue("_contentSize");
    }
    set contentSize(value) {
        this.setValue("_contentSize", null, value, true);
    }
    get zOrder() {
        return this.getValue("_zOrder");
    }
    set zOrder(value) {
        this.setValue("_zOrder", null, value, true);
    }
    get anchorPoint() {
        return this.getValue("_anchorPoint");
    }
    set anchorPoint(value) {
        this.setValue("_anchorPoint", null, value, true);
    }
    get anchorPointInPixels() {
        return this.getValue("_anchorPointInPixels");
    }
    set anchorPointInPixels(value) {
        this.setValue("_anchorPointInPixels", null, value, true);
    }
    get rotation() {
        return this.getValue("_rotation");
    }
    set rotation(value) {
        this.setValue("_rotation", null, value, true);
    }
    get scaleX() {
        return this.getValue("_scaleX");
    }
    set scaleX(value) {
        this.setValue("_scaleX", null, value, true);
    }
    get scaleY() {
        return this.getValue("_scaleY");
    }
    set scaleY(value) {
        this.setValue("_scaleY", null, value, true);
    }
    get opacity() {
        return this.getValue("_opacity");
    }
    set opacity(value) {
        this.setValue("_opacity", null, value, true);
    }
    get isRunning() {
        return this.getValue("_isRunning");
    }
    set isRunning(value) {
        this.setValue("_isRunning", null, value, true);
    }
    get isRelativeAnchorPoint() {
        return this.getValue("_isRelativeAnchorPoint");
    }
    set isRelativeAnchorPoint(value) {
        this.setValue("_isRelativeAnchorPoint", null, value, true);
    }
    get isTransformDirty() {
        return this.getValue("_isTransformDirty");
    }
    set isTransformDirty(value) {
        this.setValue("_isTransformDirty", null, value, true);
    }
    get isInverseDirty() {
        return this.getValue("_isInverseDirty");
    }
    set isInverseDirty(value) {
        this.setValue("_isInverseDirty", null, value, true);
    }
    get inverse() {
        return this.getValue("_inverse");
    }
    set inverse(value) {
        this.setValue("_inverse", null, value, true);
    }
    get transformMatrix() {
        return this.getValue("_transformMatrix");
    }
    set transformMatrix(value) {
        this.setValue("_transformMatrix", null, value, true);
    }
    get children() {
        return this.getValue("_children");
    }
    set children(value) {
        this.setValue("_children", null, value, true);
    }
    _updateAnchorPointInPixels() {
        var ap = this.anchorPoint, cs = this.contentSize;
        this.anchorPointInPixels = geometry["a" /* geometry */].ccp(cs.width * ap.x, cs.height * ap.y);
    }
    /**
 * Add a child Node
 *
 * @opt {cocos.nodes.Node} child The child node to add
 * @opt {Integer} [z] Z Index for the child
 * @opt {Integer|String} [tag] A tag to reference the child with
 * @returns {cocos.nodes.Node} The node the child was added to. i.e. 'this'
 */
    addChild(child, z = null, tag = "") {
        if (z === undefined || z === null) {
            z = child.zOrder;
        }
        //this.insertChild({child: child, z:z});
        var added = false;
        for (var i = 0, childLen = this.children.length; i < childLen; i++) {
            var c = this.children[i];
            if (c.zOrder > z) {
                added = true;
                this.children.splice(i, 0, child);
                break;
            }
        }
        if (!added) {
            this.children.push(child);
        }
        child.tag = tag;
        child.zOrder = z;
        child.parent = this;
        if (this.isRunning) {
            child.onEnter();
        }
        return this;
    }
    getChild(tag) {
        for (var i = 0; i < this.children.length; i++) {
            if (this.children[i].tag == tag) {
                return this.children[i];
            }
        }
        return null;
    }
    removeChild(child, cleanup = false) {
        if (!child) {
            return;
        }
        var children = this.children, idx = children.indexOf(child);
        if (idx > -1) {
            this.detatchChild(child, cleanup);
        }
    }
    removeChildren(cleanup = false) {
        var children = this.children, isRunning = this.isRunning;
        // Perform cleanup on each child but can't call removeChild()
        // due to Array.splice's destructive nature during iteration.
        for (var i = 0; i < children.length; i++) {
            if (cleanup) {
                children[i].cleanup();
            }
            if (isRunning) {
                children[i].onExit();
            }
            children[i].parent = null;
        }
        // Now safe to empty children list
        this.children = [];
    }
    reorderChild(child, z) {
        var pos = this.children.indexOf(child);
        if (pos == -1) {
            throw "Node isn't a child of this node";
        }
        child.zOrder = z;
        // Remove child
        this.children.splice(pos, 1);
        // Add child back at correct location
        var added = false;
        for (var i = 0, childLen = this.children.length; i < childLen; i++) {
            var c = this.children[i];
            if (c.zOrder > z) {
                added = true;
                this.children.splice(i, 0, child);
                break;
            }
        }
        if (!added) {
            this.children.push(child);
        }
    }
    draw(context, rect = null) {
        // All draw code goes here
    }
    /**
 * @getter scale
 * @type Float
 */
    get scale() {
        if (this.scaleX != this.scaleY) {
            throw "scaleX and scaleY aren't identical";
        }
        return this.scaleX;
    }
    /**
 * @setter scale
 * @type Float
 */
    set scale(val) {
        this.scaleX = val;
        this.scaleY = val;
    }
    scheduleUpdate(priority = 0) {
        Scheduler_Scheduler.sharedScheduler().scheduleUpdate(new Scheduler_Scheduler.ScheduleOptions(this, null, 0, !this.isRunning, priority));
    }
    /**
 * Triggered when the node is added to a scene
 *
 * @event
 */
    onEnter() {
        util["a" /* util */].each(this.children, function (child) {
            child.onEnter();
        });
        this.resumeSchedulerAndActions();
        this.isRunning = true;
    }
    /**
 * Triggered when the node is removed from a scene
 *
 * @event
 */
    onExit() {
        this.pauseSchedulerAndActions();
        this.isRunning = false;
        util["a" /* util */].each(this.children, function (child) {
            child.onExit();
        });
    }
    cleanup() {
        this.stopAllActions();
        this.unscheduleAllSelectors();
        util["a" /* util */].each(this.children, function (child) {
            child.cleanup();
        });
    }
    resumeSchedulerAndActions() {
        Scheduler_Scheduler.sharedScheduler().resumeTarget(this);
        ActionManager_ActionManager.sharedManager().resumeTarget(this);
    }
    pauseSchedulerAndActions() {
        Scheduler_Scheduler.sharedScheduler().pauseTarget(this);
        ActionManager_ActionManager.sharedManager().pauseTarget(this);
    }
    unscheduleSelector(selector) {
        Scheduler_Scheduler.sharedScheduler().unschedule(new Scheduler_Scheduler.ScheduleOptions(this, selector));
    }
    unscheduleAllSelectors() {
        Scheduler_Scheduler.sharedScheduler().unscheduleAllSelectorsForTarget(this);
    }
    stopAllActions() {
        ActionManager_ActionManager.sharedManager().removeAllActionsFromTarget(this);
    }
    visit(context, rect = null) {
        if (!this.visible) {
            return;
        }
        context.save();
        this.transform(context);
        // Set alpha value (global only for now)
        context.globalAlpha = this.opacity / 255.0;
        // Adjust redraw region by nodes position
        if (rect) {
            var pos = this.position;
            rect = new geometry["a" /* geometry */].Rect(rect.origin.x - pos.x, rect.origin.y - pos.y, rect.size.width, rect.size.height);
        }
        // Draw background nodes
        util["a" /* util */].each(this.children, function (child, i) {
            if (child.zOrder < 0) {
                child.visit(context, rect);
            }
        });
        this.draw(context, rect);
        // Draw foreground nodes
        util["a" /* util */].each(this.children, function (child, i) {
            if (child.zOrder >= 0) {
                child.visit(context, rect);
            }
        });
        var director = Director_Director.sharedDirector();
        if (!!director._showoutlines) {
            var r = new geometry["a" /* geometry */].Rect(0, 0, this.contentSize.width, this.contentSize.height);
            Primitives.drawRect(context, r, "red", 1);
            //cocos2d.drawPoint(context, this.anchorPointInPixels, "blue");
        }
        context.restore();
    }
    // | WebGLRenderingContext
    transform(context) {
        // Translate
        if (this.isRelativeAnchorPoint && (this.anchorPointInPixels.x !== 0 || this.anchorPointInPixels.y !== 0)) {
            context.translate(Math.round(-this.anchorPointInPixels.x), Math.round(-this.anchorPointInPixels.y));
        }
        if (this.anchorPointInPixels.x !== 0 || this.anchorPointInPixels.y !== 0) {
            context.translate(Math.round(this.position.x + this.anchorPointInPixels.x), Math.round(this.position.y + this.anchorPointInPixels.y));
        }
        else {
            context.translate(Math.round(this.position.x), Math.round(this.position.y));
        }
        // Rotate
        context.rotate(geometry["a" /* geometry */].degreesToRadians(this.rotation));
        // Scale
        context.scale(this.scaleX, this.scaleY);
        if (this.anchorPointInPixels.x !== 0 || this.anchorPointInPixels.y !== 0) {
            context.translate(Math.round(-this.anchorPointInPixels.x), Math.round(-this.anchorPointInPixels.y));
        }
    }
    runAction(action) {
        ActionManager_ActionManager.sharedManager().addAction(this, action, !this.isRunning);
    }
    /**
* @opts {String} tag Tag of the action to return
*/
    getAction(tag) {
        return ActionManager_ActionManager.sharedManager().getActionFromTarget(this, tag);
    }
    nodeToParentTransform() {
        if (this.isTransformDirty) {
            this.transformMatrix = geometry["a" /* geometry */].affineTransformIdentity();
            if (!this.isRelativeAnchorPoint && !geometry["a" /* geometry */].pointEqualToPoint(this.anchorPointInPixels, geometry["a" /* geometry */].ccp(0, 0))) {
                this.transformMatrix = geometry["a" /* geometry */].affineTransformTranslate(this.transformMatrix, this.anchorPointInPixels.x, this.anchorPointInPixels.y);
            }
            if (!geometry["a" /* geometry */].pointEqualToPoint(this.position, geometry["a" /* geometry */].ccp(0, 0))) {
                this.transformMatrix = geometry["a" /* geometry */].affineTransformTranslate(this.transformMatrix, this.position.x, this.position.y);
            }
            if (this.rotation !== 0) {
                this.transformMatrix = geometry["a" /* geometry */].affineTransformRotate(this.transformMatrix, -geometry["a" /* geometry */].degreesToRadians(this.rotation));
            }
            if (!(this.scaleX == 1 && this.scaleY == 1)) {
                this.transformMatrix = geometry["a" /* geometry */].affineTransformScale(this.transformMatrix, this.scaleX, this.scaleY);
            }
            if (!geometry["a" /* geometry */].pointEqualToPoint(this.anchorPointInPixels, geometry["a" /* geometry */].ccp(0, 0))) {
                this.transformMatrix = geometry["a" /* geometry */].affineTransformTranslate(this.transformMatrix, -this.anchorPointInPixels.x, -this.anchorPointInPixels.y);
            }
            this.isTransformDirty = false;
        }
        return this.transformMatrix;
    }
    parentToNodeTransform() {
        // TODO
        return null;
    }
    nodeToWorldTransform() {
        var t = this.nodeToParentTransform();
        var p;
        for (p = this.parent; p; p = p.parent) {
            t = geometry["a" /* geometry */].affineTransformConcat(t, p.nodeToParentTransform());
        }
        return t;
    }
    worldToNodeTransform() {
        return geometry["a" /* geometry */].affineTransformInvert(this.nodeToWorldTransform());
    }
    convertToNodeSpace(worldPoint) {
        return geometry["a" /* geometry */].pointApplyAffineTransform(worldPoint, this.worldToNodeTransform());
    }
    /**
 * @getter boundingBox
 * @type geometry.Rect
 */
    get boundingBox() {
        var cs = this.contentSize;
        var rect = geometry["a" /* geometry */].rectMake(0, 0, cs.width, cs.height);
        rect = geometry["a" /* geometry */].rectApplyAffineTransform(rect, this.nodeToParentTransform());
        return rect;
    }
    /**
 * @getter worldBoundingBox
 * @type geometry.Rect
 */
    get worldBoundingBox() {
        var cs = this.contentSize;
        var rect = geometry["a" /* geometry */].rectMake(0, 0, cs.width, cs.height);
        rect = geometry["a" /* geometry */].rectApplyAffineTransform(rect, this.nodeToWorldTransform());
        return rect;
    }
    /**
 * The area of the node currently visible on screen. Returns an rect even
 * if visible is false.
 *
 * @getter visibleRect
 * @type geometry.Rect
 */
    get visibleRect() {
        var s = Director_Director.sharedDirector().winSize;
        var rect = new geometry["a" /* geometry */].Rect(0, 0, s.width, s.height);
        return geometry["a" /* geometry */].rectApplyAffineTransform(rect, this.worldToNodeTransform());
    }
    /**
 * @private
 */
    _dirtyTransform() {
        this.isTransformDirty = true;
    }
    /**
 * Schedules a custom method with an interval time in seconds.
 * If time is 0 it will be ticked every frame.
 * If time is 0, it is recommended to use 'scheduleUpdate' instead.
 *
 * If the method is already scheduled, then the interval parameter will
 * be updated without scheduling it again.
 *
 * @opt {String|Function} method Function of method name to schedule
 * @opt {Float} [interval=0] Interval in seconds
 */
    schedule(method, interval = 0) {
        Scheduler_Scheduler.sharedScheduler().schedule(new Scheduler_Scheduler.ScheduleOptions(this, method, interval, this.isRunning));
    }
}
//export class NodeOptions {
//    public isCocosNode: boolean = false;
//    public z: number = 0;
//    public tag: string = "";
//    constructor(public child: Node, public cleanup: boolean = false) {
//    }
//}
//# sourceMappingURL=Node.js.map
// CONCATENATED MODULE: ./scripts/Cocos2d/nodes/Scene.js



class Scene_Scene extends Node_Node {
    /**
     * Everything in your view will be a child of this object. You need at least 1 scene per app.
     *
     * @memberOf cocos.nodes
     * @constructs
     * @extends cocos.nodes.Node
     */
    constructor() {
        super();
        var s = Director_Director.sharedDirector().winSize;
        this.isRelativeAnchorPoint = false;
        this.anchorPoint = new geometry["a" /* geometry */].Point(0.5, 0.5);
        this.contentSize = s;
    }
}
//# sourceMappingURL=Scene.js.map
// CONCATENATED MODULE: ./scripts/Cocos2d/Config.js
class Config {
}
// Invert the Y axis so origin is at the bottom left
Config.FLIP_Y_AXIS = false;
// No implemented yet
Config.ENABLE_WEB_GL = false;
Config.SHOW_REDRAW_REGIONS = false;
//# sourceMappingURL=Config.js.map
// CONCATENATED MODULE: ./scripts/Cocos2d/EventDispatcher.js



var EventDispatcher_EventDispatcher;
(function (EventDispatcher_1) {
    class delegateHandler {
        constructor(delegate, priority, flags) {
            this.delegate = delegate;
            this.priority = priority;
            this.flags = flags;
        }
    }
    class EventDispatcher extends bobject_BObject {
        constructor() {
            super();
            this.dispatchEvents = true;
            this.keyboardDelegates = new Array();
            this.mouseDelegates = new Array();
            this._keysDown = {};
        }
        addDelegate(delegate, priority, flags, list) {
            var listElement = new delegateHandler(delegate, priority, flags);
            var added = false;
            for (var i = 0; i < list.length; i++) {
                var elem = list[i];
                if (priority < elem.priority) {
                    // Priority is lower, so insert before elem
                    list.splice(i, 0, listElement);
                    added = true;
                    break;
                }
            }
            // High priority; append to array
            if (!added) {
                list.push(listElement);
            }
        }
        removeDelegate(delegate, list) {
            var idx = -1, i;
            for (i = 0; i < list.length; i++) {
                var l = list[i];
                if (l.delegate == delegate) {
                    idx = i;
                    break;
                }
            }
            if (idx == -1) {
                return;
            }
            list.splice(idx, 1);
        }
        removeAllDelegates(list) {
            list.splice(0, list.length - 1);
        }
        addMouseDelegate(delegate, priority) {
            var flags = 0;
            // TODO flags
            this.addDelegate(delegate, priority, flags, this.mouseDelegates);
        }
        removeMouseDelegate(delegate) {
            this.removeDelegate(delegate, this.mouseDelegates);
        }
        removeAllMouseDelegate() {
            this.removeAllDelegates(this.mouseDelegates);
        }
        addKeyboardDelegate(delegate, priority) {
            var flags = 0;
            // TODO flags
            this.addDelegate(delegate, priority, flags, this.keyboardDelegates);
        }
        removeKeyboardDelegate(delegate) {
            this.removeDelegate(delegate, this.keyboardDelegates);
        }
        removeAllKeyboardDelegate() {
            this.removeAllDelegates(this.keyboardDelegates);
        }
        mouseDown(evt) {
            if (!this.dispatchEvents) {
                return;
            }
            this._previousMouseMovePosition = geometry["a" /* geometry */].ccp(evt.clientX, evt.clientY);
            this._previousMouseDragPosition = geometry["a" /* geometry */].ccp(evt.clientX, evt.clientY);
            for (var i = 0; i < this.mouseDelegates.length; i++) {
                var entry = this.mouseDelegates[i];
                if (entry.delegate.mouseDown) {
                    var swallows = entry.delegate.mouseDown(evt);
                    if (swallows) {
                        break;
                    }
                }
            }
        }
        mouseMoved(evt) {
            if (!this.dispatchEvents) {
                return;
            }
            if (this._previousMouseMovePosition) {
                evt.deltaX = evt.clientX - this._previousMouseMovePosition.x;
                evt.deltaY = evt.clientY - this._previousMouseMovePosition.y;
                if (Config.FLIP_Y_AXIS) {
                    evt.deltaY *= -1;
                }
            }
            else {
                evt.deltaX = 0;
                evt.deltaY = 0;
            }
            this._previousMouseMovePosition = geometry["a" /* geometry */].ccp(evt.clientX, evt.clientY);
            for (var i = 0; i < this.mouseDelegates.length; i++) {
                var entry = this.mouseDelegates[i];
                if (entry.delegate.mouseMoved) {
                    var swallows = entry.delegate.mouseMoved(evt);
                    if (swallows) {
                        break;
                    }
                }
            }
        }
        mouseDragged(evt) {
            if (!this.dispatchEvents) {
                return;
            }
            if (this._previousMouseDragPosition) {
                evt.deltaX = evt.clientX - this._previousMouseDragPosition.x;
                evt.deltaY = evt.clientY - this._previousMouseDragPosition.y;
                if (Config.FLIP_Y_AXIS) {
                    evt.deltaY *= -1;
                }
            }
            else {
                evt.deltaX = 0;
                evt.deltaY = 0;
            }
            this._previousMouseDragPosition = geometry["a" /* geometry */].ccp(evt.clientX, evt.clientY);
            for (var i = 0; i < this.mouseDelegates.length; i++) {
                var entry = this.mouseDelegates[i];
                if (entry.delegate.mouseDragged) {
                    var swallows = entry.delegate.mouseDragged(evt);
                    if (swallows) {
                        break;
                    }
                }
            }
        }
        mouseUp(evt) {
            if (!this.dispatchEvents) {
                return;
            }
            for (var i = 0; i < this.mouseDelegates.length; i++) {
                var entry = this.mouseDelegates[i];
                if (entry.delegate.mouseUp) {
                    var swallows = entry.delegate.mouseUp(evt);
                    if (swallows) {
                        break;
                    }
                }
            }
        }
        keyDown(evt) {
            var kc = evt.keyCode;
            if (!this.dispatchEvents || this._keysDown[kc]) {
                return;
            }
            this._keysDown[kc] = true;
            for (var i = 0; i < this.keyboardDelegates.length; i++) {
                var entry = this.keyboardDelegates[i];
                if (entry.delegate.keyDown) {
                    var swallows = entry.delegate.keyDown(evt);
                    if (swallows) {
                        break;
                    }
                }
            }
        }
        keyUp(evt) {
            if (!this.dispatchEvents) {
                return;
            }
            var kc = evt.keyCode;
            if (this._keysDown[kc]) {
                delete this._keysDown[kc];
            }
            for (var i = 0; i < this.keyboardDelegates.length; i++) {
                var entry = this.keyboardDelegates[i];
                if (entry.delegate.keyUp) {
                    var swallows = entry.delegate.keyUp(evt);
                    if (swallows) {
                        break;
                    }
                }
            }
        }
    }
    EventDispatcher_1.EventDispatcher = EventDispatcher;
    var _instance = null;
    function sharedDispatcher() {
        if (!_instance) {
            _instance = new EventDispatcher();
        }
        return _instance;
    }
    EventDispatcher_1.sharedDispatcher = sharedDispatcher;
})(EventDispatcher_EventDispatcher || (EventDispatcher_EventDispatcher = {}));
//# sourceMappingURL=EventDispatcher.js.map
// CONCATENATED MODULE: ./scripts/Cocos2d/nodes/Label.js




var ccp = geometry["a" /* geometry */].ccp;
class Label_Label extends Node_Node {
    constructor(_string = "", _fontName = "Helvetica", _fontColor = "white", _fontSize = 16) {
        super();
        this._string = _string;
        this._fontName = _fontName;
        this._fontColor = _fontColor;
        this._fontSize = _fontSize;
        this._updateLabelContentSize();
    }
    get string() {
        return this.getValue("_string");
    }
    set string(value) {
        this.setValue("_string", null, value, true);
    }
    get fontName() {
        return this.getValue("_fontName");
    }
    set fontName(value) {
        this.setValue("_fontName", null, value, true);
    }
    get fontColor() {
        return this.getValue("_fontColor");
    }
    set fontColor(value) {
        this.setValue("_fontColor", null, value, true);
    }
    get fontSize() {
        return this.getValue("_fontSize");
    }
    set fontSize(value) {
        this.setValue("_fontSize", null, value, true);
    }
    get font() {
        return this.fontSize + 'px ' + this.fontName;
    }
    //draw(context: CanvasRenderingContext2D): void;
    //draw(context: CanvasRenderingContext2D, rect: geometry.Rect): void;
    draw(context, rect = null) {
        if (Config.FLIP_Y_AXIS) {
            context.save();
            // Flip Y axis
            context.scale(1, -1);
            context.translate(0, -this.fontSize);
        }
        context.fillStyle = this.fontColor;
        context.font = this.font;
        context.textBaseline = 'top';
        if (context.fillText) {
            context.fillText(this.string, 0, 0);
        }
        if (Config.FLIP_Y_AXIS) {
            context.restore();
        }
    }
    _updateLabelContentSize() {
        var ctx = Director_Director.sharedDirector().context;
        var size = new geometry["a" /* geometry */].Size(0, this.fontSize);
        var prevFont = ctx.font;
        ctx.font = this.font;
        if (ctx.measureText) {
            var txtSize = ctx.measureText(this.string);
            size.width = txtSize.width;
        }
        ctx.font = prevFont;
        this.contentSize = size;
    }
}
//# sourceMappingURL=Label.js.map
// CONCATENATED MODULE: ./scripts/Cocos2d/libs/TextureQuad.js
class TextureQuad {
    constructor(textureRect, drawRect) {
        this.textureRect = textureRect;
        this.drawRect = drawRect;
    }
}
//# sourceMappingURL=TextureQuad.js.map
// CONCATENATED MODULE: ./scripts/Cocos2d/jah/remote_resources.js

var remote_resources_remoteresources;
(function (remoteresources) {
    class Resource {
        constructor(url, mimetype, remote = false) {
            this.url = url;
            this.mimetype = mimetype;
            this.remote = remote;
            this.remoteResource = null;
            this.loaded = false;
            this.data = url;
        }
    }
    remoteresources.Resource = Resource;
    remoteresources.resources = new Array();
    function addResource(url, mimetype, remote = false) {
        remoteresources.resources[url] = new Resource(url, mimetype, remote);
    }
    remoteresources.addResource = addResource;
    function getResource(resourcePath) {
        return remoteresources.resources[resourcePath];
    }
    remoteresources.getResource = getResource;
    function resource(resourcePath) {
        var res = getResource(resourcePath);
        if (!res) {
            throw new Error("Unable to find resource: " + resourcePath);
        }
        if (res.remote && !res.loaded) {
            return getRemoteResource(resourcePath);
        }
        return new LocalResource(res.data);
    }
    remoteresources.resource = resource;
    class RemoteResource {
        constructor(url, path) {
            this.url = url;
            this.path = path;
        }
        load() {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    var res = getResource(this.path);
                    res.data = xhr.responseText;
                    res.loaded = true;
                    events.trigger(this, 'load', this);
                }
            };
            xhr.open('GET', this.url, true);
            xhr.send(null);
            return null;
        }
    }
    remoteresources.RemoteResource = RemoteResource;
    class LocalResource extends RemoteResource {
        constructor(data) {
            super("", "");
            this.data = data;
        }
        load() {
            return this.data;
        }
    }
    remoteresources.LocalResource = LocalResource;
    class RemoteImage extends RemoteResource {
        load() {
            var img = new Image();
            var res = getResource(this.path);
            res.data = img;
            img.onload = () => {
                res.loaded = true;
                events.trigger(this, 'load', this);
            };
            img.onerror = () => {
                console.warn("Failed to load resource: [%s] from [%s]", this.path, img.src);
                res.loaded = true;
                events.trigger(this, 'load', this);
            };
            img.src = this.url;
            return img;
        }
    }
    remoteresources.RemoteImage = RemoteImage;
    class RemoteScript extends RemoteResource {
        load() {
            var script = document.createElement('script');
            var res = getResource(this.path);
            res.data = script;
            script.onload = () => {
                res.loaded = true;
                events.trigger(this, 'load', this);
            };
            script.src = this.url;
            document.getElementsByTagName('head')[0].appendChild(script);
            return script;
        }
    }
    remoteresources.RemoteScript = RemoteScript;
    function getRemoteResource(resourcePath) {
        var resource = remoteresources.resources[resourcePath];
        if (!resource) {
            return null;
        }
        if (resource.remoteResource) {
            return resource.remoteResource;
        }
        var RemoteObj, mime = resource.mimetype.split('/');
        if (mime[0] == 'image') {
            RemoteObj = new RemoteImage(resource.url, resourcePath);
        }
        else if (mime[1] == 'javascript') {
            RemoteObj = new RemoteScript(resource.url, resourcePath);
        }
        else {
            RemoteObj = new RemoteResource(resource.url, resourcePath);
        }
        resource.remoteResource = RemoteObj;
        return resource.remoteResource;
    }
    remoteresources.getRemoteResource = getRemoteResource;
})(remote_resources_remoteresources || (remote_resources_remoteresources = {}));
//# sourceMappingURL=remote_resources.js.map
// CONCATENATED MODULE: ./scripts/Cocos2d/Texture2D.js




class Texture2D_Texture2D extends bobject_BObject {
    constructor(_name = null, _imgElement = null) {
        super();
        this._name = _name;
        this._imgElement = _imgElement;
        this._size = null;
        this._isLoaded = false;
        this.size = new geometry["a" /* geometry */].Size(0, 0);
        //if (data instanceof RemoteResource) {
        //    events.addListener(data, 'load', util.callback(this, this.dataDidLoad));
        //    this.imgElement = data.load();
        //} else {
        //this.imgElement = data;
        this.dataDidLoad(_imgElement);
        //}
    }
    //protected _imgElement: HTMLImageElement = null;
    get imgElement() {
        return this.getValue("_imgElement");
    }
    set imgElement(value) {
        this.setValue("_imgElement", null, value, true);
    }
    get size() {
        return this.getValue("_size");
    }
    set size(value) {
        this.setValue("_size", null, value, true);
    }
    //protected _name: string = null;
    get name() {
        return this.getValue("_name");
    }
    set name(value) {
        this.setValue("_name", null, value, true);
    }
    get isLoaded() {
        return this.getValue("_isLoaded");
    }
    set isLoaded(value) {
        this.setValue("_isLoaded", null, value, true);
    }
    static CreateFromFile(file, rect = null) {
        var name = file;
        var data = remote_resources_remoteresources.resource(file);
        var tex = null;
        if (data instanceof remote_resources_remoteresources.RemoteResource) {
            tex = new Texture2D_Texture2D(name, data.load());
        }
        else {
            tex = new Texture2D_Texture2D(name, data);
        }
        return tex;
    }
    static CreateFromTexture(texture) {
        var data = texture.imgElement;
        var tex = new Texture2D_Texture2D(texture.name, data);
        return tex;
    }
    static CreateFromCanvas(canvas) {
        var data = canvas;
        var tex = new Texture2D_Texture2D("", data);
        return tex;
    }
    dataDidLoad(data) {
        this.isLoaded = true;
        this.size = new geometry["a" /* geometry */].Size(this.imgElement.width, this.imgElement.height);
        events.trigger(self, 'load', self);
    }
    drawAtPoint(ctx, point) {
        if (!this.isLoaded) {
            return;
        }
        ctx.drawImage(this.imgElement, point.x, point.y);
    }
    drawInRect(ctx, rect) {
        if (!this.isLoaded) {
            return;
        }
        ctx.drawImage(this.imgElement, rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
    }
    /**
     * @getter data
     * @type {String} Base64 encoded image data
     */
    get data() {
        return this.imgElement ? this.imgElement.src : null;
    }
    get contentSize() {
        return this.size;
    }
    get pixelsWide() {
        return this.size.width;
    }
    get pixelsHigh() {
        return this.size.height;
    }
}
//# sourceMappingURL=Texture2D.js.map
// CONCATENATED MODULE: ./scripts/Cocos2d/TextureAtlas.js




class TextureAtlas_TextureAtlas extends bobject_BObject {
    constructor(_texture) {
        super();
        this._texture = _texture;
        this._quads = new Array();
        this._imgElement = null;
        this.imgElement = _texture.imgElement;
    }
    get quads() {
        return this.getValue("_quads");
    }
    set quads(value) {
        this.setValue("_quads", null, value, true);
    }
    get imgElement() {
        return this.getValue("_imgElement");
    }
    set imgElement(value) {
        this.setValue("_imgElement", null, value, true);
    }
    //protected _texture: Texture2D = null;
    get texture() {
        return this.getValue("_texture");
    }
    set texture(value) {
        this.setValue("_texture", null, value, true);
    }
    static CreateFromFile(file) {
        var tex = Texture2D_Texture2D.CreateFromFile(file);
        return new TextureAtlas_TextureAtlas(tex);
    }
    static CreateFromTexture(texture) {
        var tex = Texture2D_Texture2D.CreateFromTexture(texture);
        return new TextureAtlas_TextureAtlas(tex);
    }
    static CreateFromCanvas(canvas) {
        var tex = Texture2D_Texture2D.CreateFromCanvas(canvas);
        return new TextureAtlas_TextureAtlas(tex);
    }
    insertQuad(quad, index = 0) {
        index = index || 0;
        this.quads.splice(index, 0, quad);
    }
    removeQuad(quad) {
        var index = this.quads.indexOf(quad);
        this.quads.splice(index, 1);
    }
    drawQuads(ctx) {
        util["a" /* util */].each(this.quads, util["a" /* util */].callback(this, (quad) => {
            if (!quad) {
                return;
            }
            this.drawQuad(ctx, quad);
        }));
    }
    drawQuad(ctx, quad) {
        var sx = quad.textureRect.origin.x, sy = quad.textureRect.origin.y, sw = quad.textureRect.size.width, sh = quad.textureRect.size.height;
        var dx = quad.drawRect.origin.x, dy = quad.drawRect.origin.y, dw = quad.drawRect.size.width, dh = quad.drawRect.size.height;
        var scaleX = 1;
        var scaleY = 1;
        if (Config.FLIP_Y_AXIS) {
            dy -= dh;
            dh *= -1;
        }
        if (dw < 0) {
            dw *= -1;
            scaleX = -1;
        }
        if (dh < 0) {
            dh *= -1;
            scaleY = -1;
        }
        ctx.scale(scaleX, scaleY);
        var img = this.imgElement;
        ctx.drawImage(img, sx, sy, // Draw slice from x,y
        sw, sh, // Draw slice size
        dx, dy, // Draw at 0, 0
        dw, dh // Draw size
        );
        ctx.scale(1, 1);
    }
}
//# sourceMappingURL=TextureAtlas.js.map
// CONCATENATED MODULE: ./scripts/Cocos2d/nodes/Sprite.js






var Sprite_ccp = geometry["a" /* geometry */].ccp;
class Sprite_Sprite extends Node_Node {
    //static CreateFromSpriteSheet(spritesheet: ): Sprite {
    //    var textureAtlas = spritesheet.textureAtlas;
    //    var sprite = new Sprite(textureAtlas);
    //    sprite.useSpriteSheet = true;
    //    return sprite;
    //}
    constructor(_textureAtlas, _rect = null) {
        super();
        this._textureAtlas = _textureAtlas;
        this._rect = _rect;
        this._dirty = false;
        this._recursiveDirty = false;
        this._quad = null;
        this._flipX = false;
        this._flipY = false;
        this._offsetPosition = null;
        this._unflippedOffsetPositionFromCenter = null;
        this._untrimmedSize = null;
        this.offsetPosition = Sprite_ccp(0, 0);
        this.unflippedOffsetPositionFromCenter = Sprite_ccp(0, 0);
        util["a" /* util */].each(['scale', 'scaleX', 'scaleY', 'rect', 'flipX', 'flipY', 'contentSize'], util["a" /* util */].callback(this, function (key) {
            events.addListener(this, key.toLowerCase() + '_changed', util["a" /* util */].callback(this, this._updateQuad));
        }));
        events.addListener(this, 'textureatlas_changed', util["a" /* util */].callback(this, this._updateTextureQuad));
        if (!_rect && _textureAtlas) {
            _rect = new geometry["a" /* geometry */].Rect(0, 0, _textureAtlas.texture.size.width, _textureAtlas.texture.size.height);
        }
        if (_rect) {
            this.rect = _rect;
            this.contentSize = _rect.size;
            this.quad = {
                drawRect: new geometry["a" /* geometry */].Rect(0, 0, _rect.size.width, _rect.size.height),
                textureRect: _rect
            };
        }
    }
    //protected _textureAtlas: TextureAtlas = null;
    get textureAtlas() {
        return this.getValue("_textureAtlas");
    }
    set textureAtlas(value) {
        this.setValue("_textureAtlas", null, value, true);
    }
    // protected _rect: geometry.Rect = null;
    get rect() {
        return this.getValue("_rect");
    }
    set rect(value) {
        this.setValue("_rect", null, value, true);
    }
    get dirty() {
        return this.getValue("_dirty");
    }
    set dirty(value) {
        this.setValue("_dirty", null, value, true);
    }
    get recursiveDirty() {
        return this.getValue("_recursiveDirty");
    }
    set recursiveDirty(value) {
        this.setValue("_recursiveDirty", null, value, true);
    }
    get quad() {
        return this.getValue("_quad");
    }
    set quad(value) {
        this.setValue("_quad", null, value, true);
    }
    get flipX() {
        return this.getValue("_flipX");
    }
    set flipX(value) {
        this.setValue("_flipX", null, value, true);
    }
    get flipY() {
        return this.getValue("_flipY");
    }
    set flipY(value) {
        this.setValue("_flipY", null, value, true);
    }
    get offsetPosition() {
        return this.getValue("_offsetPosition");
    }
    set offsetPosition(value) {
        this.setValue("_offsetPosition", null, value, true);
    }
    get unflippedOffsetPositionFromCenter() {
        return this.getValue("_unflippedOffsetPositionFromCenter");
    }
    set unflippedOffsetPositionFromCenter(value) {
        this.setValue("_unflippedOffsetPositionFromCenter", null, value, true);
    }
    get untrimmedSize() {
        return this.getValue("_untrimmedSize");
    }
    set untrimmedSize(value) {
        this.setValue("_untrimmedSize", null, value, true);
    }
    static CreateFromFile(file, rect = null) {
        var textureAtlas = TextureAtlas_TextureAtlas.CreateFromFile(file);
        var sprite = new Sprite_Sprite(textureAtlas, rect);
        return sprite;
    }
    static CreateFromTexture(texture) {
        var textureAtlas = new TextureAtlas_TextureAtlas(texture);
        var sprite = new Sprite_Sprite(textureAtlas);
        return sprite;
    }
    static CreateFromFrame(frame) {
        var texture = frame.texture;
        var rect = frame.rect;
        var textureAtlas = TextureAtlas_TextureAtlas.CreateFromTexture(texture);
        var sprite = new Sprite_Sprite(textureAtlas, rect);
        sprite.displayFrame = frame;
        return sprite;
    }
    /**
     * @private
     */
    _updateTextureQuad(obj, key, texture, oldTexture) {
        if (oldTexture) {
            oldTexture.removeQuad(this.quad);
        }
        if (texture) {
            texture.insertQuad(this.quad);
        }
    }
    /**
     * @setter textureCoords
     * @type geometry.Rect
     */
    set textureCoords(rect) {
        var quad = this.quad;
        if (!quad) {
            quad = {
                drawRect: geometry["a" /* geometry */].rectMake(0, 0, 0, 0),
                textureRect: geometry["a" /* geometry */].rectMake(0, 0, 0, 0)
            };
        }
        quad.textureRect = util["a" /* util */].copy(rect);
        this.quad = quad;
    }
    /**
     * @setter textureRect
     * @type geometry.Rect
     */
    setTextureRect(rect, rotated = false, untrimmedSize = null) {
        untrimmedSize = untrimmedSize || rect.size;
        this.contentSize = untrimmedSize;
        this.rect = util["a" /* util */].copy(rect);
        this.textureCoords = rect;
        var quad = this.quad;
        var relativeOffset = util["a" /* util */].copy(this.unflippedOffsetPositionFromCenter);
        if (this.flipX) {
            relativeOffset.x = -relativeOffset.x;
        }
        if (this.flipY) {
            relativeOffset.y = -relativeOffset.y;
        }
        var offsetPosition = util["a" /* util */].copy(this.offsetPosition);
        offsetPosition.x = relativeOffset.x + (this.contentSize.width - rect.size.width) / 2;
        offsetPosition.y = -relativeOffset.y + (this.contentSize.height - rect.size.height) / 2;
        quad.drawRect.origin = util["a" /* util */].copy(offsetPosition);
        quad.drawRect.size = util["a" /* util */].copy(rect.size);
        if (this.flipX) {
            quad.drawRect.size.width *= -1;
            quad.drawRect.origin.x = -rect.size.width;
        }
        if (this.flipY) {
            quad.drawRect.size.height *= -1;
            quad.drawRect.origin.y = -rect.size.height;
        }
        this.quad = quad;
    }
    /**
     * @private
     */
    _updateQuad() {
        if (!this.rect) {
            return;
        }
        if (!this.quad) {
            this.quad = new TextureQuad(geometry["a" /* geometry */].rectMake(0, 0, 0, 0), geometry["a" /* geometry */].rectMake(0, 0, 0, 0));
        }
        var relativeOffset = util["a" /* util */].copy(this.unflippedOffsetPositionFromCenter);
        if (this.flipX) {
            relativeOffset.x = -relativeOffset.x;
        }
        if (this.flipY) {
            relativeOffset.y = -relativeOffset.y;
        }
        var offsetPosition = util["a" /* util */].copy(this.offsetPosition);
        offsetPosition.x = relativeOffset.x + (this.contentSize.width - this.rect.size.width) / 2;
        offsetPosition.y = relativeOffset.y + (this.contentSize.height - this.rect.size.height) / 2;
        this.quad.textureRect = util["a" /* util */].copy(this.rect);
        this.quad.drawRect.origin = util["a" /* util */].copy(offsetPosition);
        this.quad.drawRect.size = util["a" /* util */].copy(this.rect.size);
        if (this.flipX) {
            this.quad.drawRect.size.width *= -1;
            this.quad.drawRect.origin.x = -this.rect.size.width;
        }
        if (this.flipY) {
            this.quad.drawRect.size.height *= -1;
            this.quad.drawRect.origin.y = -this.rect.size.height;
        }
    }
    updateTransform(ctx) {
        if (!this.useSpriteSheet) {
            throw "updateTransform is only valid when Sprite is being rendered using a SpriteSheet";
        }
        if (!this.visible) {
            this.dirty = false;
            this.recursiveDirty = false;
            return;
        }
        // TextureAtlas has hard reference to this quad so we can just update it directly
        this.quad.drawRect.origin = {
            x: this.position.x - this.anchorPointInPixels.x * this.scaleX,
            y: this.position.y - this.anchorPointInPixels.y * this.scaleY
        };
        this.quad.drawRect.size = new geometry["a" /* geometry */].Size(this.rect.size.width * this.scaleX, this.rect.size.height * this.scaleY);
        this.dirty = false;
        this.recursiveDirty = false;
    }
    draw(context) {
        if (!this.quad) {
            return;
        }
        this.textureAtlas.drawQuad(context, this.quad);
    }
    isFrameDisplayed(frame) {
        if (!this.rect || !this.textureAtlas) {
            return false;
        }
        return (frame.texture === this.textureAtlas.texture && geometry["a" /* geometry */].rectEqualToRect(frame.rect, this.rect));
    }
    /**
     * @setter displayFrame
     * @type cocos.SpriteFrame
     */
    set displayFrame(frame) {
        if (!frame) {
            delete this.quad;
            return;
        }
        this.unflippedOffsetPositionFromCenter = util["a" /* util */].copy(frame.offset);
        // change texture
        if (!this.textureAtlas || frame.texture !== this.textureAtlas.texture) {
            this.textureAtlas = new TextureAtlas_TextureAtlas(frame.texture);
        }
        this.setTextureRect(frame.rect, frame.rotated, frame.originalSize);
    }
}
//# sourceMappingURL=Sprite.js.map
// CONCATENATED MODULE: ./scripts/Cocos2d/nodes/ProgressBar.js





class ProgressBar_ProgressBar extends Node_Node {
    constructor(emptyImage = null, fullImage = null) {
        super();
        this.emptyImage = emptyImage;
        this.fullImage = fullImage;
        this._elapsed = null;
        this._fullSprite = null;
        this._maxValue = null;
        this._value = null;
        var size = new geometry["a" /* geometry */].Size(272, 32);
        this.contentSize = size;
        var s;
        if (emptyImage) {
            s = Sprite_Sprite.CreateFromFile(emptyImage, new geometry["a" /* geometry */].Rect(0, 0, size.width, size.height));
            s.anchorPoint = new geometry["a" /* geometry */].Point(0, 0);
            this.emptySprite = s;
            this.addChild(s);
        }
        if (fullImage) {
            s = Sprite_Sprite.CreateFromFile(fullImage, new geometry["a" /* geometry */].Rect(0, 0, 0, size.height));
            s.anchorPoint = new geometry["a" /* geometry */].Point(0, 0);
            this.fullSprite = s;
            this.addChild(s);
        }
        events.addListener(this, 'maxvalue_changed', util["a" /* util */].callback(this, 'updateImages'));
        events.addListener(this, 'value_changed', util["a" /* util */].callback(this, 'updateImages'));
        this.updateImages();
    }
    get emptySprite() {
        return this.getValue("_emptySprite");
    }
    set emptySprite(value) {
        this.setValue("_emptySprite", null, value, true);
    }
    get fullSprite() {
        return this.getValue("_fullSprite");
    }
    set fullSprite(value) {
        this.setValue("_fullSprite", null, value, true);
    }
    get maxValue() {
        return this.getValue("_maxValue");
    }
    set maxValue(value) {
        this.setValue("_maxValue", null, value, true);
    }
    get value() {
        return this.getValue("_value");
    }
    set value(value) {
        this.setValue("_value", null, value, true);
    }
    updateImages() {
        var empty = this.emptySprite, full = this.fullSprite, value = this.value, size = this.contentSize, maxValue = this.maxValue, ratio = (value / maxValue);
        var diff = Math.round(size.width * ratio);
        if (diff === 0) {
            full.visible = false;
        }
        else {
            full.visible = true;
            full.rect = new geometry["a" /* geometry */].Rect(0, 0, diff, size.height);
            full.contentSize = new geometry["a" /* geometry */].Size(diff, size.height);
        }
        if ((size.width - diff) === 0) {
            empty.visible = false;
        }
        else {
            empty.visible = true;
            empty.rect = new geometry["a" /* geometry */].Rect(diff, 0, size.width - diff, size.height);
            empty.position = new geometry["a" /* geometry */].Point(diff, 0);
            empty.contentSize = new geometry["a" /* geometry */].Size(size.width - diff, size.height);
        }
    }
}
//# sourceMappingURL=ProgressBar.js.map
// CONCATENATED MODULE: ./scripts/Cocos2d/jah/Preloader.js



class Preloader_Preloader extends bobject_BObject {
    constructor(itms = null) {
        super();
        this.queue = new Array();
        this._count = -1;
        this._loaded = 0;
        this._listeners = new Array();
        this.keys = function (o) {
            if (o !== Object(o)) {
                throw new TypeError('Object.keys called on non-object');
            }
            var ret = [], p;
            for (p in o) {
                if (Object.prototype.hasOwnProperty.call(o, p)) {
                    ret.push(p);
                }
            }
            return ret;
        };
        if (itms) {
            this.addToQueue(itms);
        }
        //this.count = this.keys(remoteresources.resources).length;
    }
    get count() {
        return this.getValue("_count");
    }
    set count(value) {
        this.setValue("_count", null, value, true);
    }
    get loaded() {
        return this.getValue("_loaded");
    }
    set loaded(value) {
        this.setValue("_loaded", null, value, true);
    }
    load() {
        this.loaded = 0;
        this.count += this.queue.length;
        var ref, i;
        for (i = 0; i < this.count; i++) {
            ref = this.queue[i];
            var res = remote_resources_remoteresources.getResource(ref);
            if (!res) {
                console.warn("Unable to preload non-existant file: ", ref);
                this.didLoadResource(ref);
                continue;
            }
            if (!res.remote || res.loaded) {
                // Already loaded
                this.didLoadResource(ref);
                continue;
            }
            var file = remote_resources_remoteresources.resource(ref), callback = ((ref) => {
                return () => {
                    this.didLoadResource(ref);
                };
            })(ref);
            if (file instanceof remote_resources_remoteresources.RemoteResource) {
                // Notify when a resource has loaded
                var el = events.addListener(file, 'load', callback);
                this._listeners[ref] = el;
                file.load();
            }
            else {
                setTimeout(callback, 1);
            }
        }
        this.clearQueue();
    }
    didLoadResource(uri) {
        this.loaded = this.loaded + 1;
        if (this._listeners[uri]) {
            events.removeListener(this._listeners[uri]);
        }
        events.trigger(this, 'load', this, uri);
        if (this.loaded >= this.count) {
            events.trigger(this, 'complete', this);
        }
    }
    addToQueue(items) {
        if (items instanceof Array) {
            // Update array in place incase something else has a reference to it
            for (var i = 0; i < items.length; i++) {
                this.queue.push(items[i]);
            }
        }
        else {
            this.queue.push(items);
        }
    }
    addEverythingToQueue() {
        var items = new Array();
        var key, res;
        for (key in remote_resources_remoteresources.resources) {
            if (remote_resources_remoteresources.resources.hasOwnProperty(key)) {
                res = remote_resources_remoteresources.resources[key];
                if (res.remote) {
                    items.push(key);
                }
            }
        }
        if (items.length > 0) {
            this.addToQueue(items);
        }
    }
    clearQueue() {
        this.queue.splice(0, this.queue.length);
    }
}
//# sourceMappingURL=Preloader.js.map
// CONCATENATED MODULE: ./scripts/Cocos2d/nodes/PreloadScene.js







class PreloadScene_PreloadScene extends Scene_Scene {
    constructor() {
        super();
        this._progressBar = null;
        this._label = null;
        this._preloader = null;
        this._isReady = false;
        this._emptyImage = "/libs/cocos2d/resources/progress-bar-empty.png";
        this._fullImage = "/libs/cocos2d/resources/progress-bar-full.png";
        var size = Director_Director.sharedDirector().winSize;
        // Setup 'please wait' label
        var label = new Label_Label('Please wait...', 'Helvetica', '#ffffff', 14);
        label.position = new geometry["a" /* geometry */].Point(size.width / 2, (size.height / 2) + 32);
        this.label = label;
        this.addChild(label);
        // Setup preloader
        var preloader = new Preloader_Preloader(); // The main preloader
        preloader.addEverythingToQueue();
        this.preloader = preloader;
        // Listen for preload events
        events.addListener(preloader, 'load', (preloader, uri) => {
            var loaded = preloader.loaded, count = preloader.count;
            events.trigger(this, 'load', preloader, uri);
        });
        events.addListener(preloader, 'complete', (preloader) => {
            events.trigger(this, 'complete', preloader);
        });
        // Preloader for the loading screen resources
        var loadingPreloader = new Preloader_Preloader([this.emptyImage, this.fullImage]);
        // When loading screen resources have loaded then draw them
        events.addListener(loadingPreloader, 'complete', (preloader) => {
            this.createProgressBar();
            if (this.isRunning) {
                this.preloader.load();
            }
            this.isReady = true;
        });
        loadingPreloader.load();
    }
    get progressBar() {
        return this.getValue("_progressBar");
    }
    set progressBar(value) {
        this.setValue("_progressBar", null, value, true);
    }
    get label() {
        return this.getValue("_label");
    }
    set label(value) {
        this.setValue("_label", null, value, true);
    }
    get preloader() {
        return this.getValue("_preloader");
    }
    set preloader(value) {
        this.setValue("_preloader", null, value, true);
    }
    get isReady() {
        return this.getValue("_isReady");
    }
    set isReady(value) {
        this.setValue("_isReady", null, value, true);
    }
    get emptyImage() {
        return this.getValue("_emptyImage");
    }
    set emptyImage(value) {
        this.setValue("_emptyImage", null, value, true);
    }
    get fullImage() {
        return this.getValue("_fullImage");
    }
    set fullImage(value) {
        this.setValue("_fullImage", null, value, true);
    }
    createProgressBar() {
        var preloader = this.preloader, size = Director_Director.sharedDirector().winSize;
        var progressBar = new ProgressBar_ProgressBar("/libs/cocos2d/resources/progress-bar-empty.png", "/libs/cocos2d/resources/progress-bar-full.png");
        progressBar.position = new geometry["a" /* geometry */].Point(size.width / 2, size.height / 2);
        this.progressBar = progressBar;
        this.addChild(progressBar);
        events.addListener(preloader, 'load', (preloader) => {
            progressBar.maxValue = preloader.count;
            progressBar.value = preloader.loaded;
        });
    }
}
//# sourceMappingURL=PreloadScene.js.map
// CONCATENATED MODULE: ./scripts/Cocos2d/Director.js










var Director_ccp = geometry["a" /* geometry */].ccp;
var win = window;
win.requestAnimFrame = (function () {
    return win.requestAnimationFrame ||
        win.webkitRequestAnimationFrame ||
        win.mozRequestAnimationFrame ||
        win.oRequestAnimationFrame ||
        win.msRequestAnimationFrame ||
        function (callback) {
            win.setTimeout(callback, 1000 / 30);
        };
})();
var Director_Director;
(function (Director_1) {
    class Director extends bobject_BObject {
        constructor() {
            super();
            this._backgroundColor = 'rgb(0, 0, 0)';
            this._canvas = null;
            this._context = null;
            this._sceneStack = new Array();
            this._winSize = null;
            this._isPaused = false;
            this._maxFrameRate = 30;
            this._displayFPS = false;
            this._preloadScene = null;
            this._isReady = false;
            // Time delta
            this.dt = 0;
            this._nextDeltaTimeZero = false;
            this._lastUpdate = 0;
            this._nextScene = null;
            this._runningScene = null;
            this._sendCleanupToScene = false;
            this._frames = 0;
            this._accumDt = 0;
            this._stopAnim = false;
            this._showoutlines = false;
        }
        get backgroundColor() {
            return this.getValue("_backgroundColor");
        }
        set backgroundColor(value) {
            this.setValue("_backgroundColor", null, value, true);
        }
        get canvas() {
            return this.getValue("_canvas");
        }
        set canvas(value) {
            this.setValue("_canvas", null, value, true);
        }
        get context() {
            return this.getValue("_context");
        }
        set context(value) {
            this.setValue("_context", null, value, true);
        }
        get sceneStack() {
            return this.getValue("_sceneStack");
        }
        set sceneStack(value) {
            this.setValue("_sceneStack", null, value, true);
        }
        get winSize() {
            return this.getValue("_winSize");
        }
        set winSize(value) {
            this.setValue("_winSize", null, value, true);
        }
        get isPaused() {
            return this.getValue("_isPaused");
        }
        set isPaused(value) {
            this.setValue("_isPaused", null, value, true);
        }
        get maxFrameRate() {
            return this.getValue("_maxFrameRate");
        }
        set maxFrameRate(value) {
            this.setValue("_maxFrameRate", null, value, true);
        }
        get displayFPS() {
            return this.getValue("_displayFPS");
        }
        set displayFPS(value) {
            this.setValue("_displayFPS", null, value, true);
        }
        get preloadScene() {
            return this.getValue("_preloadScene");
        }
        set preloadScene(value) {
            this.setValue("_preloadScene", null, value, true);
        }
        get isReady() {
            return this.getValue("_isReady");
        }
        set isReady(value) {
            this.setValue("_isReady", null, value, true);
        }
        get nextDeltaTimeZero() {
            return this.getValue("_nextDeltaTimeZero");
        }
        set nextDeltaTimeZero(value) {
            this.setValue("_nextDeltaTimeZero", null, value, true);
        }
        get lastUpdate() {
            return this.getValue("_lastUpdate");
        }
        set lastUpdate(value) {
            this.setValue("_lastUpdate", null, value, true);
        }
        /**
     * Append to a HTML element. It will create a canvas tag
     *
     * @param {HTMLElement} view Any HTML element to add the application to
     */
        attachInView(view) {
            if (!view.tagName) {
                throw "Director.attachInView must be given a HTML DOM Node";
            }
            while (view.firstChild) {
                view.removeChild(view.firstChild);
            }
            var canvas = document.createElement('canvas');
            this.canvas = canvas;
            canvas.setAttribute('width', view.clientWidth);
            canvas.setAttribute('height', view.clientHeight);
            var context = canvas.getContext('2d');
            this.context = context;
            if (Config.FLIP_Y_AXIS) {
                context.translate(0, view.clientHeight);
                context.scale(1, -1);
            }
            view.appendChild(canvas);
            this.winSize = new geometry["a" /* geometry */].Size(view.clientWidth, view.clientHeight);
            // Setup event handling
            // Mouse events
            var eventDispatcher = EventDispatcher_EventDispatcher.sharedDispatcher();
            var mouseDown = (evt) => {
                evt.locationInWindow = Director_ccp(evt.clientX, evt.clientY);
                evt.locationInCanvas = this.convertEventToCanvas(evt);
                var mouseDragged = (evt) => {
                    evt.locationInWindow = Director_ccp(evt.clientX, evt.clientY);
                    evt.locationInCanvas = this.convertEventToCanvas(evt);
                    eventDispatcher.mouseDragged(evt);
                };
                var mouseUp = (evt) => {
                    evt.locationInWindow = Director_ccp(evt.clientX, evt.clientY);
                    evt.locationInCanvas = this.convertEventToCanvas(evt);
                    document.body.removeEventListener('mousemove', mouseDragged, false);
                    document.body.removeEventListener('mouseup', mouseUp, false);
                    eventDispatcher.mouseUp(evt);
                };
                document.body.addEventListener('mousemove', mouseDragged, false);
                document.body.addEventListener('mouseup', mouseUp, false);
                eventDispatcher.mouseDown(evt);
            };
            var mouseMoved = (evt) => {
                evt.locationInWindow = Director_ccp(evt.clientX, evt.clientY);
                evt.locationInCanvas = this.convertEventToCanvas(evt);
                eventDispatcher.mouseMoved(evt);
            };
            canvas.addEventListener('mousedown', mouseDown, false);
            canvas.addEventListener('mousemove', mouseMoved, false);
            // Keyboard events
            var keyDown = (evt) => {
                //this._keysDown = this._keysDown || {};
                eventDispatcher.keyDown(evt);
            };
            var keyUp = (evt) => {
                eventDispatcher.keyUp(evt);
            };
            document.documentElement.addEventListener('keydown', keyDown, false);
            document.documentElement.addEventListener('keyup', keyUp, false);
        }
        runPreloadScene() {
            var preloader = this.preloadScene;
            if (!preloader) {
                preloader = new PreloadScene_PreloadScene();
                this.preloadScene = preloader;
            }
            events.addListener(preloader, 'complete', util["a" /* util */].callback(this, function (preloader) {
                this.isReady = true;
                events.trigger(this, 'ready', this);
            }));
            this.pushScene(preloader);
            this.startAnimation();
        }
        /**
     * Enters the Director's main loop with the given Scene. Call it to run
     * only your FIRST scene. Don't call it if there is already a running
     * scene.
     *
     * @param {cocos.Scene} scene The scene to start
     */
        runWithScene(scene) {
            if (!(scene instanceof Scene_Scene)) {
                throw "Director.runWithScene must be given an instance of Scene";
            }
            if (this._runningScene) {
                throw "You can't run a Scene if another Scene is already running. Use replaceScene or pushScene instead";
            }
            this.pushScene(scene);
            this.startAnimation();
        }
        /**
     * Replaces the running scene with a new one. The running scene is
     * terminated. ONLY call it if there is a running scene.
     *
     * @param {cocos.Scene} scene The scene to replace with
     */
        replaceScene(scene) {
            var index = this.sceneStack.length;
            this._sendCleanupToScene = true;
            this.sceneStack.pop();
            this.sceneStack.push(scene);
            this._nextScene = scene;
        }
        /**
     * Pops out a scene from the queue. This scene will replace the running
     * one. The running scene will be deleted. If there are no more scenes in
     * the stack the execution is terminated. ONLY call it if there is a
     * running scene.
     */
        popScene() {
        }
        /**
     * Suspends the execution of the running scene, pushing it on the stack of
     * suspended scenes. The new scene will be executed. Try to avoid big
     * stacks of pushed scenes to reduce memory allocation. ONLY call it if
     * there is a running scene.
     *
     * @param {cocos.Scene} scene The scene to add to the stack
     */
        pushScene(scene) {
            this._nextScene = scene;
        }
        /**
     * The main loop is triggered again. Call this function only if
     * cocos.Directory#stopAnimation was called earlier.
     */
        startAnimation() {
            this._stopAnim = false;
            this.animate();
        }
        animate() {
            if (this._stopAnim) {
                return;
            }
            this.drawScene();
            win.requestAnimFrame(util["a" /* util */].callback(this, 'animate'), this.canvas);
        }
        /**
     * Stops the animation. Nothing will be drawn. The main loop won't be
     * triggered anymore. If you want to pause your animation call
     * cocos.Directory#pause instead.
     */
        stopAnimation() {
            this._stopAnim = true;
            //if (this._animationTimer) {
            //    clearInterval(this._animationTimer);
            //    this._animationTimer = null;
            //}
        }
        /**
     * Calculate time since last call
     * @private
     */
        calculateDeltaTime() {
            var now = (new Date()).getTime() / 1000;
            if (this.nextDeltaTimeZero) {
                this.dt = 0;
                this.nextDeltaTimeZero = false;
            }
            this.dt = Math.max(0, now - this.lastUpdate);
            this.lastUpdate = now;
        }
        /**
         * The main run loop
         * @private
         */
        drawScene() {
            this.calculateDeltaTime();
            if (!this.isPaused) {
                Scheduler_Scheduler.sharedScheduler().tick(this.dt);
            }
            var context = this.context;
            context.fillStyle = this.backgroundColor;
            context.fillRect(0, 0, this.winSize.width, this.winSize.height);
            //this.canvas.width = this.canvas.width
            if (this._nextScene) {
                this.setNextScene();
            }
            var rect = new geometry["a" /* geometry */].Rect(0, 0, this.winSize.width, this.winSize.height);
            if (rect) {
                context.beginPath();
                context.rect(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
                context.clip();
                context.closePath();
            }
            this._runningScene.visit(context, rect);
            if (Config.SHOW_REDRAW_REGIONS) {
                if (rect) {
                    context.beginPath();
                    context.rect(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
                    context.fillStyle = "rgba(255, 0, 0, 0.5)";
                    //context.fill();
                    context.closePath();
                }
            }
            if (this.displayFPS) {
                this.showFPS();
            }
        }
        /**
     * Initialises the next scene
     * @private
     */
        setNextScene() {
            // TODO transitions
            if (this._runningScene) {
                this._runningScene.onExit();
                if (this._sendCleanupToScene) {
                    this._runningScene.cleanup();
                }
            }
            this._runningScene = this._nextScene;
            this._nextScene = null;
            this._runningScene.onEnter();
        }
        convertEventToCanvas(evt) {
            var x = this.canvas.offsetLeft - document.documentElement.scrollLeft, y = this.canvas.offsetTop - document.documentElement.scrollTop;
            var o = this.canvas;
            while ((o = o.offsetParent)) {
                x += o.offsetLeft - o.scrollLeft;
                y += o.offsetTop - o.scrollTop;
            }
            var p = geometry["a" /* geometry */].ccpSub(evt.locationInWindow, Director_ccp(x, y));
            if (Config.FLIP_Y_AXIS) {
                p.y = this.canvas.height - p.y;
            }
            return p;
        }
        showFPS() {
            if (!this._fpsLabel) {
                this._fpsLabel = new Label_Label("", undefined, undefined, 16);
                this._fpsLabel.anchorPoint = Director_ccp(0, 1);
                this._frames = 0;
                this._accumDt = 0;
            }
            this._frames++;
            this._accumDt += this.dt;
            if (this._accumDt > 1.0 / 3.0) {
                var frameRate = this._frames / this._accumDt;
                this._frames = 0;
                this._accumDt = 0;
                this._fpsLabel.string = 'FPS: ' + (Math.round(frameRate * 100) / 100).toString();
            }
            var s = this.winSize;
            this._fpsLabel.position = Director_ccp(10, s.height - 10);
            this._fpsLabel.visit(this.context);
        }
    }
    Director_1.Director = Director;
    var _instance = null;
    function sharedDirector() {
        if (!_instance) {
            _instance = new Director();
        }
        return _instance;
    }
    Director_1.sharedDirector = sharedDirector;
})(Director_Director || (Director_Director = {}));
//# sourceMappingURL=Director.js.map
// CONCATENATED MODULE: ./scripts/Cocos2d/nodes/Layer.js






var Layer_ccp = geometry["a" /* geometry */].ccp;
class Layer_Layer extends Node_Node {
    constructor() {
        super();
        this._isMouseEnabled = false;
        this._isKeyboardEnabled = false;
        this._mouseDelegatePriority = 0;
        this._keyboardDelegatePriority = 0;
        var s = Director_Director.sharedDirector().winSize;
        this.isRelativeAnchorPoint = false;
        this.anchorPoint = Layer_ccp(0.5, 0.5);
        this.contentSize = s;
        events.addListener(this, 'ismouseenabled_changed', util["a" /* util */].callback(this, () => {
            if (this.isRunning) {
                if (this.isMouseEnabled) {
                    EventDispatcher_EventDispatcher.sharedDispatcher().addMouseDelegate(this, this.mouseDelegatePriority);
                }
                else {
                    EventDispatcher_EventDispatcher.sharedDispatcher().removeMouseDelegate(this);
                }
            }
        }));
        events.addListener(this, 'iskeyboardenabled_changed', util["a" /* util */].callback(this, () => {
            if (this.isRunning) {
                if (this.isKeyboardEnabled) {
                    EventDispatcher_EventDispatcher.sharedDispatcher().addKeyboardDelegate(this, this.keyboardDelegatePriority);
                }
                else {
                    EventDispatcher_EventDispatcher.sharedDispatcher().removeKeyboardDelegate(this);
                }
            }
        }));
    }
    get isMouseEnabled() {
        return this.getValue("_isMouseEnabled");
    }
    set isMouseEnabled(value) {
        this.setValue("_isMouseEnabled", null, value, true);
    }
    get isKeyboardEnabled() {
        return this.getValue("_isKeyboardEnabled");
    }
    set isKeyboardEnabled(value) {
        this.setValue("_isKeyboardEnabled", null, value, true);
    }
    get mouseDelegatePriority() {
        return this.getValue("_mouseDelegatePriority");
    }
    set mouseDelegatePriority(value) {
        this.setValue("_mouseDelegatePriority", null, value, true);
    }
    get keyboardDelegatePriority() {
        return this.getValue("_keyboardDelegatePriority");
    }
    set keyboardDelegatePriority(value) {
        this.setValue("_keyboardDelegatePriority", null, value, true);
    }
    onEnter() {
        if (this.isMouseEnabled) {
            EventDispatcher_EventDispatcher.sharedDispatcher().addMouseDelegate(this, this.mouseDelegatePriority);
        }
        if (this.isKeyboardEnabled) {
            EventDispatcher_EventDispatcher.sharedDispatcher().addKeyboardDelegate(this, this.keyboardDelegatePriority);
        }
        super.onEnter();
    }
    onExit() {
        if (this.isMouseEnabled) {
            EventDispatcher_EventDispatcher.sharedDispatcher().removeMouseDelegate(this);
        }
        if (this.isKeyboardEnabled) {
            EventDispatcher_EventDispatcher.sharedDispatcher().removeKeyboardDelegate(this);
        }
        super.onExit();
    }
    mouseDown(evt) {
        //throw new Error("Method not implemented.");
        return false;
    }
    mouseMoved(evt) {
        //throw new Error("Method not implemented.");
        return false;
    }
    mouseDragged(evt) {
        //throw new Error("Method not implemented.");
        return false;
    }
    mouseUp(evt) {
        //throw new Error("Method not implemented.");
        return false;
    }
    keyDown(evt) {
        //throw new Error("Method not implemented.");
        return false;
    }
    keyUp(evt) {
        //throw new Error("Method not implemented.");
        return false;
    }
}
//# sourceMappingURL=Layer.js.map
// CONCATENATED MODULE: ./scripts/App/main.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "main", function() { return main; });






var main_Resource = remote_resources_remoteresources.Resource;
async function main() {
    await Tasks.whenReady();
    await Tasks.delay(100);
    remote_resources_remoteresources.addResource("/assets/ball.png", "image/png", true);
    var director = Director_Director.sharedDirector();
    director._showoutlines = true;
    director.attachInView(document.getElementById('cocos2d-app'));
    director.displayFPS = true;
    events.addListener(director, 'ready', (director) => {
        var mainScene = new Scene_Scene();
        var layer = new Layer_Layer();
        mainScene.addChild(layer);
        var sprite = Sprite_Sprite.CreateFromFile("/assets/ball.png");
        layer.addChild(sprite);
        director.replaceScene(mainScene);
    });
    // Preload our assets
    director.runPreloadScene();
}
main();
//# sourceMappingURL=Main.js.map

/***/ })
/******/ ]);