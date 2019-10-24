/**
 * @namespace
 * Useful utility functions
 */
export module util {

    /**
     * Merge two or more objects and return the result.
     *
     * @param {Object} firstObject First object to merge with
     * @param {Object} secondObject Second object to merge with
     * @param {Object} [...] More objects to merge
     * @returns {Object} A new object containing the properties of all the objects passed in
     */
    export function merge(firstObject:any, secondObject:any):any {
        var result = {};

        for (var i = 0; i < arguments.length; i++) {
            var obj = arguments[i];

            for (var x in obj) {
                if (!obj.hasOwnProperty(x)) {
                    continue;
                }

                result[x] = obj[x];
            }
        };

        return result;
    }

    /**
    * Creates a deep copy of an object
    *
    * @param {Object} obj The Object to copy
    * @returns {Object} A copy of the original Object
    */
    export function copy<t>(obj: t):t {
        if (obj === null) {
            return null;
        }

        var copy;

        if (obj instanceof Array) {
            copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = util.copy(obj[i]);
            }
        } else if (typeof (obj) == 'object') {
            if (typeof ((<any>obj).copy) == 'function') {
                copy = (<any>obj).copy();
            } else {
                copy = {};

                var o, x;
                for (x in obj) {
                    copy[x] = util.copy(obj[x]);
                }
            }
        } else {
            // Primative type. Doesn't need copying
            copy = obj;
        }

        return copy;
    }

    /**
     * Iterates over an array and calls a function for each item.
     *
     * @param {Array} arr An Array to iterate over
     * @param {Function} func A function to call for each item in the array
     * @returns {Array} The original array
     */
    export function each<t>(arr: Array<t>, func:(data:t, i?:number)=>void) {
        var i = 0,
            len = arr.length;
        for (i = 0; i < len; i++) {
            func(arr[i], i);
        }

        return arr;
    }
    /**
     * Iterates over an array, calls a function for each item and returns the results.
     *
     * @param {Array} arr An Array to iterate over
     * @param {Function} func A function to call for each item in the array
     * @returns {Array} The return values from each function call
     */
    export function map<t,t2>(arr: Array<t>, func: (data: t, i?: number) => t2) :Array<t2> {
        var i = 0,
            len = arr.length,
            result:Array<t2> = new Array<t2>();

        for (i = 0; i < len; i++) {
            result.push(func(arr[i], i));
        }

        return result;
    }

    export function callback(target: any, method: ((...args: any[]) => void) | string):(()=>void) {
        var m2: ((...args: any[]) => void);
        if (typeof (method) == 'string') {
            var methodName = method;
            method = <((...args: any[]) => void)>target[method];
            if (!method) {
                throw "Callback to undefined method: " + methodName;
            }
        }

        m2 = <((...args: any[]) => void)>method;
        if (!method) {
            throw "Callback with no method to call";
        }

        return function () {
            m2.apply(target, arguments);
        }
    }




}