import { geometry } from "../libs/geometry";
import { Node } from "./Node";
import { Director } from "../Director";
import { EventDispatcher } from "../EventDispatcher";
import { events } from "../libs/events";
import { util } from "../libs/util";
var ccp = geometry.ccp;
export class Layer extends Node {
    constructor() {
        super();
        this._isTouchEnabled = false;
        this._isMouseEnabled = false;
        this._isKeyboardEnabled = false;
        this._touchDelegatePriority = 0;
        this._mouseDelegatePriority = 0;
        this._keyboardDelegatePriority = 0;
        var s = Director.sharedDirector().winSize;
        this.isRelativeAnchorPoint = false;
        this.anchorPoint = ccp(0.5, 0.5);
        this.contentSize = s;
        events.addListener(this, 'ismouseenabled_changed', util.callback(this, () => {
            if (this.isRunning) {
                if (this.isMouseEnabled) {
                    EventDispatcher.sharedDispatcher().addMouseDelegate(this, this.mouseDelegatePriority);
                }
                else {
                    EventDispatcher.sharedDispatcher().removeMouseDelegate(this);
                }
            }
        }));
        events.addListener(this, 'iskeyboardenabled_changed', util.callback(this, () => {
            if (this.isRunning) {
                if (this.isKeyboardEnabled) {
                    EventDispatcher.sharedDispatcher().addKeyboardDelegate(this, this.keyboardDelegatePriority);
                }
                else {
                    EventDispatcher.sharedDispatcher().removeKeyboardDelegate(this);
                }
            }
        }));
        events.addListener(this, 'istouchenabled_changed', util.callback(this, () => {
            if (this.isRunning) {
                if (this.isTouchEnabled) {
                    EventDispatcher.sharedDispatcher().addTouchDelegate(this, this.touchDelegatePriority);
                }
                else {
                    EventDispatcher.sharedDispatcher().removeTouchDelegate(this);
                }
            }
        }));
    }
    get isTouchEnabled() {
        return this.getValue("_isTouchEnabled");
    }
    set isTouchEnabled(value) {
        this.setValue("_isTouchEnabled", null, value, true);
    }
    get isMouseEnabled() {
        return this.getValue("_isMouseEnabled");
    }
    set isMouseEnabled(value) {
        this.setValue("_isMouseEnabled", null, value, true);
    }
    get isKeyboardEnabled() {
        return this.getValue("_isKeyboardEnabled");
    }
    set isKeyboardEnabled(value) {
        this.setValue("_isKeyboardEnabled", null, value, true);
    }
    get touchDelegatePriority() {
        return this.getValue("_touchDelegatePriority");
    }
    set touchDelegatePriority(value) {
        this.setValue("_touchDelegatePriority", null, value, true);
    }
    get mouseDelegatePriority() {
        return this.getValue("_mouseDelegatePriority");
    }
    set mouseDelegatePriority(value) {
        this.setValue("_mouseDelegatePriority", null, value, true);
    }
    get keyboardDelegatePriority() {
        return this.getValue("_keyboardDelegatePriority");
    }
    set keyboardDelegatePriority(value) {
        this.setValue("_keyboardDelegatePriority", null, value, true);
    }
    onEnter() {
        if (this.isTouchEnabled) {
            EventDispatcher.sharedDispatcher().removeTouchDelegate(this);
            EventDispatcher.sharedDispatcher().addTouchDelegate(this, this.touchDelegatePriority);
        }
        if (this.isMouseEnabled) {
            EventDispatcher.sharedDispatcher().removeMouseDelegate(this);
            EventDispatcher.sharedDispatcher().addMouseDelegate(this, this.mouseDelegatePriority);
        }
        if (this.isKeyboardEnabled) {
            EventDispatcher.sharedDispatcher().removeKeyboardDelegate(this);
            EventDispatcher.sharedDispatcher().addKeyboardDelegate(this, this.keyboardDelegatePriority);
        }
        super.onEnter();
    }
    onExit() {
        if (this.isTouchEnabled) {
            EventDispatcher.sharedDispatcher().removeTouchDelegate(this);
        }
        if (this.isMouseEnabled) {
            EventDispatcher.sharedDispatcher().removeMouseDelegate(this);
        }
        if (this.isKeyboardEnabled) {
            EventDispatcher.sharedDispatcher().removeKeyboardDelegate(this);
        }
        super.onExit();
    }
    touchStart(evt) {
        //throw new Error("Method not implemented.");
        return false;
    }
    touchMove(evt) {
        //throw new Error("Method not implemented.");
        return false;
    }
    touchEnd(evt) {
        //throw new Error("Method not implemented.");
        return false;
    }
    touchCancel(evt) {
        //throw new Error("Method not implemented.");
        return false;
    }
    mouseDown(evt) {
        //throw new Error("Method not implemented.");
        return false;
    }
    mouseMoved(evt) {
        //throw new Error("Method not implemented.");
        return false;
    }
    mouseDragged(evt) {
        //throw new Error("Method not implemented.");
        return false;
    }
    mouseUp(evt) {
        //throw new Error("Method not implemented.");
        return false;
    }
    keyDown(evt) {
        //throw new Error("Method not implemented.");
        return false;
    }
    keyUp(evt) {
        //throw new Error("Method not implemented.");
        return false;
    }
}
//# sourceMappingURL=Layer.js.map