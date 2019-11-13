import {$ID, $UUID, gvTouch} from "../utils";

test('gvTouch', () => {
    expect(gvTouch).toBe(false);
});

test('$UUID', () => {
    assertId($UUID())
});

test('$ID', () => {
    document.body.innerHTML = '<div id="a763-dk984-kht874-d4krj" class="div-class-name"></div>';
    let elDiv = $ID("a763-dk984-kht874-d4krj");
    expect(elDiv).not.toEqual(null);
    if (elDiv) {
        expect(elDiv.className).toBe("div-class-name");
    }
});

export function assertId(id: string) {
    expect(id).toMatch(RegExp('^[a-z0-9]{8}(-[a-z0-9]{4}){3}-[a-z0-9]{12}$'))
}