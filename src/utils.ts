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
 * Returns HTML DIV element with specified identifier.
 *
 * @param elementId Identifier of HTML DIV element in document.
 * @return HTML DIV element with specified identifier or null.
 */
export function $DIV(elementId: string): HTMLDivElement | null {
    const element = document.getElementById(elementId);
    return element ? element as HTMLDivElement : null;
}

/**
 * Returns HTML PRE element with specified identifier.
 *
 * @param elementId Identifier of HTML PRE element in document.
 * @return HTML PRE element with specified identifier or null.
 */
export function $PRE(elementId: string): HTMLPreElement | null {
    const element = document.getElementById(elementId);
    return element ? element as HTMLPreElement : null;
}

/**
 * Creates HTML element for specified HTML tag name.
 *
 * @return HTML element.
 */
export function $CREATE_ELEMENT(tagName: string): HTMLElement {
    return document.createElement(tagName);
}

/**
 * Creates HTML DIV element.
 *
 * @return HTML DIV element.
 */
export function $CREATE_DIV(): HTMLDivElement {
    return document.createElement('div');
}

/**
 *
 */
export function $INPUT(element: HTMLElement, handler: () => void) {
    element.addEventListener("input", handler, true);
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
export function $MOUSE_DOWN(element: HTMLElement, handler: (event: MouseEvent) => void) {
    element.addEventListener("mousedown", handler, true);
}

/**
 *
 */
export function $MOUSE_UP(element: HTMLElement, handler: (event: MouseEvent) => void) {
    element.addEventListener("mouseup", handler, true);
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
export function $MOUSE_LEAVE(element: HTMLElement, handler: (event: MouseEvent) => void) {
    element.addEventListener("mouseleave", handler, true);
}

/**
 *
 */
export function $KEY_DOWN(element: HTMLElement, handler: (event: KeyboardEvent) => void) {
    element.addEventListener("keydown", handler, false);
}

/**
 *
 */
export function $KEY_UP(element: HTMLElement, handler: (event: KeyboardEvent) => void) {
    element.addEventListener("keyup", handler, false);
}

/**
 * Executes the handler when ENTER key was pressed.
 */
export function $KEY_ENTER(element: HTMLElement, handler: () => void) {
    element.addEventListener("keydown", (event) => {
        if (event.key === 'Enter') {
            handler();
        }
    }, true);
}

/**
 * Executes the handler when SPACE-BAR key was pressed.
 */
export function $KEY_SPACE(element: HTMLElement, handler: () => void) {
    element.addEventListener("keydown", (event) => {
        if (event.key === ' ') {
            handler();
        }
    }, true);
}

/**
 *
 * @param element
 */
export function $MAKE_VISIBLE(element: HTMLElement) {
    element.style.visibility = 'visible';
}

/**
 *
 * @param element
 */
export function $MAKE_HIDDEN(element: HTMLElement) {
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

export function $REPLACE(s: string, t: string, r: string): string {
    return s.replace(":" + t, r);
}

export function $REPLACE_MD(s: string, t: string, r: string): string {
    return s.replace(":" + t, marked(r));
}
