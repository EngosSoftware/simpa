/*
 *
 */
import {$DIV, $ELEMENT, $UUID} from "./utils";

/**
 * Base class for all components.
 */
export class Component {

    /** Unique component identifier. */
    private readonly componentId: string;

    /** HTML element that is the root container element for this component. */
    private readonly componentElement: HTMLElement;

    /**
     * Creates new component.
     *
     * @param className Name of the class for this component.
     * @param htmlElementName Name of the HTML element that is the root container element for this component.
     */
    constructor(className: string, htmlElementName?: string) {
        this.componentId = $UUID();
        this.componentElement = htmlElementName ? $ELEMENT(htmlElementName) : $DIV();
        this.componentElement.id = this.componentId;
        this.componentElement.className = className;
    }

    /**
     * Returns the component identifier. Component identifiers are in form of UUID.
     * Component identifiers are unique in terms of UUID.
     *
     * @return Component identifier.
     */
    public getComponentId(): string {
        return this.componentId;
    }

    /**
     * Returns the HTML root container element for this component.
     *
     * @return Root container element for this component.
     */
    public getComponentElement(): HTMLElement {
        return this.componentElement;
    }

    public doInit(): void {
    }

    public doRender(): HTMLElement {
        this.initializeIdentifiers();
        let template = this.getTemplate();
        if (template && template.trim() !== '') {
            this.componentElement.innerHTML = this.replaceIdentifiersInTemplate(template);
        }
        return this.componentElement;
    }

    public doSetFocus(): void {
    }

    protected appendChild(child: HTMLElement) {
        this.componentElement.appendChild(child)
    }

    public getTemplate(): string {
        return '';
    }

    /**
     * Initializes all properties with names ending with 'Id',
     * having type string and with value equal to empty string.
     * Each component property that meets these criteria is
     * initialized with a unique identifier in form of UUID.
     */
    private initializeIdentifiers(): void {
        let c = this;
        for (const key in c) {
            if (c.hasOwnProperty(key) && key.endsWith('Id')) {
                const value = (c as any)[key];
                if (value === '' && (typeof value === 'string')) {
                    (c as any)[key] = $UUID();
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
        let m = template;   // m is the modified template text
        let c = this;       // c is the current component
        for (const key in c) {
            if (c.hasOwnProperty(key) && key.endsWith('Id')) {
                const value = (c as any)[key];  // get the value of identifier
                // replace all instances of id="..."
                const idPattern = RegExp(`id="` + key + `"`, 'g');
                const idReplacement = `id="` + value + `"`;
                m = m.replace(idPattern, idReplacement);
                // replace all instances of for="..."
                const forPattern = RegExp(`for="` + key + `"`, 'g');
                const forReplacement = `for="` + value + `"`;
                m = m.replace(forPattern, forReplacement);
            }
        }
        return m;
    }
}
