
System.AddAntiForgeryToken = function (data) {
    data.__RequestVerificationToken = $('input[name="__RequestVerificationToken"]').val();
    return data;
};


System.ApiCall = function (type, url, sendData, successCallback, errorCallback, beforeSend) {
    var cntPiece = "Cnt=" + System.GetTimeCount();
    if (url.indexOf("?") != -1) {
        cntPiece = "&" + cntPiece;
    } else {
        cntPiece = "?" + cntPiece;
    }
    url = url.replace(System.VirtualURL(), "");
    if (url.lastIndexOf("/", 0) === 0) {
        url = url.substring(1);
    }
    $.ajax({
        url: System.ApplicationURL() + url + cntPiece,
        beforeSend: function (request) {
            if (beforeSend) {
                beforeSend(request);
            }
            //request.setRequestHeader("Authority", authorizationToken);
        },
        type: type,
        data: sendData,
        success: function (data, textStatus, request) {
            if (successCallback) {
                successCallback(data, textStatus, request);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (errorCallback) {
                errorCallback(textStatus, errorThrown);
            }
        },
        dataType: "json"
    });
}

System.getCall = function (url, seqNum, successCallback, errorCallback) {
    if (!seqNum) {
        seqNum = System.GetTimeCount();
    }
    System.ApiCall("GET", url, null, function (data, textStatus, request) {
        var seq = parseInt(request.getResponseHeader("seq"));
        if (successCallback) {
            successCallback(data, seq);
        }
    }, errorCallback, function (request) {
        request.setRequestHeader("seq", seqNum);
    });
};

System.putCall = function (url, seqNum, sendData, successCallback, errorCallback) {
    if (!seqNum) {
        seqNum = System.GetTimeCount();
    }
    sendData = sendData || {};
    System.AddAntiForgeryToken(sendData);

    System.ApiCall("PUT", url, sendData, function (data, textStatus, request) {
        var seq = parseInt(request.getResponseHeader("seq"));

        if (successCallback) {
            successCallback(data, seq);
        }
    }, errorCallback, function (request) {
        request.setRequestHeader("seq", seqNum);
    });
};

System.postCall = function (url, seqNum, sendData, successCallback, errorCallback) {
    if (!seqNum) {
        seqNum = System.GetTimeCount();
    }
    sendData = sendData || {};
    System.AddAntiForgeryToken(sendData);

    System.ApiCall("POST", url, sendData, function (data, textStatus, request) {
        var seq = parseInt(request.getResponseHeader("seq"));
        if (successCallback) {
            successCallback(data, seq);
        }
    }, errorCallback, function (request) {
        request.setRequestHeader("seq", seqNum);
    });
};




System.AutoSaveForm = function (form, beforeSave, afterResponse) {
    $(form).each(function (i) {
        var t = $(this);
        $(t).before("<div class='saveDisplay" + i + "' style=''>&nbsp;</div>");
        setInterval(function () {
            var post_url = $(t).attr("action");
            if (post_url.indexOf("Format=") >= 0) {
                post_url = post_url.replace("Format=PartialHTML", "Format=JSON");
                post_url = post_url.replace("Format=CleanHTML", "Format=JSON");
            } else {
                if (post_url.indexOf("?") >= 0) {
                    post_url = post_url + '&Format=JSON';
                } else {
                    post_url = post_url + '?Format=JSON';
                }
            }
            $(t).find(".CSSEditorArea").each(function (i) {
                var it = $(this);
                $(it).val(editAreaLoader.getValue($(it).attr("id")));
            });
            $(t).find(".JSEditorArea").each(function (i) {
                var it = $(this);
                $(it).val(editAreaLoader.getValue($(it).attr("id")));
            });
            $(t).find(".HTMLEditorArea").each(function (i) {
                var it = $(this);
                var editor = $(it).ckeditorGet();
                $(it).val(editor.getData());
            });
            if (beforeSave) {
                if (!beforeSave(t)) {
                    return;
                }
            }
            var form_data = $(t).serialize();
            System.postCall(post_url, null, form_data, function (data, status) {
                if (afterResponse) {
                    afterResponse(t, data.Item, data.IsError);
                }
            });
        }, 30000);
    });
};

System.AjaxPostForm = function (form, afterResponse) {
    //$(form).find("input[type='submit']").button('disable');
    var clickUrl = $(form).attr("action");
    if (clickUrl.indexOf("Format=") >= 0) {
        clickUrl = clickUrl.replace("Format=PartialHTML", "Format=JSON");
        clickUrl = clickUrl.replace("Format=CleanHTML", "Format=JSON");
    } else {
        if (clickUrl.indexOf("?") >= 0) {
            clickUrl = clickUrl + '&Format=JSON';
        } else {
            clickUrl = clickUrl + '?Format=JSON';
        }
    }
    var form_data = $(form).serialize();
    System.postCall(clickUrl, null, form_data, function (data, status) {
        if (afterResponse) {
            afterResponse(form, data);
        }
    });
};

System.AddAjaxFormSubmit = function (form, beforeSubmit, afterResponse) {
    $(form).submit(function (evt) {
        evt.preventDefault();
        var clickedItem = this;
        if (beforeSubmit) {
            if (beforeSubmit(clickedItem)) {
                return;
            }
        }
        $(form).find("input[type='submit'],button[type='submit']").button('disable');
        var clickUrl = $(form).attr("action");
        if (clickUrl.indexOf("Format=") >= 0) {
            clickUrl = clickUrl.replace("Format=PartialHTML", "Format=JSON");
            clickUrl = clickUrl.replace("Format=CleanHTML", "Format=JSON");
        } else {
            if (clickUrl.indexOf("?") >= 0) {
                clickUrl = clickUrl + '&Format=JSON';
            } else {
                clickUrl = clickUrl + '?Format=JSON';
            }
        }
        var form_data = $(this).serialize();
        System.postCall(clickUrl, null, form_data, function (data, status) {
            if (afterResponse) {
                afterResponse(clickedItem, data);
            }
            $(form).find("input[type='submit'],button[type='submit']").button('enable');
        });
    });
};
System.AddAjaxClickGet = function (item, beforeSubmit, afterResponse) {
    $(item).click(function (evt) {
        if (!evt.isDefaultPrevented()) {
            evt.preventDefault();
            var clickedItem = this;
            if (beforeSubmit) {
                if (beforeSubmit(clickedItem)) {
                    return;
                }
            }
            var clickUrl = $(this).attr("href");
            if (clickUrl.indexOf("Format=") >= 0) {
                clickUrl = clickUrl.replace("Format=PartialHTML", "Format=JSON");
                clickUrl = clickUrl.replace("Format=CleanHTML", "Format=JSON");
            } else {
                if (clickUrl.indexOf("?") >= 0) {
                    clickUrl = clickUrl + '&Format=JSON';
                } else {
                    clickUrl = clickUrl + '?Format=JSON';
                }
            }
            System.getCall(clickUrl, null, function (data, status) {
                if (afterResponse) {
                    afterResponse(clickedItem, data);
                }
            });
        }
    });
};
System.AjaxPost = function (item, afterResponse) {
    var clickUrl = $(item).attr("href");
    if (clickUrl.indexOf("Format=") >= 0) {
        clickUrl = clickUrl.replace("Format=PartialHTML", "Format=JSON");
        clickUrl = clickUrl.replace("Format=CleanHTML", "Format=JSON");
    } else {
        if (clickUrl.indexOf("?") >= 0) {
            clickUrl = clickUrl + '&Format=JSON';
        } else {
            clickUrl = clickUrl + '?Format=JSON';
        }
    }
    System.postCall(clickUrl, null, null, function (data, status) {
        if (afterResponse) {
            afterResponse(item, data);
        }
    });
};
System.AddClickPostForm = function (item, beforeSubmit) {
    $(item).click(function (evt) {
        if (!evt.isDefaultPrevented()) {
            evt.preventDefault();
            var clickedItem = this;
            var clickUrl = $(clickedItem).attr("href");
            System.lastDialogNumber = System.lastDialogNumber + 1;
            var dialogNum = System.lastDialogNumber;

            $(document.body).append("<form  id='globalPopUpDialog_" + dialogNum + "' action='" + clickUrl + "' method='post'></form>");
            var form = $("#globalPopUpDialog_" + dialogNum + "");
            if (beforeSubmit) {
                if (beforeSubmit(clickedItem, form)) {
                    return;
                }
            }

            $(form).submit();
        }
    });
};
System.AddAjaxClickPost = function (item, beforeSubmit, afterResponse) {
    $(item).click(function (evt) {
        if (!evt.isDefaultPrevented()) {
            evt.preventDefault();
            var clickedItem = this;
            if (beforeSubmit) {
                if (beforeSubmit(clickedItem)) {
                    return;
                }
            }
            System.AjaxPost(clickedItem, afterResponse);
        }
    });
};