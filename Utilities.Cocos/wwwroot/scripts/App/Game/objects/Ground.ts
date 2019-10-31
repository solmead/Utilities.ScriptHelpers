import { PhysicalNode } from "../../physical/PhysicalNode";
import { geometry } from "../../../Cocos2d/libs/geometry";
import { Sprite } from "../../../Cocos2d/nodes/Sprite";
import { remoteresources } from "../../../Cocos2d/jah/remote_resources";
import { PhysicalShapeBox } from "../../physical/PhysicalShapeBox";
import { Node } from "../../../Cocos2d/nodes/Node";
import { PhysicalLayer } from "../../physical/PhysicalLayer";
import { PhysicalShape } from "../../physical/PhysicalShape";


var groundRes = remoteresources.addResource('/assets/Ground.png', "image/png", true);
var groundGBRes = remoteresources.addResource('/assets/GroundGreenBack.png', "image/png", true);

export class Ground extends PhysicalNode {
    get point1(): geometry.Point {
        return this.getValue("_point1");
    }
    set point1(value: geometry.Point) {
        this.setValue("_point1", null, value, true);
        this._updatePoints();
    }
    get point2(): geometry.Point {
        return this.getValue("_point2");
    }
    set point2(value: geometry.Point) {
        this.setValue("_point2", null, value, true);
        this._updatePoints();
    }
    protected _sprite: Node
    get sprite(): Node {
        return this.getValue("_sprite");
    }
    set sprite(value: Node) {
        this.setValue("_sprite", null, value, true);
        this._updatePoints();
    }

    static addGroundAlongPolyLine(layer: PhysicalLayer, points: Array<geometry.Point>):void {
        var arr = new Array<Ground>();
        var p1 = points[0];

        for (var n = 1; n < points.length; n++) {
            var p2 = points[n];

            var sp = new Ground(p1, p2);
            layer.addChild(sp, -10);

            p1 = p2;
        }
    }

    constructor(protected _point1: geometry.Point, protected _point2: geometry.Point) {
        super();


        this.isStatic = true;
        this._updatePoints();
    }
    public _updatePoints(): void {
        if (this.sprite != null) {
            this.removeChild(this.sprite);
        }
        this._sprite = new Node();
        this.addChild(this.sprite);
        this.shapes = new Array<PhysicalShape>();
        var p1:geometry.Point = this.point1;
        var p2:geometry.Point = this.point2;
        var xtn: number = (p2.x - p1.x);
        var ytn: number = (p2.y - p1.y);
        var atnRadians: number = Math.atan2(ytn, xtn);

        var atnDegrees: number = geometry.radiansToDegrees(atnRadians);
        var x:number = 0;
        var d: number = Math.sqrt((p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y));
        var sp:Sprite = null;

        for (x = -d / 2 + 20; x <= d / 2; x = x + 38) {
            //for (x = 0; x <= d / 2; x = x + 38) {
            sp = Sprite.CreateFromResource(groundGBRes);
            sp.position = geometry.ccp(x, 320 / 2);
            this.sprite.addChild(sp);

            sp = Sprite.CreateFromResource(groundRes);
            sp.position = geometry.ccp(x, 0);
            this.sprite.addChild(sp);
        }

        sp = Sprite.CreateFromResource(groundGBRes);
        sp.position = geometry.ccp(d / 2, 320 / 2);
        this.sprite.addChild(sp);

        sp = Sprite.CreateFromResource(groundRes);
        sp.position = geometry.ccp(d / 2, 0);
        this.sprite.addChild(sp);

        this.addShape(new PhysicalShapeBox(
            geometry.rectMake(-d / 2, 0, d, 1),
            undefined,
            1,
            0.1));

        this.rotation = atnDegrees;
        this.position = geometry.ccp((p2.x - p1.x) / 2 + p1.x, (p2.y - p1.y) / 2 + p1.y);

        var size = geometry.sizeMake(d, 1);
        //this.set('contentSize', size);

        this.setupBody();
    }




}