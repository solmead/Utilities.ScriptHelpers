import { Node } from "./Cocos2d/nodes/Node";
import { Director } from "./Cocos2d/Director";
import { Scene } from "./Cocos2d/nodes/Scene";







function sayHello() {

    var n = new Node();
    var s = new Scene();
    s.addChild(n);
    //Director.sharedDirector()

    const compiler = (document.getElementById("compiler") as HTMLInputElement).value;
    const framework = (document.getElementById("framework") as HTMLInputElement).value;
    return `Hello from ${compiler} and ${framework}!`;
}