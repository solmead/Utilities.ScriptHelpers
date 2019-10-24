import { BObject } from "../libs/bobject";
import { events } from "../libs/events";
import { remoteresources } from "./remote_resources";
export class Preloader extends BObject {
    constructor(itms = null) {
        super();
        this.queue = new Array();
        this._count = -1;
        this._loaded = 0;
        this._listeners = new Array();
        this.keys = function (o) {
            if (o !== Object(o)) {
                throw new TypeError('Object.keys called on non-object');
            }
            var ret = [], p;
            for (p in o) {
                if (Object.prototype.hasOwnProperty.call(o, p)) {
                    ret.push(p);
                }
            }
            return ret;
        };
        if (itms) {
            this.addToQueue(itms);
        }
        //this.count = this.keys(remoteresources.resources).length;
    }
    get count() {
        return this.getValue("_count");
    }
    set count(value) {
        this.setValue("_count", null, value, true);
    }
    get loaded() {
        return this.getValue("_loaded");
    }
    set loaded(value) {
        this.setValue("_loaded", null, value, true);
    }
    load() {
        this.loaded = 0;
        this.count += this.queue.length;
        var ref, i;
        for (i = 0; i < this.count; i++) {
            ref = this.queue[i];
            var res = remoteresources.getResource(ref);
            if (!res) {
                console.warn("Unable to preload non-existant file: ", ref);
                this.didLoadResource(ref);
                continue;
            }
            if (!res.remote || res.loaded) {
                // Already loaded
                this.didLoadResource(ref);
                continue;
            }
            var file = remoteresources.resource(ref), callback = ((ref) => {
                return () => {
                    this.didLoadResource(ref);
                };
            })(ref);
            if (file instanceof remoteresources.RemoteResource) {
                // Notify when a resource has loaded
                var el = events.addListener(file, 'load', callback);
                this._listeners[ref] = el;
                file.load();
            }
            else {
                setTimeout(callback, 1);
            }
        }
        this.clearQueue();
    }
    didLoadResource(uri) {
        this.loaded = this.loaded + 1;
        if (this._listeners[uri]) {
            events.removeListener(this._listeners[uri]);
        }
        events.trigger(this, 'load', this, uri);
        if (this.loaded >= this.count) {
            events.trigger(this, 'complete', this);
        }
    }
    addToQueue(items) {
        if (items instanceof Array) {
            // Update array in place incase something else has a reference to it
            for (var i = 0; i < items.length; i++) {
                this.queue.push(items[i]);
            }
        }
        else {
            this.queue.push(items);
        }
    }
    addEverythingToQueue() {
        var items = new Array();
        var key, res;
        for (key in remoteresources.resources) {
            if (remoteresources.resources.hasOwnProperty(key)) {
                res = remoteresources.resources[key];
                if (res.remote) {
                    items.push(key);
                }
            }
        }
        if (items.length > 0) {
            this.addToQueue(items);
        }
    }
    clearQueue() {
        this.queue.splice(0, this.queue.length);
    }
}
//# sourceMappingURL=Preloader.js.map