import { Director } from "../Cocos2d/Director";
import { events } from "../Cocos2d/libs/events";
import { remoteresources } from "../Cocos2d/jah/remote_resources";
//import { GameLayer } from "./Game/GameScene";
import { Scene } from "../Cocos2d/nodes/Scene";
import { GravatasLayer } from "./Gravatas/GravatasLayer";
import { Plus } from "./Gravatas/objects/Plus";
import { geometry } from "../Cocos2d/libs/geometry";
import { Layer } from "../Cocos2d/nodes/Layer";
import { ReferenceLayer } from "./Gravatas/ReferenceLayer";

var Resource = remoteresources.Resource;


export class MainScene extends Scene {


    constructor() {
        super();
        var s = Director.sharedDirector().winSize;

        //this.anchorPoint = geometry.ccp(0.5, 0.5);
        //this.contentSize = s;
        this.position = geometry.ccp(s.width/2, -s.height/2);

        var layer2 = new ReferenceLayer();
        this.addChild(layer2);

        var layer = new GravatasLayer();
        this.addChild(layer);



    }
}


