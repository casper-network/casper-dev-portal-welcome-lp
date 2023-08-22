import React from "react";
import { screen, render, renderHook } from "@testing-library/react";
import "@testing-library/jest-dom";
import useLocalization from "../../../src/utils/internationalization/useLocalization";

describe("useLocalization", () => {
    let env;
    beforeEach(() => {
        env = { ...process.env };
    });

    afterEach(() => {
        process.env = env;
    });
    it("returns the context value", () => {
        const contextValue = "en-US";

        jest.spyOn(React, "useContext").mockReturnValue(contextValue);

        const { result } = renderHook(() => useLocalization());
        expect(result.current).toBe(contextValue);
    });

    //this test produces an error message, it's expected and means that the test is working correctly
    it("throws an error when context is 0 in non-production environment", () => {
        jest.spyOn(console, "error").mockImplementation(() => {});
        process.env.NODE_ENV = "development";
        const contextValue = 0;

        jest.spyOn(React, "useContext").mockReturnValue(contextValue);

        expect(() => renderHook(() => useLocalization())).toThrow();
    });
});
