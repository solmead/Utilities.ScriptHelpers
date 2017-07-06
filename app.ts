namespace Test {
    class Greeter {
        element: HTMLElement;
        span: HTMLElement;
        timerToken: Tasks.RecurringTask;

        constructor(element: HTMLElement) {
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

        async dosomething() {

            var st = new Tasks.Task(() => {
                var a = "ST";
            });

            setTimeout(function() {
                    st.start();
                },
                10000);


            await st;


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
        }

    }
    


}

