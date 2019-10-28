import { geometry } from "../../Cocos2d/libs/geometry";
import { Scene } from "../../Cocos2d/nodes/Scene";
import { Director } from "../../Cocos2d/Director";
import { Label } from "../../Cocos2d/nodes/Label";
import { Layer } from "../../Cocos2d/nodes/Layer";
import { GreenItem } from "./GreenItem";
import { LegoMan } from "./LegoMan";
import { box } from "./Box";
var ccp = geometry.ccp;
export class Scene1 extends Scene {
    constructor() {
        super();
        this.item1 = null;
        this.item2 = null;
        this.item3 = null;
        this.an = 0;
        this.r = 200;
        this.dir = ccp(1, 1);
        var mainLayer = new Layer();
        var s = Director.sharedDirector().winSize;
        this.item2 = new box();
        this.item2.position = ccp(s.width / 2, s.height / 2);
        mainLayer.addChild(this.item2);
        this.item1 = new Label("Fun interesting view");
        this.item1.position = ccp(s.width / 2, 8);
        this.item1.tag = "label";
        mainLayer.addChild(this.item1);
        this.item3 = new LegoMan();
        this.item3.position = ccp(150, 200);
        mainLayer.addChild(this.item3);
        this.item3 = new GreenItem();
        this.item3.position = ccp(150, 200);
        mainLayer.addChild(this.item3);
        this.item1 = new GreenItem();
        this.item1.position = ccp(50, 100);
        mainLayer.addChild(this.item1);
        this.addChild(mainLayer);
        this.scheduleUpdate();
    }
    update(dt) {
        var Prev = this.item1.position;
        var s = Director.sharedDirector().winSize;
        //        //this.item1.position = this.item1.position.add(ccp(100, 50).multiply(dt).scale(this.dir));
        var bb = this.item1.contentSize;
        this.item1.position = ccp(this.item1.position.x + 100 * dt * this.dir.x, this.item1.position.y + 50 * dt * this.dir.y);
        if ((this.item1.position.x > s.width - bb.width / 2) || (this.item1.position.x < bb.width / 2)) {
            this.dir.x = -this.dir.x;
        }
        if ((this.item1.position.y > s.height - bb.height / 2) || (this.item1.position.y < bb.height / 2)) {
            this.dir.y = -this.dir.y;
        }
        var Cur = this.item1.position;
        var ang = Math.atan2(Prev.y - Cur.y, Prev.x - Cur.x) + Math.PI - Math.PI / 2;
        this.item1.rotation = geometry.radiansToDegrees(ang);
        this.an = this.an + (dt * Math.PI * 2) / 10.0;
        this.r = this.r - dt * 1;
        Prev = this.item3.position;
        this.item3.position = ccp(Math.sin(this.an) * this.r + s.width / 2, Math.cos(this.an) * this.r + s.height / 2);
        Cur = this.item3.position;
        ang = Math.atan2(Prev.y - Cur.y, Prev.x - Cur.x) + Math.PI - Math.PI / 2;
        this.item3.rotation = geometry.radiansToDegrees(ang);
        this.item2.rotation = this.item3.rotation;
    }
}
//# sourceMappingURL=Scene1.js.map