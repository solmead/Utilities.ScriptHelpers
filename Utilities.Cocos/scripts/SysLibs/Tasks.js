var Tasks;
(function (Tasks) {
    class Task {
        constructor(func) {
            //super((resolve, reject) => {
            //        resolveFunc = resolve;
            //});
            this.func = func;
            this.promise = null;
            this.then = (onFulfilled) => {
                return this.promise.then(onFulfilled);
            };
            this.start = () => {
                this.func((val) => {
                    this.resolveFunc(val);
                });
            };
            this.promise = new Promise((resolve) => {
                this.resolveFunc = resolve;
            });
            if (!this.func) {
                this.func = (rFunc) => {
                    return rFunc();
                };
            }
            else if (func.length === 0) {
                var bfunc = this.func;
                this.func = (rFunc) => {
                    bfunc();
                    rFunc();
                };
            }
        }
    }
    Tasks.Task = Task;
    class RecurringTask {
        constructor(callback, timeout, maxLockTime) {
            this.callback = callback;
            this.timeout = timeout;
            this.maxLockTime = maxLockTime;
            this._isRunning = false;
            this.locker = new Lock.Locker();
            this.timedCall = () => {
                if (!this.isLocked() && this.callback) {
                    this.callback();
                }
                if (this.isRunning) {
                    setTimeout(() => { this.timedCall(); }, this.timeout);
                }
            };
            //private set isRunning(value: boolean) {
            //    this._isRunning = value;
            //}
            this.setTimeOut = (time) => {
                this.timeout = time;
            };
            this.lock = () => {
                this.locker.lock();
            };
            this.unLock = () => {
                this.locker.unLock();
            };
            this.isLocked = () => {
                return this.locker.isLocked();
            };
            this.start = () => {
                if (!this.isRunning) {
                    this._isRunning = true;
                    this.timedCall();
                }
            };
            this.stop = () => {
                this._isRunning = false;
            };
        }
        get isRunning() {
            return this._isRunning;
        }
    }
    Tasks.RecurringTask = RecurringTask;
    class AnimationTask {
        constructor(callback) {
            this.callback = callback;
            this._isRunning = false;
            this.draw = () => {
                if (this.callback) {
                    this.callback();
                }
                window.requestAnimationFrame(() => this.draw());
            };
            this.timedCall = () => {
                window.requestAnimationFrame(() => this.draw());
            };
            this.start = () => {
                if (!this.isRunning) {
                    this._isRunning = true;
                    this.timedCall();
                }
            };
            this.stop = () => {
                this._isRunning = false;
            };
        }
        get isRunning() {
            return this._isRunning;
        }
    }
    Tasks.AnimationTask = AnimationTask;
    function runAfterWait(waitTimeMilliSeconds) {
        var t = new Task((cback) => {
            cback();
        });
        var timer = null;
        var throttle = () => {
            clearTimeout(timer);
            timer = window.setTimeout(() => {
                t.start();
            }, waitTimeMilliSeconds || 500);
        };
        t.trigger = () => {
            throttle();
        };
        t.call = () => {
            clearTimeout(timer);
            t.start();
        };
        return t;
    }
    Tasks.runAfterWait = runAfterWait;
    function debounced() {
        var t = new Task((cback) => {
            cback();
        });
        t.trigger = () => {
            t.start();
        };
        t.call = () => {
            t.start();
        };
        return t;
    }
    Tasks.debounced = debounced;
    //export function debouncedAtEnd(waitTimeMilliSeconds: number): IDebouncedTask<void> {
    //    var t = new Task<void>((cback) => {
    //        setTimeout(cback, waitTimeMilliSeconds);
    //    }) as IDebouncedTask<void>;
    //    t.trigger = (): void => {
    //        t.start();
    //    }
    //    t.call = (): void => {
    //        t.start();
    //    }
    //    return t;
    //}
    function delay(msec) {
        return new Promise((resolve) => {
            setTimeout(resolve, msec);
        });
    }
    Tasks.delay = delay;
    function whenReady() {
        return new Promise((resolve) => {
            $(() => {
                resolve();
            });
        });
    }
    Tasks.whenReady = whenReady;
    function whenTrue(trueFunc) {
        if (!trueFunc || trueFunc()) {
            return new Promise((resolve) => {
                resolve();
            });
        }
        return new Promise((resolve) => {
            var obj = new RecurringTask(() => {
                obj.lock();
                if (trueFunc()) {
                    resolve();
                    obj.stop();
                }
                obj.unLock();
            }, 100);
            obj.start();
        });
    }
    Tasks.whenTrue = whenTrue;
})(Tasks || (Tasks = {}));
//# sourceMappingURL=Tasks.js.map