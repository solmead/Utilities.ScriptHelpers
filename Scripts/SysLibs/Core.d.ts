declare var __doPostBack: any;
declare var WebForm_DoPostBackWithOptions: any;
declare var Page_ClientValidate: any;
declare var posting: boolean;
declare var cssDir: any;
declare var scriptsDir: any;
declare var editorDir: any;
declare var editorJSConfig: any;
declare var editorJSBannerConfig: any;
declare var editorCSSConfig: any;
declare var editorCSSBannerConfig: any;
declare var CKEDITOR_BASEPATH: string;
declare namespace SysLibs {
    var onInit: Tasks.EventHandler;
    var keepAlive: Tasks.RecurringTask;
    function Init(area: JQuery): void;
}
