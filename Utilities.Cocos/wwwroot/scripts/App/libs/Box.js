import { geometry } from "../../Cocos2d/libs/geometry";
import { Node } from "../../Cocos2d/nodes/Node";
import { Primitives } from "../../Cocos2d/libs/Primitives";
var ccp = geometry.ccp;
export class box extends Node {
    constructor() {
        super();
        this.box = new geometry.Rect(0, 0, 100, 100);
        this.contentSize = this.box.size;
    }
    draw(ctx) {
        Primitives.fillRect(ctx, this.box, "blue");
    }
}
//# sourceMappingURL=Box.js.map