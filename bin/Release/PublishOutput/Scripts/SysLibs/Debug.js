var Debug;
(function (Debug) {
    var Message = (function () {
        function Message(_date, _message) {
            this._date = _date;
            this._message = _message;
        }
        Object.defineProperty(Message.prototype, "date", {
            get: function () {
                return this._date;
            },
            set: function (value) {
                this._date = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Message.prototype, "message", {
            get: function () {
                return this._message;
            },
            set: function (value) {
                this._message = value;
            },
            enumerable: true,
            configurable: true
        });
        return Message;
    }());
    Debug.Message = Message;
    var Messages = (function () {
        function Messages(displayLocation) {
            var _this = this;
            this.displayLocation = displayLocation;
            this.messages = new Array();
            this.showMessages = function () {
                if (DateTime.serverTime.serverTimeLoaded) {
                    if (DateTime.serverTime.serverStartTime != null) {
                        DateTime.serverTime.startTime = new Date(DateTime.serverTime.serverStartTime.getTime() - DateTime.serverTime.offset);
                    }
                    var area = $(_this.displayLocation);
                    if (area.length == 0) {
                        $("body").append("<ol class='MessageArea' style='display:none;></ol>");
                        area = $(_this.displayLocation);
                    }
                    _this.messages.forEach(function (item) {
                        var dt = item.date;
                        var secondsFromStart = (dt.getTime() - DateTime.serverTime.startTime.getTime()) / 1000;
                        dt.setTime(dt.getTime() + DateTime.serverTime.offset);
                        $(area).append("<li><span class='timePart'>" + DateTime.formatTime(dt) + "</span> - <span class='messagePart'>" + item.message + "</span> - <span class='timeElapsedPart'>Time Elapsed From Start: " + DateTime.formatTimeSpan(secondsFromStart) + "</span></li>");
                    });
                    _this.messages = new Array();
                    try {
                        var item = $(area).find("li:last-child");
                        var t = (item.position().top + item.height()) - $(area).height() + $(area).scrollTop();
                        $(area).scrollTop(t);
                    }
                    catch (err) {
                    }
                }
            };
            this.addMessage = function (msg) {
                if (!(msg instanceof Message)) {
                    var now = new Date();
                    msg = new Message(now, msg);
                }
                _this.messages.push(msg);
                _this.showMessages();
            };
        }
        return Messages;
    }());
    Debug.Messages = Messages;
    Debug.messages = new Messages($(".MessageArea"));
    function debugWrite(msg) {
        Debug.messages.addMessage(msg);
    }
    Debug.debugWrite = debugWrite;
})(Debug || (Debug = {}));
