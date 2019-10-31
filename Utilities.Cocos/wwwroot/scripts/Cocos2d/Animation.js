import { BObject } from "./libs/bobject";
export class Animation extends BObject {
    constructor(_frames = null, _delay = null) {
        super();
        this._frames = _frames;
        this._delay = _delay;
        this._name = null;
        _frames = _frames || [];
        _delay = _delay || 0;
    }
    get frames() {
        return this.getValue("_frames");
    }
    set frames(value) {
        this.setValue("_frames", null, value, true);
    }
    get delay() {
        return this.getValue("_delay");
    }
    set delay(value) {
        this.setValue("_delay", null, value, true);
    }
    get name() {
        return this.getValue("_name");
    }
    set name(value) {
        this.setValue("_name", null, value, true);
    }
}
//# sourceMappingURL=Animation.js.map