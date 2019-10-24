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
}
//# sourceMappingURL=ActionInterval.js.map