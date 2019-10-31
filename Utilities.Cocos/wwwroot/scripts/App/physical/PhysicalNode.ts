import { Node } from "../../Cocos2d/nodes/Node";
import { geometry } from "../../Cocos2d/libs/geometry";
import { PhysicalShape } from "./PhysicalShape";
import { events } from "../../Cocos2d/libs/events";
import { util } from "../../Cocos2d/libs/util";
import { PhysicalLayer } from "./PhysicalLayer";
import { Primitives } from "../../Cocos2d/libs/Primitives";
import { b2Body, b2BodyDef, b2BodyType, b2Vec2, b2MassData } from "../../Box2D/Box2D";
import { NodeForceHandler, TreatAsPointSource } from "./InvSquareField";





export class PhysicalNode extends Node {
    protected _parent: PhysicalLayer = null;
    get parent(): PhysicalLayer {
        return this.getValue("_parent");
    }
    set parent(value: PhysicalLayer) {
        this.setValue("_parent", null, value, true);
    }
    protected _body: b2Body = null;
    get body(): b2Body {
        return this.getValue("_body");
    }
    set body(value: b2Body) {
        this.setValue("_body", null, value, true);
    }
    get isStatic(): boolean {
        return this.getValue("_isStatic");
    }
    set isStatic(value: boolean) {
        this.setValue("_isStatic", null, value, true);
        this._updateIsStatic();
    }

    protected _drag: number = 0;
    get drag(): number {
        return this.getValue("_drag");
    }
    set drag(value: number) {
        this.setValue("_drag", null, value, true);
        this.updatePhysicalFromNode();
    }
    protected _minVelocityToMoveFromStop: number = 0;
    get minVelocityToMoveFromStop(): number {
        return this.getValue("_minVelocityToMoveFromStop");
    }
    set minVelocityToMoveFromStop(value: number) {
        this.setValue("_minVelocityToMoveFromStop", null, value, true);
        this.updatePhysicalFromNode();
    }


    protected _shapes: Array<PhysicalShape> = new Array<PhysicalShape>();
    get shapes(): Array<PhysicalShape> {
        return this.getValue("_shapes");
    }
    set shapes(value: Array<PhysicalShape>) {
        this.setValue("_shapes", null, value, true);
    }
    protected _velocity: geometry.Point = geometry.PointZero();
    get velocity(): geometry.Point {
        return this.getValue("_velocity");
    }
    set velocity(value: geometry.Point) {
        this.setValue("_velocity", null, value, true);
        this.updatePhysicalFromNode();
    }
    protected _angularSpeed: number = 0;
    get angularSpeed(): number {
        return this.getValue("_angularSpeed");
    }
    set angularSpeed(value: number) {
        this.setValue("_angularSpeed", null, value, true);
        this.updatePhysicalFromNode();
    }
    protected _lockRotation: boolean = false;
    get lockRotation(): boolean {
        return this.getValue("_lockRotation");
    }
    set lockRotation(value: boolean) {
        this.setValue("_lockRotation", null, value, true);
    }
    //NodeForceHandler
    protected _forceHandler: NodeForceHandler = new TreatAsPointSource(this);
    get forceHandler(): NodeForceHandler {
        return this.getValue("_forceHandler");
    }
    set forceHandler(value: NodeForceHandler) {
        this.setValue("_forceHandler", null, value, true);
    }
    protected _massData: b2MassData = null;
    get massData(): b2MassData {
        return this.getValue("_massData");
    }
    set massData(value: b2MassData) {
        if (value.mass != 0) {
            this._mass = value.mass;
        }
        this.setValue("_massData", null, value, true);
    }
    protected _mass: number = 0;
    get mass(): number {
        return this._mass;
    }
    set mass(value: number) {
        this.setValue("_mass", null, value, true);
    }
    get centerOfMass(): geometry.Point {
        return this.massData.center.Point();
    }

    protected _charge: number = 0;
    get charge(): number {
        return this.getValue("_charge");
    }



    private _isUpdating: boolean = false;

    constructor(private _child: Node = null,
        protected _shape: PhysicalShape = null,
        protected _position: geometry.Point = null,
        protected _isStatic: boolean = false
    ) {
        super();

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
    public _updateIsStatic(): any {
        this.setupBody();
    }

    public addChild(node: Node, z: number = 0, tag: string = null): Node {
        if (z == 0) {
            z = -0.1;
        }
        var t = super.addChild(node, z, tag);

        //var w = Math.max(this.contentSize.width, node.contentSize.width);
        //var h = Math.max(this.contentSize.height, node.contentSize.height);

        //var cs = geometry.sizeMake(w, h);
        return t;
    }
    public addShape(shape: PhysicalShape): void {
        this.shapes.push(shape);
        shape.parent = this;
        this.setupBody();
    }
    public draw(ctx: CanvasRenderingContext2D): void {
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
    public setupBody(): void {
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
        } else {
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
        util.each(this.shapes, util.callback(this, (shape:PhysicalShape)=> {
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
    public updateNodeFromPhysical(): void {
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
        } else {
            this.body.SetAngle(geometry.degreesToRadians(this.rotation));
        }

        this.position = pos;
        this.velocity = vel;
        this.angularSpeed = angVel;
        this._isUpdating = false;
    }
    public updatePhysicalFromNode(): void {
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
    public _updateWorld(): void {
        if (this._isUpdating) {
            return;
        }
        this.setupBody();
    }

}