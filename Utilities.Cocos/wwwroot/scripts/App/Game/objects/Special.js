import { PhysicalNode } from "../../physical/PhysicalNode";
import { Sprite } from "../../../Cocos2d/nodes/Sprite";
import { remoteresources } from "../../../Cocos2d/jah/remote_resources";
import { PhysicalShapeCircle } from "../../physical/PhysicalShapeCircle";
var res = remoteresources.addResource('/assets/ball2.png', "image/png", true);
export class Special extends PhysicalNode {
    constructor(point, radius = 32) {
        super();
        this.point = point;
        this.radius = radius;
        this.position = point;
        var sprite = Sprite.CreateFromResource(res);
        var sRad = sprite.boundingBox.size.width;
        sprite.scale = (radius * 2) / sRad;
        this.addChild(sprite);
        var shape = new PhysicalShapeCircle(undefined, radius, undefined, 1, 0.5);
        this.addShape(shape);
        //scaling = scaling || 1;
        //this.scale = scaling;
    }
}
//# sourceMappingURL=Special.js.map