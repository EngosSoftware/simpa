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
import {$fetch, $id, $parseInt, $uuid} from './utils';

/**
 * Base class for Single Page Application.
 */
export class Application extends Component {

    /** Application's build number. */
    private readonly _build: number;

    /** Key name of the entry in sessionStorage where the reloading flag is stored. */
    private readonly _reloadKey: string;

    /** HTML element that is a container for the whole application. */
    private readonly _appContainer: HTMLElement;

    /** Collection of all views defined in application. */
    private readonly _views: View[];

    /**
     * Creates a new application's object.
     *
     * @param build Application's build number.
     * @param appContainerId Identifier of the HTML element that serves as a container for the whole application.
     * @param className Class name for the application element.
     */
    constructor(build: number, appContainerId: string, className: string) {
        super(className);
        this._build = build;
        this._reloadKey = 'RELOADED_' + $uuid();
        this._appContainer = $id(appContainerId)!;
        this._views = [];
    }

    /**
     * Returns the application's build number.
     *
     * @return Application's build number.
     */
    public get build(): number {
        return this._build;
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
     * Starts the application. Reloads the whole application when there is a newer version available.
     * Compared applications' versions are integer numbers. Actual application's version (build number)
     * is passed to the application's constructor. If there is a newer version available,
     * the endpoint pointed by <em>getBuildNumberURL</em> returns a number (as a string)
     * that is greater than the current application's version.
     * When application is restarted in the browser, the new version number is fetched
     * and compared with current application's version. If the application version is older
     * then application is fully reloaded. This process is repeated only once for each restart,
     * to prevent an infinite reloading loop when the fetched build number is less than
     * the application's build number.
     */
    public start() {
        const RELOADED = 'YES';
        const uri = this.getBuildNumberURL();
        if (uri) {
            const reloaded = sessionStorage.getItem(this._reloadKey);
            if (reloaded !== RELOADED) {
                $fetch(encodeURI(uri), {
                    method: 'POST',
                    cache: 'no-cache',
                    credentials: 'omit',
                    redirect: 'follow',
                    referrer: 'no-referrer',
                    body: null,
                }).then(response => {
                    if (response.ok) {
                        return response.text();
                    } else {
                        return Promise.reject(response);
                    }
                }).then(response => {
                    const newBuildNumber = $parseInt(response, 0);
                    if (newBuildNumber > this.build) {
                        sessionStorage.setItem(this._reloadKey, RELOADED);
                        location.reload();
                    }
                }).catch(_ => {
                    // ignore errors
                });
            } else {
                sessionStorage.removeItem(this._reloadKey);
            }
        }
        this.doCreate();
        this.doBuild();
        this.doInit();
    }

    /**
     * Returns an URL of the backend service that returns applications build number.
     * Build numbers are used to automatically reload application when new version is deployed
     * on the server. Single Page Applications are cached by browsers and to be sure that
     * the last available version is loaded, the build number is retrieved from the backend service.
     * When there is no back-end service available then <em>null</em> value should be returned.
     */
    protected getBuildNumberURL(): string | null {
        return null;
    }
}
