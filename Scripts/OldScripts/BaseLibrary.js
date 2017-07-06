
var System = System || {};

System.SetupOptGroups = function (select) {

	$(select).each(function(i, elem) {
		var optGroups = new Array();
		var i = 0;

		$(select).find("[optGroup]").each(function (index, domEle) {
			var optGroup = $(this).attr("optGroup");
			if ($.inArray(optGroup, optGroups) == -1) optGroups[i++] = optGroup;
		});

		for (i = 0; i < optGroups.length; i++) {
			$(select).find("[optGroup='" + optGroups[i] + "']").wrapAll("<optgroup label='" + optGroups[i] + "'>");
		}
	});

	
};


System.SetupTabs = function (tabAreas, hdnTabArea, onTabChanged) {
	$(".Tab_Controlled").hide();
	$(".Tab_Controlled.Tab_All").show();
	
	function tabChanged(tab, text) {
		var safeText = text.replace(/\W/g, '');
		//safeText = JSON.stringify(text).replace(/\W/g, '');
		$(hdnTabArea).val(tab);

		$(".Tab_Controlled").hide();
		$(".Tab_Controlled.Tab_All").show();
				
		if (onTabChanged) {
			onTabChanged(tab, text);
		}
		
		$(".Tab_Controlled.Tab_Not_" + safeText).hide();
		$(".Tab_Controlled.Tab_Not_" + tab).hide();
		$(".Tab_Controlled.Tab_" + safeText).show();
		$(".Tab_Controlled.Tab_" + tab).show();
	}
	$(tabAreas).tabs();
	$(tabAreas).tabs("option", "active", $(hdnTabArea).val());
			
	var selected = $(tabAreas).tabs("option", "selected");
	var selectedTabTitle = $($(tabAreas).find("li")[selected]).text();


	$(tabAreas).on("tabsactivate", function (event, ui) {
		var tab = ui.newTab.index();
		var text = $(ui.newTab).text();
		tabChanged(tab, text);
	});

	setTimeout(function() {
		tabChanged($(hdnTabArea).val(), selectedTabTitle);
	},1);
};

System.MakeComboBox = function (items, autoSizeWidth, autoSizeHeight, storeIn, attachToParent) {
	$(items).each(function () {
		var cb = $(this);
		System.SetupOptGroups(cb);
		var id = $(cb).attr("id");
		var newid = id + "_cb";
		var allowAny = false;
		if (storeIn) {
			allowAny = true;
		}
		$(cb).combobox({ classes: newid, autosizeWidth: autoSizeWidth, autosizeHeight: autoSizeHeight, allowAnyText: allowAny, storeIn: storeIn, attachToParent: attachToParent });
		var gen = $(".ui-combobox." + newid + " .ui-combobox-input");
		var anyData = false;

		//$.each($(cb).data(), function (i, v) {
		//    anyData = true;
		//    gen.attr("data-" + i, v);
		//});
		var re_dataAttr = /^data\-(.+)$/;
		$.each(cb.get(0).attributes, function (index, attr) {
			if (re_dataAttr.test(attr.nodeName)) {
				anyData = true;
				gen.attr(attr.nodeName, attr.nodeValue);
			}
		});
		if (anyData) {
			gen.attr("Id", newid);
			gen.attr("Name", newid);
			gen.parent().append("<span class='field-validation-valid' data-valmsg-for='" + newid + "' data-valmsg-replace='true'></span>");

			$("form")
				.removeData("validator")
				.removeData("unobtrusiveValidation");

			//Parse the form again
			$.validator
				.unobtrusive
				.parse("form");
		}
	})
};



System.AddRemoveItems = function (Area, Name, AddNewCall, RemoveCall) {
	return System.AddRemoveSystem({
		Area: Area,
		Name: Name,
		AddNewCallback: AddNewCall,
		RemoveCallback: RemoveCall
	});
};
System.AddRemoveSystem = function (options) {
    var obj = {};

    var defaults = {
        Area: "",
        Name: "",
        AddNewCallback: null,
        RemoveCallback: null,
        PrePendButtons: true,
        AttachAddToTable: true,
        ElementToAttachAdd: null,
        BaseClass: "",
        AttachAddPrePend: false
    };
    var settings = $.extend(true, {}, defaults, options);

    var safeName = settings.Name.replace(/\s+/g, '');
    var table = null;
    var cnt = 0;

    obj = {
        init: function () {
            table = $(settings.Area);
            if (settings.PrePendButtons) {
                table.find("thead>tr").prepend("<th></th>");
                table.find("tbody>tr").prepend("<td class='removeColumn'><a href=\"#\" class=\"frm_RemoveButton button\">delete</a></td>");
            } else {
                table.find("thead>tr").append("<th></th>");
                table.find("tbody>tr").append("<td class='removeColumn'><a href=\"#\" class=\"frm_RemoveButton button\">delete</a></td>");
            }
            if (settings.AttachAddToTable) {
                if (!(table.find("tfoot").length > 0)) {
                    var columns = table.find("tbody>tr:first-child").children().length - 1;
                    if (columns < 1) {
                        columns = table.find("tr:first-child").children().length - 1;
                    }
                    table.append("<tfoot><tr><th></th>" + ((columns - 2) > 0 ? "<th colspan='" + (columns - 2) + "'></th>" : "") + ((columns - 1) > 0 ? "<th></th>" : "") + "</tr></tfoot>");
                }
                var isTd = (table.find("tfoot tr td:first-child").length > 0);
                if (isTd) {
                    if (settings.PrePendButtons) {
                        table.find("tfoot tr td:first-child").remove();
                        table.find("tfoot tr").prepend("<td><a href=\"#\" class=\"frm_AddButton button\"></a></td><td><label>add new " + settings.Name + "</label></td>");
                    } else {
                        table.find("tfoot tr td:last-child").remove();
                        table.find("tfoot tr").append("<td><a href=\"#\" class=\"frm_AddButton button\"></a></td><td><label>add new " + settings.Name + "</label></td>");
                    }
                } else {
                    if (settings.PrePendButtons) {
                        table.find("tfoot tr th:first-child").remove();
                        table.find("tfoot tr").prepend("<th><a href=\"#\" class=\"frm_AddButton button\"></a></th><th><label>add new " + settings.Name + "</label></th>");
                    } else {
                        table.find("tfoot tr th:last-child").remove();
                        table.find("tfoot tr").append("<th><label>add new " + name + "</label></th><th><a href=\"#\" class=\"frm_AddButton button\"></a></th>");
                    }
                }
                table.find("tfoot tr .frm_AddButton").button();
                table.find("tfoot tr .frm_AddButton").click(obj.AddEvent);
            } else {
                if (settings.AttachAddPrePend) {
                    $(settings.ElementToAttachAdd).prepend("<a href='#' class='frm_AddButton button " + settings.BaseClass + " " + safeName + "' title='Add New " + settings.Name + "'>add new " + settings.Name + "</a>");
                } else {
                    $(settings.ElementToAttachAdd).append("<a href='#' class='frm_AddButton button " + settings.BaseClass + " " + safeName + "' title='Add New " + settings.Name + "'>add new " + settings.Name + "</a>");
                }
                $(settings.ElementToAttachAdd).find(".frm_AddButton." + safeName + "").button();
                $(settings.ElementToAttachAdd).find(".frm_AddButton." + safeName + "").click(obj.AddEvent);
            }
            table.find("tbody tr .frm_RemoveButton").button();
            table.find("tbody tr .frm_RemoveButton").click(obj.RemoveEvent);
            cnt = table.find("tbody tr").length;
        },
        GetRows: function () {
            return table.find("tbody tr");
        },
        RemoveRow: function (row) {
            $(row).fadeOut(1000, function () {
                $(row).remove();
                if (settings.RemoveCallback) {
                    settings.RemoveCallback(table.find("tbody"));
                }
            });
        },
        RemoveEvent: function (evt) {
            if (evt != null) {
                evt.preventDefault();
            }
            var item = this;
            obj.RemoveRow($(item).parents("tr"));
        },
        AddEvent: function (evt) {
            if (evt != null) {
                evt.preventDefault();
            }
            if (settings.AddNewCallback) {
                settings.AddNewCallback(table.find("tbody"), cnt);
                cnt = cnt + 1;

                if (settings.PrePendButtons) {
                    table.find("tbody tr:last-child").prepend("<td class='removeColumn'><a href=\"#\" class=\"frm_RemoveButton button\">delete</a></td>");
                } else {
                    table.find("tbody tr:last-child").append("<td class='removeColumn'><a href=\"#\" class=\"frm_RemoveButton button\">delete</a></td>");
                }
                table.find("tbody tr:last-child .frm_RemoveButton").button();
                table.find("tbody tr:last-child .frm_RemoveButton").click(obj.RemoveEvent);
            }
        },
        CreateDisplay: function (text, cssclass) {
            if (!cssclass) {
                cssclass = "";
            }
            return "<span class='" + cssclass + "'>" + text + "</span>\n\r";
        },
        CreateHidden: function (preName, index, itemName, value, cssclass) {
            if (!cssclass) {
                cssclass = "";
            }
            if (value == null) {
                value = "";
            }
            var fieldName = preName + "[" + index + "]." + itemName;
            var idName = fieldName.replaceAll(".", "_").replaceAll("[", "_").replaceAll("]", "_");
            return "<input class='" + cssclass + "' id=\"" + idName + "\" name=\"" + fieldName + "\" type=\"hidden\" value='" + value + "' tag='" + itemName + "'/>\n\r";

        },
        CreateDropDown: function (preName, index, itemName, values, cssclass) {
            if (!cssclass) {
                cssclass = "";
            }
            var fieldName = preName + "[" + index + "]." + itemName;
            var idName = fieldName.replaceAll(".", "_").replaceAll("[", "_").replaceAll("]", "_");
            var tstr = '<select class="drop-down ' + cssclass + '" id="' + idName + '" name="' + fieldName + '" tag="' + itemName + '">';
            $.each(values, function (i, item) {
                tstr = tstr + '<option ' + ((i == 0) ? 'selected="selected" ' : '') + 'value="' + item.value + '">' + item.text + '</option>';
            });
            tstr = tstr + '</select>';
            return tstr;
        },
        CreateCheckBox: function (preName, index, itemName, checked) {
            var fieldName = preName + "[" + index + "]." + itemName;
            var idName = fieldName.replaceAll(".", "_").replaceAll("[", "_").replaceAll("]", "_");
            var tstr = "<input class=\"check-box single-line\" id=\"" + idName + "\" name=\"" + fieldName + "\" type=\"checkbox\" value=\"true\" tag='" + itemName + "'";
            if (checked) {
                tstr = tstr + " checked='checked'";
            }
            tstr = tstr + "/>\n\r";
            tatr = tstr + "<input name=\"" + fieldName + "\" type=\"hidden\" value=\"false\" tag='" + itemName + "'/>\n\r";
            return tstr;
        },
        CreateTextArea: function (preName, index, itemName, value, extra, classes) {
            if (extra == null) {
                extra = "";
            }
            if (value == null) {
                value = "";
            }
            if (classes == null) {
                classes = "";
            }
            var fieldName = preName + "[" + index + "]." + itemName;
            var idName = fieldName.replaceAll(".", "_").replaceAll("[", "_").replaceAll("]", "_");
            return "<textarea class=\"text-box multi-line " + classes + "\" id=\"" + idName + "\" name=\"" + fieldName + "\" tag='" + itemName + "' " + extra + " >" + value + "</textarea>\n\r";
        },
        CreateTextBox: function (preName, index, itemName, value, extra, classes) {
            if (!classes) {
                classes = "";
            }
            if (!extra) {
                extra = "";
            }
            if (!value) {
                value = "";
            }
            var fieldName = preName + "[" + index + "]." + itemName;
            var idName = fieldName.replaceAll(".", "_").replaceAll("[", "_").replaceAll("]", "_");
            return "<input class=\"text-box single-line " + classes + "\" id=\"" + idName + "\" name=\"" + fieldName + "\" type=\"text\" value=\"" + value + "\" tag='" + itemName + "' " + extra + " />\n\r";
            //return "<input class='text-box single-line  " + cssclass + "' id='" + idName + "' name='" + fieldName + "' type='text' value='' tag='" + itemName + "'/>\n\r";
        },
        CreateFile: function (preName, index, itemName, value, extra, classes) {
            if (!classes) {
                classes = "";
            }
            if (!extra) {
                extra = "";
            }
            if (!value) {
                value = "";
            }
            var fieldName = preName + "[" + index + "]." + itemName;
            var idName = fieldName.replaceAll(".", "_").replaceAll("[", "_").replaceAll("]", "_");
            return "<input class=\" " + classes + "\" id=\"" + idName + "\" name=\"" + fieldName + "\" type=\"file\" tag='" + itemName + "' " + extra + " />\n\r";
            //return "<input class='text-box single-line  " + cssclass + "' id='" + idName + "' name='" + fieldName + "' type='text' value='' tag='" + itemName + "'/>\n\r";
        },
        CreateIndex: function (preName, index) {
            var fieldName = preName + ".Index";
            var idName = fieldName.replaceAll(".", "_").replaceAll("[", "_").replaceAll("]", "_");
            return "<input id=\"" + idName + "\" name=\"" + fieldName + "\" type=\"hidden\" value=\"" + index + "\" />\n\r";
        }
    };
    $(function () {
        obj.init();
    });
    return obj;
};


System.onSilverlightError = function(sender, args) {
	var appSource = "";
	if (sender != null && sender != 0) {
		appSource = sender.getHost().Source;
	}

	var errorType = args.ErrorType;
	var iErrorCode = args.ErrorCode;

	if (errorType == "ImageError" || errorType == "MediaError") {
		return;
	}

	var errMsg = "Unhandled Error in Silverlight Application " + appSource + "\n";

	errMsg += "Code: " + iErrorCode + "    \n";
	errMsg += "Category: " + errorType + "       \n";
	errMsg += "Message: " + args.ErrorMessage + "     \n";

	if (errorType == "ParserError") {
		errMsg += "File: " + args.xamlFile + "     \n";
		errMsg += "Line: " + args.lineNumber + "     \n";
		errMsg += "Position: " + args.charPosition + "     \n";
	} else if (errorType == "RuntimeError") {
		if (args.lineNumber != 0) {
			errMsg += "Line: " + args.lineNumber + "     \n";
			errMsg += "Position: " + args.charPosition + "     \n";
		}
		errMsg += "MethodName: " + args.methodName + "     \n";
	}

	throw new Error(errMsg);
};
System.FillValue = function(Value, Item) {
	$(Item).append(Value);
	System.ShowHideParent((Value != ""), Item);
};
System.ShowHideParent = function(Value, Item) {
	if (Value) {
		$(Item).parent().show();
	} else {
		$(Item).parent().hide();
	}
};
System.fakeClick = function(id, fn) {
	var $a = $('<a href="#" id="fakeClick_' + id + '"></a>');
	$a.bind("click", function(e) {
		e.preventDefault();
		fn();
	});

	$("body").append($a);


	var evt, el = $('#fakeClick_' + id + '').get(0);

	if (document.createEvent) {
		evt = document.createEvent("MouseEvents");
		if (evt.initMouseEvent) {
			evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			el.dispatchEvent(evt);
		}
	}

	$(el).remove();
};

System.IsIphone = function() {
	var IsI = ((navigator.userAgent.indexOf('iPhone') > 0) || (navigator.userAgent.indexOf('iPod') > 0) || (navigator.userAgent.indexOf('iPad') > 0));
	return IsI;
};


System.IsIpad = function() {

	var IsI = ((navigator.userAgent.indexOf('iPad') > 0));
	return IsI;
};

