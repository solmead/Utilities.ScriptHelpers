/// <reference path="../SysLibs/Tasks.js" />

Namespace.Register("System.CMS.Timing");

String.prototype.replaceAll = function (str1, str2, ignore) {
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), (ignore ? "gi" : "g")), (typeof (str2) == "string") ? str2.replace(/\$/g, "$$$$") : str2);
};



System.ServerStartTime = null;
System.StartTime = new Date();
System.ServerDateTime = "";
System.Offset = 0;
System.Messages = new Array();
System.ServerTimeLoaded = false;

System.ShowMessages = function () {
    if (System.ServerTimeLoaded) {
        if (System.ServerStartTime != null) {
            System.StartTime = new Date(System.ServerStartTime.getTime() - System.Offset);
        }
        var area = $(".MessageArea");
        if (area.length == 0) {
            $("body").append("<ol class='MessageArea' style='display:none;></ol>");
            area = $(".MessageArea");
        }
        $.each(System.Messages, function (i, item) {
            var dt = item.date;
            var secondsFromStart = (dt - System.StartTime.getTime()) / 1000;
            dt.setTime(dt.getTime() + System.Offset);
            $(area).append("<li><span class='timePart'>" + System.formatTime(dt) + "</span> - <span class='messagePart'>" + item.message + "</span> - <span class='timeElapsedPart'>Time Elapsed From Start: " + System.formatTimeSpan(secondsFromStart) + "</span></li>");
        });
        System.Messages = new Array();
        try {
            var item = $(area).find("li:last-child");
            t = (item.position().top + item.height()) - $(area).height() + $(area).scrollTop();
            $(area).scrollTop(t);
        } catch (err) {

        }
    }
};

System.RefreshServerTime = function () {
    var Now = new Date();
    var Cnt = parseInt(Now.getTime());
    var URL = System.ApplicationURL() + "api/Time";
    $.getJSON(URL + "?Cnt=" + System.GetTimeCount(), function (data) {
        //Milliseconds
        var sdt = new Date(Date.parse(data.Item.Date));
        sdt.setTime(sdt.getTime() + data.Item.Milliseconds);
        System.ServerDateTime = sdt;
        var ldt = new Date();
        System.Offset = (System.ServerDateTime.getTime() - ldt.getTime());
        System.ServerTimeLoaded = true;
        System.DebugWrite("ServerDateTime = " + System.formatTime(System.ServerDateTime));
        System.DebugWrite("LocalDateTime = " + System.formatTime(ldt));
        System.DebugWrite("Offset = " + System.Offset);
        System.ShowMessages();
    });
};

Tasks.whenReady().then(function() {
    Tasks.delay(1000).then(RefreshServerTime);
});

System.DebugWrite = function (Message) {

    var Now = new Date();
    System.Messages.push({ date: Now, message: Message });

    System.ShowMessages();

};
