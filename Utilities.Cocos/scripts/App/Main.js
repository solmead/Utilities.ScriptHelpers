import { Director } from "../Cocos2d/Director";
import { events } from "../Cocos2d/libs/events";
import { remoteresources } from "../Cocos2d/jah/remote_resources";
import { GameLayer } from "./Game/GameScene";
import { Scene } from "../Cocos2d/nodes/Scene";
var Resource = remoteresources.Resource;
export async function main() {
    //await Tasks.whenReady();
    //await Tasks.delay(100);
    //remoteresources.addResource("/assets/ball.png", "image/png", true);
    var director = Director.sharedDirector();
    //director.maxFrameRate = 30;
    //director._showoutlines = true;
    director.attachInView(document.getElementById('cocos2d-app'));
    director.displayFPS = true;
    events.addListener(director, 'ready', (director) => {
        //var mainScene = new Scene1();
        var mainScene = new Scene();
        var layer = new GameLayer();
        //var layer = new Layer();
        mainScene.addChild(layer);
        //var sprite = Sprite.CreateFromFile("/assets/ball.png");
        //layer.addChild(sprite);
        director.replaceScene(mainScene);
    });
    // Preload our assets
    director.runPreloadScene();
}
setTimeout(() => {
    main();
}, 100);
//# sourceMappingURL=Main.js.map