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

import {Component} from "./component";
import {$DeleteChildren} from "./utils";

/**
 * Base class for all views.
 */
export class View extends Component {

    /**
     * Creates a new view component.
     *
     * @param className Name of the style of the view's root container.
     */
    constructor(className: string) {
        super(className);
    }

    /**
     * Makes the view visible and scrolls to the top of the view
     */
    public show(): void {
        this.componentRoot.style.display = 'block';
        window.scrollTo(0, 0);
    }

    /**
     * Makes the view invisible.
     */
    public hide(): void {
        this.componentRoot.style.display = 'none';
    }

    /**
     * Replaces the body of the view with new content.
     *
     * @param content New content of the view.
     */
    public replaceBody(content: HTMLElement) {
        $DeleteChildren(this.componentRoot);
        this.componentRoot.appendChild(content);
    }
}
