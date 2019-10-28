import { remoteresources } from "../../../Cocos2d/jah/remote_resources";
import { geometry } from "../../../Cocos2d/libs/geometry";
import { AnimatedSprite } from "../../libs/AnimatedSprite";
import { TextureAtlas } from "../../../Cocos2d/TextureAtlas";
import { PhysicalNode } from "../../physical/PhysicalNode";
import { PhysicalShapePolygon } from "../../physical/PhysicalShapePolygon";

var ccp = geometry.ccp;

var legoImage = remoteresources.addResource("/assets/LegoManWalk.png", "image/png", true);


export class LegoMan extends PhysicalNode {

    public animatedSprite: AnimatedSprite = null;


    constructor() {
        super();

        var texture = TextureAtlas.CreateFromResource(legoImage);
        this.animatedSprite = new AnimatedSprite(texture, 100, 100, 5, 20, 2);

        this.addChild(this.animatedSprite);

        this.addShape(new PhysicalShapePolygon([ccp(-15, 15),
                ccp(-20, 0),
                ccp(-20, -25),
                ccp(-5, -50),
                ccp(5, -50),
                ccp(20, -25),
                ccp(20, 0),
                ccp(15, 15),
                ccp(5, 40),
                ccp(-5, 40)
            ],
            undefined,
            0.8,
            0.1));
        this.lockRotation = true;
    }

    public updateNodeFromPhysical(): void {
        super.updateNodeFromPhysical();
        if (this.velocity.x < -0.5) {
            this.scaleX = -1;
            this.animatedSprite.playAnimation();
        }
        if (this.velocity.x > 0.51) {
            this.scaleX = 1;
            this.animatedSprite.playAnimation();
        }
        if (Math.abs(this.velocity.x) <= 0.5) {
            this.animatedSprite.stopAnimation();
        }
    }
    public walkLeft(): void {
        this.velocity = ccp(-50, this.velocity.y);
    }
    public walkRight(): void {
        this.velocity = ccp(50, this.velocity.y);
    }
    public jump(): void {
        this.velocity = ccp(this.velocity.x, 210);
    }
    public stand(): void {
        this.velocity = ccp(0, this.velocity.y);
    }

}