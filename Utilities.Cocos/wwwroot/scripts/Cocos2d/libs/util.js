/**
 * @namespace
 * Useful utility functions
 */
export var util;
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