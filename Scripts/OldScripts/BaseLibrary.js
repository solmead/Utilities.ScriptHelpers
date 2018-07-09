
var System = System || {};


System.AddRemoveSystem2 = function (options) {
	var obj = {};

	var defaults = {
		Area: "",
		Name: "",
		AddNewCallback: null,
		RemoveCallback: null,
		InitilizedCallback: null,
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
	var _isSetup = false;

	obj = {
		isSetup: function () {
			return _isSetup;
		},
		init: function () {
			table = $(settings.Area);
			if (settings.PrePendButtons) {
				table.find("thead>tr").prepend("<th></th>");
				table.find("tbody>tr").prepend("<td class='removeColumn'><a href=\"#\" class=\"removeButton btn btn-danger\"><span class='glyphicon glyphicon-minus'></span> delete</a></td>");
			} else {
				table.find("thead>tr").append("<th></th>");
				table.find("tbody>tr").append("<td class='removeColumn'><a href=\"#\" class=\"removeButton btn btn-danger\"><span class='glyphicon glyphicon-minus'></span> delete</a></td>");
			}
			table.find("tbody>tr.locked .removeColumn").html("");
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
						table.find("tfoot tr").prepend("<td colspan='2'><a href=\"#\" class=\"addButton btn btn-primary\"><span class='glyphicon glyphicon-plus'></span> add new " + settings.Name + "</a></td>");
					} else {
						table.find("tfoot tr td:last-child").remove();
						table.find("tfoot tr").append("<td colspan='2'><a href=\"#\" class=\"addButton btn btn-primary\"><span class='glyphicon glyphicon-plus'></span> add new " + settings.Name + "</a></td>");
					}
				} else {
					if (settings.PrePendButtons) {
						table.find("tfoot tr th:first-child").remove();
						table.find("tfoot tr").prepend("<th colspan='2'><a href=\"#\" class=\"addButton btn btn-primary\"><span class='glyphicon glyphicon-plus'></span> add new " + settings.Name + "</a></th>");
					} else {
						table.find("tfoot tr th:last-child").remove();
						table.find("tfoot tr").append("<th colspan='2'><a href=\"#\" class=\"addButton btn btn-primary\"><span class='glyphicon glyphicon-plus'></span> add new " + settings.Name + "</a></th>");
					}
				}
				//table.find("tfoot tr .frm_AddButton").button();
				table.find("tfoot tr .addButton").click(obj.AddEvent);
			} else {
				if (settings.AttachAddPrePend) {
					$(settings.ElementToAttachAdd).prepend("<a href='#' class='addButton btn btn-primary " + settings.BaseClass + " " + safeName + "' title='Add New " + settings.Name + "'><span class='glyphicon glyphicon-plus'></span> add new " + settings.Name + "</a>");
				} else {
					$(settings.ElementToAttachAdd).append("<a href='#' class='addButton btn btn-primary " + settings.BaseClass + " " + safeName + "' title='Add New " + settings.Name + "'><span class='glyphicon glyphicon-plus'></span> add new " + settings.Name + "</a>");
				}
				//$(settings.ElementToAttachAdd).find(".frm_AddButton." + safeName + "").button();
				$(settings.ElementToAttachAdd).find(".addButton." + safeName + "").click(obj.AddEvent);
			}
			//table.find("tbody tr .frm_RemoveButton").button();
			table.find("tbody tr .removeButton").click(obj.RemoveEvent);
			cnt = table.find("tbody tr").length;
			_isSetup = true;
			if (settings.InitilizedCallback) {
				settings.InitilizedCallback();
			}
		},
		HideAdd: function (msg) {
			table.find("tfoot tr th:first-child").append("<div class='alert alert-danger'>" + msg + "</div>")
			table.find("tfoot .addButton").hide();
		},
		ShowAdd: function () {
			table.find("tfoot .alert").remove();
			table.find("tfoot .addButton").show();
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
					table.find("tbody tr:last-child").prepend("<td class='removeColumn'><a href=\"#\" class=\"removeButton btn btn-danger\"><span class='glyphicon glyphicon-minus'></span> delete</a></td>");
				} else {
					table.find("tbody tr:last-child").append("<td class='removeColumn'><a href=\"#\" class=\"removeButton  btn btn-danger\"><span class='glyphicon glyphicon-minus'></span> delete</a></td>");
				}
				//table.find("tbody tr:last-child .frm_RemoveButton").button();
				table.find("tbody tr:last-child .removeButton").click(obj.RemoveEvent);
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
		CreateIndex: function (preName, index, classes) {
			var fieldName = preName + ".Index";
			var idName = fieldName.replaceAll(".", "_").replaceAll("[", "_").replaceAll("]", "_");
			return "<input class=\" " + classes + "\" id=\"" + idName + "\" name=\"" + fieldName + "\" type=\"hidden\" value=\"" + index + "\" />\n\r";
		}
	};
	$(function () {
		obj.init();
	});
	return obj;
};

