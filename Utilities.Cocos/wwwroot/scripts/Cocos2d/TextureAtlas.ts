import { BObject } from "./libs/bobject";
import { TextureQuad } from "./libs/TextureQuad";
import { Texture2D } from "./Texture2D";
import { Config } from "./Config";
import { geometry } from "./libs/geometry";
import { util } from "./libs/util";
import { remoteresources } from "./jah/remote_resources";




export class TextureAtlas extends BObject {

    protected _quads: Array<TextureQuad> = new Array<TextureQuad>();
    get quads(): Array<TextureQuad> {
        return this.getValue("_quads");
    }
    set quads(value: Array<TextureQuad>) {
        this.setValue("_quads", null, value, true);
    }

    protected _imgElement: HTMLImageElement = null;
    get imgElement(): HTMLImageElement {
        return this.getValue("_imgElement");
    }
    set imgElement(value: HTMLImageElement) {
        this.setValue("_imgElement", null, value, true);
    }

    //protected _texture: Texture2D = null;
    get texture(): Texture2D {
        return this.getValue("_texture");
    }
    set texture(value: Texture2D) {
        this.setValue("_texture", null, value, true);
    }

    static CreateFromResource(resource: remoteresources.Resource): TextureAtlas {
        var tex = Texture2D.CreateFromResource(resource);
        return new TextureAtlas(tex);
    }

    //static CreateFromFile(file: string): TextureAtlas {
    //    var tex = Texture2D.CreateFromFile(file);
    //    return new TextureAtlas(tex);

    //}
    static CreateFromTexture(texture: Texture2D): TextureAtlas {
        var tex = Texture2D.CreateFromTexture(texture);
        return new TextureAtlas(tex);

    }
    static CreateFromCanvas(canvas: HTMLCanvasElement): TextureAtlas {
        var tex = Texture2D.CreateFromCanvas(canvas);
        return new TextureAtlas(tex);
    }

    constructor(protected _texture: Texture2D) {
        super();
        this.imgElement = _texture.imgElement;
    }

    public insertQuad(quad:TextureQuad, index:number=0): void {
        index = index || 0;
        this.quads.splice(index, 0, quad);
    }
    public removeQuad(quad: TextureQuad): void {
        var index = this.quads.indexOf(quad);
        this.quads.splice(index, 1);
    }
    public drawQuads(ctx: CanvasRenderingContext2D): void {
        util.each(this.quads, util.callback(this, (quad: TextureQuad)=> {
            if (!quad) {
                return;
            }

            this.drawQuad(ctx, quad);
        }));
    }

    public drawQuad(ctx: CanvasRenderingContext2D, quad: TextureQuad): void {
        var sx = quad.textureRect.origin.x,
            sy = quad.textureRect.origin.y,
            sw = quad.textureRect.size.width,
            sh = quad.textureRect.size.height;

        var dx = quad.drawRect.origin.x,
            dy = quad.drawRect.origin.y,
            dw = quad.drawRect.size.width,
            dh = quad.drawRect.size.height;


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
        ctx.drawImage(img,
            sx, sy, // Draw slice from x,y
            sw, sh, // Draw slice size
            dx, dy, // Draw at 0, 0
            dw, dh  // Draw size
        );
        ctx.scale(1, 1);
    }




}