
interface String {
    replaceAll(str1: string, str2: string, ignore?: boolean): string;
}


String.prototype.replaceAll = function (str1: string, str2: string, ignore?: boolean) {
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), (ignore ? "gi" : "g")), (typeof (str2) == "string") ? str2.replace(/\$/g, "$$$$") : str2);
};

