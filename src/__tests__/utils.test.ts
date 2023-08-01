/**
 * @jest-environment jsdom
 */

/* MIT License
 *
 * Copyright (c) 2016-2023 Dariusz Depta
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import {
    $DisplayBlock,
    $displayBlock,
    $DisplayFlex,
    $displayFlex,
    $DisplayNone,
    $displayNone,
    $id, $parseInt,
    $uuid,
    gvTouch
} from '../utils';


test('gvTouch', () => {
    expect(gvTouch).toBe(false);
});

test('$uuid', () => {
    assertId($uuid());
});

test('$id', () => {
    document.body.innerHTML = '<div id="a763-dk984-kht874-d4krj" class="div-class-name"></div>';
    let element = $id('a763-dk984-kht874-d4krj');
    expect(element).not.toEqual(null);
    if (element) {
        expect(element.className).toBe('div-class-name');
    }
});

test('$displayNone/Block/Flex', () => {
    document.body.innerHTML = '<div id="2d6f1e19-fb61-4432-ab34-6374adf969d6">DISPLAY-NONE</div>';
    let id = '2d6f1e19-fb61-4432-ab34-6374adf969d6';
    let element = $id(id);
    expect(element).not.toEqual(null);
    if (element) {
        let value = element.style.display;
        expect(value).toBe('');
        $displayBlock(id);
        value = element.style.display;
        expect(value).toBe('block');
        $displayNone(id);
        value = element.style.display;
        expect(value).toBe('none');
        $displayFlex(id);
        value = element.style.display;
        expect(value).toBe('flex');
        $DisplayBlock(element);
        value = element.style.display;
        expect(value).toBe('block');
        $DisplayNone(element);
        value = element.style.display;
        expect(value).toBe('none');
        $DisplayFlex(element);
        value = element.style.display;
        expect(value).toBe('flex');
    }
});

test('$parseInt', () => {
    let n = $parseInt('10', 1);
    expect(n).toEqual(10);
    n = $parseInt('-34', 0);
    expect(n).toEqual(-34);
    n = $parseInt('', -2);
    expect(n).toEqual(-2);
    n = $parseInt(null, 23);
    expect(n).toEqual(23);
    n = $parseInt(undefined, 1);
    expect(n).toEqual(1);
});

export function assertId(id: string) {
    expect(id).toMatch(RegExp('^[a-z0-9]{8}(-[a-z0-9]{4}){3}-[a-z0-9]{12}$'));
}
