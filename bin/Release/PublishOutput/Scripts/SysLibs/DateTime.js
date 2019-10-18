var DateTime;
(function (DateTime) {
    var ServerTime = (function () {
        function ServerTime(timeApiUrl) {
            var _this = this;
            this.timeApiUrl = timeApiUrl;
            this.serverStartTime = null;
            this.startTime = new Date();
            this.serverDateTime = null;
            this.offset = 0;
            this.serverTimeLoaded = false;
            this.now = function () {
                return new Date();
            };
            this.refreshServerTime = function () {
                var URL = SiteInfo.applicationUrl() + _this.timeApiUrl;
                ApiLibrary.getCall(URL, null, function (data) {
                    var sdt = new Date(Date.parse(data.Item.Date));
                    sdt.setTime(sdt.getTime() + data.Item.Milliseconds);
                    _this.serverDateTime = sdt;
                    var ldt = new Date();
                    _this.offset = (_this.serverDateTime.getTime() - ldt.getTime());
                    _this.serverTimeLoaded = true;
                    Debug.debugWrite("ServerDateTime = " + formatTime(_this.serverDateTime));
                    Debug.debugWrite("LocalDateTime = " + formatTime(ldt));
                    Debug.debugWrite("Offset = " + _this.offset);
                });
            };
            Tasks.whenReady().then(function () {
                Tasks.delay(1000).then(this.refreshServerTime);
            });
            Tasks.whenTrue(function () { return _this.serverTimeLoaded; })
                .then(function () {
                Debug.debugWrite("Time Loaded from Server");
            });
        }
        return ServerTime;
    }());
    DateTime.ServerTime = ServerTime;
    DateTime.serverTime = new ServerTime("/api/Time");
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
        var curr_month = dt.getMonth() + 1;
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
