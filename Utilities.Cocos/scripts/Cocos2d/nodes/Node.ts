import { BObject } from "../libs/bobject";
import { Scheduler } from "../Scheduler";
import { ActionManager } from "../ActionManager";
import { geometry } from "../libs/geometry";
import { Director } from "../Director";
import { Action } from "../actions/Action";
import { Primitives } from "../libs/Primitives";
import { util } from "../libs/util";
import { events } from "../libs/events";




    export class Node extends BObject {
        protected _isCocosNode: boolean = true;
        get isCocosNode(): boolean {
            return this.getValue("_isCocosNode");
        }
        set isCocosNode(value: boolean) {
            this.setValue("_isCocosNode", null, value, true);
        }

        /**
            * Is the node visible
            * @type boolean
            */
        protected _visible: boolean = true;
        get visible(): boolean {
            return this.getValue("_visible");
        }
        set visible(value: boolean) {
            this.setValue("_visible", null, value, true);
        }
        /**
            * Position relative to parent node
            * @type geometry.Point
            */
        protected _position: geometry.Point = null;
        get position(): geometry.Point {
            return this.getValue("_position");
        }
        set position(value: geometry.Point) {
            this.setValue("_position", null, value, true);
        }
        /**
            * Parent node
            * @type cocos.nodes.Node
            */
        protected _parent: Node = null;
        get parent(): Node {
            return this.getValue("_parent");
        }
        set parent(value: Node) {
            this.setValue("_parent", null, value, true);
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
        /**
         * Size of the node
         * @type geometry.Size
         */
        protected _contentSize: geometry.Size = null;
        get contentSize(): geometry.Size {
            return this.getValue("_contentSize");
        }
        set contentSize(value: geometry.Size) {
            this.setValue("_contentSize", null, value, true);
        }
        /**
     * Nodes Z index. i.e. draw order
     * @type Integer
     */
        protected _zOrder: number = 0;
        get zOrder(): number {
            return this.getValue("_zOrder");
        }
        set zOrder(value: number) {
            this.setValue("_zOrder", null, value, true);
        }
        /**
     * Anchor point for scaling and rotation. 0x0 is top left and 1x1 is bottom right
     * @type geometry.Point
     */
        protected _anchorPoint: geometry.Point = null;
        get anchorPoint(): geometry.Point {
            return this.getValue("_anchorPoint");
        }
        set anchorPoint(value: geometry.Point) {
            this.setValue("_anchorPoint", null, value, true);
        }
        /**
     * Anchor point for scaling and rotation in pixels from top left
     * @type geometry.Point
     */
        protected _anchorPointInPixels: geometry.Point = null;
        get anchorPointInPixels(): geometry.Point {
            return this.getValue("_anchorPointInPixels");
        }
        set anchorPointInPixels(value: geometry.Point) {
            this.setValue("_anchorPointInPixels", null, value, true);
        }
        /**
     * Rotation angle in degrees
     * @type Float
     */
        protected _rotation: number = 0;
        get rotation(): number {
            return this.getValue("_rotation");
        }
        set rotation(value: number) {
            this.setValue("_rotation", null, value, true);
        }
        /**
     * X scale factor
     * @type Float
     */
        protected _scaleX: number = 1;
        get scaleX(): number {
            return this.getValue("_scaleX");
        }
        set scaleX(value: number) {
            this.setValue("_scaleX", null, value, true);
        }
        /**
     * Y scale factor
     * @type Float
     */
        protected _scaleY: number = 1;
        get scaleY(): number {
            return this.getValue("_scaleY");
        }
        set scaleY(value: number) {
            this.setValue("_scaleY", null, value, true);
        }
        /**
     * Opacity of the Node. 0 is totally transparent, 255 is totally opaque
     * @type Float
     */
        protected _opacity: number = 255;
        get opacity(): number {
            return this.getValue("_opacity");
        }
        set opacity(value: number) {
            this.setValue("_opacity", null, value, true);
        }
        protected _isRunning: boolean = false;
        get isRunning(): boolean {
            return this.getValue("_isRunning");
        }
        set isRunning(value: boolean) {
            this.setValue("_isRunning", null, value, true);
        }
        protected _isRelativeAnchorPoint: boolean = true;
        get isRelativeAnchorPoint(): boolean {
            return this.getValue("_isRelativeAnchorPoint");
        }
        set isRelativeAnchorPoint(value: boolean) {
            this.setValue("_isRelativeAnchorPoint", null, value, true);
        }

        protected _isTransformDirty: boolean = true;
        get isTransformDirty(): boolean {
            return this.getValue("_isTransformDirty");
        }
        set isTransformDirty(value: boolean) {
            this.setValue("_isTransformDirty", null, value, true);
        }
        protected _isInverseDirty: boolean = true;
        get isInverseDirty(): boolean {
            return this.getValue("_isInverseDirty");
        }
        set isInverseDirty(value: boolean) {
            this.setValue("_isInverseDirty", null, value, true);
        }
        protected _inverse: geometry.TransformMatrix = null;
        get inverse(): geometry.TransformMatrix {
            return this.getValue("_inverse");
        }
        set inverse(value: geometry.TransformMatrix) {
            this.setValue("_inverse", null, value, true);
        }
        protected _transformMatrix: geometry.TransformMatrix = null;
        get transformMatrix(): geometry.TransformMatrix {
            return this.getValue("_transformMatrix");
        }
        set transformMatrix(value: geometry.TransformMatrix) {
            this.setValue("_transformMatrix", null, value, true);
        }

        /**
         * The child Nodes
         * @type cocos.nodes.Node[]
         */
        protected _children: Node[] = null;
        get children(): Node[] {
            return this.getValue("_children");
        }
        set children(value: Node[]) {
            this.setValue("_children", null, value, true);
        }

        constructor() {
            super();
            this.contentSize = new geometry.Size(0, 0);
            this.anchorPoint = geometry.ccp(0.5, 0.5);
            this.anchorPointInPixels = geometry.ccp(0, 0);
            this.position = geometry.ccp(0, 0);
            this.children = [];

            util.each(['scaleX', 'scaleY', 'rotation', 'position', 'anchorPoint', 'contentSize', 'isRelativeAnchorPoint'], util.callback(this, (key: string) => {
                events.addListener(this, key.toLowerCase() + '_changed', util.callback(this, this._dirtyTransform));
            }));
            events.addListener(this, 'anchorpoint_changed', util.callback(this, this._updateAnchorPointInPixels));
            events.addListener(this, 'contentsize_changed', util.callback(this, this._updateAnchorPointInPixels));
        }

        private _updateAnchorPointInPixels():void {
            var ap = this.anchorPoint,
                cs = this.contentSize;
            this.anchorPointInPixels = geometry.ccp(cs.width * ap.x, cs.height * ap.y);
        }
        /**
     * Add a child Node
     *
     * @opt {cocos.nodes.Node} child The child node to add
     * @opt {Integer} [z] Z Index for the child
     * @opt {Integer|String} [tag] A tag to reference the child with
     * @returns {cocos.nodes.Node} The node the child was added to. i.e. 'this'
     */
        public addChild(child: Node, z:number = null, tag:string = ""): Node {
            if (z === undefined || z === null) {
                z = child.zOrder;
            }

            //this.insertChild({child: child, z:z});
            var added = false;


            for (var i = 0, childLen = this.children.length; i < childLen; i++) {
                var c = this.children[i];
                if (c.zOrder > z) {
                    added = true;
                    this.children.splice(i, 0, child);
                    break;
                }
            }

            if (!added) {
                this.children.push(child);
            }

            child.tag = tag;
            child.zOrder = z;
            child.parent = this;

            if (this.isRunning) {
                child.onEnter();
            }

            return this;
        }

        public getChild(tag:string): Node {
            for (var i = 0; i < this.children.length; i++) {
                if (this.children[i].tag == tag) {
                    return this.children[i];
                }
            }

            return null;
        }
        public removeChild(child:Node, cleanup:boolean=false):void {
            if (!child) {
                return;
            }

            var children = this.children,
                idx = children.indexOf(child);

            if (idx > -1) {
                this.detatchChild(child, cleanup);
            }
        }
        public removeChildren(cleanup: boolean = false):void {
            var children = this.children,
                isRunning = this.isRunning;

            // Perform cleanup on each child but can't call removeChild()
            // due to Array.splice's destructive nature during iteration.
            for (var i = 0; i < children.length; i++) {
                if (cleanup) {
                    children[i].cleanup();
                }
                if (isRunning) {
                    children[i].onExit();
                }
                children[i].parent = null;
            }
            // Now safe to empty children list
            this.children = [];
        }
        public detatchChild = (child: Node, cleanup: boolean = false):void => {
            var children = this.children,
                isRunning = this.isRunning,
                idx = children.indexOf(child);

            if (isRunning) {
                child.onExit();
            }

            if (cleanup) {
                child.cleanup();
            }

            child.parent = null;
            children.splice(idx, 1);
        }
        public reorderChild(child: Node, z: number): void {
            var pos = this.children.indexOf(child);
            if (pos == -1) {
                throw "Node isn't a child of this node";
            }

            child.zOrder = z;

            // Remove child
            this.children.splice(pos, 1);

            // Add child back at correct location
            var added = false;
            for (var i = 0, childLen = this.children.length; i < childLen; i++) {
                var c = this.children[i];
                if (c.zOrder > z) {
                    added = true;
                    this.children.splice(i, 0, child);
                    break;
                }
            }

            if (!added) {
                this.children.push(child);
            }
        }

        /**
     * Draws the node. Override to do custom drawing. If it's less efficient to
     * draw only the area inside the rect then don't bother. The result will be
     * clipped to that area anyway.
     *
     * @param {CanvasRenderingContext2D|WebGLRenderingContext} context Canvas rendering context
     * @param {geometry.Rect} rect Rectangular region that needs redrawing. Limit drawing to this area only if it's more efficient to do so.
     */
        // | WebGLRenderingContext
        draw(context: CanvasRenderingContext2D): void;
        draw(context: CanvasRenderingContext2D, rect: geometry.Rect): void;
        public draw(context: CanvasRenderingContext2D, rect:geometry.Rect = null):void {
            // All draw code goes here
        }


        /**
     * @getter scale
     * @type Float
     */
        public get scale(): number {
            if (this.scaleX != this.scaleY) {
                throw "scaleX and scaleY aren't identical";
            }

            return this.scaleX;
        }

        /**
     * @setter scale
     * @type Float
     */
        public set scale(val: number) {
            this.scaleX = val;
            this.scaleY = val;
        }

        public scheduleUpdate(priority:number = 0):void {
            Scheduler.sharedScheduler().scheduleUpdate(new Scheduler.ScheduleOptions(this, null, 0, !this.isRunning, priority));
        }
        /**
     * Triggered when the node is added to a scene
     *
     * @event
     */
        public onEnter(): void {
            util.each(this.children, function (child) {
                child.onEnter();
            });

            this.resumeSchedulerAndActions();
            this.isRunning = true;
        }
        /**
     * Triggered when the node is removed from a scene
     *
     * @event
     */
        public onExit(): void {
            this.pauseSchedulerAndActions();
            this.isRunning = false;

            util.each(this.children, function (child) {
                child.onExit();
            });
        }

        public cleanup(): void {
            this.stopAllActions();
            this.unscheduleAllSelectors();
            util.each(this.children, function (child) {
                child.cleanup();
            });
        }


        public resumeSchedulerAndActions(): void {
            Scheduler.sharedScheduler().resumeTarget(this);
            ActionManager.sharedManager().resumeTarget(this);
        }
        public pauseSchedulerAndActions(): void {
            Scheduler.sharedScheduler().pauseTarget(this);
            ActionManager.sharedManager().pauseTarget(this);
        }
        public unscheduleSelector(selector:(...args: any[]) => void | string): void {
            Scheduler.sharedScheduler().unschedule(new Scheduler.ScheduleOptions(this, selector));
        }
        public unscheduleAllSelectors(): void {
            Scheduler.sharedScheduler().unscheduleAllSelectorsForTarget(this);
        }
        public stopAllActions(): void {
            ActionManager.sharedManager().removeAllActionsFromTarget(this);
        }
        // | WebGLRenderingContext

        visit(context: CanvasRenderingContext2D);
        visit(context: CanvasRenderingContext2D, rect: geometry.Rect);
        public visit(context: CanvasRenderingContext2D, rect: geometry.Rect = null): void {
            if (!this.visible) {
                return;
            }

            context.save();

            this.transform(context);

            // Set alpha value (global only for now)
            context.globalAlpha = this.opacity / 255.0;

            // Adjust redraw region by nodes position
            if (rect) {
                var pos = this.position;
                rect = new geometry.Rect(rect.origin.x - pos.x, rect.origin.y - pos.y, rect.size.width, rect.size.height);
            }

            // Draw background nodes
            util.each(this.children, function (child, i) {
                if (child.zOrder < 0) {
                    child.visit(context, rect);
                }
            });

            this.draw(context, rect);

            // Draw foreground nodes
            util.each(this.children, function (child, i) {
                if (child.zOrder >= 0) {
                    child.visit(context, rect);
                }
            });

            var director = Director.sharedDirector();
            if (!!director._showoutlines) {
                var r = new geometry.Rect(0, 0, this.contentSize.width, this.contentSize.height);
                Primitives.drawRect(context, r, "red", 1);
                //cocos2d.drawPoint(context, this.anchorPointInPixels, "blue");
            }
            context.restore();
        }
        // | WebGLRenderingContext
        public transform(context: CanvasRenderingContext2D): void {
            // Translate
            if (this.isRelativeAnchorPoint && (this.anchorPointInPixels.x !== 0 || this.anchorPointInPixels.y !== 0)) {
                context.translate(Math.round(-this.anchorPointInPixels.x), Math.round(-this.anchorPointInPixels.y));
            }

            if (this.anchorPointInPixels.x !== 0 || this.anchorPointInPixels.y !== 0) {
                context.translate(Math.round(this.position.x + this.anchorPointInPixels.x), Math.round(this.position.y + this.anchorPointInPixels.y));
            } else {
                context.translate(Math.round(this.position.x), Math.round(this.position.y));
            }

            // Rotate
            context.rotate(geometry.degreesToRadians(this.rotation));

            // Scale
            context.scale(this.scaleX, this.scaleY);

            if (this.anchorPointInPixels.x !== 0 || this.anchorPointInPixels.y !== 0) {
                context.translate(Math.round(-this.anchorPointInPixels.x), Math.round(-this.anchorPointInPixels.y));
            }
        }

        public runAction(action:Action) {
            ActionManager.sharedManager().addAction(this, action, !this.isRunning);
        }
        /**
    * @opts {String} tag Tag of the action to return
    */
        public getAction(tag:string):Action {
            return ActionManager.sharedManager().getActionFromTarget(this, tag);
        }

        public nodeToParentTransform(): geometry.TransformMatrix {
            if (this.isTransformDirty) {
                this.transformMatrix = geometry.affineTransformIdentity();

                if (!this.isRelativeAnchorPoint && !geometry.pointEqualToPoint(this.anchorPointInPixels, geometry.ccp(0, 0))) {
                    this.transformMatrix = geometry.affineTransformTranslate(this.transformMatrix, this.anchorPointInPixels.x, this.anchorPointInPixels.y);
                }

                if (!geometry.pointEqualToPoint(this.position, geometry.ccp(0, 0))) {
                    this.transformMatrix = geometry.affineTransformTranslate(this.transformMatrix, this.position.x, this.position.y);
                }

                if (this.rotation !== 0) {
                    this.transformMatrix = geometry.affineTransformRotate(this.transformMatrix, -geometry.degreesToRadians(this.rotation));
                }
                if (!(this.scaleX == 1 && this.scaleY == 1)) {
                    this.transformMatrix = geometry.affineTransformScale(this.transformMatrix, this.scaleX, this.scaleY);
                }

                if (!geometry.pointEqualToPoint(this.anchorPointInPixels, geometry.ccp(0, 0))) {
                    this.transformMatrix = geometry.affineTransformTranslate(this.transformMatrix, -this.anchorPointInPixels.x, -this.anchorPointInPixels.y);
                }

                this.isTransformDirty = false;

            }

            return this.transformMatrix;
        }

        public parentToNodeTransform(): geometry.TransformMatrix {
            // TODO
            return null;
        }

        public nodeToWorldTransform(): geometry.TransformMatrix {
            var t = this.nodeToParentTransform();

            var p;
            for (p = this.parent; p; p = p.parent) {
                t = geometry.affineTransformConcat(t, p.nodeToParentTransform());
            }

            return t;
        }

        public worldToNodeTransform(): geometry.TransformMatrix {
            return geometry.affineTransformInvert(this.nodeToWorldTransform());
        }

        public convertToNodeSpace(worldPoint:geometry.Point): geometry.Point {
            return geometry.pointApplyAffineTransform(worldPoint, this.worldToNodeTransform());
        }

        /**
     * @getter boundingBox
     * @type geometry.Rect
     */
        public get boundingBox(): geometry.Rect {
            var cs = this.contentSize;
            var rect = geometry.rectMake(0, 0, cs.width, cs.height);
            rect = geometry.rectApplyAffineTransform(rect, this.nodeToParentTransform());
            return rect;
        }
        /**
     * @getter worldBoundingBox
     * @type geometry.Rect
     */
        public get worldBoundingBox(): geometry.Rect {
            var cs = this.contentSize;

            var rect = geometry.rectMake(0, 0, cs.width, cs.height);
            rect = geometry.rectApplyAffineTransform(rect, this.nodeToWorldTransform());
            return rect;
        }
        /**
     * The area of the node currently visible on screen. Returns an rect even
     * if visible is false.
     *
     * @getter visibleRect
     * @type geometry.Rect
     */
        public get visibleRect(): geometry.Rect {
            var s = Director.sharedDirector().winSize;
            var rect = new geometry.Rect(
                0, 0,
                s.width, s.height
            );

            return geometry.rectApplyAffineTransform(rect, this.worldToNodeTransform());
        }
        /**
     * @private
     */
        private _dirtyTransform(): void {
            this.isTransformDirty = true;
        }

        /**
     * Schedules a custom method with an interval time in seconds.
     * If time is 0 it will be ticked every frame.
     * If time is 0, it is recommended to use 'scheduleUpdate' instead.
     *
     * If the method is already scheduled, then the interval parameter will
     * be updated without scheduling it again.
     *
     * @opt {String|Function} method Function of method name to schedule
     * @opt {Float} [interval=0] Interval in seconds
     */
        public schedule(method: ((...args: any[]) => void) | string, interval: number = 0): void {
            Scheduler.sharedScheduler().schedule(new Scheduler.ScheduleOptions(this, method, interval, this.isRunning));
        }


        /**
     * Unschedules a custom method
     *
     * @param {String|Function} method
     */
        public unschedule = (method: ((...args: any[]) => void) | string): void => {
            if (!method) {
                return;
            }

            if (typeof method == 'string') {
                method = this[method];
            }

            Scheduler.sharedScheduler().unschedule(new Scheduler.ScheduleOptions(this, method));
        }



    }






    //export class NodeOptions {
    //    public isCocosNode: boolean = false;
    //    public z: number = 0;
    //    public tag: string = "";

    //    constructor(public child: Node, public cleanup: boolean = false) {

    //    }


    //}


