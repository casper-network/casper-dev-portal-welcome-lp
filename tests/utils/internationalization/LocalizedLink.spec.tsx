import React from "react";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import LocalizedLink from "../../../src/utils/internationalization/LocalizedLink";

jest.mock("gatsby", () => {
    return {
        __esModule: true,
        Link: jest.fn().mockImplementation(({ to, children }) => <a href={to}>{children}</a>)
    };
});

jest.mock("../../../src/utils/internationalization/useLocalization", () => {
    return {
        __esModule: true,
        default: jest.fn().mockImplementation(() => {
            return {
                localizePath: jest.fn().mockImplementation((to) => to)
            };
        })
    };
});

describe("LocalizedLink", () => {
    it("Should render localized Link", () => {
        render(<LocalizedLink to={"/mock"}>Link</LocalizedLink>);
        const link = screen.getByText("Link");
        expect(link).toHaveAttribute("href", "/mock");
    });
});
