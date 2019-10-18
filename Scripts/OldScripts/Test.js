/// <reference path="../jquery-2.2.2.js" />
/// <reference path="../jquery-ui-1.11.4.js" />
/// <reference path="../SysLibs/Tasks.js" />
/// <reference path="../SysLibs/JqueryExtensions.js" />



var t = new Tasks.Task(function(callback) {
    //do something
    callback();
});

t.Then(function(callback) {
    //do something
    callback();
}).Then(function(callback) {
    //do something
    callback();
}).Then(function(callback) {
    //do something
    callback();
});

$("test").onSubmitUseAjax(System.createAjaxOptions(null, function (item, data) {
    
}));
