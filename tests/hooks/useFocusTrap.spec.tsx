import { renderHook } from "@testing-library/react";
import { screen } from "@testing-library/react";
import useFocusTrap from "../../src/hooks/useFocusTrap";
import { useRef } from "react";

describe("useFocusTrap", () => {
    afterEach(() => {
        const parent = document.querySelector("body")!;
        while (parent.firstChild) {
            parent.firstChild.remove();
        }
    });
    it("should trap focus within the component", () => {
        document.body.focus();
        const ref = { current: document.createElement("div") };
        let currentIndex = 0;

        const focusableElementsWithTabIndex = [
            document.createElement("a"),
            document.createElement("input"),
            document.createElement("button")
        ];

        document.body.appendChild(ref.current);

        focusableElementsWithTabIndex.forEach((element) => {
            element.tabIndex = 0;
            ref.current?.appendChild(element);
        });
        const { result, rerender } = renderHook((props) => useFocusTrap(props.ref, props.selectors, props.skip, props.content), {
            initialProps: { ref, selectors: "a, input, button:not([disabled])", skip: false, content: null }
        });

        const firstElement = focusableElementsWithTabIndex[0];
        const lastElement = focusableElementsWithTabIndex[focusableElementsWithTabIndex.length - 1];
        const tabKeyDown = new KeyboardEvent("keydown", {
            key: "Tab",
            shiftKey: false
        });
        const shiftTabKeyDown = new KeyboardEvent("keydown", {
            key: "Tab",
            shiftKey: true
        });
        // set focus on the first element
        firstElement.focus();
        expect(document.activeElement).toEqual(firstElement);
        // simulate pressing the "Tab" key to move focus to the next element
        document.dispatchEvent(tabKeyDown);

        currentIndex += 1;
        browserFunctionAdvance(lastElement, focusableElementsWithTabIndex, currentIndex);

        expect(document.activeElement).toEqual(focusableElementsWithTabIndex[currentIndex]);

        // simulate pressing the "Tab" key to move focus to the next element
        document.dispatchEvent(tabKeyDown);
        currentIndex += 1;

        browserFunctionAdvance(lastElement, focusableElementsWithTabIndex, currentIndex);

        expect(document.activeElement).toEqual(focusableElementsWithTabIndex[currentIndex]);
        // simulate pressing the "Tab" key to move focus to the next element (last element, should loop back to the first element)
        document.dispatchEvent(tabKeyDown);
        currentIndex = 0;

        expect(document.activeElement).toEqual(firstElement);

        // simulate pressing the "Shift" and "Tab" keys to move focus to the previous element (first element, should loop back to the last element)
        document.dispatchEvent(shiftTabKeyDown);
        expect(document.activeElement).toEqual(lastElement);

        // update the props to skip the hook
        rerender({ ref, selectors: "a[href], button:not([disabled])", skip: true, content: null });

        // simulate pressing the "Tab" key to move focus (should not change focus because the hook is skipped)
        document.dispatchEvent(tabKeyDown);
        expect(document.activeElement).toEqual(lastElement);
    });

    it("should work with default selectors", () => {
        const ref = { current: document.createElement("div") };
        let currentIndex = 0;

        const focusableElementsWithTabIndex = [
            document.createElement("a"),
            document.createElement("input"),
            document.createElement("button")
        ];

        document.body.appendChild(ref.current);
        focusableElementsWithTabIndex.forEach((element) => {
            element.tabIndex = 0;
            ref.current?.appendChild(element);
        });
        document.querySelector("a")?.setAttribute("href", "test");
        renderHook((props) => useFocusTrap(props.ref, undefined, props.skip, props.content), {
            initialProps: { ref, skip: false, content: null }
        });
        //set focusable elements by the default selectors
        const focusableElements = [focusableElementsWithTabIndex[0], focusableElementsWithTabIndex[2]];
        const firstElement = focusableElementsWithTabIndex[0];
        const lastElement = focusableElementsWithTabIndex[focusableElementsWithTabIndex.length - 1];
        const tabKeyDown = new KeyboardEvent("keydown", {
            key: "Tab",
            shiftKey: false
        });
        // set focus on the first element
        firstElement.focus();
        expect(document.activeElement).toEqual(firstElement);
        // simulate pressing the "Tab" key to move focus to the next element
        document.dispatchEvent(tabKeyDown);

        currentIndex += 1;
        browserFunctionAdvance(lastElement, focusableElements, currentIndex);

        expect(document.activeElement).toEqual(lastElement);
    });

    it("should skip element with tabIndex less than 0", () => {
        const ref = { current: document.createElement("div") };
        let currentIndex = 0;

        const focusableElementsWithTabIndex = [
            document.createElement("a"),
            document.createElement("input"),
            document.createElement("button")
        ];

        document.body.appendChild(ref.current);
        focusableElementsWithTabIndex.forEach((element, i) => {
            element.tabIndex = 0;

            ref.current?.appendChild(element);
        });
        document.querySelector("input")!.tabIndex = -1;
        renderHook((props) => useFocusTrap(props.ref, props.selectors, props.skip, props.content), {
            initialProps: { ref, selectors: "a, input, button:not([disabled])", skip: false, content: null }
        });
        //set focusable elements by the default selectors
        const focusableElements = [focusableElementsWithTabIndex[0], focusableElementsWithTabIndex[2]];
        const firstElement = focusableElementsWithTabIndex[0];
        const lastElement = focusableElementsWithTabIndex[focusableElementsWithTabIndex.length - 1];
        const tabKeyDown = new KeyboardEvent("keydown", {
            key: "Tab",
            shiftKey: false
        });
        // set focus on the first element
        firstElement.focus();
        expect(document.activeElement).toEqual(firstElement);
        // simulate pressing the "Tab" key to move focus to the next element
        document.dispatchEvent(tabKeyDown);

        currentIndex += 1;
        browserFunctionAdvance(lastElement, focusableElements, currentIndex);

        expect(document.activeElement).toEqual(lastElement);
    });

    it("should focus first element if the focus it's out of the ref box", () => {
        const ref = { current: document.createElement("div") };

        const focusableElementsWithTabIndex = [
            document.createElement("a"),
            document.createElement("input"),
            document.createElement("button")
        ];

        document.body.appendChild(ref.current);
        focusableElementsWithTabIndex.forEach((element, i) => {
            element.tabIndex = 0;

            ref.current?.appendChild(element);
        });

        renderHook((props) => useFocusTrap(props.ref, props.selectors, props.skip, props.content), {
            initialProps: { ref, selectors: "a, input, button:not([disabled])", skip: false, content: null }
        });
        const firstElement = focusableElementsWithTabIndex[0];
        const tabKeyDown = new KeyboardEvent("keydown", {
            key: "Tab",
            shiftKey: false
        });
        document.body.focus();
        document.dispatchEvent(tabKeyDown);

        expect(document.activeElement).toEqual(firstElement);
    });

    it("should work with default selectors", () => {
        const ref = { current: document.createElement("div") };

        const focusableElementsWithTabIndex = [
            document.createElement("a"),
            document.createElement("input"),
            document.createElement("button")
        ];

        document.body.appendChild(ref.current);
        focusableElementsWithTabIndex.forEach((element) => {
            element.tabIndex = 0;
            ref.current?.appendChild(element);
        });
        document.querySelector("a")?.setAttribute("href", "test");
        renderHook((props) => useFocusTrap(props.ref, undefined, props.skip, props.content), {
            initialProps: { ref, skip: false, content: null }
        });
    });

    it("should return if ref doesn't exist", () => {
        const ref = { current: null };

        document.querySelector("a")?.setAttribute("href", "test");
        const { result } = renderHook((props) => useFocusTrap(props.ref, undefined, props.skip, props.content), {
            initialProps: { ref, skip: false, content: null }
        });

        const tabKeyDown = new KeyboardEvent("keydown", {
            key: "Tab",
            shiftKey: false
        });
        document.dispatchEvent(tabKeyDown);
        expect(result.current).toBeUndefined();
    });
});

/**
 * hook doesn't take into account native browser tab key press, so if the element it's not first or last it doesn't change in the test
 * @param lastElement
 * @param focusableElementsWithTabIndex
 * @param currentIndex
 */
function browserFunctionAdvance(lastElement, focusableElementsWithTabIndex, currentIndex) {
    if (document.activeElement !== lastElement) {
        focusableElementsWithTabIndex[currentIndex].focus();
    }
}
