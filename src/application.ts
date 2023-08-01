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

import {View} from './view';
import {Component} from './component';
import {$id, $uuid} from './utils';

/**
 * Base class for Single Page Application.
 */
export class Application extends Component {

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
    constructor(appContainerId: string, className: string) {
        super(className);
        this._reloadKey = 'RELOADED_' + $uuid();
        this._appContainer = $id(appContainerId)!;
        this._views = [];
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
     * Reloads the application unconditionally.
     */
    public reload(): void {
        setTimeout(() => {
            window.location.reload();
        }, 10);
    }

    /**
     * Reloads the application only when it is older than the last
     * version deployed on the server.
     *
     * @param url - URL of the file containing the last version number, usually 'index.html'.
     * @param pattern - Regular expression pattern for retrieving a version number.
     * @param group - Name of the group where the version number is stored when regular expression matches.
     * @param expected - Expected version number, when retrieved value is different then reload the application.
     */
    public reloadWhenNeeded(url: string, pattern: string, group: string, expected: string): void {
        const request = new Request(url);
        fetch(request)
            .then((response) => {
                if (!response.ok) {
                    console.log('Could not fetch: ' + url);
                }
                return response.text();
            })
            .then((response) => {
                let regExp = new RegExp(pattern);
                let matches = regExp.exec(response);
                if (matches) {
                    let groups = matches.groups;
                    if (groups && groups[group]) {
                        let actual = groups[group];
                        if (actual !== expected) {
                            window.location.reload();
                        }
                    }
                }
            })
    }
} 
