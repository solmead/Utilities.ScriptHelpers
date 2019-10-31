import { PhysicalNode } from "../../physical/PhysicalNode";
import { geometry } from "../../../Cocos2d/libs/geometry";
import { Sprite } from "../../../Cocos2d/nodes/Sprite";
import { PhysicalShapeCircle } from "../../physical/PhysicalShapeCircle";
import { remoteresources } from "../../../Cocos2d/jah/remote_resources";



var res = remoteresources.addResource('./assets/ball2.png', "image/png", true);

export class Planet extends PhysicalNode {

    constructor(point: geometry.Point);
    constructor(point: geometry.Point, radius: number);
    constructor(public point: geometry.Point, public radius: number = 24) {
        super();

        this.position = point;
        //this.minVelocityToMoveFromStop = 0.25;

        var sprite = Sprite.CreateFromResource(res);
        var sRad = sprite.boundingBox.size.width;
        sprite.scale = (radius * 2) / sRad;
        this.addChild(sprite);
        var shape = new PhysicalShapeCircle(undefined, radius, 1, 1, 1);
        this.addShape(shape);
    }

}