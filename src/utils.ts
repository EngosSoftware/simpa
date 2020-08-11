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
export function $uuid(): string {
    return UUID.create().toString();
}

/**
 * Returns HTML element with specified identifier.
 *
 * @param id Identifier of HTML element in document.
 * @return HTML element with specified identifier or null.
 */
export function $id(id: string): HTMLElement | null {
    return document.getElementById(id);
}

/**
 * Returns HTML DIV element with specified identifier.
 *
 * @param elementId Identifier of HTML DIV element in document.
 * @return HTML DIV element with specified identifier or null.
 */
export function $div(elementId: string): HTMLDivElement | null {
    const element = document.getElementById(elementId);
    return element ? element as HTMLDivElement : null;
}

/**
 * Returns HTML PRE element with specified identifier.
 *
 * @param elementId Identifier of HTML PRE element in document.
 * @return HTML PRE element with specified identifier or null.
 */
export function $pre(elementId: string): HTMLPreElement | null {
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
    element.addEventListener('input', handler, true);
}

/**
 *
 */
export function $touch(id: string, handler: () => void) {
    const element = document.getElementById(id);
    if (element) {
        $Touch(element, handler);
    } else {
        throwElementNotAssigned('$touch');
    }
}

/**
 *
 */
export function $Touch(element: HTMLElement, handler: () => void) {
    if (element) {
        element.addEventListener(gvTouch ? 'touchend' : 'mouseup', handler, true);
    } else {
        throwElementNotAssigned('$Touch');
    }
}

/**
 *
 */
export function $MOUSE_DOWN(element: HTMLElement, handler: (event: MouseEvent) => void) {
    element.addEventListener('mousedown', handler, true);
}

/**
 *
 */
export function $MOUSE_UP(element: HTMLElement, handler: (event: MouseEvent) => void) {
    if (element) {
        element.addEventListener('mouseup', handler, true);
    } else {
        throwElementNotAssigned('$MOUSE_UP');
    }
}

/**
 *
 */
export function $mouseUp(identifier: string, h: () => void) {
    const element = document.getElementById(identifier);
    if (element) {
        element.addEventListener('mouseup', h, true);
    } else {
        throwElementNotAssigned('$mouseUp');
    }
}

/**
 *
 */
export function $MOUSE_MOVE(element: HTMLElement, handler: (event: MouseEvent) => void) {
    element.addEventListener('mousemove', handler, true);
}

/**
 *
 */
export function $MOUSE_LEAVE(element: HTMLElement, handler: (event: MouseEvent) => void) {
    element.addEventListener('mouseleave', handler, true);
}

/**
 *
 */
export function $KEY_DOWN(element: HTMLElement, handler: (event: KeyboardEvent) => void) {
    element.addEventListener('keydown', handler, false);
}

/**
 *
 */
export function $KEY_UP(element: HTMLElement, handler: (event: KeyboardEvent) => void) {
    element.addEventListener('keyup', handler, false);
}

/**
 * Executes the handler when ENTER key was pressed.
 */
export function $KEY_ENTER(element: HTMLElement, handler: () => void) {
    element.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            handler();
        }
    }, true);
}

/**
 * Executes the handler when SPACE-BAR key was pressed.
 */
export function $KEY_SPACE(element: HTMLElement, handler: () => void) {
    element.addEventListener('keydown', (event) => {
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
    return elText;
}

export function $REPLACE(s: string, t: string, r: string): string {
    return s.replace(':' + t, r);
}

export function $REPLACE_MD(s: string, t: string, r: string): string {
    return s.replace(':' + t, marked(r));
}

export function $displayBlock(id: string) {
    const element = document.getElementById(id);
    if (element) {
        element.style.display = 'block';
    } else {
        throwElementNotAssigned('$displayBlock');
    }
}

export function $DisplayBlock(element: HTMLElement) {
    if (element) {
        element.style.display = 'block';
    } else {
        throwElementNotAssigned('$DisplayBlock');
    }
}

export function $displayNone(id: string) {
    const element = document.getElementById(id);
    if (element) {
        element.style.display = 'none';
    } else {
        throwElementNotAssigned('$displayNone');
    }
}

export function $DisplayNone(element: HTMLElement) {
    if (element) {
        element.style.display = 'none';
    } else {
        throwElementNotAssigned('$DisplayNone');
    }
}

export function $displayFlex(id: string) {
    const element = document.getElementById(id);
    if (element) {
        element.style.display = 'flex';
    } else {
        throwElementNotAssigned('$displayFlex');
    }
}

export function $DisplayFlex(element: HTMLElement) {
    if (element) {
        element.style.display = 'flex';
    } else {
        throwElementNotAssigned('$DisplayFlex');
    }
}

export function $setVisible(identifier: string, visible: boolean) {
    const element = document.getElementById(identifier);
    if (element) {
        element.style.visibility = visible ? 'visible' : 'hidden';
    } else {
        throwElementNotAssigned('$setVisible');
    }
}

export function $visibilityVisible(identifier: string) {
    const element = document.getElementById(identifier);
    if (element) {
        element.style.visibility = 'visible';
    } else {
        throwElementNotAssigned('$visibilityVisible');
    }
}

export function $visibilityHidden(identifier: string) {
    const element = document.getElementById(identifier);
    if (element) {
        element.style.visibility = 'hidden';
    } else {
        throwElementNotAssigned('$visibilityHidden');
    }
}

/**
 *
 */
export function $innerHTML(id: string, value: string) {
    const element = document.getElementById(id);
    if (element) {
        element.innerHTML = value;
    } else {
        throwElementNotAssigned('$innerHTML');
    }
}

/**
 *
 */
export function $md(s: string): string {
    return marked(s);
}

/**
 * Throws exception with console stack trace.
 *
 * @param source Name of the source of the exception.
 */
function throwElementNotAssigned(source: string) {
    console.trace();
    throw '[simpa]: element not assigned in ' + source;
}
