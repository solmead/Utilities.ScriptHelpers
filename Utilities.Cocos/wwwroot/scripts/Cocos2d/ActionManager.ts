import { BObject } from "./libs/bobject";
import { Scheduler } from "./Scheduler";
import { Action } from "./actions/Action";
import { Node } from "./nodes/Node";
import { util } from "./libs/util";






export module ActionManager {

    export class ActionEntry {

        public actions: Array<Action> = new Array<Action>();
        public currentAction: Action = null;
        public currentActionSalvaged: boolean = false;

        constructor(public target:Node, public paused:boolean = false) {

        }
    }



    export class ActionManager extends BObject {

        protected _targets: Array<ActionEntry> = null;
        get targets(): Array<ActionEntry> {
            return this.getValue("_targets");
        }
        set targets(value: Array<ActionEntry>) {
            this.setValue("_targets", null, value, true);
        }
        protected _currentTarget: ActionEntry = null;
        get currentTarget(): ActionEntry {
            return this.getValue("_currentTarget");
        }
        set currentTarget(value: ActionEntry) {
            this.setValue("_currentTarget", null, value, true);
        }
        protected _currentTargetSalvaged:boolean = false;
        get currentTargetSalvaged(): boolean {
            return this.getValue("_currentTargetSalvaged");
        }
        set currentTargetSalvaged(value: boolean) {
            this.setValue("_currentTargetSalvaged", null, value, true);
        }



        constructor() {
            super();
            Scheduler.sharedScheduler().scheduleUpdate(new Scheduler.ScheduleOptions(this, null, 1, false, 0));
            this.targets = [];

        }

        /**
     * Adds an action with a target. If the target is already present, then the
     * action will be added to the existing target. If the target is not
     * present, a new instance of this target will be created either paused or
     * paused, and the action will be added to the newly created target. When
     * the target is paused, the queued actions won't be 'ticked'.
     *
     * @opt {cocos.nodes.Node} target Node to run the action on
     */
        public addAction = (target: Node, action: Action, paused:boolean = false): void => {

            var targetID = target.id;
            var element = this.targets[targetID];

            if (!element) {
                element = new ActionEntry(target, paused);
                this.targets[targetID] = element;
            }

            element.actions.push(action);

            action.startWithTarget(target);
        }

        /**
     * Remove an action
     *
     * @param {cocos.actions.Action} action Action to remove
     */
        public removeAction = (action: Action): void => {
            var targetID = action.originalTarget.id,
                element = this.targets[targetID];

            if (!element) {
                return;
            }

            var actionIndex = element.actions.indexOf(action);

            if (actionIndex == -1) {
                return;
            }

            if (this.currentTarget == element) {
                element.currentActionSalvaged = true;
            }

            element.actions[actionIndex] = null;
            element.actions.splice(actionIndex, 1); // Delete array item

            if (element.actions.length === 0) {
                if (this.currentTarget == element) {
                    this.currentTargetSalvaged = true;
                }
            }

        }


        /**
     * Fetch an action belonging to a cocos.nodes.Node
     *
     * @returns {cocos.actions.Action}
     *
     * @opts {cocos.nodes.Node} target Target of the action
     * @opts {String} tag Tag of the action
     */
        public getActionFromTarget = (target: Node, tag: string): Action => {
            var tag = tag,
                targetID = target.id;

            var element = this.targets[targetID];
            if (!element) {
                return null;
            }
            for (var i = 0; i < element.actions.length; i++) {
                if (element.actions[i] &&
                    (element.actions[i].tag === tag)) {
                    return element.actions[i];
                }
            }
            // Not found
            return null;
        }

        /**
     * Remove all actions for a cocos.nodes.Node
     *
     * @param {cocos.nodes.Node} target Node to remove all actions for
     */
        public removeAllActionsFromTarget = (target: Node): void => {
            var targetID = target.id;

            var element = this.targets[targetID];
            if (!element) {
                return;
            }
            // Delete everything in array but don't replace it incase something else has a reference
            element.actions.splice(0, element.actions.length);
        }


        /**
         * @private
         */
        private update = (dt: number): void => {
            util.each(this.targets, (currentTarget:ActionEntry, i:number)=> {

                if (!currentTarget) {
                    return;
                }
                this.currentTarget = currentTarget;

                if (!currentTarget.paused) {
                    util.each(currentTarget.actions,  (currentAction:Action, j:number)=> {
                        if (!currentAction) {
                            return;
                        }

                        currentTarget.currentAction = currentAction;
                        currentTarget.currentActionSalvaged = false;

                        currentTarget.currentAction.step(dt);

                        if (currentTarget.currentAction.isDone) {
                            currentTarget.currentAction.stop();

                            var a = currentTarget.currentAction;
                            currentTarget.currentAction = null;
                            this.removeAction(a);
                        }

                        currentTarget.currentAction = null;

                    });
                }

                if (this.currentTargetSalvaged && currentTarget.actions.length === 0) {
                    this.targets[i] = null;
                    delete this.targets[i];
                }
            });
        }



        public pauseTarget = (target: Node): void => {

        }

        public resumeTarget = (target: Node): void => {
            // TODO
        }




    }






    var _instance: ActionManager = null;

    export function sharedManager(): ActionManager {
        if (!_instance) {
            _instance = new ActionManager();
        }

        return _instance;
    }
}