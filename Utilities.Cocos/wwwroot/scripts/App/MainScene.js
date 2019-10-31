import { Director } from "../Cocos2d/Director";
import { remoteresources } from "../Cocos2d/jah/remote_resources";
//import { GameLayer } from "./Game/GameScene";
import { Scene } from "../Cocos2d/nodes/Scene";
import { GravatasLayer } from "./Gravatas/GravatasLayer";
import { geometry } from "../Cocos2d/libs/geometry";
import { ReferenceLayer } from "./Gravatas/ReferenceLayer";
import { Primitives } from "../Cocos2d/libs/Primitives";
var Resource = remoteresources.Resource;
export class MainScene extends Scene {
    constructor() {
        super();
        var s = Director.sharedDirector().winSize;
        //this.anchorPoint = geometry.ccp(0.5, 0.5);
        //this.contentSize = s;
        //this.position = geometry.ccp(s.width/2, -s.height/2);
        var s = Director.sharedDirector().winSize;
        var pos = geometry.ccp(s.width / 2, s.height / 2);
        var layer2 = new ReferenceLayer();
        layer2.position = pos;
        this.addChild(layer2);
        var layer = new GravatasLayer();
        layer.position = pos;
        this.addChild(layer);
    }
    draw(ctx) {
        Primitives.drawRect(ctx, new geometry.Rect(0, 0, this.contentSize.width, this.contentSize.height), "red", 12);
    }
}
//# sourceMappingURL=MainScene.js.map