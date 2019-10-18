declare module SiteInfo {
    class SiteInfo {
        sitepath: string;
        virtualUrl: string;
        applicationUrl: string;
        isCleanHtml: boolean;
        constructor();
        getParameterByName: (name: string) => string;
    }
    var siteInfo: SiteInfo;
    function virtualUrl(): string;
    function applicationUrl(): string;
    function isCleanHtml(): boolean;
    function refreshPage(): void;
    function getParameterByName(name: string): string;
    function getVirtualURL(url: string): string;
    function getFullURL(url: string): string;
    function redirect(url: string): void;
}
