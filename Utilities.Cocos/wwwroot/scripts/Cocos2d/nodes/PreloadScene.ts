import { Scene } from "./Scene";
import { Label } from "./Label";
import { Director } from "../Director";
import { geometry } from "../libs/geometry";
import { ProgressBar } from "./ProgressBar";
import { events } from "../libs/events";
import { Preloader } from "../jah/Preloader";
import { remoteresources } from "../jah/remote_resources";



export class PreloadScene extends Scene {


    protected _progressBar: ProgressBar = null;
    get progressBar(): ProgressBar {
        return this.getValue("_progressBar");
    }
    set progressBar(value: ProgressBar) {
        this.setValue("_progressBar", null, value, true);
    }
    protected _label: Label = null;
    get label(): Label {
        return this.getValue("_label");
    }
    set label(value: Label) {
        this.setValue("_label", null, value, true);
    }

    protected _preloader: Preloader = null;
    get preloader(): Preloader {
        return this.getValue("_preloader");
    }
    set preloader(value: Preloader) {
        this.setValue("_preloader", null, value, true);
    }
    protected _isReady: boolean = false;
    get isReady(): boolean {
        return this.getValue("_isReady");
    }
    set isReady(value: boolean) {
        this.setValue("_isReady", null, value, true);
    }
    protected _emptyImage: remoteresources.Resource = null;
    get emptyImage(): remoteresources.Resource {
        return this.getValue("_emptyImage");
    }
    set emptyImage(value: remoteresources.Resource) {
        this.setValue("_emptyImage", null, value, true);
    }
    protected _fullImage: remoteresources.Resource = null;;
    get fullImage(): remoteresources.Resource {
        return this.getValue("_fullImage");
    }
    set fullImage(value: remoteresources.Resource) {
        this.setValue("_fullImage", null, value, true);
    }






    constructor() {
        super();


        this.emptyImage = remoteresources.addResource("./assets/resources/progress-bar-empty.png", "image/png", true);
        this.fullImage = remoteresources.addResource("./assets/resources/progress-bar-full.png", "image/png", true);


        var size = Director.sharedDirector().winSize;
        // Setup 'please wait' label
        var label = new Label('Please wait...', 'Helvetica', '#ffffff', 14);
        label.position = new geometry.Point(size.width / 2, (size.height / 2) + 32);
        this.label = label;
        this.addChild(label);

        // Setup preloader
        var preloader = new Preloader();    // The main preloader
        preloader.addEverythingToQueue()
        this.preloader = preloader;

        // Listen for preload events
        events.addListener(preloader, 'load', (preloader:Preloader, uri:string)=> {
            var loaded = preloader.loaded,
                count = preloader.count;
            events.trigger(this, 'load', preloader, uri);
        });

        events.addListener(preloader, 'complete', (preloader: Preloader)=> {
            events.trigger(this, 'complete', preloader);
        });




        // Preloader for the loading screen resources
        var loadingPreloader = new Preloader([this.emptyImage.url, this.fullImage.url])

        // When loading screen resources have loaded then draw them
        events.addListener(loadingPreloader, 'complete', (preloader:Preloader)=> {
            this.createProgressBar();
            if (this.isRunning) {
                this.preloader.load();
            }

            this.isReady = true;
        });

        loadingPreloader.load()
    }
    public createProgressBar(): void {
        var preloader = this.preloader,
            size = Director.sharedDirector().winSize;

        var progressBar = new ProgressBar(
            this.emptyImage,
            this.fullImage
        );

        progressBar.position = new geometry.Point(size.width / 2, size.height / 2);

        this.progressBar = progressBar;
        this.addChild(progressBar);

        events.addListener(preloader, 'load', (preloader:Preloader) => {
            progressBar.maxValue = preloader.count;
            progressBar.value = preloader.loaded;
        });
    }
}