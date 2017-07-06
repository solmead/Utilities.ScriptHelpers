declare var __doPostBack: any;
declare var WebForm_DoPostBackWithOptions: any;
declare var Page_ClientValidate: any;
declare module System {
    function SetupOptGroups(select: JQuery): void;
    function SetupTabs(tabAreas: JQuery, hdnTabArea: JQuery, onTabChanged: (tab: number, text: string) => void): any;
    function MakeComboBox(items: JQuery, autoSizeWidth?: boolean, autoSizeHeight?: boolean, storeIn?: JQuery, attachToParent?: boolean): any;
    function AddRemoveItems(Area: JQuery, Name: string, AddNewCall: any, RemoveCall: any): any;
    function AddRemoveSystem(options: any): any;
    function onSilverlightError(sender: any, args: any): any;
    function FillValue(Value: any, Item: any): any;
    function ShowHideParent(Value: any, Item: any): any;
    function fakeClick(id: any, fn: any): any;
    function IsIphone(): any;
    function IsIpad(): any;
}
