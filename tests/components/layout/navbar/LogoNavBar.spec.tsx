import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import "../../../../__mocks__/matchMedia";
import { LocalizationContext } from "../../../../src/utils/internationalization/LocalizationContext";
import { navBarData } from "../../../../__mocks__/navBarData";
import LogoNavBar from "../../../../src/components/Layout/NavBar/LogoNavBar";
import User from "@testing-library/user-event";

const closeMobileNavbar = jest.fn();

const header = navBarData.data.directus.header.translations[0];
describe("LogoNavBar", () => {
    it("Should render", () => {
        const { container } = renderLogo();
        expect(screen.getByTitle(header.logo.title)).toBeInTheDocument();
        expect(container.querySelector("svg")).toBeInTheDocument();
    });

    it("Should not render", () => {
        const tempHeader = header.logo.imageFile.fields.svg;
        header.logo.imageFile.fields.svg = "";
        const { container } = renderLogo();
        expect(screen.queryByTitle(header.logo.title)).not.toBeInTheDocument();
        expect(container.querySelector("svg")).not.toBeInTheDocument();

        header.logo.imageFile.fields.svg = tempHeader;
    });

    it("Should call closeNavBarHandler onClick", async () => {
        renderLogo();
        const logo = screen.getByTitle(header.logo.title);

        await User.click(logo);

        expect(closeMobileNavbar).toHaveBeenCalled();
    });
});

function renderLogo() {
    const localizePath = jest.fn();
    const pageContext = { locale: "en-US", defaultLocale: "en-US", locales: "", localizePath };
    return render(
        <LocalizationContext.Provider value={pageContext}>
            <LogoNavBar header={header} closeMobileNavbar={closeMobileNavbar} />
        </LocalizationContext.Provider>
    );
}
