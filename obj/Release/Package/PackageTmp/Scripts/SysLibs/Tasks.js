var Tasks;
(function (Tasks) {
    var TaskStatus;
    (function (TaskStatus) {
        TaskStatus[TaskStatus["Created"] = 0] = "Created";
        TaskStatus[TaskStatus["Canceled"] = 1] = "Canceled";
        TaskStatus[TaskStatus["Faulted"] = 2] = "Faulted";
        TaskStatus[TaskStatus["RanToCompletion"] = 3] = "RanToCompletion";
        TaskStatus[TaskStatus["Running"] = 4] = "Running";
        TaskStatus[TaskStatus["WaitingForActivation"] = 5] = "WaitingForActivation";
        TaskStatus[TaskStatus["WaitingForChildrenToComplete"] = 6] = "WaitingForChildrenToComplete";
        TaskStatus[TaskStatus["WaitingToRun"] = 7] = "WaitingToRun";
    })(TaskStatus = Tasks.TaskStatus || (Tasks.TaskStatus = {}));
    var Task = (function () {
        function Task(func) {
            var _this = this;
            this.func = func;
            this._isFinished = false;
            this._isCancelled = false;
            this._isFaulted = false;
            this._status = TaskStatus.Created;
            this._exception = null;
            this._result = null;
            this.ev = new Tasks.EventHandler();
            this.callback = function (result) {
                _this._result = result;
                _this._status = TaskStatus.WaitingForChildrenToComplete;
                var t = _this.ev.trigger();
                _this._status = TaskStatus.RanToCompletion;
                _this._isFinished = true;
                _this.ev = new Tasks.EventHandler();
            };
            this.runToEnd = function () {
                _this._status = TaskStatus.WaitingToRun;
                try {
                    _this._status = TaskStatus.Running;
                    _this.func(_this.callback);
                }
                catch (e) {
                    _this._exception = e;
                    _this._status = TaskStatus.Faulted;
                    _this._isFaulted = true;
                }
            };
            this.start = function () {
                if (_this.status === TaskStatus.Created) {
                    _this._status = TaskStatus.WaitingToRun;
                    setTimeout(function () {
                        try {
                            _this._status = TaskStatus.Running;
                            _this.func(_this.callback);
                        }
                        catch (e) {
                            _this._exception = e;
                            _this._status = TaskStatus.Faulted;
                            _this._isFaulted = true;
                        }
                    }, 0);
                }
                return _this;
            };
            this.then = function (call) {
                var tsk = null;
                if (call instanceof Task) {
                    tsk = call;
                }
                else {
                    var func = call;
                    tsk = new Task(func);
                }
                if (_this.status === TaskStatus.WaitingForChildrenToComplete ||
                    _this.status === TaskStatus.RanToCompletion) {
                    tsk.start();
                }
                else {
                    if (_this.status === TaskStatus.Created ||
                        _this.status === TaskStatus.WaitingToRun ||
                        _this.status === TaskStatus.Running) {
                        _this.ev.addListener(function () {
                            tsk.start();
                        });
                    }
                }
                return tsk;
            };
            this.continueWith = function (call) {
                return _this.then(call);
            };
            this.wait = function (secondsWait) {
                if (secondsWait < 0) {
                    secondsWait = 1000 * 60 * 60;
                }
                var dt = (new Date()).getTime() + secondsWait;
                return whenTrue(function () {
                    var d = new Date();
                    return _this.isFinished || _this.isCancelled || _this.isFaulted || d.getTime() > dt;
                });
            };
            if (!func) {
                this.func = function (rFunc) {
                    rFunc();
                };
            }
        }
        Object.defineProperty(Task.prototype, "result", {
            get: function () {
                return this._result;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Task.prototype, "isFinished", {
            get: function () {
                return this._isFinished;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Task.prototype, "isCancelled", {
            get: function () {
                return this._isCancelled;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Task.prototype, "isFaulted", {
            get: function () {
                return this._isFaulted;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Task.prototype, "status", {
            get: function () {
                return this._status;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Task.prototype, "exception", {
            get: function () {
                return this._exception;
            },
            enumerable: true,
            configurable: true
        });
        return Task;
    }());
    Tasks.Task = Task;
    var RecurringTask = (function () {
        function RecurringTask(callback, timeout, maxLockTime) {
            var _this = this;
            this.callback = callback;
            this.timeout = timeout;
            this.maxLockTime = maxLockTime;
            this._isRunning = false;
            this.locker = new Lock.Locker();
            this.timedCall = function () {
                if (!_this.isLocked() && _this.callback) {
                    _this.callback();
                }
                if (_this.isRunning) {
                    setTimeout(function () { _this.timedCall(); }, _this.timeout);
                }
            };
            this.setTimeOut = function (time) {
                _this.timeout = time;
            };
            this.lock = function () {
                _this.locker.lock();
            };
            this.unLock = function () {
                _this.locker.unLock();
            };
            this.isLocked = function () {
                return _this.locker.isLocked();
            };
            this.start = function () {
                if (!_this.isRunning) {
                    _this._isRunning = true;
                    _this.timedCall();
                }
            };
            this.stop = function () {
                _this._isRunning = false;
            };
        }
        Object.defineProperty(RecurringTask.prototype, "isRunning", {
            get: function () {
                return this._isRunning;
            },
            enumerable: true,
            configurable: true
        });
        return RecurringTask;
    }());
    Tasks.RecurringTask = RecurringTask;
    function runAfterWait(waitTimeMilliSeconds) {
        var t = new Task();
        var timer = null;
        var throttle = function () {
            clearTimeout(timer);
            timer = window.setTimeout(function () {
                t.start();
            }, waitTimeMilliSeconds || 500);
        };
        t.trigger = function () {
            throttle();
        };
        t.call = function () {
            clearTimeout(timer);
            t.start();
        };
        return t;
    }
    Tasks.runAfterWait = runAfterWait;
    function debounced() {
        var t = new Task();
        t.trigger = function () {
            t.start();
        };
        t.call = function () {
            t.start();
        };
        return t;
    }
    Tasks.debounced = debounced;
    function debouncedAtEnd(waitTimeMilliSeconds) {
        var t = new Task(function (cback) {
            setTimeout(cback, waitTimeMilliSeconds);
        });
        t.trigger = function () {
            t.start();
        };
        t.call = function () {
            t.start();
        };
        return t;
    }
    Tasks.debouncedAtEnd = debouncedAtEnd;
    function run(task) {
        var tsk = null;
        if (task instanceof Task) {
            tsk = task;
        }
        else {
            var func = task;
            tsk = new Task(func);
        }
        return tsk.start();
    }
    Tasks.run = run;
    function delay(msec) {
        return run(function (cback) {
            setTimeout(cback, msec);
        });
    }
    Tasks.delay = delay;
    function whenReady() {
        var t = new Task();
        $(function () {
            t.start();
        });
        return t;
    }
    Tasks.whenReady = whenReady;
    function whenTrue(trueFunc) {
        if (!trueFunc || trueFunc()) {
            return run(new Task());
        }
        return run(function (isFinished) {
            var obj = new RecurringTask(function () {
                obj.lock();
                if (trueFunc()) {
                    if (isFinished) {
                        isFinished();
                    }
                    obj.stop();
                }
                obj.unLock();
            }, 100);
            obj.start();
        });
    }
    Tasks.whenTrue = whenTrue;
    function waitAll(tasks, timeOut) {
        var lng = tasks.length;
        var waitList = tasks.asQueryable().select(function (obj) {
            obj.start();
            return obj.wait(timeOut);
        });
        return whenTrue(function () {
            return waitList.where(function (item) { return item.isFinished || item.isCancelled || item.isFaulted; }).count >= lng;
        });
    }
    Tasks.waitAll = waitAll;
    function waitAny(tasks, timeOut) {
        var waitList = tasks.asQueryable().select(function (obj) {
            obj.start();
            return obj.wait(timeOut);
        });
        return whenTrue(function () {
            return waitList.where(function (item) { return item.isFinished || item.isCancelled || item.isFaulted; }).any();
        });
    }
    Tasks.waitAny = waitAny;
    function whenAll(tasks) {
        var lng = tasks.length;
        var tQuery = tasks.asQueryable();
        tQuery.forEach(function (t) { return t.start(); });
        return whenTrue(function () {
            return tQuery.where(function (item) { return item.isFinished || item.isCancelled || item.isFaulted; }).count >= lng;
        });
    }
    Tasks.whenAll = whenAll;
    function whenAny(tasks) {
        var tQuery = tasks.asQueryable();
        tQuery.forEach(function (t) { return t.start(); });
        return whenTrue(function () {
            return tQuery.where(function (item) { return item.isFinished || item.isCancelled || item.isFaulted; }).any();
        });
    }
    Tasks.whenAny = whenAny;
    function whenAllSync(tasks) {
        var q = tasks.asQueryable();
        var thisTask = null;
        q.forEach(function (item) {
            var it = item;
            if (thisTask == null) {
                thisTask = it;
            }
            else {
                thisTask = thisTask.then(it);
            }
        });
        q.first().start();
        return whenTrue(function () { return q.first().isFinished; });
    }
    Tasks.whenAllSync = whenAllSync;
})(Tasks || (Tasks = {}));
