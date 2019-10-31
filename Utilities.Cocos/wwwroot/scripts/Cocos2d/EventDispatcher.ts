import { BObject } from "./libs/bobject"
import { geometry } from "./libs/geometry";
import { Config } from "./Config";

export module EventDispatcher {


    export interface touchDelegate extends Touch {
        locationInWindow: geometry.Point;
        locationInCanvas: geometry.Point;
        locationInLayer: geometry.Point;
        deltaX: number;
        deltaY: number;
    }
    export interface touchListDelegate extends TouchList {
        readonly length: number;
        item(index: number): touchDelegate | null;
        [index: number]: touchDelegate;
    }


    export interface touchDelegateEvent extends TouchEvent {
        readonly altKey: boolean;
        readonly changedTouches: touchListDelegate;
        readonly ctrlKey: boolean;
        readonly metaKey: boolean;
        readonly shiftKey: boolean;
        readonly targetTouches: touchListDelegate;
        readonly touches: touchListDelegate;

    }
    export interface mouseDelegateEvent extends MouseEvent {
        locationInWindow: geometry.Point;
        locationInCanvas: geometry.Point;
        locationInLayer: geometry.Point;
        deltaX: number;
        deltaY: number;
    }

    export interface keyDelegateEvent extends KeyboardEvent {

    }

    export interface eventDelegate {
        touchStart(evt: touchDelegateEvent): boolean;
        touchMove(evt: touchDelegateEvent): boolean;
        touchEnd(evt: touchDelegateEvent): boolean;
        touchCancel(evt: touchDelegateEvent): boolean;
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
        private _previousTouchMovePosition: Array<geometry.Point> = new Array<geometry.Point>();
        private _previousTouchDragPosition: Array<geometry.Point> = new Array<geometry.Point>();


        protected dispatchEvents: boolean = true;
        protected touchDelegates: Array<delegateHandler> = new Array<delegateHandler>();
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
        public addTouchDelegate(delegate: eventDelegate, priority: number): void {
            var flags = 0;

            // TODO flags

            this.addDelegate(delegate, priority, flags, this.touchDelegates);
        }
        public removeTouchDelegate(delegate: eventDelegate): void {
            this.removeDelegate(delegate, this.touchDelegates);
        }
        public removeAllTouchDelegate(): void {
            this.removeAllDelegates(this.touchDelegates);
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
        touchStart(evt: touchDelegateEvent): boolean {
            if (!this.dispatchEvents) {
                return;
            }
            for (var a = 0; a < evt.touches.length; a++) {
                var t = evt.touches[a];

                this._previousTouchMovePosition[a] = geometry.ccp(t.clientX, t.clientY);
                this._previousTouchDragPosition[a] = geometry.ccp(t.clientX, t.clientY);
            }


            for (var i = 0; i < this.touchDelegates.length; i++) {
                var entry = this.touchDelegates[i];
                if (entry.delegate.touchStart) {


                    var d = <any>entry.delegate;
                    if (d.nodeToParentTransform) {

                        for (var a = 0; a < evt.touches.length; a++) {
                            var t = evt.touches[a];
                            t.locationInLayer = geometry.pointApplyAffineTransform(t.locationInCanvas, d.nodeToParentTransform());
                        }
                    }

                    var swallows = entry.delegate.touchStart(evt);
                    if (swallows) {
                        break;
                    }
                }
            }
        }
        touchMove(evt: touchDelegateEvent): boolean {
            if (!this.dispatchEvents) {
                return;
            }
            for (var a = 0; a < evt.touches.length; a++) {
                var t = evt.touches[a];


                if (this._previousTouchMovePosition[a]) {
                    t.deltaX = t.clientX - this._previousTouchMovePosition[a].x;
                    t.deltaY = t.clientY - this._previousTouchMovePosition[a].y;
                    if (Config.FLIP_Y_AXIS) {
                        t.deltaY *= -1;
                    }
                } else {
                    t.deltaX = 0;
                    t.deltaY = 0;
                }
                this._previousTouchMovePosition[a] = geometry.ccp(t.clientX, t.clientY);
            }


            for (var i = 0; i < this.touchDelegates.length; i++) {
                var entry = this.touchDelegates[i];
                if (entry.delegate.touchMove) {



                    var d = <any>entry.delegate;
                    if (d.nodeToParentTransform) {

                        for (var a = 0; a < evt.touches.length; a++) {
                            var t = evt.touches[a];
                            t.locationInLayer = geometry.pointApplyAffineTransform(t.locationInCanvas, d.nodeToParentTransform());
                        }
                    }


                    var swallows = entry.delegate.touchMove(evt);
                    if (swallows) {
                        break;
                    }
                }
            }
        }
        touchEnd(evt: touchDelegateEvent): boolean {
            if (!this.dispatchEvents) {
                return;
            }

            for (var i = 0; i < this.touchDelegates.length; i++) {
                var entry = this.touchDelegates[i];
                if (entry.delegate.touchEnd) {


                    var d = <any>entry.delegate;
                    if (d.nodeToParentTransform) {

                        for (var a = 0; a < evt.touches.length; a++) {
                            var t = evt.touches[a];
                            t.locationInLayer = geometry.pointApplyAffineTransform(t.locationInCanvas, d.nodeToParentTransform());
                        }
                    }

                    var swallows = entry.delegate.touchEnd(evt);
                    if (swallows) {
                        break;
                    }
                }
            }
        }
        touchCancel(evt: touchDelegateEvent): boolean {
            if (!this.dispatchEvents) {
                return;
            }

            for (var i = 0; i < this.touchDelegates.length; i++) {
                var entry = this.touchDelegates[i];
                if (entry.delegate.mouseUp) {
                    var swallows = entry.delegate.touchCancel(evt);
                    if (swallows) {
                        break;
                    }
                }
            }
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

                    var d = <any>entry.delegate;
                    if (d.parentToNodeTransform) {
                        evt.locationInLayer = geometry.pointApplyAffineTransform(evt.locationInCanvas, d.parentToNodeTransform());

                        console.log(d.tag + " mouseDown.locationInLayer = " + evt.locationInLayer.toString());
                    }

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

                    var d = <any>entry.delegate;
                    if (d.parentToNodeTransform) {
                        evt.locationInLayer = geometry.pointApplyAffineTransform(evt.locationInCanvas, d.parentToNodeTransform());

                        //console.log("mouseMoved.locationInLayer = " + evt.locationInLayer.toString());
                    }

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

                    var d = <any>entry.delegate;
                    if (d.parentToNodeTransform) {
                        evt.locationInLayer = geometry.pointApplyAffineTransform(evt.locationInCanvas, d.parentToNodeTransform());

                        console.log(d.tag + " mouseDragged.locationInLayer = " + evt.locationInLayer.toString());
                    }
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

                    var d = <any>entry.delegate;
                    if (d.parentToNodeTransform) {
                        evt.locationInLayer = geometry.pointApplyAffineTransform(evt.locationInCanvas, d.parentToNodeTransform());

                        console.log(d.tag + " mouseUp.locationInLayer = " + evt.locationInLayer.toString());
                    }
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
