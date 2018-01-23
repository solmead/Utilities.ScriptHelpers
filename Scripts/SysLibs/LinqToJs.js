//module Linq {
var Queryable = /** @class */ (function () {
    function Queryable(array) {
        var _this = this;
        this.array = array;
        this.add = function (item) {
            _this.array.push(item);
        };
        this.remove = function (item) {
            _this.array.remove(item);
        };
        this.push = function (item) {
            _this.array.push(item);
        };
        this.toArray = function () {
            return _this.array.slice(0);
        };
        this.distinct = function (compareFunction) {
            var lst = new Queryable();
            _this.forEach(function (t) {
                if (!lst.contains(t, compareFunction)) {
                    lst.add(t);
                }
            });
            return lst;
        };
        this.where = function (whereClause) {
            if (!whereClause) {
                return new Queryable(_this.array.slice(0));
            }
            var lst2 = [];
            _this.array.forEach(function (item) {
                if (whereClause(item)) {
                    lst2.push(item);
                }
            });
            return new Queryable(lst2);
        };
        this.any = function (whereClause) {
            if (!whereClause) {
                return _this.array.length > 0;
            }
            return _this.where(whereClause).any();
        };
        this.forEach = function (func) {
            var list = _this.array;
            if (func == null) {
                return false;
            }
            $.each(list, function (i, item) {
                func(item);
            });
            return true;
        };
        this.sum = function (func) {
            if (!func) {
                func = function (obj) {
                    return obj;
                };
            }
            var cnt = 0;
            _this.forEach(function (item) { cnt = cnt + func(item); });
            return cnt;
        };
        this.max = function (func) {
            if (!func) {
                func = function (obj) {
                    return obj;
                };
            }
            var mx = func(_this.first());
            _this.forEach(function (item) {
                var v = func(item);
                if (mx < v) {
                    mx = v;
                }
            });
            return mx;
        };
        this.min = function (func) {
            if (!func) {
                func = function (obj) {
                    return obj;
                };
            }
            var mx = func(_this.first());
            _this.forEach(function (item) {
                var v = func(item);
                if (mx > v) {
                    mx = v;
                }
            });
            return mx;
        };
        this.select = function (selectItem) {
            if (selectItem == null) {
                return new Queryable(_this.array.slice(0));
            }
            return new Queryable(_this.array.map(selectItem));
        };
        this.orderBy = function (orderBy, isDescending) {
            if (isDescending === void 0) { isDescending = false; }
            return _this.orderByFunction(function (ob1, ob2) {
                var v1 = orderBy(ob1);
                var v2 = orderBy(ob2);
                if (v1 > v2) {
                    return 1;
                }
                if (v1 < v2) {
                    return -1;
                }
                return 0;
            }, isDescending);
        };
        this.orderByFunction = function (orderBy, isDescending) {
            if (isDescending === void 0) { isDescending = false; }
            isDescending = !!isDescending;
            if (orderBy == null) {
                return new Queryable(_this.array.slice(0));
            }
            var clone = _this.array.slice(0);
            clone.sort(orderBy);
            if (isDescending) {
                clone = clone.reverse();
            }
            return (new Queryable(clone));
        };
        this.reverse = function () {
            return new Queryable(_this.array.reverse());
        };
        this.skip = function (count) {
            if (_this.length < count) {
                return new Queryable([]);
            }
            _this.array.splice(0, count);
            return new Queryable(_this.array.slice(0));
        };
        this.take = function (count) {
            if (_this.length == 0) {
                return new Queryable([]);
            }
            if (count > _this.length) {
                count = _this.length;
            }
            _this.array.splice(count - 1, _this.length - count);
            return new Queryable(_this.array.slice(0));
        };
        this.first = function () {
            if (_this.length == 0) {
                return null;
            }
            return _this.array[0];
        };
        this.last = function () {
            if (_this.length == 0) {
                return null;
            }
            return _this.array[_this.length - 1];
        };
        this.findItem = function (selectItem) {
            return _this.where(selectItem).first();
        };
        this.find = function (selectItem) {
            return _this.where(selectItem).first();
        };
        this.contains = function (item, compareFunction) {
            if (!compareFunction) {
                compareFunction = _this.equals;
            }
            return _this.where(function (item2) { return compareFunction(item, item2); }).any();
        };
        this.union = function (arr) {
            if (arr instanceof Queryable) {
                return new Queryable(_this.array.concat(arr.toArray()));
            }
            else {
                return new Queryable(_this.array.concat(arr));
            }
        };
        this.intersect = function (arr, compareFunction) {
            if (!compareFunction) {
                compareFunction = _this.equals;
            }
            var q = null;
            if (arr instanceof Queryable) {
                q = arr;
            }
            else {
                q = new Queryable(_this.array.concat(arr));
            }
            var lst2 = [];
            _this.forEach(function (item) {
                if (q.contains(item, compareFunction)) {
                    lst2.push(item);
                }
            });
            return new Queryable(lst2);
        };
        this.difference = function (arr, compareFunction) {
            if (!compareFunction) {
                compareFunction = _this.equals;
            }
            var q = null;
            if (arr instanceof Queryable) {
                q = arr;
            }
            else {
                q = new Queryable(_this.array.concat(arr));
            }
            var lst2 = [];
            _this.forEach(function (item) {
                if (!q.contains(item, compareFunction)) {
                    lst2.push(item);
                }
            });
            return new Queryable(lst2);
        };
        this.copy = function () {
            return new Queryable(_this.array.slice(0));
        };
        this.asQueryable = function () {
            return new Queryable(_this.array.slice(0));
        };
        if (this.array == null) {
            this.array = new Array();
        }
    }
    Queryable.prototype.equals = function (x, y) {
        if (x === y)
            return true;
        // if both x and y are null or undefined and exactly the same
        if (!(x instanceof Object) || !(y instanceof Object))
            return false;
        // if they are not strictly equal, they both need to be Objects
        if (x.constructor !== y.constructor)
            return false;
        // they must have the exact same prototype chain, the closest we can do is
        // test there constructor.
        for (var p in x) {
            if (!x.hasOwnProperty(p))
                continue;
            // other properties were tested using x.constructor === y.constructor
            if (!y.hasOwnProperty(p))
                return false;
            // allows to compare x[ p ] and y[ p ] when set to undefined
            if (x[p] === y[p])
                continue;
            // if they have the same strict value or identity then they are equal
            if (typeof (x[p]) !== "object")
                return false;
            // Numbers, Strings, Functions, Booleans must be strictly equal
            if (!this.equals(x[p], y[p]))
                return false;
            // Objects and Arrays must be tested recursively
        }
        for (p in y) {
            if (y.hasOwnProperty(p) && !x.hasOwnProperty(p))
                return false;
            // allows x[ p ] to be set to undefined
        }
        return true;
    };
    Object.defineProperty(Queryable.prototype, "length", {
        get: function () {
            return this.array.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Queryable.prototype, "count", {
        get: function () {
            return this.array.length;
        },
        enumerable: true,
        configurable: true
    });
    return Queryable;
}());
//}
Array.prototype.asQueryable = function () {
    return new Queryable(this);
};
Array.prototype.remove = function (item) {
    var index = this.indexOf(item);
    if (index > -1) {
        this.splice(index, 1);
    }
};
//# sourceMappingURL=LinqToJs.js.map