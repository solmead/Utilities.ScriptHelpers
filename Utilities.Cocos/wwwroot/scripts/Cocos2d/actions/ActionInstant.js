import { geometry } from "../libs/geometry";
import { FiniteTimeAction } from "./Action";
import { util } from "../libs/util";
var ccp = geometry.ccp;
export class ActionInstant extends FiniteTimeAction {
    constructor() {
        super();
        this.duration = 0;
    }
    step(dt) {
        this.update(1);
    }
    update(time) {
    }
    get isDone() {
        return true;
    }
    reverse() {
        return this.copy();
    }
    copy() {
        return this;
    }
}
export class Show extends ActionInstant {
    constructor() {
        super();
    }
    startWithTarget(target) {
        super.startWithTarget(target);
        this.target.visible = true;
    }
    reverse() {
        return new Hide();
    }
    copy() {
        return new Show();
    }
}
export class Hide extends ActionInstant {
    constructor() {
        super();
    }
    startWithTarget(target) {
        super.startWithTarget(target);
        this.target.visible = false;
    }
    reverse() {
        return new Show();
    }
    copy() {
        return new Hide();
    }
}
export class ToggleVisibility extends ActionInstant {
    constructor() {
        super();
    }
    startWithTarget(target) {
        super.startWithTarget(target);
        var vis = this.target.visible;
        this.target.visible = !vis;
    }
    copy() {
        return new ToggleVisibility();
    }
}
export class FlipX extends ActionInstant {
    constructor(_flipX) {
        super();
        this._flipX = _flipX;
    }
    get flipX() {
        return this.getValue("_flipX");
    }
    set flipX(value) {
        this.setValue("_flipX", null, value, true);
    }
    startWithTarget(target) {
        super.startWithTarget(target);
        this.target.flipX = this.flipX;
    }
    copy() {
        return new FlipX(this.flipX);
    }
    reverse() {
        return new FlipX(!this.flipX);
    }
}
export class FlipY extends ActionInstant {
    constructor(_flipY) {
        super();
        this._flipY = _flipY;
    }
    get flipY() {
        return this.getValue("_flipY");
    }
    set flipY(value) {
        this.setValue("_flipY", null, value, true);
    }
    startWithTarget(target) {
        super.startWithTarget(target);
        this.target.flipY = this.flipY;
    }
    copy() {
        return new FlipY(this.flipY);
    }
    reverse() {
        return new FlipY(!this.flipY);
    }
}
export class Place extends ActionInstant {
    constructor(_position) {
        super();
        this._position = _position;
        this.position = util.copy(this._position);
    }
    get position() {
        return this.getValue("_position");
    }
    set position(value) {
        this.setValue("_position", null, value, true);
    }
    startWithTarget(target) {
        super.startWithTarget(target);
        this.target.position = this.position;
    }
    copy() {
        return new Place(this.position);
    }
}
export class CallFunc extends ActionInstant {
    constructor(_target, _method) {
        super();
        this._target = _target;
        this._method = _method;
        this.target = _target;
        this.callback = util.callback(this.target, this.method);
    }
    get method() {
        return this.getValue("_method");
    }
    set method(value) {
        this.setValue("_method", null, value, true);
    }
    get callback() {
        return this.getValue("_callback");
    }
    set callback(value) {
        this.setValue("_callback", null, value, true);
    }
    startWithTarget(target) {
        super.startWithTarget(target);
        this.execute(target);
    }
    execute(target) {
        this.callback.call(this, target);
    }
    copy() {
        return new CallFunc(this.target, this.method);
    }
}
//# sourceMappingURL=ActionInstant.js.map