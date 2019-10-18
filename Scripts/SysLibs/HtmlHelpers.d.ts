declare module Html {
    class SelectListItem {
        text: string;
        value: string;
        isSelected: boolean;
        constructor(text: string, value: string, isSelected: boolean);
    }
    class TemplateInfo {
        htmlFieldPrefix: string;
        protected previousTemplate: TemplateInfo;
        element: JQuery;
        constructor(htmlFieldPrefix?: string);
        begin: () => void;
        end: () => void;
        currentPrefix: () => string;
    }
    class HtmlElement extends TemplateInfo {
        private elem;
        private attributes?;
        constructor(elem: string | JQuery, attributes?: any);
    }
    class HtmlFieldPrefixScope extends TemplateInfo {
        htmlFieldPrefix: string;
        constructor(htmlFieldPrefix: string);
    }
    var currentTemplate: TemplateInfo;
    function htmlBegin(element?: JQuery): TemplateInfo;
    function htmlEnd(element?: JQuery): JQuery;
    function elementBegin(element: string, attributes?: any): HtmlElement;
    function elementEnd(): TemplateInfo;
    function divBegin(attributes?: any): HtmlElement;
    function divEnd(): TemplateInfo;
    function tableBegin(attributes?: any): HtmlElement;
    function tableEnd(): TemplateInfo;
    function rowBegin(attributes?: any): HtmlElement;
    function rowEnd(): TemplateInfo;
    function cellBegin(attributes?: any): HtmlElement;
    function cellEnd(): TemplateInfo;
    function prefixBegin(htmlFieldPrefix: string): HtmlFieldPrefixScope;
    function prefixEnd(): TemplateInfo;
    function indexBegin(index: number, addHidden?: boolean): HtmlFieldPrefixScope;
    function indexEnd(): TemplateInfo;
    function itemEnd(): TemplateInfo;
    function label(text: string, forElement: string, attributes: object): JQuery;
    function label(text: string, forOrAttributes: string | object): JQuery;
    function label(text: string): JQuery;
    function display(text: string, attributes: object): JQuery;
    function raw(text: string): void;
    function hidden(name: string, value: string, attributes: object): JQuery;
    function hidden(name: string, value: string): JQuery;
    function hidden(name: string): JQuery;
    function dropDownList(name: string, items: Array<SelectListItem>, attributes: object): JQuery;
    function dropDownList(name: string, items: Array<SelectListItem>): JQuery;
    function listBox(name: string, items: Array<SelectListItem>, attributes: object): JQuery;
    function listBox(name: string, items: Array<SelectListItem>): JQuery;
    function checkBox(name: string, isChecked: boolean, attributes: object): JQuery;
    function checkBox(name: string, isChecked: boolean): JQuery;
    function checkBox(name: string): JQuery;
    function radioButton(name: string, value: string, isChecked: boolean, attributes: object): JQuery;
    function radioButton(name: string, value: string, isChecked: boolean): JQuery;
    function radioButton(name: string, value: string): JQuery;
    function textArea(name: string, value: string, attributes: object): JQuery;
    function textArea(name: string, value: string): JQuery;
    function textArea(name: string): JQuery;
    function textBox(name: string, value: string, attributes: object): JQuery;
    function textBox(name: string, value: string): JQuery;
    function textBox(name: string): JQuery;
    function numberBox(name: string, value: string, attributes: object): JQuery;
    function numberBox(name: string, value: string): JQuery;
    function numberBox(name: string): JQuery;
    function file(name: string, attributes: object): JQuery;
    function file(name: string): JQuery;
}
