import { BObject } from "./libs/bobject";
import { Scene } from "./nodes/Scene";
import { geometry } from "./libs/geometry";
import { Config } from "./Config";
import { EventDispatcher } from "./EventDispatcher";
import { Scheduler } from "./Scheduler";
import { Label } from "./nodes/Label";
import { PreloadScene } from "./nodes/PreloadScene";
import { events } from "./libs/events";
import { util } from "./libs/util";
var ccp = geometry.ccp;
var win = window;
win.requestAnimFrame = (function () {
    return win.requestAnimationFrame ||
        win.webkitRequestAnimationFrame ||
        win.mozRequestAnimationFrame ||
        win.oRequestAnimationFrame ||
        win.msRequestAnimationFrame ||
        function (callback) {
            win.setTimeout(callback, 1000 / 30);
        };
})();
export var Director;
(function (Director_1) {
    class Director extends BObject {
        constructor() {
            super();
            this._backgroundColor = 'rgb(0, 0, 0)';
            this._canvas = null;
            this._context = null;
            this._sceneStack = new Array();
            this._winSize = null;
            this._isPaused = false;
            this._maxFrameRate = 30;
            this._displayFPS = false;
            this._preloadScene = null;
            this._isReady = false;
            // Time delta
            this.dt = 0;
            this._nextDeltaTimeZero = false;
            this._lastUpdate = 0;
            this._nextScene = null;
            this._runningScene = null;
            this._sendCleanupToScene = false;
            this._frames = 0;
            this._accumDt = 0;
            this._stopAnim = false;
            this._showoutlines = false;
        }
        get backgroundColor() {
            return this.getValue("_backgroundColor");
        }
        set backgroundColor(value) {
            this.setValue("_backgroundColor", null, value, true);
        }
        get canvas() {
            return this.getValue("_canvas");
        }
        set canvas(value) {
            this.setValue("_canvas", null, value, true);
        }
        get context() {
            return this.getValue("_context");
        }
        set context(value) {
            this.setValue("_context", null, value, true);
        }
        get sceneStack() {
            return this.getValue("_sceneStack");
        }
        set sceneStack(value) {
            this.setValue("_sceneStack", null, value, true);
        }
        get winSize() {
            return this.getValue("_winSize");
        }
        set winSize(value) {
            this.setValue("_winSize", null, value, true);
        }
        get isPaused() {
            return this.getValue("_isPaused");
        }
        set isPaused(value) {
            this.setValue("_isPaused", null, value, true);
        }
        get maxFrameRate() {
            return this.getValue("_maxFrameRate");
        }
        set maxFrameRate(value) {
            this.setValue("_maxFrameRate", null, value, true);
        }
        get displayFPS() {
            return this.getValue("_displayFPS");
        }
        set displayFPS(value) {
            this.setValue("_displayFPS", null, value, true);
        }
        get preloadScene() {
            return this.getValue("_preloadScene");
        }
        set preloadScene(value) {
            this.setValue("_preloadScene", null, value, true);
        }
        get isReady() {
            return this.getValue("_isReady");
        }
        set isReady(value) {
            this.setValue("_isReady", null, value, true);
        }
        get nextDeltaTimeZero() {
            return this.getValue("_nextDeltaTimeZero");
        }
        set nextDeltaTimeZero(value) {
            this.setValue("_nextDeltaTimeZero", null, value, true);
        }
        get lastUpdate() {
            return this.getValue("_lastUpdate");
        }
        set lastUpdate(value) {
            this.setValue("_lastUpdate", null, value, true);
        }
        /**
     * Append to a HTML element. It will create a canvas tag
     *
     * @param {HTMLElement} view Any HTML element to add the application to
     */
        attachInView(view) {
            if (!view.tagName) {
                throw "Director.attachInView must be given a HTML DOM Node";
            }
            while (view.firstChild) {
                view.removeChild(view.firstChild);
            }
            var canvas = document.createElement('canvas');
            this.canvas = canvas;
            canvas.setAttribute('width', view.clientWidth);
            canvas.setAttribute('height', view.clientHeight);
            var context = canvas.getContext('2d');
            this.context = context;
            if (Config.FLIP_Y_AXIS) {
                context.translate(0, view.clientHeight);
                context.scale(1, -1);
            }
            view.appendChild(canvas);
            this.winSize = new geometry.Size(view.clientWidth, view.clientHeight);
            // Setup event handling
            // Mouse events
            var eventDispatcher = EventDispatcher.sharedDispatcher();
            var mouseDown = (evt) => {
                evt.locationInWindow = ccp(evt.clientX, evt.clientY);
                evt.locationInCanvas = this.convertEventToCanvas(evt);
                console.log("mouseDown.locationInWindow = " + evt.locationInWindow.toString());
                console.log("mouseDown.locationInCanvas = " + evt.locationInCanvas.toString());
                var mouseDragged = (evt) => {
                    evt.locationInWindow = ccp(evt.clientX, evt.clientY);
                    evt.locationInCanvas = this.convertEventToCanvas(evt);
                    console.log("mouseDragged.locationInWindow = " + evt.locationInWindow.toString());
                    console.log("mouseDragged.locationInCanvas = " + evt.locationInCanvas.toString());
                    eventDispatcher.mouseDragged(evt);
                };
                var mouseUp = (evt) => {
                    evt.locationInWindow = ccp(evt.clientX, evt.clientY);
                    evt.locationInCanvas = this.convertEventToCanvas(evt);
                    console.log("mouseUp.locationInWindow = " + evt.locationInWindow.toString());
                    console.log("mouseUp.locationInCanvas = " + evt.locationInCanvas.toString());
                    document.body.removeEventListener('mousemove', mouseDragged, false);
                    document.body.removeEventListener('mouseup', mouseUp, false);
                    eventDispatcher.mouseUp(evt);
                };
                document.body.addEventListener('mousemove', mouseDragged, false);
                document.body.addEventListener('mouseup', mouseUp, false);
                eventDispatcher.mouseDown(evt);
            };
            var mouseMoved = (evt) => {
                evt.locationInWindow = ccp(evt.clientX, evt.clientY);
                evt.locationInCanvas = this.convertEventToCanvas(evt);
                //console.log("mouseMoved.locationInWindow = " + evt.locationInWindow.toString());
                //console.log("mouseMoved.locationInCanvas = " + evt.locationInCanvas.toString());
                eventDispatcher.mouseMoved(evt);
            };
            canvas.addEventListener('mousedown', mouseDown, false);
            canvas.addEventListener('mousemove', mouseMoved, false);
            var touchStart = (evt) => {
                for (var a = 0; a < evt.touches.length; a++) {
                    var t = evt.touches[a];
                    t.locationInWindow = ccp(t.clientX, t.clientY);
                    t.locationInCanvas = this.convertTouchToCanvas(t);
                }
                eventDispatcher.touchStart(evt);
            };
            var touchMove = (evt) => {
                for (var a = 0; a < evt.touches.length; a++) {
                    var t = evt.touches[a];
                    t.locationInWindow = ccp(t.clientX, t.clientY);
                    t.locationInCanvas = this.convertTouchToCanvas(t);
                }
                eventDispatcher.touchMove(evt);
            };
            var touchEnd = (evt) => {
                for (var a = 0; a < evt.touches.length; a++) {
                    var t = evt.touches[a];
                    t.locationInWindow = ccp(t.clientX, t.clientY);
                    t.locationInCanvas = this.convertTouchToCanvas(t);
                }
                eventDispatcher.touchEnd(evt);
            };
            var touchCancel = (evt) => {
                for (var a = 0; a < evt.touches.length; a++) {
                    var t = evt.touches[a];
                    t.locationInWindow = ccp(t.clientX, t.clientY);
                    t.locationInCanvas = this.convertTouchToCanvas(t);
                }
                eventDispatcher.touchCancel(evt);
            };
            canvas.addEventListener("touchstart", touchStart);
            canvas.addEventListener("touchmove", touchMove);
            canvas.addEventListener("touchend", touchEnd);
            canvas.addEventListener("touchcancel", touchCancel);
            // Keyboard events
            var keyDown = (evt) => {
                //this._keysDown = this._keysDown || {};
                eventDispatcher.keyDown(evt);
            };
            var keyUp = (evt) => {
                eventDispatcher.keyUp(evt);
            };
            document.documentElement.addEventListener('keydown', keyDown, false);
            document.documentElement.addEventListener('keyup', keyUp, false);
        }
        runPreloadScene() {
            var preloader = this.preloadScene;
            if (!preloader) {
                preloader = new PreloadScene();
                this.preloadScene = preloader;
            }
            events.addListener(preloader, 'complete', util.callback(this, function (preloader) {
                this.isReady = true;
                events.trigger(this, 'ready', this);
            }));
            this.pushScene(preloader);
            this.startAnimation();
        }
        /**
     * Enters the Director's main loop with the given Scene. Call it to run
     * only your FIRST scene. Don't call it if there is already a running
     * scene.
     *
     * @param {cocos.Scene} scene The scene to start
     */
        runWithScene(scene) {
            if (!(scene instanceof Scene)) {
                throw "Director.runWithScene must be given an instance of Scene";
            }
            if (this._runningScene) {
                throw "You can't run a Scene if another Scene is already running. Use replaceScene or pushScene instead";
            }
            this.pushScene(scene);
            this.startAnimation();
        }
        /**
     * Replaces the running scene with a new one. The running scene is
     * terminated. ONLY call it if there is a running scene.
     *
     * @param {cocos.Scene} scene The scene to replace with
     */
        replaceScene(scene) {
            var index = this.sceneStack.length;
            this._sendCleanupToScene = true;
            this.sceneStack.pop();
            this.sceneStack.push(scene);
            this._nextScene = scene;
        }
        /**
     * Pops out a scene from the queue. This scene will replace the running
     * one. The running scene will be deleted. If there are no more scenes in
     * the stack the execution is terminated. ONLY call it if there is a
     * running scene.
     */
        popScene() {
        }
        /**
     * Suspends the execution of the running scene, pushing it on the stack of
     * suspended scenes. The new scene will be executed. Try to avoid big
     * stacks of pushed scenes to reduce memory allocation. ONLY call it if
     * there is a running scene.
     *
     * @param {cocos.Scene} scene The scene to add to the stack
     */
        pushScene(scene) {
            this._nextScene = scene;
        }
        /**
     * The main loop is triggered again. Call this function only if
     * cocos.Directory#stopAnimation was called earlier.
     */
        startAnimation() {
            this._stopAnim = false;
            this.animate();
        }
        animate() {
            if (this._stopAnim) {
                return;
            }
            this.drawScene();
            win.requestAnimFrame(util.callback(this, 'animate'), this.canvas);
        }
        /**
     * Stops the animation. Nothing will be drawn. The main loop won't be
     * triggered anymore. If you want to pause your animation call
     * cocos.Directory#pause instead.
     */
        stopAnimation() {
            this._stopAnim = true;
            //if (this._animationTimer) {
            //    clearInterval(this._animationTimer);
            //    this._animationTimer = null;
            //}
        }
        /**
     * Calculate time since last call
     * @private
     */
        calculateDeltaTime() {
            var now = (new Date()).getTime() / 1000;
            if (this.nextDeltaTimeZero) {
                this.dt = 0;
                this.nextDeltaTimeZero = false;
            }
            this.dt = Math.max(0, now - this.lastUpdate);
            //if (this.dt > 0.1) {
            //    this.dt = 0.1;
            //}
            //if (this.maxFrameRate > 0) {
            //    var dtMin = 1 / this.maxFrameRate;
            //    if (this.dt < dtMin) {
            //        this.dt = 0;
            //        return;
            //    }
            //}
            this.lastUpdate = now;
        }
        /**
         * The main run loop
         * @private
         */
        drawScene() {
            this.calculateDeltaTime();
            //if (this.dt < 0.00001) {
            //    return;
            //}
            if (!this.isPaused) {
                Scheduler.sharedScheduler().tick(this.dt);
            }
            var context = this.context;
            context.fillStyle = this.backgroundColor;
            context.fillRect(0, 0, this.winSize.width, this.winSize.height);
            //this.canvas.width = this.canvas.width
            if (this._nextScene) {
                this.setNextScene();
            }
            var rect = new geometry.Rect(0, 0, this.winSize.width, this.winSize.height);
            if (rect) {
                context.beginPath();
                context.rect(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
                context.clip();
                context.closePath();
            }
            this._runningScene.visit(context, rect);
            if (Config.SHOW_REDRAW_REGIONS) {
                if (rect) {
                    context.beginPath();
                    context.rect(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
                    context.fillStyle = "rgba(255, 0, 0, 0.5)";
                    //context.fill();
                    context.closePath();
                }
            }
            if (this.displayFPS) {
                this.showFPS();
            }
        }
        /**
     * Initialises the next scene
     * @private
     */
        setNextScene() {
            // TODO transitions
            if (this._runningScene) {
                this._runningScene.onExit();
                if (this._sendCleanupToScene) {
                    this._runningScene.cleanup();
                }
            }
            this._runningScene = this._nextScene;
            this._nextScene = null;
            this._runningScene.onEnter();
        }
        convertTouchToCanvas(evt) {
            var x = this.canvas.offsetLeft - document.documentElement.scrollLeft, y = this.canvas.offsetTop - document.documentElement.scrollTop;
            var o = this.canvas;
            while ((o = o.offsetParent)) {
                x += o.offsetLeft - o.scrollLeft;
                y += o.offsetTop - o.scrollTop;
            }
            var p = geometry.ccpSub(evt.locationInWindow, ccp(x, y));
            if (Config.FLIP_Y_AXIS) {
                p.y = this.canvas.height - p.y;
            }
            return p;
        }
        convertEventToCanvas(evt) {
            var x = this.canvas.offsetLeft - document.documentElement.scrollLeft, y = this.canvas.offsetTop - document.documentElement.scrollTop;
            var o = this.canvas;
            while ((o = o.offsetParent)) {
                x += o.offsetLeft - o.scrollLeft;
                y += o.offsetTop - o.scrollTop;
            }
            var p = geometry.ccpSub(evt.locationInWindow, ccp(x, y));
            if (Config.FLIP_Y_AXIS) {
                p.y = this.canvas.height - p.y;
            }
            return p;
        }
        showFPS() {
            if (!this._fpsLabel) {
                this._fpsLabel = new Label("", undefined, undefined, 16);
                this._fpsLabel.anchorPoint = ccp(0, 1);
                this._frames = 0;
                this._accumDt = 0;
            }
            this._frames++;
            this._accumDt += this.dt;
            if (this._accumDt > 1.0 / 3.0) {
                var frameRate = this._frames / this._accumDt;
                this._frames = 0;
                this._accumDt = 0;
                this._fpsLabel.string = 'FPS: ' + (Math.round(frameRate * 100) / 100).toString();
            }
            var s = this.winSize;
            this._fpsLabel.position = ccp(10, s.height - 10);
            this._fpsLabel.visit(this.context);
        }
    }
    Director_1.Director = Director;
    var _instance = null;
    function sharedDirector() {
        if (!_instance) {
            _instance = new Director();
        }
        return _instance;
    }
    Director_1.sharedDirector = sharedDirector;
})(Director || (Director = {}));
//# sourceMappingURL=Director.js.map