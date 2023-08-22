import React, { useContext } from "react";
import { screen, render } from "@testing-library/react";
import { LocalizationContext, LocalizationProvider } from "../../../src/utils/internationalization/LocalizationContext";
import "@testing-library/jest-dom";
import { navigate } from "gatsby";
import User from "@testing-library/user-event";

function MockComponent() {
    const localization = useContext(LocalizationContext);

    return (
        <>
            <div onClick={() => localization.localizedNavigate("/mock", {})}>Abs path</div>
            <div onClick={() => localization.localizedNavigate("/test", {})}>{localization.locale}</div>
        </>
    );
}

jest.mock("gatsby", () => {
    return {
        navigate: jest.fn(),
        withPrefix: jest.fn().mockImplementation((path) => path)
    };
});

describe("LocalizationProvider", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders the LocalizationContext with the correct values", () => {
        const pageContext = {
            locale: "en-US",
            defaultLocale: "en-US",
            locales: ["en-US", "es"]
        };
        render(
            <LocalizationProvider pageContext={pageContext}>
                <MockComponent></MockComponent>
            </LocalizationProvider>
        );

        expect(screen.getByText("en-US")).toBeInTheDocument();
    });

    it("should navigate to localized link on click", async () => {
        const pageContext = {
            locale: "en-US",
            defaultLocale: "en-US",
            locales: ["en-US", "es"]
        };
        render(
            <LocalizationProvider pageContext={pageContext}>
                <MockComponent></MockComponent>
            </LocalizationProvider>
        );
        const btn = screen.getByText("en-US");
        await User.click(btn);
        expect(navigate).toHaveBeenCalledWith("/test", {});
    });

    it("should navigate to localized link with prefix on click", async () => {
        const pageContext = {
            locale: "en-EN",
            defaultLocale: "en-US",
            locales: ["en-US", "es"]
        };
        render(
            <LocalizationProvider pageContext={pageContext}>
                <MockComponent></MockComponent>
            </LocalizationProvider>
        );
        const btn = screen.getByText("Abs path");
        await User.click(btn);
        expect(navigate).toHaveBeenCalledWith("/en-en/mock", {});
    });
});
