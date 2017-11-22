interface JQueryStatic {
    replaceTag(item: JQuery | string, newTagObj: JQuery | string, keepProps: boolean): any;
    replaceTag(newTagObj: JQuery | string, keepProps: boolean): any;
}
interface JQuery {
    submitUsingAjax(options?: JqueryEx.IAjaxCallOptions): void;
    onSubmitUseAjax(options?: JqueryEx.IAjaxCallOptions): void;
    onClickAjaxGet(options?: JqueryEx.IAjaxCallOptions): void;
    onClickAjaxPost(options?: JqueryEx.IAjaxCallOptions): void;
    onClickPostAsForm(options?: JqueryEx.IAjaxCallOptions): void;
    disable(state: boolean): any;
    simulate(event?: string, options?: any): void;
    replaceTag(item: JQuery | string, newTagObj: JQuery | string, keepProps: boolean): any;
    replaceTag(newTagObj: JQuery | string, keepProps: boolean): any;
}
declare module JqueryEx {
    interface IAjaxCallOptions {
        beforeCall: (item: JQuery) => boolean;
        afterResponse?: (item: JQuery, data: any) => any;
    }
    function createAjaxOptions(beforeCall: (item: JQuery) => boolean, afterResponse?: (item: JQuery, data: any) => any): IAjaxCallOptions;
}
