import { PhysicalNode } from "../../physical/PhysicalNode";
import { geometry } from "../../../Cocos2d/libs/geometry";
import { Sprite } from "../../../Cocos2d/nodes/Sprite";
import { PhysicalShapeCircle } from "../../physical/PhysicalShapeCircle";
import { remoteresources } from "../../../Cocos2d/jah/remote_resources";



var res = remoteresources.addResource('./assets/ball3.png', "image/png", true);
var res2 = remoteresources.addResource('./assets/add.png', "image/png", true);

export class Sun extends PhysicalNode {

    constructor(point: geometry.Point);
    constructor(public point: geometry.Point, public radius: number = 50) {
        super();

        this.position = point;
        //this.minVelocityToMoveFromStop = 0.25;

        var sprite = Sprite.CreateFromResource(res);
        var sRad = sprite.boundingBox.size.width;
        sprite.scale = (radius * 2) / sRad;
        this.addChild(sprite);
        var shape = new PhysicalShapeCircle(undefined, radius, 100, 1, 0);
        //this.mass = -100 * 3.14159265 * radius * radius;
        this.addShape(shape);

        //var sprite2 = Sprite.CreateFromResource(res2);
        //sprite2.scale = 5;
        //this.addChild(sprite2);

    }

}