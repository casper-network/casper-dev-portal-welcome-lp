import "@testing-library/jest-dom";
import "../../../__mocks__/matchMedia";
import * as Gatsby from "gatsby";
import { renderHook } from "@testing-library/react";
import useSiteMetadata from "../../../src/components/Layout/SiteMetadata";

const useStaticQuery = jest.spyOn(Gatsby, "useStaticQuery");

const data = {
    site: {
        siteMetadata: {
            description: "Casper site",
            title: "Casper Site",
            siteUrl: "http://localhost:3000"
        }
    },
    extensions: {}
};

describe("SiteMetadata", () => {
    beforeEach(() => {
        useStaticQuery.mockImplementation(() => data);
    });
    it("Should return site metadata", () => {
        const { result } = renderHook(() => useSiteMetadata());
        expect(result.current).toEqual(data.site.siteMetadata);
    });
});
