var __doPostBack = __doPostBack;
var WebForm_DoPostBackWithOptions = WebForm_DoPostBackWithOptions;
var Page_ClientValidate = Page_ClientValidate;
CKEDITOR.editorConfig = function (config) {
    // Define changes to default configuration here. For example:
    // config.language = 'fr';
    // config.uiColor = '#AADC6E';
    //config.skin = 'office2003';
    config.autoParagraph = false;
    config.filebrowserBrowseUrl = '/WMP/Editor/ckfinder_2.3.1/ckfinder.html';
    config.filebrowserImageBrowseUrl = '/WMP/Editor/ckfinder_2.3.1/ckfinder.html?type=Images';
    config.filebrowserFlashBrowseUrl = '/WMP/Editor/ckfinder_2.3.1/ckfinder.html?type=Flash';
    config.filebrowserUploadUrl = '/WMP/Editor/ckfinder_2.3.1/core/connector/aspx/connector.aspx?command=QuickUpload&type=Files';
    config.filebrowserImageUploadUrl = '/WMP/Editor/ckfinder_2.3.1/core/connector/aspx/connector.aspx?command=QuickUpload&type=Images';
    config.filebrowserFlashUploadUrl = '/WMP/Editor/ckfinder_2.3.1/core/connector/aspx/connector.aspx?command=QuickUpload&type=Flash';
    config.toolbar_ISOCDefault =
        [
            { name: 'clipboard', items: ['Undo', 'Redo', '-', 'Bold', 'Italic', 'Underline', 'RemoveFormat', 'Styles', 'Format', '-', 'SpellChecker', 'Preview', 'RemoveFormat', 'Maximize'] },
            { name: 'editing', items: ['Outdent', 'Indent', '-', 'NumberedList', 'BulletedList', '-', 'HorizontalRule', 'Image', 'Flash', 'Link', 'Unlink', 'Anchor', 'Table', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Source'] }
        ];
    CKEDITOR.config.toolbar_Basic = [
        ['Styles', 'Format'],
        ['Bold', 'Italic', 'Underline', 'StrikeThrough', '-', 'Undo', 'Redo', '-', 'Cut', 'Copy', 'Paste', '-', 'Outdent', 'Indent'],
        ['NumberedList', 'BulletedList', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
        ['Image', 'Table', '-', 'Link', 'Source']
    ];
    config.toolbar_ISOCDefault =
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
$(function () {
    function UIInit() {
        //$.initializeUiBlocking();
        var oldPostBack = __doPostBack;
        __doPostBack = function () {
            var __this = this;
            //if (Page_ClientValidate()) {
            Dialog.showBlockUI();
            //}
            //setTimeout(function () {
            oldPostBack.apply(__this, arguments);
            //    }, 1);
        };
        var oldWebForm_DoPostBackWithOptions = WebForm_DoPostBackWithOptions;
        WebForm_DoPostBackWithOptions = function () {
            var __this = this;
            if (Page_ClientValidate()) {
                Dialog.showBlockUI();
            }
            //setTimeout(function () {
            oldWebForm_DoPostBackWithOptions.apply(__this, arguments);
            //}, 1);
        };
        $(".disabled").each(function () {
            $(this).disable(true);
            //$(this).prop("disabled", true);
            //$(this).attr("disabled", "disabled");
        });
        $(".chosen_select").chosen({
            disable_search: true
        });
        $('input[placeholder], textarea[placeholder]').placeholder();
        $(".datepicker").datepicker();
        $("#ui-datepicker-div").addClass("promoteZ");
        $(".button, .Button, .button_destructive, .TopHeaderRight a, .TopHeaderLeft a").button();
        $(".DataValue input[type='checkbox'], .datagrid input[type='checkbox']").button({
            icons: {
                primary: "ui-icon-locked"
            }
        });
        $("form").submit(function () {
            Dialog.showBlockUI();
        });
        $(".actionLink").click(function () {
            Dialog.showBlockUI();
        });
        System.SetupOptGroups($("select"));
        $(".UseFancyBox .gallery-listing-imagelink").fancybox({});
        System.MakeComboBox($(".combobox"), false, false);
        System.MakeComboBox($(".combobox_autosize"), true, false);
        System.MakeComboBox($(".combobox_Emailform"), true, false, null, true);
        $(".MakeVideoArea").click(function () {
            $(this).addClass("NoAfter");
        });
        $(".MakeVideoArea").each(function (index, item) {
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
        $(".VideoAreaPopup, .VideoLink").each(function (index, item) {
            $(item).attr('id', 'player-' + index);
            var id = $(item).attr("id");
        });
        //EditorAreaCSS="/LessHandler.axd?Name=fck"
        //UseBROnCarriageReturn="true"
        $("textarea.CKEditor").each(function (i) {
            var it = $(this);
            CKEDITOR.replace(it.attr("id"), {
                //skin: 'office2003',
                toolbar: 'ISOCDefault',
                customConfig: '/JsHandler.axd?Name=config',
                contentsCss: '/LessHandler.axd?Name=fckcontent',
                height: it.innerHeight(),
                width: it.innerWidth()
            });
        });
        //FormatTags="p;h1;h2;h3;h4;h5;h6;pre;address;div"'
        $("textarea.CKEditorBanner").each(function (i) {
            var it = $(this);
            CKEDITOR.replace(it.attr("id"), {
                //skin: 'office2003',
                toolbar: 'ISOCDefault',
                customConfig: '/JsHandler.axd?Name=config_banner',
                contentsCss: '/LessHandler.axd?Name=fck_banner',
                height: it.innerHeight(),
                width: it.innerWidth()
            });
        });
        $("textarea.CKEditorSimple").each(function (i) {
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
        $(".button_confirm").click(function (evt, a) {
            var it = this;
            if (!a || !a.ButtonConfirm) {
                if (!evt.isDefaultPrevented()) {
                    evt.preventDefault();
                    Dialog.confirmDialog("Are you sure you want to do this? You can not undo this action.", Dialog.DialogTypeEnum.JQueryDialog, function (del) {
                        if (del) {
                            $(it).trigger("click", [{ ButtonConfirm: true }]);
                        }
                    });
                    return true;
                }
            }
        });
        $(".button_destructive, .btn_destructive").click(function (evt, a) {
            var it = this;
            if (!a || !a.ButtonConfirm) {
                if (!evt.isDefaultPrevented()) {
                    evt.preventDefault();
                    Dialog.confirmDialog("Really delete this item? You can not undo this action.", Dialog.DialogTypeEnum.JQueryDialog, function (del) {
                        if (del) {
                            $(it).trigger("click", [{ ButtonConfirm: true }]);
                        }
                    });
                    //return true;
                }
            }
        });
        $(".ajaxPostForm").onSubmitUseAjax(JqueryEx.createAjaxOptions(null, function (item, data) {
            location.reload(true);
        }));
        $(".postAction").onClickPostAsForm();
        $(".ajaxPostGrid").onClickAjaxPost(JqueryEx.createAjaxOptions(null, function (item, data) {
            //CloseDialog();
        }));
        $(".ajaxPost").onClickAjaxPost(JqueryEx.createAjaxOptions(null, function (item, data) {
            location.reload(true);
        }));
        $(".ajaxPostDestructive").onClickAjaxPost(JqueryEx.createAjaxOptions(function () {
            var del = confirm("Are you sure you want to do this? You can not undo this action.");
            if (del) {
                return false;
            }
            else {
                return true;
            }
        }, function (item, data) {
            location.reload(true);
        }));
        $(".MakeVideoArea").click(function () {
            $(this).addClass("NoAfter");
        });
        $(".MakeVideoArea").each(function (index, item) {
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
        $(".VideoAreaPopup, .VideoLink").each(function (index, item) {
            $(item).attr('id', 'player-' + index);
            var id = $(item).attr("id");
        });
        $(".VideoAreaPopup, .VideoLink").click(function (evt) {
            var item = this;
            if (evt != null) {
                evt.preventDefault();
            }
            var videoPath = $(item).attr("href");
            Dialog.showVideoInDialog(videoPath);
        });
        //autoBuffering: true,
        $(".UseJQueryDialog").click(function (evt) {
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
            Dialog.showInDialog(Area, Dialog.getJqueryUiDialogSettings(Width, Height, Title, null, CallOnClose));
        });
        $(".UseFancyBox").click(function (evt) {
            evt.preventDefault();
            var me = $(this);
            var width = parseInt($(me).attr("Width"));
            var height = parseInt($(me).attr("Height"));
            var noScroll = $(me).attr("noScroll") == "true";
            var resizable = $(me).attr("resizable") == "true";
            Dialog.showInDialog($(me).attr("href"), Dialog.getFancyBoxDialogSettings(width, height, $(me).attr("Title"), noScroll, resizable, $(me).attr("CallOnClose")));
        });
    }
    //setTimeout(function () {
    UIInit();
    //}, 10);
});
//# sourceMappingURL=script.js.map