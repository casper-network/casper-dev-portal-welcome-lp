import React, { useEffect } from "react";

/**
 * Trap focus in the current component
 *
 * @param {React.RefObject} componentRef    - Ref element (any html element)
 * @param {string} selectors                - A string with a list of the query selectors that you want catch like "a[href], button:not([disabled]), textarea, input, select, p"
 * @param {boolean} isDropdownOpen          - Control param to check its value and run the hook again when it changes.
 * @param {Queries.DirectusData_header_translations_header_nav_item | null} content - Control param to check its value and run the hook again when it changes.
 */

export default function useFocusTrap(
    componentRef: React.RefObject<HTMLElement>,
    selectors: string = "a[href], button:not([disabled])",
    skip?: boolean,
    content?: any
) {
    useEffect(() => {
        if (skip) return;
        const currentElement = componentRef.current;

        // here we query all focusable elements on your component, customize as your own need
        const componentElementList = currentElement?.querySelectorAll(selectors);

        // initialize array for store only the elements with tabIndex = 0
        const focusableElementsWithTabIndex: Array<HTMLElement> = [];

        // set the values for the array
        if (componentElementList) {
            Array.from(componentElementList).forEach((modalItem: any) => {
                if (modalItem.tabIndex === 0) focusableElementsWithTabIndex.push(modalItem);
            });
        }

        const firstElement = focusableElementsWithTabIndex[0];
        const lastElement = focusableElementsWithTabIndex[focusableElementsWithTabIndex.length - 1];

        // check if the focus is on the component
        function focusInComponent(activeElement: any) {
            return Array.from(focusableElementsWithTabIndex).includes(activeElement);
        }

        function keyDownHandler(e: KeyboardEvent): void {
            // only execute if tab is pressed
            if (e.key !== "Tab") return;

            // only execute if modal ref exist is pressed
            if (!currentElement) return;

            // if the focus is outer the box, focus the first element
            if (!e.shiftKey && !focusInComponent(document.activeElement)) {
                firstElement.focus();
                return e.preventDefault();
            }

            // if going forward by pressing tab and lastElement is active shift focus to first focusable element
            if (!e.shiftKey && document.activeElement === lastElement) {
                firstElement.focus();
                return e.preventDefault();
            }

            // if going backward by pressing tab and firstElement is active shift focus to last focusable element
            if (e.shiftKey && document.activeElement === firstElement) {
                lastElement.focus();
                return e.preventDefault();
            }
        }

        document.addEventListener("keydown", keyDownHandler);
        return () => {
            document.removeEventListener("keydown", keyDownHandler);
        };
    }, [skip, content]);
}
