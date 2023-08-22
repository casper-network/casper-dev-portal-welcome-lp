import "@testing-library/jest-dom";
import { act, render, screen, waitFor } from "@testing-library/react";
import { BountiesContext, BountiesContextProvider } from "../../src/context/BountiesContext";
import { bountyFeaturedLabel, bountyOtherTag } from "../../__mocks__/bountiesMock";
import React, { useContext, useEffect, useState } from "react";
import User from "@testing-library/user-event";
import { ThemeContext, ThemeContextProvider } from "../../src/context/ThemeContext";
const localStorageMock = (function () {
    let store = {};

    return {
        getItem(key) {
            return store[key];
        },

        setItem(key, value) {
            store[key] = value;
        },

        clear() {
            store = {};
        },

        removeItem(key) {
            delete store[key];
        },

        getAll() {
            return store;
        }
    };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

function MockComponent() {
    const { lightTheme } = useContext(ThemeContext);
    return <div>{lightTheme ? "light" : "dark"}</div>;
}
describe("BountiesContext", () => {
    beforeEach(() => {
        localStorageMock.clear();
    });

    it("Should render and set dark theme if there's no theme in localStorage and save 'dark' theme", () => {
        renderWithThemeContext();

        expect(screen.getByText("dark")).toBeInTheDocument();
        expect(localStorageMock.getItem("theme-pref")).toBe("dark");
    });

    it("Should set light theme if light theme pref is saved in localStorage", () => {
        localStorageMock.setItem("theme-pref", "light");

        renderWithThemeContext();

        expect(screen.getByText("light")).toBeInTheDocument();
        expect(document.querySelector("body")?.classList).toContain("light");
    });
});

function renderWithThemeContext() {
    return render(
        <ThemeContextProvider>
            <MockComponent></MockComponent>
        </ThemeContextProvider>
    );
}
