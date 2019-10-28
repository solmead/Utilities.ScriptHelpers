import { Scene } from "./Scene";
import { Label } from "./Label";
import { Director } from "../Director";
import { geometry } from "../libs/geometry";
import { ProgressBar } from "./ProgressBar";
import { events } from "../libs/events";
import { Preloader } from "../jah/Preloader";
import { remoteresources } from "../jah/remote_resources";
export class PreloadScene extends Scene {
    constructor() {
        super();
        this._progressBar = null;
        this._label = null;
        this._preloader = null;
        this._isReady = false;
        this._emptyImage = null;
        this._fullImage = null;
        this.emptyImage = remoteresources.addResource("/assets/resources/progress-bar-empty.png", "image/png", true);
        this.fullImage = remoteresources.addResource("/assets/resources/progress-bar-full.png", "image/png", true);
        var size = Director.sharedDirector().winSize;
        // Setup 'please wait' label
        var label = new Label('Please wait...', 'Helvetica', '#ffffff', 14);
        label.position = new geometry.Point(size.width / 2, (size.height / 2) + 32);
        this.label = label;
        this.addChild(label);
        // Setup preloader
        var preloader = new Preloader(); // The main preloader
        preloader.addEverythingToQueue();
        this.preloader = preloader;
        // Listen for preload events
        events.addListener(preloader, 'load', (preloader, uri) => {
            var loaded = preloader.loaded, count = preloader.count;
            events.trigger(this, 'load', preloader, uri);
        });
        events.addListener(preloader, 'complete', (preloader) => {
            events.trigger(this, 'complete', preloader);
        });
        // Preloader for the loading screen resources
        var loadingPreloader = new Preloader([this.emptyImage.url, this.fullImage.url]);
        // When loading screen resources have loaded then draw them
        events.addListener(loadingPreloader, 'complete', (preloader) => {
            this.createProgressBar();
            if (this.isRunning) {
                this.preloader.load();
            }
            this.isReady = true;
        });
        loadingPreloader.load();
    }
    get progressBar() {
        return this.getValue("_progressBar");
    }
    set progressBar(value) {
        this.setValue("_progressBar", null, value, true);
    }
    get label() {
        return this.getValue("_label");
    }
    set label(value) {
        this.setValue("_label", null, value, true);
    }
    get preloader() {
        return this.getValue("_preloader");
    }
    set preloader(value) {
        this.setValue("_preloader", null, value, true);
    }
    get isReady() {
        return this.getValue("_isReady");
    }
    set isReady(value) {
        this.setValue("_isReady", null, value, true);
    }
    get emptyImage() {
        return this.getValue("_emptyImage");
    }
    set emptyImage(value) {
        this.setValue("_emptyImage", null, value, true);
    }
    ;
    get fullImage() {
        return this.getValue("_fullImage");
    }
    set fullImage(value) {
        this.setValue("_fullImage", null, value, true);
    }
    createProgressBar() {
        var preloader = this.preloader, size = Director.sharedDirector().winSize;
        var progressBar = new ProgressBar(this.emptyImage, this.fullImage);
        progressBar.position = new geometry.Point(size.width / 2, size.height / 2);
        this.progressBar = progressBar;
        this.addChild(progressBar);
        events.addListener(preloader, 'load', (preloader) => {
            progressBar.maxValue = preloader.count;
            progressBar.value = preloader.loaded;
        });
    }
}
//# sourceMappingURL=PreloadScene.js.map