import { Node } from "../../Cocos2d/nodes/Node";
import { geometry } from "../../Cocos2d/libs/geometry";
import { events } from "../../Cocos2d/libs/events";
import { util } from "../../Cocos2d/libs/util";
import { Primitives } from "../../Cocos2d/libs/Primitives";
import { b2BodyDef, b2BodyType, b2Vec2, b2MassData } from "../../Box2D/Box2D";
import { TreatAsPointSource } from "./InvSquareField";
export class PhysicalNode extends Node {
    constructor(_child = null, _shape = null, _position = null, _isStatic = false) {
        super();
        this._child = _child;
        this._shape = _shape;
        this._position = _position;
        this._isStatic = _isStatic;
        this._parent = null;
        this._body = null;
        this._drag = 0;
        this._minVelocityToMoveFromStop = 0;
        this._shapes = new Array();
        this._velocity = geometry.PointZero();
        this._angularSpeed = 0;
        this._lockRotation = false;
        //NodeForceHandler
        this._forceHandler = new TreatAsPointSource(this);
        this._massData = null;
        this._mass = 0;
        this._charge = 0;
        this._isUpdating = false;
        events.addListener(this, 'parent_changed', util.callback(this, this._updateWorld));
        events.addListener(this, 'scaleX_changed', util.callback(this, this._updateWorld));
        events.addListener(this, 'scaleY_changed', util.callback(this, this._updateWorld));
        events.addListener(this, 'position_changed', util.callback(this, this.updatePhysicalFromNode));
        events.addListener(this, 'rotation_changed', util.callback(this, this.updatePhysicalFromNode));
        if (_position) {
            this.position = _position;
        }
        if (_child) {
            this.addChild(_child);
        }
        if (_shape) {
            this.addShape(_shape);
        }
    }
    get parent() {
        return this.getValue("_parent");
    }
    set parent(value) {
        this.setValue("_parent", null, value, true);
    }
    get body() {
        return this.getValue("_body");
    }
    set body(value) {
        this.setValue("_body", null, value, true);
    }
    get isStatic() {
        return this.getValue("_isStatic");
    }
    set isStatic(value) {
        this.setValue("_isStatic", null, value, true);
        this._updateIsStatic();
    }
    get drag() {
        return this.getValue("_drag");
    }
    set drag(value) {
        this.setValue("_drag", null, value, true);
        this.updatePhysicalFromNode();
    }
    get minVelocityToMoveFromStop() {
        return this.getValue("_minVelocityToMoveFromStop");
    }
    set minVelocityToMoveFromStop(value) {
        this.setValue("_minVelocityToMoveFromStop", null, value, true);
        this.updatePhysicalFromNode();
    }
    get shapes() {
        return this.getValue("_shapes");
    }
    set shapes(value) {
        this.setValue("_shapes", null, value, true);
    }
    get velocity() {
        return this.getValue("_velocity");
    }
    set velocity(value) {
        this.setValue("_velocity", null, value, true);
        this.updatePhysicalFromNode();
    }
    get angularSpeed() {
        return this.getValue("_angularSpeed");
    }
    set angularSpeed(value) {
        this.setValue("_angularSpeed", null, value, true);
        this.updatePhysicalFromNode();
    }
    get lockRotation() {
        return this.getValue("_lockRotation");
    }
    set lockRotation(value) {
        this.setValue("_lockRotation", null, value, true);
    }
    get forceHandler() {
        return this.getValue("_forceHandler");
    }
    set forceHandler(value) {
        this.setValue("_forceHandler", null, value, true);
    }
    get massData() {
        return this.getValue("_massData");
    }
    set massData(value) {
        if (value.mass != 0) {
            this._mass = value.mass;
        }
        this.setValue("_massData", null, value, true);
    }
    get mass() {
        return this._mass;
    }
    set mass(value) {
        this.setValue("_mass", null, value, true);
    }
    get centerOfMass() {
        return this.massData.center.Point();
    }
    get charge() {
        return this.getValue("_charge");
    }
    _updateIsStatic() {
        this.setupBody();
    }
    addChild(node, z = 0, tag = null) {
        if (z == 0) {
            z = -0.1;
        }
        var t = super.addChild(node, z, tag);
        //var w = Math.max(this.contentSize.width, node.contentSize.width);
        //var h = Math.max(this.contentSize.height, node.contentSize.height);
        //var cs = geometry.sizeMake(w, h);
        return t;
    }
    addShape(shape) {
        this.shapes.push(shape);
        shape.parent = this;
        this.setupBody();
    }
    draw(ctx) {
        super.draw(ctx);
        if (this.parent.outlineObjects) {
            this.shapes.forEach((shape) => {
                shape.draw(ctx);
            });
            var ap = this.anchorPointInPixels;
            Primitives.fillCircle(ctx, ap, 4, "blue");
            var cm = this.centerOfMass;
            Primitives.fillCircle(ctx, cm, 2, "yellow");
            //var mcenter = this.body.GetWorldCenter();
            //var mpos = this.body.GetPosition();
            //var rcent = geometry.ccp(mcenter.x - mpos.x, mcenter.y - mpos.y);
            //var an = -geometry.degreesToRadians(this.rotation);
            //var ms = Math.sin(an);
            //var mc = Math.cos(an);
            //rcent = geometry.ccp(rcent.x * mc - rcent.y * ms, rcent.x * ms + rcent.y * mc);
            ////scaling
            //var mc2 = geometry.ccp(rcent.x + ap.x, rcent.y + ap.y);
        }
    }
    setupBody() {
        if (this.parent == null) {
            return;
        }
        var _world = this.parent.world;
        if (_world == null) {
            return;
        }
        if (this.body != null) {
            _world.DestroyBody(this.body);
        }
        var bodyDef = new b2BodyDef();
        if (this.isStatic) {
            bodyDef.type = b2BodyType.b2_staticBody;
        }
        else {
            bodyDef.type = b2BodyType.b2_dynamicBody;
        }
        //scaling
        bodyDef.position.x = this.position.x;
        bodyDef.position.y = this.position.y;
        bodyDef.linearVelocity.x = this.velocity.x;
        bodyDef.linearVelocity.y = this.velocity.y;
        bodyDef.angle = geometry.degreesToRadians(this.rotation);
        bodyDef.angularVelocity = this.angularSpeed;
        this.body = _world.CreateBody(bodyDef);
        util.each(this.shapes, util.callback(this, (shape) => {
            shape.applyFixture(this.body);
        }));
        this.updatePhysicalFromNode();
    }
    //get physicalScaling(): number {
    //    if (parent == null) {
    //        return 1; //30;
    //    }
    //    return this.parent.physicalScaling;
    //}
    updateNodeFromPhysical() {
        this._isUpdating = true;
        var pos = this.body.GetPosition().Point();
        var vel = this.body.GetLinearVelocity().Point();
        var angVel = this.body.GetAngularVelocity();
        var prevSpeed = this.velocity.length();
        var curSpeed = vel.length();
        if (prevSpeed <= 0.0001 && curSpeed <= this.minVelocityToMoveFromStop) {
            this.body.SetLinearVelocity(new b2Vec2(0, 0));
            vel = this.body.GetLinearVelocity().Point();
        }
        if (this.drag > 0) {
            vel = geometry.ccpMultScaler(vel, 1 - this.drag);
            this.body.SetLinearVelocity(vel.asB2Vec2());
            angVel = angVel * (1 - this.drag);
            this.body.SetAngularVelocity(angVel);
        }
        if (!this.lockRotation) {
            this.rotation = geometry.radiansToDegrees(this.body.GetAngle());
        }
        else {
            this.body.SetAngle(geometry.degreesToRadians(this.rotation));
        }
        this.position = pos;
        this.velocity = vel;
        this.angularSpeed = angVel;
        this._isUpdating = false;
    }
    updatePhysicalFromNode() {
        if (this._isUpdating) {
            return;
        }
        if (this.body != null) {
            this.body.SetPosition(this.position.asB2Vec2());
            this.body.SetLinearVelocity(this.velocity.asB2Vec2());
            this.body.SetAngle(geometry.degreesToRadians(this.rotation));
            this.body.SetAngularVelocity(this.angularSpeed);
            this.massData = this.body.GetMassData(new b2MassData());
            this._charge = 0;
            this.shapes.forEach((shape) => {
                this._charge = this._charge + shape.charge;
            });
        }
    }
    _updateWorld() {
        if (this._isUpdating) {
            return;
        }
        this.setupBody();
    }
}
//# sourceMappingURL=PhysicalNode.js.map