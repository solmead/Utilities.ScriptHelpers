var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __doPostBack = __doPostBack;
var WebForm_DoPostBackWithOptions = WebForm_DoPostBackWithOptions;
var Page_ClientValidate = Page_ClientValidate;
var posting = false;
var SysLibs;
(function (SysLibs) {
    SysLibs.onInit = new Tasks.EventHandler();
    function Init(area) {
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
        if ($().fancybox) {
            $(area).find(".UseFancyBox .gallery-listing-imagelink").fancybox({});
        }
        $(area).find(".emptyLinkAnchor").click(function (evt) {
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
        }
        $(area).find(".ajaxPostForm").onSubmitUseAjax(JqueryEx.createAjaxOptions(null, function (item, data) {
            location.reload(true);
        }));
        $(area).find(".postAction").onClickPostAsForm();
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
        }
        if ($.fancybox) {
            $(area).find(".UseFancyBox").click(function (evt) {
                evt.preventDefault();
                var me = $(this);
                var width = parseInt($(me).attr("Width"));
                var height = parseInt($(me).attr("Height"));
                var noScroll = $(me).attr("noScroll") == "true";
                var resizable = $(me).attr("resizable") == "true";
                Dialog.showInDialog($(me).attr("href"), Dialog.getFancyBoxDialogSettings(width, height, $(me).attr("Title"), noScroll, resizable, $(me).attr("CallOnClose")));
            });
        }
        SysLibs.onInit.trigger(area);
    }
    SysLibs.Init = Init;
    function UIInit() {
        return __awaiter(this, void 0, void 0, function () {
            var oldPostBack, oldWebForm_DoPostBackWithOptions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Tasks.whenReady()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, Tasks.delay(10)];
                    case 2:
                        _a.sent();
                        oldPostBack = __doPostBack;
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
                        oldWebForm_DoPostBackWithOptions = WebForm_DoPostBackWithOptions;
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
                        if ((typeof CKEDITOR !== "undefined")) {
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
                                //(<any>config).toolbar_ISOCDefault =
                                //    [
                                //        { name: 'clipboard', items: ['Undo', 'Redo', '-', 'Bold', 'Italic', 'Underline', 'RemoveFormat', 'Styles', 'Format', '-', 'SpellChecker', 'Preview', 'RemoveFormat', 'Maximize'] },
                                //        { name: 'editing', items: ['Outdent', 'Indent', '-', 'NumberedList', 'BulletedList', '-', 'HorizontalRule', 'Image', 'Flash', 'Link', 'Unlink', 'Anchor', 'Table', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Source'] }
                                //    ];
                                CKEDITOR.config.toolbar_Basic = [
                                    ['Styles', 'Format'],
                                    ['Bold', 'Italic', 'Underline', 'StrikeThrough', '-', 'Undo', 'Redo', '-', 'Cut', 'Copy', 'Paste', '-', 'Outdent', 'Indent'],
                                    ['NumberedList', 'BulletedList', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
                                    ['Image', 'Table', '-', 'Link', 'Source']
                                ];
                                config.toolbar_SysLibsDefault =
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
                        }
                        ;
                        SysLibs.Init($("body"));
                        return [2 /*return*/];
                }
            });
        });
    }
    UIInit();
})(SysLibs || (SysLibs = {}));
//# sourceMappingURL=Core.js.map