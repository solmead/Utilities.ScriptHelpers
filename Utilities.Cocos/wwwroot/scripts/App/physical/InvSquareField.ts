import { BObject } from "../../Cocos2d/libs/bobject";
import { PhysicalLayer } from "./PhysicalLayer";
import { geometry } from "../../Cocos2d/libs/geometry";
import { PhysicalNode } from "./PhysicalNode";
import { PhysicalShape } from "./PhysicalShape";
import { b2BodyType } from "../../Box2D/Box2D";
import { PhysicalShapeCircle } from "./PhysicalShapeCircle";
import { PhysicalShapePolygon } from "./PhysicalShapePolygon";


export class ForceChange {
    constructor(public force: geometry.Point = geometry.PointZero(),
        public centerPoint: geometry.Point = geometry.PointZero()) {

    }


}
export class FieldChange {
    constructor(public force: geometry.Point = geometry.PointZero(),
        public torque: number = 0) {

    }


    public multiplyByTime(dt: number): FieldChange {
        this.force = geometry.ccpMultScaler(this.force, dt);
        this.torque = this.torque * dt;
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
    //protected _calculationBetweenNodes: (curNode: PhysicalNode, refNode: PhysicalNode) => FieldChange = null;
    //get calculationBetweenNodes(): (curNode: PhysicalNode, refNode: PhysicalNode) => FieldChange {
    //    return this.getValue("_calculationBetweenNodes");
    //}
    //set calculationBetweenNodes(value: (curNode: PhysicalNode, refNode: PhysicalNode) => FieldChange) {
    //    this.setValue("_calculationBetweenNodes", null, value, true);
    //}



    constructor(protected _layer: PhysicalLayer,
                protected _islMagnitude: number = 0,
                protected _fieldName: string = "") {
        super();

        this.layer = _layer;

        //this.calculateBetweenNodes = (curNode: PhysicalNode, refNode: PhysicalNode): FieldChange => {
        //    return refNode.forceHandler.calculationBetweenNodes(curNode, this);
        //};
    }



    public update(dt: number): void {
        this.layer.children.forEach((node: PhysicalNode) => {
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

    protected calculateForNode(curNode: PhysicalNode): FieldChange {
        if (this.calculationOnNode) {
            return this.calculateForNode(curNode);
        }

        var fChange = new FieldChange();
        this.layer.children.forEach((node: PhysicalNode) => {
            if (curNode != node) {
                var fc = this.calculateBetweenNodes(curNode, node);
                fChange.torque = fChange.torque + fc.torque;
                fChange.force = geometry.ccpAdd(fChange.force, fc.force);
            }
        });
        return fChange;
    }

    protected calculateBetweenNodes(curNode: PhysicalNode, refNode: PhysicalNode): FieldChange {
        if ((<NodeForceHandler><any>refNode).calculationBetweenNodes) {
            return (<NodeForceHandler><any>refNode).calculationBetweenNodes(curNode, this);
        }
        //if (this.calculationBetweenNodes) {
        //    return this.calculationBetweenNodes(curNode, refNode);
        //}

        return refNode.forceHandler.calculationBetweenNodes(curNode, this);

        //return new FieldChange();
    }

}

export class TreatAsPointSource implements NodeForceHandler {

    constructor(public refNode: PhysicalNode) {

    }

    calculationBetweenNodes(curNode: PhysicalNode, field: InvSquareField): FieldChange {
        var fc = new FieldChange();
        var refNode = this.refNode;


        var mag1 = <number>(refNode["_" + field.fieldName]);
        var pos1 = refNode.centerOfMass;
        var npos1 = geometry.pointApplyAffineTransform(pos1, refNode.nodeToParentTransform());
        var ref1 = npos1;
        var mag2 = <number>(curNode["_" + field.fieldName]);
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
        } else {

            var fRay = field.islMagnitude * mag1 * mag2 / rSquared;
            var ray = geometry.ccpMultScaler(dist.normal(), fRay);

           // var vel = geometry.ccpMultScaler(ray, 1 / mass2);

            fc.force = ray;

        }
        return fc;
    }

}

class PointInfo {
    constructor(public point: geometry.Point, public mag: number) {

    }
}

export class TreatAsAreaSource implements NodeForceHandler {


    constructor(public refNode: PhysicalNode) {

    }

    calculationBetweenNodes(curNode: PhysicalNode, field: InvSquareField): FieldChange {
        var refNode = this.refNode;

        var fc = new FieldChange();
        var changes = new Array<ForceChange>();

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
        var torque:number = 0;

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
            torque = torque + A2.length()*b.length();
        }
        fc.force = force;
        fc.torque = torque;

        return fc;
    }

    private calculateBetween(point1: geometry.Point, mag1: number, point2: geometry.Point, mag2: number, islMagnitude:number): ForceChange {
        var dist = geometry.ccpSub(point1, point2);
        var rSquared = dist.lengthSquared();
        var fRay = islMagnitude * mag1 * mag2 / rSquared;
        var ray = geometry.ccpMultScaler(dist.normal(), fRay);
        return new ForceChange(ray, point1);
    }

    private getPoints(curShape: PhysicalShape, field: InvSquareField): Array<PointInfo> {
        var mass1 = curShape.mass;
        var mag1 = <number>(<any>curShape).getValue("_" + field.fieldName);


        var points = new Array<PointInfo>();
        if (curShape instanceof PhysicalShapeCircle) {
            var pos1 = curShape.centerOfMass;
            var npos1 = geometry.pointApplyAffineTransform(pos1, curShape.parent.nodeToParentTransform());

            points.push(new PointInfo(npos1, mag1));
        } else {
            var poly = <PhysicalShapePolygon>curShape;
            var pnts = poly.points;
            var lns = new Array<geometry.Line>();

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

    public calculateBetweenShapes(curShape: PhysicalShape, refShape: PhysicalShape, field: InvSquareField): Array<ForceChange> {

        var fcs = new Array<ForceChange>();

        var points1 = this.getPoints(curShape, field);
        var points2 = this.getPoints(refShape, field);

        points1.forEach((p1) => {
            points2.forEach((p2) => {
                var force = this.calculateBetween(p1.point, p1.mag, p2.point, p2.mag, field.islMagnitude);
                fcs.push(force);
            })
        });

        return fcs;
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
        var fchange = new FieldChange(geometry.ccpMultScaler(this.acceleration, node.mass));
        return fchange;
    }

}

export class electricyField extends InvSquareField {


    constructor(_physicalLayer: PhysicalLayer,
        _constant: number = null) {
        super(_physicalLayer, _constant || -16.1342368, "charge");
    }


}


export class gravityField extends InvSquareField {


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