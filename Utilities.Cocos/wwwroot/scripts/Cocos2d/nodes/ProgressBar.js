import { Node } from "./Node";
import { geometry } from "../libs/geometry";
import { Sprite } from "./Sprite";
import { events } from "../libs/events";
import { util } from "../libs/util";
export class ProgressBar extends Node {
    constructor(emptyImage = null, fullImage = null) {
        super();
        this.emptyImage = emptyImage;
        this.fullImage = fullImage;
        this._elapsed = null;
        this._fullSprite = null;
        this._maxValue = null;
        this._value = null;
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
    get emptySprite() {
        return this.getValue("_emptySprite");
    }
    set emptySprite(value) {
        this.setValue("_emptySprite", null, value, true);
    }
    get fullSprite() {
        return this.getValue("_fullSprite");
    }
    set fullSprite(value) {
        this.setValue("_fullSprite", null, value, true);
    }
    get maxValue() {
        return this.getValue("_maxValue");
    }
    set maxValue(value) {
        this.setValue("_maxValue", null, value, true);
    }
    get value() {
        return this.getValue("_value");
    }
    set value(value) {
        this.setValue("_value", null, value, true);
    }
    updateImages() {
        var empty = this.emptySprite, full = this.fullSprite, value = this.value, size = this.contentSize, maxValue = this.maxValue, ratio = (value / maxValue);
        var diff = Math.round(size.width * ratio);
        if (diff === 0) {
            full.visible = false;
        }
        else {
            full.visible = true;
            full.rect = new geometry.Rect(0, 0, diff, size.height);
            full.contentSize = new geometry.Size(diff, size.height);
        }
        if ((size.width - diff) === 0) {
            empty.visible = false;
        }
        else {
            empty.visible = true;
            empty.rect = new geometry.Rect(diff, 0, size.width - diff, size.height);
            empty.position = new geometry.Point(diff, 0);
            empty.contentSize = new geometry.Size(size.width - diff, size.height);
        }
    }
}
//# sourceMappingURL=ProgressBar.js.map