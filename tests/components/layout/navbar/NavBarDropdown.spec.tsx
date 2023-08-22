import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import "../../../../__mocks__/matchMedia";
import { navBarData } from "../../../../__mocks__/navBarData";
import NavBarColumn from "../../../../src/components/Layout/NavBar/NavBarDropdown/NavBarColumn";
import NavBarDropdown from "../../../../src/components/Layout/NavBar/NavBarDropdown";

const closeNavBarHandler = jest.fn();

jest.mock("../../../../src/components/Layout/NavBar/NavBarDropdown/NavBarColumn");

const content = navBarData.data.directus.header.translations[0].nav_items[0];

describe("NavBarColumn", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it("Should render", () => {
        const { container } = renderColumn();

        expect(container.querySelector(".dropdown")).toBeInTheDocument();
    });

    it("Should render with children", () => {
        const length = content.header_nav_item_id.columns.length;

        renderColumn();

        expect(NavBarColumn).toHaveBeenCalledTimes(length);
    });

    it("Should render without children", () => {
        const tempColumn = navBarData.data.directus.header.translations[0].nav_items[0].header_nav_item_id.columns;
        navBarData.data.directus.header.translations[0].nav_items[0].header_nav_item_id.columns = [];

        renderColumn();

        expect(NavBarColumn).not.toHaveBeenCalled();

        navBarData.data.directus.header.translations[0].nav_items[0].header_nav_item_id.columns = tempColumn;
    });

    it("Should stop propagation on click", () => {
        const onOuterClick = jest.fn();

        const { container } = render(
            <div onClick={onOuterClick}>
                <NavBarDropdown content={content} closeNavBarHandler={closeNavBarHandler} />
            </div>
        );
        const wrapper = container.querySelector(".wrapper")!;
        fireEvent.click(wrapper);

        expect(onOuterClick).toHaveBeenCalledTimes(0);
    });
});

function renderColumn() {
    return render(<NavBarDropdown content={content} closeNavBarHandler={closeNavBarHandler} />);
}
