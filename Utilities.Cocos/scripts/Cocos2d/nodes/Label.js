import { geometry } from "../libs/geometry";
import { Node } from "./Node";
import { Config } from "../Config";
import { Director } from "../Director";
var ccp = geometry.ccp;
export class Label extends Node {
    constructor(_string = "", _fontName = "Helvetica", _fontColor = "white", _fontSize = 16) {
        super();
        this._string = _string;
        this._fontName = _fontName;
        this._fontColor = _fontColor;
        this._fontSize = _fontSize;
        this._updateLabelContentSize();
    }
    get string() {
        return this.getValue("_string");
    }
    set string(value) {
        this.setValue("_string", null, value, true);
    }
    get fontName() {
        return this.getValue("_fontName");
    }
    set fontName(value) {
        this.setValue("_fontName", null, value, true);
    }
    get fontColor() {
        return this.getValue("_fontColor");
    }
    set fontColor(value) {
        this.setValue("_fontColor", null, value, true);
    }
    get fontSize() {
        return this.getValue("_fontSize");
    }
    set fontSize(value) {
        this.setValue("_fontSize", null, value, true);
    }
    get font() {
        return this.fontSize + 'px ' + this.fontName;
    }
    //draw(context: CanvasRenderingContext2D): void;
    //draw(context: CanvasRenderingContext2D, rect: geometry.Rect): void;
    draw(context, rect = null) {
        if (Config.FLIP_Y_AXIS) {
            context.save();
            // Flip Y axis
            context.scale(1, -1);
            context.translate(0, -this.fontSize);
        }
        context.fillStyle = this.fontColor;
        context.font = this.font;
        context.textBaseline = 'top';
        if (context.fillText) {
            context.fillText(this.string, 0, 0);
        }
        if (Config.FLIP_Y_AXIS) {
            context.restore();
        }
    }
    _updateLabelContentSize() {
        var ctx = Director.sharedDirector().context;
        var size = new geometry.Size(0, this.fontSize);
        var prevFont = ctx.font;
        ctx.font = this.font;
        if (ctx.measureText) {
            var txtSize = ctx.measureText(this.string);
            size.width = txtSize.width;
        }
        ctx.font = prevFont;
        this.contentSize = size;
    }
}
//# sourceMappingURL=Label.js.map