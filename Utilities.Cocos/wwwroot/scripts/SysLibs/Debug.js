var Debug;
(function (Debug) {
    class Message {
        constructor(_date, _message) {
            this._date = _date;
            this._message = _message;
        }
        get date() {
            return this._date;
        }
        set date(value) {
            this._date = value;
        }
        get message() {
            return this._message;
        }
        set message(value) {
            this._message = value;
        }
    }
    Debug.Message = Message;
    class Messages {
        constructor(displayLocation) {
            this.displayLocation = displayLocation;
            this.isReady = false;
            this.messages = new Array();
            this.init = async () => {
                await Tasks.whenReady();
                await Tasks.delay(1);
                var area = $(this.displayLocation);
                if (area.length == 0) {
                    $("body").append("<ol class='MessageArea' style='display:none;'></ol>");
                    this.displayLocation = $(".MessageArea");
                }
                await Tasks.whenTrue(() => {
                    return DateTime.serverTime.serverTimeLoaded;
                });
                this.isReady = true;
                this.refreshMessages();
            };
            this.refreshMessages = () => {
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
                this.messages = new Array();
                try {
                    var item = $(area).find("li:last-child");
                    var t = (item.position().top + item.height()) - $(area).height() + $(area).scrollTop();
                    $(area).scrollTop(t);
                }
                catch (err) {
                }
            };
            this.showMessages = () => {
                if (this.isReady) {
                    this.refreshMessages();
                }
            };
            this.addMessage = (msg) => {
                if (!(msg instanceof Message)) {
                    var now = new Date();
                    msg = new Message(now, msg);
                }
                this.messages.push(msg);
                this.showMessages();
            };
            this.init();
        }
    }
    Debug.Messages = Messages;
    Debug.messages = new Messages(".MessageArea");
    function debugWrite(msg) {
        Debug.messages.addMessage(msg);
    }
    Debug.debugWrite = debugWrite;
    function addMessage(when, msg) {
        Debug.messages.addMessage(new Message(when, msg));
    }
    Debug.addMessage = addMessage;
})(Debug || (Debug = {}));
//# sourceMappingURL=Debug.js.map