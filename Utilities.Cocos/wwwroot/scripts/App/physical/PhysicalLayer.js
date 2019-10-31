import { Layer } from "../../Cocos2d/nodes/Layer";
import { geometry } from "../../Cocos2d/libs/geometry";
import { events } from "../../Cocos2d/libs/events";
import { util } from "../../Cocos2d/libs/util";
import { b2Vec2, b2World, b2AABB, b2BodyType, b2BodyDef } from "../../Box2D/Box2D";
export class PhysicalLayer extends Layer {
    constructor() {
        super();
        this._world = null;
        this._selectedBody = null;
        this._bodies = new Array();
        this._gravity = geometry.PointZero();
        this._outlineObjects = false;
        this._fields = new Array(); //30;
        this._groundbody = null;
        //var world = new Box2D.b2World(
        //    new Box2D.b2Vec2(0, 0), //gravity
        //    true                  //allow sleep
        //);
        var world = new b2World(new b2Vec2(0, 0));
        this.world = world;
        this.createGroundBody();
        events.addListener(this, 'gravity_changed', util.callback(this, this._updategravity));
        //this.set('isMouseEnabled', true);
        this.scheduleUpdate();
    }
    get world() {
        return this.getValue("_world");
    }
    set world(value) {
        this.setValue("_world", null, value, true);
    }
    get selectedBody() {
        return this.getValue("_selectedBody");
    }
    set selectedBody(value) {
        this.setValue("_selectedBody", null, value, true);
    }
    get bodies() {
        return this.getValue("_bodies");
    }
    set bodies(value) {
        this.setValue("_bodies", null, value, true);
    }
    get gravity() {
        return this.getValue("_gravity");
    }
    set gravity(value) {
        this.setValue("_gravity", null, value, true);
    }
    get outlineObjects() {
        return this.getValue("_outlineObjects");
    }
    set outlineObjects(value) {
        this.setValue("_outlineObjects", null, value, true);
    }
    get fields() {
        return this.getValue("_fields");
    }
    set fields(value) {
        this.setValue("_fields", null, value, true);
    }
    get groundBody() {
        return this._groundbody;
    }
    createGroundBody() {
        var bodyDef = new b2BodyDef();
        bodyDef.type = b2BodyType.b2_staticBody;
        bodyDef.position.x = 0;
        bodyDef.position.y = 0;
        this._groundbody = this.world.CreateBody(bodyDef);
    }
    _updategravity() {
        var g = this.gravity;
        //scaling
        this.world.SetGravity(new b2Vec2(g.x, g.y));
    }
    addField(field) {
        var idx = this.fields.indexOf(field);
        if (idx < 0) {
            this.fields.push(field);
            if (field.layer != this) {
                field.layer = this;
            }
        }
    }
    removeField(field) {
        var idx = this.fields.indexOf(field);
        if (idx >= 0) {
            this.fields.splice(idx, 1);
            field.layer = null;
        }
    }
    addChild(node, z = 0, tag = null) {
        return super.addChild(node, z, tag);
    }
    update(dt) {
        var world = this.world;
        this.fields.forEach((field) => {
            field.update(dt);
        });
        var cnt = Math.ceil(dt / 0.001);
        var dtd = dt / cnt;
        for (var a = 1; a <= cnt; a++) {
            world.Step(dtd, 10, 10);
            //world.ClearForces();
        }
        //world.Step(dt, 10, 10);
        ////world.DrawDebugData();
        //world.ClearForces();
        this.children.forEach((child) => {
            child.updateNodeFromPhysical();
        });
    }
    getBodyAtPoint(point) {
        //point = new geometry.Point(point.x/30, point.y / 30);
        var world = this.world;
        var mousePVec = new b2Vec2(point.x, point.y);
        var aabb = new b2AABB();
        aabb.lowerBound.Set(point.x - 0.001, point.y - 0.001);
        aabb.upperBound.Set(point.x + 0.001, point.y + 0.001);
        var self = this;
        var getBodyCB = (fixture) => {
            if (fixture.GetBody().GetType() != b2BodyType.b2_staticBody) {
                if (fixture.GetShape().TestPoint(fixture.GetBody().GetTransform(), mousePVec)) {
                    this.selectedBody = fixture.GetBody();
                    return false;
                }
            }
            return true;
        };
        // Query the world for overlapping shapes.
        this.selectedBody = null;
        world.QueryAABB(aabb, getBodyCB);
        return this.selectedBody;
    }
}
//# sourceMappingURL=PhysicalLayer.js.map