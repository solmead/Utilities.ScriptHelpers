var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Html;
(function (Html) {
    var SelectListItem = (function () {
        function SelectListItem(text, value, isSelected) {
            this.text = text;
            this.value = value;
            this.isSelected = isSelected;
        }
        return SelectListItem;
    }());
    Html.SelectListItem = SelectListItem;
    var TemplateInfo = (function () {
        function TemplateInfo(htmlFieldPrefix) {
            if (htmlFieldPrefix === void 0) { htmlFieldPrefix = ""; }
            var _this = this;
            this.htmlFieldPrefix = htmlFieldPrefix;
            this.element = $("<template></template>");
            this.begin = function () {
                Html.currentTemplate = _this;
            };
            this.end = function () {
                Html.currentTemplate = _this.previousTemplate;
            };
            this.currentPrefix = function () {
                var prefix = _this.htmlFieldPrefix;
                if (_this.previousTemplate && _this.previousTemplate != _this) {
                    prefix = _this.previousTemplate.currentPrefix() + prefix;
                }
                return prefix;
            };
            this.previousTemplate = Html.currentTemplate;
        }
        return TemplateInfo;
    }());
    Html.TemplateInfo = TemplateInfo;
    var HtmlElement = (function (_super) {
        __extends(HtmlElement, _super);
        function HtmlElement(elem, attributes) {
            var _this = _super.call(this) || this;
            _this.elem = elem;
            _this.attributes = attributes;
            _this.element = $(_this.elem);
            _this.element.attr(attributes);
            _this.previousTemplate.element.append(_this.element);
            _this.begin();
            return _this;
        }
        return HtmlElement;
    }(TemplateInfo));
    Html.HtmlElement = HtmlElement;
    var HtmlFieldPrefixScope = (function (_super) {
        __extends(HtmlFieldPrefixScope, _super);
        function HtmlFieldPrefixScope(htmlFieldPrefix) {
            var _this = _super.call(this, htmlFieldPrefix) || this;
            _this.htmlFieldPrefix = htmlFieldPrefix;
            _this.element = _this.previousTemplate.element;
            _this.begin();
            return _this;
        }
        return HtmlFieldPrefixScope;
    }(TemplateInfo));
    Html.HtmlFieldPrefixScope = HtmlFieldPrefixScope;
    Html.currentTemplate = new TemplateInfo();
    function htmlBegin(element) {
        Html.currentTemplate = new TemplateInfo();
        Html.currentTemplate.element = element || Html.currentTemplate.element;
        return Html.currentTemplate;
    }
    Html.htmlBegin = htmlBegin;
    function htmlEnd(element) {
        var item = itemEnd();
        if (element) {
            element.append(item.element.children());
        }
        return item.element.children();
    }
    Html.htmlEnd = htmlEnd;
    function elementBegin(element, attributes) {
        return new HtmlElement(element, attributes);
    }
    Html.elementBegin = elementBegin;
    function elementEnd() {
        return itemEnd();
    }
    Html.elementEnd = elementEnd;
    function divBegin(attributes) {
        return new HtmlElement("div", attributes);
    }
    Html.divBegin = divBegin;
    function divEnd() {
        return itemEnd();
    }
    Html.divEnd = divEnd;
    function tableBegin(attributes) {
        return new HtmlElement("table", attributes);
    }
    Html.tableBegin = tableBegin;
    function tableEnd() {
        return itemEnd();
    }
    Html.tableEnd = tableEnd;
    function rowBegin(attributes) {
        return new HtmlElement("tr", attributes);
    }
    Html.rowBegin = rowBegin;
    function rowEnd() {
        return itemEnd();
    }
    Html.rowEnd = rowEnd;
    function cellBegin(attributes) {
        return new HtmlElement("td", attributes);
    }
    Html.cellBegin = cellBegin;
    function cellEnd() {
        return itemEnd();
    }
    Html.cellEnd = cellEnd;
    function prefixBegin(htmlFieldPrefix) {
        return new HtmlFieldPrefixScope(htmlFieldPrefix);
    }
    Html.prefixBegin = prefixBegin;
    function prefixEnd() {
        return itemEnd();
    }
    Html.prefixEnd = prefixEnd;
    function indexBegin(index, addHidden) {
        if (addHidden === void 0) { addHidden = true; }
        if (addHidden) {
            hidden("Index", "" + index);
        }
        var prefix = "[" + index + "]";
        return new HtmlFieldPrefixScope(prefix);
    }
    Html.indexBegin = indexBegin;
    function indexEnd() {
        return itemEnd();
    }
    Html.indexEnd = indexEnd;
    function itemEnd() {
        var fps = Html.currentTemplate;
        fps.end();
        return fps;
    }
    Html.itemEnd = itemEnd;
    function label(text, forOrAttributes, attributes) {
        var elem = $("<label/>");
        if (forOrAttributes != null) {
            if (typeof forOrAttributes === "string") {
                elem.attr("for", forOrAttributes);
            }
            else {
                attributes = attributes || forOrAttributes;
            }
        }
        if (attributes) {
            elem.attr(attributes);
        }
        elem.html(text);
        Html.currentTemplate.element.append(elem);
        return elem;
    }
    Html.label = label;
    function display(text, attributes) {
        var elem = $("<span/>");
        if (attributes) {
            elem.attr(attributes);
        }
        elem.html(text);
        Html.currentTemplate.element.append(elem);
        return elem;
    }
    Html.display = display;
    function raw(text) {
        Html.currentTemplate.element.append(text);
    }
    Html.raw = raw;
    function hidden(name, value, attributes) {
        var preName = Html.currentTemplate.currentPrefix();
        if (preName != "") {
            preName = preName + ".";
        }
        var fieldName = preName + name;
        var idName = fieldName.replaceAll(".", "_").replaceAll("[", "_").replaceAll("]", "_");
        var elem = $("<input type='hidden'/>");
        if (attributes) {
            elem.attr(attributes);
        }
        elem.attr("id", idName);
        elem.attr("name", fieldName);
        elem.attr("tag", name);
        elem.val(value);
        Html.currentTemplate.element.append(elem);
        return elem;
    }
    Html.hidden = hidden;
    function dropDownList(name, items, attributes) {
        var preName = Html.currentTemplate.currentPrefix();
        if (preName != "") {
            preName = preName + ".";
        }
        var fieldName = preName + name;
        var idName = fieldName.replaceAll(".", "_").replaceAll("[", "_").replaceAll("]", "_");
        var elem = $("<select/>");
        if (attributes) {
            elem.attr(attributes);
        }
        elem.attr("id", idName);
        elem.attr("name", fieldName);
        elem.attr("tag", name);
        elem.addClass("drop-down");
        $.each(items, function (i, item) {
            elem.append('<option ' + ((item.isSelected) ? 'selected="selected" ' : '') + 'value="' + item.value + '">' + item.text + '</option>');
        });
        Html.currentTemplate.element.append(elem);
        return elem;
    }
    Html.dropDownList = dropDownList;
    function listBox(name, items, attributes) {
        var preName = Html.currentTemplate.currentPrefix();
        if (preName != "") {
            preName = preName + ".";
        }
        var fieldName = preName + name;
        var idName = fieldName.replaceAll(".", "_").replaceAll("[", "_").replaceAll("]", "_");
        var elem = $("<select/>");
        if (attributes) {
            elem.attr(attributes);
        }
        elem.attr("id", idName);
        elem.attr("name", fieldName);
        elem.attr("tag", name);
        elem.attr("multiple", "multiple");
        elem.addClass("drop-down");
        $.each(items, function (i, item) {
            elem.append('<option ' + ((item.isSelected) ? 'selected="selected" ' : '') + 'value="' + item.value + '">' + item.text + '</option>');
        });
        Html.currentTemplate.element.append(elem);
        return elem;
    }
    Html.listBox = listBox;
    function checkBox(name, isChecked, attributes) {
        var preName = Html.currentTemplate.currentPrefix();
        if (preName != "") {
            preName = preName + ".";
        }
        var fieldName = preName + name;
        var idName = fieldName.replaceAll(".", "_").replaceAll("[", "_").replaceAll("]", "_");
        var elem = $("<input type='checkbox'/>");
        if (attributes) {
            elem.attr(attributes);
        }
        elem.attr("id", idName);
        elem.attr("name", fieldName);
        elem.attr("value", "true");
        elem.attr("tag", name);
        elem.addClass("check-box single-line");
        if (isChecked) {
            elem.attr("checked", "checked");
        }
        Html.currentTemplate.element.append(elem);
        hidden(name, "false");
        return elem;
    }
    Html.checkBox = checkBox;
    function radioButton(name, value, isChecked, attributes) {
        var preName = Html.currentTemplate.currentPrefix();
        if (preName != "") {
            preName = preName + ".";
        }
        var fieldName = preName + name;
        var idName = fieldName.replaceAll(".", "_").replaceAll("[", "_").replaceAll("]", "_");
        var elem = $("<input type='radio'/>");
        if (attributes) {
            elem.attr(attributes);
        }
        elem.attr("id", idName);
        elem.attr("name", fieldName);
        elem.attr("value", value);
        elem.attr("tag", name);
        elem.addClass("radio-button single-line");
        if (isChecked) {
            elem.attr("checked", "checked");
        }
        Html.currentTemplate.element.append(elem);
        hidden(name, "false");
        return elem;
    }
    Html.radioButton = radioButton;
    function textArea(name, value, attributes) {
        var preName = Html.currentTemplate.currentPrefix();
        if (preName != "") {
            preName = preName + ".";
        }
        var fieldName = preName + name;
        var idName = fieldName.replaceAll(".", "_").replaceAll("[", "_").replaceAll("]", "_");
        var elem = $("<textarea/>");
        if (attributes) {
            elem.attr(attributes);
        }
        elem.attr("id", idName);
        elem.attr("name", fieldName);
        elem.attr("tag", name);
        elem.addClass("text-box multi-line");
        elem.val(value);
        Html.currentTemplate.element.append(elem);
        return elem;
    }
    Html.textArea = textArea;
    function textBox(name, value, attributes) {
        var preName = Html.currentTemplate.currentPrefix();
        if (preName != "") {
            preName = preName + ".";
        }
        var fieldName = preName + name;
        var idName = fieldName.replaceAll(".", "_").replaceAll("[", "_").replaceAll("]", "_");
        var elem = $("<input type='text'/>");
        if (attributes) {
            elem.attr(attributes);
        }
        elem.attr("id", idName);
        elem.attr("name", fieldName);
        elem.attr("tag", name);
        elem.addClass("text-box single-line");
        elem.val(value);
        Html.currentTemplate.element.append(elem);
        return elem;
    }
    Html.textBox = textBox;
    function file(name, attributes) {
        var preName = Html.currentTemplate.currentPrefix();
        if (preName != "") {
            preName = preName + ".";
        }
        var fieldName = preName + name;
        var idName = fieldName.replaceAll(".", "_").replaceAll("[", "_").replaceAll("]", "_");
        var elem = $("<input type='file'/>");
        if (attributes) {
            elem.attr(attributes);
        }
        elem.attr("id", idName);
        elem.attr("name", fieldName);
        elem.attr("tag", name);
        Html.currentTemplate.element.append(elem);
        return elem;
    }
    Html.file = file;
})(Html || (Html = {}));
//# sourceMappingURL=HtmlHelpers.js.map