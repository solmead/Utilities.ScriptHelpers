import { Layer } from "../../Cocos2d/nodes/Layer";
import { Director } from "../../Cocos2d/Director";
import { Plus } from "./objects/Plus";
import { geometry } from "../../Cocos2d/libs/geometry";
import { Label } from "../../Cocos2d/nodes/Label";
export class ReferenceLayer extends Layer {
    constructor() {
        super();
        this.tag = "ReferenceLayer";
        //var s = Director.sharedDirector().winSize;
        //var pos = geometry.ccp(s.width / 2, s.height / 2);
        //this.position = pos;
        //this.anchorPoint = geometry.ccp(0.5, 0.5);
        this.scaleY = -1;
        //this.contentSize = s;
    }
    onEnter() {
        super.onEnter();
        var s = Director.sharedDirector().winSize;
        if (this.children.length == 0) {
            for (var x = 0; x < 1000; x = x + 50) {
                for (var y = 0; y < 1000; y = y + 50) {
                    if (x < s.width / 2 && y < s.height / 2) {
                        var ad = new Plus(geometry.ccp(x, y));
                        this.addChild(ad);
                        var tx = new Label(ad.position.toString());
                        tx.fontSize = 8;
                        tx.position = ad.position.add(geometry.ccp(0, 10));
                        tx.anchorPoint = geometry.ccp(0.5, 0.5);
                        tx.scaleY = -1;
                        this.addChild(tx);
                        ad = new Plus(geometry.ccp(-x, y));
                        this.addChild(ad);
                        tx = new Label(ad.position.toString());
                        tx.fontSize = 8;
                        tx.position = ad.position.add(geometry.ccp(0, 10));
                        tx.anchorPoint = geometry.ccp(0.5, 0.5);
                        tx.scaleY = -1;
                        this.addChild(tx);
                        ad = new Plus(geometry.ccp(x, -y));
                        this.addChild(ad);
                        tx = new Label(ad.position.toString());
                        tx.fontSize = 8;
                        tx.position = ad.position.add(geometry.ccp(0, 10));
                        tx.anchorPoint = geometry.ccp(0.5, 0.5);
                        tx.scaleY = -1;
                        this.addChild(tx);
                        ad = new Plus(geometry.ccp(-x, -y));
                        this.addChild(ad);
                        tx = new Label(ad.position.toString());
                        tx.fontSize = 8;
                        tx.position = ad.position.add(geometry.ccp(0, 10));
                        tx.anchorPoint = geometry.ccp(0.5, 0.5);
                        tx.scaleY = -1;
                        this.addChild(tx);
                    }
                }
            }
        }
    }
}
//# sourceMappingURL=ReferenceLayer.js.map