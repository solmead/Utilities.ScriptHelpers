/**
 * @private
 * @ignore
 * Returns the event listener property of an object, creating it if it doesn't
 * already exist.
 *
 * @returns {Object}
 */
export var events;
(function (events) {
    function getListeners(obj, eventName) {
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
    class EventListener {
        constructor(source, eventName, handler) {
            this.source = source;
            this.eventName = eventName;
            this.handler = handler;
            this.id = 0;
            this.id = ++eventID;
            getListeners(source, eventName)[this.id] = this;
        }
    }
    events.EventListener = EventListener;
    /**
     * Register an event listener
     *
     * @param {Object} source Object to listen to for an event
     * @param {String|Stringp[} eventName Name or Array of names of the event(s) to listen for
     * @param {Function} handler Callback to fire when the event triggers
     *
     * @returns {events.EventListener|events.EventListener[]} The event listener(s). Pass to removeListener to destroy it.
     */
    function addListener(source, eventName, handler) {
        if (eventName instanceof Array) {
            var listeners = [];
            for (var i = 0, len = eventName.length; i < len; i++) {
                listeners.push(new events.EventListener(source, eventName[i], handler));
                listeners.push(new events.EventListener(source, "_" + eventName[i], handler));
            }
            return listeners;
        }
        else {
            new EventListener(source, "_" + eventName, handler);
            return new EventListener(source, eventName, handler);
        }
    }
    events.addListener = addListener;
    /**
 * Trigger an event. All listeners will be notified.
 *
 * @param {Object} source Object to trigger the event on
 * @param {String} eventName Name of the event to trigger
 */
    function trigger(source, eventName, ...args) {
        var listeners = getListeners(source, eventName), 
        //args = Array.prototype.slice.call(arguments, 2),
        eventID, l;
        for (eventID in listeners) {
            if (listeners.hasOwnProperty(eventID)) {
                l = (listeners[eventID]);
                if (l) {
                    l.handler.apply(undefined, args);
                }
            }
        }
    }
    events.trigger = trigger;
    /**
 * Remove a previously registered event listener
 *
 * @param {events.EventListener} listener EventListener to remove, as returned by events.addListener
 */
    function removeListener(listener) {
        delete getListeners(listener.source, listener.eventName)[listener.id];
    }
    events.removeListener = removeListener;
    /**
 * Remove a all event listeners for a given event
 *
 * @param {Object} source Object to remove listeners from
 * @param {String} eventName Name of event to remove listeners from
 */
    function clearListeners(source, eventName) {
        var listeners = getListeners(source, eventName), eventID;
        for (eventID in listeners) {
            if (listeners.hasOwnProperty(eventID)) {
                var l = listeners[eventID];
                if (l) {
                    events.removeListener(l);
                }
            }
        }
    }
    events.clearListeners = clearListeners;
    /**
 * Remove all event listeners on an object
 *
 * @param {Object} source Object to remove listeners from
 */
    function clearInstanceListeners(source) {
        var listeners = getListeners(source, null), eventID;
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
    events.clearInstanceListeners = clearInstanceListeners;
})(events || (events = {}));
//# sourceMappingURL=events.js.map