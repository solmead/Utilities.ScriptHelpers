import { Scene } from "../../Cocos2d/nodes/Scene";
import { Director } from "../../Cocos2d/Director";
import { PhysicalLayer } from "../physical/PhysicalLayer";
import { Layer } from "../../Cocos2d/nodes/Layer";
import { geometry } from "../../Cocos2d/libs/geometry";
import { EventDispatcher } from "../../Cocos2d/EventDispatcher";
import { b2MouseJoint, b2MouseJointDef, b2Vec2, b2Body } from "../../Box2D/Box2D";
import { gravityField, fixedGravityField } from "../physical/InvSquareField";




export class GravatasLayer extends Layer {

    public pLayer: PhysicalLayer = null;

    public mouseJoint: b2MouseJoint = null;


    constructor() {
        super();

        var s = Director.sharedDirector().winSize;
        this.pLayer = new PhysicalLayer();
        this.pLayer.outlineObjects = true;
        this.isMouseEnabled = true;
        this.addChild(this.pLayer);
        var size = geometry.sizeMake(s.width * 10, s.height);
        this.contentSize = size;
        this.pLayer.contentSize = size;
        this.setupLayer();
        //this.pLayer.gravity = geometry.ccp(0, 300);
        var pos = geometry.ccp(s.width / 2 - 100, s.height / 2);
        pos = geometry.ccp(0, 0);
        this.pLayer.position = pos;
        var g = new gravityField(this.pLayer);
        //var g2 = new fixedGravityField(this.pLayer);
    }

    private setupLayer(): void {


    }
    public mouseDown(evt: EventDispatcher.mouseDelegateEvent): boolean {
        var point = evt.locationInCanvas,
            world = this.pLayer.world,
            mouseJoint = this.mouseJoint;
        point.x = point.x - this.position.x;
        if (!mouseJoint) {
            var body = this.pLayer.getBodyAtPoint(point);
            if (body) {
                this.pLayer.groundBody.SetPosition(body.GetPosition());
                var md = new b2MouseJointDef();
                md.bodyA = this.pLayer.groundBody;
                md.bodyB = body;
                md.collideConnected = true;
                md.target.Set(point.x, point.y);
                md.maxForce = 300.0 * body.GetMass();
                mouseJoint = world.CreateJoint(md);
                //mouseJoint.SetTarget(new b2Vec2(point.x / 30, point.y / 30));
                //mouseJoint.target.Set(point.x / 30, point.y / 30);

                body.SetAwake(true);
                this.mouseJoint = mouseJoint;
            }
        }
        return false;
    }
    public mouseDragged(evt: EventDispatcher.mouseDelegateEvent): boolean {
        var point = evt.locationInCanvas,
            world = this.pLayer.world,
            mouseJoint = this.mouseJoint;
        point.x = point.x - this.position.x;

        if (mouseJoint) {
            mouseJoint.SetTarget(new b2Vec2(point.x, point.y));
        }
        return false;
    }
    public mouseUp(evt: EventDispatcher.mouseDelegateEvent): boolean {
        var mouseJoint = this.mouseJoint,
            world = this.pLayer.world;

        if (mouseJoint) {
            world.DestroyJoint(mouseJoint);
            this.mouseJoint = null;
        }
        return false;
    }

}