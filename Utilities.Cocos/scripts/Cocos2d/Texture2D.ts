import { BObject } from "./libs/bobject";
import { geometry } from "./libs/geometry";
import { events } from "./libs/events";
import { remoteresources } from "./jah/remote_resources";
import { util } from "./libs/util";



export class Texture2D extends BObject {

    //protected _imgElement: HTMLImageElement = null;
    get imgElement(): HTMLImageElement {
        return this.getValue("_imgElement");
    }
    set imgElement(value: HTMLImageElement) {
        this.setValue("_imgElement", null, value, true);
    }
    protected _size: geometry.Size = null;
    get size(): geometry.Size {
        return this.getValue("_size");
    }
    set size(value: geometry.Size) {
        this.setValue("_size", null, value, true);
    }
    //protected _name: string = null;
    get name(): string {
        return this.getValue("_name");
    }
    set name(value: string) {
        this.setValue("_name", null, value, true);
    }
    protected _isLoaded: boolean = false;
    get isLoaded(): boolean {
        return this.getValue("_isLoaded");
    }
    set isLoaded(value: boolean) {
        this.setValue("_isLoaded", null, value, true);
    }


    static CreateFromFile(file: string, rect: geometry.Rect = null): Texture2D {
        var name = file;
        var data = remoteresources.resource(file);
        var tex: Texture2D = null;
        if (data instanceof remoteresources.RemoteResource) {
            tex = new Texture2D(name, data.load());
        } else {
            tex = new Texture2D(name, data);
        }
        return tex;

    }
    static CreateFromTexture(texture: Texture2D): Texture2D {
        var data = texture.imgElement;
        var tex = new Texture2D(texture.name, data);
        return tex;

    }
    static CreateFromCanvas(canvas: HTMLCanvasElement): Texture2D {
        var data = <HTMLImageElement><any>canvas;

        var tex = new Texture2D("", data);
        return tex;

    }



    constructor(protected _name: string = null, protected _imgElement: HTMLImageElement = null) {
        super();


        this.size = new geometry.Size(0, 0);




        //if (data instanceof RemoteResource) {
        //    events.addListener(data, 'load', util.callback(this, this.dataDidLoad));
        //    this.imgElement = data.load();
        //} else {
            //this.imgElement = data;
            this.dataDidLoad(_imgElement);
        //}
    }

    public dataDidLoad(data): void {
        this.isLoaded = true;
        this.size = new geometry.Size(this.imgElement.width, this.imgElement.height);
        events.trigger(self, 'load', self);
    }
    public drawAtPoint(ctx: CanvasRenderingContext2D, point: geometry.Point): void {
        if (!this.isLoaded) {
            return;
        }
        ctx.drawImage(this.imgElement, point.x, point.y);
    }
    public drawInRect(ctx: CanvasRenderingContext2D, rect: geometry.Rect): void {
        if (!this.isLoaded) {
            return;
        }
        ctx.drawImage(this.imgElement,
            rect.origin.x, rect.origin.y,
            rect.size.width, rect.size.height
        );
    }

    /**
     * @getter data
     * @type {String} Base64 encoded image data
     */
    public get data() {
        return this.imgElement ? this.imgElement.src : null;
    }

    public get contentSize(): geometry.Size {
        return this.size;
    }

    public get pixelsWide(): number {
        return this.size.width;
    }

    public get pixelsHigh(): number {
        return this.size.height;
    }


}