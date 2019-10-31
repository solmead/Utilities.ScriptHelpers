import { PhysicalNode } from "../../physical/PhysicalNode";
import { geometry } from "../../../Cocos2d/libs/geometry";
import { Sprite } from "../../../Cocos2d/nodes/Sprite";
import { remoteresources } from "../../../Cocos2d/jah/remote_resources";
import { PhysicalShapeCircle } from "../../physical/PhysicalShapeCircle";


var res = remoteresources.addResource('/assets/ClearGreenButton.png', "image/png", true);

export class Ball2 extends PhysicalNode {

    
    constructor(public point: geometry.Point, public scaling: number = 1) {
        super();
        this.position = point;
        var sprite = Sprite.CreateFromResource(res);
        var sW = sprite.boundingBox.size.width;
        this.addChild(sprite);
        var shape = new PhysicalShapeCircle(undefined, sW / 2, undefined, undefined, 0.7);
        this.addShape(shape);


        scaling = scaling || 1;
        this.scale = scaling;


    }


}