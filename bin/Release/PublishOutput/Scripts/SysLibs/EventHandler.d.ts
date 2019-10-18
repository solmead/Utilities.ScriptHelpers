declare module Tasks {
    class EventHandler {
        private onTrigger;
        constructor();
        trigger: (data?: any) => void;
        addListener: (callback: (data?: any) => any) => void;
    }
}
