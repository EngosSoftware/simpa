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
