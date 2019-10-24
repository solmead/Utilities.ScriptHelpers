


module Grid
{
    export class AddButtonSettings {
        constructor(public addButtonInFoot = true,
            public attachAddPrePend = false,
            public elementToAttachAdd: JQuery = null,
            public btnClass:string="") {
            
        }
    }

    export class DynamicGrid {

        public onInit = new Tasks.EventHandler();
        public onAdd = new Tasks.EventHandler();
        public onRemove = new Tasks.EventHandler();
        public table: JQuery;
        private safeName: string;
        private rowCount = 0;


        constructor(public tableRef: string | JQuery,
            public name:string,
            public prePendButtons = true,
            public addButtonSettings: AddButtonSettings = new AddButtonSettings()) {

            this.init();

        }

        private init = async() => {
            await Tasks.whenReady();
            this.table = $(this.tableRef);

            this.safeName = this.name.replace(/\s+/g, '');

            if (this.prePendButtons) {
                this.table.find("thead>tr").prepend("<th></th>");
                this.table.find("tbody>tr").prepend("<td class='removeColumn'><a href=\"#\" class=\"removeButton btn btn-danger\"><span class='glyphicon glyphicon-minus'></span> delete</a></td>");
            } else {
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
                    } else {
                        this.table.find("tfoot tr td:last-child").remove();
                        this.table.find("tfoot tr").append("<td colspan='2'><a href=\"#\" class=\"addButton btn btn-primary " + this.addButtonSettings.btnClass + "\"><span class='glyphicon glyphicon-plus'></span> add new " + this.name + "</a></td>");
                    }
                } else {
                    if (this.prePendButtons) {
                        this.table.find("tfoot tr th:first-child").remove();
                        this.table.find("tfoot tr").prepend("<th colspan='2'><a href=\"#\" class=\"addButton btn btn-primary " + this.addButtonSettings.btnClass + "\"><span class='glyphicon glyphicon-plus'></span> add new " + this.name + "</a></th>");
                    } else {
                        this.table.find("tfoot tr th:last-child").remove();
                        this.table.find("tfoot tr").append("<th colspan='2'><a href=\"#\" class=\"addButton btn btn-primary " + this.addButtonSettings.btnClass + "\"><span class='glyphicon glyphicon-plus'></span> add new " + this.name + "</a></th>");
                    }
                }
                //table.find("tfoot tr .frm_AddButton").button();
                this.table.find("tfoot tr .addButton").click(this.onAddEvent);
            } else {
                $(this.addButtonSettings.elementToAttachAdd).prepend("<a href='#' class='addButton btn btn-primary " + this.addButtonSettings.btnClass + " " + this.safeName + "' title='Add New " + this.name + "'><span class='glyphicon glyphicon-plus'></span> add new " + this.name + "</a>");

                $(this.addButtonSettings.elementToAttachAdd).find(".addButton." + this.safeName + "").click(this.onAddEvent);
            }
            //table.find("tbody tr .frm_RemoveButton").button();
            this.table.find("tbody tr .removeButton").click(this.onRemoveEvent);
            this.rowCount = this.table.find("tbody tr").length;

            await Tasks.delay(100);
            this.onInit.trigger();

        }

        public removeRow = (row: JQuery) => {
            $(row).fadeOut(1000,()=> {
                $(row).remove();
                this.onRemove.trigger(row);
            });
        }

        public getRows = ():JQuery => {
            return this.table.find("tbody tr");
        }
        public hideAdd = (msg: string): void => {
            if (!(msg == "" || msg == null)) {
                this.table.find("tfoot tr th:first-child").append("<div class='alert alert-danger'>" + msg + "</div>")
            }
            this.table.find("tfoot .addButton").hide();
        }
        public showAdd = () => {
            this.table.find("tfoot .alert").remove();
            this.table.find("tfoot .addButton").show();
        }


        private onAddEvent = (evt: JQueryEventObject) => {

            if (evt != null) {
                evt.preventDefault();
            }
            Html.htmlBegin();
            this.onAdd.trigger(this.rowCount);
            this.rowCount = this.rowCount + 1;
            Html.htmlEnd(this.table.find("tbody"));

            if (this.prePendButtons) {
                this.table.find("tbody tr:last-child").prepend("<td class='removeColumn'><a href=\"#\" class=\"removeButton btn btn-danger\"><span class='glyphicon glyphicon-minus'></span> delete</a></td>");
            } else {
                this.table.find("tbody tr:last-child").append("<td class='removeColumn'><a href=\"#\" class=\"removeButton  btn btn-danger\"><span class='glyphicon glyphicon-minus'></span> delete</a></td>");
            }
            this.table.find("tbody tr:last-child .removeButton").click(this.onRemoveEvent);
            
        }
        private onRemoveEvent = (evt: JQueryEventObject) => {

            if (evt != null) {
                evt.preventDefault();
            }
            var item = evt.currentTarget;
            this.removeRow($(item).parents("tr"));
        }

    }
    


}