import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import "../../../../__mocks__/matchMedia";
import { LocalizationContext } from "../../../../src/utils/internationalization/LocalizationContext";
import Footer from "../../../../src/components/Layout/Footer";
import * as Gatsby from "gatsby";
import { footerData } from "../../../../__mocks__/footerData";
import SocialMedia from "../../../../src/components/Shared/SocialMedia";
import Nav from "../../../../src/components/Layout/Footer/Nav";
import LocalizedLink from "../../../../src/utils/internationalization/LocalizedLink";
import User from "@testing-library/user-event";
import { ModalContext } from "../../../../src/context/ModalContext";

const useStaticQuery = jest.spyOn(Gatsby, "useStaticQuery");
jest.mock("../../../../src/components/Shared/SocialMedia");
jest.mock("../../../../src/components/Layout/Footer/Nav");
jest.mock("../../../../src/utils/internationalization/LocalizedLink");

describe("Footer", () => {
    const env = process.env;
    const footer = footerData.data.directus.footer.translations[1];
    beforeEach(() => {
        useStaticQuery.mockImplementation(() => footerData.data);
        jest.resetModules();
        process.env = { ...env };
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
        process.env = env;
    });

    it("Should render", () => {
        const title = footer.title;
        const description = footer.description;

        renderFooter();

        expect(screen.getByText(title!)).toBeInTheDocument();
        expect(screen.getByText(description!)).toBeInTheDocument();
    });

    it("Should render SocialMedia", () => {
        renderFooter();

        expect(SocialMedia).toHaveBeenCalled();
    });

    it("Should render Nav", () => {
        renderFooter();

        expect(Nav).toHaveBeenCalledWith(expect.objectContaining({ footer: footer }), expect.anything());
    });

    it("Shouldn't render Nav", () => {
        const linkColumn = footer.link_column;
        footer.link_column = [];
        renderFooter();

        expect(Nav).toHaveBeenCalledWith(
            expect.objectContaining({ footer: footerData.data.directus.footer.translations[1] }),
            expect.anything()
        );
        footer.link_column = linkColumn;
    });

    it("Should render Logo", () => {
        const title = footer.logo?.title;

        renderFooter();

        expect(LocalizedLink).toHaveBeenCalledWith(expect.objectContaining({ to: "/", title: title }), expect.anything());
    });

    it("Shouldn't render Logo", () => {
        const title = footer.logo?.title;
        const logo = footer.logo!.imageFile.fields.svg;
        footer.logo!.imageFile.fields.svg = "";
        useStaticQuery.mockImplementation(() => footerData.data);
        renderFooter();

        expect(LocalizedLink).not.toHaveBeenCalledWith(expect.objectContaining({ to: "/", title: title }), expect.anything());

        footer.logo!.imageFile.fields.svg = logo;
    });

    it("Should render external button links", () => {
        const links = footer.bottom_links;
        links.forEach((link) => {
            link.link_id.type = "external";
        });
        renderFooter();
        links.forEach((link) => {
            expect(screen.getByText(link.link_id.title)).toBeInTheDocument();
        });
        expect(screen.getAllByRole("link")).toHaveLength(footer.bottom_links.length);
    });

    it("Should render with default locale info", () => {
        const localizePath = jest.fn();
        const pageContext = { locale: "", defaultLocale: "", locales: "", localizePath };
        process.env.GATSBY_DEFAULT_LOCALE = "en-US";
        render(
            <LocalizationContext.Provider value={pageContext}>
                <Footer />
            </LocalizationContext.Provider>
        );

        expect(screen.getByText(footer.title!)).toBeInTheDocument();
    });

    it("Should render with env locale", () => {
        const localizePath = jest.fn();
        const pageContext = { locale: undefined as any, defaultLocale: "", locales: "", localizePath };
        process.env.GATSBY_DEFAULT_LOCALE = "en-US";
        render(
            <LocalizationContext.Provider value={pageContext}>
                <Footer />
            </LocalizationContext.Provider>
        );

        expect(screen.getByText(footer.title!)).toBeInTheDocument();
    });

    it("Should show cookie modal on click", async () => {
        const localizePath = jest.fn();
        const pageContext = { locale: "en-US", defaultLocale: "en-US", locales: "", localizePath };
        const setShowCookieModal = jest.fn();
        process.env.GATSBY_DEFAULT_LOCALE = "en-US";
        render(
            <ModalContext.Provider value={{ setShowCookieModal: setShowCookieModal }}>
                <LocalizationContext.Provider value={pageContext}>
                    <Footer />
                </LocalizationContext.Provider>
            </ModalContext.Provider>
        );

        const btn = await screen.findByRole("button");
        await User.click(btn);

        expect(setShowCookieModal).toHaveBeenCalledWith(true);
    });
});

function renderFooter() {
    const localizePath = jest.fn();
    const pageContext = { locale: "en-US", defaultLocale: "en-US", locales: "", localizePath };
    process.env.GATSBY_DEFAULT_LOCALE = "en-US";
    process.env.GATSBY_DEV_SITE_URL = "test.com";
    return render(
        <LocalizationContext.Provider value={pageContext}>
            <Footer />
        </LocalizationContext.Provider>
    );
}
