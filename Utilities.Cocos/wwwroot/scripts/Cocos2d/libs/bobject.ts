import { events } from "./events";


interface iAccessor {
    key: string;
    target: BObject;
}


/**
 * @ignore
 */
function getAllAccessors(obj: BObject): any {
    if (!(<any>obj).js_accessors_) {
        (<any>obj).js_accessors_ = {};
    }
    return (<any>obj).js_accessors_;
}
function getAccessor(obj: BObject, key: string): iAccessor {
    if (!(<any>obj).js_accessors_) {
        (<any>obj).js_accessors_ = {};
    }
    return <iAccessor>((<any>obj).js_accessors_[key]);
}

/**
 * @ignore
 */
function getBindings(obj) {
    if (!obj.js_bindings_) {
        obj.js_bindings_ = {};
    }
    return obj.js_bindings_;
}

/**
 * @ignore
 */
function addAccessor(obj:BObject, key:string, target:BObject, targetKey:string, noNotify:boolean) {
    getAllAccessors(obj)[key] = <iAccessor>{
        key: targetKey,
        target: target
    };

    if (!noNotify) {
        obj.triggerChanged(key);
    }
}


/**
 * @ignore
 */
var objectID = 0;


export class BObject {

    public _id: number = 0;

    constructor() {
        //this.init.apply(this, ...args);
    }

    //protected init(args:any):void {

    //}

    protected getValue = <t>(key:string):t => {
        var next:any = false
        if (~key.indexOf('.')) {
            var tokens = key.split('.');
            key = tokens.shift();
            next = tokens.join('.');
        }


        var accessor = getAccessor(this, key),
            val;
        if (accessor) {
            val = accessor.target.getValue(accessor.key);
        } else {
            // Call getting function
            if (this['get_' + key]) {
                val = this['get_' + key]();
            } else {
                val = this[key];
            }
        }

        if (next) {
            return val.get(next);
        } else {
            return val;
        }
    }
    protected setValue = <t>(key: string, oldVal: t, value: t, setProp: boolean = false): void => {
        if (oldVal == null) {
            oldVal = this.getValue<t>(key);
        }
        //var oldVal = this.getValue<t>(key);

        if (setProp) {
            this.triggerBeforeChanged(key, oldVal);

            if (this['set_' + key]) {
                this['set_' + key](value);
            } else {
                this[key] = value;
            }
        }

        //if (triggerEvents) {
            var accessor = getAccessor(this, key);
            if (accessor) {
                accessor.target.setValue(accessor.key, oldVal, value, true);
            }

            this.triggerChanged(key, oldVal);
        //}
    }
    //public setValues=(kvp: Array<any>): void=> {
    //    for (var x in kvp) {
    //        if (kvp.hasOwnProperty(x)) {
    //            this.set(x, kvp[x]);
    //        }
    //    }
    //}

    public changed=(key:string)=> {
    }
    private notify = <t>(key: string, oldVal:t):void => {
        var accessor = getAccessor(this, key);
        if (accessor) {
            accessor.target.notify(accessor.key, oldVal);
        }
    }
    protected triggerBeforeChanged = <t>(key: string, oldVal: t): void => {
        events.trigger(this, key.toLowerCase() + '_before_changed', oldVal);
    }
    public triggerChanged = <t>(key: string, oldVal?: t): void => {
        events.trigger(this, key.toLowerCase() + '_changed', oldVal);
    }
    /**
     * Bind the value of a property on this object to that of another object so
     * they always have the same value. Setting the value on either object will update
     * the other too.
     *
     * @param {String} key Name of the property on this object that should be bound
     * @param {BOject} target Object to bind to
     * @param {String} [targetKey=key] Key on the target object to bind to
     * @param {Boolean} [noNotify=false] Set to true to prevent this object's property triggering a 'changed' event when adding the binding
     */
    public bindTo = (key: string, target: BObject, targetKey: string, noNotify: boolean):void => {
        targetKey = targetKey || key;
        var self = this;
        this.unbind(key);

        this[key] = this.getValue(key);


        // When bound property changes, trigger a 'changed' event on this one too
        getBindings(this)[key] = events.addListener(target, targetKey.toLowerCase() + '_changed', (oldVal) => {
            this[key] = this.getValue(key);

            self.triggerChanged(key, oldVal);
        });

        addAccessor(this, key, target, targetKey, noNotify);
    }
    /**
     * Remove binding from a property which set setup using BObject#bindTo.
     *
     * @param {String} key Name of the property on this object to unbind
     */
    public unbind = (key: string): void => {
        var binding = getBindings(this)[key];
        if (!binding) {
            return;
        }

        delete getBindings(this)[key];
        events.removeListener(binding);
        // Grab current value from bound property
        var val = this.getValue(key);
        delete getAllAccessors(this)[key];
        // Set bound value
        this[key] = val;
    }
    /**
     * Remove all bindings on this object
     */
    public unbindAll = (): void => {
        var keys = [],
            bindings = getBindings(this);
        for (var k in bindings) {
            if (bindings.hasOwnProperty(k)) {
                this.unbind(k);
            }
        }
    }
    /**
     * Unique ID for this object
     * @getter id
     * @type Integer
     */
    public get id(): number {
        if (!this._id) {
            this._id = ++objectID;
        }

        return this._id;
    }



}
