import { Director } from "../../Cocos2d/Director";
import { PhysicalLayer } from "../physical/PhysicalLayer";
import { geometry } from "../../Cocos2d/libs/geometry";
import { b2MouseJointDef, b2Vec2 } from "../../Box2D/Box2D";
import { Wall } from "./objects/Wall";
import { Planet } from "./objects/Planet";
import { Sun } from "./objects/Sun";
import { Primitives } from "../../Cocos2d/libs/Primitives";
function rand_pos(radius, Offset) {
    var an = Math.random() * 6.28;
    var os = Math.random() * Offset + radius; //+ frand()*20-10;
    var v = geometry.ccpMultScaler(geometry.ccpFromAngle(an), os);
    var n2 = v.normal();
    return v;
}
export class GravatasLayer extends PhysicalLayer {
    constructor() {
        super();
        //public pLayer: PhysicalLayer = null;
        this.mouseJoint = null;
        this.tag = "GravatasLayer";
        //this.pLayer = new PhysicalLayer();
        //this.pLayer.outlineObjects = true;
        this.isMouseEnabled = true;
        //this.pLayer.gravity = geometry.ccp(0, 300);
        //this.addChild(this.pLayer);
        var s = Director.sharedDirector().winSize;
        //var pos = geometry.ccp(s.width / 2, s.height / 2);
        //this.anchorPoint = geometry.ccp(0.5, 0.5);
        //this.scaleY = -1;
        //this.pLayer.anchorPoint = geometry.ccp(0.5,0.5);
        //this.gField = new gravityField(this);
        //var size = geometry.sizeMake(s.width * 10, s.height);
        //this.contentSize = size;
        //this.pLayer.contentSize = size;
        //this.pLayer.position = geometry.ccp(s.width / 2, s.height / 2);
        this.setupLayer();
    }
    setupLayer() {
        var s = Director.sharedDirector().winSize;
        var border = null;
        border = new Wall(new geometry.Line(geometry.ccp(-100, 0), geometry.ccp(100, 0)));
        this.addChild(border);
        border = new Wall(new geometry.Line(geometry.ccp(-s.width / 2, -s.height / 2), geometry.ccp(-s.width / 2, s.height / 2)));
        this.addChild(border);
        border = new Wall(new geometry.Line(geometry.ccp(-s.width / 2, s.height / 2), geometry.ccp(s.width / 2, s.height / 2)));
        this.addChild(border);
        border = new Wall(new geometry.Line(geometry.ccp(s.width / 2, s.height / 2), geometry.ccp(s.width / 2, -s.height / 2)));
        this.addChild(border);
        border = new Wall(new geometry.Line(geometry.ccp(s.width / 2, -s.height / 2), geometry.ccp(-s.width / 2, -s.height / 2)));
        this.addChild(border);
        var sun = new Sun(geometry.PointZero());
        this.addChild(sun);
        this.removeChild(sun);
        //var planet = new Planet(geometry.ccp(0, -50));
        //this.pLayer.addChild(planet);
        //planet = new Planet(geometry.ccp(0, 50));
        //this.pLayer.addChild(planet);
        //var mu = this.gField.islMagnitude * sun.mass;
        var mu = 6 * sun.mass;
        for (var i = 1; i <= 2; i++) {
            var planet = new Planet(geometry.ccp(0, 0));
            var V = rand_pos(200, i * 6.25 + 50.0);
            //V = geometry.ccp(250, 0);
            planet.position = geometry.ccpAdd(V, sun.position);
            //console.log("planet.position = " + planet.position.toString());
            var norm = V.normal();
            //norm dot V2 == 0 if perpendicular
            //(this.x * b.x) + (this.y * b.y)
            //0 = (this.x * b.x) + (this.y * b.y)
            //0 = (this.x * 1) + (this.y * b.y)
            //-(this.y * b.y) = (this.x * 1)
            //b.y = (this.x * 1) / -this.y
            var p1 = geometry.ccp(1, (norm.x * 1 / (-norm.y))).normal();
            var p2 = geometry.ccp(-1, (norm.x * -1 / (-norm.y))).normal();
            //console.log("norm = " + norm.toString());
            //console.log("p1 = " + p1.toString());
            //console.log("p2 = " + p2.toString());
            //var a = norm;
            //var b = p1;
            //var AdotB = a.dot(b);
            //var scalerProj = AdotB / b.length();
            //var A1 = geometry.ccpMultScaler(b.normal(), scalerProj);
            //var A2 = geometry.ccpSub(a, A1);
            //console.log("A1 = " + A1.toString());
            //console.log("A2 = " + A2.toString());
            var rM = 250 / V.length();
            var v = 70 * rM; //50// Math.sqrt(mu / r) / r;
            //var purp = geometry.ccp(norm.y, norm.x);
            var p2Use = p1;
            if (norm.angle > 180 || norm.angle < 0) {
                p2Use = p2;
            }
            planet.velocity = geometry.ccpMultScaler(p2Use, v); //*0.5f);
            //console.log("planet.velocity = " + planet.velocity.toString());
            ////Box.Mass = 1.0f;//e+14f;
            //// Set the box's angular velocity to match its orbital period and
            //// align its initial angle with its position.
            planet.angularSpeed = 2 * rM;
            planet.rotation = geometry.radiansToDegrees(Math.atan2(V.y, V.x));
            this.addChild(planet);
        }
    }
    draw(ctx) {
        Primitives.drawRect(ctx, new geometry.Rect(0, 0, this.contentSize.width, this.contentSize.height), "green", 4);
    }
    mouseDown(evt) {
        var point = evt.locationInCanvas, world = this.world, mouseJoint = this.mouseJoint;
        var pnt = geometry.pointApplyAffineTransform(point, this.nodeToParentTransform());
        console.log("GravatasLayer mouseDown pnt = " + pnt.toString());
        //pnt.x = pnt.x - this.position.x;
        if (!mouseJoint) {
            var body = this.getBodyAtPoint(pnt);
            if (body) {
                this.groundBody.SetPosition(body.GetPosition());
                var md = new b2MouseJointDef();
                md.bodyA = this.groundBody;
                md.bodyB = body;
                md.collideConnected = true;
                md.target.Set(pnt.x, pnt.y);
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
    mouseDragged(evt) {
        var point = evt.locationInCanvas, world = this.world, mouseJoint = this.mouseJoint;
        var pnt = geometry.pointApplyAffineTransform(point, this.nodeToParentTransform());
        //point.x = point.x - this.position.x;
        console.log("GravatasLayer mouseDragged pnt = " + pnt.toString());
        if (mouseJoint) {
            mouseJoint.SetTarget(new b2Vec2(pnt.x, pnt.y));
        }
        return false;
    }
    mouseUp(evt) {
        var mouseJoint = this.mouseJoint, world = this.world;
        if (mouseJoint) {
            world.DestroyJoint(mouseJoint);
            this.mouseJoint = null;
        }
        return false;
    }
}
//# sourceMappingURL=GravatasLayer.js.map