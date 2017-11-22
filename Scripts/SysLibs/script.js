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
var posting = false;
System.Init = function (area) {
    $(area).find(".disabled").each(function () {
        $(this).disable(true);
    });
    $(area).find(".chosen_select").chosen({
        disable_search: true
    });
    $(area).find('input[placeholder], textarea[placeholder]').placeholder();
    $(area).find(".datepicker").datepicker();
    $(area).find("#ui-datepicker-div").addClass("promoteZ");
    $(area).find(".button, .Button").button();
    $(area).find(".DataValue input[type='checkbox'], .datagrid input[type='checkbox']").button({
        icons: {
            primary: "ui-icon-locked"
        }
    });
    $(area).find("form").submit(function (evt) {
        if (!posting && !evt.isDefaultPrevented()) {
            Dialog.showBlockUI();
        }
    });
    $(area).find(".actionLink").click(function () {
        Dialog.showBlockUI();
    });
    $(area).find(".downloadLink").click(function () {
        setTimeout(function () {
            Dialog.hideBlockUI();
        }, 10000);
    });
    $(area).find(".UseFancyBox .gallery-listing-imagelink").fancybox({});
    $(area).find(".emptyLinkAnchor").click(function (evt) {
        evt.preventDefault();
    });
    $(area).find(".MakeVideoArea").click(function () {
        $(this).addClass("NoAfter");
    });
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
    $(area).find(".VideoAreaPopup, .VideoLink").each(function (index, item) {
        $(item).attr('id', 'player-' + index);
        var id = $(item).attr("id");
    });
    //EditorAreaCSS="/LessHandler.axd?Name=fck"
    //UseBROnCarriageReturn="true"
    $(area).find("textarea.CKEditor").each(function (i) {
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
    $(area).find("textarea.CKEditorBanner").each(function (i) {
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
    $(area).find(".button_confirm").click(function (evt, a) {
        var it = this;
        var bConfirm = $(it).attr("buttonconfirm");
        if (!bConfirm) {
            if (!evt.isDefaultPrevented()) {
                evt.preventDefault();
                Dialog.confirmDialog("Are you sure you want to do this? You can not undo this action.", Dialog.DialogTypeEnum.JQueryDialog, function (del) {
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
                Dialog.confirmDialog("Really delete this item? You can not undo this action.", Dialog.DialogTypeEnum.JQueryDialog, function (del) {
                    if (del) {
                        $(it).attr("buttonconfirm", "True");
                        $(it).simulate("click", [{ ButtonConfirm: true }]);
                    }
                });
                //return true;
            }
        }
    });
    $(area).find(".ajaxPostForm").onSubmitUseAjax(JqueryEx.createAjaxOptions(null, function (item, data) {
        location.reload(true);
    }));
    $(area).find(".postAction").onClickPostAsForm();
    $(area).find(".ajaxPostGrid").onClickAjaxPost(JqueryEx.createAjaxOptions(null, function (item, data) {
        //CloseDialog();
    }));
    $(area).find(".ajaxPost").onClickAjaxPost(JqueryEx.createAjaxOptions(null, function (item, data) {
        location.reload(true);
    }));
    $(area).find(".ajaxPostDestructive").onClickAjaxPost(JqueryEx.createAjaxOptions(function () {
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
    $(area).find(".MakeVideoArea").click(function () {
        $(this).addClass("NoAfter");
    });
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
    $(area).find(".VideoAreaPopup, .VideoLink").each(function (index, item) {
        $(item).attr('id', 'player-' + index);
        var id = $(item).attr("id");
    });
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
    $(area).find(".UseFancyBox").click(function (evt) {
        evt.preventDefault();
        var me = $(this);
        var width = parseInt($(me).attr("Width"));
        var height = parseInt($(me).attr("Height"));
        var noScroll = $(me).attr("noScroll") == "true";
        var resizable = $(me).attr("resizable") == "true";
        Dialog.showInDialog($(me).attr("href"), Dialog.getFancyBoxDialogSettings(width, height, $(me).attr("Title"), noScroll, resizable, $(me).attr("CallOnClose")));
    });
};
$(function () {
    function UIInit() {
        //$.initializeUiBlocking();
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
            if (Page_ClientValidate()) {
                Dialog.showBlockUI();
            }
            //setTimeout(function () {
            oldWebForm_DoPostBackWithOptions.apply(__this, arguments);
            //}, 1);
            posting = false;
        };
        System.Init($("body"));
    }
    //setTimeout(function () {
    UIInit();
    //}, 10);
});
//# sourceMappingURL=script.js.map