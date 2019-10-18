declare module ApiLibrary {
    enum callTypes {
        GET = 0,
        PUT = 1,
        POST = 2,
    }
    function addFormatToUrl(url: string): string;
    function addAntiForgeryToken(data: any): any;
    function apiCall(type: callTypes, url: string, sendData: any, successCallback?: (data: any, textStatus: string, jqXHR: JQueryXHR) => any, errorCallback?: (textStatus: string, errorThrown: string) => any, beforeSend?: (jqXHR: JQueryXHR) => any): void;
    function getCall(url: string, seqNum?: number, successCallback?: (data: any, seq?: number) => any, errorCallback?: (textStatus: string, errorThrown: string) => any): void;
    function putCall(url: string, seqNum?: number, sendData?: any, successCallback?: (data: any, seq?: number) => any, errorCallback?: (textStatus: string, errorThrown: string) => any): void;
    function postCall(url: string, seqNum?: number, sendData?: any, successCallback?: (data: any, seq?: number) => any, errorCallback?: (textStatus: string, errorThrown: string) => any): void;
}
