import { PhysicalNode } from "../../physical/PhysicalNode";
import { geometry } from "../../../Cocos2d/libs/geometry";
import { Sprite } from "../../../Cocos2d/nodes/Sprite";
import { remoteresources } from "../../../Cocos2d/jah/remote_resources";
import { PhysicalShapeBox } from "../../physical/PhysicalShapeBox";
import { NodeForceHandler, FieldChange, InvSquareField, ForceChange } from "../../physical/InvSquareField";



var resWidth = remoteresources.addResource('./assets/PushWallWidth.png', "image/png", true);
var resEnd = remoteresources.addResource('./assets/PushWallEnd.png', "image/png", true);
var resBlock = remoteresources.addResource('./assets/PushWallBlock.png', "image/png", true);

export class Wall extends PhysicalNode implements NodeForceHandler {


    constructor(public line: geometry.Line, public width: number = 6, public effectDistance:number = 100) {
        super();
        var len = line.length();

        this.position = line.center;
        this.isStatic = true;
        this.rotation = line.ray.angle;


        var effectWidth = this.effectDistance * 2;

        var fieldSprite = Sprite.CreateFromResource(resWidth);
        var sWid = fieldSprite.boundingBox.size.width;
        var sHgt = fieldSprite.boundingBox.size.height;

        fieldSprite.scaleX = len / sWid;
        fieldSprite.scaleY = effectWidth / sHgt;
        this.addChild(fieldSprite);


        var endFieldSpriteRight = Sprite.CreateFromResource(resEnd);
        sWid = endFieldSpriteRight.boundingBox.size.width;
        sHgt = endFieldSpriteRight.boundingBox.size.height;
        endFieldSpriteRight.scaleX = (effectWidth/2) / sWid;
        endFieldSpriteRight.scaleY = effectWidth / sHgt;
        endFieldSpriteRight.position = geometry.ccp(len / 2 + effectWidth/2/2, 0);
        this.addChild(endFieldSpriteRight);


        var endFieldSpriteLeft = Sprite.CreateFromResource(resEnd);
        sWid = endFieldSpriteLeft.boundingBox.size.width;
        sHgt = endFieldSpriteLeft.boundingBox.size.height;
        endFieldSpriteLeft.scaleX = -(effectWidth/2) / sWid;
        endFieldSpriteLeft.scaleY = effectWidth / sHgt;
        endFieldSpriteLeft.position = geometry.ccp(-len / 2 - effectWidth/2/2, 0);
        this.addChild(endFieldSpriteLeft);


        var wallSprite = Sprite.CreateFromResource(resBlock);
        sWid = wallSprite.boundingBox.size.width;
        sHgt = wallSprite.boundingBox.size.height;

        wallSprite.scaleX = len / sWid;
        wallSprite.scaleY = width / sHgt;
        //wallSprite.position = geometry.ccp(-len / 2 - endWidth * sWid / 4, 0);
        this.addChild(wallSprite);

        this.mass = -len * width * 100;

        var shape = new PhysicalShapeBox(new geometry.Rect(-len / 2, -width/2, len, width), 100, 1, 1);

        this.addShape(shape);
    }


    public calculationBetweenNodes(curNode: PhysicalNode, field: InvSquareField): FieldChange {
        var fc = new FieldChange();
        var mag1 = <number>(<any>curNode).getValue("_" + field.fieldName);
        var mass2 = this.mass;

        var mag2 = <number>(<any>this).getValue("_" + field.fieldName);



        //var npos1 = geometry.pointApplyAffineTransform(this.line.point1, this.nodeToParentTransform());
        //var npos2 = geometry.pointApplyAffineTransform(this.line.point2, this.nodeToParentTransform());

        var npos1 = this.line.point1;
        var npos2 = this.line.point2;

        var npos3 = curNode.position;

        var ln = new geometry.Line(npos1, npos2);
        var dist = ln.distanceTo(npos3);

        if (dist.length() <= this.effectDistance) {
            var rSquared = dist.lengthSquared();
            if (mag2 == mass2) {
                var fRay = field.islMagnitude * mag1 * mag2 / rSquared;
                var ray = geometry.ccpMultScaler(dist.normal(), fRay);
                fc.force = ray;
            } else {

                var fRay = field.islMagnitude * mag1 * mag2 / rSquared;
                var ray = geometry.ccpMultScaler(dist.normal(), fRay);

                //var vel = geometry.ccpMultScaler(ray, 1 / mass2);

                fc.force = ray;

            }
        }
        return fc;

    }

}