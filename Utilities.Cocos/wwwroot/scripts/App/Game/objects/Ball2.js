import { PhysicalNode } from "../../physical/PhysicalNode";
import { Sprite } from "../../../Cocos2d/nodes/Sprite";
import { remoteresources } from "../../../Cocos2d/jah/remote_resources";
import { PhysicalShapeCircle } from "../../physical/PhysicalShapeCircle";
var res = remoteresources.addResource('/assets/ClearGreenButton.png', "image/png", true);
export class Ball2 extends PhysicalNode {
    constructor(point, scaling = 1) {
        super();
        this.point = point;
        this.scaling = scaling;
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
//# sourceMappingURL=Ball2.js.map