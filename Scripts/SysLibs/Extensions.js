var _this = this;
String.prototype.replaceAll = function (str1, str2, ignore) {
    return _this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), (ignore ? "gi" : "g")), (typeof (str2) == "string") ? str2.replace(/\$/g, "$$$$") : str2);
};
//# sourceMappingURL=Extensions.js.map