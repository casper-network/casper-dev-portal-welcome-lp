import { renderHook } from "@testing-library/react";
import useWindow from "../../src/hooks/useWindow";

describe("useWindow", () => {
    it("Should return true if window is defined", () => {
        const { result } = renderHook(() => useWindow());

        expect(result.current).toBe(true);
    });

    it("returns false when the window object is undefined", () => {
        const windowSpy = jest.spyOn(global, "window", "get");
        //@ts-ignore
        windowSpy.mockImplementation(() => undefined);

        const result = useWindow();

        expect(result).toEqual(false);

        windowSpy.mockRestore();
    });
});
