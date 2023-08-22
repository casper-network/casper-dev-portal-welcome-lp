import React, { useEffect, useState, useMemo } from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import "../../../__mocks__/matchMedia";
import "../../../__mocks__/intersectionObserverMock";
import Search from "../../../src/components/Shared/Search";

function MockWrapper({ searchIndexes }: any) {
    return (
        <>
            {searchIndexes.length === 1 && <div>App index search</div>}
            {searchIndexes.length === 2 && <div>Both index search</div>}
        </>
    );
}

jest.mock("../../../src/components/Shared/Search/SearchWrapper", () => {
    return {
        __esModule: true,
        default: jest.fn().mockImplementation(({ searchIndexes }) => {
            return <MockWrapper searchIndexes={searchIndexes}></MockWrapper>;
        })
    };
});
jest.mock("react", () => {
    const mockObj = {
        transporter: {
            hostsCache: {},
            logger: {},
            requester: {},
            requestsCache: {},
            responsesCache: {},
            timeouts: {
                connect: 1,
                read: 2,
                write: 30
            },
            userAgent: {
                value: "Algolia for JavaScript (4.15.0); Browser (lite)"
            },
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
            queryParameters: {
                "x-algolia-api-key": "af7a6ce8d3468b0da447654b3f9906a2",
                "x-algolia-application-id": "test"
            },
            hosts: [
                {
                    protocol: "https",
                    url: "test-dsn.algolia.net",
                    accept: 1
                },
                {
                    protocol: "https",
                    url: "test.algolia.net",
                    accept: 2
                },
                {
                    protocol: "https",
                    url: "test-2.algolianet.com",
                    accept: 3
                },
                {
                    protocol: "https",
                    url: "test-3.algolianet.com",
                    accept: 3
                },
                {
                    protocol: "https",
                    url: "test-1.algolianet.com",
                    accept: 3
                }
            ]
        },
        appId: "test"
    };
    return {
        ...jest.requireActual("react"),
        useMemo: jest.fn().mockReturnValue({
            ...mockObj,
            initIndex: jest.fn().mockImplementation(() => mockObj),
            search: jest.fn().mockImplementation(() => {})
        })
    };
});

describe("Search", () => {
    let envData;
    beforeEach(() => {
        envData = { ...process.env };
    });
    afterEach(() => {
        process.env = envData;
    });
    it("Should render only app client results", () => {
        render(<Search index={{ name: "", title: "" }} locale="" placeholder="Search" />);

        expect(screen.getByText("App index search")).toBeInTheDocument();
    });

    it("Should render both client results", () => {
        process.env.GATSBY_ALGOLIA_APP_ID = "mockedAppId";
        process.env.GATSBY_ALGOLIA_SEARCH_KEY = "mockedSearchKey";
        process.env.GATSBY_ALGOLIA_INDEX_NAME = "mockedIndexName";
        process.env.GATSBY_DOCS_SITE_URL = "mockedDocsSiteUrl";
        process.env.GATSBY_DOCS_ALGOLIA_APP_ID = "mockedDocsAppId";
        process.env.GATSBY_DOCS_ALGOLIA_SEARCH_KEY = "mockedDocsSearchKey";
        process.env.GATSBY_DOCS_ALGOLIA_INDEX_NAME = "mockedDocsIndexName";

        render(<Search index={{ name: "", title: "" }} locale="" placeholder="Search" />);

        expect(screen.getByText("Both index search")).toBeInTheDocument();
    });
});
