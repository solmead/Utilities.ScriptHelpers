import { PhysicalNode } from "../../physical/PhysicalNode";
import { geometry } from "../../../Cocos2d/libs/geometry";
import { Sprite } from "../../../Cocos2d/nodes/Sprite";
import { remoteresources } from "../../../Cocos2d/jah/remote_resources";
import { PhysicalShapeBox } from "../../physical/PhysicalShapeBox";
var res = remoteresources.addResource('/assets/crate.jpg', "image/png", true);
export class Crate extends PhysicalNode {
    constructor(point, size = geometry.sizeMake(32, 32)) {
        super();
        this.point = point;
        this.size = size;
        this.position = point;
        var sprite = Sprite.CreateFromResource(res);
        var sWid = sprite.boundingBox.size.width;
        var sHgt = sprite.boundingBox.size.height;
        sprite.scaleX = size.width / sWid;
        sprite.scaleY = size.height / sHgt;
        this.addChild(sprite);
        var shape = new PhysicalShapeBox(undefined, undefined, undefined, 0.2);
        this.addShape(shape);
    }
}
//# sourceMappingURL=Crate.js.map