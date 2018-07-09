function ResetPage() {
    setTimeout(function () { window.location.reload(); }, 100);
}
function CloseDialog() {
    top.ResetPage();
}
Array.prototype.Where = function (where) {
    var arr = this;
    return arr.asQueryable().where(where).toArray();
};
Array.prototype.Any = function (where) {
    var arr = this;
    return arr.asQueryable().any(where);
};
Array.prototype.ForEach = function (func) {
    var arr = this;
    arr.asQueryable().forEach(func);
};
Array.prototype.Sum = function (func) {
    var arr = this;
    return arr.asQueryable().sum(func);
};
Array.prototype.Select = function (func) {
    var arr = this;
    return arr.asQueryable().select(func).toArray();
};
Array.prototype.OrderBy = function (orderBy, isDescending) {
    var arr = this;
    return arr.asQueryable().orderBy(orderBy, isDescending).toArray();
};
Array.prototype.Skip = function (count) {
    var arr = this;
    return arr.asQueryable().skip(count).toArray();
};
Array.prototype.Take = function (count) {
    var arr = this;
    return arr.asQueryable().take(count).toArray();
};
Array.prototype.First = function () {
    var arr = this;
    return arr.asQueryable().first();
};
Array.prototype.Last = function () {
    var arr = this;
    return arr.asQueryable().last();
};
Array.prototype.FindItem = function (select) {
    var arr = this;
    return arr.asQueryable().findItem(select);
};
Array.prototype.Find = function (select) {
    var arr = this;
    return arr.asQueryable().findItem(select);
};
Array.prototype.Contains = function (item, compareFunction) {
    var arr = this;
    return arr.asQueryable().contains(item, compareFunction);
};
Array.prototype.Union = function (arr) {
    var arr2 = this;
    return arr2.asQueryable().union(arr).toArray();
};
Array.prototype.Intersect = function (arr, compareFunction) {
    var arr2 = this;
    return arr2.asQueryable().intersect(arr, compareFunction).toArray();
};
Array.prototype.Difference = function (arr, compareFunction) {
    var arr2 = this;
    return arr2.asQueryable().difference(arr, compareFunction).toArray();
};
var System;
(function (System) {
    function Init(area) {
        SysLibs.Init(area);
    }
    System.Init = Init;
    //APILibrary
    function AddAntiForgeryToken(data) {
        return ApiLibrary.addAntiForgeryToken(data);
    }
    System.AddAntiForgeryToken = AddAntiForgeryToken;
    function ApiCall(type, url, sendData, successCallback, errorCallback, beforeSend) {
        ApiLibrary.apiCall(type, url, sendData, successCallback, errorCallback, beforeSend);
    }
    System.ApiCall = ApiCall;
    function getCall(url, seqNum, successCallback, errorCallback) {
        ApiLibrary.getCall(url, seqNum, successCallback, errorCallback);
    }
    System.getCall = getCall;
    function putCall(url, seqNum, sendData, successCallback, errorCallback) {
        ApiLibrary.putCall(url, seqNum, sendData, successCallback, errorCallback);
    }
    System.putCall = putCall;
    function postCall(url, seqNum, sendData, successCallback, errorCallback) {
        ApiLibrary.postCall(url, seqNum, sendData, successCallback, errorCallback);
    }
    System.postCall = postCall;
    function AutoSaveForm(form, beforeSave, afterResponse) {
        //not implemented
    }
    System.AutoSaveForm = AutoSaveForm;
    function AjaxPostForm(form, afterResponse) {
        $(form).submitUsingAjax(JqueryEx.createAjaxOptions(null, afterResponse));
    }
    System.AjaxPostForm = AjaxPostForm;
    function AddAjaxFormSubmit(form, beforeSubmit, afterResponse) {
        $(form).onSubmitUseAjax(JqueryEx.createAjaxOptions(beforeSubmit, afterResponse));
    }
    System.AddAjaxFormSubmit = AddAjaxFormSubmit;
    function AddAjaxClickGet(item, beforeSubmit, afterResponse) {
        $(item).onClickAjaxGet(JqueryEx.createAjaxOptions(beforeSubmit, afterResponse));
    }
    System.AddAjaxClickGet = AddAjaxClickGet;
    function AjaxPost(item, afterResponse) {
        var clickUrl = $(item).attr("href");
        postCall(clickUrl, null, null, afterResponse, null);
    }
    System.AjaxPost = AjaxPost;
    function AddClickPostForm(item, beforeSubmit) {
        $(item).onClickPostAsForm(JqueryEx.createAjaxOptions(beforeSubmit, null));
    }
    System.AddClickPostForm = AddClickPostForm;
    function AddAjaxClickPost(item, beforeSubmit, afterResponse) {
        $(item).onClickAjaxPost(JqueryEx.createAjaxOptions(beforeSubmit, afterResponse));
    }
    System.AddAjaxClickPost = AddAjaxClickPost;
    //BaseLibrary
    function dateFromISO8601(isostr) {
        return DateTime.dateFromIso8601(isostr);
    }
    System.dateFromISO8601 = dateFromISO8601;
    function IsIEInCompatMode() {
        return (navigator.appVersion.indexOf("MSIE 7.") != -1) && ((navigator.userAgent.indexOf("Trident/5") > -1) || (navigator.userAgent.indexOf("Trident/6") > -1) || (navigator.userAgent.indexOf("Trident/7") > -1) || (navigator.userAgent.indexOf("Trident/8") > -1));
    }
    System.IsIEInCompatMode = IsIEInCompatMode;
    function isElementInDOM(elt) {
        return $(elt).length > 0;
    }
    System.isElementInDOM = isElementInDOM;
    function Equals(x, y) {
        //not implemented
    }
    System.Equals = Equals;
    System.PageTitleNotification = {};
    function Notify(subject, message) {
        //not implemented
    }
    System.Notify = Notify;
    function round(num) {
        return Math.round(num * 1000) / 1000;
    }
    System.round = round;
    function formatTimeSpan(ts) {
        return DateTime.formatTimeSpan(ts);
    }
    System.formatTimeSpan = formatTimeSpan;
    function formatDate(dt) {
        return DateTime.formatDate(dt);
    }
    System.formatDate = formatDate;
    function formatTime(dt, hideMs) {
        return DateTime.formatTime(dt, hideMs);
    }
    System.formatTime = formatTime;
    function GetTimeCount() {
        return DateTime.getTimeCount();
    }
    System.GetTimeCount = GetTimeCount;
    //config
    //  nothing needed
    //Dialog
    function ShowBlockUI(msg) {
        Dialog.showBlockUI(msg);
    }
    System.ShowBlockUI = ShowBlockUI;
    function HideBlockUI() {
        Dialog.hideBlockUI();
    }
    System.HideBlockUI = HideBlockUI;
    function Confirm(msg, callback) {
        Dialog.confirmDialog(msg, null, callback);
    }
    System.Confirm = Confirm;
    function ShowHTMLInDialog(html, options, parent) {
        Dialog.showHtmlInDialog(html, options, parent);
    }
    System.ShowHTMLInDialog = ShowHTMLInDialog;
    function ShowInDialog(url, options, parent) {
        Dialog.showInDialog(url, options);
    }
    System.ShowInDialog = ShowInDialog;
    function ShowVideoInFancyBox(url, options, parent) {
        Dialog.showVideoInDialog(url, Dialog.getFancyBoxDialogSettings());
    }
    System.ShowVideoInFancyBox = ShowVideoInFancyBox;
    function ShowHTMLInFancyBox(html, options, parent) {
        Dialog.showHtmlInDialog(html, Dialog.getFancyBoxDialogSettings());
    }
    System.ShowHTMLInFancyBox = ShowHTMLInFancyBox;
    function ShowInFancyBox(url, options, parent) {
        Dialog.showVideoInDialog(url, Dialog.getFancyBoxDialogSettings());
    }
    System.ShowInFancyBox = ShowInFancyBox;
    //JavaScript
    //  Nothing Needed
    //LinqToJs
    //  Above
    //Namespace
    //  Nothing Needed
    //plugins
    //  Nothing Needed
    //script
    //  See standard script.ts
    //SiteUrlInfo
    System.scripts = null;
    System.lastScript = null;
    System.scriptName = null;
    System.sitepath = SiteInfo.siteInfo.sitepath;
    System.sitepathBIndex = null;
    function VirtualURL() {
        return SiteInfo.virtualUrl;
    }
    System.VirtualURL = VirtualURL;
    function ApplicationURL() {
        return SiteInfo.siteInfo.sitepath;
    }
    System.ApplicationURL = ApplicationURL;
    function IsCleanHTML() {
        return SiteInfo.isCleanHtml();
    }
    System.IsCleanHTML = IsCleanHTML;
    function RefreshPage() {
        SiteInfo.refreshPage();
    }
    System.RefreshPage = RefreshPage;
    function getParameterByName(name) {
        return SiteInfo.getParameterByName(name);
    }
    System.getParameterByName = getParameterByName;
    function GetFullURL(url) {
        return SiteInfo.getFullURL(url);
    }
    System.GetFullURL = GetFullURL;
    function Redirect(url) {
        SiteInfo.redirect(url);
    }
    System.Redirect = Redirect;
    //Tasks
    //Can't do
    //Test
    //  Nothing Needed
    //TimingScripts
    function DebugWrite(message) {
        Debug.debugWrite(message);
    }
    System.DebugWrite = DebugWrite;
    function AddRemoveItems(Area, Name, AddNewCall, RemoveCall) {
        return System.AddRemoveSystem({
            Area: Area,
            Name: Name,
            AddNewCallback: AddNewCall,
            RemoveCallback: RemoveCall
        });
    }
    System.AddRemoveItems = AddRemoveItems;
    ;
    function AddRemoveSystem(options) {
        var dGrid = new Grid.DynamicGrid(options.Area, options.Name, options.PrePendButtons, new Grid.AddButtonSettings(options.AttachAddToTable, options.PrePendButtons, options.ElementToAttachAdd, options.BaseClass));
        dGrid.onInit.addListener(function () {
            if (options.InitilizedCallback) {
                options.InitilizedCallback();
            }
        });
        dGrid.onAdd.addListener(function (data) {
            if (options.AddNewCallback) {
                options.AddNewCallback(dGrid.table.find("tbody"), data);
            }
        });
        dGrid.onRemove.addListener(function (data) {
            if (options.RemoveCallback) {
                options.RemoveCallback(data);
            }
        });
        var obj = {
            HideAdd: function (msg) {
                dGrid.hideAdd(msg);
            },
            ShowAdd: function () {
                dGrid.showAdd();
            },
            GetRows: function () {
                return dGrid.getRows();
            },
            RemoveRow: function (row) {
                dGrid.removeRow(row);
            },
            CreateDisplay: function (text, cssclass) {
                cssclass = '' + (cssclass != undefined ? cssclass : "");
                Html.htmlBegin();
                Html.display(text, { class: cssclass });
                var item = Html.htmlEnd().clone().wrap('<p>').parent();
                return item.html();
            },
            CreateHidden: function (preName, index, itemName, value, cssclass) {
                cssclass = '' + (cssclass != undefined ? cssclass : "");
                Html.htmlBegin();
                Html.prefixBegin(preName);
                Html.indexBegin(index, false);
                Html.hidden(itemName, value, { class: cssclass });
                Html.indexEnd();
                Html.prefixEnd();
                var item = Html.htmlEnd().clone().wrap('<p>').parent();
                return item.html();
            },
            CreateDropDown: function (preName, index, itemName, values, cssclass) {
                cssclass = '' + (cssclass != undefined ? cssclass : "");
                Html.htmlBegin();
                Html.prefixBegin(preName);
                Html.indexBegin(index, false);
                Html.dropDownList(itemName, values, { class: cssclass });
                Html.indexEnd();
                Html.prefixEnd();
                var item = Html.htmlEnd().clone().wrap('<p>').parent();
                return item.html();
            },
            CreateCheckBox: function (preName, index, itemName, checked) {
                Html.htmlBegin();
                Html.prefixBegin(preName);
                Html.indexBegin(index, false);
                Html.checkBox(itemName, checked, { class: "" });
                Html.indexEnd();
                Html.prefixEnd();
                var item = Html.htmlEnd().clone().wrap('<p>').parent();
                return item.html();
            },
            CreateTextArea: function (preName, index, itemName, value, extra, classes) {
                classes = '' + (classes != undefined ? classes : "");
                extra = '' + (extra != undefined ? extra : "");
                Html.htmlBegin();
                Html.prefixBegin(preName);
                Html.indexBegin(index, false);
                var tb = Html.textArea(itemName, value, { class: classes });
                Html.indexEnd();
                Html.prefixEnd();
                var item = Html.htmlEnd().clone().wrap('<p>').parent();
                var html = item.html();
                var arr = html.split(" id=");
                html = arr[0] + " " + extra + " id=" + arr[1];
                return html;
            },
            CreateTextBox: function (preName, index, itemName, value, extra, classes) {
                classes = '' + (classes != undefined ? classes : "");
                extra = '' + (extra != undefined ? extra : "");
                Html.htmlBegin();
                Html.prefixBegin(preName);
                Html.indexBegin(index, false);
                var tb = Html.textBox(itemName, value, { class: classes });
                Html.indexEnd();
                Html.prefixEnd();
                var item = Html.htmlEnd().clone().wrap('<p>').parent();
                var html = item.html();
                var arr = html.split(" id=");
                html = arr[0] + " " + extra + " id=" + arr[1];
                return html;
            },
            CreateFile: function (preName, index, itemName, value, extra, classes) {
                classes = '' + (classes != undefined ? classes : "");
                extra = '' + (extra != undefined ? extra : "");
                Html.htmlBegin();
                Html.prefixBegin(preName);
                Html.indexBegin(index, false);
                var tb = Html.file(itemName, { class: classes });
                Html.indexEnd();
                Html.prefixEnd();
                var item = Html.htmlEnd().clone().wrap('<p>').parent();
                var html = item.html();
                var arr = html.split(" id=");
                html = arr[0] + " " + extra + " id=" + arr[1];
                return html;
            },
            CreateIndex: function (preName, index, classes) {
                classes = '' + (classes != undefined ? classes : "");
                Html.htmlBegin();
                Html.prefixBegin(preName);
                Html.indexBegin(index);
                Html.indexEnd();
                Html.prefixEnd();
                var item = Html.htmlEnd().clone().wrap('<p>').parent();
                return item.html();
            }
        };
        return obj;
    }
    System.AddRemoveSystem = AddRemoveSystem;
})(System || (System = {}));
//# sourceMappingURL=System-Migrate.js.map