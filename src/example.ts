import * as pc from "playcanvas";
import { attribute, createScript, ScriptTypeBase } from "./decorators";

/**
 * @category Example
 * @description This is example class that will be compiled to PC script.
 */
@createScript('example')
export class Example extends ScriptTypeBase {
    /** Private instance of the example class. */
    private static instance: Example;

    /** Public getter for {@link Example.instance instance} property. */
    public static Instance(): Example {
        return Example.instance;
    }

    /** This is example of entity property that will be compiled to PC attribute. */
    @attribute({ type: 'entity' }) public someEntity?: pc.Entity;
    /** This is example of vec2 property that will be compiled to PC attribute. */
    @attribute({ type: 'vec2', default: [1280, 720] }) public someVector?: pc.Vec2;

    public override initialize() {
        if (Example.instance) return;
        Example.instance = this;

        super.initialize && super.initialize();
        console.log(pc.math.RAD_TO_DEG);
        console.log(this.someEntity);
    }

    public override postInitialize(): void {
        if (Example.instance !== this) return;

        super.postInitialize && super.postInitialize();
        console.log(this.someVector);
    }
}
