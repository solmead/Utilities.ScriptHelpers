import { Sprite } from "../../../Cocos2d/nodes/Sprite";
import { remoteresources } from "../../../Cocos2d/jah/remote_resources";
import { TextureAtlas } from "../../../Cocos2d/TextureAtlas";
var res = remoteresources.addResource('./assets/add.png', "image/png", true);
export class Plus extends Sprite {
    constructor(point, radius = 8) {
        super(TextureAtlas.CreateFromResource(res));
        this.point = point;
        this.radius = radius;
        this.position = point;
        var sRad = this.boundingBox.size.width;
        this.scale = (radius * 2) / sRad;
    }
}
//# sourceMappingURL=Plus.js.map