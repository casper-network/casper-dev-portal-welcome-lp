import { renderHook } from "@testing-library/react";
import useWindowWidth from "../../src/hooks/useWindowWidth";

describe("useWindowWidth", () => {
    it("should return true when the ref width is bigger than the window width", () => {
        matchMediaWithEvent();

        window.innerWidth = 900;

        const { result } = renderHook(() => useWindowWidth(1000));
        expect(result.current).toBe(true);
    });

    it("should return false when the ref width is smaller than the window width", () => {
        matchMediaWithEvent();
        window.innerWidth = 900;

        const { result } = renderHook(() => useWindowWidth(800));
        expect(result.current).toBe(false);
    });

    it("should use listener if addEventListener its not defined", () => {
        matchMediaWithoutEvent();
        window.innerWidth = 900;

        const { result } = renderHook(() => useWindowWidth(800));
        expect(result.current).toBe(false);
    });
});

function matchMediaWithEvent() {
    const mediaQueryLists = {};
    const matchMediaMock = (query) => {
        const mql = {
            media: query,
            matches: window.innerWidth <= parseInt(query.match(/\d+/)),
            addEventListener: (event, callback) => {},
            addListener: (callback) => {},
            removeEventListener: (event, callback) => {},
            removeListener: (event, callback) => {}
        };
        mediaQueryLists[query] = mediaQueryLists[query] || mql;
        return mediaQueryLists[query];
    };

    window.matchMedia = jest.fn().mockImplementation(matchMediaMock);
}

function matchMediaWithoutEvent() {
    const mediaQueryLists = {};
    const matchMediaMock = (query) => {
        const mql = {
            media: query,
            matches: window.innerWidth <= parseInt(query.match(/\d+/)),
            addListener: (callback) => {},
            removeListener: (event, callback) => {}
        };
        mediaQueryLists[query] = mediaQueryLists[query] || mql;
        return mediaQueryLists[query];
    };

    window.matchMedia = jest.fn().mockImplementation(matchMediaMock);
}
