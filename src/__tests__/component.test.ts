import {Component} from "../component";
import {assertId} from "./utils.test";

test('component()', () => {
    let c = new Component("component-class-name");
    expect(c).not.toEqual(null);
    let componentId = c.getComponentId();
    assertId(componentId);
    let componentElement = c.getComponentElement();
    assertId(componentElement.id);
    expect(componentElement.id).toBe(componentId);
    c.doRender();
    expect(componentElement.id).toBe(componentId)
});

test('component.render()', () => {

    class Child extends Component {
        private childId: string = '';

        public getChildId(): string {
            return this.childId;
        }
    }

    let c = new Child("child-class-name");
    expect(c.getChildId()).toBe('');
    c.doRender();
    assertId(c.getChildId())
});