import { renderHook } from "@testing-library/react";
import useOnScreen from "../../src/hooks/useOnScreen";

describe("useOnScreen", () => {
    it("should detect when element is not visible", () => {
        const entry = { isIntersecting: false };
        const observer = { observe: jest.fn(), unobserve: jest.fn() };
        window.IntersectionObserver = jest.fn().mockImplementation((callback) => {
            callback([entry]);
            return observer;
        });
        const ref = { current: { getBoundingClientRect: jest.fn() } };
        const { result } = renderHook(() => useOnScreen(ref));

        expect(result.current).toBe(false);
    });

    it("should detect when element is visible", () => {
        const entry = { isIntersecting: true };
        const observer = { observe: jest.fn(), unobserve: jest.fn() };
        window.IntersectionObserver = jest.fn().mockImplementation((callback) => {
            callback([entry]);
            return observer;
        });
        const ref = { current: { getBoundingClientRect: jest.fn() } };
        const { result } = renderHook(() => useOnScreen(ref));

        expect(result.current).toBe(true);
    });

    it("should not observe if ref it's undefined", () => {
        const entry = { isIntersecting: false };
        const observer = { observe: jest.fn(), unobserve: jest.fn() };
        window.IntersectionObserver = jest.fn().mockImplementation((callback) => {
            callback([entry]);
            return observer;
        });
        const ref = { current: undefined };
        const { result } = renderHook(() => useOnScreen(ref));

        expect(observer.observe).not.toHaveBeenCalled();
    });
});
