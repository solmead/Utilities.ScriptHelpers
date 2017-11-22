var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Grid;
(function (Grid) {
    var AddButtonSettings = (function () {
        function AddButtonSettings(addButtonInFoot, attachAddPrePend, elementToAttachAdd, btnClass) {
            if (addButtonInFoot === void 0) { addButtonInFoot = true; }
            if (attachAddPrePend === void 0) { attachAddPrePend = false; }
            if (elementToAttachAdd === void 0) { elementToAttachAdd = null; }
            if (btnClass === void 0) { btnClass = ""; }
            this.addButtonInFoot = addButtonInFoot;
            this.attachAddPrePend = attachAddPrePend;
            this.elementToAttachAdd = elementToAttachAdd;
            this.btnClass = btnClass;
        }
        return AddButtonSettings;
    }());
    Grid.AddButtonSettings = AddButtonSettings;
    var DynamicGrid = (function () {
        function DynamicGrid(tableRef, name, prePendButtons, addButtonSettings) {
            if (prePendButtons === void 0) { prePendButtons = true; }
            if (addButtonSettings === void 0) { addButtonSettings = new AddButtonSettings(); }
            var _this = this;
            this.tableRef = tableRef;
            this.name = name;
            this.prePendButtons = prePendButtons;
            this.addButtonSettings = addButtonSettings;
            this.onInit = new Tasks.EventHandler();
            this.onAdd = new Tasks.EventHandler();
            this.onRemove = new Tasks.EventHandler();
            this.rowCount = 0;
            this.init = function () { return __awaiter(_this, void 0, void 0, function () {
                var columns, isTd;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Tasks.whenReady()];
                        case 1:
                            _a.sent();
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
                                    columns = this.table.find("tbody>tr:first-child").children().length - 1;
                                    if (columns < 1) {
                                        columns = this.table.find("tr:first-child").children().length - 1;
                                    }
                                    this.table.append("<tfoot><tr><th></th>" + ((columns - 2) > 0 ? "<th colspan='" + (columns - 2) + "'></th>" : "") + ((columns - 1) > 0 ? "<th></th>" : "") + "</tr></tfoot>");
                                }
                                isTd = (this.table.find("tfoot tr td:first-child").length > 0);
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
                            return [4 /*yield*/, Tasks.delay(100)];
                        case 2:
                            _a.sent();
                            this.onInit.trigger();
                            return [2 /*return*/];
                    }
                });
            }); };
            this.removeRow = function (row) {
                $(row).fadeOut(1000, function () {
                    $(row).remove();
                    _this.onRemove.trigger(row);
                });
            };
            this.getRows = function () {
                return _this.table.find("tbody tr");
            };
            this.hideAdd = function (msg) {
                _this.table.find("tfoot tr th:first-child").append("<div class='alert alert-danger'>" + msg + "</div>");
                _this.table.find("tfoot .addButton").hide();
            };
            this.showAdd = function () {
                _this.table.find("tfoot .alert").remove();
                _this.table.find("tfoot .addButton").show();
            };
            this.onAddEvent = function (evt) {
                if (evt != null) {
                    evt.preventDefault();
                }
                Html.htmlBegin();
                _this.onAdd.trigger(_this.rowCount);
                _this.rowCount = _this.rowCount + 1;
                Html.htmlEnd(_this.table.find("tbody"));
                if (_this.prePendButtons) {
                    _this.table.find("tbody tr:last-child").prepend("<td class='removeColumn'><a href=\"#\" class=\"removeButton btn btn-danger\"><span class='glyphicon glyphicon-minus'></span> delete</a></td>");
                }
                else {
                    _this.table.find("tbody tr:last-child").append("<td class='removeColumn'><a href=\"#\" class=\"removeButton  btn btn-danger\"><span class='glyphicon glyphicon-minus'></span> delete</a></td>");
                }
                _this.table.find("tbody tr:last-child .removeButton").click(_this.onRemoveEvent);
            };
            this.onRemoveEvent = function (evt) {
                if (evt != null) {
                    evt.preventDefault();
                }
                var item = evt.currentTarget;
                _this.removeRow($(item).parents("tr"));
            };
            this.init();
        }
        return DynamicGrid;
    }());
    Grid.DynamicGrid = DynamicGrid;
})(Grid || (Grid = {}));
//# sourceMappingURL=DynamicGrid.js.map