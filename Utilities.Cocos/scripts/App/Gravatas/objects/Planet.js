import { PhysicalNode } from "../../physical/PhysicalNode";
import { Sprite } from "../../../Cocos2d/nodes/Sprite";
import { PhysicalShapeCircle } from "../../physical/PhysicalShapeCircle";
import { remoteresources } from "../../../Cocos2d/jah/remote_resources";
var res = remoteresources.addResource('/assets/ball2.png', "image/png", true);
export class Planet extends PhysicalNode {
    constructor(point, radius = 32) {
        super();
        this.point = point;
        this.radius = radius;
        this.position = point;
        this.drag = 0.0001;
        this.minVelocityToMoveFromStop = 0.25;
        var sprite = Sprite.CreateFromResource(res);
        var sW = sprite.boundingBox.size.width;
        sprite.scale = radius / sW;
        this.addChild(sprite);
        var shape = new PhysicalShapeCircle(undefined, radius, undefined, 1, 0.5);
        this.addShape(shape);
    }
}
//# sourceMappingURL=Planet.js.map