var System;
(function (System) {
    var ItemType;
    (function (ItemType) {
        ItemType[ItemType["ScriptFile"] = 0] = "ScriptFile";
        ItemType[ItemType["ScriptInline"] = 1] = "ScriptInline";
        ItemType[ItemType["CssFile"] = 2] = "CssFile";
        ItemType[ItemType["CssInline"] = 3] = "CssInline";
    })(ItemType = System.ItemType || (System.ItemType = {}));
    class Item {
        constructor(type) {
            this.type = type;
        }
    }
    System.Item = Item;
    class CssFile extends Item {
        constructor(file) {
            super(ItemType.CssFile);
            this.file = file;
            this.getTag = (onReady) => {
                var element = document.createElement('link');
                element.href = this.file;
                element.rel = 'stylesheet';
                element.type = "text/css";
                element.charset = 'utf-8';
                element.onload = () => {
                    onReady();
                };
                return element;
            };
        }
    }
    System.CssFile = CssFile;
    class CssInline extends Item {
        constructor(inlineCss) {
            super(ItemType.CssInline);
            this.inlineCss = inlineCss;
            this.getTag = (onReady) => {
                var element = document.createElement('style');
                element.innerHTML = this.inlineCss;
                element.type = 'text/css';
                element.onload = () => {
                    onReady();
                };
                return element;
            };
        }
    }
    System.CssInline = CssInline;
    class JsFile extends Item {
        constructor(file) {
            super(ItemType.ScriptFile);
            this.file = file;
            this.getTag = (onReady) => {
                var element = document.createElement('script');
                element.src = this.file;
                element.type = 'text/javascript';
                element.async = true;
                element.charset = 'utf-8';
                element.onload = () => {
                    onReady();
                };
                return element;
            };
        }
    }
    System.JsFile = JsFile;
    class JsInline extends Item {
        constructor(inlineScript) {
            super(ItemType.ScriptInline);
            this.inlineScript = inlineScript;
            this.getTag = (onReady) => {
                var element = document.createElement('script');
                element.innerHTML = this.inlineScript;
                element.type = 'text/javascript';
                element.charset = 'utf-8';
                element.onload = () => {
                    onReady();
                };
                return element;
            };
        }
    }
    System.JsInline = JsInline;
    class Bundle {
        constructor(items) {
            this.items = items;
            this.addItem = (item) => {
                this.items.push(item);
            };
            if (this.items == null) {
                this.items = [];
            }
        }
    }
    System.Bundle = Bundle;
    class BundleLoader {
        constructor(bundles) {
            this.bundles = bundles;
            this.dfLoadStatus = 0;
            this.addBundle = (bundle) => {
                this.bundles.push(bundle);
            };
            this.load = (onFinished) => {
                var downloadJSAtOnload = () => {
                    if (!this.bundles.length) {
                        if (onFinished) {
                            onFinished();
                        }
                        return;
                    }
                    var dfGroup = this.bundles.shift();
                    this.dfLoadStatus = 0;
                    for (var i = 0; i < dfGroup.items.length; i++) {
                        this.dfLoadStatus++;
                        var element = dfGroup.items[i].getTag(() => {
                            this.dfLoadStatus--;
                            if (this.dfLoadStatus == 0) {
                                downloadJSAtOnload();
                            }
                        });
                        document.body.appendChild(element);
                    }
                };
                if (window.addEventListener)
                    window.addEventListener("load", downloadJSAtOnload, false);
                else
                    window.onload = downloadJSAtOnload;
            };
            if (this.bundles == null) {
                this.bundles = [];
            }
        }
    }
    System.BundleLoader = BundleLoader;
    System.Resources = new BundleLoader();
})(System || (System = {}));
//# sourceMappingURL=Resources.js.map