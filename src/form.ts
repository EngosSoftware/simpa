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

export class Form extends Component {

    private _onValueChange: () => void;

    constructor(className: string, htmlElementName?: string) {
        super(className, htmlElementName);
        this._onValueChange = () => {
        };
    }

    get onValueChange(): () => void {
        return this._onValueChange;
    }

    set onValueChange(value: () => void) {
        this._onValueChange = value;
    }

    protected doValueChange(): void {
        if (this._onValueChange) {
            this._onValueChange();
        }
    }
}
