
System.lastDialogNumber = 1234;
System.dialogReturn = null;

function closeBasePopupDialog(data) {
    if (self != top) {
        top.closeBasePopupDialog(data);
        return;
    }
    System.dialogReturn = data;
    try {
        $('#globalPopUpDialog_' + System.lastDialogNumber).dialog("close");
        System.lastDialogNumber = System.lastDialogNumber - 1;
    } catch (err) {
        var a = 1;
    }
    try {
        $.fancybox.close();
    } catch (err) {

    }
}

function ResetPage() {
    setTimeout(function () { window.location.reload(); }, 100);
}
function CloseDialog() {
    parent.$.fancybox.close();
    closeBasePopupDialog('');
    ResetPage();
}

System.Confirm = function (msg, callback) {
    var mg = '<p><span class="ui-icon ui-icon-alert" style="float:left; margin:0 7px 20px 0;"></span>' + msg + '</p>';
    System.ShowHTMLInDialog(mg, {
        Title: "",
        Height: 200,
        Width: 300,
        DialogSettings: {
            resizable: false,
            buttons: {
                "Ok": function () {
                    closeBasePopupDialog(null);
                    if (callback) {
                        callback(true);
                    }
                },
                Cancel: function () {
                    closeBasePopupDialog(null);
                    if (callback) {
                        callback(false);
                    }
                }
            }
        }
    });
}
System.ShowHTMLInDialog = function (html, options, parent) {
    var myParent = parent;
    if (self != top) {
        top.System.ShowHTMLInDialog(html, options, self);
        return;
    }
    if (!myParent) {
        myParent = top;
    }
    var baseOptions = {
        Title: null,
        Width: null,
        Height: null,
        CallOnClose: null,
        Item: null
    };
    var settings = $.extend(true, {}, baseOptions, options);

    System.lastDialogNumber = System.lastDialogNumber + 1;
    var dialogNum = System.lastDialogNumber;

    var DialogSettings = {
        autoOpen: true,
        modal: true,
        title: settings.Title,
        width: 700,
        height: 500,
        close: function () {
            $("#globalPopUpDialog_" + dialogNum).remove();
            if (settings.CallOnClose && settings.CallOnClose != "") {
                var fn = myParent[settings.CallOnClose];
                if (typeof fn === 'function') {
                    fn(settings.Item, System.dialogReturn);
                }
            }
            System.dialogReturn = null;
        }
    };

    if (!(settings.Width == null || settings.Width == "")) {
        settings.Width = parseInt(settings.Width);
        DialogSettings.width = settings.Width;
    }
    if (!(settings.Height == null || settings.Height == "")) {
        settings.Height = parseInt(settings.Height);
        DialogSettings.height = settings.Height;
    }

    DialogSettings = $.extend(true, {}, settings.DialogSettings, DialogSettings);

    $(document.body).append("<div id='globalPopUpDialog_" + dialogNum + "'></div>");

    var pUp = $("#globalPopUpDialog_" + dialogNum);

    pUp.append($(html));
    pUp.dialog(DialogSettings);
    return pUp;
};

System.ShowInDialog = function (url, options, parent) {
    var myParent = parent;
    if (self != top) {
        top.System.ShowInDialog(url, options, self);
        return;
    }
    if (!myParent) {
        myParent = top;
    }

    if (url == "") {
        return;
    }
    if (url.indexOf("?") != -1) {
        url = url + "&Format=CleanHTML";
    } else {
        url = url + "?Format=CleanHTML";
    }

    System.ShowHTMLInDialog($("<iframe style='border:0px; width:100%; height: 99%; overflow: auto;'  seamless='seamless' class='dialog' />").attr("src", url), options, myParent);

};

System.ShowVideoInFancyBox = function (url, options, parent) {
    var myParent = parent;
    if (self != top) {
        top.System.ShowVideoInFancyBox(url, options, self);
        return;
    }
    if (!myParent) {
        myParent = top;
    }

    var id = "video_" + System.GetTimeCount();

    var baseOptions = {
        Width: 640,
        Height: 355,
        NoScroll: false,
        CallOnClose: null,
        Item: null,
        OnComplete: function () {
            //alert(id + "_PU");
            $f(id + '_PU', "/WMP/flash/flowplayer-3.2.12.swf", {
                'key': '#$695a7519d0be6236d25',
                clip: {
                    url: url,
                    autoPlay: true,
                    autoBuffering: true
                }
            });
        }
    };
    var fbSettings = $.extend(true, {}, baseOptions, options);

    var html = '<a href="' + videoPath + '" id="' + id + '_PU' + '" style="display:block; width:640px; height:355px; padding:0; margin:10px;"></a>';
    System.ShowHTMLInFancyBox(html, fbSettings);
};

System.ShowHTMLInFancyBox = function (html, options, parent) {

    var myParent = parent;
    if (self != top) {
        top.System.ShowInFancyBox(url, options, self);
        return;
    }
    if (!myParent) {
        myParent = top;
    }
    var baseOptions = {
        Width: null,
        Height: null,
        NoScroll: false,
        CallOnClose: null,
        Item: null,
        OnComplete: null
    };
    var fbSettings = $.extend(true, {}, baseOptions, options);


    var Width = fbSettings.Width;
    var Height = fbSettings.Height;
    var NoScroll = fbSettings.NoScroll;
    var CallOnClose = fbSettings.CallOnClose;


    var Settings = {
        'autoScale': false,
        'padding': 0,
        'transitionIn': 'elastic',
        'transitionOut': 'elastic',
        height: 500,
        width: 700,
        onClosed: function() {
            if (CallOnClose && CallOnClose != "") {
                var fn = window[CallOnClose];
                if (typeof fn === 'function') {
                    fn(fbSettings.Item, System.dialogReturn);
                }
            }
        },
        onComplete: fbSettings.onComplete
};
    Settings.type = 'inline';
    if (NoScroll) {
        Settings.scrolling = 'no';
    }
    if (!(Width == null || Width == "")) {
        Width = parseInt(Width);
        Settings.width = Width;
    }
    if (!(Height == null || Height == "")) {
        Height = parseInt(Height);
        Settings.height = Height;
    }
    $.fancybox(html, Settings);
};

System.ShowInFancyBox = function (url, options, parent) {
    var myParent = parent;
    if (self != top) {
        top.System.ShowInFancyBox(url, options, self);
        return;
    }
    if (!myParent) {
        myParent = top;
    }
    var baseOptions = {
        Width: null,
        Height: null,
        IsImage: false,
        NoScroll: false,
        CallOnClose: null,
        Item: null,
        OnComplete: null
    };
    var fbSettings = $.extend(true, {}, baseOptions, options);


    var Area = url;
    var Width = fbSettings.Width;
    var Height = fbSettings.Height;
    var isImage = fbSettings.IsImage;
    var NoScroll = fbSettings.NoScroll;
    var CallOnClose = fbSettings.CallOnClose;

    
    if (Area.indexOf("?") != -1) {
        Area = Area + "&Format=CleanHTML";
    } else {
        Area = Area + "?Format=CleanHTML";
    }
    var Settings = {
        'autoScale': false,
        'padding': 0,
        'href': Area,
        'transitionIn': 'elastic',
        'transitionOut': 'elastic',
        height: 500,
        width: 700,
        onClosed: function () {
            if (CallOnClose && CallOnClose != "") {
                var fn = window[CallOnClose];
                if (typeof fn === 'function') {
                    fn(fbSettings.Item, System.dialogReturn);
                }
            }
        },
        onComplete: fbSettings.onComplete
    };
    if (isImage) {

    } else {

        Settings.type = 'iframe';
        if (NoScroll) {
            Settings.scrolling = 'no';
        }
    }
    if (!(Width == null || Width == "")) {
        Width = parseInt(Width);
        Settings.width = Width;
    }
    if (!(Height == null || Height == "")) {
        Height = parseInt(Height);
        Settings.height = Height;
    }
    $.fancybox(Settings);

};
