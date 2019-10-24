var __doPostBack = __doPostBack;
var WebForm_DoPostBackWithOptions = WebForm_DoPostBackWithOptions;
var Page_ClientValidate = Page_ClientValidate;

var posting = false;



namespace SysLibs {

    export var onUIInit = new Tasks.EventHandler();

    export var onInit = new Tasks.EventHandler();

    export var keepAlive: Tasks.RecurringTask = null;

    export function Init(area: JQuery) {

        onInit.trigger(area);

    }

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

        onUIInit.trigger();

        SysLibs.Init($("body"));

        keepAlive = new Tasks.RecurringTask(() => {
            ApiLibrary.getCall(DateTime.serverTime.timeApiUrl);
        }, 50000);

        keepAlive.start();
    }


    UIInit();
}





