import { geometry } from "../libs/geometry";
import { FiniteTimeAction, Action } from "./Action";
import { Node } from "../nodes/Node";
import { Sprite } from "../nodes/Sprite";
import { util } from "../libs/util";


var ccp = geometry.ccp;

export class ActionInstant extends FiniteTimeAction {


    constructor() {
        super();
        this.duration = 0;
    }

    public step(dt: number): void {
        this.update(1);
    }
    public update(time: number): void {

    }
    public get isDone(): boolean {
        return true;
    }


    public reverse(): Action {
        return this.copy();
    }
    public copy(): Action {
        return this;
    }
}


export class Show extends ActionInstant {

    constructor() {
        super();
    }

    public startWithTarget(target: Node): void {
        super.startWithTarget(target);
        this.target.visible = true;
    }

    public reverse(): Action {
        return new Hide();
    }
    public copy(): Action {
        return new Show();
    }


}

export class Hide extends ActionInstant {

    constructor() {
        super();
    }

    public startWithTarget(target: Node): void {
        super.startWithTarget(target);
        this.target.visible = false;
    }

    public reverse(): Action {
        return new Show();
    }
    public copy(): Action {
        return new Hide();
    }


}

export class ToggleVisibility extends ActionInstant {

    constructor() {
        super();
    }

    public startWithTarget(target: Node): void {
        super.startWithTarget(target);
        var vis = this.target.visible;
        this.target.visible = !vis;
    }

    public copy(): Action {
        return new ToggleVisibility();
    }

}

export class FlipX extends ActionInstant {


    get flipX(): boolean {
        return this.getValue("_flipX");
    }
    set flipX(value: boolean) {
        this.setValue("_flipX", null, value, true);
    }

    constructor(protected _flipX:boolean) {
        super();
    }

    public startWithTarget(target: Node): void {
        super.startWithTarget(target);
        (<Sprite>this.target).flipX = this.flipX;
    }

    public copy(): Action {
        return new FlipX(this.flipX);
    }
    public reverse(): Action {
        return new FlipX(!this.flipX);
    }

}

export class FlipY extends ActionInstant {


    get flipY(): boolean {
        return this.getValue("_flipY");
    }
    set flipY(value: boolean) {
        this.setValue("_flipY", null, value, true);
    }

    constructor(protected _flipY: boolean) {
        super();
    }

    public startWithTarget(target: Node): void {
        super.startWithTarget(target);
        (<Sprite>this.target).flipY = this.flipY;
    }

    public copy(): Action {
        return new FlipY(this.flipY);
    }
    public reverse(): Action {
        return new FlipY(!this.flipY);
    }

}
export class Place extends ActionInstant {


    get position(): geometry.Point {
        return this.getValue("_position");
    }
    set position(value: geometry.Point) {
        this.setValue("_position", null, value, true);
    }


    constructor(protected _position: geometry.Point) {
        super();

        this.position = util.copy(this._position);
    }

    public startWithTarget(target: Node): void {
        super.startWithTarget(target);
        this.target.position = this.position;
    }

    public copy(): Action {
        return new Place(this.position);
    }

}
export class CallFunc extends ActionInstant {

    get method(): ((...args: any[]) => void) | string {
        return this.getValue("_method");
    }
    set method(value: ((...args: any[]) => void) | string) {
        this.setValue("_method", null, value, true);
    }
    protected _callback: (() => void);

    get callback(): (() => void) {
        return this.getValue("_callback");
    }
    set callback(value: (() => void)) {
        this.setValue("_callback", null, value, true);
    }

    constructor(protected _target: Node, protected _method: ((...args: any[]) => void) | string) {
        super();
        this.target = _target;
        this.callback = util.callback(this.target, this.method);
    }

    public startWithTarget(target: Node): void {
        super.startWithTarget(target);
        this.execute(target);
    }

    public execute(target: Node) {
        this.callback.call(this, target);
    }

    public copy(): Action {
        return new CallFunc(this.target, this.method);
    }

}