import { Node } from "../../Cocos2d/nodes/Node";
import { geometry } from "../../Cocos2d/libs/geometry";
import { Sprite } from "../../Cocos2d/nodes/Sprite";
import { RepeatForever } from "../../Cocos2d/actions/Action";
import { Animate } from "../../Cocos2d/actions/ActionInterval";
import { SpriteFrame } from "../../Cocos2d/SpriteFrame";
import { Animation } from "../../Cocos2d/Animation";
var ccp = geometry.ccp;
export class AnimatedSprite extends Node {
    constructor(_textureAtlas, _frameWidth = 1, _frameHeight = 1, _framesPerRow = 1, _totalFrames = 0, _animationSeconds = 1, _basePoint = null) {
        super();
        this._textureAtlas = _textureAtlas;
        this._frameWidth = _frameWidth;
        this._frameHeight = _frameHeight;
        this._framesPerRow = _framesPerRow;
        this._totalFrames = _totalFrames;
        this._animationSeconds = _animationSeconds;
        this._basePoint = _basePoint;
        this._isAnimating = false;
        this._animation = null;
        this._sprite = null;
        this._walkAction = null;
        this._texture = null;
        this._basePoint = this._basePoint || new geometry.Point(0, 0);
        this.texture = this.textureAtlas.texture;
        var frames = new Array();
        for (var i = 0; i < this.totalFrames; i++) {
            var x = this._basePoint.x + Math.floor((i % this.framesPerRow)) * this.frameWidth;
            var y = this._basePoint.y + Math.floor((i / this.framesPerRow)) * this.frameHeight;
            var rect = geometry.rectMake(x, y, this.frameWidth, this.frameHeight);
            frames.push(new SpriteFrame(this.texture, rect));
        }
        var frameTime = this._animationSeconds / (frames.length + 1);
        this.animation = new Animation(frames, frameTime); // 0.05);
        var walkCycle = new Animate(this.animation, true);
        this.walkAction = new RepeatForever(walkCycle);
        this.sprite = Sprite.CreateFromFrame(this.animation.frames[0]);
        this.addChild(this.sprite);
        this.contentSize = geometry.sizeMake(this.frameWidth, this.frameHeight);
        this.sprite.position = ccp(this.sprite.anchorPointInPixels.x, this.sprite.anchorPointInPixels.y);
        this.sprite.runAction(this.walkAction);
    }
    get isAnimating() {
        return this.getValue("_isAnimating");
    }
    set isAnimating(value) {
        this.setValue("_isAnimating", null, value, true);
    }
    get animation() {
        return this.getValue("_animation");
    }
    set animation(value) {
        this.setValue("_animation", null, value, true);
    }
    get frameWidth() {
        return this.getValue("_frameWidth");
    }
    set frameWidth(value) {
        this.setValue("_frameWidth", null, value, true);
    }
    get frameHeight() {
        return this.getValue("_frameHeight");
    }
    set frameHeight(value) {
        this.setValue("_frameHeight", null, value, true);
    }
    get framesPerRow() {
        return this.getValue("_framesPerRow");
    }
    set framesPerRow(value) {
        this.setValue("_framesPerRow", null, value, true);
    }
    get totalFrames() {
        return this.getValue("_totalFrames");
    }
    set totalFrames(value) {
        this.setValue("_totalFrames", null, value, true);
    }
    get sprite() {
        return this.getValue("_sprite");
    }
    set sprite(value) {
        this.setValue("_sprite", null, value, true);
    }
    get walkAction() {
        return this.getValue("_walkAction");
    }
    set walkAction(value) {
        this.setValue("_walkAction", null, value, true);
    }
    get texture() {
        return this.getValue("_texture");
    }
    set texture(value) {
        this.setValue("_texture", null, value, true);
    }
    get textureAtlas() {
        return this.getValue("_textureAtlas");
    }
    set textureAtlas(value) {
        this.setValue("_textureAtlas", null, value, true);
    }
    playAnimation() {
        if (!this.isAnimating) {
            this.isAnimating = true;
            this.sprite.runAction(this.walkAction);
        }
    }
    stopAnimation() {
        if (this.isAnimating) {
            this.isAnimating = false;
            this.sprite.stopAllActions();
        }
    }
}
//# sourceMappingURL=AnimatedSprite.js.map