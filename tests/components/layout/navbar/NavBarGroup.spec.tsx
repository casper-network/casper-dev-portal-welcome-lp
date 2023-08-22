import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import "../../../../__mocks__/matchMedia";
import { navBarData } from "../../../../__mocks__/navBarData";
import NavBarGroup from "../../../../src/components/Layout/NavBar/NavBarDropdown/NavBarColumn/NavBarGroup";
import NavBarLink from "../../../../src/components/Layout/NavBar/NavBarDropdown/NavBarColumn/NavBarGroup/NavBarLink";

const group = navBarData.data.directus.header.translations[0].nav_items[0].header_nav_item_id.columns[0].header_nav_column_id.groups[0];
const closeNavBarHandler = jest.fn();

jest.mock("../../../../src/components/Layout/NavBar/NavBarDropdown/NavBarColumn/NavBarGroup/NavBarLink");
describe("NavNarGroup", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("Should render", () => {
        renderGroup();

        expect(screen.getByRole("list")).toBeInTheDocument();
    });

    it("Should render with children", () => {
        const length = group.header_link_column_id.links.length;

        renderGroup();

        expect(NavBarLink).toHaveBeenCalledTimes(length);
    });

    it("Should render without children", () => {
        const tempGroup =
            navBarData.data.directus.header.translations[0].nav_items[0].header_nav_item_id.columns[0].header_nav_column_id.groups[0]
                .header_link_column_id.links;
        navBarData.data.directus.header.translations[0].nav_items[0].header_nav_item_id.columns[0].header_nav_column_id.groups[0].header_link_column_id.links =
            [];
        renderGroup();

        expect(NavBarLink).not.toHaveBeenCalled();

        navBarData.data.directus.header.translations[0].nav_items[0].header_nav_item_id.columns[0].header_nav_column_id.groups[0].header_link_column_id.links =
            tempGroup;
    });
});

function renderGroup() {
    return render(<NavBarGroup group={group} closeNavBarHandler={closeNavBarHandler} />);
}
