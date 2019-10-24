import { Node } from "../../Cocos2d/nodes/Node";
import { geometry } from "../../Cocos2d/libs/geometry";
import { TextureAtlas } from "../../Cocos2d/TextureAtlas";
import { Sprite } from "../../Cocos2d/nodes/Sprite";
import { Action, RepeatForever } from "../../Cocos2d/actions/Action";
import { Texture2D } from "../../Cocos2d/Texture2D";
import { SpriteFrame } from "../../Cocos2d/SpriteFrame";
import { Animation } from "../../Cocos2d/Animation";



var ccp = geometry.ccp;


export class AnimatedSprite extends Node {

    protected _isAnimating: boolean = false;
    get isAnimating(): boolean {
        return this.getValue("_isAnimating");
    }
    set isAnimating(value: boolean) {
        this.setValue("_isAnimating", null, value, true);
    }
    protected _animation: Animation = null;
    get animation(): Animation {
        return this.getValue("_animation");
    }
    set animation(value: Animation) {
        this.setValue("_animation", null, value, true);
    }
    get frameWidth(): number {
        return this.getValue("_frameWidth");
    }
    set frameWidth(value: number) {
        this.setValue("_frameWidth", null, value, true);
    }
    get frameHeight(): number {
        return this.getValue("_frameHeight");
    }
    set frameHeight(value: number) {
        this.setValue("_frameHeight", null, value, true);
    }
    get framesPerRow(): number {
        return this.getValue("_framesPerRow");
    }
    set framesPerRow(value: number) {
        this.setValue("_framesPerRow", null, value, true);
    }
    get totalFrames(): number {
        return this.getValue("_totalFrames");
    }
    set totalFrames(value: number) {
        this.setValue("_totalFrames", null, value, true);
    }
    protected _sprite: Sprite = null;
    get sprite(): Sprite {
        return this.getValue("_sprite");
    }
    set sprite(value: Sprite) {
        this.setValue("_sprite", null, value, true);
    }
    protected _walkAction: Action = null;
    get walkAction(): Action {
        return this.getValue("_walkAction");
    }
    set walkAction(value: Action) {
        this.setValue("_walkAction", null, value, true);
    }
    protected _texture: Texture2D = null;
    get texture(): Texture2D {
        return this.getValue("_texture");
    }
    set texture(value: Texture2D) {
        this.setValue("_texture", null, value, true);
    }
    get textureAtlas(): TextureAtlas {
        return this.getValue("_textureAtlas");
    }
    set textureAtlas(value: TextureAtlas) {
        this.setValue("_textureAtlas", null, value, true);
    }




    constructor(protected _textureAtlas: TextureAtlas,
        protected _frameWidth: number=1,
        protected _frameHeight: number=1,
        protected _framesPerRow: number=1,
        protected _totalFrames: number=0) {
        super();

        this.texture = this.textureAtlas.texture;

        var frames = new Array<SpriteFrame>();
        for (var i = 0; i < this.totalFrames; i++) {
            var x = (i % this.framesPerRow) * this.frameWidth;
            var y = (i / this.framesPerRow) * this.frameHeight;
            var rect = geometry.rectMake(x, y, this.frameWidth, this.frameHeight);
            frames.push(new SpriteFrame(this.texture, rect));
        }
        this.animation = new Animation(frames, 0.05);

        //var walkCycle = new Animate(this.animation, 0.05 * this.totalFrames);

        //this.walkAction = new RepeatForever(walkCycle);

        this.sprite = Sprite.CreateFromFrame(this.animation.frames[0]);

        this.addChild(this.sprite);

        this.contentSize = geometry.sizeMake(this.frameWidth, this.frameHeight);

        this.sprite.position = ccp(this.sprite.anchorPointInPixels.x, this.sprite.anchorPointInPixels.y);


        this.sprite.runAction(this.walkAction);

    }

    public playAnimation(): void {
        if (!this.isAnimating) {
            this.isAnimating = true;
            this.sprite.runAction(this.walkAction);
        }
    }
    public stopAnimation(): void {
        if (this.isAnimating) {
            this.isAnimating = false;
            this.sprite.stopAllActions();
        }
    }



}

