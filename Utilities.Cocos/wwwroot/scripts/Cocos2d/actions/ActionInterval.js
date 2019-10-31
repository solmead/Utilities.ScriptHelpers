import { geometry } from "../libs/geometry";
import { FiniteTimeAction } from "./Action";
import { util } from "../libs/util";
var ccp = geometry.ccp;
export class ActionInterval extends FiniteTimeAction {
    constructor(_duration = null) {
        super();
        this._duration = _duration;
        this._elapsed = 0;
        this._firstTick = true;
        var dur = _duration || 0;
        if (dur === 0) {
            dur = 0.0000001;
        }
        this.duration = dur;
        this.elapsed = 0;
        this._firstTick = true;
    }
    get elapsed() {
        return this.getValue("_elapsed");
    }
    set elapsed(value) {
        this.setValue("_elapsed", null, value, true);
    }
    get isDone() {
        return (this.elapsed >= this.duration);
    }
    step(dt) {
        if (this._firstTick) {
            this._firstTick = false;
            this.elapsed = 0;
        }
        else {
            this.elapsed += dt;
        }
        this.update(Math.min(1, this.elapsed / this.duration));
    }
    update(time) {
        //super.update(time);
        //throw new Error("Method not implemented.");
    }
    startWithTarget(target) {
        super.startWithTarget(target);
        this.elapsed = 0.0;
        this._firstTick = true;
    }
}
export class DelayTime extends ActionInterval {
    update(time) {
        if (time === 1.0) {
            this.stop();
        }
    }
    copy() {
        return new DelayTime(this.duration);
    }
    reverse() {
        return new DelayTime(this.duration);
    }
}
export class ScaleTo extends ActionInterval {
    constructor(_duration = null, _scaleX = 1, _scaleY = null) {
        super(_duration);
        this._duration = _duration;
        this._scaleX = _scaleX;
        this._scaleY = _scaleY;
        this._startScaleX = 1;
        this._startScaleY = 1;
        this._endScaleX = 1;
        this._endScaleY = 1;
        this._deltaX = 1;
        this._deltaY = 1;
        if (this._scaleY == null) {
            this._scaleY = this._scaleX;
        }
        this.endScaleX = this.scaleX;
        this.endScaleY = this.scaleY;
    }
    get scaleX() {
        return this.getValue("_scaleX");
    }
    set scaleX(value) {
        this.setValue("_scaleX", null, value, true);
    }
    get scaleY() {
        return this.getValue("_scaleY");
    }
    set scaleY(value) {
        this.setValue("_scaleY", null, value, true);
    }
    get startScaleX() {
        return this.getValue("_startScaleX");
    }
    set startScaleX(value) {
        this.setValue("_startScaleX", null, value, true);
    }
    get startScaleY() {
        return this.getValue("_startScaleY");
    }
    set startScaleY(value) {
        this.setValue("_startScaleY", null, value, true);
    }
    get endScaleX() {
        return this.getValue("_endScaleX");
    }
    set endScaleX(value) {
        this.setValue("_endScaleX", null, value, true);
    }
    get endScaleY() {
        return this.getValue("_endScaleY");
    }
    set endScaleY(value) {
        this.setValue("_endScaleY", null, value, true);
    }
    get deltaX() {
        return this.getValue("_deltaX");
    }
    set deltaX(value) {
        this.setValue("_deltaX", null, value, true);
    }
    get deltaY() {
        return this.getValue("_deltaY");
    }
    set deltaY(value) {
        this.setValue("_deltaY", null, value, true);
    }
    startWithTarget(target) {
        super.startWithTarget(target);
        this.startScaleX = this.scaleX;
        this.startScaleY = this.scaleY;
        this.deltaX = this.endScaleX - this.startScaleX;
        this.deltaY = this.endScaleY - this.startScaleY;
    }
    update(time) {
        if (!this.target) {
            return;
        }
        this.target.scaleX = this.startScaleX + this.deltaX * time;
        this.target.scaleY = this.startScaleY + this.deltaY * time;
    }
    copy() {
        return new ScaleTo(this.duration, this.scaleX, this.scaleY);
    }
}
export class ScaleBy extends ScaleTo {
    constructor(_duration = null, _scaleX = 1, _scaleY = null) {
        super(_duration, _scaleX, _scaleY);
        this._duration = _duration;
        this._scaleX = _scaleX;
        this._scaleY = _scaleY;
    }
    startWithTarget(target) {
        super.startWithTarget(target);
        this.deltaX = this.startScaleX * this.endScaleX - this.startScaleX;
        this.deltaY = this.startScaleY * this.endScaleY - this.startScaleY;
    }
    reverse() {
        return new ScaleTo(this.duration, 1 / this.endScaleX, 1 / this.endScaleY);
    }
}
export class RotateTo extends ActionInterval {
    constructor(_duration, _dstAngle) {
        super(_duration);
        this._duration = _duration;
        this._dstAngle = _dstAngle;
        this._startAngle = 0;
        this._diffAngle = 0;
    }
    get dstAngle() {
        return this.getValue("_dstAngle");
    }
    set dstAngle(value) {
        this.setValue("_dstAngle", null, value, true);
    }
    get startAngle() {
        return this.getValue("_startAngle");
    }
    set startAngle(value) {
        this.setValue("_startAngle", null, value, true);
    }
    get diffAngle() {
        return this.getValue("_diffAngle");
    }
    set diffAngle(value) {
        this.setValue("_diffAngle", null, value, true);
    }
    startWithTarget(target) {
        super.startWithTarget(target);
        this.startAngle = target.rotation;
        if (this.startAngle > 0) {
            this.startAngle = (this.startAngle % 360);
        }
        else {
            this.startAngle = (this.startAngle % -360);
        }
        this.diffAngle = this.dstAngle - this.startAngle;
        if (this.diffAngle > 180) {
            this.diffAngle -= 360;
        }
        else if (this.diffAngle < -180) {
            this.diffAngle += 360;
        }
    }
    update(time) {
        if (!this.target) {
            return;
        }
        this.target.rotation = this.startAngle + this.diffAngle * time;
    }
    copy() {
        return new RotateTo(this.duration, this.dstAngle);
    }
}
export class RotateBy extends RotateTo {
    constructor(_duration, _angle) {
        super(_duration, _angle);
        this._duration = _duration;
        this._angle = _angle;
    }
    get angle() {
        return this.getValue("_angle");
    }
    set angle(value) {
        this.setValue("_angle", null, value, true);
    }
    startWithTarget(target) {
        super.startWithTarget(target);
        this.startAngle = target.rotation;
    }
    update(time) {
        if (!this.target) {
            return;
        }
        this.target.rotation = this.startAngle + this.angle * time;
    }
    copy() {
        return new RotateBy(this.duration, this.angle);
    }
    reverse() {
        return new RotateBy(this.duration, -this.angle);
    }
}
export class MoveTo extends ActionInterval {
    constructor(_duration, _endPosition) {
        super(_duration);
        this._duration = _duration;
        this._endPosition = _endPosition;
        this._startPosition = null;
        this._delta = null;
        this.endPosition = util.copy(_endPosition);
    }
    get endPosition() {
        return this.getValue("_endPosition");
    }
    set endPosition(value) {
        this.setValue("_endPosition", null, value, true);
    }
    get startPosition() {
        return this.getValue("_startPosition");
    }
    set startPosition(value) {
        this.setValue("_startPosition", null, value, true);
    }
    get delta() {
        return this.getValue("_delta");
    }
    set delta(value) {
        this.setValue("_delta", null, value, true);
    }
    startWithTarget(target) {
        super.startWithTarget(target);
        this.startPosition = util.copy(target.position);
        this.delta = geometry.ccpSub(this.endPosition, this.startPosition);
    }
    update(time) {
        if (!this.target) {
            return;
        }
        var startPosition = this.startPosition, delta = this.delta;
        this.target.position = ccp(startPosition.x + delta.x * time, startPosition.y + delta.y * time);
    }
    copy() {
        return new MoveTo(this.duration, this.endPosition);
    }
}
export class MoveBy extends MoveTo {
    constructor(_duration, _position) {
        super(_duration, _position);
        this._duration = _duration;
        this._position = _position;
        this.delta = util.copy(_position);
    }
    startWithTarget(target) {
        var dTmp = this.delta;
        super.startWithTarget(target);
        this.delta = dTmp;
    }
    copy() {
        return new MoveBy(this.duration, this.delta);
    }
    reverse() {
        return new MoveBy(this.duration, ccp(-this.delta.x, -this.delta.y));
    }
}
export class JumpBy extends ActionInterval {
    constructor(_duration, _delta = null, _height = 0, _jumps = 0) {
        super(_duration);
        this._duration = _duration;
        this._delta = _delta;
        this._height = _height;
        this._startPosition = null;
        this.delta = util.copy(_delta);
    }
    get delta() {
        return this.getValue("_delta");
    }
    set delta(value) {
        this.setValue("_delta", null, value, true);
    }
    get height() {
        return this.getValue("_height");
    }
    set height(value) {
        this.setValue("_height", null, value, true);
    }
    get jumps() {
        return this.getValue("_jumps");
    }
    set jumps(value) {
        this.setValue("_jumps", null, value, true);
    }
    get startPosition() {
        return this.getValue("_startPosition");
    }
    set startPosition(value) {
        this.setValue("_startPosition", null, value, true);
    }
    update(t) {
        if (!this.target) {
            return;
        }
        var frac = (t * this.jumps) % 1.0;
        var y = this.height * 4 * frac * (1 - frac);
        y += this.delta.y * t;
        var x = this.delta.x * t;
        this.target.position = geometry.ccp(this.startPosition.x + x, this.startPosition.y + y);
    }
    startWithTarget(target) {
        super.startWithTarget(target);
        this.startPosition = target.position;
    }
    copy() {
        return new JumpBy(this.duration, this.delta, this.height, this.jumps);
    }
    reverse() {
        return new JumpBy(this.duration, ccp(-this.delta.x, -this.delta.y), this.height, this.jumps);
    }
}
export class JumpTo extends JumpBy {
    constructor(_duration, _delta = null, _height = 0, _jumps = 0) {
        super(_duration, _delta, _height, _jumps);
        this._duration = _duration;
        this._delta = _delta;
        this._height = _height;
    }
    startWithTarget(target) {
        super.startWithTarget(target);
        this.delta = geometry.ccp(this.delta.x - this.startPosition.x, this.delta.y - this.startPosition.y);
    }
}
export class BezierBy extends ActionInterval {
    constructor(_duration, _config) {
        super(_duration);
        this._duration = _duration;
        this._config = _config;
        this._startPosition = null;
    }
    get config() {
        return this.getValue("_config");
    }
    set config(value) {
        this.setValue("_config", null, value, true);
    }
    get startPosition() {
        return this.getValue("_startPosition");
    }
    set startPosition(value) {
        this.setValue("_startPosition", null, value, true);
    }
    startWithTarget(target) {
        super.startWithTarget(target);
        this.startPosition = target.position;
    }
    update(t) {
        if (!this.target) {
            return;
        }
        var c = this.config;
        var xa = 0, xb = c.controlPoint1.x, xc = c.controlPoint2.x, xd = c.endPosition.x, ya = 0, yb = c.controlPoint1.y, yc = c.controlPoint2.y, yd = c.endPosition.y;
        var x = BezierBy.bezierat(xa, xb, xc, xd, t);
        var y = BezierBy.bezierat(ya, yb, yc, yd, t);
        this.target.position = geometry.ccpAdd(this.startPosition, geometry.ccp(x, y));
    }
    copy() {
        return new BezierBy(this.duration, this.config);
    }
    reverse() {
        var c = this.config, bc = new geometry.BezierConfig(geometry.ccpAdd(c.controlPoint2, geometry.ccpNeg(c.endPosition)), geometry.ccpAdd(c.controlPoint2, geometry.ccpNeg(c.endPosition)), geometry.ccpNeg(c.endPosition));
        return new BezierBy(this.duration, bc);
    }
    static bezierat(a, b, c, d, t) {
        return Math.pow(1 - t, 3) * a +
            3 * t * Math.pow(1 - t, 2) * b +
            3 * Math.pow(t, 2) * (1 - t) * c +
            Math.pow(t, 3) * d;
    }
}
export class BezierTo extends BezierBy {
    startWithTarget(target) {
        super.startWithTarget(target);
        var c = this.config;
        c.controlPoint1 = geometry.ccpSub(c.controlPoint1, this.startPosition);
        c.controlPoint2 = geometry.ccpSub(c.controlPoint2, this.startPosition);
        c.endPosition = geometry.ccpSub(c.endPosition, this.startPosition);
    }
}
export class Blink extends ActionInterval {
    constructor(_duration, _times = 1) {
        super(_duration);
        this._duration = _duration;
        this._times = _times;
    }
    get times() {
        return this.getValue("_times");
    }
    set times(value) {
        this.setValue("_times", null, value, true);
    }
    update(t) {
        if (!this.target) {
            return;
        }
        if (!this.isDone) {
            var slice = 1 / this.times;
            var m = t % slice;
            this.target.visible = (m > slice / 2);
        }
    }
    copy() {
        return new Blink(this.duration, this.times);
    }
    reverse() {
        return this.copy();
    }
}
export class FadeOut extends ActionInterval {
    update(t) {
        var target = this.target;
        if (!target)
            return;
        target.opacity = 255 - (255 * t);
    }
    copy() {
        return new FadeOut(this.duration);
    }
    reverse() {
        return new FadeIn(this.duration);
    }
}
export class FadeIn extends ActionInterval {
    update(t) {
        var target = this.target;
        if (!target)
            return;
        target.opacity = (255 * t);
    }
    copy() {
        return new FadeIn(this.duration);
    }
    reverse() {
        return new FadeOut(this.duration);
    }
}
export class FadeTo extends ActionInterval {
    constructor(_duration, _toOpacity = 1) {
        super(_duration);
        this._duration = _duration;
        this._toOpacity = _toOpacity;
        this._fromOpacity = 1;
    }
    get fromOpacity() {
        return this.getValue("_fromOpacity");
    }
    set fromOpacity(value) {
        this.setValue("_fromOpacity", null, value, true);
    }
    get toOpacity() {
        return this.getValue("_toOpacity");
    }
    set toOpacity(value) {
        this.setValue("_toOpacity", null, value, true);
    }
    startWithTarget(target) {
        super.startWithTarget(target);
        this.fromOpacity = this.target.opacity;
    }
    update(t) {
        var target = this.target;
        if (!target)
            return;
        target.opacity = this.fromOpacity + (this.toOpacity - this.fromOpacity) * t;
    }
    copy() {
        return new FadeTo(this.duration, this.toOpacity);
    }
    reverse() {
        return new FadeTo(this.duration, this.fromOpacity);
    }
}
export class Sequence extends ActionInterval {
    constructor(one, two) {
        super(one.duration + two.duration);
        this.one = one;
        this.two = two;
        this._actions = new Array();
        this._split = 0;
        this._last = 0;
        this.actions[0] = one;
        this.actions[1] = two;
    }
    get actions() {
        return this.getValue("_actions");
    }
    set actions(value) {
        this.setValue("_actions", null, value, true);
    }
    get split() {
        return this.getValue("_split");
    }
    set split(value) {
        this.setValue("_split", null, value, true);
    }
    get last() {
        return this.getValue("_last");
    }
    set last(value) {
        this.setValue("_last", null, value, true);
    }
    static create(actions) {
        var prev = actions[0].copy();
        // Recursively create Sequence with pair of actions
        for (var i = 1; i < actions.length; i++) {
            var now = actions[i].copy();
            if (now) {
                prev = new Sequence(prev, now);
            }
            else {
                break;
            }
        }
        return prev;
    }
    startWithTarget(target) {
        super.startWithTarget(target);
        this.split = this.actions[0].duration / this.duration;
        this.last = -1;
    }
    stop() {
        this.actions[0].stop();
        this.actions[1].stop();
        super.stop();
    }
    update(t) {
        var target = this.target;
        if (!target)
            return;
        // This is confusing but will hopefully work better in conjunction
        // with modifer actions like Repeat & Spawn...
        var found = 0;
        var new_t = 0;
        if (t >= this.split) {
            found = 1;
            if (this.split == 1) {
                new_t = 1;
            }
            else {
                new_t = (t - this.split) / (1 - this.split);
            }
        }
        else {
            found = 0;
            if (this.split != 0) {
                new_t = t / this.split;
            }
            else {
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
    copy() {
        return new Sequence(this.one, this.two);
    }
    reverse() {
        return new Sequence(this.two.reverse(), this.one.reverse());
    }
}
export class Repeat extends ActionInterval {
    constructor(_duration, _other, _times = 1) {
        super(_duration);
        this._duration = _duration;
        this._other = _other;
        this._times = _times;
        this._total = 0;
        this.other = _other.copy();
    }
    get times() {
        return this.getValue("_times");
    }
    set times(value) {
        this.setValue("_times", null, value, true);
    }
    get total() {
        return this.getValue("_total");
    }
    set total(value) {
        this.setValue("_total", null, value, true);
    }
    get other() {
        return this.getValue("_other");
    }
    set other(value) {
        this.setValue("_other", null, value, true);
    }
    startWithTarget(target) {
        this.total = 0;
        super.startWithTarget(target);
        this.other.startWithTarget(target);
    }
    update(t) {
        var target = this.target;
        if (!target)
            return;
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
            }
            else {
                // otherwise start next repeat
                this.other.update(t - this.total);
            }
        }
        else {
            var r = t % 1.0;
            // fix last repeat position otherwise it could be 0
            if (t == 1) {
                r = 1;
                this.total += 1;
            }
            this.other.update(Math.min(r, 1));
        }
    }
    get isDone() {
        return this.total == this.times;
    }
    copy() {
        return new Repeat(this.duration, this.other, this.times);
    }
    reverse() {
        return new Repeat(this.duration, this.other.reverse(), this.times);
    }
}
export class Spawn extends ActionInterval {
    constructor(action1, action2) {
        super(Math.max(action1.duration, action2.duration));
        this.action1 = action1;
        this.action2 = action2;
        var d1 = action1.duration, d2 = action2.duration;
        this.one = action1;
        this.two = action2;
        if (d1 > d2) {
            this.two = new Sequence(action2, new DelayTime(d1 - d2));
        }
        else if (d1 < d2) {
            this.one = new Sequence(action1, new DelayTime(d2 - d1));
        }
    }
    get one() {
        return this.getValue("_one");
    }
    set one(value) {
        this.setValue("_one", null, value, true);
    }
    get two() {
        return this.getValue("_two");
    }
    set two(value) {
        this.setValue("_two", null, value, true);
    }
    static Create(actions) {
        var now, prev = actions.shift();
        while (actions.length > 0) {
            now = actions.shift();
            if (now) {
                prev = new Spawn(prev, now);
            }
            else {
                break;
            }
        }
        return prev;
    }
    startWithTarget(target) {
        super.startWithTarget(target);
        this.one.startWithTarget(target);
        this.two.startWithTarget(target);
    }
    stop() {
        this.one.stop();
        this.two.stop();
        super.stop();
    }
    step(dt) {
        if (this._firstTick) {
            this._firstTick = false;
            this.elapsed = 0;
        }
        else {
            this.elapsed += dt;
        }
        this.one.step(dt);
        this.two.step(dt);
    }
    update(t) {
        this.one.update(t);
        this.two.update(t);
    }
    copy() {
        return new Spawn(this.one.copy(), this.two.copy());
    }
    reverse() {
        return new Spawn(this.one.reverse(), this.two.reverse());
    }
}
export class Animate extends ActionInterval {
    constructor(_animation, _restoreOriginalFrame = true) {
        super(_animation.frames.length * _animation.delay);
        this._animation = _animation;
        this._restoreOriginalFrame = _restoreOriginalFrame;
        this.restoreOriginalFrame = _restoreOriginalFrame !== false;
    }
    get animation() {
        return this.getValue("_animation");
    }
    set animation(value) {
        this.setValue("_animation", null, value, true);
    }
    get restoreOriginalFrame() {
        return this.getValue("_restoreOriginalFrame");
    }
    set restoreOriginalFrame(value) {
        this.setValue("_restoreOriginalFrame", null, value, true);
    }
    get origFrame() {
        return this.getValue("_origFrame");
    }
    set origFrame(value) {
        this.setValue("_origFrame", null, value, true);
    }
    startWithTarget(target) {
        super.startWithTarget(target);
        if (this.restoreOriginalFrame) {
            this.origFrame = this.target.displayFrame;
        }
    }
    stop() {
        if (this.target && this.restoreOriginalFrame) {
            var sprite = this.target;
            sprite.displayFrame = this.origFrame;
        }
        super.stop();
    }
    update(t) {
        var frames = this.animation.frames, numberOfFrames = frames.length, idx = Math.floor(t * numberOfFrames);
        if (idx >= numberOfFrames) {
            idx = numberOfFrames - 1;
        }
        var sprite = this.target;
        if (!sprite.isFrameDisplayed(frames[idx])) {
            sprite.displayFrame = frames[idx];
        }
    }
    copy() {
        return new Animate(this.animation, this.restoreOriginalFrame);
    }
}
//# sourceMappingURL=ActionInterval.js.map