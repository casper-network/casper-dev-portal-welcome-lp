import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import "../../__mocks__/matchMedia";
import { pageContext } from "../../__mocks__/notFoundPageContext";
import NotFoundTemplate, { Head } from "../../src/templates/NotFound";
import { LocalizationContext } from "../../src/utils/internationalization/LocalizationContext";

const context = { page: pageContext.data.directus.not_found.translations[1] };
jest.mock("gatsby-plugin-image");

jest.mock("../../src/components/Shared/SiteMetadataHead", () => {
    return {
        __esModule: true,
        SiteMetadataHead: jest.fn().mockImplementation(({ children }) => {
            return children;
        })
    };
});

describe("NotFound", () => {
    it("Should render", () => {
        renderNotFound();

        expect(screen.getByText(context.page.title)).toBeInTheDocument();
    });

    it("Should render return to home button", () => {
        renderNotFound();

        expect(screen.getByText(/return to home/i)).toBeInTheDocument();
    });

    it("Should render metadata", () => {
        jest.spyOn(console, "error").mockImplementation(() => {});

        const { container } = render(<Head pageContext={context} />, { container: document.head });
        expect(container.querySelector("html")?.getAttribute("lang")).toBe("");
        expect(container.querySelector("title")?.textContent).toBe(context.page.seo.title);
        expect(container.querySelector("#desc")?.getAttribute("content")).toBe(context.page.seo.description);
    });
    it("Should render metadata with locale lang and empty description", () => {
        jest.spyOn(console, "error").mockImplementation(() => {});
        const tempContext = context.page;
        context.page.seo.description = undefined as any;
        context.page!.seo!.title = undefined as any;
        const altContext = { page: pageContext.data.directus.not_found.translations[1], locale: "en-us" };
        const { container } = render(<Head pageContext={altContext} />, { container: document.head });
        expect(container.querySelector("html")?.getAttribute("lang")).toBe("en");
        expect(container.querySelector("#desc")?.getAttribute("content")).toBe("");

        context.page = tempContext;
    });
});

function renderNotFound() {
    const localizePath = jest.fn();

    const pageContext = { locale: "", defaultLocale: "", locales: "", localizePath };
    return render(
        <LocalizationContext.Provider value={pageContext}>
            <NotFoundTemplate pageContext={context} />
        </LocalizationContext.Provider>
    );
}
