import { BObject } from "../libs/bobject";
import { Scheduler } from "../Scheduler";
import { ActionManager } from "../ActionManager";
import { geometry } from "../libs/geometry";
import { Director } from "../Director";
import { Primitives } from "../libs/Primitives";
import { util } from "../libs/util";
import { events } from "../libs/events";
export class Node extends BObject {
    constructor() {
        super();
        this._isCocosNode = true;
        /**
            * Is the node visible
            * @type boolean
            */
        this._visible = true;
        /**
            * Position relative to parent node
            * @type geometry.Point
            */
        this._position = null;
        /**
            * Parent node
            * @type cocos.nodes.Node
            */
        this._parent = null;
        /**
         * Unique tag to identify the node
         * @type *
         */
        this._tag = null;
        /**
         * Size of the node
         * @type geometry.Size
         */
        this._contentSize = null;
        /**
     * Nodes Z index. i.e. draw order
     * @type Integer
     */
        this._zOrder = 0;
        /**
     * Anchor point for scaling and rotation. 0x0 is top left and 1x1 is bottom right
     * @type geometry.Point
     */
        this._anchorPoint = null;
        /**
     * Anchor point for scaling and rotation in pixels from top left
     * @type geometry.Point
     */
        this._anchorPointInPixels = null;
        /**
     * Rotation angle in degrees
     * @type Float
     */
        this._rotation = 0;
        /**
     * X scale factor
     * @type Float
     */
        this._scaleX = 1;
        /**
     * Y scale factor
     * @type Float
     */
        this._scaleY = 1;
        /**
     * Opacity of the Node. 0 is totally transparent, 255 is totally opaque
     * @type Float
     */
        this._opacity = 255;
        this._isRunning = true;
        this._isRelativeAnchorPoint = true;
        this._isTransformDirty = true;
        this._isInverseDirty = true;
        this._inverse = null;
        this._transformMatrix = null;
        /**
         * The child Nodes
         * @type cocos.nodes.Node[]
         */
        this._children = null;
        this.detatchChild = (child, cleanup = false) => {
            var children = this.children, isRunning = this.isRunning, idx = children.indexOf(child);
            if (isRunning) {
                child.onExit();
            }
            if (cleanup) {
                child.cleanup();
            }
            child.parent = null;
            children.splice(idx, 1);
        };
        /**
     * Unschedules a custom method
     *
     * @param {String|Function} method
     */
        this.unschedule = (method) => {
            if (!method) {
                return;
            }
            if (typeof method == 'string') {
                method = this[method];
            }
            Scheduler.sharedScheduler().unschedule(new Scheduler.ScheduleOptions(this, method));
        };
        this.contentSize = new geometry.Size(0, 0);
        this.anchorPoint = geometry.ccp(0.5, 0.5);
        this.anchorPointInPixels = geometry.ccp(0, 0);
        this.position = geometry.ccp(0, 0);
        this.children = [];
        util.each(['scaleX', 'scaleY', 'rotation', 'position', 'anchorPoint', 'contentSize', 'isRelativeAnchorPoint'], util.callback(this, (key) => {
            events.addListener(this, key.toLowerCase() + '_changed', util.callback(this, this._dirtyTransform));
        }));
        events.addListener(this, 'anchorpoint_changed', util.callback(this, this._updateAnchorPointInPixels));
        events.addListener(this, 'contentsize_changed', util.callback(this, this._updateAnchorPointInPixels));
    }
    get isCocosNode() {
        return this.getValue("_isCocosNode");
    }
    set isCocosNode(value) {
        this.setValue("_isCocosNode", null, value, true);
    }
    get visible() {
        return this.getValue("_visible");
    }
    set visible(value) {
        this.setValue("_visible", null, value, true);
    }
    get position() {
        return this.getValue("_position");
    }
    set position(value) {
        this.setValue("_position", null, value, true);
    }
    get parent() {
        return this.getValue("_parent");
    }
    set parent(value) {
        this.setValue("_parent", null, value, true);
    }
    get tag() {
        return this.getValue("_tag");
    }
    set tag(value) {
        this.setValue("_tag", null, value, true);
    }
    get contentSize() {
        return this.getValue("_contentSize");
    }
    set contentSize(value) {
        this.setValue("_contentSize", null, value, true);
    }
    get zOrder() {
        return this.getValue("_zOrder");
    }
    set zOrder(value) {
        this.setValue("_zOrder", null, value, true);
    }
    get anchorPoint() {
        return this.getValue("_anchorPoint");
    }
    set anchorPoint(value) {
        this.setValue("_anchorPoint", null, value, true);
    }
    get anchorPointInPixels() {
        return this.getValue("_anchorPointInPixels");
    }
    set anchorPointInPixels(value) {
        this.setValue("_anchorPointInPixels", null, value, true);
    }
    get rotation() {
        return this.getValue("_rotation");
    }
    set rotation(value) {
        this.setValue("_rotation", null, value, true);
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
    get opacity() {
        return this.getValue("_opacity");
    }
    set opacity(value) {
        this.setValue("_opacity", null, value, true);
    }
    get isRunning() {
        return this.getValue("_isRunning");
    }
    set isRunning(value) {
        this.setValue("_isRunning", null, value, true);
    }
    get isRelativeAnchorPoint() {
        return this.getValue("_isRelativeAnchorPoint");
    }
    set isRelativeAnchorPoint(value) {
        this.setValue("_isRelativeAnchorPoint", null, value, true);
    }
    get isTransformDirty() {
        return this.getValue("_isTransformDirty");
    }
    set isTransformDirty(value) {
        this.setValue("_isTransformDirty", null, value, true);
    }
    get isInverseDirty() {
        return this.getValue("_isInverseDirty");
    }
    set isInverseDirty(value) {
        this.setValue("_isInverseDirty", null, value, true);
    }
    get inverse() {
        return this.getValue("_inverse");
    }
    set inverse(value) {
        this.setValue("_inverse", null, value, true);
    }
    get transformMatrix() {
        return this.getValue("_transformMatrix");
    }
    set transformMatrix(value) {
        this.setValue("_transformMatrix", null, value, true);
    }
    get children() {
        return this.getValue("_children");
    }
    set children(value) {
        this.setValue("_children", null, value, true);
    }
    _updateAnchorPointInPixels() {
        var ap = this.anchorPoint, cs = this.contentSize;
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
    addChild(child, z = null, tag = "") {
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
    getChild(tag) {
        for (var i = 0; i < this.children.length; i++) {
            if (this.children[i].tag == tag) {
                return this.children[i];
            }
        }
        return null;
    }
    removeChild(child, cleanup = false) {
        if (!child) {
            return;
        }
        var children = this.children, idx = children.indexOf(child);
        if (idx > -1) {
            this.detatchChild(child, cleanup);
        }
    }
    removeChildren(cleanup = false) {
        var children = this.children, isRunning = this.isRunning;
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
    reorderChild(child, z) {
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
    draw(context, rect = null) {
        // All draw code goes here
    }
    /**
 * @getter scale
 * @type Float
 */
    get scale() {
        if (this.scaleX != this.scaleY) {
            throw "scaleX and scaleY aren't identical";
        }
        return this.scaleX;
    }
    /**
 * @setter scale
 * @type Float
 */
    set scale(val) {
        this.scaleX = val;
        this.scaleY = val;
    }
    scheduleUpdate(priority = 0) {
        Scheduler.sharedScheduler().scheduleUpdate(new Scheduler.ScheduleOptions(this, null, 0, !this.isRunning, priority));
    }
    /**
 * Triggered when the node is added to a scene
 *
 * @event
 */
    onEnter() {
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
    onExit() {
        this.pauseSchedulerAndActions();
        this.isRunning = false;
        util.each(this.children, function (child) {
            child.onExit();
        });
    }
    cleanup() {
        this.stopAllActions();
        this.unscheduleAllSelectors();
        util.each(this.children, function (child) {
            child.cleanup();
        });
    }
    resumeSchedulerAndActions() {
        Scheduler.sharedScheduler().resumeTarget(this);
        ActionManager.sharedManager().resumeTarget(this);
    }
    pauseSchedulerAndActions() {
        Scheduler.sharedScheduler().pauseTarget(this);
        ActionManager.sharedManager().pauseTarget(this);
    }
    unscheduleSelector(selector) {
        Scheduler.sharedScheduler().unschedule(new Scheduler.ScheduleOptions(this, selector));
    }
    unscheduleAllSelectors() {
        Scheduler.sharedScheduler().unscheduleAllSelectorsForTarget(this);
    }
    stopAllActions() {
        ActionManager.sharedManager().removeAllActionsFromTarget(this);
    }
    visit(context, rect = null) {
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
    transform(context) {
        // Translate
        if (this.isRelativeAnchorPoint && (this.anchorPointInPixels.x !== 0 || this.anchorPointInPixels.y !== 0)) {
            context.translate(Math.round(-this.anchorPointInPixels.x), Math.round(-this.anchorPointInPixels.y));
        }
        if (this.anchorPointInPixels.x !== 0 || this.anchorPointInPixels.y !== 0) {
            context.translate(Math.round(this.position.x + this.anchorPointInPixels.x), Math.round(this.position.y + this.anchorPointInPixels.y));
        }
        else {
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
    runAction(action) {
        ActionManager.sharedManager().addAction(this, action, !this.isRunning);
    }
    /**
* @opts {String} tag Tag of the action to return
*/
    getAction(tag) {
        return ActionManager.sharedManager().getActionFromTarget(this, tag);
    }
    nodeToParentTransform() {
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
    parentToNodeTransform() {
        //if (!this._inverse) {
        //    this._inverse = { a: 1, b: 0, c: 0, d: 1, tx: 0, ty: 0 };
        //}
        var _inverse = geometry.affineTransformInvert(this.nodeToParentTransform());
        return _inverse;
    }
    nodeToWorldTransform() {
        var t = this.nodeToParentTransform();
        var p;
        for (p = this.parent; p; p = p.parent) {
            t = geometry.affineTransformConcat(t, p.nodeToParentTransform());
        }
        return t;
    }
    worldToNodeTransform() {
        return geometry.affineTransformInvert(this.nodeToWorldTransform());
    }
    convertToNodeSpace(worldPoint) {
        return geometry.pointApplyAffineTransform(worldPoint, this.worldToNodeTransform());
    }
    /**
 * @getter boundingBox
 * @type geometry.Rect
 */
    get boundingBox() {
        var cs = this.contentSize;
        var rect = geometry.rectMake(0, 0, cs.width, cs.height);
        rect = geometry.rectApplyAffineTransform(rect, this.nodeToParentTransform());
        return rect;
    }
    /**
 * @getter worldBoundingBox
 * @type geometry.Rect
 */
    get worldBoundingBox() {
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
    get visibleRect() {
        var s = Director.sharedDirector().winSize;
        var rect = new geometry.Rect(0, 0, s.width, s.height);
        return geometry.rectApplyAffineTransform(rect, this.worldToNodeTransform());
    }
    /**
 * @private
 */
    _dirtyTransform() {
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
    schedule(method, interval = 0) {
        Scheduler.sharedScheduler().schedule(new Scheduler.ScheduleOptions(this, method, interval, this.isRunning));
    }
}
//export class NodeOptions {
//    public isCocosNode: boolean = false;
//    public z: number = 0;
//    public tag: string = "";
//    constructor(public child: Node, public cleanup: boolean = false) {
//    }
//}
//# sourceMappingURL=Node.js.map