declare module Debug {
    class Message {
        private _date;
        private _message;
        constructor(_date: Date, _message: string);
        date: Date;
        message: string;
    }
    class Messages {
        private displayLocation;
        messages: Array<Message>;
        constructor(displayLocation: JQuery);
        showMessages: () => void;
        addMessage: (msg: string | Message) => void;
    }
    var messages: Messages;
    function debugWrite(msg: string): void;
}
