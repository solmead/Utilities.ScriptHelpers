var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var System;
(function (System) {
    var ItemType;
    (function (ItemType) {
        ItemType[ItemType["ScriptFile"] = 0] = "ScriptFile";
        ItemType[ItemType["ScriptInline"] = 1] = "ScriptInline";
        ItemType[ItemType["CssFile"] = 2] = "CssFile";
        ItemType[ItemType["CssInline"] = 3] = "CssInline";
    })(ItemType = System.ItemType || (System.ItemType = {}));
    var Item = (function () {
        function Item(type) {
            this.type = type;
        }
        return Item;
    }());
    System.Item = Item;
    var CssFile = (function (_super) {
        __extends(CssFile, _super);
        function CssFile(file) {
            var _this = _super.call(this, ItemType.CssFile) || this;
            _this.file = file;
            _this.getTag = function (onReady) {
                var element = document.createElement('link');
                element.href = _this.file;
                element.rel = 'stylesheet';
                element.type = "text/css";
                element.charset = 'utf-8';
                element.onload = function () {
                    onReady();
                };
                return element;
            };
            return _this;
        }
        return CssFile;
    }(Item));
    System.CssFile = CssFile;
    var CssInline = (function (_super) {
        __extends(CssInline, _super);
        function CssInline(inlineCss) {
            var _this = _super.call(this, ItemType.CssInline) || this;
            _this.inlineCss = inlineCss;
            _this.getTag = function (onReady) {
                var element = document.createElement('style');
                element.innerHTML = _this.inlineCss;
                element.type = 'text/css';
                element.onload = function () {
                    onReady();
                };
                return element;
            };
            return _this;
        }
        return CssInline;
    }(Item));
    System.CssInline = CssInline;
    var JsFile = (function (_super) {
        __extends(JsFile, _super);
        function JsFile(file) {
            var _this = _super.call(this, ItemType.ScriptFile) || this;
            _this.file = file;
            _this.getTag = function (onReady) {
                var element = document.createElement('script');
                element.src = _this.file;
                element.type = 'text/javascript';
                element.async = true;
                element.charset = 'utf-8';
                element.onload = function () {
                    onReady();
                };
                return element;
            };
            return _this;
        }
        return JsFile;
    }(Item));
    System.JsFile = JsFile;
    var JsInline = (function (_super) {
        __extends(JsInline, _super);
        function JsInline(inlineScript) {
            var _this = _super.call(this, ItemType.ScriptInline) || this;
            _this.inlineScript = inlineScript;
            _this.getTag = function (onReady) {
                var element = document.createElement('script');
                element.innerHTML = _this.inlineScript;
                element.type = 'text/javascript';
                element.charset = 'utf-8';
                element.onload = function () {
                    onReady();
                };
                return element;
            };
            return _this;
        }
        return JsInline;
    }(Item));
    System.JsInline = JsInline;
    var Bundle = (function () {
        function Bundle(items) {
            var _this = this;
            this.items = items;
            this.addItem = function (item) {
                _this.items.push(item);
            };
            if (this.items == null) {
                this.items = [];
            }
        }
        return Bundle;
    }());
    System.Bundle = Bundle;
    var BundleLoader = (function () {
        function BundleLoader(bundles) {
            var _this = this;
            this.bundles = bundles;
            this.dfLoadStatus = 0;
            this.addBundle = function (bundle) {
                _this.bundles.push(bundle);
            };
            this.load = function (onFinished) {
                var downloadJSAtOnload = function () {
                    if (!_this.bundles.length) {
                        if (onFinished) {
                            onFinished();
                        }
                        return;
                    }
                    var dfGroup = _this.bundles.shift();
                    _this.dfLoadStatus = 0;
                    for (var i = 0; i < dfGroup.items.length; i++) {
                        _this.dfLoadStatus++;
                        var element = dfGroup.items[i].getTag(function () {
                            _this.dfLoadStatus--;
                            if (_this.dfLoadStatus == 0) {
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
        return BundleLoader;
    }());
    System.BundleLoader = BundleLoader;
    System.Resources = new BundleLoader();
})(System || (System = {}));
//# sourceMappingURL=Resources.js.map