import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import "../../../__mocks__/matchMedia";
import SocialMedia from "../../../src/components/Shared/SocialMedia";
import * as Gatsby from "gatsby";
import { socialMediaData } from "../../../__mocks__/socialMediaData";
const useStaticQuery = jest.spyOn(Gatsby, "useStaticQuery");

describe("SocialMedia", () => {
    const socialMedia = socialMediaData.data.directus.social_media;
    beforeEach(() => {
        useStaticQuery.mockImplementation(() => socialMediaData.data);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("Should render", () => {
        const { container } = render(<SocialMedia />);

        const links = screen.getAllByRole("link");
        expect(links).toHaveLength(socialMedia.length);
        links.forEach((link, i) => {
            expect(link.getAttribute("title")).toBe(`Go to ${socialMedia[i].name}`);
            expect(link.getAttribute("href")).toBe(socialMedia[i].url);
        });
        expect(container.querySelectorAll("svg")).toHaveLength(socialMedia.length);
    });

    it("Should not render links", () => {
        const socialCopy = socialMediaData.data.directus.social_media;
        socialMediaData.data.directus.social_media = [];

        const { container } = render(<SocialMedia />);

        expect(screen.queryAllByRole("link")).toHaveLength(0);
        expect(container.querySelectorAll("svg")).toHaveLength(0);
        socialMediaData.data.directus.social_media = socialCopy;
    });

    it("Should render with fallback title", () => {
        const title = socialMediaData.data.directus.social_media[0].icon.title;
        socialMediaData.data.directus.social_media[0].icon.title = "";
        const fallback = "social media link";

        render(<SocialMedia />);

        const links = screen.getAllByRole("link");
        expect(links[0].getAttribute("title")).toBe(fallback);

        socialMediaData.data.directus.social_media[0].icon.title = title;
    });
});
