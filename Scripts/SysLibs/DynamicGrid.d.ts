declare module Grid {
    class AddButtonSettings {
        addButtonInFoot: boolean;
        attachAddPrePend: boolean;
        elementToAttachAdd: JQuery;
        btnClass: string;
        constructor(addButtonInFoot?: boolean, attachAddPrePend?: boolean, elementToAttachAdd?: JQuery, btnClass?: string);
    }
    class DynamicGrid {
        tableRef: string | JQuery;
        name: string;
        prePendButtons: boolean;
        addButtonSettings: AddButtonSettings;
        onInit: Tasks.EventHandler;
        onAdd: Tasks.EventHandler;
        onRemove: Tasks.EventHandler;
        table: JQuery;
        private safeName;
        private rowCount;
        constructor(tableRef: string | JQuery, name: string, prePendButtons?: boolean, addButtonSettings?: AddButtonSettings);
        private init;
        removeRow: (row: JQuery) => void;
        getRows: () => JQuery;
        hideAdd: (msg: string) => void;
        showAdd: () => void;
        private onAddEvent;
        private onRemoveEvent;
    }
}
