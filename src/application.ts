/**
 * Base class for all applications.
 */
import {$ID} from "./utils";
import {View} from "./view";

export class Application {

    private readonly _appElement: HTMLElement;
    private readonly _views: View[];

    constructor(appId: string, appClassName: string) {
        this._appElement = $ID(appId)!;
        this._appElement.className = appClassName;
        this._views = [];
    }

    public doCreate(): void {
        this._views.forEach((view) => {
            view.doCreate();
        });
    }

    public doRender(): void {
        this._views.forEach((view) => {
            this._appElement.appendChild(view.componentRoot);
            view.doBuild();
        });
    }

    public doInit(): void {
        this._views.forEach((view) => {
            view.doInit();
        });
    }

    public addView(view: View) {
        this._views.push(view);
    }

    public hideAllViews() {
        this._views.forEach((view) => {
            view.hide();
        })
    }
}
