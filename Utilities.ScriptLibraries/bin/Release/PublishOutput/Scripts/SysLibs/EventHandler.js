var Tasks;
(function (Tasks) {
    var EventHandler = (function () {
        function EventHandler() {
            var _this = this;
            this.onTrigger = [];
            this.trigger = function (data) {
                _this.onTrigger.asQueryable().forEach(function (fn) {
                    fn(data);
                });
            };
            this.addListener = function (callback) {
                _this.onTrigger.push(callback);
            };
        }
        return EventHandler;
    }());
    Tasks.EventHandler = EventHandler;
})(Tasks || (Tasks = {}));
