import { util } from "./util";
import { b2Vec2 } from "../../Box2D/Box2D";
var RE_PAIR = /\{\s*([\d.\-]+)\s*,\s*([\d.\-]+)\s*\}/, RE_DOUBLE_PAIR = /\{\s*(\{[\s\d,.\-]+\})\s*,\s*(\{[\s\d,.\-]+\})\s*\}/;
Math.PI_2 = 1.57079632679489661923132169163975144; /* pi/2 */
export var geometry;
(function (geometry) {
    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.ls = null;
            this.l = null;
        }
        lengthSquared() {
            if (!this.ls) {
                this.ls = this.x * this.x + this.y * this.y;
            }
            return this.ls;
        }
        length() {
            if (!this.l) {
                this.l = Math.sqrt(this.lengthSquared());
            }
            return this.l;
        }
        normal() {
            var l = this.length();
            return ccp(this.x / l, this.y / l);
        }
        asB2Vec2() {
            return new b2Vec2(this.x, this.y);
        }
    }
    geometry.Point = Point;
    class Size {
        constructor(w, h) {
            this.w = w;
            this.h = h;
            this.width = w;
            this.height = h;
        }
    }
    geometry.Size = Size;
    class Rect {
        constructor(x, y, w, h) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.origin = new Point(x, y);
            this.size = new Size(w, h);
        }
    }
    geometry.Rect = Rect;
    class TransformMatrix {
        constructor(a, b, c, d, tx, ty) {
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.tx = tx;
            this.ty = ty;
        }
    }
    geometry.TransformMatrix = TransformMatrix;
    class BezierConfig {
        constructor(p1, p2, ep) {
            this.p1 = p1;
            this.p2 = p2;
            this.ep = ep;
            this.controlPoint1 = util.copy(p1);
            this.controlPoint2 = util.copy(p2);
            this.endPosition = util.copy(ep);
        }
    }
    geometry.BezierConfig = BezierConfig;
    function ccpB2Vec2(v) {
        return geometry.pointMake(v.x, v.y);
    }
    geometry.ccpB2Vec2 = ccpB2Vec2;
    /**
     * Creates a geometry.Point instance
     *
     * @param {Float} x X coordinate
     * @param {Float} y Y coordinate
     * @returns {geometry.Point}
     */
    function ccp(x, y) {
        return geometry.pointMake(x, y);
    }
    geometry.ccp = ccp;
    /**
     * Add the values of two points together
     *
     * @param {geometry.Point} p1 First point
     * @param {geometry.Point} p2 Second point
     * @returns {geometry.Point} New point
     */
    function ccpAdd(p1, p2) {
        return geometry.ccp(p1.x + p2.x, p1.y + p2.y);
    }
    geometry.ccpAdd = ccpAdd;
    /**
     * Subtract the values of two points
     *
     * @param {geometry.Point} p1 First point
     * @param {geometry.Point} p2 Second point
     * @returns {geometry.Point} New point
     */
    function ccpSub(p1, p2) {
        return geometry.ccp(p1.x - p2.x, p1.y - p2.y);
    }
    geometry.ccpSub = ccpSub;
    /**
     * Muliply the values of two points together
     *
     * @param {geometry.Point} p1 First point
     * @param {geometry.Point} p2 Second point
     * @returns {geometry.Point} New point
     */
    function ccpMult(p1, p2) {
        return geometry.ccp(p1.x * p2.x, p1.y * p2.y);
    }
    geometry.ccpMult = ccpMult;
    /**
     * Muliply the values of one point with a scaler together
     *
     * @param {geometry.Point} p1 First point
     * @param {number} s scaler
     * @returns {geometry.Point} New point
     */
    function ccpMultScaler(p1, s) {
        return geometry.ccp(p1.x * s, p1.y * s);
    }
    geometry.ccpMultScaler = ccpMultScaler;
    /**
     * Invert the values of a geometry.Point
     *
     * @param {geometry.Point} p Point to invert
     * @returns {geometry.Point} New point
     */
    function ccpNeg(p) {
        return geometry.ccp(-p.x, -p.y);
    }
    geometry.ccpNeg = ccpNeg;
    /**
     * Round values on a geometry.Point to whole numbers
     *
     * @param {geometry.Point} p Point to round
     * @returns {geometry.Point} New point
     */
    function ccpRound(p) {
        return geometry.ccp(Math.round(p.x), Math.round(p.y));
    }
    geometry.ccpRound = ccpRound;
    /**
     * Round up values on a geometry.Point to whole numbers
     *
     * @param {geometry.Point} p Point to round
     * @returns {geometry.Point} New point
     */
    function ccpCeil(p) {
        return geometry.ccp(Math.ceil(p.x), Math.ceil(p.y));
    }
    geometry.ccpCeil = ccpCeil;
    /**
     * Round down values on a geometry.Point to whole numbers
     *
     * @param {geometry.Point} p Point to round
     * @returns {geometry.Point} New point
     */
    function ccpFloor(p) {
        return geometry.ccp(Math.floor(p.x), Math.floor(p.y));
    }
    geometry.ccpFloor = ccpFloor;
    function PointZero() {
        return ccp(0, 0);
    }
    geometry.PointZero = PointZero;
    function rectMake(x, y, w, h) {
        return new Rect(x, y, w, h);
    }
    geometry.rectMake = rectMake;
    function rectFromString(str) {
        var matches = str.match(RE_DOUBLE_PAIR), p = pointFromString(matches[1]), s = sizeFromString(matches[2]);
        return rectMake(p.x, p.y, s.width, s.height);
    }
    geometry.rectFromString = rectFromString;
    function sizeMake(w, h) {
        return new geometry.Size(w, h);
    }
    geometry.sizeMake = sizeMake;
    function sizeFromString(str) {
        var matches = str.match(RE_PAIR), w = parseFloat(matches[1]), h = parseFloat(matches[2]);
        return geometry.sizeMake(w, h);
    }
    geometry.sizeFromString = sizeFromString;
    function pointMake(x, y) {
        return new geometry.Point(x, y);
    }
    geometry.pointMake = pointMake;
    function pointFromString(str) {
        var matches = str.match(RE_PAIR), x = parseFloat(matches[1]), y = parseFloat(matches[2]);
        return geometry.pointMake(x, y);
    }
    geometry.pointFromString = pointFromString;
    function rectContainsPoint(r, p) {
        return ((p.x >= r.origin.x && p.x <= r.origin.x + r.size.width) &&
            (p.y >= r.origin.y && p.y <= r.origin.y + r.size.height));
    }
    geometry.rectContainsPoint = rectContainsPoint;
    function rectUnion(r1, r2) {
        var rect = new geometry.Rect(0, 0, 0, 0);
        rect.origin.x = Math.min(r1.origin.x, r2.origin.x);
        rect.origin.y = Math.min(r1.origin.y, r2.origin.y);
        rect.size.width = Math.max(r1.origin.x + r1.size.width, r2.origin.x + r2.size.width) - rect.origin.x;
        rect.size.height = Math.max(r1.origin.y + r1.size.height, r2.origin.y + r2.size.height) - rect.origin.y;
        return rect;
    }
    geometry.rectUnion = rectUnion;
    function rectOverlapsRect(r1, r2) {
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
    geometry.rectOverlapsRect = rectOverlapsRect;
    function rectIntersection(lhsRect, rhsRect) {
        var intersection = new geometry.Rect(Math.max(geometry.rectGetMinX(lhsRect), geometry.rectGetMinX(rhsRect)), Math.max(geometry.rectGetMinY(lhsRect), geometry.rectGetMinY(rhsRect)), 0, 0);
        intersection.size.width = Math.min(geometry.rectGetMaxX(lhsRect), geometry.rectGetMaxX(rhsRect)) - geometry.rectGetMinX(intersection);
        intersection.size.height = Math.min(geometry.rectGetMaxY(lhsRect), geometry.rectGetMaxY(rhsRect)) - geometry.rectGetMinY(intersection);
        return intersection;
    }
    geometry.rectIntersection = rectIntersection;
    function pointEqualToPoint(point1, point2) {
        return (point1.x == point2.x && point1.y == point2.y);
    }
    geometry.pointEqualToPoint = pointEqualToPoint;
    function sizeEqualToSize(size1, size2) {
        return (size1.width == size2.width && size1.height == size2.height);
    }
    geometry.sizeEqualToSize = sizeEqualToSize;
    function rectEqualToRect(rect1, rect2) {
        return (geometry.sizeEqualToSize(rect1.size, rect2.size) && geometry.pointEqualToPoint(rect1.origin, rect2.origin));
    }
    geometry.rectEqualToRect = rectEqualToRect;
    function rectGetMinX(rect) {
        return rect.origin.x;
    }
    geometry.rectGetMinX = rectGetMinX;
    function rectGetMinY(rect) {
        return rect.origin.y;
    }
    geometry.rectGetMinY = rectGetMinY;
    function rectGetMaxX(rect) {
        return rect.origin.x + rect.size.width;
    }
    geometry.rectGetMaxX = rectGetMaxX;
    function rectGetMaxY(rect) {
        return rect.origin.y + rect.size.height;
    }
    geometry.rectGetMaxY = rectGetMaxY;
    function boundingRectMake(p1, p2, p3, p4) {
        var minX = Math.min(p1.x, p2.x, p3.x, p4.x);
        var minY = Math.min(p1.y, p2.y, p3.y, p4.y);
        var maxX = Math.max(p1.x, p2.x, p3.x, p4.x);
        var maxY = Math.max(p1.y, p2.y, p3.y, p4.y);
        return new geometry.Rect(minX, minY, (maxX - minX), (maxY - minY));
    }
    geometry.boundingRectMake = boundingRectMake;
    function pointApplyAffineTransform(point, t) {
        /*
        aPoint.x * aTransform.a + aPoint.y * aTransform.c + aTransform.tx,
        aPoint.x * aTransform.b + aPoint.y * aTransform.d + aTransform.ty
        */
        return new geometry.Point(t.a * point.x + t.c * point.y + t.tx, t.b * point.x + t.d * point.y + t.ty);
    }
    geometry.pointApplyAffineTransform = pointApplyAffineTransform;
    function rectApplyAffineTransform(rect, trans) {
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
    geometry.rectApplyAffineTransform = rectApplyAffineTransform;
    function affineTransformInvert(trans) {
        var determinant = 1 / (trans.a * trans.d - trans.b * trans.c);
        return new geometry.TransformMatrix(determinant * trans.d, -determinant * trans.b, -determinant * trans.c, determinant * trans.a, determinant * (trans.c * trans.ty - trans.d * trans.tx), determinant * (trans.b * trans.tx - trans.a * trans.ty));
    }
    geometry.affineTransformInvert = affineTransformInvert;
    function affineTransformConcat(lhs, rhs) {
        return new geometry.TransformMatrix(lhs.a * rhs.a + lhs.b * rhs.c, lhs.a * rhs.b + lhs.b * rhs.d, lhs.c * rhs.a + lhs.d * rhs.c, lhs.c * rhs.b + lhs.d * rhs.d, lhs.tx * rhs.a + lhs.ty * rhs.c + rhs.tx, lhs.tx * rhs.b + lhs.ty * rhs.d + rhs.ty);
    }
    geometry.affineTransformConcat = affineTransformConcat;
    function degreesToRadians(angle) {
        return angle / 180.0 * Math.PI;
    }
    geometry.degreesToRadians = degreesToRadians;
    function radiansToDegrees(angle) {
        return angle * (180.0 / Math.PI);
    }
    geometry.radiansToDegrees = radiansToDegrees;
    /**
     * Translate (move) a transform matrix
     *
     * @param {geometry.TransformMatrix} trans TransformMatrix to translate
     * @param {Float} tx Amount to translate along X axis
     * @param {Float} ty Amount to translate along Y axis
     * @returns {geometry.TransformMatrix} A new TransformMatrix
     */
    function affineTransformTranslate(trans, tx, ty) {
        var newTrans = util.copy(trans);
        newTrans.tx = trans.tx + trans.a * tx + trans.c * ty;
        newTrans.ty = trans.ty + trans.b * tx + trans.d * ty;
        return newTrans;
    }
    geometry.affineTransformTranslate = affineTransformTranslate;
    /**
     * Rotate a transform matrix
     *
     * @param {geometry.TransformMatrix} trans TransformMatrix to rotate
     * @param {Float} angle Angle in radians
     * @returns {geometry.TransformMatrix} A new TransformMatrix
     */
    function affineTransformRotate(trans, angle) {
        var sin = Math.sin(angle), cos = Math.cos(angle);
        return new geometry.TransformMatrix(trans.a * cos + trans.c * sin, trans.b * cos + trans.d * sin, trans.c * cos - trans.a * sin, trans.d * cos - trans.b * sin, trans.tx, trans.ty);
    }
    geometry.affineTransformRotate = affineTransformRotate;
    /**
     * Scale a transform matrix
     *
     * @param {geometry.TransformMatrix} trans TransformMatrix to scale
     * @param {Float} sx X scale factor
     * @param {Float} [sy=sx] Y scale factor
     * @returns {geometry.TransformMatrix} A new TransformMatrix
     */
    function affineTransformScale(trans, sx, sy) {
        if (sy === undefined) {
            sy = sx;
        }
        return new geometry.TransformMatrix(trans.a * sx, trans.b * sx, trans.c * sy, trans.d * sy, trans.tx, trans.ty);
    }
    geometry.affineTransformScale = affineTransformScale;
    /**
     * @returns {geometry.TransformMatrix} identity matrix
     */
    function affineTransformIdentity() {
        return new geometry.TransformMatrix(1, 0, 0, 1, 0, 0);
    }
    geometry.affineTransformIdentity = affineTransformIdentity;
})(geometry || (geometry = {}));
//# sourceMappingURL=geometry.js.map