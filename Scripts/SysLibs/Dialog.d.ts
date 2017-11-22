interface FlowPlayer {
    (selector: string, path: string, config?: any): any;
}
declare var $f: FlowPlayer;
interface Window {
    closeBasePopupDialog: (data?: any) => void;
    showHtmlInDialog(html: string | JQuery, settings: Dialog.IDialogSettings, parent?: Window): JQuery;
}
declare function closeBasePopupDialog(data?: any): void;
declare function showHtmlInDialog(html: string | JQuery, settings: Dialog.IDialogSettings, parent?: Window): JQuery;
declare module Dialog {
    var lastDialogNumber: number;
    var dialogReturn: any;
    var dialogCloseEvents: Tasks.EventHandler;
    function resetPage(): void;
    function closeDialog(): void;
    enum DialogTypeEnum {
        JQueryDialog = 0,
        FancyBox = 1,
    }
    interface IDialogSettings {
        dialogType: DialogTypeEnum;
        width?: number;
        height?: number;
        callOnClose?: string;
        onComplete?: () => void;
    }
    interface IFbDialogSettings extends IDialogSettings {
        noScroll?: boolean;
        resizable?: boolean;
    }
    interface IJQuiDialogSettings extends IDialogSettings {
        title?: string;
        item?: JQuery;
        settings?: JQueryUI.DialogOptions;
    }
    function showBlockUI(msg?: string): void;
    function hideBlockUI(): void;
    function getFancyBoxDialogSettings(width?: number, height?: number, title?: string, noScroll?: boolean, resizable?: boolean, callOnClose?: string, onComplete?: () => void): IFbDialogSettings;
    function getJqueryUiDialogSettings(width?: number, height?: number, title?: string, settings?: JQueryUI.DialogOptions, callOnClose?: string, onComplete?: () => void): IJQuiDialogSettings;
    function getDefaultDialogSettings(dialogType?: DialogTypeEnum): IDialogSettings;
    function showHtmlInDialog(html: string | JQuery, options?: IDialogSettings, parent?: Window): JQuery;
    function showVideoInDialog(url: string, options?: IDialogSettings): void;
    function showInDialog(url: string, options?: IDialogSettings): void;
    function confirmDialog(msg: string, dialogType?: DialogTypeEnum, callback?: (success: boolean) => void): void;
}
