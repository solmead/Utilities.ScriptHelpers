import { BObject } from "../../Cocos2d/libs/bobject";
import { geometry } from "../../Cocos2d/libs/geometry";
import { b2BodyType } from "../../Box2D/Box2D";
class ForceChange {
    constructor(force = geometry.PointZero(), centerPoint = geometry.PointZero()) {
        this.force = force;
        this.centerPoint = centerPoint;
    }
}
class FieldChange {
    constructor(velocity = geometry.PointZero(), angular = 0) {
        this.velocity = velocity;
        this.angular = angular;
    }
    multiplyByTime(dt) {
        this.velocity = geometry.ccpMultScaler(this.velocity, dt);
        this.angular = this.angular * dt;
        return this;
    }
}
export class InvSquareField extends BObject {
    constructor(_layer, _islMagnitude = 0, _fieldName = "") {
        super();
        this._layer = _layer;
        this._islMagnitude = _islMagnitude;
        this._fieldName = _fieldName;
        this._calculationOnNode = null;
        this._calculationBetweenNodes = null;
        this.layer = _layer;
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
    get calculationBetweenNodes() {
        return this.getValue("_calculationBetweenNodes");
    }
    set calculationBetweenNodes(value) {
        this.setValue("_calculationBetweenNodes", null, value, true);
    }
    update(dt) {
        this.layer.children.forEach((node) => {
            if (node.body.GetType() != b2BodyType.b2_staticBody) {
                var fchange = this.calculateForNode(node);
                fchange.multiplyByTime(dt);
                node.velocity = geometry.ccpAdd(node.velocity, fchange.velocity);
                node.angularSpeed = node.angularSpeed + fchange.angular;
            }
        });
    }
    calculateForNode(curNode) {
        if (this.calculationOnNode) {
            return this.calculateForNode(curNode);
        }
        var fChange = new FieldChange();
        this.layer.children.forEach((node) => {
            if (curNode != node && node.body.GetType() != b2BodyType.b2_staticBody) {
                var fc = this.calculateBetweenNodes(curNode, node);
                fChange.angular = fChange.angular + fc.angular;
                fChange.velocity = geometry.ccpAdd(fChange.velocity, fc.velocity);
            }
        });
        return fChange;
    }
    calculateBetweenNodes(curNode, refNode) {
        if (refNode.calculationBetweenNodes) {
            return refNode.calculationBetweenNodes(curNode, this);
        }
        if (this.calculationBetweenNodes) {
            return this.calculationBetweenNodes(curNode, refNode);
        }
        return new FieldChange();
    }
}
export class PointSourceField extends InvSquareField {
    constructor(_layer, _islMagnitude = 0, _fieldName = "") {
        super(_layer, _islMagnitude, _fieldName);
        this.calculationBetweenNodes = this.calcBetweenNodes;
    }
    calcBetweenNodes(curNode, refNode) {
        var fc = new FieldChange();
        var mag1 = (refNode["_" + this.fieldName]);
        var pos1 = refNode.centerOfMass;
        var npos1 = geometry.pointApplyAffineTransform(pos1, refNode.nodeToParentTransform());
        var ref1 = npos1;
        var mag2 = (curNode["_" + this.fieldName]);
        var pos2 = curNode.centerOfMass;
        var npos2 = geometry.pointApplyAffineTransform(pos2, curNode.nodeToParentTransform());
        var ref2 = npos2;
        var mass2 = curNode.mass;
        //debugger;
        var dist = geometry.ccpSub(ref1, ref2);
        var rSquared = dist.lengthSquared();
        if (mag2 == mass2) {
            var fRay = this.islMagnitude * mag1 / rSquared;
            var ray = geometry.ccpMultScaler(dist.normal(), fRay);
            //var vel = geometry.ccpMultScaler(ray, 1 / mass2);
            fc.velocity = ray;
        }
        else {
            var fRay = this.islMagnitude * mag1 * mag2 / rSquared;
            var ray = geometry.ccpMultScaler(dist.normal(), fRay);
            var vel = geometry.ccpMultScaler(ray, 1 / mass2);
            fc.velocity = vel;
        }
        return fc;
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
        var fchange = new FieldChange(this.acceleration);
        return fchange;
    }
}
export class ShapeSourceField extends InvSquareField {
    constructor(_layer, _islMagnitude = 0, _fieldName = "") {
        super(_layer, _islMagnitude, _fieldName);
        this.calculationBetweenNodes = this.calcBetweenNodes;
    }
    calcBetweenNodes(curNode, refNode) {
        var fc = new FieldChange();
        var changes = new Array();
        curNode.shapes.forEach((curShape) => {
            refNode.shapes.forEach((refShape) => {
                var chng = this.calculateBetweenShapes(curShape, refShape);
                changes.push(chng);
            });
        });
        var mass = curNode.mass;
        var cntrMass = curNode.centerOfMass;
        //this.body.se
        var acc = new geometry.Point(0, 0);
        for (var a = 0; a < changes.length; a++) {
            var change = changes[a];
            var force = change.force;
            var cntr = change.centerPoint;
        }
        return fc;
    }
    calculateBetweenShapes(curShape, refShape) {
        var pos1 = refShape.parent.position;
        var md = refShape.fixture.GetMassData();
        var com1 = md.center.Point();
        var mass1 = md.mass;
        var ref1 = geometry.ccpAdd(pos1, com1);
        var mag1 = refShape.getValue("_" + this.fieldName);
        var pos2 = curShape.parent.position;
        var com2 = curShape.fixture.GetMassData().center.Point();
        var ref2 = geometry.ccpAdd(pos2, com2);
        var mag2 = curShape.getValue("_" + this.fieldName);
        var dist = geometry.ccpSub(ref1, ref2);
        var rSquared = dist.lengthSquared();
        //var mu = mag * islMagnitude;
        var fRay = this.islMagnitude * mag1 * mag2 / rSquared;
        var ray = geometry.ccpMultScaler(dist.normal(), fRay);
        return new ForceChange(ray, ref1);
    }
}
export class electricyField extends PointSourceField {
    constructor(_physicalLayer, _constant = null) {
        super(_physicalLayer, _constant || -16.1342368, "charge");
    }
}
export class gravityField extends PointSourceField {
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