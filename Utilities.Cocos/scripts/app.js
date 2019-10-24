import { Node } from "./Cocos2d/nodes/Node";
import { Scene } from "./Cocos2d/nodes/Scene";
function sayHello() {
    var n = new Node();
    var s = new Scene();
    s.addChild(n);
    //Director.sharedDirector()
    const compiler = document.getElementById("compiler").value;
    const framework = document.getElementById("framework").value;
    return `Hello from ${compiler} and ${framework}!`;
}
//# sourceMappingURL=app.js.map