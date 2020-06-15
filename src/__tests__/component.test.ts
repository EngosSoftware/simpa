import {Component} from "../component";
import {assertId} from "./utils.test";

test('component()', () => {
    let c = new Component("component-class-name");
    expect(c).not.toEqual(null);
    let componentId = c.componentId;
    assertId(componentId);
    let componentElement = c.componentRoot;
    assertId(componentElement.id);
    expect(componentElement.id).toBe(componentId);
    c.doCreate();
    expect(componentElement.id).toBe(componentId);
});

test('component.render()', () => {

    class Child extends Component {
        private _childId = '';
        private _otherId = 'other_id';

        get childId(): string {
            return this._childId;
        }

        get otherId(): string {
            return this._otherId;
        }
    }

    let c = new Child("child-class-name");
    expect(c.childId).toBe('');
    expect(c.otherId).toBe('other_id');
    c.doCreate();
    assertId(c.childId)
    expect(c.otherId).toBe('other_id');
});
