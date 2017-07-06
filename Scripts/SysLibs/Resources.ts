

module System {

    export enum ItemType {
        ScriptFile,
        ScriptInline,
        CssFile,
        CssInline
    }

    export class Item {
        public getTag: (onReady: () => void) => HTMLElement;

        constructor(public type: ItemType) {
            
        }
    }

    export class CssFile extends Item {

        constructor(public file: string) {
            super(ItemType.CssFile);

            this.getTag = (onReady: () => void): HTMLElement => {
                var element = document.createElement('link');
                element.href = this.file;
                element.rel = 'stylesheet';
                element.type = "text/css";
                element.charset = 'utf-8';

                element.onload =  () => {
                        onReady();
                };
                return element;
            }
        }



    }

    export class CssInline extends Item {

        constructor(public inlineCss: string) {
            super(ItemType.CssInline);

            this.getTag = (onReady: () => void): HTMLElement => {
                var element = document.createElement('style');
                element.innerHTML = this.inlineCss;
                element.type = 'text/css';

                element.onload = () => {
                    onReady();
                };


                return element;
            }
        }

    }

    export class JsFile extends Item
    {

        constructor(public file:string ) {
            super(ItemType.ScriptFile);
            
            this.getTag = (onReady: () => void): HTMLElement => {
                var element = document.createElement('script');
                element.src = this.file;
                element.type = 'text/javascript';
                element.async = true;
                element.charset = 'utf-8';

                element.onload = () => {
                        onReady();
                };


                return element;
            }
        }

        

    }
    export class JsInline extends Item
    {

        constructor(public inlineScript: string) {
            super(ItemType.ScriptInline);
            
            this.getTag = (onReady: () => void): HTMLElement => {
                var element = document.createElement('script');
                element.innerHTML = this.inlineScript;
                element.type = 'text/javascript';
                element.charset = 'utf-8';

                element.onload = () => {
                    onReady();
                };


                return element;
            }
        }
        
    }


    export class Bundle {


        constructor(public items?: Array<Item>, ) {
            if (this.items == null) {
                this.items = <Array<Item>>[];
            }
        }

        addItem = (item: Item) => {
            this.items.push(item);
        }

    }




    export class BundleLoader {
        private dfLoadStatus = 0;

        constructor(private bundles?: Array<Bundle> ) {
            if (this.bundles == null) {
                this.bundles = <Array<Bundle>>[];
            }
        }

        addBundle = (bundle: Bundle) => {
            this.bundles.push(bundle);
        }

        load = (onFinished?: ()=>void):void => {

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

            }


            if (window.addEventListener)
                window.addEventListener("load", downloadJSAtOnload, false);
            else window.onload = downloadJSAtOnload;

        };

    }

    export var Resources = new BundleLoader();

}