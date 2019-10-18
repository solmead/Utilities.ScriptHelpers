
System.scripts = document.getElementsByTagName('script');
System.lastScript = System.scripts[System.scripts.length - 1];
System.scriptName = System.lastScript.src;
System.sitepath = System.scriptName.replace("/Scripts/libs/SiteUrlInfo.js", "/");
System.sitepathBIndex = System.sitepath.indexOf("/bundles/");
if (System.sitepathBIndex > 0) {
    System.sitepath = System.sitepath.substring(0, System.sitepath.indexOf("/bundles/")) + "/";
}

System.VirtualURL = function () {
    var base = window.location.protocol + "//" + window.location.host + "/";
    return System.sitepath.replace(base, "");
};
System.ApplicationURL = function () {
    return System.sitepath;
};

System.IsCleanHTML = function () {
    var t = window.location.pathname + window.location.search;
    return (t.indexOf("Format=CleanHtml") > -1)
}

System.RefreshPage = function () {
    System.Redirect(System.GetFullURL(window.location.pathname + window.location.search));
    //location.reload(true);
};


System.getParameterByName = function (name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};


System.GetFullURL = function (url) {
    var cntPiece = "Cnt=" + System.GetTimeCount();
    if (url.indexOf("?") != -1) {
        cntPiece = "&" + cntPiece;
    } else {
        cntPiece = "?" + cntPiece;
    }
    return System.ApplicationURL() + url + cntPiece;
}


System.Redirect = function (url) {
    window.location.href = url;
};
