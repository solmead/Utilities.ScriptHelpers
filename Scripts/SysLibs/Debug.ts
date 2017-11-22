

module Debug {

    export class Message {
        constructor(private _date: Date, private _message: string) {

        }


        get date(): Date {
            return this._date;
        }
        set date(value: Date) {
            this._date = value;
        }

        get message(): string {
            return this._message;
        }
        set message(value: string) {
            this._message = value;
        }
    }



    export class Messages {

        public messages: Array<Message> = new Array<Message>();

        constructor(private displayLocation: JQuery | string) {
            this.init();
        }

        private init = async () => {
            await Tasks.whenReady();

            var area = $(this.displayLocation);
            if (area.length == 0) {
                $("body").append("<ol class='MessageArea' style='display:none;'></ol>");
                this.displayLocation = $(".MessageArea");
            }
            await Tasks.whenTrue(() => {
                return DateTime.serverTime.serverTimeLoaded;
            });
            this.refreshMessages();

        }

        private refreshMessages = () => {
            if (DateTime.serverTime.serverStartTime != null) {
                DateTime.serverTime.startTime = new Date(DateTime.serverTime.serverStartTime.getTime() - DateTime.serverTime.offset);
            }
            var area = $(this.displayLocation);

            this.messages.forEach((item) => {
                var dt = item.date;
                var secondsFromStart = (dt.getTime() - DateTime.serverTime.startTime.getTime()) / 1000;
                dt.setTime(dt.getTime() + DateTime.serverTime.offset);
                $(area).append("<li><span class='timePart'>" + DateTime.formatTime(dt) + "</span> - <span class='messagePart'>" + item.message + "</span> - <span class='timeElapsedPart'>Time Elapsed From Start: " + DateTime.formatTimeSpan(secondsFromStart) + "</span></li>");
            });
            this.messages = new Array<Message>();
            try {
                var item = $(area).find("li:last-child");
                var t = (item.position().top + item.height()) - $(area).height() + $(area).scrollTop();
                $(area).scrollTop(t);
            } catch (err) {

            }
        }

        public showMessages = () => {
            if (DateTime.serverTime.serverTimeLoaded) {
                this.refreshMessages();
            }
        }

        public addMessage = (msg: string | Message): void => {

            if (!(msg instanceof Message)) {
                var now = new Date();
                msg = new Message(now, msg as string);
            }

            this.messages.push(msg as Message);

            this.showMessages();
        }



    }


    export var messages: Messages = new Messages(".MessageArea");





    export function debugWrite(msg: string): void {
        messages.addMessage(msg);
    }
    export function addMessage(when: Date, msg: string) {
        messages.addMessage(new Message(when, msg));
    }




}