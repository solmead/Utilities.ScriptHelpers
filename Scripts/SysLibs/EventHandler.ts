

module Tasks {
    
    export class EventHandler {

        private onTrigger: Array<((data?: any) => any)> = [];

        constructor() {

        }
        trigger = (data?: any): void => {
            this.onTrigger.asQueryable().forEach((fn) => {
                fn(data);
            });
        };

        addListener = (callback: (data?: any) => any): void => {
            this.onTrigger.push(callback);
        }
    }
}