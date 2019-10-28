import { PhysicalShape } from "./PhysicalShape";
import { geometry } from "../../Cocos2d/libs/geometry";
import { Primitives } from "../../Cocos2d/libs/Primitives";
import { b2Shape, b2PolygonShape, b2Vec2 } from "../../Box2D/Box2D";



export class PhysicalShapePolygon extends PhysicalShape {

    get points(): Array<geometry.Point> {
        return this.getValue("_points");
    }
    set points(value: Array<geometry.Point>) {
        this.setValue("_points", null, value, true);
        this._updatePolygon();
    }

    constructor(protected _points: Array<geometry.Point> = null, _density: number = 1, _friction: number = 0.5, _restitution: number = 0.9) {
        super(_density, _friction, _restitution)

        this.points = _points || new Array<geometry.Point>();

    }
    public addVertex(point: geometry.Point):void {
        this.points.push(point);
        this._updatePolygon();
    }
    public draw(ctx: CanvasRenderingContext2D): void {
        var s = Math.min(this.parent.scaleX, this.parent.scaleY);
        var c = geometry.ccp(0, 0);
        //var pnts = new Array<geometry.Point>();
        //this.points.forEach((p) => {
        //    pnts.push(geometry.ccpMult(p, geometry.ccp(this.parent.scaleX, this.parent.scaleY)));
        //});
        
        Primitives.drawPoly(ctx, c, this.points, "green", 2 / s);

        super.draw(ctx);
    }
    public getShape(): b2Shape {
        //return new Box2D.Collision.Shapes.b2CircleShape(this.radius / this.physicalScaling() * this.parent.scaleX);

        var shape = new b2PolygonShape();
        var points = [];

        for (var i = 0; i < this.points.length; i++) {
            var vec = new b2Vec2();
            //scaling
            vec.Set(this.points[i].x * this.parent.scaleX, this.points[i].y * this.parent.scaleY);
            points[i] = vec;
        }

        shape.Set(points, points.length);

        return shape;
    }
    public _updatePolygon(): void {
        if (this.parent != null) {
            this.parent.setupBody();
        }
    }


}