//interface JQueryStatic {
//    fancybox(html:string, Settings: FancyboxOptions);
//}
function closeBasePopupDialog(data) {
    if (self != top) {
        top.closeBasePopupDialog(data);
        return;
    }
    Dialog.dialogReturn = data;
    Dialog.dialogCloseEvents.trigger();
    try {
        $('#globalPopUpDialog_' + Dialog.lastDialogNumber).dialog("close");
        Dialog.lastDialogNumber = Dialog.lastDialogNumber - 1;
    }
    catch (err) {
        var a = 1;
    }
    try {
        $.fancybox.close();
    }
    catch (err) {
    }
}
function showHtmlInDialog(html, settings, parent) {
    return Dialog.showHtmlInDialog(html, settings, parent);
}
var Dialog;
(function (Dialog) {
    Dialog.lastDialogNumber = 1234;
    Dialog.dialogReturn = null;
    Dialog.dialogCloseEvents = new Tasks.EventHandler();
    function resetPage() {
        setTimeout(function () { window.location.reload(); }, 100);
    }
    Dialog.resetPage = resetPage;
    function closeDialog() {
        closeBasePopupDialog('');
        resetPage();
    }
    Dialog.closeDialog = closeDialog;
    var DialogTypeEnum;
    (function (DialogTypeEnum) {
        DialogTypeEnum[DialogTypeEnum["JQueryDialog"] = 0] = "JQueryDialog";
        DialogTypeEnum[DialogTypeEnum["FancyBox"] = 1] = "FancyBox";
    })(DialogTypeEnum = Dialog.DialogTypeEnum || (Dialog.DialogTypeEnum = {}));
    function showBlockUI(msg) {
        if (msg == null) {
            msg = " Processing...";
        }
        $.blockUI({ message: '<h1><span class="spinner">&nbsp;&nbsp;</span>' + msg + '</h1>' });
    }
    Dialog.showBlockUI = showBlockUI;
    function hideBlockUI() {
        $.unblockUI();
    }
    Dialog.hideBlockUI = hideBlockUI;
    function getFancyBoxDialogSettings(width, height, title, noScroll, resizable, callOnClose, onComplete) {
        return {
            dialogType: DialogTypeEnum.FancyBox,
            width: width,
            height: height,
            callOnClose: callOnClose,
            onComplete: onComplete,
            noScroll: noScroll,
            resizable: resizable
        };
    }
    Dialog.getFancyBoxDialogSettings = getFancyBoxDialogSettings;
    function getJqueryUiDialogSettings(width, height, title, settings, callOnClose, onComplete) {
        return {
            dialogType: DialogTypeEnum.JQueryDialog,
            width: width,
            height: height,
            callOnClose: callOnClose,
            onComplete: onComplete,
            title: title,
            item: null,
            settings: settings
        };
    }
    Dialog.getJqueryUiDialogSettings = getJqueryUiDialogSettings;
    function getDefaultDialogSettings(dialogType) {
        if (dialogType == DialogTypeEnum.FancyBox) {
            return getFancyBoxDialogSettings();
        }
        else {
            return getJqueryUiDialogSettings();
        }
    }
    Dialog.getDefaultDialogSettings = getDefaultDialogSettings;
    //export function showElementInDialog(item: JQuery, settings: IDialogSettings): JQuery {
    //    return null;
    //}
    function showHtmlInDialog(html, options, parent) {
        var myParent = parent;
        if (self != top) {
            return top.showHtmlInDialog(html, settings, self);
        }
        if (!myParent) {
            myParent = top;
        }
        var baseOptions = getDefaultDialogSettings((options != null ? options.dialogType : null));
        var settings = $.extend(true, {}, baseOptions, options);
        Dialog.lastDialogNumber = Dialog.lastDialogNumber + 1;
        if (settings.dialogType == DialogTypeEnum.JQueryDialog) {
            showHtmlInJQDialog(html, settings, myParent);
        }
        else {
            showHtmlInFancyDialog(html, settings, myParent);
        }
    }
    Dialog.showHtmlInDialog = showHtmlInDialog;
    function showVideoInDialog(url, options) {
        var id = "video_" + DateTime.getTimeCount();
        var baseOptions = {
            dialogType: DialogTypeEnum.FancyBox,
            width: 640,
            height: 355,
            callOnClose: null,
            onComplete: function () {
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
        var html = '<a href="' + url + '" id="' + id + '_PU' + '" style="display:block; width:' + fbSettings.width + 'px; height:' + fbSettings.height + 'px; padding:0; margin:10px;"></a>';
        showHtmlInDialog(html, fbSettings);
    }
    Dialog.showVideoInDialog = showVideoInDialog;
    ;
    function showInDialog(url, options) {
        if (url == "") {
            return;
        }
        if (url.indexOf("?") != -1) {
            url = url + "&Format=CleanHTML";
        }
        else {
            url = url + "?Format=CleanHTML";
        }
        showHtmlInDialog($("<iframe style='border:0px; width:100%; height: 99%; overflow: auto;'  seamless='seamless' class='dialog' />").attr("src", url), options);
    }
    Dialog.showInDialog = showInDialog;
    ;
    function confirmDialog(msg, dialogType, callback) {
        var mg = '<p><span class="ui-icon ui-icon-alert" style="float:left; margin:0 7px 20px 0;"></span>' + msg + '</p>';
        var diaSettings = null;
        if (dialogType == DialogTypeEnum.FancyBox) {
            diaSettings = getFancyBoxDialogSettings(300, 200, "");
        }
        else {
            diaSettings = getJqueryUiDialogSettings(300, 200, "", {
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
            });
        }
        showHtmlInDialog(mg, diaSettings);
    }
    Dialog.confirmDialog = confirmDialog;
    function showHtmlInFancyDialog(html, settings, myParent) {
        var dialogNum = Dialog.lastDialogNumber;
        var item = $(html);
        var Settings = {
            autoSize: false,
            'padding': 0,
            height: 500,
            width: 700,
            afterClose: function () {
                if (settings.callOnClose && settings.callOnClose != "") {
                    var fn = myParent[settings.callOnClose];
                    if (typeof fn === 'function') {
                        fn(settings, Dialog.dialogReturn);
                    }
                }
            },
            afterLoad: settings.onComplete
        };
        Settings.type = 'inline';
        if (settings.noScroll) {
            Settings.scrolling = 'no';
        }
        if (!(settings.width == null || '' + settings.width == "")) {
            settings.width = parseInt('' + settings.width);
            if (settings.width > 0) {
                Settings.width = settings.width;
            }
        }
        if (!(settings.height == null || '' + settings.height == "")) {
            settings.height = parseInt('' + settings.height);
            if (settings.height > 0) {
                Settings.height = settings.height;
            }
        }
        $.fancybox(item, Settings);
        return item;
    }
    function showHtmlInJQDialog(html, settings, myParent) {
        var dialogNum = Dialog.lastDialogNumber;
        var DialogSettings = {
            autoOpen: true,
            modal: true,
            title: settings.title,
            width: 700,
            height: 500,
            close: function () {
                $("#globalPopUpDialog_" + dialogNum).remove();
                if (settings.callOnClose && settings.callOnClose != "") {
                    var fn = myParent[settings.callOnClose];
                    if (typeof fn === 'function') {
                        fn(settings, Dialog.dialogReturn);
                    }
                }
                Dialog.dialogReturn = null;
            }
        };
        if (!(settings.width == null || '' + settings.width == "")) {
            settings.width = parseInt('' + settings.width);
            if (settings.width > 0) {
                DialogSettings.width = settings.width;
            }
        }
        if (!(settings.height == null || '' + settings.height == "")) {
            settings.height = parseInt('' + settings.height);
            if (settings.height > 0) {
                DialogSettings.height = settings.height;
            }
        }
        DialogSettings = $.extend(true, {}, settings.settings, DialogSettings);
        $(document.body).append("<div id='globalPopUpDialog_" + dialogNum + "'></div>");
        var pUp = $("#globalPopUpDialog_" + dialogNum);
        pUp.append($(html));
        pUp.dialog(DialogSettings);
        return pUp;
    }
})(Dialog || (Dialog = {}));
//# sourceMappingURL=Dialog.js.map