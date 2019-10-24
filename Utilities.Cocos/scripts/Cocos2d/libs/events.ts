

/**
 * @private
 * @ignore
 * Returns the event listener property of an object, creating it if it doesn't
 * already exist.
 *
 * @returns {Object}
 */



export module events {
    function getListeners(obj: any, eventName: string): any {
        if (!obj.js_listeners_) {
            obj.js_listeners_ = {};
        }
        if (!eventName) {
            return obj.js_listeners_;
        }
        if (!obj.js_listeners_[eventName]) {
            obj.js_listeners_[eventName] = {};
        }
        return obj.js_listeners_[eventName];
    }

    /**
     * @private
     * @ignore
     * Keep track of the next ID for each new EventListener
     */
    var eventID = 0;



    export class EventListener {

        public id: number = 0;

        constructor(public source: any, public eventName: string, public handler: (...args: any[]) => void) {
            this.id = ++eventID;
            getListeners(source, eventName)[this.id] = this;
        }
    }

/**
 * Register an event listener
 *
 * @param {Object} source Object to listen to for an event
 * @param {String|Stringp[} eventName Name or Array of names of the event(s) to listen for
 * @param {Function} handler Callback to fire when the event triggers
 *
 * @returns {events.EventListener|events.EventListener[]} The event listener(s). Pass to removeListener to destroy it.
 */
    export function addListener(source: any, eventName: string | Array<string>, handler: (...args: any[]) => void): EventListener | Array<EventListener> {
        if (eventName instanceof Array) {
            var listeners = [];
            for (var i = 0, len = eventName.length; i < len; i++) {
                listeners.push(new events.EventListener(source, eventName[i], handler));
            }
            return listeners;
        } else {
            return new EventListener(source, eventName, handler);
        }
    }

    /**
 * Trigger an event. All listeners will be notified.
 *
 * @param {Object} source Object to trigger the event on
 * @param {String} eventName Name of the event to trigger
 */
    export function trigger(source:any, eventName:string, ...args: any[]):void {
        var listeners = getListeners(source, eventName),
            //args = Array.prototype.slice.call(arguments, 2),
            eventID,
            l;

        for (eventID in listeners) {
            if (listeners.hasOwnProperty(eventID)) {
                l = listeners[eventID];
                if (l) {
                    l.handler.apply(undefined, ...args);
                }
            }
        }
    }

    /**
 * Remove a previously registered event listener
 *
 * @param {events.EventListener} listener EventListener to remove, as returned by events.addListener
 */
    export function removeListener(listener:EventListener):void {
        delete getListeners(listener.source, listener.eventName)[listener.id];
    }

    /**
 * Remove a all event listeners for a given event
 *
 * @param {Object} source Object to remove listeners from
 * @param {String} eventName Name of event to remove listeners from
 */
    export function clearListeners(source:any, eventName:string) {
        var listeners = getListeners(source, eventName),
            eventID;


        for (eventID in listeners) {
            if (listeners.hasOwnProperty(eventID)) {
                var l = listeners[eventID];
                if (l) {
                    events.removeListener(l);
                }
            }
        }
    }

    /**
 * Remove all event listeners on an object
 *
 * @param {Object} source Object to remove listeners from
 */
    export function clearInstanceListeners(source:any):void {
        var listeners = getListeners(source, null),
            eventID;

        for (var eventName in listeners) {
            if (listeners.hasOwnProperty(eventName)) {
                var el = listeners[eventName];
                for (eventID in el) {
                    if (el.hasOwnProperty(eventID)) {
                        var l = el[eventID];
                        if (l) {
                            events.removeListener(l);
                        }
                    }
                }
            }
        }
    }






}