import { Node } from "./Node";
import { geometry } from "../libs/geometry";
import { Director } from "../Director";
export class Scene extends Node {
    /**
     * Everything in your view will be a child of this object. You need at least 1 scene per app.
     *
     * @memberOf cocos.nodes
     * @constructs
     * @extends cocos.nodes.Node
     */
    constructor() {
        super();
        var s = Director.sharedDirector().winSize;
        this.isRelativeAnchorPoint = false;
        this.anchorPoint = new geometry.Point(0.5, 0.5);
        this.contentSize = s;
    }
}
//# sourceMappingURL=Scene.js.map