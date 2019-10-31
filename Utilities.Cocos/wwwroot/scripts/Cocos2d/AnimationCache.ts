import { BObject } from "./libs/bobject";




export class AnimationCache extends BObject {

    protected _animations: Array<Animation> = new Array<Animation>();
    get animations(): Array<Animation> {
        return this.getValue("_animations");
    }
    set animations(value: Array<Animation>) {
        this.setValue("_animations", null, value, true);
    }



    constructor() {
        super();
    }
    /**
     * Add an animation to the cache
     *
     * @opt {String} name Unique name of the animation
     * @opt {cocos.Animcation} animation Animation to cache
     */
    public addAnimation(name:string, animation:Animation): void {
        this.animations[name] = animation;
    }
    /**
     * Remove an animation from the cache
     *
     * @opt {String} name Unique name of the animation
     */
    public removeAnimation(name: string): void {
        delete this.animations[name];
    }
    /**
     * Get an animation from the cache
     *
     * @opt {String} name Unique name of the animation
     * @returns {cocos.Animation} Cached animation
     */
    public getAnimation(name: string): Animation {
        return this.animations[name];
    }




    static get sharedAnimationCache(): AnimationCache {
        if (!(<any>this)._instance) {
            (<any>this)._instance = new AnimationCache();
        }

        return (<any>this)._instance;
    }


}