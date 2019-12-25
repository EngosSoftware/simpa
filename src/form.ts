import {Component} from "./component";

export class Form extends Component {

    private _onValueChange: () => void;

    constructor(className: string, htmlElementName?: string) {
        super(className, htmlElementName);
        this._onValueChange = () => {
        };
    }

    get onValueChange(): () => void {
        return this._onValueChange;
    }

    set onValueChange(value: () => void) {
        this._onValueChange = value;
    }

    protected doValueChange(): void {
        if (this._onValueChange) {
            this._onValueChange();
        }
    }
}