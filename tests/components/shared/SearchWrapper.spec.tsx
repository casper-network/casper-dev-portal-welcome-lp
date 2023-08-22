import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import "../../../__mocks__/matchMedia";
import User from "@testing-library/user-event";
import SearchWrapper from "../../../src/components/Shared/Search/SearchWrapper";
import { LocalizationContext } from "../../../src/utils/internationalization/LocalizationContext";

jest.mock("../../../src/components/Shared/Search/SearchResult", () => {
    return {
        __esModule: true,
        default: jest.fn().mockImplementation(() => {
            return <div>hits rendered</div>;
        })
    };
});

describe("SearchWrapper", () => {
    it("Should render", () => {
        const searchFn = jest.fn().mockImplementation(() => new Promise(() => ({ hits: [] })));
        const searchIndexes = [{ base: "/", indexName: "site", client: { indexName: "", search: searchFn } }];
        const placeholderText = "Search";
        render(<SearchWrapper searchIndexes={searchIndexes} locale="en-US" placeholder={placeholderText} hitsPerIndex={4}></SearchWrapper>);

        expect(screen.getByPlaceholderText(placeholderText)).toBeInTheDocument();
    });

    it("Should render hits", async () => {
        const searchFn = jest.fn().mockImplementation(() => ({ hits: [{ path: "/test" }] }));
        const searchIndexes = [{ base: "/", indexName: "site", client: { indexName: "", search: searchFn } }];
        const placeholderText = "Search";

        render(<SearchWrapper searchIndexes={searchIndexes} locale="en-US" placeholder={placeholderText} hitsPerIndex={4}></SearchWrapper>);
        const input = screen.getByPlaceholderText(placeholderText);
        await User.type(input, "test");
        expect(screen.queryByText("hits rendered")).not.toBeInTheDocument();

        await waitFor(() => expect(screen.getAllByText("hits rendered")).toHaveLength(2), { timeout: 1000 });
    });

    it("Should clear search on 'Esc' key press", async () => {
        const searchFn = jest.fn();
        const searchIndexes = [{ base: "/", indexName: "site", client: { indexName: "", search: searchFn } }];
        const placeholderText = "Search";

        render(<SearchWrapper searchIndexes={searchIndexes} locale="en-US" placeholder={placeholderText} hitsPerIndex={4}></SearchWrapper>);
        const input = screen.getByPlaceholderText(placeholderText);
        await User.type(input, "test");
        expect(screen.getByDisplayValue("test")).toBeInTheDocument();

        await waitFor(
            async () => {
                await User.keyboard("{Escape}");
                expect(screen.queryByDisplayValue("test")).not.toBeInTheDocument();
            },
            { timeout: 1000 }
        );
    });
});
