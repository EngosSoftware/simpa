const UUID = require('uuid-js');
const marked = require('marked');

/**
 * Global flag indicating if touch screen is enabled.
 */
export const gvTouch = ('ontouchstart' in window);

/**
 * Generates UUID identifier.
 *
 * @return UUID identifier.
 */
export function $UUID(): string {
    return UUID.create().toString()
}

/**
 * Returns HTML element with specified identifier.
 *
 * @param elementId Identifier of HTML element in document.
 * @return HTML element with specified identifier or null.
 */
export function $ID(elementId: string): HTMLElement | null {
    return document.getElementById(elementId);
}

/**
 * Creates HTML element with specified name.
 *
 * @return HTML element.
 */
export function $ELEMENT(elementName: string): HTMLElement {
    return document.createElement(elementName);
}

/**
 * Creates HTML <div> element.
 *
 * @return HTML <div> element.
 */
export function $DIV(): HTMLElement {
    return document.createElement('div');
}

/**
 *
 */
export function $TOUCH(element: HTMLElement, handler: () => void) {
    element.addEventListener(gvTouch ? "touchend" : "mouseup", handler, true);
}

/**
 *
 */
export function $MOUSE_MOVE(element: HTMLElement, handler: (event: MouseEvent) => void) {
    element.addEventListener("mousemove", handler, true);
}

/**
 *
 */
export function $KEYDOWN(element: HTMLElement, handler: (event: KeyboardEvent) => void) {
    element.addEventListener("keydown", handler, false);
}

/**
 *
 */
export function $KEYUP(element: HTMLElement, handler: (event: KeyboardEvent) => void) {
    element.addEventListener("keyup", handler, false);
}

/**
 *
 * @param element
 */
export function $VISIBLE(element: HTMLElement) {
    element.style.visibility = 'visible';
}

/**
 *
 * @param element
 */
export function $HIDDEN(element: HTMLElement) {
    element.style.visibility = 'hidden';
}

/**
 *
 * @param element
 */
export function $SHOW(element: HTMLElement) {
    element.style.display = 'block';
}

/**
 *
 * @param element
 */
export function $HIDE(element: HTMLElement) {
    element.style.display = 'none';
}

/**
 * Deletes all child nodes of specifier element.
 *
 * @param element Element whose all child nodes will be deleted.
 */
export function $DELETE_CHILDREN(element: HTMLElement) {
    let child = element.firstChild;
    while (child) {
        element.removeChild(child);
        child = element.firstChild;
    }
}

/**
 *
 * @param element
 * @param value
 */
export function $SET_TEXT(element: Text, value: string) {
    element.data = value;
}

export function $SET_FOCUS(element: HTMLElement) {
    setTimeout(() => {
        element.focus();
    }, 50);
}

export function $APPEND_CHILD_TEXT(element: HTMLElement): Text {
    let elText = document.createTextNode('');
    element.appendChild(elText);
    return elText
}

export function $POST(data: Object): RequestInit {
    return {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'omit',
        headers: {"Content-Type": "application/json"},
        redirect: "follow",
        referrer: "no-referrer",
        body: JSON.stringify(data)
    }
}

export function $REPLACE(s: string, t: string, r: string): string {
    return s.replace(":" + t, r);
}

export function $REPLACE_MD(s: string, t: string, r: string): string {
    return s.replace(":" + t, marked(r));
}
