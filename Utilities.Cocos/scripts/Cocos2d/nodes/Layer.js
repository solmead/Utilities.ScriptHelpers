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
        this._isMouseEnabled = false;
        this._isKeyboardEnabled = false;
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
        if (this.isMouseEnabled) {
            EventDispatcher.sharedDispatcher().addMouseDelegate(this, this.mouseDelegatePriority);
        }
        if (this.isKeyboardEnabled) {
            EventDispatcher.sharedDispatcher().addKeyboardDelegate(this, this.keyboardDelegatePriority);
        }
        super.onEnter();
    }
    onExit() {
        if (this.isMouseEnabled) {
            EventDispatcher.sharedDispatcher().removeMouseDelegate(this);
        }
        if (this.isKeyboardEnabled) {
            EventDispatcher.sharedDispatcher().removeKeyboardDelegate(this);
        }
        super.onExit();
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