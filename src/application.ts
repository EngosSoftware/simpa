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

import {View} from "./view";
import {Component} from "./component";
import {$id} from "./utils";

/**
 * Base class for all applications.
 */
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

    /**
     * Starts the application.
     */
    public start() {
        this.doCreate();
        this.doBuild();
        this.doInit();
    }
}
