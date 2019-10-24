var __doPostBack = __doPostBack;
var WebForm_DoPostBackWithOptions = WebForm_DoPostBackWithOptions;
var Page_ClientValidate = Page_ClientValidate;
var posting = false;
var SysLibs;
(function (SysLibs) {
    SysLibs.onUIInit = new Tasks.EventHandler();
    SysLibs.onInit = new Tasks.EventHandler();
    SysLibs.keepAlive = null;
    function Init(area) {
        SysLibs.onInit.trigger(area);
    }
    SysLibs.Init = Init;
    async function UIInit() {
        await Tasks.whenReady();
        await Tasks.delay(10);
        var oldPostBack = __doPostBack;
        __doPostBack = function () {
            var __this = this;
            posting = true;
            //if (Page_ClientValidate()) {
            Dialog.showBlockUI();
            //}
            //setTimeout(function () {
            oldPostBack.apply(__this, arguments);
            //    }, 1);
            posting = false;
        };
        var oldWebForm_DoPostBackWithOptions = WebForm_DoPostBackWithOptions;
        WebForm_DoPostBackWithOptions = function () {
            var __this = this;
            posting = true;
            if (Page_ClientValidate && Page_ClientValidate()) {
                Dialog.showBlockUI();
            }
            //setTimeout(function () {
            oldWebForm_DoPostBackWithOptions.apply(__this, arguments);
            //}, 1);
            posting = false;
        };
        SysLibs.onUIInit.trigger();
        SysLibs.Init($("body"));
        SysLibs.keepAlive = new Tasks.RecurringTask(() => {
            ApiLibrary.getCall(DateTime.serverTime.timeApiUrl);
        }, 50000);
        SysLibs.keepAlive.start();
    }
    UIInit();
})(SysLibs || (SysLibs = {}));
//# sourceMappingURL=Core.js.map