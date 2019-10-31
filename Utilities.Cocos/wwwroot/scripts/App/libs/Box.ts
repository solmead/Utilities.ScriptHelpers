import { geometry } from "../../Cocos2d/libs/geometry";
import { Node } from "../../Cocos2d/nodes/Node";
import { Primitives } from "../../Cocos2d/libs/Primitives";





var ccp = geometry.ccp;

export class box extends Node {
    public box: geometry.Rect = new geometry.Rect(0, 0, 100, 100);

    constructor() {
        super();
        this.contentSize = this.box.size;
    }
    public draw(ctx:CanvasRenderingContext2D): void {
        Primitives.fillRect(ctx, this.box, "blue");
    }


}