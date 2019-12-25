import {$DELETE_CHILDREN, $NEW_DIV, $UUID} from "./utils";

/**
 * Base class for all views.
 */
export default class View {

    /** Unique view identifier. */
    protected readonly viewId: string;

    /** Root container for the view. */
    protected viewElement: HTMLElement;

    /** Body container for ths view. */
    protected viewBody: HTMLElement;

    /**
     * Creates new view.
     *
     * @param viewClassName Optional class name for the view's root container.
     * @param bodyClassName Optional name for the view's body.
     */
    constructor(viewClassName?: string, bodyClassName?: string) {
        this.viewId = $UUID();
        this.viewElement = $NEW_DIV();
        this.viewElement.id = this.viewId;
        if (viewClassName) {
            this.viewElement.className = viewClassName;
        }
        this.viewBody = $NEW_DIV();
        this.viewBody.id = $UUID();
        if (bodyClassName) {
            this.viewBody.className = bodyClassName;
        }
    }


    /**
     * Returns view's identifier.
     *
     * @return View's identifier.
     */
    public getViewId(): string {
        return this.viewId;
    }

    public doInit(): void {
    }

    public doShow(): void {
        this.viewElement.style.display = 'block';
        window.scrollTo(0, 0);
    }

    public doHide(): void {
        this.viewElement.style.display = 'none';
    }

    public doRender(): HTMLElement {
        return this.viewElement;
    }

    protected appendChild(child: HTMLElement): void {
        this.viewElement.appendChild(child)
    }

    protected appendBody(): void {
        this.viewElement.appendChild(this.viewBody)
    }

    protected replaceBody(content: HTMLElement): void {
        $DELETE_CHILDREN(this.viewBody);
        this.viewBody.appendChild(content);
    }
}
