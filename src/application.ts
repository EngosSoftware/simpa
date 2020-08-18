/* MIT License
 *
 * Copyright (c) 2016-2020 Dariusz Depta Engos Software
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import {View} from './view';
import {Component} from './component';
import {$id, $uuid} from './utils';

/**
 * Base class for Single Page Application.
 */
export class Application extends Component {

    /** Application's buildNumber number. */
    private readonly _buildNumber: number;

    /** Key name of the entry in sessionStorage where the reloading flag is stored. */
    private readonly _reloadKey: string;

    /** HTML element that is a container for the whole application. */
    private readonly _appContainer: HTMLElement;

    /** Collection of all views defined in application. */
    private readonly _views: View[];

    /**
     * Creates a new application's object.
     *
     * @param build Application's buildNumber number.
     * @param appContainerId Identifier of the HTML element that serves as a container for the whole application.
     * @param className Class name for the application element.
     */
    constructor(build: number, appContainerId: string, className: string) {
        super(className);
        this._buildNumber = build;
        this._reloadKey = 'RELOADED_' + $uuid();
        this._appContainer = $id(appContainerId)!;
        this._views = [];
    }

    /**
     * Returns the application's buildNumber number.
     *
     * @return Application's buildNumber number.
     */
    public get buildNumber(): number {
        return this._buildNumber;
    }

    /**
     * Returns the HTML element that serves as a container for the whole application.
     *
     * @return Application's HTML element being a container for the whole application.
     */
    public get appContainer(): HTMLElement {
        return this._appContainer;
    }

    /**
     * Returns a collection of all views defined for the application.
     *
     * @return Collection of views.
     */
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
        this.appContainer.appendChild(this.componentRoot);
    }

    public doBuildViews(): void {
        this.views.forEach((view) => {
            view.doBuild();
        });
    }

    public doInit(): void {
        super.doInit();
    }

    public doInitViews(): void {
        this.views.forEach((view) => {
            view.doInit();
        });
    }

    public addView(view: View) {
        this.views.push(view);
    }

    public hideViews() {
        this.views.forEach((view) => {
            view.hide();
        });
    }

    /**
     * Starts the application.
     */
    public start() {
        this.doCreate();
        this.doBuild();
        this.doInit();
    }

    /**
     * Reloads the application.
     */
    public reload(): void {
        setTimeout(() => {
            window.location.reload();
        }, 10);
    }
}
