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

const UUID = require('uuid-js');
const marked = require('marked');

/**
 * Global flag indicating if the touch functionality is enabled.
 */
export const gvTouch = ('ontouchstart' in window);

/**
 * Global type for UUID identifiers.
 */
type identifier = string;

/**
 * Generates unique identifier.
 *
 * @return Unique an identifier in form of UUID.
 */
export function $uuid(): string {
    return UUID.create().toString();
}

/**
 * Returns an HTML element with specified identifier.
 *
 * @param id Identifier of the HTML element in document.
 * @return HTML element with specified identifier or null when not found in DOM.
 */
export function $id(id: identifier): HTMLElement | null {
    return document.getElementById(id);
}

/**
 * Returns HTML element with specified identifier and casts to HTMLDivElement.
 * This function is an equivalent of calling:
 * <pre>
 *     document.getElementById(id) as HTMLDivElement
 * </pre>
 *
 * @param id Identifier of HTML DIV element in document.
 * @return HTML DIV element with specified identifier or null.
 */
export function $htmlDiv(id: identifier): HTMLDivElement | null {
    const e = $id(id);
    return e ? e as HTMLDivElement : null;
}

/**
 * Returns HTML element with specified identifier and casts to HTMLPreElement.
 * This function is an equivalent of calling:
 * <pre>
 *     document.getElementById(id) as HTMLPreElement
 * </pre>
 *
 * @param id Identifier of HTML PRE element in document.
 * @return HTML PRE element with specified identifier or null.
 */
export function $htmlPre(id: identifier): HTMLPreElement | null {
    const e = $id(id);
    return e ? e as HTMLPreElement : null;
}

/**
 * Returns HTML element with specified identifier and casts to HTMLImageElement.
 * This function is an equivalent of calling:
 * <pre>
 *     document.getElementById(id) as HTMLImageElement
 * </pre>
 *
 * @param id Identifier of HTML IMG element in document.
 * @return HTML IMG element with specified identifier or null.
 */
export function $htmlImage(id: identifier): HTMLImageElement | null {
    const e = $id(id);
    return e ? e as HTMLImageElement : null;
}

/**
 * Creates HTML element from specified HTML tag name.
 *
 * @return Newly created HTML element.
 */
export function $createElement(tag: string): HTMLElement {
    return document.createElement(tag);
}

/**
 * Creates HTML DIV element.
 *
 * @return Newly created HTML DIV element.
 */
export function $createDiv(): HTMLDivElement {
    return document.createElement('div');
}

/**
 * Registers a 'touch' event for the element with specified identifier.
 * This function always registers an 'mouseup' event handler,
 * and for touch screens additionally registers an 'touchend' event handler.
 *
 * @param id Identifier of the element for which the event handler will be registered.
 * @param h Event handler to be registered for the element with specified identifier.
 */
export function $touch(id: identifier, h: () => void): void {
    $Touch($id(id), h);
}

/**
 * Registers a 'touch' event for the specified element.
 * This function always registers an 'mouseup' event handler,
 * and for touch screens additionally registers an 'touchend' event handler.
 *
 * @param e Element for which the event handler will be registered.
 * @param h Event handler to be registered for the specified element.
 */
export function $Touch(e: HTMLElement | null, h: () => void): void {
    if (e) {
        if (gvTouch) {
            e.addEventListener('touchend', h);
        }
        e.addEventListener('mouseup', h);
    } else {
        throwElementNotAssigned('$Touch');
    }
}

/**
 *
 */
export function $handleInput(id: identifier, h: () => void): void {
    $HandleInput($id(id), h);
}

/**
 *
 */
export function $HandleInput(e: HTMLElement | null, h: () => void): void {
    if (e) {
        e.addEventListener('input', h);
    } else {
        throwElementNotAssigned('$HandleInput');
    }
}

/**
 *
 */
export function $handleMouseDown(id: identifier, h: (me: MouseEvent) => void): void {
    $HandleMouseDown($id(id), h);
}

/**
 *
 */
export function $HandleMouseDown(e: HTMLElement | null, h: (me: MouseEvent) => void): void {
    if (e) {
        e.addEventListener('mousedown', h);
    } else {
        throwElementNotAssigned('$HandleMouseDown');
    }
}

/**
 *
 */
export function $handleMouseUp(id: identifier, h: () => void): void {
    $HandleMouseUp($id(id), h);
}

/**
 *
 */
export function $HandleMouseUp(e: HTMLElement | null, h: (me: MouseEvent) => void): void {
    if (e) {
        e.addEventListener('mouseup', h);
    } else {
        throwElementNotAssigned('$HandleMouseUp');
    }
}

/**
 *
 */
export function $handleMouseMove(id: identifier, h: (me: MouseEvent) => void): void {
    $HandleMouseMove($id(id), h);
}

/**
 *
 */
export function $HandleMouseMove(e: HTMLElement | null, h: (me: MouseEvent) => void): void {
    if (e) {
        e.addEventListener('mousemove', h);
    } else {
        throwElementNotAssigned('$HandleMouseMove');
    }
}

/**
 *
 */
export function $handleMouseLeave(id: identifier, h: (me: MouseEvent) => void): void {
    $HandleMouseLeave($id(id), h);
}

/**
 *
 */
export function $HandleMouseLeave(e: HTMLElement | null, h: (me: MouseEvent) => void): void {
    if (e) {
        e.addEventListener('mouseleave', h);
    } else {
        throwElementNotAssigned('$HandleMouseLeave');
    }
}

/**
 *
 */
export function $handleKeyDown(id: identifier, h: (ke: KeyboardEvent) => void): void {
    $HandleKeyDown($id(id), h);
}

/**
 *
 */
export function $HandleKeyDown(e: HTMLElement | null, h: (ke: KeyboardEvent) => void): void {
    if (e) {
        e.addEventListener('keydown', h);
    } else {
        throwElementNotAssigned('$HandleKeyDown');
    }
}

/**
 *
 */
export function $handleKeyUp(id: identifier, h: (event: KeyboardEvent) => void): void {
    $HandleKeyUp($id(id), h);
}

/**
 *
 */
export function $HandleKeyUp(e: HTMLElement | null, h: (ke: KeyboardEvent) => void): void {
    if (e) {
        e.addEventListener('keyup', h);
    } else {
        throwElementNotAssigned('$HandleKeyUp');
    }
}

/**
 * Executes the handler when the ENTER key was pressed.
 */
export function $handleKeyEnter(id: identifier, h: () => void): void {
    $HandleKeyEnter($id(id), h);
}

/**
 * Executes the handler when the ENTER key was pressed.
 */
export function $HandleKeyEnter(e: HTMLElement | null, h: () => void): void {
    if (e) {
        e.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                h();
            }
        });
    } else {
        throwElementNotAssigned('$HandleKeyEnter');
    }
}

/**
 * Executes the handler when the SPACE key was pressed.
 */
export function $handleKeySpace(id: identifier, h: () => void): void {
    $HandleKeySpace($id(id), h);
}

/**
 * Executes the handler when the SPACE key was pressed.
 */
export function $HandleKeySpace(e: HTMLElement | null, h: () => void): void {
    if (e) {
        e.addEventListener('keydown', (event) => {
            if (event.key === ' ') {
                h();
            }
        });
    } else {
        throwElementNotAssigned('$HandleKeySpace');
    }
}

/**
 * Deletes all child nodes of specifier element.
 *
 * @param id Identifier of the element whose all child nodes will be deleted.
 */
export function $deleteChildren(id: identifier): void {
    $DeleteChildren($id(id));
}

/**
 * Deletes all child nodes of specifier element.
 *
 * @param e Element whose all child nodes will be deleted.
 */
export function $DeleteChildren(e: HTMLElement | null): void {
    if (e) {
        let child = e.firstChild;
        while (child) {
            e.removeChild(child);
            child = e.firstChild;
        }
    } else {
        throwElementNotAssigned('$DeleteChildren');
    }
}

/**
 *
 * @param element
 * @param value
 */
export function $SET_TEXT(element: Text, value: string): void {
    element.data = value;
}

export function $SET_FOCUS(element: HTMLElement): void {
    setTimeout(() => {
        element.focus();
    }, 50);
}

export function $APPEND_CHILD_TEXT(element: HTMLElement): Text {
    let elText = document.createTextNode('');
    element.appendChild(elText);
    return elText;
}

export function $REPLACE(s: string, t: string, r: string): string {
    return s.replace(':' + t, r);
}

export function $REPLACE_MD(s: string, t: string, r: string): string {
    return s.replace(':' + t, marked(r));
}

export function $displayBlock(id: identifier): void {
    $DisplayBlock($id(id));
}

export function $DisplayBlock(e: HTMLElement | null): void {
    if (e) {
        e.style.display = 'block';
    } else {
        throwElementNotAssigned('$DisplayBlock');
    }
}

export function $displayNone(id: identifier): void {
    $DisplayNone($id(id));
}

export function $DisplayNone(e: HTMLElement | null): void {
    if (e) {
        e.style.display = 'none';
    } else {
        throwElementNotAssigned('$DisplayNone');
    }
}

export function $displayFlex(id: identifier): void {
    $DisplayFlex($id(id));
}

export function $DisplayFlex(e: HTMLElement | null): void {
    if (e) {
        e.style.display = 'flex';
    } else {
        throwElementNotAssigned('$DisplayFlex');
    }
}

export function $makeVisible(id: identifier, visible: boolean): void {
    const e = $id(id);
    if (e) {
        e.style.visibility = visible ? 'visible' : 'hidden';
    } else {
        throwElementNotAssigned('$makeVisible');
    }
}

export function $visible(id: identifier): void {
    $Visible($id(id));
}

export function $Visible(e: HTMLElement | null): void {
    if (e) {
        e.style.visibility = 'visible';
    } else {
        throwElementNotAssigned('$visible');
    }
}

export function $hidden(id: identifier): void {
    $Hidden($id(id));
}

export function $Hidden(e: HTMLElement | null): void {
    if (e) {
        e.style.visibility = 'hidden';
    } else {
        throwElementNotAssigned('$hidden');
    }
}

/**
 *
 */
export function $innerHTML(id: identifier, html: string): void {
    $InnerHTML($id(id), html);
}

/**
 *
 */
export function $InnerHTML(e: HTMLElement | null, html: string): void {
    if (e) {
        e.innerHTML = html;
    } else {
        throwElementNotAssigned('$InnerHTML');
    }
}

/**
 * Sets the inner text of the element with specified identifier.
 *
 * @param id Identifier of the element for which the inner text will be set.
 * @param text Text to be set as inner value of the element.
 */
export function $innerText(id: identifier, text: string): void {
    const e = document.getElementById(id);
    if (e) {
        e.innerText = text;
    } else {
        throwElementNotAssigned('$innerText');
    }
}

/**
 * Sets the inner text of the specified element.
 *
 * @param e HTML element for which the inner text will be set.
 * @param text Text to be set as inner value of the element.
 */
export function $InnerText(e: HTMLElement | null, text: string): void {
    if (e) {
        e.innerText = text;
    } else {
        throwElementNotAssigned('$InnerText');
    }
}

/**
 * Adds a class name to the list of classes of the element with specified identifier.
 *
 * @param id Identifier of the element.
 * @param className Name of the class to be added.
 */
export function $addClassName(id: identifier, className: string): void {
    $AddClassName($id(id), className);
}

/**
 * Adds a class name to the list of classes of the specified element.
 *
 * @param e Element to which the class name will be added.
 * @param className Name of the class to be added.
 */
export function $AddClassName(e: HTMLElement | null, className: string): void {
    if (e) {
        e.classList.add(className);
    } else {
        throwElementNotAssigned('$AddClassName');
    }
}

export function $removeClassName(id: identifier, className: string): void {
    $RemoveClassName($id(id), className);
}

export function $RemoveClassName(e: HTMLElement | null, className: string): void {
    if (e) {
        e.classList.remove(className);
    } else {
        throwElementNotAssigned('$RemoveClassName');
    }
}

/**
 *
 */
export function $md(s: string): string {
    return marked(s);
}

/**
 * Parses an integer value from string.
 *
 * @param s String to be parsed as integer value.
 * @param def Default value when the number can not be parsed properly.
 */
export function $parseInt(s: string | null | undefined, def: number): number {
    if (s) {
        const num = parseInt(s);
        return isNaN(num) ? def : num;
    }
    return def;
}

/**
 * Throws exception with console stack trace.
 *
 * @param source Name of the source of the exception.
 */
function throwElementNotAssigned(source: string): void {
    console.trace();
    throw '[simpa]: element not assigned in ' + source;
}
