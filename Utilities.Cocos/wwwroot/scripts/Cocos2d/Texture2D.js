import { BObject } from "./libs/bobject";
import { geometry } from "./libs/geometry";
import { events } from "./libs/events";
import { remoteresources } from "./jah/remote_resources";
export class Texture2D extends BObject {
    constructor(_name = null, _imgElement = null) {
        super();
        this._name = _name;
        this._imgElement = _imgElement;
        this._size = null;
        this._isLoaded = false;
        this.size = new geometry.Size(0, 0);
        //if (data instanceof RemoteResource) {
        //    events.addListener(data, 'load', util.callback(this, this.dataDidLoad));
        //    this.imgElement = data.load();
        //} else {
        //this.imgElement = data;
        this.dataDidLoad(_imgElement);
        //}
    }
    //protected _imgElement: HTMLImageElement = null;
    get imgElement() {
        return this.getValue("_imgElement");
    }
    set imgElement(value) {
        this.setValue("_imgElement", null, value, true);
    }
    get size() {
        return this.getValue("_size");
    }
    set size(value) {
        this.setValue("_size", null, value, true);
    }
    //protected _name: string = null;
    get name() {
        return this.getValue("_name");
    }
    set name(value) {
        this.setValue("_name", null, value, true);
    }
    get isLoaded() {
        return this.getValue("_isLoaded");
    }
    set isLoaded(value) {
        this.setValue("_isLoaded", null, value, true);
    }
    static CreateFromFile(file, rect = null) {
        var name = file;
        var data = remoteresources.resource(file);
        var tex = null;
        if (data instanceof remoteresources.RemoteResource) {
            tex = new Texture2D(name, data.load());
        }
        else {
            tex = new Texture2D(name, data);
        }
        return tex;
    }
    static CreateFromTexture(texture) {
        var data = texture.imgElement;
        var tex = new Texture2D(texture.name, data);
        return tex;
    }
    static CreateFromCanvas(canvas) {
        var data = canvas;
        var tex = new Texture2D("", data);
        return tex;
    }
    dataDidLoad(data) {
        this.isLoaded = true;
        this.size = new geometry.Size(this.imgElement.width, this.imgElement.height);
        events.trigger(self, 'load', self);
    }
    drawAtPoint(ctx, point) {
        if (!this.isLoaded) {
            return;
        }
        ctx.drawImage(this.imgElement, point.x, point.y);
    }
    drawInRect(ctx, rect) {
        if (!this.isLoaded) {
            return;
        }
        ctx.drawImage(this.imgElement, rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
    }
    /**
     * @getter data
     * @type {String} Base64 encoded image data
     */
    get data() {
        return this.imgElement ? this.imgElement.src : null;
    }
    get contentSize() {
        return this.size;
    }
    get pixelsWide() {
        return this.size.width;
    }
    get pixelsHigh() {
        return this.size.height;
    }
}
//# sourceMappingURL=Texture2D.js.map