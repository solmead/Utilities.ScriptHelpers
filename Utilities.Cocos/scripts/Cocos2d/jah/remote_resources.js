import { events } from "../libs/events";
export var remoteresources;
(function (remoteresources) {
    class Resource {
        constructor(url, mimetype, remote = false) {
            this.url = url;
            this.mimetype = mimetype;
            this.remote = remote;
            this.remoteResource = null;
            this.loaded = false;
            this.data = url;
        }
    }
    remoteresources.Resource = Resource;
    remoteresources.resources = new Array();
    function addResource(url, mimetype, remote = false) {
        var res = new Resource(url, mimetype, remote);
        remoteresources.resources[url] = res;
        return res;
    }
    remoteresources.addResource = addResource;
    function getResource(resourcePath) {
        return remoteresources.resources[resourcePath];
    }
    remoteresources.getResource = getResource;
    function resource(resourcePath) {
        var res = getResource(resourcePath);
        if (!res) {
            throw new Error("Unable to find resource: " + resourcePath);
        }
        if (res.remote && !res.loaded) {
            return getRemoteResource(resourcePath);
        }
        return new LocalResource(res.data);
    }
    remoteresources.resource = resource;
    class RemoteResource {
        constructor(url, path) {
            this.url = url;
            this.path = path;
        }
        load() {
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
    remoteresources.RemoteResource = RemoteResource;
    class LocalResource extends RemoteResource {
        constructor(data) {
            super("", "");
            this.data = data;
        }
        load() {
            return this.data;
        }
    }
    remoteresources.LocalResource = LocalResource;
    class RemoteImage extends RemoteResource {
        load() {
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
    remoteresources.RemoteImage = RemoteImage;
    class RemoteScript extends RemoteResource {
        load() {
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
    remoteresources.RemoteScript = RemoteScript;
    function getRemoteResource(resourcePath) {
        var resource = remoteresources.resources[resourcePath];
        if (!resource) {
            return null;
        }
        if (resource.remoteResource) {
            return resource.remoteResource;
        }
        var RemoteObj, mime = resource.mimetype.split('/');
        if (mime[0] == 'image') {
            RemoteObj = new RemoteImage(resource.url, resourcePath);
        }
        else if (mime[1] == 'javascript') {
            RemoteObj = new RemoteScript(resource.url, resourcePath);
        }
        else {
            RemoteObj = new RemoteResource(resource.url, resourcePath);
        }
        resource.remoteResource = RemoteObj;
        return resource.remoteResource;
    }
    remoteresources.getRemoteResource = getRemoteResource;
})(remoteresources || (remoteresources = {}));
//# sourceMappingURL=remote_resources.js.map