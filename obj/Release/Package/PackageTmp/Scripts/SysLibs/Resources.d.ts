declare module System {
    enum ItemType {
        ScriptFile = 0,
        ScriptInline = 1,
        CssFile = 2,
        CssInline = 3,
    }
    class Item {
        type: ItemType;
        getTag: (onReady: () => void) => HTMLElement;
        constructor(type: ItemType);
    }
    class CssFile extends Item {
        file: string;
        constructor(file: string);
    }
    class CssInline extends Item {
        inlineCss: string;
        constructor(inlineCss: string);
    }
    class JsFile extends Item {
        file: string;
        constructor(file: string);
    }
    class JsInline extends Item {
        inlineScript: string;
        constructor(inlineScript: string);
    }
    class Bundle {
        items: Array<Item>;
        constructor(items?: Array<Item>);
        addItem: (item: Item) => void;
    }
    class BundleLoader {
        private bundles;
        private dfLoadStatus;
        constructor(bundles?: Array<Bundle>);
        addBundle: (bundle: Bundle) => void;
        load: (onFinished?: () => void) => void;
    }
    var Resources: BundleLoader;
}
