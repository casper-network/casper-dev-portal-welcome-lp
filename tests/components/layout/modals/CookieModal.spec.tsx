import React from "react";
import { findByText, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import "../../../../__mocks__/matchMedia";
import CookieModal from "../../../../src/components/Layout/Modals/CookieModal";
import * as Gatsby from "gatsby";
import { cookieModalData } from "../../../../__mocks__/cookieModalData";
import { LocalizationContext } from "../../../../src/utils/internationalization/LocalizationContext";
import User from "@testing-library/user-event";
import Cookies from "js-cookie";
import * as useLocalization from "../../../../src/utils/internationalization/useLocalization";
import { ModalContext } from "../../../../src/context/ModalContext";

const mockCookies = (necessary, performance, functional, marketing) => [
    {
        name: "necessary",
        value: necessary
    },
    {
        name: "performance",
        value: performance
    },
    {
        name: "functional",
        value: functional
    },
    {
        name: "marketing",
        value: marketing
    }
];

const useStaticQuery = jest.spyOn(Gatsby, "useStaticQuery");
describe("CookieModal", () => {
    const env = process.env;

    beforeEach(() => {
        process.env = { ...env };
        useStaticQuery.mockImplementation(() => cookieModalData.data);
    });

    afterEach(() => {
        process.env = env;
        Cookies.remove("cookie-prefs");
    });

    it("Should render with notice modal", () => {
        renderModal();

        expect(screen.getByText("Before you start")).toBeInTheDocument();
        expect(screen.queryByText("We care about your privacy")).not.toBeInTheDocument();
    });

    it("Should render with default locale", async () => {
        const localizePath = jest.fn();
        const pageContext = { locale: undefined as any, defaultLocale: "", locales: "", localizePath };
        process.env.GATSBY_DEFAULT_LOCALE = "en-EN";
        render(
            <LocalizationContext.Provider value={pageContext}>
                <CookieModal />
            </LocalizationContext.Provider>
        );
        renderModal();

        expect(screen.getByText("Before you start")).toBeInTheDocument();
    });

    it("Should save all cookies", async () => {
        const mockReload = jest.fn();
        Object.defineProperty(window, "location", {
            value: {
                reload: mockReload
            }
        });

        renderModal();
        const btn = screen.getByText("Allow All");

        await User.click(btn);
        const result = Cookies.get("cookie-prefs");
        expect(result).toEqual(JSON.stringify(mockCookies(true, true, true, true)));
        expect(mockReload).toHaveBeenCalled();
    });

    it("Should display manage cookies", async () => {
        renderModal();

        const btn = screen.getByText("Manage Cookies");

        await User.click(btn);
        expect(screen.queryByText("Before you start")).not.toBeInTheDocument();
        expect(await screen.findByText("We care about your privacy")).toBeInTheDocument();
    });

    it("Should save only necessary cookie", async () => {
        renderModal();
        const manage = screen.getByText("Manage Cookies");
        await User.click(manage);
        const confirm = screen.getByText("Confirm Choices");
        await User.click(confirm);

        const result = Cookies.get("cookie-prefs");
        expect(result).toEqual(JSON.stringify(mockCookies(true, false, false, false)));
    });

    it("Should save only selected cookies", async () => {
        const { container } = renderModal();
        const manage = screen.getByText("Manage Cookies");
        await User.click(manage);
        const marketing = container.querySelector("label[for='cookie-Marketing Cookies']");
        const functional = container.querySelector("label[for='cookie-Functional Cookies']");
        await User.click(marketing!);
        await User.click(functional!);
        const confirm = screen.getByText("Confirm Choices");
        await User.click(confirm);

        const result = Cookies.get("cookie-prefs");
        expect(result).toEqual(JSON.stringify(mockCookies(true, false, true, true)));
    });

    it("Should render checked cookies", async () => {
        Cookies.set("cookie-prefs", JSON.stringify(mockCookies(true, false, false, true)));
        const { container } = renderModal();
        expect(screen.getByText("We care about your privacy")).toBeInTheDocument();

        const performance = container.querySelector("input[id='cookie-Performance Cookies']") as HTMLInputElement;
        const functional = container.querySelector("input[id='cookie-Functional Cookies']") as HTMLInputElement;
        const marketing = container.querySelector("input[id='cookie-Marketing Cookies']") as HTMLInputElement;

        expect(performance.checked).toBe(false);
        expect(functional.checked).toBe(false);
        expect(marketing.checked).toBe(true);
    });

    it("Should check cookies pressing enter", async () => {
        const { container } = renderModal();
        const manage = screen.getByText("Manage Cookies");
        await User.click(manage);

        const performance = container.querySelector("input[id='cookie-Performance Cookies']") as HTMLInputElement;
        const functional = container.querySelector("input[id='cookie-Functional Cookies']") as HTMLInputElement;
        const marketing = container.querySelector("input[id='cookie-Marketing Cookies']") as HTMLInputElement;

        const performanceLabel = container.querySelector("label[for='cookie-Performance Cookies']");
        const functionalLabel = container.querySelector("label[for='cookie-Functional Cookies']");

        fireEvent.keyUp(performanceLabel!, { key: "Enter" });
        fireEvent.keyUp(functionalLabel!, { key: "Enter" });

        expect(performance.checked).toBe(true);
        expect(functional.checked).toBe(true);
        expect(marketing.checked).toBe(false);
    });

    it("Shouldn't check cookies pressing enter", async () => {
        const { container } = renderModal();
        const manage = screen.getByText("Manage Cookies");
        await User.click(manage);

        const performance = container.querySelector("input[id='cookie-Performance Cookies']") as HTMLInputElement;

        const performanceLabel = container.querySelector("label[for='cookie-Performance Cookies']");

        fireEvent.keyUp(performanceLabel!, { key: "Escape" });

        expect(performance.checked).toBe(false);
    });

    it("Should get checked without checkbox value", async () => {
        const cookiesTemp = cookieModalData.data.directus.cookie_banner.translations[0].items[1].cookie_item_id.required;
        cookieModalData.data.directus.cookie_banner.translations[0].items[0].cookie_item_id.required = undefined as any;

        const { container } = renderModal();

        const btn = screen.getByText("Manage Cookies");

        await User.click(btn);

        const performance = container.querySelector("input[id='cookie-Performance Cookies']") as HTMLInputElement;

        expect(performance.checked).toBe(false);
        cookieModalData.data.directus.cookie_banner.translations[0].items[0].cookie_item_id.required = cookiesTemp;
    });

    it("Should get checked without checkbox value", async () => {
        const cookiesTemp = cookieModalData.data.directus.cookie_banner.translations[0].items[1].cookie_item_id.required;
        cookieModalData.data.directus.cookie_banner.translations[0].items[0].cookie_item_id.required = undefined as any;

        const { container } = renderModal();

        const btn = screen.getByText("Manage Cookies");

        await User.click(btn);

        const performance = container.querySelector("input[id='cookie-Performance Cookies']") as HTMLInputElement;

        expect(performance.checked).toBe(false);
        cookieModalData.data.directus.cookie_banner.translations[0].items[0].cookie_item_id.required = cookiesTemp;
    });

    it("Manage cookies body shouldn't have text", async () => {
        const cookiesTemp = cookieModalData.data.directus.cookie_banner.translations[0].manage_body;
        cookieModalData.data.directus.cookie_banner.translations[0].manage_body = undefined as any;
        const { container } = renderModal();

        const btn = screen.getByText("Manage Cookies");

        await User.click(btn);

        const body = container.querySelector(".primaryParagraph.content_text");
        expect(body?.textContent).toBe("");

        cookieModalData.data.directus.cookie_banner.translations[0].manage_body = cookiesTemp;
    });

    it("Manage cookies - cookie description shouldn't have text", async () => {
        const cookiesTemp = cookieModalData.data.directus.cookie_banner.translations[0].items[0].cookie_item_id.description;
        cookieModalData.data.directus.cookie_banner.translations[0].items[0].cookie_item_id.description = undefined as any;
        const { container } = renderModal();

        const btn = screen.getByText("Manage Cookies");

        await User.click(btn);

        const description = container.querySelectorAll(".secondaryParagraph.item_text")[0];
        expect(description?.textContent).toBe("");

        cookieModalData.data.directus.cookie_banner.translations[0].items[0].cookie_item_id.description = cookiesTemp;
    });

    it("Manage cookies confirm button shouldn't have text", async () => {
        const cookiesTemp = cookieModalData.data.directus.cookie_banner.translations[0].confirm_button_text;
        cookieModalData.data.directus.cookie_banner.translations[0].confirm_button_text = undefined as any;
        const { container } = renderModal();

        const btn = screen.getByText("Manage Cookies");

        await User.click(btn);
        const button = container.querySelector(".buttons_container")?.children[0];
        expect(button?.textContent).toBe("");

        cookieModalData.data.directus.cookie_banner.translations[0].confirm_button_text = cookiesTemp;
    });

    it("Should render without hidden styles", async () => {
        const localizePath = jest.fn();
        const pageContext = { locale: "en-US", defaultLocale: "en-US", locales: "", localizePath };
        process.env.GATSBY_DEFAULT_LOCALE = "en-US";
        const setShowCookieModal = jest.fn();
        const { container } = render(
            <ModalContext.Provider value={{ showCookieModal: true, setShowCookieModal: setShowCookieModal }}>
                <LocalizationContext.Provider value={pageContext}>
                    <CookieModal />
                </LocalizationContext.Provider>
            </ModalContext.Provider>
        );

        expect(container.querySelector(".modal")?.classList).not.toContain("hidden");
    });

    it("Should remove prevent scroll from the document when the modal its closed", async () => {
        const localizePath = jest.fn();
        const pageContext = { locale: "en-US", defaultLocale: "en-US", locales: "", localizePath };
        process.env.GATSBY_DEFAULT_LOCALE = "en-US";
        const setShowCookieModal = jest.fn();
        const { container } = render(
            <ModalContext.Provider value={{ showCookieModal: false, setShowCookieModal: setShowCookieModal }}>
                <LocalizationContext.Provider value={pageContext}>
                    <CookieModal />
                </LocalizationContext.Provider>
            </ModalContext.Provider>
        );
        expect(container.parentElement).not.toHaveClass("preventScrollDocument");
    });

    it("Should add prevent scroll from the document when the modal its open", async () => {
        const localizePath = jest.fn();
        const pageContext = { locale: "en-US", defaultLocale: "en-US", locales: "", localizePath };
        process.env.GATSBY_DEFAULT_LOCALE = "en-US";
        const setShowCookieModal = jest.fn();
        const { container } = render(
            <ModalContext.Provider value={{ showCookieModal: true, setShowCookieModal: setShowCookieModal }}>
                <LocalizationContext.Provider value={pageContext}>
                    <CookieModal />
                </LocalizationContext.Provider>
            </ModalContext.Provider>
        );
        expect(container.parentElement).toHaveClass("preventScrollDocument");
    });
});

function renderModal() {
    const localizePath = jest.fn();
    const pageContext = { locale: "en-US", defaultLocale: "en-US", locales: "", localizePath };
    process.env.GATSBY_DEFAULT_LOCALE = "en-US";

    return render(
        <LocalizationContext.Provider value={pageContext}>
            <CookieModal />
        </LocalizationContext.Provider>
    );
}
