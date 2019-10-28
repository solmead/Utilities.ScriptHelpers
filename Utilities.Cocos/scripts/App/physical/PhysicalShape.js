import { BObject } from "../../Cocos2d/libs/bobject";
import { b2FixtureDef, b2CircleShape } from "../../Box2D/Box2D";
export class PhysicalShape extends BObject {
    //get mass(): number {
    //    if (!this.fixture) {
    //        return 0;
    //    }
    //    return this.fixture.GetMassData().mass;
    //}
    constructor(_density = 1, _friction = 0.5, _restitution = 0.9) {
        super();
        this._density = _density;
        this._friction = _friction;
        this._restitution = _restitution;
        this._fixDef = null;
        this._fixture = null;
        this._parent = null;
        this._mass = null;
        this._charge = null;
    }
    get fixDef() {
        return this.getValue("_fixDef");
    }
    set fixDef(value) {
        this.setValue("_fixDef", null, value, true);
    }
    get fixture() {
        return this.getValue("_fixture");
    }
    set fixture(value) {
        this.setValue("_fixture", null, value, true);
    }
    get parent() {
        return this.getValue("_parent");
    }
    set parent(value) {
        this.setValue("_parent", null, value, true);
        this._updateParent();
    }
    get density() {
        return this.getValue("_density");
    }
    set density(value) {
        this.setValue("_density", null, value, true);
        this._updateFixture();
    }
    get friction() {
        return this.getValue("_friction");
    }
    set friction(value) {
        this.setValue("_friction", null, value, true);
        this._updateFixture();
    }
    get restitution() {
        return this.getValue("_restitution");
    }
    set restitution(value) {
        this.setValue("_restitution", null, value, true);
        this._updateFixture();
    }
    get mass() {
        return this.getValue("_mass");
    }
    set mass(value) {
        this.setValue("_mass", null, value, true);
        if (this.fixture) {
            this._density = this.fixture.GetDensityFromMass(value);
        }
        this._updateFixture();
    }
    get charge() {
        return this.getValue("_charge");
    }
    set charge(value) {
        this.setValue("_charge", null, value, true);
    }
    getShape() {
        return new b2CircleShape(Math.random() + 0.1);
    }
    _updateParent() {
    }
    //get physicalScaling(): number {
    //    if (parent == null) {
    //        return 1; //30;
    //    }
    //    return this.parent.physicalScaling;
    //}
    _updateFixture() {
        if (this.fixture != null) {
            this.fixture.SetDensity(this.density);
            this.fixture.SetFriction(this.friction);
            this.fixture.SetRestitution(this.restitution);
            this._mass = this.fixture.GetMassData().mass;
        }
        else {
            this.setupFixtureDef();
        }
    }
    draw(ctx) {
    }
    applyFixture(body) {
        if (this.parent == null) {
            return;
        }
        this.fixture = null;
        this.setupFixtureDef();
        this.fixture = body.CreateFixture(this.fixDef);
        this.fixture.GetMassData().center;
        this.mass = this.fixture.GetMassData().mass;
    }
    setupFixtureDef() {
        if (this.parent == null) {
            return;
        }
        this.fixDef = new b2FixtureDef();
        this.fixDef.density = this.density;
        this.fixDef.friction = this.friction;
        this.fixDef.restitution = this.restitution;
        this.fixDef.shape = this.getShape();
    }
}
//# sourceMappingURL=PhysicalShape.js.map