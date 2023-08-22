import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import "../../../../__mocks__/matchMedia";
import { navBarData } from "../../../../__mocks__/navBarData";
import NavBarGroup from "../../../../src/components/Layout/NavBar/NavBarDropdown/NavBarColumn/NavBarGroup";
import NavBarColumn from "../../../../src/components/Layout/NavBar/NavBarDropdown/NavBarColumn";

const column = navBarData.data.directus.header.translations[0].nav_items[0].header_nav_item_id.columns[0];

const closeNavBarHandler = jest.fn();
jest.mock("../../../../src/components/Layout/NavBar/NavBarDropdown/NavBarColumn/NavBarGroup");

describe("NavBarColumn", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it("Should render", () => {
        const { container } = renderColumn();

        expect(container.querySelector(".dropdown_column")).toBeInTheDocument();
    });

    it("Should render with children", () => {
        const length = column.header_nav_column_id.groups.length;
        renderColumn();

        expect(NavBarGroup).toHaveBeenCalledTimes(length);
    });

    it("Should render without children", () => {
        const tempColumn =
            navBarData.data.directus.header.translations[0].nav_items[0].header_nav_item_id.columns[0].header_nav_column_id.groups;
        navBarData.data.directus.header.translations[0].nav_items[0].header_nav_item_id.columns[0].header_nav_column_id.groups = [];

        renderColumn();

        expect(NavBarGroup).not.toHaveBeenCalled();

        navBarData.data.directus.header.translations[0].nav_items[0].header_nav_item_id.columns[0].header_nav_column_id.groups = tempColumn;
    });
});

function renderColumn() {
    return render(<NavBarColumn column={column} closeNavBarHandler={closeNavBarHandler} />);
}
