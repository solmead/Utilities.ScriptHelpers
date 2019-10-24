var Grid;
(function (Grid) {
    class AddButtonSettings {
        constructor(addButtonInFoot = true, attachAddPrePend = false, elementToAttachAdd = null, btnClass = "") {
            this.addButtonInFoot = addButtonInFoot;
            this.attachAddPrePend = attachAddPrePend;
            this.elementToAttachAdd = elementToAttachAdd;
            this.btnClass = btnClass;
        }
    }
    Grid.AddButtonSettings = AddButtonSettings;
    class DynamicGrid {
        constructor(tableRef, name, prePendButtons = true, addButtonSettings = new AddButtonSettings()) {
            this.tableRef = tableRef;
            this.name = name;
            this.prePendButtons = prePendButtons;
            this.addButtonSettings = addButtonSettings;
            this.onInit = new Tasks.EventHandler();
            this.onAdd = new Tasks.EventHandler();
            this.onRemove = new Tasks.EventHandler();
            this.rowCount = 0;
            this.init = async () => {
                await Tasks.whenReady();
                this.table = $(this.tableRef);
                this.safeName = this.name.replace(/\s+/g, '');
                if (this.prePendButtons) {
                    this.table.find("thead>tr").prepend("<th></th>");
                    this.table.find("tbody>tr").prepend("<td class='removeColumn'><a href=\"#\" class=\"removeButton btn btn-danger\"><span class='glyphicon glyphicon-minus'></span> delete</a></td>");
                }
                else {
                    this.table.find("thead>tr").append("<th></th>");
                    this.table.find("tbody>tr").append("<td class='removeColumn'><a href=\"#\" class=\"removeButton btn btn-danger\"><span class='glyphicon glyphicon-minus'></span> delete</a></td>");
                }
                this.table.find("tbody>tr.locked .removeColumn").html("");
                if (this.addButtonSettings.addButtonInFoot) {
                    if (!(this.table.find("tfoot").length > 0)) {
                        var columns = this.table.find("tbody>tr:first-child").children().length - 1;
                        if (columns < 1) {
                            columns = this.table.find("tr:first-child").children().length - 1;
                        }
                        this.table.append("<tfoot><tr><th></th>" + ((columns - 2) > 0 ? "<th colspan='" + (columns - 2) + "'></th>" : "") + ((columns - 1) > 0 ? "<th></th>" : "") + "</tr></tfoot>");
                    }
                    var isTd = (this.table.find("tfoot tr td:first-child").length > 0);
                    if (isTd) {
                        if (this.prePendButtons) {
                            this.table.find("tfoot tr td:first-child").remove();
                            this.table.find("tfoot tr").prepend("<td colspan='2'><a href=\"#\" class=\"addButton btn btn-primary " + this.addButtonSettings.btnClass + "\"><span class='glyphicon glyphicon-plus'></span> add new " + this.name + "</a></td>");
                        }
                        else {
                            this.table.find("tfoot tr td:last-child").remove();
                            this.table.find("tfoot tr").append("<td colspan='2'><a href=\"#\" class=\"addButton btn btn-primary " + this.addButtonSettings.btnClass + "\"><span class='glyphicon glyphicon-plus'></span> add new " + this.name + "</a></td>");
                        }
                    }
                    else {
                        if (this.prePendButtons) {
                            this.table.find("tfoot tr th:first-child").remove();
                            this.table.find("tfoot tr").prepend("<th colspan='2'><a href=\"#\" class=\"addButton btn btn-primary " + this.addButtonSettings.btnClass + "\"><span class='glyphicon glyphicon-plus'></span> add new " + this.name + "</a></th>");
                        }
                        else {
                            this.table.find("tfoot tr th:last-child").remove();
                            this.table.find("tfoot tr").append("<th colspan='2'><a href=\"#\" class=\"addButton btn btn-primary " + this.addButtonSettings.btnClass + "\"><span class='glyphicon glyphicon-plus'></span> add new " + this.name + "</a></th>");
                        }
                    }
                    //table.find("tfoot tr .frm_AddButton").button();
                    this.table.find("tfoot tr .addButton").click(this.onAddEvent);
                }
                else {
                    $(this.addButtonSettings.elementToAttachAdd).prepend("<a href='#' class='addButton btn btn-primary " + this.addButtonSettings.btnClass + " " + this.safeName + "' title='Add New " + this.name + "'><span class='glyphicon glyphicon-plus'></span> add new " + this.name + "</a>");
                    $(this.addButtonSettings.elementToAttachAdd).find(".addButton." + this.safeName + "").click(this.onAddEvent);
                }
                //table.find("tbody tr .frm_RemoveButton").button();
                this.table.find("tbody tr .removeButton").click(this.onRemoveEvent);
                this.rowCount = this.table.find("tbody tr").length;
                await Tasks.delay(100);
                this.onInit.trigger();
            };
            this.removeRow = (row) => {
                $(row).fadeOut(1000, () => {
                    $(row).remove();
                    this.onRemove.trigger(row);
                });
            };
            this.getRows = () => {
                return this.table.find("tbody tr");
            };
            this.hideAdd = (msg) => {
                if (!(msg == "" || msg == null)) {
                    this.table.find("tfoot tr th:first-child").append("<div class='alert alert-danger'>" + msg + "</div>");
                }
                this.table.find("tfoot .addButton").hide();
            };
            this.showAdd = () => {
                this.table.find("tfoot .alert").remove();
                this.table.find("tfoot .addButton").show();
            };
            this.onAddEvent = (evt) => {
                if (evt != null) {
                    evt.preventDefault();
                }
                Html.htmlBegin();
                this.onAdd.trigger(this.rowCount);
                this.rowCount = this.rowCount + 1;
                Html.htmlEnd(this.table.find("tbody"));
                if (this.prePendButtons) {
                    this.table.find("tbody tr:last-child").prepend("<td class='removeColumn'><a href=\"#\" class=\"removeButton btn btn-danger\"><span class='glyphicon glyphicon-minus'></span> delete</a></td>");
                }
                else {
                    this.table.find("tbody tr:last-child").append("<td class='removeColumn'><a href=\"#\" class=\"removeButton  btn btn-danger\"><span class='glyphicon glyphicon-minus'></span> delete</a></td>");
                }
                this.table.find("tbody tr:last-child .removeButton").click(this.onRemoveEvent);
            };
            this.onRemoveEvent = (evt) => {
                if (evt != null) {
                    evt.preventDefault();
                }
                var item = evt.currentTarget;
                this.removeRow($(item).parents("tr"));
            };
            this.init();
        }
    }
    Grid.DynamicGrid = DynamicGrid;
})(Grid || (Grid = {}));
//# sourceMappingURL=DynamicGrid.js.map