import React, { RefObject, useRef } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import "../../../../__mocks__/matchMedia";
import User from "@testing-library/user-event";
import Nav from "../../../../src/components/Layout/NavBar/Nav";
import { navBarData } from "../../../../__mocks__/navBarData";
import NavBarDropdown from "../../../../src/components/Layout/NavBar/NavBarDropdown";
import { CSSTransition } from "react-transition-group";
const header = navBarData.data.directus.header.translations[0];
const buttonText = header.nav_items.map((item) => item.header_nav_item_id.title);
const handleClick = jest.fn();
const closeNavBarHandler = jest.fn();
jest.mock("../../../../src/components/Layout/NavBar/NavBarDropdown", () => {
    return {
        __esModule: true,
        default: jest.fn().mockImplementation(({ content }) => {
            return <div>{`Test mock ${content ? content.header_nav_item_id?.title : undefined}`}</div>;
        })
    };
});

jest.mock("react-transition-group", () => {
    return {
        __esModule: true,
        CSSTransition: jest.fn().mockImplementation(({ children }) => {
            return <div>{children}</div>;
        })
    };
});

describe("NavBar Nav", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it("Should render", () => {
        renderNav({});
        buttonText.forEach((item) => {
            expect(screen.getByText(item)).toBeInTheDocument();
        });
    });

    it("Should render button with isActive style", () => {
        const { container } = renderNav({ current: "Learn" });

        expect(container.querySelector(".navbar_list_item")?.classList).toContain("isActive");
    });

    it("Should call handleClick on click", async () => {
        renderNav({ current: "Learn" });

        const btn = screen.getByText("Learn");
        await User.click(btn);

        expect(handleClick).toHaveBeenCalledWith("Learn");
    });

    it("Should call handleClick without title", async () => {
        const tempHeader = navBarData.data.directus.header.translations[0].nav_items[0].header_nav_item_id.title;
        navBarData.data.directus.header.translations[0].nav_items[0].header_nav_item_id.title = "";
        renderNav({});
        const btn = screen.getAllByRole("button")[0];
        await User.click(btn);

        expect(handleClick).toHaveBeenCalledWith("");

        navBarData.data.directus.header.translations[0].nav_items[0].header_nav_item_id.title = tempHeader;
    });

    it("Should render navBarDropdown", async () => {
        const item = header.nav_items[0].header_nav_item_id.title;
        renderNav({});

        expect(screen.getByText(`Test mock ${item}`)).toBeInTheDocument();
    });
    it("Should render dropdown with null content", () => {
        const tempHeader = navBarData.data.directus.header.translations[0].nav_items[0];
        navBarData.data.directus.header.translations[0].nav_items[0] = undefined as any;

        renderNav({});
        expect(screen.getByText("Test mock undefined")).toBeInTheDocument();

        navBarData.data.directus.header.translations[0].nav_items[0] = tempHeader;
    });
});

function MockParent({ dropdownOpen, current }) {
    const dropdownParentRef = useRef<HTMLElement>(null);
    return (
        <>
            <Nav
                dropdownParentRef={dropdownParentRef}
                header={header}
                handleClick={handleClick}
                dropdownOpen={dropdownOpen}
                current={current}
                closeNavBarHandler={closeNavBarHandler}
            ></Nav>
        </>
    );
}

function renderNav({ dropdownOpen = true, current = "" }) {
    return render(<MockParent dropdownOpen={dropdownOpen} current={current} />);
}
