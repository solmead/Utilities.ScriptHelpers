export var SiteInfo;
(function (SiteInfo_1) {
    class SiteInfo {
        constructor() {
            this.sitepath = "/";
            this.virtualUrl = "";
            this.applicationUrl = "";
            this.isCleanHtml = false;
            this.getParameterByName = (name) => {
                name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
                var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
                var results = regex.exec(location.search);
                return (results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " ")));
            };
            var scripts = document.getElementsByTagName('script');
            var lastScript = scripts[scripts.length - 1];
            var scriptName = lastScript.src;
            var subDirs = new Queryable(["/SCRIPTS/", "/BUNDLES/"]);
            var indexs = subDirs.select((d) => {
                return scriptName.toUpperCase().indexOf(d);
            }).where((i) => i > 0);
            if (indexs.any()) {
                var minIdx = indexs.min();
                this.sitepath = scriptName.substring(0, minIdx) + "/";
            }
            var base = window.location.protocol + "//" + window.location.host + "/";
            this.virtualUrl = this.sitepath.replace(base, "");
            this.applicationUrl = base;
            var t = window.location.pathname + window.location.search;
            this.isCleanHtml = (t.indexOf("Format=CleanHTML") > -1);
        }
    }
    SiteInfo_1.SiteInfo = SiteInfo;
    SiteInfo_1.siteInfo = new SiteInfo();
    function virtualUrl() {
        return SiteInfo_1.siteInfo.virtualUrl;
    }
    SiteInfo_1.virtualUrl = virtualUrl;
    function applicationUrl() {
        return SiteInfo_1.siteInfo.applicationUrl;
    }
    SiteInfo_1.applicationUrl = applicationUrl;
    function isCleanHtml() {
        return SiteInfo_1.siteInfo.isCleanHtml;
    }
    SiteInfo_1.isCleanHtml = isCleanHtml;
    function refreshPage() {
        redirect(getFullURL(window.location.pathname + window.location.search));
    }
    SiteInfo_1.refreshPage = refreshPage;
    ;
    function getParameterByName(name) {
        return SiteInfo_1.siteInfo.getParameterByName(name);
    }
    SiteInfo_1.getParameterByName = getParameterByName;
    ;
    function getVirtualURL(url) {
        return applicationUrl() + virtualUrl() + url;
    }
    SiteInfo_1.getVirtualURL = getVirtualURL;
    function getFullURL(url) {
        return applicationUrl() + url;
    }
    SiteInfo_1.getFullURL = getFullURL;
    function redirect(url) {
        window.location.href = url;
    }
    SiteInfo_1.redirect = redirect;
    ;
})(SiteInfo || (SiteInfo = {}));
//# sourceMappingURL=SiteInfo.js.map