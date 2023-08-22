import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import "../../../../__mocks__/matchMedia";
import { navBarData } from "../../../../__mocks__/navBarData";
import SocialMedia from "../../../../src/components/Shared/SocialMedia";
import Search from "../../../../src/components/Shared/Search";
import Sidebar from "../../../../src/components/Layout/NavBar/Sidebar";
import Nav from "../../../../src/components/Layout/NavBar/Nav";

const header = navBarData.data.directus.header.translations[0];
const handleClick = jest.fn();
jest.mock("../../../../src/components/Shared/Search");
jest.mock("../../../../src/components/Layout/NavBar/Nav");
jest.mock("../../../../src/components/Shared/SocialMedia");
describe("Sidebar", () => {
    const env = process.env;

    beforeEach(() => {
        process.env = { ...env };
    });

    afterEach(() => {
        jest.clearAllMocks();
        process.env = env;
    });

    it("Should render", () => {
        const { container } = renderSidebar({});

        expect(container.querySelector(".sidebar_container")).toBeVisible();
    });

    it("Should  be visible when sidebar its open", () => {
        const { container } = renderSidebar({ sidebarOpen: true });

        expect(container.querySelector(".sidebar")?.classList).toContain("sidebarOpen");
    });

    it("Should not be visible when sidebar its closed", () => {
        const { container } = renderSidebar({ sidebarOpen: false });

        expect(container.querySelector(".sidebar")?.classList).not.toContain("sidebarOpen");
    });

    it("Should render SocialMedia", () => {
        renderSidebar({});

        expect(SocialMedia).toHaveBeenCalled();
    });

    it("Should render Search if there's a search placeholder", () => {
        renderSidebar({});

        expect(Search).toHaveBeenCalled();
    });

    it("Should not render Search if there isn't a search placeholder", () => {
        const tempHeader = navBarData.data.directus.header.translations[0].search_placeholder;
        navBarData.data.directus.header.translations[0].search_placeholder = "";
        renderSidebar({});

        expect(Search).not.toHaveBeenCalled();
        navBarData.data.directus.header.translations[0].search_placeholder = tempHeader;
    });

    it("Should  render Nav if there's' nav items", () => {
        renderSidebar({});

        expect(Nav).toHaveBeenCalled();
    });
});

function renderSidebar({ sidebarOpen = true, dropdownOpen = true }) {
    process.env.GATSBY_ALGOLIA_APP_ID = "651965165165";
    process.env.GATSBY_ALGOLIA_SEARCH_KEY = "as142d84as9d4132";
    process.env.GATSBY_ALGOLIA_INDEX = "etr6516er01gv";
    return render(
        <Sidebar
            sidebarOpen={sidebarOpen}
            header={header}
            currentLocale="en-US"
            dropdownParentRef={{} as any}
            handleClick={handleClick}
            dropdownOpen={dropdownOpen}
            current={""}
            closebothNavBar={jest.fn()}
        />
    );
}
