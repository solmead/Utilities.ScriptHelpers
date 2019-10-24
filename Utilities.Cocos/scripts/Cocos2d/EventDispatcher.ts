import { BObject } from "./libs/bobject"
import { geometry } from "./libs/geometry";
import { Config } from "./Config";

export module EventDispatcher {

    export interface mouseDelegateEvent extends MouseEvent {
        locationInWindow: geometry.Point;
        locationInCanvas: geometry.Point;
        deltaX: number;
        deltaY: number;
    }

    export interface keyDelegateEvent extends KeyboardEvent {

    }

    export interface eventDelegate {
        mouseDown(evt: mouseDelegateEvent): boolean;
        mouseMoved(evt: mouseDelegateEvent): boolean;
        mouseDragged(evt: mouseDelegateEvent): boolean;
        mouseUp(evt: mouseDelegateEvent): boolean;
        keyDown(evt: keyDelegateEvent): boolean;
        keyUp(evt: keyDelegateEvent): boolean;
    }

    class delegateHandler {
        constructor(public delegate: eventDelegate, public priority: number, public flags: number) {

        }
    }


    export class EventDispatcher extends BObject implements eventDelegate {

        private _previousMouseMovePosition: geometry.Point;
        private _previousMouseDragPosition: geometry.Point;


        protected dispatchEvents: boolean = true;
        protected keyboardDelegates: Array<delegateHandler> = new Array<delegateHandler>();
        protected mouseDelegates: Array<delegateHandler> = new Array<delegateHandler>();
        public _keysDown: any = {};

        constructor() {
            super();

        }

        public addDelegate(delegate: eventDelegate, priority: number, flags: number, list: Array<delegateHandler>): void {

            var listElement = new delegateHandler(delegate, priority, flags);

            var added = false;
            for (var i = 0; i < list.length; i++) {
                var elem = list[i];
                if (priority < elem.priority) {
                    // Priority is lower, so insert before elem
                    list.splice(i, 0, listElement);
                    added = true;
                    break;
                }
            }

            // High priority; append to array
            if (!added) {
                list.push(listElement);
            }
        }


        public removeDelegate(delegate: eventDelegate, list: Array<delegateHandler>): void {
            var idx = -1,
                i;
            for (i = 0; i < list.length; i++) {
                var l = list[i];
                if (l.delegate == delegate) {
                    idx = i;
                    break;
                }
            }
            if (idx == -1) {
                return;
            }
            list.splice(idx, 1);
        }
        public removeAllDelegates(list: Array<delegateHandler>): void {
            list.splice(0, list.length - 1);
        }
        public addMouseDelegate(delegate: eventDelegate, priority: number): void {
            var flags = 0;

            // TODO flags

            this.addDelegate(delegate, priority, flags, this.mouseDelegates);
        }
        public removeMouseDelegate(delegate: eventDelegate): void {
            this.removeDelegate(delegate, this.mouseDelegates);
        }
        public removeAllMouseDelegate(): void {
            this.removeAllDelegates(this.mouseDelegates);
        }
        public addKeyboardDelegate(delegate: eventDelegate, priority: number): void {
            var flags = 0;

            // TODO flags

            this.addDelegate(delegate, priority, flags, this.keyboardDelegates);
        }
        public removeKeyboardDelegate(delegate: eventDelegate): void {
            this.removeDelegate(delegate, this.keyboardDelegates);
        }
        public removeAllKeyboardDelegate(): void {
            this.removeAllDelegates(this.keyboardDelegates);
        }

        mouseDown(evt: mouseDelegateEvent): boolean {
            if (!this.dispatchEvents) {
                return;
            }

            this._previousMouseMovePosition = geometry.ccp(evt.clientX, evt.clientY);
            this._previousMouseDragPosition = geometry.ccp(evt.clientX, evt.clientY);

            for (var i = 0; i < this.mouseDelegates.length; i++) {
                var entry = this.mouseDelegates[i];
                if (entry.delegate.mouseDown) {
                    var swallows = entry.delegate.mouseDown(evt);
                    if (swallows) {
                        break;
                    }
                }
            }
        }
        mouseMoved(evt: mouseDelegateEvent): boolean {
            if (!this.dispatchEvents) {
                return;
            }

            if (this._previousMouseMovePosition) {
                evt.deltaX = evt.clientX - this._previousMouseMovePosition.x;
                evt.deltaY = evt.clientY - this._previousMouseMovePosition.y;
                if (Config.FLIP_Y_AXIS) {
                    evt.deltaY *= -1;
                }
            } else {
                evt.deltaX = 0;
                evt.deltaY = 0;
            }
            this._previousMouseMovePosition = geometry.ccp(evt.clientX, evt.clientY);

            for (var i = 0; i < this.mouseDelegates.length; i++) {
                var entry = this.mouseDelegates[i];
                if (entry.delegate.mouseMoved) {
                    var swallows = entry.delegate.mouseMoved(evt);
                    if (swallows) {
                        break;
                    }
                }
            }
        }
        mouseDragged(evt: mouseDelegateEvent): boolean {
            if (!this.dispatchEvents) {
                return;
            }

            if (this._previousMouseDragPosition) {
                evt.deltaX = evt.clientX - this._previousMouseDragPosition.x;
                evt.deltaY = evt.clientY - this._previousMouseDragPosition.y;
                if (Config.FLIP_Y_AXIS) {
                    evt.deltaY *= -1;
                }
            } else {
                evt.deltaX = 0;
                evt.deltaY = 0;
            }
            this._previousMouseDragPosition = geometry.ccp(evt.clientX, evt.clientY);

            for (var i = 0; i < this.mouseDelegates.length; i++) {
                var entry = this.mouseDelegates[i];
                if (entry.delegate.mouseDragged) {
                    var swallows = entry.delegate.mouseDragged(evt);
                    if (swallows) {
                        break;
                    }
                }
            }
        }
        mouseUp(evt: mouseDelegateEvent): boolean {
            if (!this.dispatchEvents) {
                return;
            }

            for (var i = 0; i < this.mouseDelegates.length; i++) {
                var entry = this.mouseDelegates[i];
                if (entry.delegate.mouseUp) {
                    var swallows = entry.delegate.mouseUp(evt);
                    if (swallows) {
                        break;
                    }
                }
            }
        }
        keyDown(evt: keyDelegateEvent): boolean {
            var kc = evt.keyCode;
            if (!this.dispatchEvents || this._keysDown[kc]) {
                return;
            }

            this._keysDown[kc] = true;

            for (var i = 0; i < this.keyboardDelegates.length; i++) {
                var entry = this.keyboardDelegates[i];
                if (entry.delegate.keyDown) {
                    var swallows = entry.delegate.keyDown(evt);
                    if (swallows) {
                        break;
                    }
                }
            }
        }
        keyUp(evt: keyDelegateEvent): boolean {
            if (!this.dispatchEvents) {
                return;
            }

            var kc = evt.keyCode;
            if (this._keysDown[kc]) {
                delete this._keysDown[kc];
            }

            for (var i = 0; i < this.keyboardDelegates.length; i++) {
                var entry = this.keyboardDelegates[i];
                if (entry.delegate.keyUp) {
                    var swallows = entry.delegate.keyUp(evt);
                    if (swallows) {
                        break;
                    }
                }
            }
        }




    }




    var _instance: EventDispatcher = null;

    export function sharedDispatcher(): EventDispatcher {
        if (!_instance) {
            _instance = new EventDispatcher();
        }

        return _instance;
    }


}
