import { BObject } from "../../Cocos2d/libs/bobject";
import { geometry } from "../../Cocos2d/libs/geometry";
import { b2BodyType } from "../../Box2D/Box2D";
import { PhysicalShapeCircle } from "./PhysicalShapeCircle";
export class ForceChange {
    constructor(force = geometry.PointZero(), centerPoint = geometry.PointZero()) {
        this.force = force;
        this.centerPoint = centerPoint;
    }
}
export class FieldChange {
    constructor(force = geometry.PointZero(), torque = 0) {
        this.force = force;
        this.torque = torque;
    }
    multiplyByTime(dt) {
        this.force = geometry.ccpMultScaler(this.force, dt);
        this.torque = this.torque * dt;
        return this;
    }
}
export class InvSquareField extends BObject {
    //protected _calculationBetweenNodes: (curNode: PhysicalNode, refNode: PhysicalNode) => FieldChange = null;
    //get calculationBetweenNodes(): (curNode: PhysicalNode, refNode: PhysicalNode) => FieldChange {
    //    return this.getValue("_calculationBetweenNodes");
    //}
    //set calculationBetweenNodes(value: (curNode: PhysicalNode, refNode: PhysicalNode) => FieldChange) {
    //    this.setValue("_calculationBetweenNodes", null, value, true);
    //}
    constructor(_layer, _islMagnitude = 0, _fieldName = "") {
        super();
        this._layer = _layer;
        this._islMagnitude = _islMagnitude;
        this._fieldName = _fieldName;
        this._calculationOnNode = null;
        this.layer = _layer;
        //this.calculateBetweenNodes = (curNode: PhysicalNode, refNode: PhysicalNode): FieldChange => {
        //    return refNode.forceHandler.calculationBetweenNodes(curNode, this);
        //};
    }
    get islMagnitude() {
        return this.getValue("_islMagnitude");
    }
    set islMagnitude(value) {
        this.setValue("_islMagnitude", null, value, true);
    }
    get fieldName() {
        return this.getValue("_fieldName");
    }
    set fieldName(value) {
        this.setValue("_fieldName", null, value, true);
    }
    get layer() {
        return this.getValue("_layer");
    }
    set layer(value) {
        if (this._layer != value) {
            this._layer.removeField(this);
        }
        this.setValue("_layer", null, value, true);
        this._layer.addField(this);
    }
    get calculationOnNode() {
        return this.getValue("_calculationOnNode");
    }
    set calculationOnNode(value) {
        this.setValue("_calculationOnNode", null, value, true);
    }
    update(dt) {
        this.layer.children.forEach((node) => {
            if (node.body.GetType() != b2BodyType.b2_staticBody) {
                var fchange = this.calculateForNode(node);
                fchange.multiplyByTime(dt);
                node.body.ApplyLinearImpulseToCenter(fchange.force, true);
                node.body.ApplyAngularImpulse(fchange.torque, true);
                //node.velocity = geometry.ccpAdd(node.velocity, geometry.ccpMultScaler(fchange.force, 1/node.mass));
                //node.angularSpeed = node.angularSpeed + fchange.torque;
            }
        });
    }
    calculateForNode(curNode) {
        if (this.calculationOnNode) {
            return this.calculateForNode(curNode);
        }
        var fChange = new FieldChange();
        this.layer.children.forEach((node) => {
            if (curNode != node) {
                var fc = this.calculateBetweenNodes(curNode, node);
                fChange.torque = fChange.torque + fc.torque;
                fChange.force = geometry.ccpAdd(fChange.force, fc.force);
            }
        });
        return fChange;
    }
    calculateBetweenNodes(curNode, refNode) {
        if (refNode.calculationBetweenNodes) {
            return refNode.calculationBetweenNodes(curNode, this);
        }
        //if (this.calculationBetweenNodes) {
        //    return this.calculationBetweenNodes(curNode, refNode);
        //}
        return refNode.forceHandler.calculationBetweenNodes(curNode, this);
        //return new FieldChange();
    }
}
export class TreatAsPointSource {
    constructor(refNode) {
        this.refNode = refNode;
    }
    calculationBetweenNodes(curNode, field) {
        var fc = new FieldChange();
        var refNode = this.refNode;
        var mag1 = (refNode["_" + field.fieldName]);
        var pos1 = refNode.centerOfMass;
        var npos1 = geometry.pointApplyAffineTransform(pos1, refNode.nodeToParentTransform());
        var ref1 = npos1;
        var mag2 = (curNode["_" + field.fieldName]);
        var pos2 = curNode.centerOfMass;
        var npos2 = geometry.pointApplyAffineTransform(pos2, curNode.nodeToParentTransform());
        var ref2 = npos2;
        var mass2 = curNode.mass;
        //debugger;
        var dist = geometry.ccpSub(ref1, ref2);
        var rSquared = dist.lengthSquared();
        if (mag2 == mass2) {
            var fRay = field.islMagnitude * mag1 * mag2 / rSquared;
            var ray = geometry.ccpMultScaler(dist.normal(), fRay);
            //var vel = geometry.ccpMultScaler(ray, 1 / mass2);
            fc.force = ray;
        }
        else {
            var fRay = field.islMagnitude * mag1 * mag2 / rSquared;
            var ray = geometry.ccpMultScaler(dist.normal(), fRay);
            // var vel = geometry.ccpMultScaler(ray, 1 / mass2);
            fc.force = ray;
        }
        return fc;
    }
}
class PointInfo {
    constructor(point, mag) {
        this.point = point;
        this.mag = mag;
    }
}
export class TreatAsAreaSource {
    constructor(refNode) {
        this.refNode = refNode;
    }
    calculationBetweenNodes(curNode, field) {
        var refNode = this.refNode;
        var fc = new FieldChange();
        var changes = new Array();
        curNode.shapes.forEach((curShape) => {
            refNode.shapes.forEach((refShape) => {
                var chngs = this.calculateBetweenShapes(curShape, refShape, field);
                chngs.forEach((c) => {
                    changes.push(c);
                });
            });
        });
        var cntrMass = curNode.centerOfMass;
        //this.body.se
        var force = new geometry.Point(0, 0);
        var torque = 0;
        for (var c = 0; c < changes.length; c++) {
            var change = changes[c];
            var cntr = change.centerPoint;
            var lne = new geometry.Line(cntrMass, cntr);
            var a = change.force;
            var b = lne.ray;
            var AdotB = a.dot(b);
            var scalerProj = AdotB / b.length();
            var A1 = geometry.ccpMultScaler(b.normal(), scalerProj);
            var A2 = geometry.ccpSub(a, A1);
            force = geometry.ccpAdd(force, change.force);
            torque = torque + A2.length() * b.length();
        }
        fc.force = force;
        fc.torque = torque;
        return fc;
    }
    calculateBetween(point1, mag1, point2, mag2, islMagnitude) {
        var dist = geometry.ccpSub(point1, point2);
        var rSquared = dist.lengthSquared();
        var fRay = islMagnitude * mag1 * mag2 / rSquared;
        var ray = geometry.ccpMultScaler(dist.normal(), fRay);
        return new ForceChange(ray, point1);
    }
    getPoints(curShape, field) {
        var mass1 = curShape.mass;
        var mag1 = curShape.getValue("_" + field.fieldName);
        var points = new Array();
        if (curShape instanceof PhysicalShapeCircle) {
            var pos1 = curShape.centerOfMass;
            var npos1 = geometry.pointApplyAffineTransform(pos1, curShape.parent.nodeToParentTransform());
            points.push(new PointInfo(npos1, mag1));
        }
        else {
            var poly = curShape;
            var pnts = poly.points;
            var lns = new Array();
            var pnt1 = pnts[pnts.length - 1];
            for (var a = 0; a < pnts.length; a++) {
                var pnt2 = pnts[a];
                lns.push(new geometry.Line(pnt1, pnt2));
            }
            var len = 0;
            lns.forEach((line) => {
                len = len + line.length();
            });
            lns.forEach((line) => {
                var subLines = line.breakInto(4);
                subLines.forEach((sl) => {
                    var m = mag1 * sl.length() / len;
                    var pnt = sl.center;
                    var npos1 = geometry.pointApplyAffineTransform(pnt, curShape.parent.nodeToParentTransform());
                    points.push(new PointInfo(npos1, m));
                });
            });
        }
        return points;
    }
    calculateBetweenShapes(curShape, refShape, field) {
        var fcs = new Array();
        var points1 = this.getPoints(curShape, field);
        var points2 = this.getPoints(refShape, field);
        points1.forEach((p1) => {
            points2.forEach((p2) => {
                var force = this.calculateBetween(p1.point, p1.mag, p2.point, p2.mag, field.islMagnitude);
                fcs.push(force);
            });
        });
        return fcs;
    }
}
export class FixedDirectionField extends InvSquareField {
    constructor(_layer, _acceleration = geometry.PointZero()) {
        super(_layer, 0, "");
        this._acceleration = _acceleration;
        this.calculateForNode = this.calcOnNode;
    }
    get acceleration() {
        return this.getValue("_acceleration");
    }
    set acceleration(value) {
        this.setValue("_acceleration", null, value, true);
    }
    calcOnNode(node) {
        var fchange = new FieldChange(geometry.ccpMultScaler(this.acceleration, node.mass));
        return fchange;
    }
}
export class electricyField extends InvSquareField {
    constructor(_physicalLayer, _constant = null) {
        super(_physicalLayer, _constant || -16.1342368, "charge");
    }
}
export class gravityField extends InvSquareField {
    constructor(_physicalLayer, _constant = null) {
        super(_physicalLayer, _constant || 1.61342368, "mass");
    }
}
export class fixedGravityField extends FixedDirectionField {
    constructor(_physicalLayer) {
        super(_physicalLayer, geometry.ccp(0, 300));
        this._physicalLayer = _physicalLayer;
    }
}
//# sourceMappingURL=InvSquareField.js.map