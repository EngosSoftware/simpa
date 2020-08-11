/**
 * Base class for all applications.
 */
import {View} from "./view";
import {Component} from "./component";
import {$id} from "./utils";

export class Application extends Component {

    private readonly _appElement: HTMLElement;
    private readonly _views: View[];

    constructor(appId: string, className: string) {
        super(className);
        this._appElement = $id(appId)!;
        this._views = [];
    }

    public get views(): View[] {
        return this._views;
    }

    public doCreate(): void {
        super.doCreate();
    }

    public doCreateViews(): void {
        this._views.forEach((view) => {
            view.doCreate();
        });
    }

    public doBuild(): void {
        super.doBuild();
        this._appElement.appendChild(this.componentRoot);
    }

    public doBuildViews(): void {
        this._views.forEach((view) => {
            view.doBuild();
        });
    }

    public doInit(): void {
        super.doInit();
    }

    public doInitViews(): void {
        this._views.forEach((view) => {
            view.doInit();
        });
    }

    public addView(view: View) {
        this._views.push(view);
    }

    public hideViews() {
        this._views.forEach((view) => {
            view.hide();
        })
    }
}
