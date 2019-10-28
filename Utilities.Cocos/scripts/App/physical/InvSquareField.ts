import { BObject } from "../../Cocos2d/libs/bobject";
import { PhysicalLayer } from "./PhysicalLayer";
import { geometry } from "../../Cocos2d/libs/geometry";
import { PhysicalNode } from "./PhysicalNode";
import { PhysicalShape } from "./PhysicalShape";
import { b2BodyType } from "../../Box2D/Box2D";


class ForceChange {
    constructor(public force: geometry.Point = geometry.PointZero(),
        public centerPoint: geometry.Point = geometry.PointZero()) {

    }


}
class FieldChange {
    constructor(public velocity: geometry.Point = geometry.PointZero(),
        public angular: number = 0) {

    }


    public multiplyByTime(dt: number): FieldChange {
        this.velocity = geometry.ccpMultScaler(this.velocity, dt);
        this.angular = this.angular * dt;
        return this;
    }

}

export interface NodeForceHandler {
    calculationBetweenNodes(curNode: PhysicalNode, field: InvSquareField): FieldChange;
}


export class InvSquareField extends BObject {


    get islMagnitude(): number {
        return this.getValue("_islMagnitude");
    }
    set islMagnitude(value: number) {
        this.setValue("_islMagnitude", null, value, true);
    }
    get fieldName(): string {
        return this.getValue("_fieldName");
    }
    set fieldName(value: string) {
        this.setValue("_fieldName", null, value, true);
    }
    get layer(): PhysicalLayer {
        return this.getValue("_layer");
    }
    set layer(value: PhysicalLayer) {
        if (this._layer != value) {
            this._layer.removeField(this);
        }
        this.setValue("_layer", null, value, true);
        this._layer.addField(this);
    }
    protected _calculationOnNode: (node: PhysicalNode) => FieldChange = null;
    get calculationOnNode(): (node: PhysicalNode) => FieldChange {
        return this.getValue("_calculationOnNode");
    }
    set calculationOnNode(value: (node: PhysicalNode) => FieldChange) {
        this.setValue("_calculationOnNode", null, value, true);
    }
    protected _calculationBetweenNodes: (curNode: PhysicalNode, refNode: PhysicalNode) => FieldChange = null;
    get calculationBetweenNodes(): (curNode: PhysicalNode, refNode: PhysicalNode) => FieldChange {
        return this.getValue("_calculationBetweenNodes");
    }
    set calculationBetweenNodes(value: (curNode: PhysicalNode, refNode: PhysicalNode) => FieldChange) {
        this.setValue("_calculationBetweenNodes", null, value, true);
    }



    constructor(protected _layer: PhysicalLayer,
                protected _islMagnitude: number = 0,
                protected _fieldName: string = "") {
        super();

        this.layer = _layer;
    }



    public update(dt: number): void {
        this.layer.children.forEach((node: PhysicalNode) => {
            if (node.body.GetType() != b2BodyType.b2_staticBody) {
                var fchange = this.calculateForNode(node);
                fchange.multiplyByTime(dt);
                node.velocity = geometry.ccpAdd(node.velocity, fchange.velocity);
                node.angularSpeed = node.angularSpeed + fchange.angular;
            }
        });
    }

    protected calculateForNode(curNode: PhysicalNode): FieldChange {
        if (this.calculationOnNode) {
            return this.calculateForNode(curNode);
        }

        var fChange = new FieldChange();
        this.layer.children.forEach((node: PhysicalNode) => {
            if (curNode != node && node.body.GetType() != b2BodyType.b2_staticBody) {
                var fc = this.calculateBetweenNodes(curNode, node);
                fChange.angular = fChange.angular + fc.angular;
                fChange.velocity = geometry.ccpAdd(fChange.velocity, fc.velocity);
            }
        });
        return fChange;
    }

    protected calculateBetweenNodes(curNode: PhysicalNode, refNode: PhysicalNode): FieldChange {
        if ((<NodeForceHandler><any>refNode).calculationBetweenNodes) {
            return (<NodeForceHandler><any>refNode).calculationBetweenNodes(curNode, this);
        }


        if (this.calculationBetweenNodes) {
            return this.calculationBetweenNodes(curNode, refNode);
        }
        return new FieldChange();
    }

}


export class PointSourceField extends InvSquareField {

    constructor(_layer: PhysicalLayer,
        _islMagnitude: number = 0,
        _fieldName: string = "") {
        super(_layer, _islMagnitude, _fieldName);

        this.calculationBetweenNodes = this.calcBetweenNodes;
    }


    protected calcBetweenNodes(curNode: PhysicalNode, refNode: PhysicalNode): FieldChange {
        var fc = new FieldChange();

        var mag1 = <number>(refNode["_" + this.fieldName]);
        var pos1 = refNode.centerOfMass;
        var npos1 = geometry.pointApplyAffineTransform(pos1, refNode.nodeToParentTransform());
        var ref1 = npos1;
        var mag2 = <number>(curNode["_" + this.fieldName]);
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
        } else {

            var fRay = this.islMagnitude * mag1 * mag2 / rSquared;
            var ray = geometry.ccpMultScaler(dist.normal(), fRay);

            var vel = geometry.ccpMultScaler(ray, 1 / mass2);

            fc.velocity = vel;

        }
        return fc;
    }
}

export class FixedDirectionField extends InvSquareField {

    get acceleration(): geometry.Point {
        return this.getValue("_acceleration");
    }
    set acceleration(value: geometry.Point) {
        this.setValue("_acceleration", null, value, true);
    }


    constructor(_layer: PhysicalLayer,
        protected _acceleration: geometry.Point = geometry.PointZero()) {
        super(_layer, 0, "");
        this.calculateForNode = this.calcOnNode;
    }

    public calcOnNode(node: PhysicalNode):FieldChange {
        var fchange = new FieldChange(this.acceleration);
        return fchange;
    }

}

export class ShapeSourceField extends InvSquareField {

    constructor(_layer: PhysicalLayer,
        _islMagnitude: number = 0,
        _fieldName: string = "") {
        super(_layer, _islMagnitude, _fieldName);
        this.calculationBetweenNodes = this.calcBetweenNodes;
    }


    protected calcBetweenNodes(curNode: PhysicalNode, refNode: PhysicalNode): FieldChange {
        var fc = new FieldChange();
        var changes = new Array<ForceChange>();

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



    public calculateBetweenShapes(curShape: PhysicalShape, refShape: PhysicalShape): ForceChange {
        var pos1 = refShape.parent.position;
        var md = refShape.fixture.GetMassData();
        var com1 = md.center.Point();
        var mass1 = md.mass;
        var ref1 = geometry.ccpAdd(pos1, com1);
        var mag1 = <number>(<any>refShape).getValue("_" + this.fieldName);

        var pos2 = curShape.parent.position;
        var com2 = curShape.fixture.GetMassData().center.Point();
        var ref2 = geometry.ccpAdd(pos2, com2);
        var mag2 = <number>(<any>curShape).getValue("_" + this.fieldName);


        var dist = geometry.ccpSub(ref1, ref2);
        var rSquared = dist.lengthSquared();

        //var mu = mag * islMagnitude;

        var fRay = this.islMagnitude * mag1 * mag2 / rSquared;

        var ray = geometry.ccpMultScaler(dist.normal(), fRay);

        return new ForceChange(ray, ref1);
    }

}

export class electricyField extends PointSourceField {


    constructor(_physicalLayer: PhysicalLayer,
        _constant: number = null) {
        super(_physicalLayer, _constant || -16.1342368, "charge");
    }


}


export class gravityField extends PointSourceField {


    constructor(_physicalLayer: PhysicalLayer,
        _constant: number = null) {
        super(_physicalLayer, _constant || 1.61342368, "mass");
    }


}

export class fixedGravityField extends FixedDirectionField {

    constructor(private _physicalLayer: PhysicalLayer) {
        super(_physicalLayer, geometry.ccp(0, 300));
    }

}