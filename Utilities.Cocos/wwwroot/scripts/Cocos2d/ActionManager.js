import { BObject } from "./libs/bobject";
import { Scheduler } from "./Scheduler";
import { util } from "./libs/util";
export var ActionManager;
(function (ActionManager_1) {
    class ActionEntry {
        constructor(target, paused = false) {
            this.target = target;
            this.paused = paused;
            this.actions = new Array();
            this.currentAction = null;
            this.currentActionSalvaged = false;
        }
    }
    ActionManager_1.ActionEntry = ActionEntry;
    class ActionManager extends BObject {
        constructor() {
            super();
            this._targets = null;
            this._currentTarget = null;
            this._currentTargetSalvaged = false;
            /**
         * Adds an action with a target. If the target is already present, then the
         * action will be added to the existing target. If the target is not
         * present, a new instance of this target will be created either paused or
         * paused, and the action will be added to the newly created target. When
         * the target is paused, the queued actions won't be 'ticked'.
         *
         * @opt {cocos.nodes.Node} target Node to run the action on
         */
            this.addAction = (target, action, paused = false) => {
                var targetID = target.id;
                var element = this.targets[targetID];
                if (!element) {
                    element = new ActionEntry(target, paused);
                    this.targets[targetID] = element;
                }
                element.actions.push(action);
                action.startWithTarget(target);
            };
            /**
         * Remove an action
         *
         * @param {cocos.actions.Action} action Action to remove
         */
            this.removeAction = (action) => {
                var targetID = action.originalTarget.id, element = this.targets[targetID];
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
            };
            /**
         * Fetch an action belonging to a cocos.nodes.Node
         *
         * @returns {cocos.actions.Action}
         *
         * @opts {cocos.nodes.Node} target Target of the action
         * @opts {String} tag Tag of the action
         */
            this.getActionFromTarget = (target, tag) => {
                var tag = tag, targetID = target.id;
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
            };
            /**
         * Remove all actions for a cocos.nodes.Node
         *
         * @param {cocos.nodes.Node} target Node to remove all actions for
         */
            this.removeAllActionsFromTarget = (target) => {
                var targetID = target.id;
                var element = this.targets[targetID];
                if (!element) {
                    return;
                }
                // Delete everything in array but don't replace it incase something else has a reference
                element.actions.splice(0, element.actions.length);
            };
            /**
             * @private
             */
            this.update = (dt) => {
                util.each(this.targets, (currentTarget, i) => {
                    if (!currentTarget) {
                        return;
                    }
                    this.currentTarget = currentTarget;
                    if (!currentTarget.paused) {
                        util.each(currentTarget.actions, (currentAction, j) => {
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
            };
            this.pauseTarget = (target) => {
            };
            this.resumeTarget = (target) => {
                // TODO
            };
            Scheduler.sharedScheduler().scheduleUpdate(new Scheduler.ScheduleOptions(this, null, 1, false, 0));
            this.targets = [];
        }
        get targets() {
            return this.getValue("_targets");
        }
        set targets(value) {
            this.setValue("_targets", null, value, true);
        }
        get currentTarget() {
            return this.getValue("_currentTarget");
        }
        set currentTarget(value) {
            this.setValue("_currentTarget", null, value, true);
        }
        get currentTargetSalvaged() {
            return this.getValue("_currentTargetSalvaged");
        }
        set currentTargetSalvaged(value) {
            this.setValue("_currentTargetSalvaged", null, value, true);
        }
    }
    ActionManager_1.ActionManager = ActionManager;
    var _instance = null;
    function sharedManager() {
        if (!_instance) {
            _instance = new ActionManager();
        }
        return _instance;
    }
    ActionManager_1.sharedManager = sharedManager;
})(ActionManager || (ActionManager = {}));
//# sourceMappingURL=ActionManager.js.map