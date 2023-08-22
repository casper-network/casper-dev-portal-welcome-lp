import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import "../../__mocks__/matchMedia";
import { pageContext } from "../../__mocks__/homePageContext";
import HomePageTemplate, { Head } from "../../src/pages/index";

jest.mock("../../src/templates/Home", () => {
    return {
        HomePageTemplate: jest.fn().mockImplementation((props) => {
            return <div>{props.pageContext.page.hero.title}</div>;
        }),
        Head: jest.fn().mockImplementation((props) => {
            return <title>{props.pageContext.page.seo.title}</title>;
        })
    };
});

describe("Home page", () => {
    const env = process.env;
    beforeEach(() => {
        process.env = { ...env };
    });
    afterEach(() => {
        process.env = env;
    });
    it("Should render", () => {
        process.env.GATSBY_DEFAULT_LOCALE = "en-US";
        render(<HomePageTemplate data={pageContext.data} />);
        expect(screen.getByText(/We're glad you're here/i)).toBeInTheDocument();
    });

    it("Should render metadata", () => {
        process.env.GATSBY_DEFAULT_LOCALE = "en-US";
        const { container } = render(<Head data={pageContext.data} />, { container: document.head });
        expect(container.querySelector("title")?.textContent).toBe(pageContext.data.directus.acqlanding.translations[0].seo?.title);
    });
});
