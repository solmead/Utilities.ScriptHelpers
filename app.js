var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Test;
(function (Test) {
    class Greeter {
        constructor(element) {
            this.element = element;
            this.element.innerHTML += "The time is: ";
            this.span = document.createElement('span');
            this.element.appendChild(this.span);
            this.span.innerText = new Date().toUTCString();
        }
        start() {
            this.timerToken = new Tasks.RecurringTask(() => {
                this.span.innerHTML = new Date().toUTCString();
            }, 500);
        }
        stop() {
            this.timerToken.stop();
        }
        dosomething() {
            return __awaiter(this, void 0, void 0, function* () {
                var st = new Tasks.Task(() => {
                    var a = "ST";
                });
                setTimeout(function () {
                    st.start();
                }, 10000);
                yield st;
                var t = Tasks.runAfterWait(5000);
                t.then(() => {
                });
                Tasks.whenReady().then(() => {
                    $(".t").keypress(() => {
                        t.trigger();
                    });
                });
                Tasks.delay(1).then(() => {
                });
                //await Tasks.promisedTask(Tasks.delay(5000));
                //await Tasks.promisedTask(Tasks.run((isFinished: (result?: any) => void) => {
                //    isFinished("s");
                //}));
            });
        }
    }
})(Test || (Test = {}));
//# sourceMappingURL=app.js.map