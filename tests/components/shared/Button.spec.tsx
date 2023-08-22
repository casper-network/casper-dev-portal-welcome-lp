import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Button from "../../../src/components/Shared/Button";
import "../../../__mocks__/matchMedia";
import { LocalizationContext } from "../../../src/utils/internationalization/LocalizationContext";

describe("Button", () => {
    it("Should render with external url and primary styles", () => {
        const { container, getByText } = render(
            <Button text={"TestBtn"} url={"google.com"} inverted={false} type={"external"} openInNewTab={true} />
        );

        expect(getByText("TestBtn")).toBeInTheDocument();
        expect(container.children[0].className).toMatch(/primary/);
        expect(container.children[0].className).not.toMatch(/disabled/);
    });

    it("Should render with external url and secondary styles", () => {
        const { container, getByText } = render(
            <Button text={"TestBtn"} url={"google.com"} inverted={true} type={"external"} openInNewTab={false} />
        );

        expect(getByText("TestBtn")).toBeInTheDocument();
        expect(container.children[0].className).toMatch(/secondary/);
        expect(container.children[0].className).not.toMatch(/disabled/);
    });

    it("Should render with external url and disabled styles", () => {
        const { container, getByText } = render(
            <Button text={"TestBtn"} url={"google.com"} inverted={false} disabled={true} type={"external"} openInNewTab={true} />
        );

        expect(getByText("TestBtn")).toBeInTheDocument();
        expect(container.children[0].className).toMatch(/disabled/);
    });

    it("Should render with internal url and primary styles", () => {
        const localizePath = jest.fn();

        const pageContext = { locale: "", defaultLocale: "", locales: "", localizePath };
        const { container, getByText } = render(
            <LocalizationContext.Provider value={pageContext}>
                <Button text={"TestBtn"} url={"/custom-page"} inverted={false} type={"internal"} openInNewTab={false} />
            </LocalizationContext.Provider>
        );

        expect(getByText("TestBtn")).toBeInTheDocument();
        expect(container.children[0].className).toMatch(/primary/);
        expect(container.children[0].className).not.toMatch(/disabled/);
    });

    it("Should render with internal url and secondary styles", () => {
        const localizePath = jest.fn();

        const pageContext = { locale: "", defaultLocale: "", locales: "", localizePath };
        const { container, getByText } = render(
            <LocalizationContext.Provider value={pageContext}>
                <Button text={"TestBtn"} url={"/custom-page"} inverted={true} type={"internal"} openInNewTab={true} />
            </LocalizationContext.Provider>
        );

        expect(getByText("TestBtn")).toBeInTheDocument();
        expect(container.children[0].className).toMatch(/secondary/);
        expect(container.children[0].className).not.toMatch(/disabled/);
    });

    it("Should render with internal url and disabled styles", () => {
        const localizePath = jest.fn();

        const pageContext = { locale: "", defaultLocale: "", locales: "", localizePath };
        const { container, getByText } = render(
            <LocalizationContext.Provider value={pageContext}>
                <Button text={"TestBtn"} url={"/custom-page"} disabled={true} inverted={false} type={"internal"} openInNewTab={true} />
            </LocalizationContext.Provider>
        );

        expect(getByText("TestBtn")).toBeInTheDocument();
        expect(container.children[0].className).toMatch(/disabled/);
    });
});
