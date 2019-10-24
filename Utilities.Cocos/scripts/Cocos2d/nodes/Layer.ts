import { geometry } from "../libs/geometry";
import { Node } from "./Node";
import { Director } from "../Director";
import { EventDispatcher } from "../EventDispatcher";
import { events } from "../libs/events";
import { util } from "../libs/util";




var ccp = geometry.ccp;

export class Layer extends Node implements EventDispatcher.eventDelegate {

    protected _isMouseEnabled: boolean = false;
    get isMouseEnabled(): boolean {
        return this.getValue("_isMouseEnabled");
    }
    set isMouseEnabled(value: boolean) {
        this.setValue("_isMouseEnabled", null, value, true);
    }
    protected _isKeyboardEnabled: boolean = false;
    get isKeyboardEnabled(): boolean {
        return this.getValue("_isKeyboardEnabled");
    }
    set isKeyboardEnabled(value: boolean) {
        this.setValue("_isKeyboardEnabled", null, value, true);
    }
    protected _mouseDelegatePriority: number = 0;
    get mouseDelegatePriority(): number {
        return this.getValue("_mouseDelegatePriority");
    }
    set mouseDelegatePriority(value: number) {
        this.setValue("_mouseDelegatePriority", null, value, true);
    }
    protected _keyboardDelegatePriority: number = 0;
    get keyboardDelegatePriority(): number {
        return this.getValue("_keyboardDelegatePriority");
    }
    set keyboardDelegatePriority(value: number) {
        this.setValue("_keyboardDelegatePriority", null, value, true);
    }




    constructor() {
        super();
        var s = Director.sharedDirector().winSize;

        this.isRelativeAnchorPoint = false;
        this.anchorPoint = ccp(0.5, 0.5);
        this.contentSize = s;

        events.addListener(this, 'ismouseenabled_changed', util.callback(this, ()=> {
            if (this.isRunning) {
                if (this.isMouseEnabled) {
                    EventDispatcher.sharedDispatcher().addMouseDelegate(this, this.mouseDelegatePriority);
                } else {
                    EventDispatcher.sharedDispatcher().removeMouseDelegate(this);
                }
            }
        }));


        events.addListener(this, 'iskeyboardenabled_changed', util.callback(this, ()=> {
            if (this.isRunning) {
                if (this.isKeyboardEnabled) {
                    EventDispatcher.sharedDispatcher().addKeyboardDelegate(this, this.keyboardDelegatePriority);
                } else {
                    EventDispatcher.sharedDispatcher().removeKeyboardDelegate(this);
                }
            }
        }));

    }
    public onEnter(): void {
        if (this.isMouseEnabled) {
            EventDispatcher.sharedDispatcher().addMouseDelegate(this, this.mouseDelegatePriority);
        }
        if (this.isKeyboardEnabled) {
            EventDispatcher.sharedDispatcher().addKeyboardDelegate(this, this.keyboardDelegatePriority);
        }
        super.onEnter();
    }
    public onExit(): void {
        if (this.isMouseEnabled) {
            EventDispatcher.sharedDispatcher().removeMouseDelegate(this);
        }
        if (this.isKeyboardEnabled) {
            EventDispatcher.sharedDispatcher().removeKeyboardDelegate(this);
        }

        super.onExit();
    }





    mouseDown(evt: EventDispatcher.mouseDelegateEvent): boolean {
        //throw new Error("Method not implemented.");
        return false;
    }
    mouseMoved(evt: EventDispatcher.mouseDelegateEvent): boolean {
        //throw new Error("Method not implemented.");
        return false;
    }
    mouseDragged(evt: EventDispatcher.mouseDelegateEvent): boolean {
        //throw new Error("Method not implemented.");
        return false;
    }
    mouseUp(evt: EventDispatcher.mouseDelegateEvent): boolean {
        //throw new Error("Method not implemented.");
        return false;
    }
    keyDown(evt: EventDispatcher.keyDelegateEvent): boolean {
        //throw new Error("Method not implemented.");
        return false;
    }
    keyUp(evt: EventDispatcher.keyDelegateEvent): boolean {
        //throw new Error("Method not implemented.");
        return false;
    }

}