var __doPostBack = __doPostBack;
var WebForm_DoPostBackWithOptions = WebForm_DoPostBackWithOptions;
var Page_ClientValidate = Page_ClientValidate;

var posting = false;

namespace SysLibs {
    
    export var onInit = new Tasks.EventHandler();

    export function Init(area: JQuery) {


        $(area).find(".disabled").each(function () {
            $(this).disable(true);
        });

        //$(area).find(".chosen_select").chosen({
        //    disable_search: true
        //});
        if ($().placeholder) {
            $(area).find('input[placeholder], textarea[placeholder]').placeholder();
        }
        if ($().datepicker) {
            $(area).find(".datepicker").datepicker();
        }
        $(area).find("#ui-datepicker-div").addClass("promoteZ");

        //$(area).find(".button, .Button").button();

        if ($().button) {
            $(area).find(".DataValue input[type='checkbox'], .datagrid input[type='checkbox']").button({
                icons: {
                    primary: "ui-icon-locked"
                }
            });
        }



        $(area).find("form").submit((evt) => {
            if (!posting && !evt.isDefaultPrevented()) {
                Dialog.showBlockUI();
            }
        });
        $(area).find(".actionLink").click(() => {
            Dialog.showBlockUI();
        });
        $(area).find(".downloadLink").click(() => {
            setTimeout(() => {
                Dialog.hideBlockUI();
            }, 10000);
        });



        if ($().fancybox) {
            $(area).find(".UseFancyBox .gallery-listing-imagelink").fancybox({});
        }

        $(area).find(".emptyLinkAnchor").click(evt => {
            evt.preventDefault();
        });

        $(area).find(".MakeVideoArea").click(function () {
            $(this).addClass("NoAfter");
        });

        if ((typeof $f !== "undefined")) {
            $(area).find(".MakeVideoArea").each(function (index, item) {
                $(item).attr('id', 'player-' + index);
                var id = $(item).attr("id");

                var videoPath = $(item).attr("href");
                $f(id, "/WMP/flash/flowplayer-3.2.12.swf", {
                    clip: {
                        url: videoPath,
                        autoPlay: true,
                        autoBuffering: true
                    }
                });
                //}, 100);
            });
        }
        $(area).find(".VideoAreaPopup, .VideoLink").each(function (index, item) {
            $(item).attr('id', 'player-' + index);
            var id = $(item).attr("id");
        });


        if ((typeof CKEDITOR !== "undefined")) {
            //EditorAreaCSS="/LessHandler.axd?Name=fck"
            //UseBROnCarriageReturn="true"
            $(area).find("textarea.CKEditor").each(function (i) {
                var it = $(this);
                CKEDITOR.replace(it.attr("id"), {
                    //skin: 'office2003',
                    toolbar: 'SysLibsDefault',
                    customConfig: '/JsHandler.axd?Name=config',
                    contentsCss: '/LessHandler.axd?Name=fckcontent',
                    height: it.innerHeight(),
                    width: it.innerWidth()
                });
            });
            //FormatTags="p;h1;h2;h3;h4;h5;h6;pre;address;div"'
            $(area).find("textarea.CKEditorBanner").each(function (i) {
                var it = $(this);
                CKEDITOR.replace(it.attr("id"), {
                    //skin: 'office2003',
                    toolbar: 'SysLibsDefault',
                    customConfig: '/JsHandler.axd?Name=config_banner',
                    contentsCss: '/LessHandler.axd?Name=fck_banner',
                    height: it.innerHeight(),
                    width: it.innerWidth()
                });
            });
            $(area).find("textarea.CKEditorSimple").each(function (i) {
                var it = $(this);
                CKEDITOR.replace(it.attr("id"), {
                    //skin: 'office2003',
                    toolbar: 'Basic',
                    customConfig: '/JsHandler.axd?Name=config',
                    contentsCss: '/LessHandler.axd?Name=fckcontent',
                    height: it.innerHeight(),
                    width: it.innerWidth()
                });
            });
        }


        if ($().dialog) {
            $(area).find(".button_confirm").click(function (evt, a) {
                var it = this;
                var bConfirm = $(it).attr("buttonconfirm");
                if (!bConfirm) {
                    if (!evt.isDefaultPrevented()) {
                        evt.preventDefault();
                        Dialog.confirmDialog("Are you sure you want to do this? You can not undo this action.", Dialog.DialogTypeEnum.JQueryDialog,
                            (del: boolean) => {
                                if (del) {
                                    $(it).attr("buttonconfirm", "True");
                                    $(it).simulate("click", [{ ButtonConfirm: true }]);
                                }
                            });
                        return true;
                    }
                }
            });

            $(area).find(".button_destructive, .btn_destructive").click(function (evt, a) {
                var it = this;
                var bConfirm = $(it).attr("buttonconfirm");
                if (!bConfirm) {
                    if (!evt.isDefaultPrevented()) {
                        evt.preventDefault();
                        Dialog.confirmDialog("Really delete this item? You can not undo this action.",
                            Dialog.DialogTypeEnum.JQueryDialog,
                            (del: boolean) => {
                                if (del) {
                                    $(it).attr("buttonconfirm", "True");

                                    $(it).simulate("click", [{ ButtonConfirm: true }]);
                                }
                            });
                        //return true;
                    }
                }
            });
        }


        $(area).find(".ajaxPostForm").onSubmitUseAjax(JqueryEx.createAjaxOptions(null, (item: JQuery, data: any) => {
            location.reload(true);
        }));
        $(area).find(".postAction").onClickPostAsForm();




        $(area).find(".ajaxPost").onClickAjaxPost(JqueryEx.createAjaxOptions(null, (item: JQuery, data: any) => {
            location.reload(true);
        }));


        $(area).find(".ajaxPostDestructive").onClickAjaxPost(JqueryEx.createAjaxOptions(() => {
            var del = confirm("Are you sure you want to do this? You can not undo this action.");
            if (del) {
                return false;
            } else {
                return true;
            }
        }, (item: JQuery, data: any) => {
            location.reload(true);
        }));



        $(area).find(".MakeVideoArea").click(function () {
            $(this).addClass("NoAfter");
        });

        if ((typeof $f !== "undefined")) {
            $(area).find(".MakeVideoArea").each(function (index, item) {
                $(item).attr('id', 'player-' + index);
                var id = $(item).attr("id");

                var videoPath = $(item).attr("href");
                $f(id, SiteInfo.siteInfo.applicationUrl + "flash/flowplayer-3.2.12.swf", {
                    clip: {
                        url: videoPath,
                        autoPlay: true,
                        autoBuffering: true
                    }
                });
                //}, 100);
            });
        }
        $(area).find(".VideoAreaPopup, .VideoLink").each(function (index, item) {
            $(item).attr('id', 'player-' + index);
            var id = $(item).attr("id");
        });


        if ($().dialog) {
            $(area).find(".VideoAreaPopup, .VideoLink").click(function (evt) {
                var item = this;
                if (evt != null) {
                    evt.preventDefault();
                }
                var videoPath = $(item).attr("href");

                Dialog.showVideoInDialog(videoPath);

            });
            //autoBuffering: true,
            $(area).find(".UseJQueryDialog").click(function (evt) {

                var maxWidth = $(top).width();
                if (maxWidth <= 768) {
                    return true;
                }


                evt.preventDefault();
                var me = $(this);

                var Area = $(this).attr("href");
                var Title = $(this).attr("title");
                if (!Title) {
                    Title = $(this).attr("data-title");
                }
                var Width = parseInt($(this).attr("Width"));
                if (!Width) {
                    Width = parseInt($(this).attr("data-Width"));
                }
                var Height = parseInt($(this).attr("Height"));
                if (!Height) {
                    Height = parseInt($(this).attr("data-Height"));
                }
                var CallOnClose = $(this).attr("CallOnClose");
                if (!CallOnClose) {
                    CallOnClose = $(this).attr("data-CallOnClose");
                }

                Dialog.showInDialog(Area, Title,
                    Dialog.getJqueryUiDialogSettings(Width, Height, Title, <JQueryUI.DialogOptions>null, CallOnClose));


            });
        }



        if ($.fancybox) {
            $(area).find(".UseFancyBox").click(function (evt) {

                var maxWidth = $(top).width();
                if (maxWidth <= 768) {
                    return true;
                }

                evt.preventDefault();
                var me = $(this);

                var Title = $(this).attr("title");
                if (!Title) {
                    Title = $(this).attr("data-title");
                }
                var CallOnClose = $(this).attr("CallOnClose");
                if (!CallOnClose) {
                    CallOnClose = $(this).attr("data-CallOnClose");
                }

                var Width = parseInt($(this).attr("Width"));
                if (!Width) {
                    Width = parseInt($(this).attr("data-Width"));
                }
                var Height = parseInt($(this).attr("Height"));
                if (!Height) {
                    Height = parseInt($(this).attr("data-Height"));
                }
                var noScroll: boolean = $(me).attr("noScroll") == "true";
                var resizable: boolean = $(me).attr("resizable") == "true";


                Dialog.showInDialog($(me).attr("href"), Title,
                    Dialog.getFancyBoxDialogSettings(Width, Height, Title, noScroll, resizable, CallOnClose));
            });
        }

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


        if ((typeof CKEDITOR !== "undefined")) {
            CKEDITOR.editorConfig = (config: CKEDITOR.config) => {
                // Define changes to default configuration here. For example:
                // config.language = 'fr';
                // config.uiColor = '#AADC6E';
                //config.skin = 'office2003';
                (<any>config).autoParagraph = false;
                config.filebrowserBrowseUrl = '/WMP/Editor/ckfinder_2.3.1/ckfinder.html';
                config.filebrowserImageBrowseUrl = '/WMP/Editor/ckfinder_2.3.1/ckfinder.html?type=Images';
                config.filebrowserFlashBrowseUrl = '/WMP/Editor/ckfinder_2.3.1/ckfinder.html?type=Flash';
                config.filebrowserUploadUrl = '/WMP/Editor/ckfinder_2.3.1/core/connector/aspx/connector.aspx?command=QuickUpload&type=Files';
                config.filebrowserImageUploadUrl = '/WMP/Editor/ckfinder_2.3.1/core/connector/aspx/connector.aspx?command=QuickUpload&type=Images';
                config.filebrowserFlashUploadUrl = '/WMP/Editor/ckfinder_2.3.1/core/connector/aspx/connector.aspx?command=QuickUpload&type=Flash';
                //(<any>config).toolbar_ISOCDefault =
                //    [
                //        { name: 'clipboard', items: ['Undo', 'Redo', '-', 'Bold', 'Italic', 'Underline', 'RemoveFormat', 'Styles', 'Format', '-', 'SpellChecker', 'Preview', 'RemoveFormat', 'Maximize'] },
                //        { name: 'editing', items: ['Outdent', 'Indent', '-', 'NumberedList', 'BulletedList', '-', 'HorizontalRule', 'Image', 'Flash', 'Link', 'Unlink', 'Anchor', 'Table', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Source'] }
                //    ];

                (<any>CKEDITOR.config).toolbar_Basic = [
                    ['Styles', 'Format'],
                    ['Bold', 'Italic', 'Underline', 'StrikeThrough', '-', 'Undo', 'Redo', '-', 'Cut', 'Copy', 'Paste', '-', 'Outdent', 'Indent'],
                    ['NumberedList', 'BulletedList', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
                    ['Image', 'Table', '-', 'Link', 'Source']
                ];

                (<any>config).toolbar_SysLibsDefault =
                    [
                        { name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo'] },
                        { name: 'editing', items: ['SpellChecker', 'Scayt'] },
                        { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat'] },
                        { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] },
                        { name: 'links', items: ['Link', 'Unlink', 'Anchor'] },
                        { name: 'insert', items: ['Image', 'Flash', 'Iframe', 'Table', 'HorizontalRule', 'SpecialChar'] },
                        { name: 'styles', items: ['Styles', 'Format'] },
                        { name: 'rest', items: ['Preview', 'Source', 'Maximize'] }
                    ];

                config.stylesSet = 'my_custom_styles';
            };
        };



        SysLibs.Init($("body"));
    }


    UIInit();
}





