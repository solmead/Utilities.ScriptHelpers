import { Node } from "./Node";
import { geometry } from "../libs/geometry";
import { Sprite } from "./Sprite";
import { events } from "../libs/events";
import { util } from "../libs/util";




export class ProgressBar extends Node {
    protected _elapsed: Sprite = null;
    get emptySprite(): Sprite {
        return this.getValue("_emptySprite");
    }
    set emptySprite(value: Sprite) {
        this.setValue("_emptySprite", null, value, true);
    }
    protected _fullSprite: Sprite = null;
    get fullSprite(): Sprite {
        return this.getValue("_fullSprite");
    }
    set fullSprite(value: Sprite) {
        this.setValue("_fullSprite", null, value, true);
    }
    protected _maxValue: number = null;
    get maxValue(): number {
        return this.getValue("_maxValue");
    }
    set maxValue(value: number) {
        this.setValue("_maxValue", null, value, true);
    }
    protected _value: number = null;
    get value(): number {
        return this.getValue("_value");
    }
    set value(value: number) {
        this.setValue("_value", null, value, true);
    }



    constructor(private emptyImage: string = null, private fullImage: string = null) {
        super();
        var size = new geometry.Size(272, 32);
        this.contentSize = size;
        var s;
        if (emptyImage) {
            s = Sprite.CreateFromFile(emptyImage, new geometry.Rect(0, 0, size.width, size.height));
            s.anchorPoint = new geometry.Point(0, 0);
            this.emptySprite = s;
            this.addChild(s);
        }
        if (fullImage) {
            s = Sprite.CreateFromFile(fullImage, new geometry.Rect(0, 0, 0, size.height));
            s.anchorPoint = new geometry.Point(0, 0);
            this.fullSprite = s;
            this.addChild(s);
        }

        events.addListener(this, 'maxvalue_changed', util.callback(this, 'updateImages'));
        events.addListener(this, 'value_changed', util.callback(this, 'updateImages'));

        this.updateImages();

    }

    public updateImages(): void {
        var empty = this.emptySprite,
            full = this.fullSprite,
            value = this.value,
            size = this.contentSize,
            maxValue = this.maxValue,
            ratio = (value / maxValue);

        var diff = Math.round(size.width * ratio);
        if (diff === 0) {
            full.visible = false;
        } else {
            full.visible = true;
            full.rect = new geometry.Rect(0, 0, diff, size.height);
            full.contentSize = new geometry.Size(diff, size.height);
        }

        if ((size.width - diff) === 0) {
            empty.visible = false;
        } else {
            empty.visible = true;
            empty.rect = new geometry.Rect(diff, 0, size.width - diff, size.height);
            empty.position = new geometry.Point(diff, 0);
            empty.contentSize = new geometry.Size(size.width - diff, size.height);
        }
    }
}