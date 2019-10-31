import { Director } from "./Cocos2d/Director";
import { events } from "./Cocos2d/libs/events";
import { MainScene } from "./App/MainScene";
import { Tasks } from "./SysLibs/Tasks";
async function main() {
    await Tasks.whenReady();
    await Tasks.delay(100);
    var addToElement = $("#cocos2d-app");
    var director = Director.sharedDirector();
    //director.maxFrameRate = 30;
    //director._showoutlines = true;
    director.attachInView(addToElement.get(0));
    director.displayFPS = true;
    events.addListener(director, 'ready', (director) => {
        //var mainScene = new Scene1();
        var mainScene = new MainScene();
        director.replaceScene(mainScene);
    });
    // Preload our assets
    director.runPreloadScene();
}
main();
//setTimeout(() => {
//    main(document.getElementById());
//}, 100);
//function sayHello() {
//    var n = new Node();
//    var s = new Scene();
//    s.addChild(n);
//    //Director.sharedDirector()
//    const compiler = (document.getElementById("compiler") as HTMLInputElement).value;
//    const framework = (document.getElementById("framework") as HTMLInputElement).value;
//    return `Hello from ${compiler} and ${framework}!`;
//}
//# sourceMappingURL=app.js.map