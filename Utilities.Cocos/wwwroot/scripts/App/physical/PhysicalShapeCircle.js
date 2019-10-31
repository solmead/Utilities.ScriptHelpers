import { PhysicalShape } from "./PhysicalShape";
import { Primitives } from "../../Cocos2d/libs/Primitives";
import { b2CircleShape, b2Vec2 } from "../../Box2D/Box2D";
import { geometry } from "../../Cocos2d/libs/geometry";
export class PhysicalShapeCircle extends PhysicalShape {
    constructor(_center = geometry.PointZero(), _radius = 1, _density = 1, _friction = 0.5, _restitution = 0.9) {
        super(_density, _friction, _restitution);
        this._center = _center;
        this._radius = _radius;
    }
    get center() {
        return this.getValue("_center");
    }
    set center(value) {
        this.setValue("_center", null, value, true);
        this._updateRadius();
    }
    get radius() {
        return this.getValue("_radius");
    }
    set radius(value) {
        this.setValue("_radius", null, value, true);
        this._updateRadius();
    }
    draw(ctx) {
        var s = Math.min(this.parent.scaleX, this.parent.scaleY);
        var c = geometry.ccp(this.center.x, this.center.y);
        Primitives.drawCircle(ctx, c, this.radius, "green", 2 / s);
        super.draw(ctx);
    }
    getShape() {
        var s = Math.min(this.parent.scaleX, this.parent.scaleY);
        //scaling
        var shape = new b2CircleShape(this.radius * s);
        shape.Set(new b2Vec2(this.center.x * this.parent.scaleX, this.center.y * this.parent.scaleY), this.radius * s);
        return shape;
    }
    _updateRadius() {
        if (this.parent != null) {
            this.parent.setupBody();
        }
    }
}
//# sourceMappingURL=PhysicalShapeCircle.js.map