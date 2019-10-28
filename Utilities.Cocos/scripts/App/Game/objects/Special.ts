import { PhysicalNode } from "../../physical/PhysicalNode";
import { geometry } from "../../../Cocos2d/libs/geometry";
import { Sprite } from "../../../Cocos2d/nodes/Sprite";
import { remoteresources } from "../../../Cocos2d/jah/remote_resources";
import { PhysicalShapeBox } from "../../physical/PhysicalShapeBox";
import { PhysicalShapeCircle } from "../../physical/PhysicalShapeCircle";


var res = remoteresources.addResource('/assets/ball2.png', "image/png", true);

export class Special extends PhysicalNode {

    constructor(public point: geometry.Point, public radius: number = 32) {
        super();
        this.position = point;

        var sprite = Sprite.CreateFromResource(res);
        var sRad = sprite.boundingBox.size.width/2;
        sprite.scale = radius / sRad;
        this.addChild(sprite);
        var shape = new PhysicalShapeCircle(undefined, radius, undefined, 1, 0.5);
        this.addShape(shape);


        //scaling = scaling || 1;
        //this.scale = scaling;


    }
}