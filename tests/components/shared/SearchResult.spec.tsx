import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import "../../../__mocks__/matchMedia";
import User from "@testing-library/user-event";
import SearchResult from "../../../src/components/Shared/Search/SearchResult";
import { LocalizationContext } from "../../../src/utils/internationalization/LocalizationContext";

const hitsShowMore = [
    {
        _highlightResult: {
            title: { matchedWords: [] },
            internal: { content: { matchedWords: ["test"], value: "test result1 " } }
        }
    },
    {
        _highlightResult: {
            title: { matchedWords: [] },
            internal: { content: { matchedWords: ["result"], value: "test result 2" } }
        }
    },
    {
        _highlightResult: {
            title: { matchedWords: [] },
            internal: { content: { matchedWords: [""], value: "test result 3" } }
        }
    },
    {
        _highlightResult: {
            title: { matchedWords: [] },
            internal: { content: { matchedWords: [""], value: "test result 4" } }
        }
    },
    {
        _highlightResult: {
            title: { matchedWords: [] },
            internal: { content: { matchedWords: [""], value: "test result 5" } }
        }
    }
];

describe("SearchResult", () => {
    it("Should render with no results found", () => {
        const hits = [];
        renderSearchResult({ hits: hits, searchTitle: "Portal Results" });

        expect(screen.getByText("No results found")).toBeInTheDocument();
    });

    it("Should render loading spinner when hits is undefined", () => {
        const hits = undefined;
        renderSearchResult({ hits: hits, searchTitle: "Portal Results" });
        const spinner = document.querySelector(".spinner");
        expect(spinner).toBeInTheDocument();
    });

    it("Should render portal results  ", () => {
        const hits = [
            {
                _highlightResult: {
                    title: { matchedWords: ["Test"], value: "Test result" },
                    internal: { content: { matchedWords: ["test"], value: "Test word" } }
                }
            }
        ];

        renderSearchResult({ hits: hits, searchTitle: "Portal Results" });

        expect(screen.getByText("Test result")).toBeInTheDocument();
    });

    it("Should render docs results", () => {
        const hits = [
            {
                url: "https://docs.casper.network/operators/becoming-a-validator/fast-sync/",
                objectID: "0-https://docs.casper.network/operators/becoming-a-validator/fast-sync/",
                _highlightResult: {
                    hierarchy: {
                        lvl0: {
                            value: "Doc hit title",
                            matchLevel: "full",
                            fullyHighlighted: false,
                            matchedWords: ["o"]
                        },
                        lvl1: {
                            value: "Doc hit subtitle",
                            matchLevel: "none",
                            matchedWords: [],
                            url: "https://docs.casper.network/operators/becoming-a-validator/fast-sync/"
                        }
                    }
                }
            },
            {
                url: "https://docs.casper.network/operators/becoming-a-validator/fast-sync/",
                objectID: "0-https://docs.casper.network/operators/becoming-a-validator/fast-sync/",
                _highlightResult: {
                    hierarchy: {
                        lvl0: {
                            value: "Doc hit title",
                            matchLevel: "full",
                            fullyHighlighted: false,
                            matchedWords: ["o"]
                        },
                        lvl1: {
                            value: "Doc hit subtitle 2",
                            matchLevel: "none",
                            matchedWords: [],
                            url: "https://docs.casper.network/operators/becoming-a-validator/fast-sync/"
                        }
                    }
                }
            },
            {
                url: "https://docs.casper.network/operators/becoming-a-validator/fast-sync/",
                objectID: "0-https://docs.casper.network/operators/becoming-a-validator/fast-sync/",
                _highlightResult: {
                    hierarchy: {
                        lvl0: {
                            value: "Doc hit title",
                            matchLevel: "full",
                            fullyHighlighted: false,
                            matchedWords: ["o"]
                        },
                        lvl1: {
                            value: "Doc hit subtitle 23",
                            matchLevel: "none",
                            matchedWords: [],
                            url: "https://docs.casper.network/operators/becoming-a-validator/fast-sync/"
                        },
                        lvl2: {
                            value: "Doc hit sub subtitle 3",
                            matchLevel: "none",
                            matchedWords: [],
                            url: "https://docs.casper.network/operators/becoming-a-validator/fast-sync/"
                        }
                    }
                }
            }
        ];
        renderSearchResult({ hits: hits, searchTitle: "Docs Results" });

        expect(screen.getByText("Doc hit title")).toBeInTheDocument();
        expect(screen.getByText("Doc hit subtitle")).toBeInTheDocument();
    });

    it("Should render with internal content results ", () => {
        const hits = [
            {
                _highlightResult: {
                    title: { matchedWords: [] },
                    internal: { content: { matchedWords: ["test"], value: "Test word" } }
                }
            }
        ];

        renderSearchResult({ hits: hits, searchTitle: "Portal Results" });

        expect(screen.getByText("Test word")).toBeInTheDocument();
    });

    it("Should render with subresult content results ", () => {
        const hits = [
            {
                _highlightResult: {
                    title: { matchedWords: [] },
                    internal: { content: { matchedWords: ["test"], value: "This is a test <em>to</em> test subresults" } }
                }
            }
        ];

        renderSearchResult({ hits: hits, searchTitle: "Portal Results" });

        expect(screen.getByText(/.*test subresults/i)).toBeInTheDocument();
    });

    it("Should close navbar when clicking a link ", async () => {
        const closebothNavBar = jest.fn();
        const hits = [
            {
                _highlightResult: {
                    title: { matchedWords: [] },
                    internal: { content: { matchedWords: ["test"], value: "This is a test <em>to</em> test subresults" } }
                }
            }
        ];

        const { container } = renderSearchResult({ hits: hits, closebothNavBar: closebothNavBar, searchTitle: "Portal Results" });
        const link = container.querySelector(".results_container_hit")!;
        await User.click(link);
        expect(closebothNavBar).toHaveBeenCalled();
    });

    it("Should not close navbar when clicking a link if close nav bar function is undefined", async () => {
        const closebothNavBar = jest.fn();
        const hits = [
            {
                _highlightResult: {
                    title: { matchedWords: [] },
                    internal: { content: { matchedWords: ["test"], value: "This is a test <em>to</em> test subresults" } }
                }
            }
        ];

        const { container } = renderSearchResult({ hits: hits, searchTitle: "Portal Results" });
        const link = container.querySelector(".results_container_hit")!;
        await User.click(link);
        expect(closebothNavBar).not.toHaveBeenCalled();
    });

    it("Should not render hits if the data it's empty", async () => {
        const hits = [
            {
                _highlightResult: {
                    title: { matchedWords: [] },
                    internal: { content: { matchedWords: [] } }
                }
            }
        ];

        const { container } = renderSearchResult({ hits: hits, searchTitle: "Portal Results" });

        expect(container.querySelector(".results_container_hit_link")).not.toBeInTheDocument();
    });

    it("Should display the show more button if there's more than 4 hits", () => {
        renderSearchResult({ hits: hitsShowMore, searchTitle: "Portal Results" });

        expect(screen.getByRole("button", { name: "Show more" })).toBeInTheDocument();
    });

    it("Should display all the hits if 'Show more' button is clicked", async () => {
        renderSearchResult({ hits: hitsShowMore, searchTitle: "Portal Results" });

        const showMoreBtn = screen.getByRole("button", { name: "Show more" });

        expect(screen.queryByText("test result 5")).not.toBeInTheDocument();

        await User.click(showMoreBtn);

        expect(await screen.findByText("test result 5")).toBeInTheDocument();
    });

    it("Should hide results if the collapse button is clicked", async () => {
        renderSearchResult({ hits: hitsShowMore, searchTitle: "Portal Results" });

        const hideResultsBtn = screen.getByText("Portal Results");
        const container = document.querySelector(".results_container");
        expect(container?.classList).not.toContain("hiddenResults");

        await User.click(hideResultsBtn);

        expect(container?.classList).toContain("hiddenResults");
    });
});

interface IRenderType {
    hits: any;
    closebothNavBar?: () => void;
    searchTitle: string;
}

function renderSearchResult({ hits, searchTitle, closebothNavBar }: IRenderType) {
    const localizePath = jest.fn();
    const setHasFocus = jest.fn();
    const pageContext = { locale: "", defaultLocale: "", locales: "", localizePath };
    return render(
        <LocalizationContext.Provider value={pageContext}>
            <SearchResult hits={hits} setHasFocus={setHasFocus} closebothNavBar={closebothNavBar} searchTitle={searchTitle} />;
        </LocalizationContext.Provider>
    );
}
