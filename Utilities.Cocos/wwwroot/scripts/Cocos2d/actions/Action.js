import { BObject } from "../libs/bobject";
import { geometry } from "../libs/geometry";
import { Director } from "../Director";
var geo = geometry;
var ccp = geometry.ccp;
export class Action extends BObject {
    constructor() {
        super();
        this._target = null;
        this._originalTarget = null;
        /**
         * Unique tag to identify the node
         * @type *
         */
        this._tag = null;
    }
    get target() {
        return this.getValue("_target");
    }
    set target(value) {
        this.setValue("_target", null, value, true);
    }
    get originalTarget() {
        return this.getValue("_originalTarget");
    }
    set originalTarget(value) {
        this.setValue("_originalTarget", null, value, true);
    }
    get tag() {
        return this.getValue("_tag");
    }
    set tag(value) {
        this.setValue("_tag", null, value, true);
    }
    /**
     * Called before the action start. It will also set the target.
     *
     * @param {cocos.nodes.Node} target The Node to run the action on
     */
    startWithTarget(target) {
        this.target = this.originalTarget = target;
    }
    /**
     * Called after the action has finished. It will set the 'target' to nil.
     * <strong>Important</strong>: You should never call cocos.actions.Action#stop manually.
     * Instead, use cocos.nodes.Node#stopAction(action)
     */
    stop() {
        this.target = null;
    }
    /**
     * @getter isDone
     * @type {Boolean}
     */
    get isDone() {
        return true;
    }
    /**
     * Returns a copy of this Action but in reverse
     *
     * @returns {cocos.actions.Action} A new Action in reverse
     */
    reverse() {
        return this;
    }
    copy() {
        return this;
    }
}
export class RepeatForever extends Action {
    constructor(_other) {
        super();
        this._other = _other;
    }
    get other() {
        return this.getValue("_other");
    }
    set other(value) {
        this.setValue("_other", null, value, true);
    }
    startWithTarget(target) {
        super.startWithTarget(target);
        this.other.startWithTarget(this.target);
    }
    step(dt) {
        this.other.step(dt);
        if (this.other.isDone) {
            var diff = dt - this.other.duration - this.other.elapsed;
            this.other.startWithTarget(this.target);
            this.other.step(diff);
        }
    }
    update(time) {
        //throw new Error("Method not implemented.");
    }
    /**
     * @getter isDone
     * @type {Boolean}
     */
    get isDone() {
        return false;
    }
    reverse() {
        return new RepeatForever(this.other.reverse());
    }
    copy() {
        return new RepeatForever(this.other.copy());
    }
}
export class FiniteTimeAction extends Action {
    constructor() {
        super();
        this._duration = 2;
    }
    get duration() {
        return this.getValue("_duration");
    }
    set duration(value) {
        this.setValue("_duration", null, value, true);
    }
}
export class Speed extends Action {
    constructor(_other, _speed) {
        super();
        this._other = _other;
        this._speed = _speed;
    }
    //public _other: Action;
    get other() {
        return this.getValue("_other");
    }
    set other(value) {
        this.setValue("_other", null, value, true);
    }
    //protected _speed: number = 1.0;
    get speed() {
        return this.getValue("_speed");
    }
    set speed(value) {
        this.setValue("_speed", null, value, true);
    }
    startWithTarget(target) {
        super.startWithTarget(target);
        this.other.startWithTarget(this.target);
    }
    stop() {
        this.other.stop();
        super.stop();
    }
    step(dt) {
        this.other.step(dt * this.speed);
    }
    update(time) {
    }
    get isDone() {
        return this.other.isDone;
    }
    reverse() {
        return new Speed(this.other.reverse(), this.speed);
    }
    copy() {
        return new Speed(this.other.copy(), this.speed);
    }
}
export class Follow extends Action {
    constructor(_followedNode, worldBoundary = null) {
        super();
        this._followedNode = _followedNode;
        this.worldBoundary = worldBoundary;
        /**
         * whether camera should be limited to certain area
         * @type {Boolean}
         */
        this._boundarySet = false;
        /**
         * if screensize is bigger than the boundary - update not needed
         * @type {Boolean}
         */
        this._boundaryFullyCovered = false;
        /**
         * fast access to the screen dimensions
         * @type {geometry.Point}
         */
        this._halfScreenSize = null;
        this._fullScreenSize = null;
        /**
         * world boundaries
         * @type {Float}
         */
        this._leftBoundary = 0;
        this._rightBoundary = 0;
        this._topBoundary = 0;
        this._bottomBoundary = 0;
        var s = Director.sharedDirector().winSize;
        this.fullScreenSize = geo.ccp(s.width, s.height);
        this.halfScreenSize = geo.ccpMult(this.fullScreenSize, geo.ccp(0.5, 0.5));
        if (this.worldBoundary !== undefined) {
            this.boundarySet = true;
            this.leftBoundary = -((this.worldBoundary.origin.x + this.worldBoundary.size.width) - this.fullScreenSize.x);
            this.rightBoundary = -this.worldBoundary.origin.x;
            this.topBoundary = -this.worldBoundary.origin.y;
            this.bottomBoundary = -((this.worldBoundary.origin.y + this.worldBoundary.size.height) - this.fullScreenSize.y);
            if (this.rightBoundary < this.leftBoundary) {
                // screen width is larger than world's boundary width
                //set both in the middle of the world
                this.rightBoundary = this.leftBoundary = (this.leftBoundary + this.rightBoundary) / 2;
            }
            if (this.topBoundary < this.bottomBoundary) {
                // screen width is larger than world's boundary width
                //set both in the middle of the world
                this.topBoundary = this.bottomBoundary = (this.topBoundary + this.bottomBoundary) / 2;
            }
            if ((this.topBoundary == this.bottomBoundary) && (this.leftBoundary == this.rightBoundary)) {
                this.boundaryFullyCovered = true;
            }
        }
    }
    /**
     * node to follow
     */
    get followedNode() {
        return this.getValue("_followedNode");
    }
    set followedNode(value) {
        this.setValue("_followedNode", null, value, true);
    }
    get boundarySet() {
        return this.getValue("_boundarySet");
    }
    set boundarySet(value) {
        this.setValue("_boundarySet", null, value, true);
    }
    get boundaryFullyCovered() {
        return this.getValue("_boundaryFullyCovered");
    }
    set boundaryFullyCovered(value) {
        this.setValue("_boundaryFullyCovered", null, value, true);
    }
    get halfScreenSize() {
        return this.getValue("_halfScreenSize");
    }
    set halfScreenSize(value) {
        this.setValue("_halfScreenSize", null, value, true);
    }
    get fullScreenSize() {
        return this.getValue("_fullScreenSize");
    }
    set fullScreenSize(value) {
        this.setValue("_fullScreenSize", null, value, true);
    }
    get leftBoundary() {
        return this.getValue("_leftBoundary");
    }
    set leftBoundary(value) {
        this.setValue("_leftBoundary", null, value, true);
    }
    get rightBoundary() {
        return this.getValue("_rightBoundary");
    }
    set rightBoundary(value) {
        this.setValue("_rightBoundary", null, value, true);
    }
    get topBoundary() {
        return this.getValue("_topBoundary");
    }
    set topBoundary(value) {
        this.setValue("_topBoundary", null, value, true);
    }
    get bottomBoundary() {
        return this.getValue("_bottomBoundary");
    }
    set bottomBoundary(value) {
        this.setValue("_bottomBoundary", null, value, true);
    }
    step(dt) {
        if (this.boundarySet) {
            // whole map fits inside a single screen, no need to modify the position - unless map boundaries are increased
            if (this.boundaryFullyCovered) {
                return;
            }
            var tempPos = geo.ccpSub(this.halfScreenSize, this.followedNode.position);
            this.target.position = ccp(Math.min(Math.max(tempPos.x, this.leftBoundary), this.rightBoundary), Math.min(Math.max(tempPos.y, this.bottomBoundary), this.topBoundary));
        }
        else {
            this.target.position = geo.ccpSub(this.halfScreenSize, this.followedNode.position);
        }
    }
    update(time) {
        //throw new Error("Method not implemented.");
    }
    get isDone() {
        return !this.followedNode.isRunning;
    }
}
//# sourceMappingURL=Action.js.map