var Lock;
(function (Lock) {
    var Locker = (function () {
        function Locker(maxLockTime) {
            var _this = this;
            this.maxLockTime = maxLockTime;
            this.locked = false;
            this.lastCalled = null;
            this.isLocked = function () {
                var seconds = 0;
                if (_this.lastCalled) {
                    seconds = ((new Date()).getTime() - _this.lastCalled.getTime()) / 1000;
                }
                return _this.locked && seconds < _this.maxLockTime;
            };
            this.lock = function () {
                _this.locked = true;
                _this.lastCalled = new Date();
            };
            this.unLock = function () {
                _this.locked = false;
            };
            if (!this.maxLockTime) {
                this.maxLockTime = 30.0;
            }
        }
        return Locker;
    }());
    Lock.Locker = Locker;
})(Lock || (Lock = {}));
//# sourceMappingURL=Lock.js.map