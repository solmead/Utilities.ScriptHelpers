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
declare function ResetPage(): void;
declare function CloseDialog(): void;
declare module System {
    function Init(area: JQuery): void;
    function AddAntiForgeryToken(data: any): any;
    function ApiCall(type: any, url: any, sendData: any, successCallback: any, errorCallback: any, beforeSend: any): void;
    function getCall(url: any, seqNum: any, successCallback: any, errorCallback: any): void;
    function putCall(url: any, seqNum: any, sendData: any, successCallback: any, errorCallback: any): void;
    function postCall(url: any, seqNum: any, sendData: any, successCallback: any, errorCallback: any): void;
    function AutoSaveForm(form: any, beforeSave: any, afterResponse: any): void;
    function AjaxPostForm(form: any, afterResponse: any): void;
    function AddAjaxFormSubmit(form: any, beforeSubmit: any, afterResponse: any): void;
    function AddAjaxClickGet(item: any, beforeSubmit: any, afterResponse: any): void;
    function AjaxPost(item: any, afterResponse: any): void;
    function AddClickPostForm(item: any, beforeSubmit: any): void;
    function AddAjaxClickPost(item: any, beforeSubmit: any, afterResponse: any): void;
    function dateFromISO8601(isostr: any): Date;
    function IsIEInCompatMode(): boolean;
    function isElementInDOM(elt: any): boolean;
    function Equals(x: any, y: any): void;
    var PageTitleNotification: {};
    function Notify(subject: any, message: any): void;
    function round(num: any): number;
    function formatTimeSpan(ts: any): string;
    function formatDate(dt: any): string;
    function formatTime(dt: any, hideMs: any): string;
    function GetTimeCount(): number;
    function Confirm(msg: any, callback: any): void;
    function ShowHTMLInDialog(html: any, options: any, parent: any): void;
    function ShowInDialog(url: any, options: any, parent: any): void;
    function ShowVideoInFancyBox(url: any, options: any, parent: any): void;
    function ShowHTMLInFancyBox(html: any, options: any, parent: any): void;
    function ShowInFancyBox(url: any, options: any, parent: any): void;
    var scripts: any;
    var lastScript: any;
    var scriptName: any;
    var sitepath: string;
    var sitepathBIndex: any;
    function VirtualURL(): typeof SiteInfo.virtualUrl;
    function ApplicationURL(): string;
    function IsCleanHTML(): boolean;
    function RefreshPage(): void;
    function getParameterByName(name: any): string;
    function GetFullURL(url: any): string;
    function Redirect(url: any): void;
    function DebugWrite(message: any): void;
    interface AddRemoveSystemSettings {
        Area: JQuery;
        Name: string;
        AddNewCallback: (body: JQuery, count: number) => void;
        RemoveCallback: (row: JQuery) => void;
        InitilizedCallback: () => void;
        PrePendButtons: boolean;
        AttachAddToTable: boolean;
        ElementToAttachAdd: JQuery;
        BaseClass: string;
        AttachAddPrePend: boolean;
    }
    function AddRemoveItems(Area: JQuery, Name: string, AddNewCall: (row: JQuery, count: number) => void, RemoveCall: (row: JQuery) => void): {
        HideAdd: (msg: any) => void;
        ShowAdd: () => void;
        GetRows: () => JQuery;
        RemoveRow: (row: any) => void;
        CreateDisplay: (text: any, cssclass: any) => string;
        CreateHidden: (preName: any, index: any, itemName: any, value: any, cssclass: any) => string;
        CreateDropDown: (preName: string, index: number, itemName: string, values: Html.SelectListItem[], cssclass: string) => string;
        CreateCheckBox: (preName: any, index: any, itemName: any, checked: any) => string;
        CreateTextArea: (preName: any, index: any, itemName: any, value: any, extra: any, classes: any) => string;
        CreateTextBox: (preName: any, index: any, itemName: any, value: any, extra: any, classes: any) => string;
        CreateFile: (preName: any, index: any, itemName: any, value: any, extra: any, classes: any) => string;
        CreateIndex: (preName: any, index: any, classes: any) => string;
    };
    function AddRemoveSystem(options: AddRemoveSystemSettings): {
        HideAdd: (msg: any) => void;
        ShowAdd: () => void;
        GetRows: () => JQuery;
        RemoveRow: (row: any) => void;
        CreateDisplay: (text: any, cssclass: any) => string;
        CreateHidden: (preName: any, index: any, itemName: any, value: any, cssclass: any) => string;
        CreateDropDown: (preName: string, index: number, itemName: string, values: Html.SelectListItem[], cssclass: string) => string;
        CreateCheckBox: (preName: any, index: any, itemName: any, checked: any) => string;
        CreateTextArea: (preName: any, index: any, itemName: any, value: any, extra: any, classes: any) => string;
        CreateTextBox: (preName: any, index: any, itemName: any, value: any, extra: any, classes: any) => string;
        CreateFile: (preName: any, index: any, itemName: any, value: any, extra: any, classes: any) => string;
        CreateIndex: (preName: any, index: any, classes: any) => string;
    };
}
