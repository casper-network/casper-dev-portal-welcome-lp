import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import "../../../../__mocks__/matchMedia";
import { LocalizationContext } from "../../../../src/utils/internationalization/LocalizationContext";
import NavBar from "../../../../src/components/Layout/NavBar";
import * as Gatsby from "gatsby";
import { navBarData } from "../../../../__mocks__/navBarData";
import Search from "../../../../src/components/Shared/Search";
import * as useWindowWidth from "../../../../src/hooks/useWindowWidth";
import LogoNavBar from "../../../../src/components/Layout/NavBar/LogoNavBar";
import Sidebar from "../../../../src/components/Layout/NavBar/Sidebar";
import User from "@testing-library/user-event";
import Nav from "../../../../src/components/Layout/NavBar/Nav";
import * as useWindow from "../../../../src/hooks/useWindow";
import * as useLocalization from "../../../../src/utils/internationalization/useLocalization";

const useStaticQuery = jest.spyOn(Gatsby, "useStaticQuery");
const dropdownItem = "Learn";
const dropdownItem2 = "Build";

const resizeWindow = (x, y) => {
    window.innerWidth = x;
    window.innerHeight = y;
    window.dispatchEvent(new Event("resize"));
};

const localStorageMock = (function () {
    let store = {};

    return {
        getItem(key) {
            return store[key];
        },

        setItem(key, value) {
            store[key] = value;
        },

        clear() {
            store = {};
        },

        removeItem(key) {
            delete store[key];
        },

        getAll() {
            return store;
        }
    };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

jest.mock("../../../../src/components/Shared/Search");
jest.mock("../../../../src/components/Shared/SocialMedia", () => {
    return {
        __esModule: true,
        default: jest.fn().mockImplementation(() => {
            return <div>Social media icons</div>;
        })
    };
});
jest.mock("../../../../src/components/Layout/NavBar/LogoNavBar", () => {
    return {
        __esModule: true,
        default: jest.fn().mockImplementation(({ closeMobileNavbar }) => {
            return <div onClick={closeMobileNavbar}>Logo NavBar</div>;
        })
    };
});
/*
jest.mock("../../../../src/components/Layout/NavBar/Sidebar", () => {
    return {
        __esModule: true,
        default: jest.fn().mockImplementation(({ dropdownOpen, handleClick, dropdownParentRef, sidebarOpen, closebothNavBar }) => {
            return (
                <>
                    <div ref={dropdownParentRef}>
                        <>
                            <button onClick={() => handleClick(dropdownItem)}>Mock result</button>
                            <p id="dropdownOpen">{dropdownOpen ? `${dropdownItem}` : ""}</p>
                            <button onClick={() => handleClick("")}>Mock result empty</button>
                            <button onClick={closebothNavBar}>close navbar</button>
                        </>
                    </div>
                    <div id="sidebarOpen">{sidebarOpen ? "Sidebar open" : ""}</div>
                </>
            );
        })
    };
});
jest.mock("../../../../src/components/Layout/NavBar/Nav", () => {
    return {
        __esModule: true,
        default: jest.fn().mockImplementation(({ dropdownOpen, handleClick, dropdownParentRef }) => {
            return (
                <div ref={dropdownParentRef}>
                    <>
                        <button onClick={() => handleClick(dropdownItem2)}>Mock nav</button>
                        <p>{dropdownOpen ? `${dropdownItem2}` : ""}</p>
                        <button onClick={() => handleClick("")}>Mock nav empty</button>
                    </>
                </div>
            );
        })
    };
});
*/
describe("NavBar", () => {
    const env = process.env;
    const header = navBarData.data.directus.header.translations[0];

    beforeEach(() => {
        useStaticQuery.mockImplementation(() => navBarData.data);
        process.env = { ...env };
    });

    afterEach(() => {
        jest.clearAllMocks();
        localStorageMock.clear();
        process.env = env;
    });

    it("Should render", () => {
        jest.spyOn(useWindowWidth, "default").mockReturnValue(false);

        const { container } = renderNav({});
        expect(container.querySelector("header")).toBeInTheDocument();
    });

    it("Should render LogoNavBar", () => {
        jest.spyOn(useWindowWidth, "default").mockReturnValue(false);
        renderNav({});
        expect(LogoNavBar).toHaveBeenCalled();
    });

    it("Should render with default locale info", () => {
        const localizePath = jest.fn();
        const pageContext = { locale: "", defaultLocale: "", locales: "", localizePath };
        process.env.GATSBY_DEFAULT_LOCALE = "en-US";
        const { container } = render(
            <LocalizationContext.Provider value={pageContext}>
                <NavBar />
            </LocalizationContext.Provider>
        );

        expect(container.querySelector("header")).toBeInTheDocument();
    });

    it("Should render with undefined locale info", () => {
        const localizePath = jest.fn();
        const pageContext = { locale: undefined as any, defaultLocale: "", locales: "", localizePath };
        process.env.GATSBY_DEFAULT_LOCALE = "en-US";
        const { container } = render(
            <LocalizationContext.Provider value={pageContext}>
                <NavBar />
            </LocalizationContext.Provider>
        );

        expect(container.querySelector("header")).toBeInTheDocument();
    });

    it("Should render without user info", () => {
        jest.spyOn(useWindow, "default").mockReturnValue(false);
        const { container } = renderNav({});

        expect(container.querySelector("header")).toBeInTheDocument();
    });

    /* Tests commented in case some of these functions of the navbar gets added again
    it("Should render SocialMedia", () => {
        jest.spyOn(useWindowWidth, "default").mockReturnValue(false);

        renderNav({});
        expect(screen.getByText("Social media icons")).toBeInTheDocument();
    });
    it("Should render Search", () => {
        jest.spyOn(useWindowWidth, "default").mockReturnValue(true);
        renderNav({});
        expect(Search).toHaveBeenCalled();
    });
    
    it("Should render Sidebar", () => {
        jest.spyOn(useWindowWidth, "default").mockReturnValue(false);
        renderNav({});
        expect(Sidebar).toHaveBeenCalled();
    });

    it("Should close Nav when pressing esc key", async () => {
        jest.spyOn(useWindowWidth, "default").mockReturnValue(false);

        renderNav({});

        await User.keyboard("{Esc}");
        expect(Nav).toHaveBeenLastCalledWith(expect.objectContaining({ dropdownOpen: false }), expect.anything());
    });
    it("Should open dropdown onClick and close dropdown on ESC key press", async () => {
        jest.spyOn(useWindow, "default").mockReturnValue(true);

        renderNav({});
        const div = await screen.findByText("Mock result");

        await User.click(div);
        expect(await screen.findByText(dropdownItem)).toBeInTheDocument();

        await User.keyboard("{Escape}");

        expect(screen.queryByText(dropdownItem)).not.toBeInTheDocument();
    });

    it("Should open dropdown onClick and close it when clicking again", async () => {
        jest.spyOn(useWindow, "default").mockReturnValue(true);

        renderNav({});
        const div = await screen.findByText("Mock result");

        await User.click(div);
        expect(await screen.findByText(dropdownItem)).toBeInTheDocument();

        await User.click(div);

        expect(screen.queryByText(dropdownItem)).not.toBeInTheDocument();
    });

    it("Should handle navigation when element has no child items", async () => {
        jest.spyOn(useLocalization, "default").mockImplementation(() => {
            return {
                locale: "",
                localizedNavigate: jest.fn()
            };
        });
        const tempHeader = navBarData.data.directus.header.translations[0].nav_items[0].header_nav_item_id.columns;
        navBarData.data.directus.header.translations[0].nav_items[0].header_nav_item_id.columns = [];

        const localizePath = jest.fn();
        const pageContext = { locale: "en-US", defaultLocale: "en-US", locales: "", localizePath };
        process.env.GATSBY_DEFAULT_LOCALE = "en-US";
        process.env.GATSBY_ALGOLIA_APP_ID = "651965165165";
        process.env.GATSBY_ALGOLIA_SEARCH_KEY = "as142d84as9d4132";
        process.env.GATSBY_ALGOLIA_INDEX = "etr6516er01gv";

        render(
            <LocalizationContext.Provider value={pageContext}>
                <NavBar />
            </LocalizationContext.Provider>
        );
        const div = await screen.findByText("Mock result");

        await User.click(div);
        expect(screen.queryByText(dropdownItem)).not.toBeInTheDocument();
        navBarData.data.directus.header.translations[0].nav_items[0].header_nav_item_id.columns = tempHeader;
    });

    it("Should not navigate when element has no child items", async () => {
        const tempHeader = navBarData.data.directus.header.translations[0].nav_items[0].header_nav_item_id.columns;
        navBarData.data.directus.header.translations[0].nav_items[0].header_nav_item_id.columns = [];

        const localizePath = jest.fn();
        const pageContext = { locale: "en-US", defaultLocale: "en-US", locales: "", localizePath };
        process.env.GATSBY_DEFAULT_LOCALE = "en-US";
        process.env.GATSBY_ALGOLIA_APP_ID = "651965165165";
        process.env.GATSBY_ALGOLIA_SEARCH_KEY = "as142d84as9d4132";
        process.env.GATSBY_ALGOLIA_INDEX = "etr6516er01gv";

        render(
            <LocalizationContext.Provider value={pageContext}>
                <NavBar />
            </LocalizationContext.Provider>
        );
        const div = await screen.findByText("Mock result empty");

        await User.click(div);
        expect(await screen.findByText(dropdownItem)).toBeInTheDocument();
        navBarData.data.directus.header.translations[0].nav_items[0].header_nav_item_id.columns = tempHeader;
    });

    it("Should not open dropdown if window is undefined", async () => {
        jest.spyOn(useWindow, "default").mockReturnValue(false);

        renderNav({});
        const div = await screen.findByText("Mock result");

        await User.click(div);
        expect(screen.queryByText(dropdownItem)).not.toBeInTheDocument();
    });

    it("Should close dropdown when clicking outside", async () => {
        jest.spyOn(useWindow, "default").mockReturnValue(true);
        jest.spyOn(useWindowWidth, "default").mockReturnValue(false);

        renderNav({});

        const icon = await screen.findByText("Social media icons");
        const div = await screen.findByText("Mock result");

        await User.click(div);
        expect(await screen.findByText(dropdownItem)).toBeInTheDocument();
        await User.click(icon);

        expect(screen.queryByText(dropdownItem)).not.toBeInTheDocument();
    });

    it("Should close nav when clicking outside", async () => {
        jest.spyOn(useWindow, "default").mockReturnValue(true);
        jest.spyOn(useWindowWidth, "default").mockReturnValue(true);

        renderNav({});

        const icon = await screen.findByText("Social media icons");
        const div = await screen.findByText("Mock nav");

        await User.click(div);
        expect(await screen.findByText(dropdownItem2)).toBeInTheDocument();
        await User.click(icon);

        expect(screen.queryByText(dropdownItem2)).not.toBeInTheDocument();
    });

    it("Should close nav when clicking outside", async () => {
        jest.spyOn(useWindow, "default").mockReturnValue(true);
        jest.spyOn(useWindowWidth, "default").mockReturnValue(true);

        renderNav({});

        const icon = await screen.findByText("Social media icons");
        const div = await screen.findByText("Mock nav");

        await User.click(div);
        expect(await screen.findByText(dropdownItem2)).toBeInTheDocument();
        await User.click(icon);

        expect(screen.queryByText(dropdownItem2)).not.toBeInTheDocument();
    });

    it("Should open and close sidebar", async () => {
        jest.spyOn(useWindow, "default").mockReturnValue(true);
        jest.spyOn(useWindowWidth, "default").mockReturnValue(false);

        const { container } = renderNav({});

        const icon = container.querySelector(".icon");

        await User.click(icon!);
        expect(await screen.findByText("Sidebar open")).toBeInTheDocument();
        await User.click(icon!);

        expect(screen.queryByText("Sidebar open")).not.toBeInTheDocument();
    });

    it("Should login user", async () => {
        jest.spyOn(useWindow, "default").mockReturnValue(true);
        jest.spyOn(useWindowWidth, "default").mockReturnValue(true);
        const mockReplace = jest.fn();
        Object.defineProperty(window, "location", {
            value: {
                replace: mockReplace,
                pathname: "/testpath.com"
            }
        });
        renderNav({ showLogin: true });

        const btn = screen.getByText("Log In");

        await User.click(btn);

        const items = localStorageMock.getAll();
        expect(items).toEqual({ loginRedirect: "/testpath.com" });
    });

    it("Should not login user if it's not a browser", async () => {
        jest.spyOn(useWindow, "default").mockReturnValue(false);
        jest.spyOn(useWindowWidth, "default").mockReturnValue(true);
        renderNav({ showLogin: true });

        const btn = screen.getByText("Log In");

        await User.click(btn);

        const items = localStorageMock.getAll();
        expect(items).toEqual({});
    });

    it("Should load logged in user", async () => {
        jest.spyOn(useWindow, "default").mockReturnValue(true);
        jest.spyOn(useWindowWidth, "default").mockReturnValue(true);

        localStorageMock.setItem("user", JSON.stringify({ name: "Test username", email: "testemail@test.com" }));
        renderNav({ showLogin: true });

        expect(await screen.findByText("Test username testemail@test.com")).toBeInTheDocument();
    });

    it("Should close mobile navbar when clicking the navbar logo", async () => {
        jest.spyOn(useWindow, "default").mockReturnValue(true);
        jest.spyOn(useWindowWidth, "default").mockReturnValue(true);

        const { container } = renderNav({ showLogin: true });
        const logo = screen.getAllByText("Logo NavBar")[0];
        await User.click(logo);

        await waitFor(() => {
            expect(container.querySelector("#sidebarOpen")?.textContent).toBe("");
        });
    });

    it("Should close both navbar", async () => {
        jest.spyOn(useWindow, "default").mockReturnValue(true);
        jest.spyOn(useWindowWidth, "default").mockReturnValue(true);

        const { container } = renderNav({ showLogin: true });
        const logo = screen.getByText("close navbar");
        await User.click(logo);

        await waitFor(() => {
            expect(container.querySelector("#dropdownOpen")?.textContent).toBe("");
        });
    });
    it("Should not set dropdown content if header data it's empty", async () => {
        const tempData = JSON.parse(JSON.stringify(navBarData));
        tempData.data.directus.header.translations = [];
        useStaticQuery.mockImplementation(() => tempData.data);
        jest.spyOn(useWindow, "default").mockReturnValue(true);
        jest.spyOn(useWindowWidth, "default").mockReturnValue(true);

        const { container } = renderNav({ showLogin: true });

        const btn = screen.getByText("Mock result empty");
        await User.click(btn);

        expect(screen.getByText("Mock result")).toBeInTheDocument();
    });

    it("Should not set dropdown content if header data it's empty", async () => {
        const tempData = JSON.parse(JSON.stringify(navBarData));
        tempData.data.directus.header.translations = [];
        useStaticQuery.mockImplementation(() => tempData.data);
        jest.spyOn(useWindow, "default").mockReturnValue(true);
        jest.spyOn(useWindowWidth, "default").mockReturnValue(true);

        const { container } = renderNav({ showLogin: true });

        const btn = screen.getByText("Mock result empty");
        await User.click(btn);

        expect(screen.getByText("Mock result")).toBeInTheDocument();
    });
    */
});

function renderNav({ showLogin = false }) {
    const localizePath = jest.fn();
    const pageContext = { locale: "en-US", defaultLocale: "en-US", locales: "", localizePath };
    process.env.GATSBY_DEFAULT_LOCALE = "en-US";
    process.env.GATSBY_ALGOLIA_APP_ID = "651965165165";
    process.env.GATSBY_ALGOLIA_SEARCH_KEY = "as142d84as9d4132";
    process.env.GATSBY_ALGOLIA_INDEX = "etr6516er01gv";
    process.env.GATSBY_GH_CLIENT_ID = "111111";
    process.env.GATSBY_GH_SCOPES = "scope";
    return render(
        <LocalizationContext.Provider value={pageContext}>
            <NavBar showLogin={showLogin} />
        </LocalizationContext.Provider>
    );
}
