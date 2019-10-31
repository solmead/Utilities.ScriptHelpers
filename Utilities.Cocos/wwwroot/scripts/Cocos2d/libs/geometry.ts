import { util } from "./util";
import { b2Vec2 } from "../../Box2D/Box2D";




var RE_PAIR = /\{\s*([\d.\-]+)\s*,\s*([\d.\-]+)\s*\}/,
    RE_DOUBLE_PAIR = /\{\s*(\{[\s\d,.\-]+\})\s*,\s*(\{[\s\d,.\-]+\})\s*\}/;

(<any>Math).PI_2 = 1.57079632679489661923132169163975144;     /* pi/2 */

export module geometry {


    export class Point {
        private ls: number = null;
        private l: number = null;

        constructor(public x: number, public y: number) {

        }


        public lengthSquared(): number {
            if (!this.ls) {
                this.ls = this.x * this.x + this.y * this.y;
            }
            return this.ls;
        }
        public length(): number {
            if (!this.l) {
                this.l = Math.sqrt(this.lengthSquared());
            }
            return this.l;
        }
        public normal(): Point {
            var l = this.length();
            return ccp(this.x / l, this.y / l);
        }
        public asB2Vec2(): b2Vec2 {
            return new b2Vec2(this.x, this.y);
        }

        public get angle(): number {
            var x = 0;
            var y = 0;
            var xtn = this.x;
            var ytn = this.y;
            var atn = radiansToDegrees(Math.atan2(ytn, xtn));
            return atn;
        }
        public dot(b: Point):number {
            return (this.x * b.x) + (this.y * b.y);
        }
        public toString(): string {
            return "<" + this.x + ", " + this.y + ">";
        }
        public add(b: Point): Point {
            return ccpAdd(this, b);
        }
    }

    export class Line {
        public ray: geometry.Point;

        constructor(public point1: geometry.Point, public point2: geometry.Point) {
            this.ray = ccpSub(point2, point1);
        }
        public lengthSquared(): number {
            return this.ray.lengthSquared();
        }

        public length(): number {
            return this.ray.length();
        }
        public normal(): Point {
            return this.ray.normal();
        }

        public get center(): Point {
            return ccp(this.ray.x / 2 + this.point1.x, this.ray.y / 2 + this.point1.y);
        }
        public breakInto(num:number): Array<Line> {
            var lines = new Array<Line>();

            var pnt1 = this.point1;
            for (var a = 1; a <= num; a++) {
                var per = a / num;
                var pnt2 = ccp(per * this.ray.x + this.point1.x, per * this.ray.y + this.point1.y);
                lines.push(new Line(pnt1, pnt2));
                pnt1 = pnt2;
            }
            return lines;
        }
        public distanceTo(point: Point): Point {
            var a = this.point1;
            var b = this.point2;
            var c = point;
            var distanceSegment = ccp(0, 0);

            var distanceLine = 0;

            var r_numerator = (c.x - a.x) * (b.x - a.x) + (c.y - a.y) * (b.y - a.y)
            var r_denomenator = (b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y);
            var r = r_numerator / r_denomenator;

            var p = ccp(a.x + r * (b.x - a.x), a.y + r * (b.y - a.y));
            var s = ((a.y - c.y) * (b.x - a.x) - (a.x - c.x) * (b.y - a.y)) / r_denomenator;
            var distanceLine = Math.abs(s) * Math.sqrt(r_denomenator);

            var xx = p.x;
            var yy = p.y;

            if ((r >= 0) && (r <= 1)) {
                distanceSegment = ccpSub(p, c);
            }
            else {

                var dist1 = ccpDist(c, a);
                var dist2 = ccpDist(c, b);
                if (dist1 < dist2) {
                    xx = a.x;
                    yy = a.y;
                    distanceSegment = ccpSub(a, c);
                }
                else {
                    xx = b.x;
                    yy = b.y;
                    distanceSegment = ccpSub(b, c);
                }


            }

            return distanceSegment;




        }
    }



    export class Size {

        public width: number;
        public height: number;

        constructor(private w: number, private h: number) {
            this.width = w;
            this.height = h;
        }
    }

    export class Rect {

        public origin: Point;
        public size: Size;

        constructor(private x: number, private y: number, private w: number, private h: number) {
            this.origin = new Point(x, y);
            this.size = new Size(w, h);
        }
    }


    export class TransformMatrix {
        constructor(public a: number, public b: number, public c: number, public d: number, public tx: number, public ty: number) {

        }
    }

    export class BezierConfig {
        public controlPoint1: Point;
        public controlPoint2: Point;
        public endPosition: Point;


        constructor(private p1: Point, private p2: Point, private ep: Point) {
            this.controlPoint1 = util.copy(p1);
            this.controlPoint2 = util.copy(p2);
            this.endPosition = util.copy(ep);
        }
    }

    export function ccpB2Vec2(v: b2Vec2): Point {
        return geometry.pointMake(v.x, v.y);
    }
    /**
     * Creates a geometry.Point instance
     *
     * @param {Float} x X coordinate
     * @param {Float} y Y coordinate
     * @returns {geometry.Point}
     */
    export function ccp(x: number, y: number): Point {
        return geometry.pointMake(x, y);
    }
    /**
     * Add the values of two points together
     *
     * @param {geometry.Point} p1 First point
     * @param {geometry.Point} p2 Second point
     * @returns {geometry.Point} New point
     */
    export function ccpAdd(p1: Point, p2: Point): Point {
        return geometry.ccp(p1.x + p2.x, p1.y + p2.y);
    }
    /**
     * Subtract the values of two points
     *
     * @param {geometry.Point} p1 First point
     * @param {geometry.Point} p2 Second point
     * @returns {geometry.Point} New point
     */
    export function ccpSub(p1: Point, p2: Point): Point {
        return geometry.ccp(p1.x - p2.x, p1.y - p2.y);
    }
    export function ccpDist(p1: Point, p2: Point): Number {
        return Math.sqrt((p2.x - p1.x)^2 + (p2.y - p1.y)^2);
    }
    /**
     * Muliply the values of two points together
     *
     * @param {geometry.Point} p1 First point
     * @param {geometry.Point} p2 Second point
     * @returns {geometry.Point} New point
     */
    export function ccpMult(p1: Point, p2: Point): Point {
        return geometry.ccp(p1.x * p2.x, p1.y * p2.y);
    }
    export function ccpFromAngle(an:number): Point {
        return geometry.ccp(Math.cos(an), Math.sin(an));
    }
    /**
     * Muliply the values of one point with a scaler together
     *
     * @param {geometry.Point} p1 First point
     * @param {number} s scaler
     * @returns {geometry.Point} New point
     */
    export function ccpMultScaler(p1: Point, s: number): Point {
        return geometry.ccp(p1.x * s, p1.y * s);
    }
    /**
     * Invert the values of a geometry.Point
     *
     * @param {geometry.Point} p Point to invert
     * @returns {geometry.Point} New point
     */
    export function ccpNeg(p: Point): Point {
        return geometry.ccp(-p.x, -p.y);
    }
    /**
     * Round values on a geometry.Point to whole numbers
     *
     * @param {geometry.Point} p Point to round
     * @returns {geometry.Point} New point
     */
    export function ccpRound(p: Point): Point {
        return geometry.ccp(Math.round(p.x), Math.round(p.y));
    }
    /**
     * Round up values on a geometry.Point to whole numbers
     *
     * @param {geometry.Point} p Point to round
     * @returns {geometry.Point} New point
     */
    export function ccpCeil(p: Point): Point {
        return geometry.ccp(Math.ceil(p.x), Math.ceil(p.y));
    }
    /**
     * Round down values on a geometry.Point to whole numbers
     *
     * @param {geometry.Point} p Point to round
     * @returns {geometry.Point} New point
     */
    export function ccpFloor(p: Point): Point {
        return geometry.ccp(Math.floor(p.x), Math.floor(p.y));
    }
    export function PointZero():Point {
        return ccp(0, 0);
    }
    export function rectMake(x: number, y: number, w: number, h: number):Rect {
        return new Rect(x, y, w, h);
    }
    export function rectFromString(str:string):Rect {
        var matches = str.match(RE_DOUBLE_PAIR),
            p = pointFromString(matches[1]),
            s = sizeFromString(matches[2]);

        return rectMake(p.x, p.y, s.width, s.height);
    }
    export function sizeMake(w: number, h: number):Size {
        return new geometry.Size(w, h);
    }
    export function sizeFromString(str:string):Size {
        var matches = str.match(RE_PAIR),
            w = parseFloat(matches[1]),
            h = parseFloat(matches[2]);

        return geometry.sizeMake(w, h);
    }
    export function pointMake(x: number, y: number):Point {
        return new geometry.Point(x, y);
    }
    export function pointFromString(str:string):Point {
        var matches = str.match(RE_PAIR),
            x = parseFloat(matches[1]),
            y = parseFloat(matches[2]);

        return geometry.pointMake(x, y);
    }
    export function rectContainsPoint(r:Rect, p:Point):boolean {
        return ((p.x >= r.origin.x && p.x <= r.origin.x + r.size.width) &&
            (p.y >= r.origin.y && p.y <= r.origin.y + r.size.height));
    }
    export function rectUnion(r1:Rect, r2:Rect):Rect {
        var rect = new geometry.Rect(0, 0, 0, 0);

        rect.origin.x = Math.min(r1.origin.x, r2.origin.x);
        rect.origin.y = Math.min(r1.origin.y, r2.origin.y);
        rect.size.width = Math.max(r1.origin.x + r1.size.width, r2.origin.x + r2.size.width) - rect.origin.x;
        rect.size.height = Math.max(r1.origin.y + r1.size.height, r2.origin.y + r2.size.height) - rect.origin.y;

        return rect;
    }
    export function rectOverlapsRect(r1:Rect, r2:Rect):boolean {
        if (r1.origin.x + r1.size.width < r2.origin.x) {
            return false;
        }
        if (r2.origin.x + r2.size.width < r1.origin.x) {
            return false;
        }
        if (r1.origin.y + r1.size.height < r2.origin.y) {
            return false;
        }
        if (r2.origin.y + r2.size.height < r1.origin.y) {
            return false;
        }

        return true;
    }
    export function rectIntersection(lhsRect: Rect, rhsRect: Rect): Rect {

        var intersection = new geometry.Rect(
            Math.max(geometry.rectGetMinX(lhsRect), geometry.rectGetMinX(rhsRect)),
            Math.max(geometry.rectGetMinY(lhsRect), geometry.rectGetMinY(rhsRect)),
            0,
            0
        );

        intersection.size.width = Math.min(geometry.rectGetMaxX(lhsRect), geometry.rectGetMaxX(rhsRect)) - geometry.rectGetMinX(intersection);
        intersection.size.height = Math.min(geometry.rectGetMaxY(lhsRect), geometry.rectGetMaxY(rhsRect)) - geometry.rectGetMinY(intersection);

        return intersection;
    }
    export function pointEqualToPoint(point1:Point, point2:Point):boolean {
        return (point1.x == point2.x && point1.y == point2.y);
    }
    export function sizeEqualToSize(size1:Size, size2:Size):boolean {
        return (size1.width == size2.width && size1.height == size2.height);
    }
    export function rectEqualToRect(rect1:Rect, rect2:Rect):boolean {
        return (geometry.sizeEqualToSize(rect1.size, rect2.size) && geometry.pointEqualToPoint(rect1.origin, rect2.origin));
    }
    export function rectGetMinX(rect:Rect):number {
        return rect.origin.x;
    }
    export function rectGetMinY(rect:Rect):number {
        return rect.origin.y;
    }
    export function rectGetMaxX(rect:Rect):number {
        return rect.origin.x + rect.size.width;
    }
    export function rectGetMaxY(rect:Rect):number {
        return rect.origin.y + rect.size.height;
    }
    export function boundingRectMake(p1: Point, p2: Point, p3: Point, p4: Point):Rect {
        var minX = Math.min(p1.x, p2.x, p3.x, p4.x);
        var minY = Math.min(p1.y, p2.y, p3.y, p4.y);
        var maxX = Math.max(p1.x, p2.x, p3.x, p4.x);
        var maxY = Math.max(p1.y, p2.y, p3.y, p4.y);

        return new geometry.Rect(minX, minY, (maxX - minX), (maxY - minY));
    }
    export function pointApplyAffineTransform(point:Point, t:TransformMatrix):Point {

        /*
        aPoint.x * aTransform.a + aPoint.y * aTransform.c + aTransform.tx,
        aPoint.x * aTransform.b + aPoint.y * aTransform.d + aTransform.ty
        */

        return new geometry.Point(t.a * point.x + t.c * point.y + t.tx, t.b * point.x + t.d * point.y + t.ty);

    }
    export function rectApplyAffineTransform(rect:Rect, trans:TransformMatrix):Rect {

        var p1 = geometry.ccp(geometry.rectGetMinX(rect), geometry.rectGetMinY(rect));
        var p2 = geometry.ccp(geometry.rectGetMaxX(rect), geometry.rectGetMinY(rect));
        var p3 = geometry.ccp(geometry.rectGetMinX(rect), geometry.rectGetMaxY(rect));
        var p4 = geometry.ccp(geometry.rectGetMaxX(rect), geometry.rectGetMaxY(rect));

        p1 = geometry.pointApplyAffineTransform(p1, trans);
        p2 = geometry.pointApplyAffineTransform(p2, trans);
        p3 = geometry.pointApplyAffineTransform(p3, trans);
        p4 = geometry.pointApplyAffineTransform(p4, trans);

        return geometry.boundingRectMake(p1, p2, p3, p4);
    }
    export function affineTransformInvert(trans: TransformMatrix) {
        var determinant = 1 / (trans.a * trans.d - trans.b * trans.c);

        return new geometry.TransformMatrix(
            determinant * trans.d,
            -determinant * trans.b,
            -determinant * trans.c,
            determinant * trans.a,
            determinant * (trans.c * trans.ty - trans.d * trans.tx),
            determinant * (trans.b * trans.tx - trans.a * trans.ty)
        );
    }

    export function affineTransformConcat(lhs: TransformMatrix, rhs: TransformMatrix): TransformMatrix {
        return new geometry.TransformMatrix(
            lhs.a * rhs.a + lhs.b * rhs.c,
            lhs.a * rhs.b + lhs.b * rhs.d,
            lhs.c * rhs.a + lhs.d * rhs.c,
            lhs.c * rhs.b + lhs.d * rhs.d,
            lhs.tx * rhs.a + lhs.ty * rhs.c + rhs.tx,
            lhs.tx * rhs.b + lhs.ty * rhs.d + rhs.ty
        );
    }
    export function degreesToRadians(angle:number):number {
        return angle / 180.0 * Math.PI;
    }
    export function radiansToDegrees(angle:number):number {
        return angle * (180.0 / Math.PI);
    }
    /**
     * Translate (move) a transform matrix
     *
     * @param {geometry.TransformMatrix} trans TransformMatrix to translate
     * @param {Float} tx Amount to translate along X axis
     * @param {Float} ty Amount to translate along Y axis
     * @returns {geometry.TransformMatrix} A new TransformMatrix
     */
    export function affineTransformTranslate(trans: TransformMatrix, tx: number, ty: number): TransformMatrix {
        var newTrans = util.copy(trans);
        newTrans.tx = trans.tx + trans.a * tx + trans.c * ty;
        newTrans.ty = trans.ty + trans.b * tx + trans.d * ty;
        return newTrans;
    }
    /**
     * Rotate a transform matrix
     *
     * @param {geometry.TransformMatrix} trans TransformMatrix to rotate
     * @param {Float} angle Angle in radians
     * @returns {geometry.TransformMatrix} A new TransformMatrix
     */
    export function affineTransformRotate(trans: TransformMatrix, angle: number): TransformMatrix {
        var sin = Math.sin(angle),
            cos = Math.cos(angle);

        return new geometry.TransformMatrix(
            trans.a * cos + trans.c * sin,
            trans.b * cos + trans.d * sin,
            trans.c * cos - trans.a * sin,
            trans.d * cos - trans.b * sin,
            trans.tx,
            trans.ty
        );
    }
    /**
     * Scale a transform matrix
     *
     * @param {geometry.TransformMatrix} trans TransformMatrix to scale
     * @param {Float} sx X scale factor
     * @param {Float} [sy=sx] Y scale factor
     * @returns {geometry.TransformMatrix} A new TransformMatrix
     */
    export function affineTransformScale(trans: TransformMatrix, sx:number, sy:number): TransformMatrix {
        if (sy === undefined) {
            sy = sx;
        }

        return new geometry.TransformMatrix(trans.a * sx, trans.b * sx, trans.c * sy, trans.d * sy, trans.tx, trans.ty);
    }
    /**
     * @returns {geometry.TransformMatrix} identity matrix
     */
    export function affineTransformIdentity(): TransformMatrix {
        return new geometry.TransformMatrix(1, 0, 0, 1, 0, 0);
    }


}