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

import {$createDiv, $createElement, $uuid} from './utils';

/**
 * Base class for all components.
 */
export class Component {

    /**
     * Unique component identifier, initialized during component construction.
     */
    private readonly _componentId: string;

    /**
     * HTML element that is the root element for a component.
     */
    private readonly _componentRoot: HTMLElement;

    /**
     * Creates a new component.
     *
     * @param className Name of the class for styling the root element of the component.
     * @param tagName Name of the HTML tag that is the root element for this component.
     */
    constructor(className: string, tagName?: string) {
        this._componentId = $uuid();
        this._componentRoot = tagName ? $createElement(tagName) : $createDiv();
        this._componentRoot.id = this._componentId;
        this._componentRoot.className = className;
    }

    /**
     * Returns the identifier of the component.
     *
     * @return Component identifier.
     */
    get componentId(): string {
        return this._componentId;
    }

    /**
     * Returns the HTML root element for this component.
     *
     * @return Root element for this component.
     */
    get componentRoot(): HTMLElement {
        return this._componentRoot;
    }

    /**
     * Creates the content of this component basing on the template.
     */
    public doCreate(): void {
        this.initializeIdentifiers();
        let template = this.doTemplate();
        if (template && template.trim() !== '') {
            this._componentRoot.innerHTML = this.replaceIdentifiersInTemplate(template);
        }
    }

    /**
     * Builds the DOM structure for this component.
     * Derived classes should buildNumber the DOM structure for
     * the whole content that constitutes the component.
     *
     * @return HTML element that is the root of the component.
     */
    public doBuild(): void {
    }

    /**
     * Initializes the component.
     * Derived classes may process additional initialization
     * in this method which is called when the DOM tree
     * is already fully constructed.
     */
    public doInit(): void {
    }

    /**
     * Prepares the HTML template for a component.
     * Derived classes may override this method
     * to prepare custom HTML template.
     *
     * @return HTML template for a component.
     */
    public doTemplate(): string {
        return '';
    }

    /**
     * Utility method for adding child elements to the root element of this component.
     *
     * @param child Child HTML element.
     */
    protected appendChild(child: HTMLElement) {
        this._componentRoot.appendChild(child)
    }

    /**
     * Initializes all properties with names ending with 'Id',
     * having type string and value equal to empty string.
     * Each component property that meets these criteria is
     * initialized with a unique identifier in form of UUID.
     */
    private initializeIdentifiers(): void {
        let c = this;
        for (const key in c) {
            if (c.hasOwnProperty(key) && key.endsWith('Id')) {
                const value = (c as any)[key];
                if (value === '' && (typeof value === 'string')) {
                    (c as any)[key] = $uuid();
                }
            }
        }
    }

    /**
     * Modifies HTML template for this component.
     * All identifier names that appear in 'id=' or 'for=' attributes
     * will be replaced with values assigned to component's properties with the name
     * defined in this attribute.
     * Only component properties with names ending with 'Id' are taken into consideration.
     *
     * Example:
     *
     * If there is <div> element defined in HTML template:
     *
     *   <div id="componentId">Hello<div>
     *
     * then it's value will be replaced with UUID assigned to property named 'componentId':
     *
     *   <div id="03cbcaa8-017f-47fc-a602-e6e34941c193">Hello<div>
     *
     * @param template Modified HTML template.
     */
    private replaceIdentifiersInTemplate(template: string): string {
        let t = template;
        const c = this;
        for (const key in c) {
            if (c.hasOwnProperty(key) && key.endsWith('Id')) {
                const value = (c as any)[key];

                // Do replaces in NOT minimized HTML

                // replace all instances of id="(value)"
                const idPattern = RegExp(`id="` + key + `"`, 'g');
                const idReplacement = `id="` + value + `"`;
                t = t.replace(idPattern, idReplacement);
                // replace all instances of for="(value)"
                const forPattern = RegExp(`for="` + key + `"`, 'g');
                const forReplacement = `for="` + value + `"`;
                t = t.replace(forPattern, forReplacement);

                // Do replaces in minimized HTML (attribute quotes are removed)

                // replace all instances of id=(value)
                const idPatternMinimized = RegExp(`id=` + key, 'g');
                const idReplacementMinimized = `id=` + value;
                t = t.replace(idPatternMinimized, idReplacementMinimized);
                // replace all instances of for=(value)
                const forPatternMinimized = RegExp(`for=` + key, 'g');
                const forReplacementMinimized = `for=` + value;
                t = t.replace(forPatternMinimized, forReplacementMinimized);
            }
        }
        return t;
    }
}
