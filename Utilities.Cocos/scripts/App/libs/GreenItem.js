import { remoteresources } from "../../Cocos2d/jah/remote_resources";
import { geometry } from "../../Cocos2d/libs/geometry";
import { Sprite } from "../../Cocos2d/nodes/Sprite";
import { TextureAtlas } from "../../Cocos2d/TextureAtlas";
var ccp = geometry.ccp;
var greenButton = remoteresources.addResource("/assets/ClearGreenButton.png", "image/png", true);
export class GreenItem extends Sprite {
    constructor() {
        super(TextureAtlas.CreateFromResource(greenButton));
    }
}
//# sourceMappingURL=GreenItem.js.map