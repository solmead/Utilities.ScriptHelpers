var ApiLibrary;
(function (ApiLibrary) {
    var callTypes;
    (function (callTypes) {
        callTypes[callTypes["GET"] = 0] = "GET";
        callTypes[callTypes["PUT"] = 1] = "PUT";
        callTypes[callTypes["POST"] = 2] = "POST";
    })(callTypes = ApiLibrary.callTypes || (ApiLibrary.callTypes = {}));
    function addFormatToUrl(url) {
        if (url.indexOf("Format=") >= 0) {
            url = url.replace("Format=PartialHTML", "Format=JSON");
            url = url.replace("Format=CleanHTML", "Format=JSON");
        }
        else {
            if (url.indexOf("?") >= 0) {
                url = url + '&Format=JSON';
            }
            else {
                url = url + '?Format=JSON';
            }
        }
        return url;
    }
    ApiLibrary.addFormatToUrl = addFormatToUrl;
    function addAntiForgeryToken(data) {
        data.__RequestVerificationToken = $('input[name="__RequestVerificationToken"]').val();
        return data;
    }
    ApiLibrary.addAntiForgeryToken = addAntiForgeryToken;
    function apiCall(type, url, sendData, successCallback, errorCallback, beforeSend) {
        var cntPiece = "Cnt=" + DateTime.getTimeCount();
        if (url.indexOf("?") != -1) {
            cntPiece = "&" + cntPiece;
        }
        else {
            cntPiece = "?" + cntPiece;
        }
        url = url.replace(SiteInfo.virtualUrl(), "");
        if (url.lastIndexOf("/", 0) === 0) {
            url = url.substring(1);
        }
        var fUrl = SiteInfo.applicationUrl() + url + cntPiece;
        $.ajax({
            url: fUrl,
            beforeSend: function (request) {
                if (beforeSend) {
                    beforeSend(request);
                }
                //request.setRequestHeader("Authority", authorizationToken);
            },
            type: callTypes[type],
            data: sendData,
            success: successCallback,
            error: function (jqXHR, textStatus, errorThrown) {
                if (errorCallback) {
                    errorCallback(textStatus, errorThrown);
                }
            },
            dataType: "json"
        });
    }
    ApiLibrary.apiCall = apiCall;
    function getCallAsync(url, seqNum) {
        return new Promise(function (resolve, reject) {
            getCall(url, seqNum, function (data, seq) {
                resolve(data);
            }, function (extStatus, errorThrown) {
                reject(Error(errorThrown));
            });
        });
    }
    ApiLibrary.getCallAsync = getCallAsync;
    function putCallAsync(url, seqNum, sendData) {
        return new Promise(function (resolve, reject) {
            putCall(url, seqNum, sendData, function (data, seq) {
                resolve(data);
            }, function (extStatus, errorThrown) {
                reject(Error(errorThrown));
            });
        });
    }
    ApiLibrary.putCallAsync = putCallAsync;
    function postCallAsync(url, seqNum, sendData) {
        return new Promise(function (resolve, reject) {
            postCall(url, seqNum, sendData, function (data, seq) {
                resolve(data);
            }, function (extStatus, errorThrown) {
                reject(Error(errorThrown));
            });
        });
    }
    ApiLibrary.postCallAsync = postCallAsync;
    //export function getCall(url: string,
    //    successCallback?: (data: any) => any,
    //    errorCallback?: (textStatus: string, errorThrown: string) => any) :void;
    function getCall(url, seqNum, successCallback, errorCallback) {
        if (!seqNum) {
            seqNum = DateTime.getTimeCount();
        }
        apiCall(callTypes.GET, url, null, function (data, textStatus, request) {
            var seq = parseInt(request.getResponseHeader("seq"));
            if (successCallback) {
                successCallback(data, seq);
            }
        }, errorCallback, function (request) {
            request.setRequestHeader("seq", "" + seqNum);
        });
    }
    ApiLibrary.getCall = getCall;
    function putCall(url, seqNum, sendData, successCallback, errorCallback) {
        if (!seqNum) {
            seqNum = DateTime.getTimeCount();
        }
        sendData = sendData || {};
        addAntiForgeryToken(sendData);
        apiCall(callTypes.PUT, url, sendData, function (data, textStatus, request) {
            var seq = parseInt(request.getResponseHeader("seq"));
            if (successCallback) {
                successCallback(data, seq);
            }
        }, errorCallback, function (request) {
            request.setRequestHeader("seq", "" + seqNum);
        });
    }
    ApiLibrary.putCall = putCall;
    function postCall(url, seqNum, sendData, successCallback, errorCallback) {
        if (!seqNum) {
            seqNum = DateTime.getTimeCount();
        }
        sendData = sendData || {};
        addAntiForgeryToken(sendData);
        apiCall(callTypes.POST, url, sendData, function (data, textStatus, request) {
            var seq = parseInt(request.getResponseHeader("seq"));
            if (successCallback) {
                successCallback(data, seq);
            }
        }, errorCallback, function (request) {
            request.setRequestHeader("seq", "" + seqNum);
        });
    }
    ApiLibrary.postCall = postCall;
})(ApiLibrary || (ApiLibrary = {}));
//# sourceMappingURL=APILibrary.js.map