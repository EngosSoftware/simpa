import {Component} from "./component";
import {$DELETE_CHILDREN} from "./utils";

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
        $DELETE_CHILDREN(this.componentRoot);
        this.componentRoot.appendChild(content);
    }
}
