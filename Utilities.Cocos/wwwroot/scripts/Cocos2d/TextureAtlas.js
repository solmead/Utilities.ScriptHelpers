import { BObject } from "./libs/bobject";
import { Texture2D } from "./Texture2D";
import { Config } from "./Config";
import { util } from "./libs/util";
export class TextureAtlas extends BObject {
    constructor(_texture) {
        super();
        this._texture = _texture;
        this._quads = new Array();
        this._imgElement = null;
        this.imgElement = _texture.imgElement;
    }
    get quads() {
        return this.getValue("_quads");
    }
    set quads(value) {
        this.setValue("_quads", null, value, true);
    }
    get imgElement() {
        return this.getValue("_imgElement");
    }
    set imgElement(value) {
        this.setValue("_imgElement", null, value, true);
    }
    //protected _texture: Texture2D = null;
    get texture() {
        return this.getValue("_texture");
    }
    set texture(value) {
        this.setValue("_texture", null, value, true);
    }
    static CreateFromFile(file) {
        var tex = Texture2D.CreateFromFile(file);
        return new TextureAtlas(tex);
    }
    static CreateFromTexture(texture) {
        var tex = Texture2D.CreateFromTexture(texture);
        return new TextureAtlas(tex);
    }
    static CreateFromCanvas(canvas) {
        var tex = Texture2D.CreateFromCanvas(canvas);
        return new TextureAtlas(tex);
    }
    insertQuad(quad, index = 0) {
        index = index || 0;
        this.quads.splice(index, 0, quad);
    }
    removeQuad(quad) {
        var index = this.quads.indexOf(quad);
        this.quads.splice(index, 1);
    }
    drawQuads(ctx) {
        util.each(this.quads, util.callback(this, (quad) => {
            if (!quad) {
                return;
            }
            this.drawQuad(ctx, quad);
        }));
    }
    drawQuad(ctx, quad) {
        var sx = quad.textureRect.origin.x, sy = quad.textureRect.origin.y, sw = quad.textureRect.size.width, sh = quad.textureRect.size.height;
        var dx = quad.drawRect.origin.x, dy = quad.drawRect.origin.y, dw = quad.drawRect.size.width, dh = quad.drawRect.size.height;
        var scaleX = 1;
        var scaleY = 1;
        if (Config.FLIP_Y_AXIS) {
            dy -= dh;
            dh *= -1;
        }
        if (dw < 0) {
            dw *= -1;
            scaleX = -1;
        }
        if (dh < 0) {
            dh *= -1;
            scaleY = -1;
        }
        ctx.scale(scaleX, scaleY);
        var img = this.imgElement;
        ctx.drawImage(img, sx, sy, // Draw slice from x,y
        sw, sh, // Draw slice size
        dx, dy, // Draw at 0, 0
        dw, dh // Draw size
        );
        ctx.scale(1, 1);
    }
}
//# sourceMappingURL=TextureAtlas.js.map