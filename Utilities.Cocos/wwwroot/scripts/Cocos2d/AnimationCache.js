import { BObject } from "./libs/bobject";
export class AnimationCache extends BObject {
    constructor() {
        super();
        this._animations = new Array();
    }
    get animations() {
        return this.getValue("_animations");
    }
    set animations(value) {
        this.setValue("_animations", null, value, true);
    }
    /**
     * Add an animation to the cache
     *
     * @opt {String} name Unique name of the animation
     * @opt {cocos.Animcation} animation Animation to cache
     */
    addAnimation(name, animation) {
        this.animations[name] = animation;
    }
    /**
     * Remove an animation from the cache
     *
     * @opt {String} name Unique name of the animation
     */
    removeAnimation(name) {
        delete this.animations[name];
    }
    /**
     * Get an animation from the cache
     *
     * @opt {String} name Unique name of the animation
     * @returns {cocos.Animation} Cached animation
     */
    getAnimation(name) {
        return this.animations[name];
    }
    static get sharedAnimationCache() {
        if (!this._instance) {
            this._instance = new AnimationCache();
        }
        return this._instance;
    }
}
//# sourceMappingURL=AnimationCache.js.map