var Tasks;
(function (Tasks) {
    class EventHandler {
        constructor() {
            this.onTrigger = [];
            this.trigger = (data) => {
                this.onTrigger.asQueryable().forEach((fn) => {
                    fn(data);
                });
            };
            this.addListener = (callback) => {
                this.onTrigger.push(callback);
            };
        }
    }
    Tasks.EventHandler = EventHandler;
})(Tasks || (Tasks = {}));
//# sourceMappingURL=EventHandler.js.map