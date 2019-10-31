import { geometry } from "./libs/geometry";
import { BObject } from "./libs/bobject";
import { Texture2D } from "./Texture2D";
import { util } from "./libs/util";




var ccp = geometry.ccp;

export class SpriteFrame extends BObject {

    get texture(): Texture2D {
        return this.getValue("_texture");
    }
    set texture(value: Texture2D) {
        this.setValue("_texture", null, value, true);
    }
    get rect(): geometry.Rect {
        return this.getValue("_rect");
    }
    set rect(value: geometry.Rect) {
        this.setValue("_rect", null, value, true);
    }
    get rotated(): boolean {
        return this.getValue("_rotated");
    }
    set rotated(value: boolean) {
        this.setValue("_rotated", null, value, true);
    }
    get offset(): geometry.Point {
        return this.getValue("_offset");
    }
    set offset(value: geometry.Point) {
        this.setValue("_offset", null, value, true);
    }
    get originalSize(): geometry.Size {
        return this.getValue("_originalSize");
    }
    set originalSize(value: geometry.Size) {
        this.setValue("_originalSize", null, value, true);
    }


    constructor(protected _texture: Texture2D,
        protected _rect: geometry.Rect = null,
        protected _rotated: boolean = false,
        protected _offset: geometry.Point = null,
        protected _originalSize: geometry.Size = null) {
        super();


        this.rotated = !!_rotated;
        this.offset = _offset || ccp(0, 0);
        this.originalSize = _originalSize || util.copy(this.rect.size);


    }

    public toString(): string {
        return "[object SpriteFrame | TextureName=" + this.texture.name + ", Rect = (" + this.rect.origin.x + ", " + this.rect.origin.y + ", " + this.rect.size.width + ", " + this.rect.size.height + ")]";
    }
    public copy(): SpriteFrame {
        return new SpriteFrame(this.texture, this.rect, this.rotated, this.offset, this.originalSize);
}




}