import {assertId} from "./utils.test";
import {View} from "../view";

test('view()', () => {
    let view = new View("view-class");
    expect(view).not.toEqual(null);
    let viewId = view.componentId;
    assertId(viewId);
});
