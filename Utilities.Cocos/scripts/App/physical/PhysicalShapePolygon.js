import { PhysicalShape } from "./PhysicalShape";
import { geometry } from "../../Cocos2d/libs/geometry";
import { Primitives } from "../../Cocos2d/libs/Primitives";
import { b2PolygonShape, b2Vec2 } from "../../Box2D/Box2D";
export class PhysicalShapePolygon extends PhysicalShape {
    constructor(_points = null, _density = 1, _friction = 0.5, _restitution = 0.9) {
        super(_density, _friction, _restitution);
        this._points = _points;
        this.points = _points || new Array();
    }
    get points() {
        return this.getValue("_points");
    }
    set points(value) {
        this.setValue("_points", null, value, true);
        this._updatePolygon();
    }
    addVertex(point) {
        this.points.push(point);
        this._updatePolygon();
    }
    draw(ctx) {
        var s = Math.min(this.parent.scaleX, this.parent.scaleY);
        var c = geometry.ccp(0, 0);
        //var pnts = new Array<geometry.Point>();
        //this.points.forEach((p) => {
        //    pnts.push(geometry.ccpMult(p, geometry.ccp(this.parent.scaleX, this.parent.scaleY)));
        //});
        Primitives.drawPoly(ctx, c, this.points, "green", 2 / s);
        super.draw(ctx);
    }
    getShape() {
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
    _updatePolygon() {
        if (this.parent != null) {
            this.parent.setupBody();
        }
    }
}
//# sourceMappingURL=PhysicalShapePolygon.js.map