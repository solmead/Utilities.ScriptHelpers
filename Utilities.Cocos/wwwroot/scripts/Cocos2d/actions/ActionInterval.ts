import { geometry } from "../libs/geometry";
import { FiniteTimeAction, Action } from "./Action";
import { Node } from "../nodes/Node";
import { util } from "../libs/util";
import { Animation } from "../Animation";
import { SpriteFrame } from "../SpriteFrame";
import { Sprite } from "../nodes/Sprite";


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

    get config(): geometry.BezierConfig {
        return this.getValue("_config");
    }
    set config(value: geometry.BezierConfig) {
        this.setValue("_config", null, value, true);
    }

    protected _startPosition: geometry.Point = null;
    get startPosition(): geometry.Point {
        return this.getValue("_startPosition");
    }
    set startPosition(value: geometry.Point) {
        this.setValue("_startPosition", null, value, true);
    }


    constructor(protected _duration: number, protected _config: geometry.BezierConfig) {
        super(_duration)
    }

    public startWithTarget(target: Node): void {
        super.startWithTarget(target);
        this.startPosition = target.position;
    }

    public update(t: number): void {

        if (!this.target) {
            return;
        }

        var c = this.config;
        var xa = 0,
            xb = c.controlPoint1.x,
            xc = c.controlPoint2.x,
            xd = c.endPosition.x,
            ya = 0,
            yb = c.controlPoint1.y,
            yc = c.controlPoint2.y,
            yd = c.endPosition.y;

        var x = BezierBy.bezierat(xa, xb, xc, xd, t);
        var y = BezierBy.bezierat(ya, yb, yc, yd, t);

        this.target.position = geometry.ccpAdd(this.startPosition, geometry.ccp(x, y));
    }

    public copy(): Action {
        return new BezierBy(this.duration, this.config);
    }
    public reverse(): Action {

        var c = this.config,
            bc = new geometry.BezierConfig(
                geometry.ccpAdd(c.controlPoint2, geometry.ccpNeg(c.endPosition)),
                geometry.ccpAdd(c.controlPoint2, geometry.ccpNeg(c.endPosition)),
                geometry.ccpNeg(c.endPosition));


        return new BezierBy(this.duration, bc);
    }


    static bezierat(a: number, b: number, c: number, d: number, t: number): number {
        return Math.pow(1 - t, 3) * a +
            3 * t * Math.pow(1 - t, 2) * b +
            3 * Math.pow(t, 2) * (1 - t) * c +
            Math.pow(t, 3) * d;
    }


}

export class BezierTo extends BezierBy {




    public startWithTarget(target: Node): void {
        super.startWithTarget(target);

        var c = this.config;
        c.controlPoint1 = geometry.ccpSub(c.controlPoint1, this.startPosition);
        c.controlPoint2 = geometry.ccpSub(c.controlPoint2, this.startPosition);
        c.endPosition = geometry.ccpSub(c.endPosition, this.startPosition);
    }

}

export class Blink extends ActionInterval {

    get times(): number {
        return this.getValue("_times");
    }
    set times(value: number) {
        this.setValue("_times", null, value, true);
    }



    constructor(protected _duration: number, protected _times:number = 1) {
        super(_duration);
    }


    public update(t: number): void {

        if (!this.target) {
            return;
        }

        if (!this.isDone) {
            var slice = 1 / this.times;
            var m = t % slice;
            this.target.visible = (m > slice / 2);
        }
    }

    public copy(): Action {
        return new Blink(this.duration, this.times);
    }
    public reverse(): Action {
        return this.copy();
    }



}


export class FadeOut extends ActionInterval {

    public update(t: number): void {

        var target = this.target;
        if (!target) return;
        target.opacity = 255 - (255 * t);
    }

    public copy(): Action {
        return new FadeOut(this.duration);
    }
    public reverse(): Action {
        return new FadeIn(this.duration);
    }
}
export class FadeIn extends ActionInterval {

    public update(t: number): void {

        var target = this.target;
        if (!target) return;
        target.opacity = (255 * t);
    }

    public copy(): Action {
        return new FadeIn(this.duration);
    }
    public reverse(): Action {
        return new FadeOut(this.duration);
    }
}
export class FadeTo extends ActionInterval {
    protected _fromOpacity: number = 1
    get fromOpacity(): number {
        return this.getValue("_fromOpacity");
    }
    set fromOpacity(value: number) {
        this.setValue("_fromOpacity", null, value, true);
    }
    get toOpacity(): number {
        return this.getValue("_toOpacity");
    }
    set toOpacity(value: number) {
        this.setValue("_toOpacity", null, value, true);
    }



    constructor(protected _duration: number, protected _toOpacity: number = 1) {
        super(_duration);
    }


    public startWithTarget(target: Node): void {
        super.startWithTarget(target);
        this.fromOpacity = this.target.opacity;
    }

    public update(t: number): void {

        var target = this.target;
        if (!target) return;

        target.opacity = this.fromOpacity + (this.toOpacity - this.fromOpacity) * t;
    }

    public copy(): Action {
        return new FadeTo(this.duration, this.toOpacity);
    }
    public reverse(): Action {
        return new FadeTo(this.duration, this.fromOpacity);
    }
}

export class Sequence extends ActionInterval {
    protected _actions: Array<Action> = new Array<Action>();
    get actions(): number {
        return this.getValue("_actions");
    }
    set actions(value: number) {
        this.setValue("_actions", null, value, true);
    }
    protected _split: number = 0
    get split(): number {
        return this.getValue("_split");
    }
    set split(value: number) {
        this.setValue("_split", null, value, true);
    }
    protected _last: number = 0
    get last(): number {
        return this.getValue("_last");
    }
    set last(value: number) {
        this.setValue("_last", null, value, true);
    }

    static create(actions: Array<FiniteTimeAction>): Sequence {
        var prev = <FiniteTimeAction>actions[0].copy();

        // Recursively create Sequence with pair of actions
        for (var i = 1; i < actions.length; i++) {
            var now = <FiniteTimeAction>actions[i].copy();
            if (now) {
                prev = new Sequence(prev, now);
            } else {
                break;
            }
        }
        return <Sequence>prev;
    }

    constructor(private one: FiniteTimeAction, private two: FiniteTimeAction) {
        super(one.duration + two.duration);

        this.actions[0] = one;
        this.actions[1] = two;
    }


    public startWithTarget(target: Node): void {
        super.startWithTarget(target);
        this.split = this.actions[0].duration / this.duration;
        this.last = -1;
    }
    public stop(): void {
        this.actions[0].stop();
        this.actions[1].stop();
        super.stop();
    }
    public update(t: number): void {

        var target = this.target;
        if (!target) return;
        // This is confusing but will hopefully work better in conjunction
        // with modifer actions like Repeat & Spawn...
        var found = 0;
        var new_t = 0;

        if (t >= this.split) {
            found = 1;
            if (this.split == 1) {
                new_t = 1;
            } else {
                new_t = (t - this.split) / (1 - this.split);
            }
        } else {
            found = 0;
            if (this.split != 0) {
                new_t = t / this.split;
            } else {
                new_t = 1;
            }
        }
        if (this.last == -1 && found == 1) {
            this.actions[0].startWithTarget(this.target);
            this.actions[0].update(1);
            this.actions[0].stop();
        }
        if (this.last != found) {
            if (this.last != -1) {
                this.actions[this.last].update(1);
                this.actions[this.last].stop();
            }
            this.actions[found].startWithTarget(this.target);
        }
        this.actions[found].update(new_t);
        this.last = found;
    }

    public copy(): Action {
        return new Sequence(this.one, this.two);
    }
    public reverse(): Action {
        return new Sequence(<FiniteTimeAction>this.two.reverse(), <FiniteTimeAction>this.one.reverse());
    }
}


export class Repeat extends ActionInterval {
    get times(): number {
        return this.getValue("_times");
    }
    set times(value: number) {
        this.setValue("_times", null, value, true);
    }
    protected _total: number = 0
    get total(): number {
        return this.getValue("_total");
    }
    set total(value: number) {
        this.setValue("_total", null, value, true);
    }
    get other(): FiniteTimeAction {
        return this.getValue("_other");
    }
    set other(value: FiniteTimeAction) {
        this.setValue("_other", null, value, true);
    }



    constructor(protected _duration: number, protected _other: FiniteTimeAction, protected _times: number = 1) {
        super(_duration);

        this.other = <FiniteTimeAction>_other.copy();
    }


    public startWithTarget(target: Node): void {
        this.total = 0;
        super.startWithTarget(target);
        this.other.startWithTarget(target);
    }

    public update(t: number): void {

        var target = this.target;
        if (!target) return;
        var t = t * this.times;

        if (t > (this.total + 1)) {
            this.other.update(1);
            this.total += 1;
            this.other.stop();
            this.other.startWithTarget(this.target);

            // If repeat is over
            if (this.total == this.times) {
                // set it in the original position
                this.other.update(0);
            } else {
                // otherwise start next repeat
                this.other.update(t - this.total);
            }
        } else {
            var r = t % 1.0;

            // fix last repeat position otherwise it could be 0
            if (t == 1) {
                r = 1;
                this.total += 1;
            }
            this.other.update(Math.min(r, 1));
        }
    }

    public get isDone():boolean {
        return this.total == this.times;
    }

    public copy(): Action {
        return new Repeat(this.duration, this.other, this.times);
    }
    public reverse(): Action {
        return new Repeat(this.duration, <FiniteTimeAction>this.other.reverse(), this.times);
    }
}


export class Spawn extends ActionInterval {
    protected _one: FiniteTimeAction
    get one(): FiniteTimeAction {
        return this.getValue("_one");
    }
    set one(value: FiniteTimeAction) {
        this.setValue("_one", null, value, true);
    }
    protected _two: FiniteTimeAction
    get two(): FiniteTimeAction {
        return this.getValue("_two");
    }
    set two(value: FiniteTimeAction) {
        this.setValue("_two", null, value, true);
    }

    static Create(actions: Array<FiniteTimeAction>): Spawn {
        var now: FiniteTimeAction, prev: FiniteTimeAction = actions.shift();
        while (actions.length > 0) {
            now = actions.shift();
            if (now) {
                prev = new Spawn(prev, now);
            } else {
                break;
            }
        }
        return <Spawn>prev;
    }

    constructor(private action1: FiniteTimeAction, private action2: FiniteTimeAction) {
        super(Math.max(action1.duration, action2.duration));
        var d1 = action1.duration,
            d2 = action2.duration;

        this.one =action1;
        this.two = action2;

        if (d1 > d2) {
            this.two = new Sequence(action2,  new DelayTime(d1 - d2));
        } else if (d1 < d2) {
            this.one = new Sequence(action1, new DelayTime(d2 - d1));
        }
    }


    public startWithTarget(target: Node): void {
        super.startWithTarget(target);
        this.one.startWithTarget(target);
        this.two.startWithTarget(target);
    }

    public stop(): void {
        this.one.stop();
        this.two.stop();
        super.stop();
    }
    public step(dt: number): void {
        if (this._firstTick) {
            this._firstTick = false;
            this.elapsed = 0;
        } else {
            this.elapsed += dt;
        }
        this.one.step(dt);
        this.two.step(dt);
    }
    public update(t: number): void {

        this.one.update(t);
        this.two.update(t);
    }


    public copy(): Action {
        return new Spawn(<FiniteTimeAction>this.one.copy(), <FiniteTimeAction>this.two.copy());
    }
    public reverse(): Action {
        return new Spawn(<FiniteTimeAction>this.one.reverse(), <FiniteTimeAction>this.two.reverse());
    }
}



export class Animate extends ActionInterval {
    get animation(): Animation {
        return this.getValue("_animation");
    }
    set animation(value: Animation) {
        this.setValue("_animation", null, value, true);
    }
    get restoreOriginalFrame(): boolean {
        return this.getValue("_restoreOriginalFrame");
    }
    set restoreOriginalFrame(value: boolean) {
        this.setValue("_restoreOriginalFrame", null, value, true);
    }
    protected _origFrame: SpriteFrame
    get origFrame(): SpriteFrame {
        return this.getValue("_origFrame");
    }
    set origFrame(value: SpriteFrame) {
        this.setValue("_origFrame", null, value, true);
    }


    constructor(protected _animation: Animation, protected _restoreOriginalFrame: boolean = true) {
        super(_animation.frames.length * _animation.delay);

        this.restoreOriginalFrame = _restoreOriginalFrame !== false;


    }


    public startWithTarget(target: Sprite): void {
        super.startWithTarget(target);

        if (this.restoreOriginalFrame) {
            this.origFrame = (<Sprite> this.target).displayFrame;
        }
    }

    public stop(): void {

        if (this.target && this.restoreOriginalFrame) {
            var sprite = <Sprite>this.target;
            sprite.displayFrame = this.origFrame;
        }
        super.stop();
    }
    public update(t: number): void {
        var frames = this.animation.frames,
            numberOfFrames = frames.length,
            idx = Math.floor(t * numberOfFrames);

        if (idx >= numberOfFrames) {
            idx = numberOfFrames - 1;
        }

        var sprite = <Sprite>this.target;
        if (!sprite.isFrameDisplayed(frames[idx])) {
            sprite.displayFrame = frames[idx];
        }
    }


    public copy(): Action {
        return new Animate(this.animation, this.restoreOriginalFrame);
    }
}

