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

export class JsonApiError {
    public code: string | null;
    public detail: string | null;

    constructor() {
        this.code = null;
        this.detail = null;
    }
}

export interface IJsonApiInitCallback {
    (): void;
}

export interface IJsonApiDataCallback {
    (data: Object): void;
}

export interface IJsonApiErrorCallback {
    (response: Response): void;
}

export interface IJsonApiErrorsCallback {
    (errors: JsonApiError[]): void;
}

export interface IJsonApiFailureCallback {
    (reason: any): void;
}

export interface IJsonApiFinalCallback {
    (): void;
}

export abstract class JsonApiService {

    protected abstract getAuthHeader(): string;

    protected GET(body: any): RequestInit {
        return JsonApiService.prepare('GET', body, this.getAuthHeader());
    }

    protected POST(body: any): RequestInit {
        return JsonApiService.prepare('POST', body, this.getAuthHeader());
    }

    protected PUT(body: any): RequestInit {
        return JsonApiService.prepare('PUT', body, this.getAuthHeader());
    }

    protected DELETE(body: any): RequestInit {
        return JsonApiService.prepare('DELETE', body, this.getAuthHeader());
    }

    protected call(uri: string,
                   init: RequestInit,
                   initCallback: IJsonApiInitCallback,
                   dataCallback: IJsonApiDataCallback,
                   errorCallback: IJsonApiErrorCallback,
                   errorsCallback: IJsonApiErrorsCallback,
                   failureCallback: IJsonApiFailureCallback,
                   finalCallback: IJsonApiFinalCallback): void {
        initCallback();
        fetch(encodeURI(uri), init)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject(response);
                }
            })
            .then(response => {
                if (response.data) {
                    dataCallback(response.data);
                }
                if (response.errors) {
                    errorsCallback(response.errors);
                }
            })
            .catch(reason => {
                if (reason instanceof Response) {
                    errorCallback(reason);
                } else {
                    failureCallback(reason);
                }
            })
            .finally(() => {
                finalCallback();
            });
    }

    private static prepare(method: string, body: any, authHeader: string): RequestInit {
        let requestInit = {} as RequestInit;
        let headers: [string, string][] = [];
        requestInit.method = method;
        requestInit.cache = 'no-cache';
        requestInit.credentials = 'omit';
        requestInit.redirect = 'follow';
        requestInit.referrer = 'no-referrer';
        if (authHeader) {
            headers.push(['Authorization', authHeader]);
        }
        if (body) {
            let payload = JSON.stringify(body);
            requestInit.body = payload;
            headers.push(['Content-Type', 'application/json']);
            headers.push(['Content-Length', payload.length.toString()]);
        }
        if (headers.length > 0) {
            requestInit.headers = headers;
        }
        return requestInit;
    }
}
