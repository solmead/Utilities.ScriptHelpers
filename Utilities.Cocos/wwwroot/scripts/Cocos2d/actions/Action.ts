import { BObject } from "../libs/bobject";
import { Node } from "../nodes/Node";
import { geometry } from "../libs/geometry";
import { Director } from "../Director";



var geo = geometry;
var ccp = geometry.ccp;



export abstract class Action extends BObject {

    protected _target: Node = null;
    get target(): Node {
        return this.getValue("_target");
    }
    set target(value: Node) {
        this.setValue("_target", null, value, true);
    }
    protected _originalTarget: Node = null;
    get originalTarget(): Node {
        return this.getValue("_originalTarget");
    }
    set originalTarget(value: Node) {
        this.setValue("_originalTarget", null, value, true);
    }
    /**
     * Unique tag to identify the node
     * @type *
     */
    protected _tag: string = null;
    get tag(): string {
        return this.getValue("_tag");
    }
    set tag(value: string) {
        this.setValue("_tag", null, value, true);
    }




    constructor() {
        super();

    }


/**
 * Called every frame with it's delta time.
 *
 * @param {Float} dt The delta time
 */
    public abstract step(dt: number): void;

/**
 * Called once per frame.
 *
 * @param {Float} time How much of the animation has played. 0.0 = just started, 1.0 just finished.
 */
    public abstract update(time: number): void;

    /**
     * Called before the action start. It will also set the target.
     *
     * @param {cocos.nodes.Node} target The Node to run the action on
     */
    public startWithTarget(target: Node): void {
        this.target = this.originalTarget = target;
    }
    /**
     * Called after the action has finished. It will set the 'target' to nil.
     * <strong>Important</strong>: You should never call cocos.actions.Action#stop manually.
     * Instead, use cocos.nodes.Node#stopAction(action)
     */
    public stop(): void {
        this.target = null;
    }

    /**
     * @getter isDone
     * @type {Boolean}
     */
    public get isDone(): boolean {
        return true;
    }
    /**
     * Returns a copy of this Action but in reverse
     *
     * @returns {cocos.actions.Action} A new Action in reverse
     */
    public reverse(): Action {
        return this;
    }
    public copy(): Action {
        return this;
    }
}

export class RepeatForever extends Action {
    get other(): Action {
        return this.getValue("_other");
    }
    set other(value: Action) {
        this.setValue("_other", null, value, true);
    }

    constructor(protected _other: Action) {
        super();
    }

    public startWithTarget(target: Node): void {
        super.startWithTarget(target);

        this.other.startWithTarget(this.target);
    }



    public step(dt: number): void {
        this.other.step(dt);
        if (this.other.isDone) {
            var diff = dt - (<any>this.other).duration - (<any>this.other).elapsed;
            this.other.startWithTarget(this.target);

            this.other.step(diff);
        }
    }


    public update(time: number): void {
        //throw new Error("Method not implemented.");
    }

    /**
     * @getter isDone
     * @type {Boolean}
     */
    public get isDone(): boolean {
        return false;
    }

    public reverse(): Action {
        return  new RepeatForever(this.other.reverse());
    }

    public copy(): Action {
        return new RepeatForever(this.other.copy());
    }


}




export abstract class FiniteTimeAction extends Action {

    protected _duration: number = 2;
    get duration(): number {
        return this.getValue("_duration");
    }
    set duration(value: number) {
        this.setValue("_duration", null, value, true);
    }

    constructor() {
        super();
    }



}

export class Speed extends Action {

    //public _other: Action;
    get other(): Action {
        return this.getValue("_other");
    }
    set other(value: Action) {
        this.setValue("_other", null, value, true);
    }

    //protected _speed: number = 1.0;
    get speed(): number {
        return this.getValue("_speed");
    }
    set speed(value: number) {
        this.setValue("_speed", null, value, true);
    }

    constructor(protected _other: Action, protected _speed: number) {
        super();

    }


    public startWithTarget(target: Node): void {
        super.startWithTarget(target);

        this.other.startWithTarget(this.target);
    }
    public stop(): void {
        this.other.stop();
        super.stop();
    }



    public step(dt: number): void {
        this.other.step(dt * this.speed);
    }
    public update(time: number): void {

    }
    public get isDone(): boolean {
        return this.other.isDone;
    }

    public reverse(): Action {
        return new Speed(this.other.reverse(), this.speed);
    }

    public copy(): Action {
        return new Speed(this.other.copy(), this.speed);
    }

}


export class Follow extends Action {

/**
 * node to follow
 */
    get followedNode(): Node {
        return this.getValue("_followedNode");
    }
    set followedNode(value: Node) {
        this.setValue("_followedNode", null, value, true);
    }
/**
 * whether camera should be limited to certain area
 * @type {Boolean}
 */
    protected _boundarySet: boolean = false;
    get boundarySet(): boolean {
        return this.getValue("_boundarySet");
    }
    set boundarySet(value: boolean) {
        this.setValue("_boundarySet", null, value, true);
    }
/**
 * if screensize is bigger than the boundary - update not needed
 * @type {Boolean}
 */
    protected _boundaryFullyCovered: boolean = false;
    get boundaryFullyCovered(): boolean {
        return this.getValue("_boundaryFullyCovered");
    }
    set boundaryFullyCovered(value: boolean) {
        this.setValue("_boundaryFullyCovered", null, value, true);
    }
/**
 * fast access to the screen dimensions
 * @type {geometry.Point}
 */
    protected _halfScreenSize: geometry.Point = null;
    get halfScreenSize(): geometry.Point {
        return this.getValue("_halfScreenSize");
    }
    set halfScreenSize(value: geometry.Point) {
        this.setValue("_halfScreenSize", null, value, true);
    }
    protected _fullScreenSize: geometry.Point = null;
    get fullScreenSize(): geometry.Point {
        return this.getValue("_fullScreenSize");
    }
    set fullScreenSize(value: geometry.Point) {
        this.setValue("_fullScreenSize", null, value, true);
    }



/**
 * world boundaries
 * @type {Float}
 */
    protected _leftBoundary: number = 0;
    get leftBoundary(): number {
        return this.getValue("_leftBoundary");
    }
    set leftBoundary(value: number) {
        this.setValue("_leftBoundary", null, value, true);
    }
    protected _rightBoundary: number = 0;
    get rightBoundary(): number {
        return this.getValue("_rightBoundary");
    }
    set rightBoundary(value: number) {
        this.setValue("_rightBoundary", null, value, true);
    }
    protected _topBoundary: number = 0;
    get topBoundary(): number {
        return this.getValue("_topBoundary");
    }
    set topBoundary(value: number) {
        this.setValue("_topBoundary", null, value, true);
    }
    protected _bottomBoundary: number = 0;
    get bottomBoundary(): number {
        return this.getValue("_bottomBoundary");
    }
    set bottomBoundary(value: number) {
        this.setValue("_bottomBoundary", null, value, true);
    }






    constructor(protected _followedNode: Node, private worldBoundary: geometry.Rect = null) {
        super();
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



    public step(dt: number): void {
        if (this.boundarySet) {
            // whole map fits inside a single screen, no need to modify the position - unless map boundaries are increased
            if (this.boundaryFullyCovered) {
                return;
            }
            var tempPos = geo.ccpSub(this.halfScreenSize, this.followedNode.position);
            this.target.position = ccp(
                Math.min(Math.max(tempPos.x, this.leftBoundary), this.rightBoundary),
                Math.min(Math.max(tempPos.y, this.bottomBoundary), this.topBoundary));
        } else {
            this.target.position = geo.ccpSub(this.halfScreenSize, this.followedNode.position);
        }
    }

    public update(time: number): void {
        //throw new Error("Method not implemented.");
    }


    public get isDone(): boolean {
        return !this.followedNode.isRunning;
    }



}