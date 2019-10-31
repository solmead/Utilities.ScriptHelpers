import { BObject } from "./libs/bobject";
import { geometry } from "./libs/geometry";
import { Config } from "./Config";
export var EventDispatcher;
(function (EventDispatcher_1) {
    class delegateHandler {
        constructor(delegate, priority, flags) {
            this.delegate = delegate;
            this.priority = priority;
            this.flags = flags;
        }
    }
    class EventDispatcher extends BObject {
        constructor() {
            super();
            this._previousTouchMovePosition = new Array();
            this._previousTouchDragPosition = new Array();
            this.dispatchEvents = true;
            this.touchDelegates = new Array();
            this.keyboardDelegates = new Array();
            this.mouseDelegates = new Array();
            this._keysDown = {};
        }
        addDelegate(delegate, priority, flags, list) {
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
        removeDelegate(delegate, list) {
            var idx = -1, i;
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
        removeAllDelegates(list) {
            list.splice(0, list.length - 1);
        }
        addTouchDelegate(delegate, priority) {
            var flags = 0;
            // TODO flags
            this.addDelegate(delegate, priority, flags, this.touchDelegates);
        }
        removeTouchDelegate(delegate) {
            this.removeDelegate(delegate, this.touchDelegates);
        }
        removeAllTouchDelegate() {
            this.removeAllDelegates(this.touchDelegates);
        }
        addMouseDelegate(delegate, priority) {
            var flags = 0;
            // TODO flags
            this.addDelegate(delegate, priority, flags, this.mouseDelegates);
        }
        removeMouseDelegate(delegate) {
            this.removeDelegate(delegate, this.mouseDelegates);
        }
        removeAllMouseDelegate() {
            this.removeAllDelegates(this.mouseDelegates);
        }
        addKeyboardDelegate(delegate, priority) {
            var flags = 0;
            // TODO flags
            this.addDelegate(delegate, priority, flags, this.keyboardDelegates);
        }
        removeKeyboardDelegate(delegate) {
            this.removeDelegate(delegate, this.keyboardDelegates);
        }
        removeAllKeyboardDelegate() {
            this.removeAllDelegates(this.keyboardDelegates);
        }
        touchStart(evt) {
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
                    var d = entry.delegate;
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
        touchMove(evt) {
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
                }
                else {
                    t.deltaX = 0;
                    t.deltaY = 0;
                }
                this._previousTouchMovePosition[a] = geometry.ccp(t.clientX, t.clientY);
            }
            for (var i = 0; i < this.touchDelegates.length; i++) {
                var entry = this.touchDelegates[i];
                if (entry.delegate.touchMove) {
                    var d = entry.delegate;
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
        touchEnd(evt) {
            if (!this.dispatchEvents) {
                return;
            }
            for (var i = 0; i < this.touchDelegates.length; i++) {
                var entry = this.touchDelegates[i];
                if (entry.delegate.touchEnd) {
                    var d = entry.delegate;
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
        touchCancel(evt) {
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
        mouseDown(evt) {
            if (!this.dispatchEvents) {
                return;
            }
            this._previousMouseMovePosition = geometry.ccp(evt.clientX, evt.clientY);
            this._previousMouseDragPosition = geometry.ccp(evt.clientX, evt.clientY);
            for (var i = 0; i < this.mouseDelegates.length; i++) {
                var entry = this.mouseDelegates[i];
                if (entry.delegate.mouseDown) {
                    var d = entry.delegate;
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
        mouseMoved(evt) {
            if (!this.dispatchEvents) {
                return;
            }
            if (this._previousMouseMovePosition) {
                evt.deltaX = evt.clientX - this._previousMouseMovePosition.x;
                evt.deltaY = evt.clientY - this._previousMouseMovePosition.y;
                if (Config.FLIP_Y_AXIS) {
                    evt.deltaY *= -1;
                }
            }
            else {
                evt.deltaX = 0;
                evt.deltaY = 0;
            }
            this._previousMouseMovePosition = geometry.ccp(evt.clientX, evt.clientY);
            for (var i = 0; i < this.mouseDelegates.length; i++) {
                var entry = this.mouseDelegates[i];
                if (entry.delegate.mouseMoved) {
                    var d = entry.delegate;
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
        mouseDragged(evt) {
            if (!this.dispatchEvents) {
                return;
            }
            if (this._previousMouseDragPosition) {
                evt.deltaX = evt.clientX - this._previousMouseDragPosition.x;
                evt.deltaY = evt.clientY - this._previousMouseDragPosition.y;
                if (Config.FLIP_Y_AXIS) {
                    evt.deltaY *= -1;
                }
            }
            else {
                evt.deltaX = 0;
                evt.deltaY = 0;
            }
            this._previousMouseDragPosition = geometry.ccp(evt.clientX, evt.clientY);
            for (var i = 0; i < this.mouseDelegates.length; i++) {
                var entry = this.mouseDelegates[i];
                if (entry.delegate.mouseDragged) {
                    var d = entry.delegate;
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
        mouseUp(evt) {
            if (!this.dispatchEvents) {
                return;
            }
            for (var i = 0; i < this.mouseDelegates.length; i++) {
                var entry = this.mouseDelegates[i];
                if (entry.delegate.mouseUp) {
                    var d = entry.delegate;
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
        keyDown(evt) {
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
        keyUp(evt) {
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
    EventDispatcher_1.EventDispatcher = EventDispatcher;
    var _instance = null;
    function sharedDispatcher() {
        if (!_instance) {
            _instance = new EventDispatcher();
        }
        return _instance;
    }
    EventDispatcher_1.sharedDispatcher = sharedDispatcher;
})(EventDispatcher || (EventDispatcher = {}));
//# sourceMappingURL=EventDispatcher.js.map