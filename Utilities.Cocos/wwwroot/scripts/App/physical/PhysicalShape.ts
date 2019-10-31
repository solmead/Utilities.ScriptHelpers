import { BObject } from "../../Cocos2d/libs/bobject";
import { events } from "../../Cocos2d/libs/events";
import { util } from "../../Cocos2d/libs/util";
import { PhysicalNode } from "./PhysicalNode";
import { b2FixtureDef, b2Fixture, b2Shape, b2CircleShape, b2Body, b2MassData } from "../../Box2D/Box2D";
import { geometry } from "../../Cocos2d/libs/geometry";






export class PhysicalShape extends BObject {

    protected _fixDef: b2FixtureDef = null;
    get fixDef(): b2FixtureDef {
        return this.getValue("_fixDef");
    }
    set fixDef(value: b2FixtureDef) {
        this.setValue("_fixDef", null, value, true);
    }
    protected _fixture: b2Fixture = null;
    get fixture(): b2Fixture {
        return this.getValue("_fixture");
    }
    set fixture(value: b2Fixture) {
        this.setValue("_fixture", null, value, true);
    }
    protected _parent: PhysicalNode = null;
    get parent(): PhysicalNode {
        return this.getValue("_parent");
    }
    set parent(value: PhysicalNode) {
        this.setValue("_parent", null, value, true);
        this._updateParent();
    }


    get density(): number {
        return this.getValue("_density");
    }
    set density(value: number) {
        this.setValue("_density", null, value, true);
        this._updateFixture();
    }
    get friction(): number {
        return this.getValue("_friction");
    }
    set friction(value: number) {
        this.setValue("_friction", null, value, true);
        this._updateFixture();
    }
    get restitution(): number {
        return this.getValue("_restitution");
    }
    set restitution(value: number) {
        this.setValue("_restitution", null, value, true);
        this._updateFixture();
    }
    protected _massData: b2MassData = null;
    get massData(): b2MassData {
        return this.getValue("_massData");
    }
    set massData(value: b2MassData) {
        this._mass = value.mass;
        this.setValue("_massData", null, value, true);
    }
    protected _mass: number = 0;
    get mass(): number {
        return this._mass;
    }
    get centerOfMass(): geometry.Point {
        return this.massData.center.Point();
    }
    set mass(value: number) {
        this.setValue("_mass", null, value, true);
        if (this.fixture) {
            this._density = this.fixture.GetDensityFromMass(value);
        }
        this._updateFixture();
    }
    protected _charge: number = null;
    get charge(): number {
        return this.getValue("_charge");
    }
    set charge(value: number) {
        this.setValue("_charge", null, value, true);
    }
    //get mass(): number {
    //    if (!this.fixture) {
    //        return 0;
    //    }
    //    return this.fixture.GetMassData().mass;
    //}

    constructor(protected _density: number = 1, protected _friction: number = 0.5, protected _restitution: number = 0.9) {
        super();
    }
    public getShape(): b2Shape {
        return new b2CircleShape(Math.random() + 0.1);
    }
    public _updateParent():void {

    }
    //get physicalScaling(): number {
    //    if (parent == null) {
    //        return 1; //30;
    //    }
    //    return this.parent.physicalScaling;
    //}
    public _updateFixture(): any {
        if (this.fixture != null) {
            this.fixture.SetDensity(this.density);
            this.fixture.SetFriction(this.friction);
            this.fixture.SetRestitution(this.restitution);
            this.massData = this.fixture.GetMassData();
            //this._mass = this.fixture.GetMassData().mass;
        } else {
            this.setupFixtureDef();
        }
    }
    public draw(ctx:CanvasRenderingContext2D): void {

    }
    public applyFixture(body: b2Body): void {

        if (this.parent == null) {
            return;
        }
        this.fixture = null;
        this.setupFixtureDef();
        this.fixture = body.CreateFixture(this.fixDef);
        this.fixture.GetMassData().center
        this.mass = this.fixture.GetMassData().mass;

    }
    public setupFixtureDef(): void {
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