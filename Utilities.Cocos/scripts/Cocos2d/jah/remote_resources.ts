import { events } from "../libs/events";


export module remoteresources {
    export class Resource {
        public remoteResource: RemoteResource = null;
        public loaded: boolean = false;
        public data: any;

        constructor(public url: string, public mimetype: string, public remote: boolean = false) {
            this.data = url;
        }
    }


    export var resources: Array<Resource> = new Array<Resource>();

    export function addResource(url: string, mimetype: string, remote: boolean = false) {
        resources[url] = new Resource(url, mimetype, remote);
    }


    export function getResource(resourcePath: string): Resource {
        return resources[resourcePath];
    }


    export function resource(resourcePath: string): RemoteResource {

        var res = getResource(resourcePath);
        if (!res) {
            throw new Error("Unable to find resource: " + resourcePath);
        }

        if (res.remote && !res.loaded) {
            return getRemoteResource(resourcePath);
        }

        return new LocalResource(res.data);
    }



    export class RemoteResource {



        constructor(public url: string, public path: string) {

        }



        public load(): any {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    var res = getResource(this.path);
                    res.data = xhr.responseText;
                    res.loaded = true;

                    events.trigger(this, 'load', this);
                }
            };

            xhr.open('GET', this.url, true);
            xhr.send(null);

            return null;
        }


    }

    export class LocalResource extends RemoteResource {

        constructor(public data: any) {
            super("","")
        }

        public load(): any {
            return this.data;

        }


    }
    export class RemoteImage extends RemoteResource {


        public load(): HTMLImageElement {
            var img = new Image();
            var res = getResource(this.path);
            res.data = img;

            img.onload = () => {
                res.loaded = true;
                events.trigger(this, 'load', this);
            };

            img.onerror = () => {
                console.warn("Failed to load resource: [%s] from [%s]", this.path, img.src);
                res.loaded = true;
                events.trigger(this, 'load', this);
            };

            img.src = this.url;

            return img;

        }


    }

    export class RemoteScript extends RemoteResource {

        public load(): HTMLElement {
            var script = document.createElement('script');
            var res = getResource(this.path);
            res.data = script;

            script.onload = () => {
                res.loaded = true;
                events.trigger(this, 'load', this);
            };

            script.src = this.url;
            document.getElementsByTagName('head')[0].appendChild(script);

            return script;

        }


    }

    export function getRemoteResource(resourcePath: string): RemoteResource {
        var resource = <Resource>resources[resourcePath];

        if (!resource) {
            return null;
        }

        if (resource.remoteResource) {
            return resource.remoteResource;
        }

        var RemoteObj
            , mime = resource.mimetype.split('/');

        if (mime[0] == 'image') {
            RemoteObj = new RemoteImage(resource.url, resourcePath);
        } else if (mime[1] == 'javascript') {
            RemoteObj = new RemoteScript(resource.url, resourcePath);
        } else {
            RemoteObj = new RemoteResource(resource.url, resourcePath);
        }

        resource.remoteResource = RemoteObj;

        return resource.remoteResource;
    }
}