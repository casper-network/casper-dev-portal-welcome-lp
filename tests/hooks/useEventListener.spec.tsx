import { renderHook } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import useEventListener from "../../src/hooks/useEventListener";

describe("useEventListener", () => {
    it("should add and remove event listener", () => {
        const mockCallback = jest.fn();
        const target = document.createElement("div");

        const { unmount } = renderHook(() => useEventListener("click", mockCallback, target));

        fireEvent.click(target);

        expect(mockCallback).toHaveBeenCalledTimes(1);

        unmount();

        fireEvent.click(target);

        expect(mockCallback).toHaveBeenCalledTimes(1);
    });

    it("should use window as the target when target is undefined", () => {
        const mockCallback = jest.fn();

        const { unmount } = renderHook(() => useEventListener("click", mockCallback, undefined));

        fireEvent.click(window);

        expect(mockCallback).toHaveBeenCalledTimes(1);

        unmount();
    });
    it("should return early if callback is not defined", () => {
        const target = window;

        const { unmount } = renderHook(() => useEventListener("click", undefined as any, target));

        unmount();
    });

    it("should set target prop as undefined", () => {
        const mockCallback = jest.fn();

        const { unmount } = renderHook(() => useEventListener("click", mockCallback, undefined));

        fireEvent.click(window);

        expect(mockCallback).toHaveBeenCalledTimes(1);

        unmount();
    });
});
