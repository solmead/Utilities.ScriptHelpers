

module ApiLibrary {

    export enum callTypes {
        GET,
        PUT,
        POST
    }


    export function addDataToUrl(url: string, name: string, value: string): string {
        if (url.indexOf(name + "=") >= 0) {
            url = url.replace(name + "=", name + "Old=");
        }

        if (url.indexOf("?") >= 0) {
            url = url + '&' + name + '=' + value;
        } else {
            url = url + '?' + name + '=' + value;
        }

        return url;
    }
    export function addFormatToUrl(url: string): string {
        return addDataToUrl(url, "Format", "JSON");
    }

    export function addAntiForgeryToken(data: any) {
        //var token = $('input[name="__RequestVerificationToken"]').val();
        //if (token != null && token != "") {
        //    data.__RequestVerificationToken = token;
        //}

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
        var fUrl = url + cntPiece;
        if (url.indexOf("://") <= 0) {
            if (url.indexOf(SiteInfo.virtualUrl()) == 0) {
                url = url.replace(SiteInfo.virtualUrl(), "");
            }
            if (url.lastIndexOf("/", 0) === 0) {
                url = url.substring(1);
            }
            if (url.indexOf(SiteInfo.virtualUrl()) == 0) {
                url = url.replace(SiteInfo.virtualUrl(), "");
            }
            fUrl = SiteInfo.getVirtualURL(url) + cntPiece;
        }

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