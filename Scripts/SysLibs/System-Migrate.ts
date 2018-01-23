
interface Window {
    ResetPage: () => void;
}

interface Array<T> {
    Where: (func: (obj: T) => boolean) => Array<T>;
    Any: (func: (obj: T) => boolean) => boolean;
    ForEach: (func: (obj: T) => void) => void;
    Sum: (func: (obj: T) => number) => number;
    Select: (func: (obj: T) => any) => Array<any>;
    OrderBy: (func: (obj: T) => number, isDescending: boolean) => Array<T>;
    Skip: (count: number) => Array<T>;
    Take: (count: number) => Array<T>;
    First: () => T;
    Last: () => T;
    FindItem: (func: (obj: T) => boolean) => T;
    Find: (func: (obj: T) => boolean) => T;
    Contains: (item: T, func: (obj: T, obj2: T) => boolean) => T;
    Union: (arr: Array<T>) => Array<T>;
    Intersect: (arr: Array<T>, func: (obj: T, obj2: T) => boolean) => Array<T>;
    Difference: (arr: Array<T>, func: (obj: T, obj2: T) => boolean) => Array<T>;
}

function ResetPage() {
    setTimeout(function () { window.location.reload(); }, 100);
}

function CloseDialog() {
    top.ResetPage();
}

Array.prototype.Where = function (where) {
    var arr = <Array<any>>this;
    return arr.asQueryable().where(where).toArray();
};
Array.prototype.Any = function (where) {
    var arr = <Array<any>>this;
    return arr.asQueryable().any(where);
};
Array.prototype.ForEach = function (func) {
    var arr = <Array<any>>this;
    arr.asQueryable().forEach(func);
};
Array.prototype.Sum = function (func) {
    var arr = <Array<any>>this;
    return arr.asQueryable().sum(func);
};
Array.prototype.Select = function (func) {
    var arr = <Array<any>>this;
    return arr.asQueryable().select(func).toArray();
};
Array.prototype.OrderBy = function (orderBy, isDescending) {
    var arr = <Array<any>>this;
    return arr.asQueryable().orderBy(orderBy, isDescending).toArray();
};
Array.prototype.Skip = function (count) {
    var arr = <Array<any>>this;
    return arr.asQueryable().skip(count).toArray();
};
Array.prototype.Take = function (count) {
    var arr = <Array<any>>this;
    return arr.asQueryable().take(count).toArray();
};
Array.prototype.First = function () {
    var arr = <Array<any>>this;
    return arr.asQueryable().first();
};
Array.prototype.Last = function () {
    var arr = <Array<any>>this;
    return arr.asQueryable().last();
};
Array.prototype.FindItem = function (select) {
    var arr = <Array<any>>this;
    return arr.asQueryable().findItem(select);
};
Array.prototype.Find = function (select) {
    var arr = <Array<any>>this;
    return arr.asQueryable().findItem(select);
};
Array.prototype.Contains = function (item, compareFunction) {
    var arr = <Array<any>>this;
    return arr.asQueryable().contains(item, compareFunction);
};
Array.prototype.Union = function (arr) {
    var arr2 = <Array<any>>this;
    return arr2.asQueryable().union(arr).toArray();
};
Array.prototype.Intersect = function (arr, compareFunction) {
    var arr2 = <Array<any>>this;
    return arr2.asQueryable().intersect(arr, compareFunction).toArray();
};
Array.prototype.Difference = function (arr, compareFunction) {
    var arr2 = <Array<any>>this;
    return arr2.asQueryable().difference(arr, compareFunction).toArray();
};



module System {
    export function Init(area: JQuery) {
        SysLibs.Init(area);
    }

    //APILibrary
    export function AddAntiForgeryToken(data: any) {
        return ApiLibrary.addAntiForgeryToken(data);
    }
    export function ApiCall(type, url, sendData?: any, successCallback?: any, errorCallback?: any, beforeSend?:any) {
        ApiLibrary.apiCall(type, url, sendData, successCallback, errorCallback, beforeSend);
    }
    export function getCall(url, seqNum?: any, successCallback?: any, errorCallback?: any) {
        ApiLibrary.getCall(url, seqNum, successCallback, errorCallback);
    }
    export function putCall(url, seqNum?: any, sendData?: any, successCallback?: any, errorCallback?: any) {
        ApiLibrary.putCall(url, seqNum, sendData, successCallback, errorCallback);
    }
    export function postCall(url, seqNum?: any, sendData?: any, successCallback?: any, errorCallback?: any) {
        ApiLibrary.postCall(url, seqNum, sendData, successCallback, errorCallback);
    }
    export function AutoSaveForm(form, beforeSave?: any, afterResponse?: any) {
        //not implemented
    }
    export function AjaxPostForm(form, afterResponse?: any) {
        $(form).submitUsingAjax(JqueryEx.createAjaxOptions(null, afterResponse));
    }
    export function AddAjaxFormSubmit(form, beforeSubmit?: any, afterResponse?: any) {
        $(form).onSubmitUseAjax(JqueryEx.createAjaxOptions(beforeSubmit, afterResponse))
    }
    export function AddAjaxClickGet(item, beforeSubmit?: any, afterResponse?: any) {
        $(item).onClickAjaxGet(JqueryEx.createAjaxOptions(beforeSubmit, afterResponse))
    }
    export function AjaxPost(item, afterResponse?: any) {
        var clickUrl = $(item).attr("href");
        postCall(clickUrl, null, null, afterResponse, null);
    }
    export function AddClickPostForm(item, beforeSubmit?: any) {
        $(item).onClickPostAsForm(JqueryEx.createAjaxOptions(beforeSubmit, null));
    }
    export function AddAjaxClickPost(item, beforeSubmit?: any, afterResponse?: any) {
        $(item).onClickAjaxPost(JqueryEx.createAjaxOptions(beforeSubmit, afterResponse));
    }
    //BaseLibrary
    export function dateFromISO8601(isostr) {
        return DateTime.dateFromIso8601(isostr);
    }
    export function IsIEInCompatMode() {
        return (navigator.appVersion.indexOf("MSIE 7.") != -1) && ((navigator.userAgent.indexOf("Trident/5") > -1) || (navigator.userAgent.indexOf("Trident/6") > -1) || (navigator.userAgent.indexOf("Trident/7") > -1) || (navigator.userAgent.indexOf("Trident/8") > -1));
    }
    export function isElementInDOM(elt) {
        return $(elt).length > 0;
    }
    export function Equals(x, y) {
        //not implemented
    }
    export var PageTitleNotification = {

    }
    export function Notify(subject, message) {
        //not implemented
    }
    export function round(num) {
        return Math.round(num * 1000) / 1000;
    }
    export function formatTimeSpan(ts) {
        return DateTime.formatTimeSpan(ts);
    }
    export function formatDate(dt) {
        return DateTime.formatDate(dt);
    }
    export function formatTime(dt, hideMs) {
        return DateTime.formatTime(dt, hideMs);
    }
    export function GetTimeCount() {
        return DateTime.getTimeCount();
    }
    //config
        //  nothing needed
    //Dialog
    export function ShowBlockUI(msg?: string) {
        Dialog.showBlockUI(msg);
    }
    export function HideBlockUI() {
        Dialog.hideBlockUI();
    }
    export function Confirm(msg, callback?:any) {
        Dialog.confirmDialog(msg, null, callback);
    }
    export function ShowHTMLInDialog(html, options?: any, parent?: any) {
        Dialog.showHtmlInDialog(html, options, parent);
    }
    export function ShowInDialog(url, options?: any, parent?: any) {
        Dialog.showInDialog(url, options);
    }
    export function ShowVideoInFancyBox(url, options?: any, parent?: any) {
        Dialog.showVideoInDialog(url, Dialog.getFancyBoxDialogSettings());
    }
    export function ShowHTMLInFancyBox(html, options?: any, parent?: any) {
        Dialog.showHtmlInDialog(html, Dialog.getFancyBoxDialogSettings());
    }
    export function ShowInFancyBox(url, options?: any, parent?: any) {
        Dialog.showVideoInDialog(url, Dialog.getFancyBoxDialogSettings());
    }
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
    export var scripts = null;
    export var lastScript = null;
    export var scriptName = null;
    export var sitepath = SiteInfo.siteInfo.sitepath;
    export var sitepathBIndex = null;
    export function VirtualURL() {
        return SiteInfo.virtualUrl;
    }
    export function ApplicationURL() {
        return SiteInfo.siteInfo.sitepath
    }
    export function IsCleanHTML() {
        return SiteInfo.isCleanHtml();
    }
    export function RefreshPage() {
        SiteInfo.refreshPage();
    }
    export function getParameterByName(name) {
        return SiteInfo.getParameterByName(name);
    }
    export function GetFullURL(url) {
        return SiteInfo.getFullURL(url);
    }
    export function Redirect(url) {
        SiteInfo.redirect(url);
    }
    //Tasks
        //Can't do

    //Test
        //  Nothing Needed

    //TimingScripts
    export function DebugWrite(message) {
        Debug.debugWrite(message);
    }



    export interface AddRemoveSystemSettings {
        Area: JQuery;
        Name: string;
        AddNewCallback: (body: JQuery, count:number)=>void;
        RemoveCallback: (row:JQuery)=>void;
        InitilizedCallback: () => void;
        PrePendButtons: boolean;
        AttachAddToTable: boolean;
        ElementToAttachAdd: JQuery;
        BaseClass: string;
        AttachAddPrePend: boolean;
    }
    export function AddRemoveItems(Area: JQuery, Name: string, AddNewCall: (row: JQuery, count: number) => void, RemoveCall: (row: JQuery) => void) {
        return System.AddRemoveSystem(<AddRemoveSystemSettings>{
            Area: Area,
            Name: Name,
            AddNewCallback: AddNewCall,
            RemoveCallback: RemoveCall
        });
    };
    export function AddRemoveSystem(options: AddRemoveSystemSettings) {
        var dGrid = new Grid.DynamicGrid(options.Area,
            options.Name,
            options.PrePendButtons,
            new Grid.AddButtonSettings(options.AttachAddToTable,
                options.PrePendButtons,
                options.ElementToAttachAdd,
                options.BaseClass));

        dGrid.onInit.addListener(() => {
            if (options.InitilizedCallback) {
                options.InitilizedCallback();
            }
        });

        dGrid.onAdd.addListener((data) => {
            if (options.AddNewCallback) {
                options.AddNewCallback(dGrid.table.find("tbody"), <number>data);
            }
        });

        dGrid.onRemove.addListener((data) => {
            if (options.RemoveCallback) {
                options.RemoveCallback(data);
            }
        });


        var obj = {
            HideAdd: function(msg) {
                dGrid.hideAdd(msg);
            },
            ShowAdd: function() {
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
            CreateDropDown: function (preName: string, index: number, itemName: string, values: Array<Html.SelectListItem>, cssclass: string) {
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
        }

        return obj;
    }



}
