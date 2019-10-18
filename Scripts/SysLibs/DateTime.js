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
var DateTime;
(function (DateTime) {
    var ServerTime = /** @class */ (function () {
        function ServerTime(timeApiUrl) {
            var _this = this;
            this.timeApiUrl = timeApiUrl;
            this.serverStartTime = null;
            this.startTime = new Date();
            this.serverDateTime = null;
            this.offset = 0;
            this.serverTimeLoaded = false;
            this.init = function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            Debug.debugWrite("Script Loaded in Browser");
                            return [4 /*yield*/, Tasks.whenReady()];
                        case 1:
                            _a.sent();
                            Debug.debugWrite("Page Loaded in Browser");
                            return [4 /*yield*/, Tasks.delay(1)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.refreshServerTime()];
                        case 3:
                            _a.sent();
                            Debug.debugWrite("Time Loaded from Server");
                            return [2 /*return*/];
                    }
                });
            }); };
            this.now = function () {
                return new Date();
            };
            this.refreshServerTime = function () { return __awaiter(_this, void 0, void 0, function () {
                var URL, data, sdt, ldt;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            URL = this.timeApiUrl;
                            return [4 /*yield*/, ApiLibrary.getCallAsync(URL)];
                        case 1:
                            data = _a.sent();
                            sdt = new Date(Date.parse(data.Item.Date));
                            sdt.setTime(sdt.getTime() + data.Item.Milliseconds);
                            this.serverDateTime = sdt;
                            ldt = new Date();
                            this.offset = (this.serverDateTime.getTime() - ldt.getTime());
                            this.serverTimeLoaded = true;
                            Debug.debugWrite("ServerDateTime = " + formatTime(this.serverDateTime));
                            Debug.debugWrite("LocalDateTime = " + formatTime(ldt));
                            Debug.debugWrite("Offset = " + this.offset);
                            return [2 /*return*/];
                    }
                });
            }); };
            this.init();
        }
        return ServerTime;
    }());
    DateTime.ServerTime = ServerTime;
    DateTime.serverTime = new ServerTime("/api/v1/Time");
    function dateFromIso8601(isostr) {
        if (isostr == null) {
            return new Date();
        }
        var parts = isostr.match(/\d+/g);
        if (parts.length < 6) {
            return new Date();
        }
        var y = parseInt(parts[0]);
        var m = parseInt(parts[1]) - 1;
        var d = parseInt(parts[2]);
        var h = parseInt(parts[3]);
        var mn = parseInt(parts[4]);
        var s = parseInt(parts[5]);
        return new Date(y, m, d, h, mn, s);
    }
    DateTime.dateFromIso8601 = dateFromIso8601;
    function formatTimeSpan(ts) {
        var ms = ts - Math.floor(ts);
        ts = ts - ms;
        var second = ts % 60;
        ts = ts - second;
        second = second + ms;
        ts = ts / 60;
        var minute = ts % 60;
        ts = ts - minute;
        ts = ts / 60;
        var hour = Math.floor(ts);
        var shour = "" + hour;
        var sminute = "" + minute;
        var ssecond = "" + Math.round(second * 1000) / 1000;
        if (hour < 10) {
            shour = "0" + shour;
        }
        if (minute < 10) {
            sminute = "0" + sminute;
        }
        if (second < 10) {
            ssecond = "0" + ssecond;
        }
        return shour + ":" + sminute + ":" + ssecond;
    }
    DateTime.formatTimeSpan = formatTimeSpan;
    function formatDate(dt) {
        var curr_date = dt.getDate();
        var curr_month = dt.getMonth() + 1; //Months are zero based
        var curr_year = dt.getFullYear();
        return '' + curr_month + "/" + curr_date + "/" + curr_year;
    }
    DateTime.formatDate = formatDate;
    ;
    function formatTime(dt, hideMs) {
        hideMs = !!hideMs;
        var hour = dt.getHours();
        var minute = dt.getMinutes();
        var second = dt.getSeconds();
        var ms = dt.getMilliseconds();
        var ampm = "AM";
        if (hour > 11) {
            hour = hour - 12;
            ampm = "PM";
        }
        if (hour == 0) {
            hour = 12;
        }
        var sminute = "" + minute;
        var ssecond = "" + second;
        if (minute < 10) {
            sminute = "0" + sminute;
        }
        if (second < 10) {
            ssecond = "0" + ssecond;
        }
        return hour + ":" + sminute + (hideMs ? "" : ":" + ssecond) + " " + ampm + (hideMs ? "" : ":" + ms);
    }
    DateTime.formatTime = formatTime;
    ;
    function getTimeCount() {
        var Now = new Date();
        var Cnt = Math.round(Now.getTime());
        return Cnt;
    }
    DateTime.getTimeCount = getTimeCount;
    ;
})(DateTime || (DateTime = {}));
Date.prototype.addDays = function (days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
};
//# sourceMappingURL=DateTime.js.map