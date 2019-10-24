import { Node } from "./Node";
import { geometry } from "../libs/geometry";
import { TextureQuad } from "../libs/TextureQuad";
import { TextureAtlas } from "../TextureAtlas";
import { util } from "../libs/util";
import { events } from "../libs/events";
var ccp = geometry.ccp;
export class Sprite extends Node {
    //static CreateFromSpriteSheet(spritesheet: ): Sprite {
    //    var textureAtlas = spritesheet.textureAtlas;
    //    var sprite = new Sprite(textureAtlas);
    //    sprite.useSpriteSheet = true;
    //    return sprite;
    //}
    constructor(_textureAtlas, _rect = null) {
        super();
        this._textureAtlas = _textureAtlas;
        this._rect = _rect;
        this._dirty = false;
        this._recursiveDirty = false;
        this._quad = null;
        this._flipX = false;
        this._flipY = false;
        this._offsetPosition = null;
        this._unflippedOffsetPositionFromCenter = null;
        this._untrimmedSize = null;
        this.offsetPosition = ccp(0, 0);
        this.unflippedOffsetPositionFromCenter = ccp(0, 0);
        util.each(['scale', 'scaleX', 'scaleY', 'rect', 'flipX', 'flipY', 'contentSize'], util.callback(this, function (key) {
            events.addListener(this, key.toLowerCase() + '_changed', util.callback(this, this._updateQuad));
        }));
        events.addListener(this, 'textureatlas_changed', util.callback(this, this._updateTextureQuad));
        if (!_rect && _textureAtlas) {
            _rect = new geometry.Rect(0, 0, _textureAtlas.texture.size.width, _textureAtlas.texture.size.height);
        }
        if (_rect) {
            this.rect = _rect;
            this.contentSize = _rect.size;
            this.quad = {
                drawRect: new geometry.Rect(0, 0, _rect.size.width, _rect.size.height),
                textureRect: _rect
            };
        }
    }
    //protected _textureAtlas: TextureAtlas = null;
    get textureAtlas() {
        return this.getValue("_textureAtlas");
    }
    set textureAtlas(value) {
        this.setValue("_textureAtlas", null, value, true);
    }
    // protected _rect: geometry.Rect = null;
    get rect() {
        return this.getValue("_rect");
    }
    set rect(value) {
        this.setValue("_rect", null, value, true);
    }
    get dirty() {
        return this.getValue("_dirty");
    }
    set dirty(value) {
        this.setValue("_dirty", null, value, true);
    }
    get recursiveDirty() {
        return this.getValue("_recursiveDirty");
    }
    set recursiveDirty(value) {
        this.setValue("_recursiveDirty", null, value, true);
    }
    get quad() {
        return this.getValue("_quad");
    }
    set quad(value) {
        this.setValue("_quad", null, value, true);
    }
    get flipX() {
        return this.getValue("_flipX");
    }
    set flipX(value) {
        this.setValue("_flipX", null, value, true);
    }
    get flipY() {
        return this.getValue("_flipY");
    }
    set flipY(value) {
        this.setValue("_flipY", null, value, true);
    }
    get offsetPosition() {
        return this.getValue("_offsetPosition");
    }
    set offsetPosition(value) {
        this.setValue("_offsetPosition", null, value, true);
    }
    get unflippedOffsetPositionFromCenter() {
        return this.getValue("_unflippedOffsetPositionFromCenter");
    }
    set unflippedOffsetPositionFromCenter(value) {
        this.setValue("_unflippedOffsetPositionFromCenter", null, value, true);
    }
    get untrimmedSize() {
        return this.getValue("_untrimmedSize");
    }
    set untrimmedSize(value) {
        this.setValue("_untrimmedSize", null, value, true);
    }
    static CreateFromFile(file, rect = null) {
        var textureAtlas = TextureAtlas.CreateFromFile(file);
        var sprite = new Sprite(textureAtlas, rect);
        return sprite;
    }
    static CreateFromTexture(texture) {
        var textureAtlas = new TextureAtlas(texture);
        var sprite = new Sprite(textureAtlas);
        return sprite;
    }
    static CreateFromFrame(frame) {
        var texture = frame.texture;
        var rect = frame.rect;
        var textureAtlas = TextureAtlas.CreateFromTexture(texture);
        var sprite = new Sprite(textureAtlas, rect);
        sprite.displayFrame = frame;
        return sprite;
    }
    /**
     * @private
     */
    _updateTextureQuad(obj, key, texture, oldTexture) {
        if (oldTexture) {
            oldTexture.removeQuad(this.quad);
        }
        if (texture) {
            texture.insertQuad(this.quad);
        }
    }
    /**
     * @setter textureCoords
     * @type geometry.Rect
     */
    set textureCoords(rect) {
        var quad = this.quad;
        if (!quad) {
            quad = {
                drawRect: geometry.rectMake(0, 0, 0, 0),
                textureRect: geometry.rectMake(0, 0, 0, 0)
            };
        }
        quad.textureRect = util.copy(rect);
        this.quad = quad;
    }
    /**
     * @setter textureRect
     * @type geometry.Rect
     */
    setTextureRect(rect, rotated = false, untrimmedSize = null) {
        untrimmedSize = untrimmedSize || rect.size;
        this.contentSize = untrimmedSize;
        this.rect = util.copy(rect);
        this.textureCoords = rect;
        var quad = this.quad;
        var relativeOffset = util.copy(this.unflippedOffsetPositionFromCenter);
        if (this.flipX) {
            relativeOffset.x = -relativeOffset.x;
        }
        if (this.flipY) {
            relativeOffset.y = -relativeOffset.y;
        }
        var offsetPosition = util.copy(this.offsetPosition);
        offsetPosition.x = relativeOffset.x + (this.contentSize.width - rect.size.width) / 2;
        offsetPosition.y = -relativeOffset.y + (this.contentSize.height - rect.size.height) / 2;
        quad.drawRect.origin = util.copy(offsetPosition);
        quad.drawRect.size = util.copy(rect.size);
        if (this.flipX) {
            quad.drawRect.size.width *= -1;
            quad.drawRect.origin.x = -rect.size.width;
        }
        if (this.flipY) {
            quad.drawRect.size.height *= -1;
            quad.drawRect.origin.y = -rect.size.height;
        }
        this.quad = quad;
    }
    /**
     * @private
     */
    _updateQuad() {
        if (!this.rect) {
            return;
        }
        if (!this.quad) {
            this.quad = new TextureQuad(geometry.rectMake(0, 0, 0, 0), geometry.rectMake(0, 0, 0, 0));
        }
        var relativeOffset = util.copy(this.unflippedOffsetPositionFromCenter);
        if (this.flipX) {
            relativeOffset.x = -relativeOffset.x;
        }
        if (this.flipY) {
            relativeOffset.y = -relativeOffset.y;
        }
        var offsetPosition = util.copy(this.offsetPosition);
        offsetPosition.x = relativeOffset.x + (this.contentSize.width - this.rect.size.width) / 2;
        offsetPosition.y = relativeOffset.y + (this.contentSize.height - this.rect.size.height) / 2;
        this.quad.textureRect = util.copy(this.rect);
        this.quad.drawRect.origin = util.copy(offsetPosition);
        this.quad.drawRect.size = util.copy(this.rect.size);
        if (this.flipX) {
            this.quad.drawRect.size.width *= -1;
            this.quad.drawRect.origin.x = -this.rect.size.width;
        }
        if (this.flipY) {
            this.quad.drawRect.size.height *= -1;
            this.quad.drawRect.origin.y = -this.rect.size.height;
        }
    }
    updateTransform(ctx) {
        if (!this.useSpriteSheet) {
            throw "updateTransform is only valid when Sprite is being rendered using a SpriteSheet";
        }
        if (!this.visible) {
            this.dirty = false;
            this.recursiveDirty = false;
            return;
        }
        // TextureAtlas has hard reference to this quad so we can just update it directly
        this.quad.drawRect.origin = {
            x: this.position.x - this.anchorPointInPixels.x * this.scaleX,
            y: this.position.y - this.anchorPointInPixels.y * this.scaleY
        };
        this.quad.drawRect.size = new geometry.Size(this.rect.size.width * this.scaleX, this.rect.size.height * this.scaleY);
        this.dirty = false;
        this.recursiveDirty = false;
    }
    draw(context) {
        if (!this.quad) {
            return;
        }
        this.textureAtlas.drawQuad(context, this.quad);
    }
    isFrameDisplayed(frame) {
        if (!this.rect || !this.textureAtlas) {
            return false;
        }
        return (frame.texture === this.textureAtlas.texture && geometry.rectEqualToRect(frame.rect, this.rect));
    }
    /**
     * @setter displayFrame
     * @type cocos.SpriteFrame
     */
    set displayFrame(frame) {
        if (!frame) {
            delete this.quad;
            return;
        }
        this.unflippedOffsetPositionFromCenter = util.copy(frame.offset);
        // change texture
        if (!this.textureAtlas || frame.texture !== this.textureAtlas.texture) {
            this.textureAtlas = new TextureAtlas(frame.texture);
        }
        this.setTextureRect(frame.rect, frame.rotated, frame.originalSize);
    }
}
//# sourceMappingURL=Sprite.js.map