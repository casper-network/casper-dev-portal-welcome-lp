import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import "../../../../__mocks__/matchMedia";
import { LocalizationContext } from "../../../../src/utils/internationalization/LocalizationContext";
import { navBarData } from "../../../../__mocks__/navBarData";
import NavBarLink from "../../../../src/components/Layout/NavBar/NavBarDropdown/NavBarColumn/NavBarGroup/NavBarLink";
import User from "@testing-library/user-event";
const link =
    navBarData.data.directus.header.translations[0].nav_items[0].header_nav_item_id.columns[0].header_nav_column_id.groups[0]
        .header_link_column_id.links[0];

const closebothNavBar = jest.fn();
describe("NavBarLink", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("Should render", () => {
        renderLink();

        const linkElem = screen.getByText(link.link_id.title);
        expect(linkElem).toBeInTheDocument();
    });

    it("Should render links with different locale", () => {
        const localizePath = jest.fn();

        const env = process.env;
        process.env.GATSBY_DEV_SITE_URL = "test.com/";

        const pageContext = { locale: "es-ES", defaultLocale: "en-US", locales: "", localizePath };
        render(
            <LocalizationContext.Provider value={pageContext}>
                <NavBarLink link={link} closebothNavBar={closebothNavBar} />
            </LocalizationContext.Provider>
        );
        expect(screen.getByText("About Casper")).toHaveAttribute("href", "test.com/es-ES/about/");
        process.env = env;
    });

    it("Should render with children", () => {
        renderLink();

        link.link_id.children.forEach((children) => {
            expect(screen.getByText(children.related_link_id.title)).toBeInTheDocument();
        });
    });

    it("Should render without children", () => {
        const tempLinks =
            navBarData.data.directus.header.translations[0].nav_items[0].header_nav_item_id.columns[0].header_nav_column_id.groups[0]
                .header_link_column_id.links[0].link_id.children;
        navBarData.data.directus.header.translations[0].nav_items[0].header_nav_item_id.columns[0].header_nav_column_id.groups[0].header_link_column_id.links[0].link_id.children =
            [];

        const { container } = renderLink();

        expect(container.querySelector(".link")?.classList).toContain("onlyTitle");
        expect(container.querySelectorAll("li")).toHaveLength(1);
        navBarData.data.directus.header.translations[0].nav_items[0].header_nav_item_id.columns[0].header_nav_column_id.groups[0].header_link_column_id.links[0].link_id.children =
            tempLinks;
    });

    it("Should link without type", () => {
        const title = "Macro trends for Casper";
        const tempLinks =
            navBarData.data.directus.header.translations[0].nav_items[0].header_nav_item_id.columns[0].header_nav_column_id.groups[0]
                .header_link_column_id.links[0].link_id.children;
        navBarData.data.directus.header.translations[0].nav_items[0].header_nav_item_id.columns[0].header_nav_column_id.groups[0].header_link_column_id.links[0].link_id.children =
            [
                {
                    related_link_id: {
                        title: title,
                        type: "",
                        url: "/"
                    }
                }
            ];

        renderLink();

        expect(screen.getByText(title)).toBeInTheDocument();
        navBarData.data.directus.header.translations[0].nav_items[0].header_nav_item_id.columns[0].header_nav_column_id.groups[0].header_link_column_id.links[0].link_id.children =
            tempLinks;
    });

    /* As of this commit the navbar doesn't have internal links, so the tests for this are not necessary


    it("Should close NavBar when clicking an internal link", async () => {
        const title = "Macro trends for Casper";
        const tempLinks =
            navBarData.data.directus.header.translations[0].nav_items[0].header_nav_item_id.columns[0].header_nav_column_id.groups[0]
                .header_link_column_id.links[0].link_id.children;
        navBarData.data.directus.header.translations[0].nav_items[0].header_nav_item_id.columns[0].header_nav_column_id.groups[0].header_link_column_id.links[0].link_id.children =
            [
                {
                    related_link_id: {
                        title: title,
                        type: "internal",
                        url: "/"
                    }
                }
            ];

        renderLink();

        const linkElem = screen.getByText(title);
        await User.click(linkElem);
        expect(closebothNavBar).toHaveBeenCalled();

        navBarData.data.directus.header.translations[0].nav_items[0].header_nav_item_id.columns[0].header_nav_column_id.groups[0].header_link_column_id.links[0].link_id.children =
            tempLinks;
    });

    it("Should close NavBar when clicking an external link", async () => {
        const title = "Why Build on Casper";

        renderLink();

        const linkElem = screen.getByText(title);
        await User.click(linkElem);
        expect(closebothNavBar).toHaveBeenCalled();
    });
    */
});

function renderLink() {
    const localizePath = jest.fn();

    const pageContext = { locale: "", defaultLocale: "", locales: "", localizePath };
    return render(
        <LocalizationContext.Provider value={pageContext}>
            <NavBarLink link={link} closebothNavBar={closebothNavBar} />
        </LocalizationContext.Provider>
    );
}
