import { BObject } from "./libs/bobject";
import { util } from "./libs/util";


export module Scheduler {

    class HashUpdateEntry {

        //public timers: Array<Timer> = new Array<Timer>();
        //public timerIndex:number = 0;
        //public currentTimer:Timer = null;
        //public currentTimerSalvaged:boolean = false;
        //;

        constructor(public target: BObject = null, public priority: number = 0, public paused: boolean = false) {

        }
    }

    class HashMethodEntry {

        public timers: Array<Timer> = new Array<Timer>();
        public timerIndex: number = 0;
        public currentTimer:Timer = null;
        public currentTimerSalvaged:boolean = false;
        public paused: boolean = false;
        public target: BObject = null;

        constructor() {

        }
    }



    export class Timer extends BObject {

        //protected _callback: (elapsed:number) => void = null;
        get callback(): (elapsed: number) => void {
            return this.getValue("_callback");
        }
        set callback(value: (elapsed: number) => void) {
            this.setValue("_callback", null, value, true);
        }
        //protected _interval: number = 0;
        get interval(): number {
            return this.getValue("_interval");
        }
        set interval(value: number) {
            this.setValue("_interval", null, value, true);
        }
        protected _elapsed: number = -1;
        get elapsed(): number {
            return this.getValue("_elapsed");
        }
        set elapsed(value: number) {
            this.setValue("_elapsed", null, value, true);
        }

        constructor(protected _callback: (elapsed: number) => void, protected _interval: number) {
            super();
            this.interval = this.interval || 0;
            this.elapsed = -1;
        }



        public update(dt): void {
            if (this.elapsed == -1) {
                this.elapsed = 0;
            } else {
                this.elapsed += dt;
            }

            if (this.elapsed >= this.interval) {
                this.callback(this.elapsed);
                this.elapsed = 0;
            }
        }
    }

    export class ScheduleOptions {
        constructor(public target: BObject, public method: ((...args: any[]) => void) | string, public interval: number = 1, public paused: boolean = false, public priority:number = 1) {

        }
    }


    export class Scheduler extends BObject {

        protected _updates0: Array<HashUpdateEntry> = null;
        get updates0(): Array<HashUpdateEntry> {
            return this.getValue("_updates0");
        }
        set updates0(value: Array<HashUpdateEntry>) {
            this.setValue("_updates0", null, value, true);
        }
        protected _updatesNeg: Array<HashUpdateEntry> = null;
        get updatesNeg(): Array<HashUpdateEntry> {
            return this.getValue("_updatesNeg");
        }
        set updatesNeg(value: Array<HashUpdateEntry>) {
            this.setValue("_updatesNeg", null, value, true);
        }
        protected _updatesPos: Array<HashUpdateEntry> = null;
        get updatesPos(): Array<HashUpdateEntry> {
            return this.getValue("_updatesPos");
        }
        set updatesPos(value: Array<HashUpdateEntry>) {
            this.setValue("_updatesPos", null, value, true);
        }
        protected _hashForUpdates: any = null;
        get hashForUpdates(): any {
            return this.getValue("_hashForUpdates");
        }
        set hashForUpdates(value: any) {
            this.setValue("_hashForUpdates", null, value, true);
        }
        protected _hashForMethods: any = null;
        get hashForMethods(): any {
            return this.getValue("_hashForMethods");
        }
        set hashForMethods(value: any) {
            this.setValue("_hashForMethods", null, value, true);
        }
        protected _timeScale: number = 1.0;
        get timeScale(): number {
            return this.getValue("_timeScale");
        }
        set timeScale(value: number) {
            this.setValue("_timeScale", null, value, true);
        }

        constructor() {
            super();
            this.updates0 = [];
            this.updatesNeg = [];
            this.updatesPos = [];
            this.hashForUpdates = {};
            this.hashForMethods = {};
        }

        //ScheduleOptions

    /**
     * The scheduled method will be called every 'interval' seconds.
     * If paused is YES, then it won't be called until it is resumed.
     * If 'interval' is 0, it will be called every frame, but if so, it recommened to use 'scheduleUpdateForTarget:' instead.
     * If the selector is already scheduled, then only the interval parameter will be updated without re-scheduling it again.
     */
        public schedule = (opts: ScheduleOptions):void => {
            var target = opts.target,
                method = opts.method,
                interval = opts.interval,
                paused = opts.paused || false;

            var element: HashMethodEntry = this.hashForMethods[target.id];

            if (!element) {
                element = new HashMethodEntry();
                this.hashForMethods[target.id] = element;
                element.target = target;
                element.paused = paused;
            } else if (element.paused != paused) {
                throw "cocos.Scheduler. Trying to schedule a method with a pause value different than the target";
            }

            var timer = new Timer(util.callback(target, method), interval);
            element.timers.push(timer);
        }



        /**
         * Schedules the 'update' selector for a given target with a given priority.
         * The 'update' selector will be called every frame.
         * The lower the priority, the earlier it is called.
         */
        public scheduleUpdate = (opts: ScheduleOptions): void => {
            var target = opts.target,
                priority = opts.priority,
                paused = opts.paused;

            var i, len;
            var entry = new HashUpdateEntry(target, priority, paused);
            var added = false;

            if (priority === 0) {
                this.updates0.push(entry);
            } else if (priority < 0) {
                for (i = 0, len = this.updatesNeg.length; i < len; i++) {
                    if (priority < this.updatesNeg[i].priority) {
                        this.updatesNeg.splice(i, 0, entry);
                        added = true;
                        break;
                    }
                }

                if (!added) {
                    this.updatesNeg.push(entry);
                }
            } else /* priority > 0 */ {
                for (i = 0, len = this.updatesPos.length; i < len; i++) {
                    if (priority < this.updatesPos[i].priority) {
                        this.updatesPos.splice(i, 0, entry);
                        added = true;
                        break;
                    }
                }

                if (!added) {
                    this.updatesPos.push(entry);
                }
            }

            this.hashForUpdates[target.id] = entry;
        }


        /**
         * 'tick' the scheduler.
         * You should NEVER call this method, unless you know what you are doing.
         */
        public tick = (dt: number): void => {
            var i, len, x;
            if (this.timeScale != 1.0) {
                dt *= this.timeScale;
            }

            var entry: HashUpdateEntry;
            for (i = 0, len = this.updatesNeg.length; i < len; i++) {
                entry = this.updatesNeg[i];
                if (entry && !entry.paused) {
                    (<any>entry.target).update(dt);
                }
            }

            for (i = 0, len = this.updates0.length; i < len; i++) {
                entry = this.updates0[i];
                if (entry && !entry.paused) {
                    (<any>entry.target).update(dt);
                }
            }

            for (i = 0, len = this.updatesPos.length; i < len; i++) {
                entry = this.updatesPos[i];
                if (entry && !entry.paused) {
                    (<any>entry.target).update(dt);
                }
            }
            var entry2: HashMethodEntry;
            for (x in this.hashForMethods) {
                if (this.hashForMethods.hasOwnProperty(x)) {
                    entry2 = this.hashForMethods[x];

                    if (entry2) {
                        for (i = 0, len = entry2.timers.length; i < len; i++) {
                            var timer = entry2.timers[i];
                            if (timer) {
                                timer.update(dt);
                            }
                        }
                    }
                }
            }

        }


        /**
     * Unshedules a selector for a given target.
     * If you want to unschedule the "update", use unscheduleUpdateForTarget.
     */
        public unschedule = (opts: ScheduleOptions):void => {
            if (!opts.target || !opts.method) {
                return;
            }
            var element = <HashMethodEntry>this.hashForMethods[opts.target.id];
            if (element) {
                for (var i = 0; i < element.timers.length; i++) {
                    // Compare callback function
                    if (element.timers[i].callback == util.callback(opts.target, opts.method)) {
                        var timer = element.timers.splice(i, 1);
                        timer = null;
                    }
                }
            }
        }

        /**
         * Unschedules the update selector for a given target
         */
        public unscheduleUpdateForTarget = (target:BObject):void => {
            if (!target) {
                return;
            }
            var id = target.id,
                elementUpdate = <HashUpdateEntry>this.hashForUpdates[id];
            if (elementUpdate) {
                // Remove from updates list
                if (elementUpdate.priority === 0) {
                    this.updates0.splice(this.updates0.indexOf(elementUpdate), 1);
                } else if (elementUpdate.priority < 0) {
                    this.updatesNeg.splice(this.updatesNeg.indexOf(elementUpdate), 1);
                } else /* priority > 0 */ {
                    this.updatesPos.splice(this.updatesPos.indexOf(elementUpdate), 1);
                }
            }
            // Release HashMethodEntry object
            this.hashForUpdates[id] = null;
        }
        /**
     * Unschedules all selectors from all targets.
     * You should NEVER call this method, unless you know what you are doing.
     */
        public unscheduleAllSelectors = (): void => {
            var i: number, x:any, entry: HashMethodEntry, len:number;

            // Custom selectors
            for (x in this.hashForMethods) {
                if (this.hashForMethods.hasOwnProperty(x)) {
                    entry = this.hashForMethods[x];
                    this.unscheduleAllSelectorsForTarget(entry.target);
                }
            }
            var entry2: HashUpdateEntry;
            // Updates selectors
            for (i = 0, len = this.updatesNeg.length; i < len; i++) {
                entry2 = this.updatesNeg[i];
                if (entry) {
                    this.unscheduleUpdateForTarget(entry2.target);
                }
            }

            for (i = 0, len = this.updates0.length; i < len; i++) {
                entry2 = this.updates0[i];
                if (entry) {
                    this.unscheduleUpdateForTarget(entry2.target);
                }
            }

            for (i = 0, len = this.updatesPos.length; i < len; i++) {
                entry2 = this.updatesPos[i];
                if (entry) {
                    this.unscheduleUpdateForTarget(entry2.target);
                }
            }
        }


        /**
         * Unschedules all selectors for a given target.
         * This also includes the "update" selector.
         */
        public unscheduleAllSelectorsForTarget = (target:BObject): void => {
            if (!target) {
                return;
            }
            // Custom selector
            var element = <HashMethodEntry>this.hashForMethods[target.id];
            if (element) {
                element.paused = true;
                element.timers = []; // Clear all timers
            }
            // Release HashMethodEntry object
            this.hashForMethods[target.id] = null;

            // Update selector
            this.unscheduleUpdateForTarget(target);
        }
        /**
     * Pauses the target.
     * All scheduled selectors/update for a given target won't be 'ticked' until the target is resumed.
     * If the target is not present, nothing happens.
     */

        public pauseTarget = (target: BObject): void => {
            var element = <HashMethodEntry>this.hashForMethods[target.id];
            if (element) {
                element.paused = true;
            }

            var elementUpdate = <HashUpdateEntry>this.hashForUpdates[target.id];
            if (elementUpdate) {
                elementUpdate.paused = true;
            }
        }
        /**
     * Resumes the target.
     * The 'target' will be unpaused, so all schedule selectors/update will be 'ticked' again.
     * If the target is not present, nothing happens.
     */

        public resumeTarget = (target: BObject): void => {
            var element = <HashMethodEntry>this.hashForMethods[target.id];
            if (element) {
                element.paused = false;
            }

            var elementUpdate = <HashUpdateEntry>this.hashForUpdates[target.id];
            //console.log('foo', target.get('id'), elementUpdate);
            if (elementUpdate) {
                elementUpdate.paused = false;
            }
        }









    }


    var _instance: Scheduler = null;

    export function sharedScheduler(): Scheduler {
        if (!_instance) {
            _instance = new Scheduler();
        }

        return _instance;
    }


}