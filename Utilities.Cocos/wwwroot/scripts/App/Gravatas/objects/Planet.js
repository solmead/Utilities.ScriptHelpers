import { PhysicalNode } from "../../physical/PhysicalNode";
import { Sprite } from "../../../Cocos2d/nodes/Sprite";
import { PhysicalShapeCircle } from "../../physical/PhysicalShapeCircle";
import { remoteresources } from "../../../Cocos2d/jah/remote_resources";
var res = remoteresources.addResource('./assets/ball2.png', "image/png", true);
export class Planet extends PhysicalNode {
    constructor(point, radius = 24) {
        super();
        this.point = point;
        this.radius = radius;
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
//# sourceMappingURL=Planet.js.map