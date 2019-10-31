import { Layer } from "../../Cocos2d/nodes/Layer";
import { geometry } from "../../Cocos2d/libs/geometry";
import { events } from "../../Cocos2d/libs/events";
import { util } from "../../Cocos2d/libs/util";
import { PhysicalNode } from "./PhysicalNode";
import { InvSquareField } from "./InvSquareField";
import { Node } from "../../Cocos2d/nodes/Node";
import { b2Vec2, b2World, b2Body, b2AABB, b2Fixture, b2BodyType, b2BodyDef } from "../../Box2D/Box2D";



export class PhysicalLayer extends Layer {

    protected _world: b2World = null;
    get world(): b2World {
        return this.getValue("_world");
    }
    set world(value: b2World) {
        this.setValue("_world", null, value, true);
    }
    protected _selectedBody: b2Body = null;
    get selectedBody(): b2Body {
        return this.getValue("_selectedBody");
    }
    set selectedBody(value: b2Body) {
        this.setValue("_selectedBody", null, value, true);
    }
    protected _bodies: Array<any> = new Array<any>();
    get bodies(): Array<any> {
        return this.getValue("_bodies");
    }
    set bodies(value: Array<any>) {
        this.setValue("_bodies", null, value, true);
    }
    protected _gravity: geometry.Point = geometry.PointZero();
    get gravity(): geometry.Point {
        return this.getValue("_gravity");
    }
    set gravity(value: geometry.Point) {
        this.setValue("_gravity", null, value, true);
    }
    protected _outlineObjects: boolean = false;
    get outlineObjects(): boolean {
        return this.getValue("_outlineObjects");
    }
    set outlineObjects(value: boolean) {
        this.setValue("_outlineObjects", null, value, true);
    }
    protected _fields: Array<InvSquareField> = new Array<InvSquareField>(); //30;
    get fields(): Array<InvSquareField> {
        return this.getValue("_fields");
    }
    set fields(value: Array<InvSquareField>) {
        this.setValue("_fields", null, value, true);
    }


    private _groundbody: b2Body = null;

    public get groundBody(): b2Body {
        return this._groundbody;
    }




    constructor() {
        super();

        //var world = new Box2D.b2World(
        //    new Box2D.b2Vec2(0, 0), //gravity
        //    true                  //allow sleep
        //);


        var world = new b2World(
            new b2Vec2(0, 0)
        );
        this.world = world;
        this.createGroundBody();

        events.addListener(this, 'gravity_changed', util.callback(this, this._updategravity));
        //this.set('isMouseEnabled', true);

        this.scheduleUpdate();
    }
    private createGroundBody() {
        var bodyDef = new b2BodyDef();
        bodyDef.type = b2BodyType.b2_staticBody;

        bodyDef.position.x = 0;
        bodyDef.position.y = 0;

        this._groundbody = this.world.CreateBody(bodyDef);
    }
    private _updategravity(): void {
        var g = this.gravity;
        //scaling
        this.world.SetGravity(new b2Vec2(g.x, g.y));
    }
    public addField(field: InvSquareField): void {
        var idx = this.fields.indexOf(field);
        if (idx < 0) {
            this.fields.push(field);
            if (field.layer != this) {
                field.layer = this;
            }
        }
    }
    public removeField(field: InvSquareField): void {
        var idx = this.fields.indexOf(field);
        if (idx >= 0) {
            this.fields.splice(idx, 1);
            field.layer = null;
        }
    }
    public addChild(node: PhysicalNode, z:number=0, tag:string = null): Node {
        return super.addChild(node, z, tag);
    }
    public update(dt: number): void {
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
        this.children.forEach((child: PhysicalNode) => {
            child.updateNodeFromPhysical();
        });
    }

    public getBodyAtPoint(point: geometry.Point):b2Body {
        //point = new geometry.Point(point.x/30, point.y / 30);


        var world = this.world;
        var mousePVec = new b2Vec2(point.x, point.y);
        var aabb = new b2AABB();
        aabb.lowerBound.Set(point.x - 0.001, point.y - 0.001);
        aabb.upperBound.Set(point.x + 0.001, point.y + 0.001);


        var self = this;

        var getBodyCB = (fixture: b2Fixture) => {
            if (fixture.GetBody().GetType() != b2BodyType.b2_staticBody) {
                if (fixture.GetShape().TestPoint(fixture.GetBody().GetTransform(), mousePVec)) {
                    this.selectedBody = fixture.GetBody();
                    return false;
                }
            }
            return true;
        }


        // Query the world for overlapping shapes.

        this.selectedBody = null;
        world.QueryAABB(aabb, getBodyCB);
        return this.selectedBody;
    }




}