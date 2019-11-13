import {assertId} from "./utils.test";
import View from "../view";

test('view()', () => {
    let view = new View();
    expect(view).not.toEqual(null);
    let viewId = view.getViewId();
    assertId(viewId);
});