import {Component} from "./component";

/**
 * Base class for all views.
 */
export class View extends Component {

    /**
     * Creates new view.
     *
     * @param className Class name for the view's root container.
     */
    constructor(className: string) {
        super(className);
    }

    public show(): void {
        this.componentRoot.style.display = 'block';
        window.scrollTo(0, 0);
    }

    public hide(): void {
        this.componentRoot.style.display = 'none';
    }
}
