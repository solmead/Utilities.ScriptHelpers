var JqueryEx;
(function (JqueryEx) {
    function createAjaxOptions(beforeCall, afterResponse) {
        return {
            beforeCall: beforeCall,
            afterResponse: afterResponse
        };
    }
    JqueryEx.createAjaxOptions = createAjaxOptions;
    function checkOptions(options) {
        var defaults = {
            beforeCall: null,
            afterResponse: null
        };
        var settings = $.extend({}, defaults, options);
        if (!settings.beforeCall) {
            settings.beforeCall = function (item) {
                return false;
            };
        }
        if (!settings.afterResponse) {
            settings.afterResponse = function (item, data) {
                return;
            };
        }
        return settings;
    }
    $.extend({
        replaceTag: function (currentElem, newTagObj, keepProps) {
            var $currentElem = $(currentElem);
            var i, $newTag = $(newTagObj).clone();
            if (keepProps) { //{{{
                //var newTag = $newTag[0];
                //newTag.className = currentElem.className;
                //$.extend(newTag.classList, currentElem.classList);
                $.each(currentElem.attributes, function (index, it) {
                    $newTag.attr(it.name, it.value);
                });
                //$.extend(newTag.attributes, currentElem.attributes);
            } //}}}
            $currentElem.wrapAll($newTag);
            $currentElem.contents().unwrap();
            // return node; (Error spotted by Frank van Luijn)
            return this; // Suggested by ColeLawrence
        }
    });
    $.fn.extend({
        replaceTag: function (newTagObj, keepProps) {
            // "return" suggested by ColeLawrence
            return this.each(function () {
                jQuery.replaceTag(this, newTagObj, keepProps);
            });
        }
    });
    jQuery.fn.extend({
        disable: function (state) {
            var items = this;
            return items.each(function () {
                var $this = $(this);
                if ($this.is('input, button, textarea, select'))
                    this.disabled = state;
                else
                    $this.toggleClass('disabled', state);
                $(this).prop("disabled", state);
            });
        }
    });
    jQuery.fn.submitUsingAjax = function (options) {
        var settings = checkOptions(options);
        var form = this;
        var clickedItem = this;
        if (settings.beforeCall(null, this)) {
            return;
        }
        var clickUrl = ApiLibrary.addFormatToUrl($(clickedItem).attr("action"));
        var formData = $(this).serialize();
        ApiLibrary.postCall(clickUrl, null, formData, function (data) {
            settings.afterResponse(clickedItem, data);
        });
    };
    jQuery.fn.onSubmitUseAjax = function (options) {
        var settings = checkOptions(options);
        var form = this;
        $(form).find("[type='submit']").click(function () {
            $("[type='submit']", $(this).parents("form")).removeAttr("clicked");
            $(this).attr("clicked", "true");
        });
        $(form).submit(function (evt) {
            evt.preventDefault();
            var clickedItem = $(this).find("[type=submit][clicked=true]");
            //var clickedItem = this;
            if (settings.beforeCall(clickedItem, this)) {
                return;
            }
            $(form).find("input[type='submit'],button[type='submit']").disable(true);
            var clickUrl = ApiLibrary.addFormatToUrl($(form).attr("action"));
            $(this).append("<input type='hidden' name='" + clickedItem.attr('name') + "' value='" + clickedItem.val() + "'/>");
            var formData = $(this).serialize();
            ApiLibrary.postCall(clickUrl, null, formData, function (data) {
                settings.afterResponse(clickedItem, data);
                $(form).find("input[type='submit'],button[type='submit']").disable(false);
            });
        });
    };
    jQuery.fn.onClickAjaxGet = function (options) {
        var settings = checkOptions(options);
        var item = this;
        $(item).click(function (evt) {
            if (!evt.isDefaultPrevented()) {
                evt.preventDefault();
                var clickedItem = this;
                if (settings.beforeCall(clickedItem, null)) {
                    return;
                }
                var clickUrl = ApiLibrary.addFormatToUrl($(clickedItem).attr("href"));
                ApiLibrary.getCall(clickUrl, null, function (data) {
                    settings.afterResponse(clickedItem, data);
                });
            }
        });
    };
    jQuery.fn.onClickAjaxPost = function (options) {
        var settings = checkOptions(options);
        var item = this;
        $(item).click(function (evt) {
            var _this = this;
            if (!evt.isDefaultPrevented()) {
                evt.preventDefault();
                var clickedItem = this;
                if (settings.beforeCall(clickedItem, this)) {
                    return;
                }
                var clickUrl = ApiLibrary.addFormatToUrl($(clickedItem).attr("href"));
                ApiLibrary.postCall(clickUrl, null, null, function (data) {
                    settings.afterResponse(_this, data);
                });
            }
        });
    };
    jQuery.fn.onClickPostAsForm = function (options) {
        var settings = checkOptions(options);
        var item = this;
        $(item).click(function (evt) {
            if (!evt.isDefaultPrevented()) {
                evt.preventDefault();
                var clickedItem = this;
                if (settings.beforeCall(clickedItem, this)) {
                    return;
                }
                var clickUrl = $(clickedItem).attr("href");
                //ApiLibrary.addFormatToUrl($(clickedItem).attr("href"));
                var doc = "<form action='" + clickUrl + "' method='post'></form>";
                var form = $(doc).appendTo(document.body);
                $(form).submit();
            }
        });
    };
})(JqueryEx || (JqueryEx = {}));
//# sourceMappingURL=JqueryEx.js.map