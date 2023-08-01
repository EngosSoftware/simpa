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

abstract class InputField {

    /** HTML input element */
    protected inputElement: HTMLInputElement;

    protected constructor(inputElementId: string) {
        this.inputElement = document.getElementById(inputElementId) as HTMLInputElement;
    }

    public get enabled(): boolean {
        return !this.inputElement.disabled;
    }

    public set enabled(enabled: boolean) {
        this.inputElement.disabled = !enabled;
    }

    public get readOnly(): boolean {
        return this.inputElement.readOnly;
    }

    public set readOnly(readOnly: boolean) {
        this.inputElement.readOnly = readOnly;
    }

    public get required(): boolean {
        return this.inputElement.required;
    }

    public set required(required: boolean) {
        this.inputElement.required = required;
    }

    public clear(): void {
        this.inputElement.value = '';
    }

    public focus(): void {
        this.inputElement.focus();
    }

    public select(): void {
        this.inputElement.select();
    }

    public focusAndSelect(): void {
        this.focus();
        this.select();
    }

    public validate(): boolean {
        return this.inputElement.checkValidity();
    }
}

export class TextField extends InputField {

    constructor(inputElementId: string) {
        super(inputElementId);
    }

    get value(): string {
        return this.inputElement.value;
    }

    set value(value: string) {
        this.inputElement.value = value;
    }
}

export class PasswordField extends TextField {

    constructor(inputElementId: string) {
        super(inputElementId);
    }
}
