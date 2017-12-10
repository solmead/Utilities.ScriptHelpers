

module Html {
    export class SelectListItem {
        constructor(public text: string, public value: string, public isSelected: boolean) {
            
        }
    }

    export class TemplateInfo {
        protected previousTemplate: TemplateInfo;
        public element: JQuery = $("<template></template>");

        constructor(public htmlFieldPrefix: string = "") {
            this.previousTemplate = currentTemplate;
        }
        public begin = () => {
            currentTemplate = this;
        }
        public end = () => {
            currentTemplate = this.previousTemplate;
        }

        public currentPrefix = (): string => {
            var prefix: string = this.htmlFieldPrefix;
            if (this.previousTemplate && this.previousTemplate != this) {
                prefix = this.previousTemplate.currentPrefix() + prefix;
            }
            return prefix;
        }

    }
    export class HtmlElement extends TemplateInfo {

        constructor(private elem: string | JQuery, private attributes?:any) {
            super();
            this.element = $(this.elem);
            this.element.attr(attributes);
            this.previousTemplate.element.append(this.element);
            this.begin();

        }
    }

    export class HtmlFieldPrefixScope extends TemplateInfo {

        constructor(public htmlFieldPrefix: string) {
            super(htmlFieldPrefix);
            this.element = this.previousTemplate.element;
            this.begin();
        }
        
    }
    
    export var currentTemplate: TemplateInfo = new TemplateInfo();


    export function htmlBegin(element?: JQuery): TemplateInfo {
        currentTemplate = new TemplateInfo();
        currentTemplate.element = element || currentTemplate.element;
        return currentTemplate;
    }
    export function htmlEnd(element?: JQuery):JQuery {
        var item = itemEnd();
        if (element) {
            element.append(item.element.children());
        }
        return item.element.children();
    }

    export function elementBegin(element: string, attributes?: any): HtmlElement {
        return new HtmlElement(element, attributes);
    }
    export function elementEnd(): TemplateInfo {
        return itemEnd();
    }
    export function divBegin(attributes?: any): HtmlElement {
        return new HtmlElement("div", attributes);
    }
    export function divEnd(): TemplateInfo {
        return itemEnd();
    }
    export function tableBegin(attributes?: any): HtmlElement {
        return new HtmlElement("table", attributes);
    }
    export function tableEnd(): TemplateInfo {
        return itemEnd();
    }
    export function rowBegin(attributes?: any): HtmlElement {
        return new HtmlElement("tr", attributes);
    }
    export function rowEnd(): TemplateInfo {
        return itemEnd();
    }
    export function cellBegin(attributes?: any): HtmlElement {
        return new HtmlElement("td", attributes);
    }
    export function cellEnd(): TemplateInfo {
        return itemEnd();
    }
    export function prefixBegin(htmlFieldPrefix: string): HtmlFieldPrefixScope {
        return new HtmlFieldPrefixScope(htmlFieldPrefix);
    }
    export function prefixEnd(): TemplateInfo {
        return itemEnd();
    }
    export function indexBegin(index: number, addHidden: boolean = true): HtmlFieldPrefixScope {
        if (addHidden) {
            hidden("Index", "" + index);
        }
        var prefix = "[" + index + "]";
        return new HtmlFieldPrefixScope(prefix);
    }
    export function indexEnd(): TemplateInfo {
        return itemEnd();
    }
    export function itemEnd():TemplateInfo {
        var fps = currentTemplate;
        fps.end();
        return fps;
    }


    export function label(text: string, forElement: string, attributes: object): JQuery;
    export function label(text: string, forOrAttributes: string | object): JQuery;
    export function label(text: string): JQuery;
    export function label(text: string, forOrAttributes?: string | object, attributes?: object): JQuery   {
        
        var elem = $("<label/>");
        if (forOrAttributes != null) {
            if (typeof forOrAttributes === "string") {
                elem.attr("for", forOrAttributes);
            } else {
                attributes = attributes || forOrAttributes;
            }
            
        }

        if (attributes) {
            elem.attr(attributes);
        }
        elem.html(text);
        currentTemplate.element.append(elem);
        return elem;
    }

    export function display(text: string, attributes: object): JQuery {
        var elem = $("<span/>");
        if (attributes) {
            elem.attr(attributes);
        }
        elem.html(text);
        currentTemplate.element.append(elem);
        return elem;
    }

    export function raw(text: string): void {
        currentTemplate.element.append(text);
    }

    export function hidden(name: string, value: string, attributes: object): JQuery;
    export function hidden(name: string, value: string): JQuery;
    export function hidden(name: string): JQuery;
    export function hidden(name: string, value?: string, attributes?: object): JQuery {
        var preName = currentTemplate.currentPrefix();
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
        currentTemplate.element.append(elem);
        return elem;
    }
    
    export function dropDownList(name: string, items: Array<SelectListItem>, attributes: object): JQuery;
    export function dropDownList(name: string, items: Array<SelectListItem>):JQuery;
    export function dropDownList(name: string, items: Array<SelectListItem>, attributes?: object): JQuery
    {
        var preName = currentTemplate.currentPrefix();
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
        $.each(items, (i, item)=> {
            elem.append('<option ' + ((item.isSelected) ? 'selected="selected" ' : '') + 'value="' + item.value + '">' + item.text + '</option>');
        });
        
        currentTemplate.element.append(elem);
        return elem;
    }
    export function listBox(name: string, items: Array<SelectListItem>, attributes: object): JQuery;
    export function listBox(name: string, items: Array<SelectListItem>): JQuery;
    export function listBox(name: string, items: Array<SelectListItem>, attributes?: object): JQuery {
        var preName = currentTemplate.currentPrefix();
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
        $.each(items, (i, item) => {
            elem.append('<option ' + ((item.isSelected) ? 'selected="selected" ' : '') + 'value="' + item.value + '">' + item.text + '</option>');
        });

        currentTemplate.element.append(elem);
        return elem;
    }


    export function checkBox(name: string, isChecked: boolean, attributes: object): JQuery;
    export function checkBox(name: string, isChecked: boolean): JQuery;
    export function checkBox(name: string): JQuery;
    export function checkBox(name: string, isChecked?: boolean, attributes?: object): JQuery {
        var preName = currentTemplate.currentPrefix();
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
        currentTemplate.element.append(elem);
        hidden(name, "false");

        return elem;
    }

    export function radioButton(name: string, value:string, isChecked: boolean, attributes: object): JQuery;
    export function radioButton(name: string, value: string, isChecked: boolean): JQuery;
    export function radioButton(name: string, value: string): JQuery;
    export function radioButton(name: string, value: string, isChecked?: boolean, attributes?: object): JQuery {
        var preName = currentTemplate.currentPrefix();
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
        currentTemplate.element.append(elem);
        hidden(name, "false");

        return elem;
    }


    export function textArea(name: string, value: string, attributes: object): JQuery;
    export function textArea(name: string, value: string): JQuery;
    export function textArea(name: string): JQuery;
    export function textArea(name: string, value?: string, attributes?: object): JQuery {
        var preName = currentTemplate.currentPrefix();
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
        currentTemplate.element.append(elem);
        return elem;
    }


    export function textBox(name: string, value: string, attributes: object): JQuery;
    export function textBox(name: string, value: string): JQuery;
    export function textBox(name: string): JQuery;
    export function textBox(name: string, value?: string, attributes?: object): JQuery {
        var preName = currentTemplate.currentPrefix();
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
        currentTemplate.element.append(elem);
        return elem;
    }
    

    export function file(name: string, attributes: object): JQuery;
    export function file(name: string): JQuery;
    export function file(name: string, attributes?: object): JQuery {
        var preName = currentTemplate.currentPrefix();
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
        currentTemplate.element.append(elem);
        return elem;
    }


}