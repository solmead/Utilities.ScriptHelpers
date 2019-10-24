import { BObject } from "./libs/bobject";
import { SpriteFrame } from "./SpriteFrame";



export class Animation extends BObject {

    get frames(): Array<SpriteFrame> {
        return this.getValue("_frames");
    }
    set frames(value: Array<SpriteFrame>) {
        this.setValue("_frames", null, value, true);
    }
    get delay(): number {
        return this.getValue("_delay");
    }
    set delay(value: number) {
        this.setValue("_delay", null, value, true);
    }
    protected _name: string = null
    get name(): string {
        return this.getValue("_name");
    }
    set name(value: string) {
        this.setValue("_name", null, value, true);
    }


    constructor(protected _frames:Array<SpriteFrame> = null, protected _delay:number = null) {
        super();

        _frames = _frames || [];
        _delay = _delay || 0;

    }


}