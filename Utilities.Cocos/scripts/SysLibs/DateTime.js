var DateTime;
(function (DateTime) {
    class ServerTime {
        constructor(timeApiUrl) {
            this.timeApiUrl = timeApiUrl;
            this.serverStartTime = null;
            this.startTime = new Date();
            this.serverDateTime = null;
            this.offset = 0;
            this.serverTimeLoaded = false;
            this.init = async () => {
                Debug.debugWrite("Script Loaded in Browser");
                await Tasks.whenReady();
                Debug.debugWrite("Page Loaded in Browser");
                await Tasks.delay(1);
                await this.refreshServerTime();
                Debug.debugWrite("Time Loaded from Server");
            };
            this.now = () => {
                return new Date();
            };
            this.refreshServerTime = async () => {
                var URL = this.timeApiUrl;
                var data = await ApiLibrary.getCallAsync(URL);
                var sdt = new Date(Date.parse(data.Item.Date));
                sdt.setTime(sdt.getTime() + data.Item.Milliseconds);
                this.serverDateTime = sdt;
                var ldt = new Date();
                this.offset = (this.serverDateTime.getTime() - ldt.getTime());
                this.serverTimeLoaded = true;
                Debug.debugWrite("ServerDateTime = " + formatTime(this.serverDateTime));
                Debug.debugWrite("LocalDateTime = " + formatTime(ldt));
                Debug.debugWrite(`Offset = ${this.offset}`);
                return;
            };
            this.init();
        }
    }
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