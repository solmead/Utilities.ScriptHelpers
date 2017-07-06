var Test;
(function (Test) {
    var Greeter = (function () {
        function Greeter(element) {
            this.element = element;
            this.element.innerHTML += "The time is: ";
            this.span = document.createElement('span');
            this.element.appendChild(this.span);
            this.span.innerText = new Date().toUTCString();
        }
        Greeter.prototype.start = function () {
            var _this = this;
            this.timerToken = new Tasks.RecurringTask(function () {
                _this.span.innerHTML = new Date().toUTCString();
            }, 500);
        };
        Greeter.prototype.stop = function () {
            this.timerToken.stop();
        };
        return Greeter;
    }());
})(Test || (Test = {}));
