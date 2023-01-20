import * as pc from "playcanvas";
import { attribute, createScript, ScriptTypeBase } from "./decorators";
import { Example } from "./example";

/**
 * @category Example
 * @description This is another example class that will be compiled to PC script.
 */
@createScript('anotherExample')
export class AnotherExample extends ScriptTypeBase {
    /** This is example of boolean property that will be compiled to PC attribute. */
    @attribute({ type: 'boolean', default: true }) public someBool?: boolean;

    public override initialize() {
        super.initialize && super.initialize();
        console.log(this.someBool);
        console.log(pc.math.RAD_TO_DEG);
    }

    public override postInitialize(): void {
        super.postInitialize && super.postInitialize();
        console.log(Example.Instance().someEntity);
        console.log(Example.Instance().someVector);
    }
}
