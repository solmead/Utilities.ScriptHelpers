

module ApiLibrary {

    export enum callTypes {
        GET,
        PUT,
        POST
    }

    export function addFormatToUrl(url: string): string {
        if (url.indexOf("Format=") >= 0) {
            url = url.replace("Format=PartialHTML", "Format=JSON");
            url = url.replace("Format=CleanHTML", "Format=JSON");
        } else {
            if (url.indexOf("?") >= 0) {
                url = url + '&Format=JSON';
            } else {
                url = url + '?Format=JSON';
            }
        }
        return url;
    }

    export function addAntiForgeryToken(data: any) {
        data.__RequestVerificationToken = $('input[name="__RequestVerificationToken"]').val();
        return data;
    }


    export function apiCall(type: callTypes, url: string, sendData: any,
        successCallback?: (data: any, textStatus: string, jqXHR: JQueryXHR) => any,
        errorCallback?: (textStatus: string, errorThrown: string) => any,
        beforeSend?: (jqXHR: JQueryXHR) => any): void {

        var cntPiece = "Cnt=" + DateTime.getTimeCount();
        if (url.indexOf("?") != -1) {
            cntPiece = "&" + cntPiece;
        } else {
            cntPiece = "?" + cntPiece;
        }
        url = url.replace(SiteInfo.virtualUrl(), "");
        if (url.lastIndexOf("/", 0) === 0) {
            url = url.substring(1);
        }
        var fUrl = SiteInfo.applicationUrl() + url + cntPiece;

        $.ajax({
            url: fUrl,
            beforeSend: (request: JQueryXHR) => {
                if (beforeSend) {
                    beforeSend(request);
                }
                //request.setRequestHeader("Authority", authorizationToken);
            },
            type: callTypes[type],
            data: sendData,
            success: successCallback,
            error: function (jqXHR: JQueryXHR, textStatus: string, errorThrown: string) {
                if (errorCallback) {
                    errorCallback(textStatus, errorThrown);
                }
            },
            dataType: "json"
        });

    }

    export function getCallAsync<TT>(url: string, seqNum?: number): Promise<TT> {
        return new Promise<TT>((resolve, reject) => {
            getCall(url, seqNum, (data: any, seq?: number) => {
                resolve(data);
            }, (extStatus: string, errorThrown: string) => {
                reject(Error(errorThrown));
            });
        });
    }

    export function putCallAsync<TT>(url: string, seqNum?: number, sendData?: any): Promise<TT> {
        return new Promise<TT>((resolve, reject) => {
            putCall(url, seqNum, sendData, (data: any, seq?: number) => {
                resolve(data);
            }, (extStatus: string, errorThrown: string) => {
                reject(Error(errorThrown));
            });
        });
    }
    export function postCallAsync<TT>(url: string, seqNum?: number, sendData?: any): Promise<TT> {
        return new Promise<TT>((resolve, reject) => {
            postCall(url, seqNum, sendData, (data: any, seq?: number) => {
                resolve(data);
            }, (extStatus: string, errorThrown: string) => {
                reject(Error(errorThrown));
            });
        });
    }
    
    //export function getCall(url: string,
    //    successCallback?: (data: any) => any,
    //    errorCallback?: (textStatus: string, errorThrown: string) => any) :void;
    export function getCall(url: string, seqNum?: number,
        successCallback?: (data: any, seq?: number) => any,
        errorCallback?: (textStatus: string, errorThrown: string) => any): void {
        if (!seqNum) {
            seqNum = DateTime.getTimeCount();
        }
        apiCall(callTypes.GET, url, null, (data, textStatus, request) => {
            var seq = parseInt(request.getResponseHeader("seq"));
            if (successCallback) {
                successCallback(data, seq);
            }
        }, errorCallback, (request) => {
            request.setRequestHeader("seq", "" + seqNum);
        });
    }

    export function putCall(url: string, seqNum?: number, sendData?: any,
        successCallback?: (data: any, seq?: number) => any,
        errorCallback?: (textStatus: string, errorThrown: string) => any) {
        if (!seqNum) {
            seqNum = DateTime.getTimeCount();
        }
        sendData = sendData || {};
        addAntiForgeryToken(sendData);

        apiCall(callTypes.PUT, url, sendData, (data, textStatus, request) => {
            var seq: number = parseInt(request.getResponseHeader("seq"));

            if (successCallback) {
                successCallback(data, seq);
            }
        }, errorCallback, (request) => {
            request.setRequestHeader("seq", "" + seqNum);
        });
    }

    export function postCall(url: string, seqNum?: number, sendData?: any,
        successCallback?: (data: any, seq?: number) => any,
        errorCallback?: (textStatus: string, errorThrown: string) => any) {
        if (!seqNum) {
            seqNum = DateTime.getTimeCount();
        }
        sendData = sendData || {};
        addAntiForgeryToken(sendData);

        apiCall(callTypes.POST, url, sendData, (data, textStatus, request) => {
            var seq = parseInt(request.getResponseHeader("seq"));
            if (successCallback) {
                successCallback(data, seq);
            }
        }, errorCallback, (request) => {
            request.setRequestHeader("seq", "" + seqNum);
        });
    }

    

}