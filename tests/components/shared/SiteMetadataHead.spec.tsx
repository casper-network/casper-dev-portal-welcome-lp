import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import "../../../__mocks__/matchMedia";
import { data } from "../../../__mocks__/siteMetadataHeadData";
import { SiteMetadataHead } from "../../../src/components/Shared/SiteMetadataHead";
import * as Gatsby from "gatsby";
import * as useSiteMetadata from "../../../src/components/Layout/SiteMetadata";
const useStaticQuery = jest.spyOn(Gatsby, "useStaticQuery");
describe("SiteMetadataHead", () => {
    const env = process.env;
    beforeEach(() => {
        process.env = { ...env };
        useStaticQuery.mockImplementation(() => data.data);
        jest.spyOn(useSiteMetadata, "default").mockReturnValue({ title: "Mock title", description: "Mock description" });
    });

    afterEach(() => {
        process.env = env;
    });
    it("Should render", () => {
        const { container } = render(<SiteMetadataHead locale={"en-us"} />, { container: document.head });
        expect(container.querySelector("title")?.textContent).toBe("Mock title");
    });

    it("Should render site logo", () => {
        const { container } = render(<SiteMetadataHead locale={"en-us"} />, { container: document.head });
        expect(container.querySelector("#site-img")).not.toBeNull();
    });

    it("Should render site logo with environment locale", () => {
        process.env.GATSBY_DEFAULT_LOCALE = "en-US";
        const { container } = render(<SiteMetadataHead locale={"en-us"} />, { container: document.head });
        expect(container.querySelector("#site-img")).not.toBeNull();
    });

    it("Should render with environment locale", () => {
        process.env.GATSBY_DEFAULT_LOCALE = "es-ES";
        const { container } = render(<SiteMetadataHead locale={undefined as any} />, { container: document.head });
        expect(container.querySelector("title")?.textContent).toBe("Mock title");
    });
});
