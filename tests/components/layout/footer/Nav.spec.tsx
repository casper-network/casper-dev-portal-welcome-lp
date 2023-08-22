import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import "../../../../__mocks__/matchMedia";
import { LocalizationContext } from "../../../../src/utils/internationalization/LocalizationContext";
import Nav from "../../../../src/components/Layout/Footer/Nav";
import { footerData } from "../../../../__mocks__/footerData";

describe("Footer - Nav", () => {
    it("Should render with external url", () => {
        const localizePath = jest.fn();
        const pageContext = { locale: "", defaultLocale: "", locales: "", localizePath };
        const footer = { link_column: footerData.data.directus.footer.translations[1].link_column };
        renderNav(footer);

        footer.link_column.forEach((column) => {
            expect(screen.getByText(column.footer_link_column_id.title)).toBeInTheDocument();
            column.footer_link_column_id.links.forEach((link) => {
                expect(screen.getByText(link.link_id.title)).toBeInTheDocument();
                expect(screen.getByText(link.link_id.title).getAttribute("href")).toBe(link.link_id.url);
            });
        });
        expect(screen.getAllByRole("link")).toHaveLength(7);
    });
    it("Should not render with url columns", () => {
        const footer = { link_column: [] };

        renderNav(footer);

        expect(screen.queryAllByRole("link")).toHaveLength(0);
    });

    it("Should render with internal url", () => {
        const footer = {
            link_column: [
                {
                    footer_link_column_id: {
                        title: "Resources",
                        links: [
                            {
                                link_id: {
                                    title: "Documentation",
                                    type: "internal",
                                    url: "/mock-page"
                                }
                            },
                            {
                                link_id: {
                                    title: "About Casper",
                                    type: "internal",
                                    url: "/mock-page-test"
                                }
                            }
                        ]
                    }
                }
            ]
        };

        renderNav(footer);

        expect(screen.getByText(footer.link_column[0].footer_link_column_id.title)).toBeInTheDocument();
        expect(screen.getByText(footer.link_column[0].footer_link_column_id.links[0].link_id.title)).toBeInTheDocument();
        expect(screen.getByText(footer.link_column[0].footer_link_column_id.links[1].link_id.title)).toBeInTheDocument();
    });

    it("Should render footer logo", () => {
        const footer = {
            logo: footerData.data.directus.footer.translations[1].logo,
            link_column: []
        };

        const { container } = renderNav(footer);
        expect(container.querySelector("svg")).toBeVisible();
    });

    it("Should not render footer logo", () => {
        const footer = {
            link_column: []
        };

        const { container } = renderNav(footer);

        expect(container.querySelector("svg")).toBeFalsy();
    });
});

function renderNav(footer) {
    const localizePath = jest.fn();
    const pageContext = { locale: "", defaultLocale: "", locales: "", localizePath };
    return render(
        <LocalizationContext.Provider value={pageContext}>
            <Nav footer={footer} />
        </LocalizationContext.Provider>
    );
}
