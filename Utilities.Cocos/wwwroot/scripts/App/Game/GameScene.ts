import { Scene } from "../../Cocos2d/nodes/Scene";
import { Director } from "../../Cocos2d/Director";
import { LegoMan } from "./objects/LegoMan";
import { PhysicalLayer } from "../physical/PhysicalLayer";
import { Layer } from "../../Cocos2d/nodes/Layer";
import { geometry } from "../../Cocos2d/libs/geometry";
import { Ground } from "./objects/Ground";
import { Crate } from "./objects/Crate";
import { Ball } from "./objects/Ball";
import { Ball2 } from "./objects/Ball2";
import { Special } from "./objects/Special";
import { EventDispatcher } from "../../Cocos2d/EventDispatcher";
import { b2MouseJoint, b2MouseJointDef, b2Vec2, b2Body } from "../../Box2D/Box2D";
import { gravityField, fixedGravityField } from "../physical/InvSquareField";





export class GameLayer extends Layer {

    public man: LegoMan = null;
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
        //var g = new gravityField(this.pLayer);
        //g.islMagnitude = -g.islMagnitude;
        var g2 = new fixedGravityField(this.pLayer);
    }

    private setupLayer():void {

        //this.createWalls();

        this.createGround();

        for (var i = 0; i < 15; ++i) {
            var pos = geometry.ccp(Math.random() * 450, Math.random() * 450);
            var scale = (Math.random()*64);
            //scale = 1;
            var t = Math.random();
            if (t > 0.75) {
                var crate = new Crate(pos, geometry.sizeMake(64 + scale, 128));
                this.pLayer.addChild(crate);
            }
            if (t < 0.25) {
                var ball = new Ball(pos, 1);
                this.pLayer.addChild(ball);
            }
            if (t >= 0.25 && t <= 0.50) {
                var ball2 = new Ball2(pos, 1);
                this.pLayer.addChild(ball2);
            }
            if (t > 0.50 && t <= 0.75) {
                var rad = (Math.random() * 20 + 20);
                var special = new Special(pos, rad);
                this.pLayer.addChild(special);
            }
        }

        this.man = new LegoMan();
        this.man.position = geometry.ccp(150, 150);
        this.pLayer.addChild(this.man);

        this.scheduleUpdate();

    }
    public update(dt: number): void {
        var s = Director.sharedDirector().winSize;
        this.position = geometry.ccp(-this.man.position.x + s.width / 2, this.pLayer.position.y);
        if (this.position.x > 0) {

            this.position = geometry.ccp(0, this.pLayer.position.y);
        }
    }
    public mouseDown(evt: EventDispatcher.mouseDelegateEvent):boolean {
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
                this.mouseJoint =  mouseJoint;
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

    private createGround(): void {
        var BoxSize = 50;
        var Bottom = 20;

        var s = this.contentSize;
        var height = s.height;

        var gPoints = [geometry.ccp(BoxSize * 14, height - (Bottom + BoxSize * 3)),
            geometry.ccp(BoxSize * 18, height - (Bottom + BoxSize * 3)),
            geometry.ccp(BoxSize * 20, height - (Bottom + BoxSize * 4)),
            geometry.ccp(BoxSize * 24, height - (Bottom + BoxSize * 4))
        ];
        Ground.addGroundAlongPolyLine(this.pLayer, gPoints);

        gPoints = [geometry.ccp(0, height - Bottom),
            geometry.ccp(BoxSize * 18, height - Bottom),
            geometry.ccp(BoxSize * 20, height - (Bottom + BoxSize * 1)),
            geometry.ccp(BoxSize * 24, height - (Bottom + BoxSize * 1)),
            geometry.ccp(BoxSize * 28, height - (Bottom + BoxSize * 2)),
            geometry.ccp(BoxSize * 30, height - (Bottom + BoxSize * 2)),
            geometry.ccp(BoxSize * 36, height - Bottom),
            geometry.ccp(BoxSize * 50, height - Bottom),
            geometry.ccp(s.width, height - Bottom)
        ];

        Ground.addGroundAlongPolyLine(this.pLayer, gPoints);
    }
}