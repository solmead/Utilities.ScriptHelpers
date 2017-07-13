


module SiteInfo {

    export class SiteInfo {
        public sitepath: string = "/";
        public virtualUrl: string = "";
        public applicationUrl: string = "";
        public isCleanHtml: boolean = false;

        public constructor() {
            var scripts = document.getElementsByTagName('script');
            var lastScript = scripts[scripts.length - 1];
            var scriptName = lastScript.src;

            var subDirs = new Queryable<string>(["/SCRIPTS/", "/BUNDLES/"]);

            var indexs = subDirs.select((d) => {
                return this.sitepath.toUpperCase().indexOf(d);
            }).where((i)=>i>0);

            if (indexs.any()) {
                var minIdx = indexs.min();
                this.sitepath = scriptName.substring(0, minIdx) + "/";
            }
            
            var base = window.location.protocol + "//" + window.location.host + "/";
            this.virtualUrl = this.sitepath.replace(base, "");
            this.applicationUrl = base;
            var t = window.location.pathname + window.location.search;



            this.isCleanHtml = (t.indexOf("Format=CleanHtml") > -1);

        }

        getParameterByName = (name: string): string => {

            name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
            var results = regex.exec(location.search);
            return (results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " ")));
        };

    }

    export var siteInfo: SiteInfo = new SiteInfo();


    export function virtualUrl(): string {
        return siteInfo.virtualUrl;
    }
    export function applicationUrl(): string {
        return siteInfo.applicationUrl;
    }
    export function isCleanHtml(): boolean {
        return siteInfo.isCleanHtml;
    }

    export function refreshPage() {
        redirect(getFullURL(window.location.pathname + window.location.search));
    };


    export function getParameterByName(name: string): string {
        return siteInfo.getParameterByName(name);
    };


    export function getFullURL(url: string): string {
        var cntPiece = "Cnt=" + DateTime.getTimeCount();
        if (url.indexOf("?") != -1) {
            cntPiece = "&" + cntPiece;
        } else {
            cntPiece = "?" + cntPiece;
        }
        return applicationUrl() + url + cntPiece;
    }


    export function redirect(url: string) {
        window.location.href = url;
    };



}