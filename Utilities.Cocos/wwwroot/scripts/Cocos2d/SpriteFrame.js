import { geometry } from "./libs/geometry";
import { BObject } from "./libs/bobject";
import { util } from "./libs/util";
var ccp = geometry.ccp;
export class SpriteFrame extends BObject {
    constructor(_texture, _rect = null, _rotated = false, _offset = null, _originalSize = null) {
        super();
        this._texture = _texture;
        this._rect = _rect;
        this._rotated = _rotated;
        this._offset = _offset;
        this._originalSize = _originalSize;
        this.rotated = !!_rotated;
        this.offset = _offset || ccp(0, 0);
        this.originalSize = _originalSize || util.copy(this.rect.size);
    }
    get texture() {
        return this.getValue("_texture");
    }
    set texture(value) {
        this.setValue("_texture", null, value, true);
    }
    get rect() {
        return this.getValue("_rect");
    }
    set rect(value) {
        this.setValue("_rect", null, value, true);
    }
    get rotated() {
        return this.getValue("_rotated");
    }
    set rotated(value) {
        this.setValue("_rotated", null, value, true);
    }
    get offset() {
        return this.getValue("_offset");
    }
    set offset(value) {
        this.setValue("_offset", null, value, true);
    }
    get originalSize() {
        return this.getValue("_originalSize");
    }
    set originalSize(value) {
        this.setValue("_originalSize", null, value, true);
    }
    toString() {
        return "[object SpriteFrame | TextureName=" + this.texture.name + ", Rect = (" + this.rect.origin.x + ", " + this.rect.origin.y + ", " + this.rect.size.width + ", " + this.rect.size.height + ")]";
    }
    copy() {
        return new SpriteFrame(this.texture, this.rect, this.rotated, this.offset, this.originalSize);
    }
}
//# sourceMappingURL=SpriteFrame.js.map