import { remoteresources } from "../../Cocos2d/jah/remote_resources";
import { geometry } from "../../Cocos2d/libs/geometry";
import { AnimatedSprite } from "./AnimatedSprite";
import { Node } from "../../Cocos2d/nodes/Node";
import { TextureAtlas } from "../../Cocos2d/TextureAtlas";
var ccp = geometry.ccp;
var legoImage = remoteresources.addResource("/assets/LegoManWalk.png", "image/png", true);
export class LegoMan extends Node {
    constructor() {
        super();
        this.animatedSprite = null;
        var texture = TextureAtlas.CreateFromResource(legoImage);
        this.animatedSprite = new AnimatedSprite(texture, 100, 100, 5, 20, 2);
        this.addChild(this.animatedSprite);
        this.animatedSprite.playAnimation();
    }
}
//# sourceMappingURL=LegoMan.js.map