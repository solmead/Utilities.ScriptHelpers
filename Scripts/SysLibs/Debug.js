var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Debug;
(function (Debug) {
    var Message = /** @class */ (function () {
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
    var Messages = /** @class */ (function () {
        function Messages(displayLocation) {
            var _this = this;
            this.displayLocation = displayLocation;
            this.isReady = false;
            this.messages = new Array();
            this.init = function () { return __awaiter(_this, void 0, void 0, function () {
                var area;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Tasks.whenReady()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, Tasks.delay(1)];
                        case 2:
                            _a.sent();
                            area = $(this.displayLocation);
                            if (area.length == 0) {
                                $("body").append("<ol class='MessageArea' style='display:none;'></ol>");
                                this.displayLocation = $(".MessageArea");
                            }
                            return [4 /*yield*/, Tasks.whenTrue(function () {
                                    return DateTime.serverTime.serverTimeLoaded;
                                })];
                        case 3:
                            _a.sent();
                            this.isReady = true;
                            this.refreshMessages();
                            return [2 /*return*/];
                    }
                });
            }); };
            this.refreshMessages = function () {
                if (DateTime.serverTime.serverStartTime != null) {
                    DateTime.serverTime.startTime = new Date(DateTime.serverTime.serverStartTime.getTime() - DateTime.serverTime.offset);
                }
                var area = $(_this.displayLocation);
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
            };
            this.showMessages = function () {
                if (_this.isReady) {
                    _this.refreshMessages();
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
            this.init();
        }
        return Messages;
    }());
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