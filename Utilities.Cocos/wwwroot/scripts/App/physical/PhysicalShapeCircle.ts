import { PhysicalShape } from "./PhysicalShape";
import { Primitives } from "../../Cocos2d/libs/Primitives";
import { b2Shape, b2CircleShape, b2Vec2 } from "../../Box2D/Box2D";
import { geometry } from "../../Cocos2d/libs/geometry";





export class PhysicalShapeCircle extends PhysicalShape {

    get center(): geometry.Point {
        return this.getValue("_center");
    }
    set center(value: geometry.Point) {
        this.setValue("_center", null, value, true);
        this._updateRadius();
    }
    get radius(): number {
        return this.getValue("_radius");
    }
    set radius(value: number) {
        this.setValue("_radius", null, value, true);
        this._updateRadius();
    }

    constructor(protected _center: geometry.Point = geometry.PointZero(), protected _radius:number=1, _density: number = 1, _friction: number = 0.5, _restitution: number = 0.9) {
        super(_density, _friction, _restitution)


    }
    public draw(ctx: CanvasRenderingContext2D): void {
        var s = Math.min(this.parent.scaleX, this.parent.scaleY);
        var c = geometry.ccp(this.center.x, this.center.y);

        Primitives.drawCircle(ctx, c, this.radius, "green", 2 / s);
        super.draw(ctx);
    }
    public getShape(): b2Shape {
        var s = Math.min(this.parent.scaleX, this.parent.scaleY);
        //scaling
        var shape = new b2CircleShape(this.radius * s);

        shape.Set(new b2Vec2(this.center.x * this.parent.scaleX, this.center.y * this.parent.scaleY), this.radius * s)

        return shape;
    }
    public _updateRadius(): void {
        if (this.parent != null) {
            this.parent.setupBody();
        }
    }


}