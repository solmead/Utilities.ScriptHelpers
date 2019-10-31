import { PhysicalNode } from "../../physical/PhysicalNode";
import { geometry } from "../../../Cocos2d/libs/geometry";
import { Sprite } from "../../../Cocos2d/nodes/Sprite";
import { remoteresources } from "../../../Cocos2d/jah/remote_resources";
import { PhysicalShapeBox } from "../../physical/PhysicalShapeBox";
import { PhysicalShapeCircle } from "../../physical/PhysicalShapeCircle";
import { TextureAtlas } from "../../../Cocos2d/TextureAtlas";


var res = remoteresources.addResource('./assets/add.png', "image/png", true);

export class Plus extends Sprite {

    constructor(public point: geometry.Point, public radius: number = 8) {
        super(TextureAtlas.CreateFromResource(res));
        this.position = point;

        var sRad = this.boundingBox.size.width;
        this.scale = (radius*2) / sRad;

    }
}