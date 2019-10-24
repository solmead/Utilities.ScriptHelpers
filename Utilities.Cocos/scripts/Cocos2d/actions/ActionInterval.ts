import { geometry } from "../libs/geometry";
import { FiniteTimeAction, Action } from "./Action";
import { Node } from "../nodes/Node";
import { util } from "../libs/util";


var ccp = geometry.ccp;


export class ActionInterval extends FiniteTimeAction {

    protected _elapsed: number = 0;
    get elapsed(): number {
        return this.getValue("_elapsed");
    }
    set elapsed(value: number) {
        this.setValue("_elapsed", null, value, true);
    }

    public _firstTick: boolean = true;

    constructor(protected _duration:number = null) {
        super();

        var dur = _duration || 0;
        if (dur === 0) {
            dur = 0.0000001;
        }
        this.duration = dur;

        this.elapsed = 0;

        this._firstTick = true;

    }


    public get isDone(): boolean {
        return (this.elapsed >= this.duration);
    }


    public step(dt: number): void {
        if (this._firstTick) {
            this._firstTick = false;
            this.elapsed = 0;
        } else {
            this.elapsed += dt;
        }

        this.update(Math.min(1, this.elapsed / this.duration));
    }

    public update(time: number): void {
        //super.update(time);
        //throw new Error("Method not implemented.");
    }

    public startWithTarget(target: Node): void {
        super.startWithTarget(target);
        this.elapsed = 0.0;
        this._firstTick = true;
    }





}


export class DelayTime extends ActionInterval {



    public update(time: number): void {
        if (time === 1.0) {
            this.stop();
        }
    }


    public copy(): Action {
        return new DelayTime(this.duration);
    }
    public reverse(): Action {
        return new DelayTime(this.duration);
    }

}


export class ScaleTo extends ActionInterval {


    get scaleX(): number {
        return this.getValue("_scaleX");
    }
    set scaleX(value: number) {
        this.setValue("_scaleX", null, value, true);
    }
    get scaleY(): number {
        return this.getValue("_scaleY");
    }
    set scaleY(value: number) {
        this.setValue("_scaleY", null, value, true);
    }

    protected _startScaleX: number = 1;
    get startScaleX(): number {
        return this.getValue("_startScaleX");
    }
    set startScaleX(value: number) {
        this.setValue("_startScaleX", null, value, true);
    }

    protected _startScaleY: number = 1;
    get startScaleY(): number {
        return this.getValue("_startScaleY");
    }
    set startScaleY(value: number) {
        this.setValue("_startScaleY", null, value, true);
    }

    protected _endScaleX: number = 1;
    get endScaleX(): number {
        return this.getValue("_endScaleX");
    }
    set endScaleX(value: number) {
        this.setValue("_endScaleX", null, value, true);
    }

    protected _endScaleY: number = 1;
    get endScaleY(): number {
        return this.getValue("_endScaleY");
    }
    set endScaleY(value: number) {
        this.setValue("_endScaleY", null, value, true);
    }
    protected _deltaX: number = 1;
    get deltaX(): number {
        return this.getValue("_deltaX");
    }
    set deltaX(value: number) {
        this.setValue("_deltaX", null, value, true);
    }

    protected _deltaY: number = 1;
    get deltaY(): number {
        return this.getValue("_deltaY");
    }
    set deltaY(value: number) {
        this.setValue("_deltaY", null, value, true);
    }

    constructor(_duration: number, _scale: number);
    constructor(_duration: number, _scaleX: number, _scaleY: number);
    constructor(protected _duration: number = null, protected _scaleX:number = 1, protected _scaleY:number = null) {
        super(_duration)

        if (this._scaleY == null) {
            this._scaleY = this._scaleX;
        }

        this.endScaleX = this.scaleX;
        this.endScaleY = this.scaleY;


    }

    public startWithTarget(target: Node): void {
        super.startWithTarget(target);

        this.startScaleX = this.scaleX;
        this.startScaleY = this.scaleY;
        this.deltaX = this.endScaleX - this.startScaleX;
        this.deltaY = this.endScaleY - this.startScaleY;
    }




    public update(time: number): void {

        if (!this.target) {
            return;
        }

        this.target.scaleX = this.startScaleX + this.deltaX * time;
        this.target.scaleY = this.startScaleY + this.deltaY * time;
    }


    public copy(): Action {
        return new ScaleTo(this.duration, this.scaleX, this.scaleY);
    }


}


export class ScaleBy extends ScaleTo {

    constructor(_duration: number, _scale: number);
    constructor(_duration: number, _scaleX: number, _scaleY: number);
    constructor(protected _duration: number = null, protected _scaleX: number = 1, protected _scaleY: number = null) {
        super(_duration, _scaleX, _scaleY);
    }

    public startWithTarget(target: Node): void {
        super.startWithTarget(target);

        this.deltaX = this.startScaleX * this.endScaleX - this.startScaleX;
        this.deltaY = this.startScaleY * this.endScaleY - this.startScaleY;
    }


    public reverse(): Action {
        return new ScaleTo(this.duration, 1 / this.endScaleX, 1 / this.endScaleY);
    }
}

export class RotateTo extends ActionInterval {

    get dstAngle(): number {
        return this.getValue("_dstAngle");
    }
    set dstAngle(value: number) {
        this.setValue("_dstAngle", null, value, true);
    }
    protected _startAngle: number = 0;
    get startAngle(): number {
        return this.getValue("_startAngle");
    }
    set startAngle(value: number) {
        this.setValue("_startAngle", null, value, true);
    }
    protected _diffAngle: number = 0;
    get diffAngle(): number {
        return this.getValue("_diffAngle");
    }
    set diffAngle(value: number) {
        this.setValue("_diffAngle", null, value, true);
    }

    constructor(protected _duration:number, protected _dstAngle: number) {
        super(_duration)
    }

    public startWithTarget(target: Node): void {
        super.startWithTarget(target);

        this.startAngle = target.rotation;

        if (this.startAngle > 0) {
            this.startAngle = (this.startAngle % 360);
        } else {
            this.startAngle = (this.startAngle % -360);
        }

        this.diffAngle = this.dstAngle - this.startAngle;
        if (this.diffAngle > 180) {
            this.diffAngle -= 360;
        } else if (this.diffAngle < -180) {
            this.diffAngle += 360;
        }
    }


    public update(time: number): void {

        if (!this.target) {
            return;
        }

        this.target.rotation = this.startAngle + this.diffAngle * time;
    }

    public copy(): Action {
        return new RotateTo(this.duration, this.dstAngle);
    }

}


export class RotateBy extends RotateTo {

    get angle(): number {
        return this.getValue("_angle");
    }
    set angle(value: number) {
        this.setValue("_angle", null, value, true);
    }

    constructor(protected _duration: number, protected _angle: number) {
        super(_duration, _angle);
    }


    public startWithTarget(target: Node): void {
        super.startWithTarget(target);

        this.startAngle = target.rotation;
    }


    public update(time: number): void {

        if (!this.target) {
            return;
        }

        this.target.rotation = this.startAngle + this.angle * time;
    }

    public copy(): Action {
        return new RotateBy(this.duration, this.angle);
    }
    public reverse(): Action {
        return new RotateBy(this.duration, -this.angle);
    }


}


export class MoveTo extends ActionInterval {
    get endPosition(): geometry.Point {
        return this.getValue("_endPosition");
    }
    set endPosition(value: geometry.Point) {
        this.setValue("_endPosition", null, value, true);
    }
    protected _startPosition: geometry.Point = null;
    get startPosition(): geometry.Point {
        return this.getValue("_startPosition");
    }
    set startPosition(value: geometry.Point) {
        this.setValue("_startPosition", null, value, true);
    }
    protected _delta: geometry.Point = null;
    get delta(): geometry.Point {
        return this.getValue("_delta");
    }
    set delta(value: geometry.Point) {
        this.setValue("_delta", null, value, true);
    }

    constructor(protected _duration: number, protected _endPosition: geometry.Point) {
        super(_duration);
        this.endPosition = util.copy(_endPosition);
    }

    public startWithTarget(target: Node): void {
        super.startWithTarget(target);

        this.startPosition = util.copy(target.position);
        this.delta = geometry.ccpSub(this.endPosition, this.startPosition);
    }


    public update(time: number): void {

        if (!this.target) {
            return;
        }

        var startPosition = this.startPosition,
            delta = this.delta;
        this.target.position = ccp(startPosition.x + delta.x * time, startPosition.y + delta.y * time);
    }

    public copy(): Action {
        return new MoveTo(this.duration, this.endPosition);
    }
}

export class MoveBy extends MoveTo {

    constructor(protected _duration: number, protected _position: geometry.Point) {
        super(_duration, _position);
        this.delta = util.copy(_position);
    }

    public startWithTarget(target: Node): void {
        var dTmp = this.delta;
        super.startWithTarget(target);
        this.delta = dTmp;
    }


    public copy(): Action {
        return new MoveBy(this.duration, this.delta);
    }
    public reverse(): Action {
        return new MoveBy(this.duration, ccp(-this.delta.x, -this.delta.y));
    }


}

export class JumpBy extends ActionInterval {

    get delta(): geometry.Point {
        return this.getValue("_delta");
    }
    set delta(value: geometry.Point) {
        this.setValue("_delta", null, value, true);
    }
    get height(): number {
        return this.getValue("_height");
    }
    set height(value: number) {
        this.setValue("_height", null, value, true);
    }
    get jumps(): number {
        return this.getValue("_jumps");
    }
    set jumps(value: number) {
        this.setValue("_jumps", null, value, true);
    }
    protected _startPosition: geometry.Point = null;
    get startPosition(): geometry.Point {
        return this.getValue("_startPosition");
    }
    set startPosition(value: geometry.Point) {
        this.setValue("_startPosition", null, value, true);
    }

    constructor(protected _duration: number, protected _delta: geometry.Point = null, protected _height: number = 0, _jumps: number = 0) {
        super(_duration);


        this.delta = util.copy(_delta);
    }


    public update(t: number): void {

        if (!this.target) {
            return;
        }

        var frac = (t * this.jumps) % 1.0;
        var y = this.height * 4 * frac * (1 - frac);
        y += this.delta.y * t;
        var x = this.delta.x * t;
        this.target.position = geometry.ccp(this.startPosition.x + x, this.startPosition.y + y);
    }
    public startWithTarget(target: Node): void {
        super.startWithTarget(target);
        this.startPosition =  target.position;
    }


    public copy(): Action {
        return new JumpBy(this.duration, this.delta, this.height, this.jumps);
    }
    public reverse(): Action {
        return new JumpBy(this.duration, ccp(-this.delta.x, -this.delta.y), this.height, this.jumps);
    }
}

export class JumpTo extends JumpBy {




    constructor(protected _duration: number, protected _delta: geometry.Point = null, protected _height: number = 0, _jumps: number = 0) {
        super(_duration, _delta, _height, _jumps);

    }

    public startWithTarget(target: Node): void {
        super.startWithTarget(target);
        this.delta = geometry.ccp(this.delta.x - this.startPosition.x, this.delta.y - this.startPosition.y);
    }
}


export class BezierBy extends ActionInterval {

}