import { geometry } from "../libs/geometry";
import { Node } from "./Node";
import { Config } from "../Config";
import { Director } from "../Director";



var ccp = geometry.ccp;



export class Label extends Node {

    get string(): string {
        return this.getValue("_string");
    }
    set string(value: string) {
        this.setValue("_string", null, value, true);
    }
    get fontName(): string {
        return this.getValue("_fontName");
    }
    set fontName(value: string) {
        this.setValue("_fontName", null, value, true);
    }
    get fontColor(): string {
        return this.getValue("_fontColor");
    }
    set fontColor(value: string) {
        this.setValue("_fontColor", null, value, true);
    }
    get fontSize(): number {
        return this.getValue("_fontSize");
    }
    set fontSize(value: number) {
        this.setValue("_fontSize", null, value, true);
    }

    get font(): string {
        return this.fontSize + 'px ' + this.fontName;
    }

    constructor(protected _string: string = "", protected _fontName: string = "Helvetica", protected _fontColor: string = "white", protected _fontSize: number = 16) {
        super();

        this._updateLabelContentSize();
    }
    //draw(context: CanvasRenderingContext2D): void;
    //draw(context: CanvasRenderingContext2D, rect: geometry.Rect): void;
    public draw(context: CanvasRenderingContext2D, rect: geometry.Rect=null): void {
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

    private _updateLabelContentSize(): void {
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