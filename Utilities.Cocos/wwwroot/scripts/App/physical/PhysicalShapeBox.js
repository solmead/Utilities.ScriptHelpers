import { PhysicalShapePolygon } from "./PhysicalShapePolygon";
import { geometry } from "../../Cocos2d/libs/geometry";
export class PhysicalShapeBox extends PhysicalShapePolygon {
    constructor(_fixedRect = null, _density = 1, _friction = 0.5, _restitution = 0.9) {
        super(null, _density, _friction, _restitution);
        this._fixedRect = _fixedRect;
        this._rectSet = false;
        if (_fixedRect) {
            this.rectSet = true;
            this.fixedRect = _fixedRect;
        }
    }
    get fixedRect() {
        return this.getValue("_fixedRect");
    }
    set fixedRect(value) {
        this.setValue("_fixedRect", null, value, true);
        this._updateFixedRect();
    }
    get rectSet() {
        return this.getValue("_rectSet");
    }
    set rectSet(value) {
        this.setValue("_rectSet", null, value, true);
    }
    _updateParent() {
        this._updateFixedRect();
    }
    _updateFixedRect() {
        if (!this.rectSet) {
            var w = this.parent.contentSize.width;
            var h = this.parent.contentSize.height;
            var off = this.parent.anchorPointInPixels;
            var rect = geometry.rectMake(-off.x, -off.y, w, h);
            for (var i = 0; i < this.parent.children.length; i++) {
                var node = this.parent.children[i];
                var nodeRect = node.boundingBox;
                rect = geometry.rectUnion(rect, nodeRect);
            }
            this._fixedRect = rect;
        }
        this.addVertex(geometry.ccp(this.fixedRect.origin.x, this.fixedRect.origin.y));
        this.addVertex(geometry.ccp(this.fixedRect.origin.x + this.fixedRect.size.width, this.fixedRect.origin.y));
        this.addVertex(geometry.ccp(this.fixedRect.origin.x + this.fixedRect.size.width, this.fixedRect.origin.y + this.fixedRect.size.height));
        this.addVertex(geometry.ccp(this.fixedRect.origin.x, this.fixedRect.origin.y + this.fixedRect.size.height));
        if (this.parent != null) {
            this.parent.setupBody();
        }
    }
}
//# sourceMappingURL=PhysicalShapeBox.js.map