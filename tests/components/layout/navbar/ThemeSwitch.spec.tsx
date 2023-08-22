import React from "react";
import { screen, render, act, findByRole } from "@testing-library/react";
import User from "@testing-library/user-event";
import "@testing-library/jest-dom";
import ThemeSwitch from "../../../../src/components/Layout/NavBar/ThemeSwitch";
import "../../../../src/context/ThemeContext";
import { ThemeContextProvider } from "../../../../src/context/ThemeContext";

jest.mock("../../../../src/svg/Icons", () => {
    return {
        __esModule: true,
        icons: {
            sun: <div>Sun icon</div>,
            moon: <div>Moon icon</div>
        }
    };
});

describe("ThemeSwitch", () => {
    it("Should render", () => {
        render(<ThemeSwitch></ThemeSwitch>);
    });

    it("renders label and input elements with dark theme", () => {
        render(<ThemeSwitch />);
        const label = document.querySelector("label")!;

        expect(label.classList).not.toContain("light");
    });

    it("updates lightTheme state when input is clicked", async () => {
        render(<ThemeSwitch />);
        const input = document.querySelector("input")!;

        expect(input.checked).toBe(false);

        await User.click(input);

        expect(input.checked).toBe(true);

        await User.click(input);

        expect(input.checked).toBe(false);
    });
    it("updates lightTheme state when input is clicked", async () => {
        render(
            <ThemeContextProvider>
                <ThemeSwitch />
            </ThemeContextProvider>
        );
        const input = document.querySelector("input")!;

        expect(input.checked).toBe(false);

        await User.click(input);

        expect(input.checked).toBe(true);

        const label = await screen.findByTestId("switch-label");
        expect(label.classList).toContain("light");
    });
});
