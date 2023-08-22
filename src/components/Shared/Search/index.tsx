import algoliasearch, { SearchClient } from "algoliasearch/lite";
import React, { useMemo } from "react";
import SearchWrapper from "./SearchWrapper";

interface ISearchProps {
    index: {
        name: string;
        title: string;
    };
    locale: string;
    placeholder: string;
    closebothNavBar?: () => void;
}

export default function Search({ index, placeholder, locale, closebothNavBar }: ISearchProps) {
    let indexesArray: any[] = [];
    const algoliaAppClient = useMemo(() => algoliasearch(process.env.GATSBY_ALGOLIA_APP_ID!, process.env.GATSBY_ALGOLIA_SEARCH_KEY!), []);
    const searchAppClient: SearchClient = {
        ...algoliaAppClient,
        search(requests) {
            // -- Return default response in case that the query is empty
            if (requests.every(({ params }) => !params || !params.query)) {
                return Promise.resolve({
                    results: requests.map(() => ({
                        hits: [],
                        nbHits: 0,
                        nbPages: 0,
                        page: 0,
                        processingTimeMS: 0,
                        hitsPerPage: 0,
                        exhaustiveNbHits: false,
                        query: "",
                        params: ""
                    }))
                });
            }

            return algoliaAppClient.search(requests);
        }
    };
    const appIndex = {
        base: null,
        client: searchAppClient.initIndex(process.env.GATSBY_ALGOLIA_INDEX ?? "casper")
    };
    indexesArray.push(appIndex);

    const algoliaDocClient = useMemo(
        () => algoliasearch(process.env.GATSBY_DOCS_ALGOLIA_APP_ID!, process.env.GATSBY_DOCS_ALGOLIA_SEARCH_KEY!),
        []
    );

    if (
        process.env.GATSBY_DOCS_SITE_URL &&
        process.env.GATSBY_DOCS_ALGOLIA_INDEX_NAME &&
        process.env.GATSBY_DOCS_ALGOLIA_APP_ID &&
        process.env.GATSBY_DOCS_ALGOLIA_SEARCH_KEY
    ) {
        const searchDocClient: SearchClient = {
            ...algoliaDocClient,
            search(requests) {
                // -- Return default response in case that the query is empty
                if (requests.every(({ params }) => !params || !params.query)) {
                    return Promise.resolve({
                        results: requests.map(() => ({
                            hits: [],
                            nbHits: 0,
                            nbPages: 0,
                            page: 0,
                            processingTimeMS: 0,
                            hitsPerPage: 0,
                            exhaustiveNbHits: false,
                            query: "",
                            params: ""
                        }))
                    });
                }

                return algoliaDocClient.search(requests);
            }
        };

        const docIndex = {
            base: process.env.GATSBY_DOCS_SITE_URL,
            client: searchDocClient.initIndex(process.env.GATSBY_DOCS_ALGOLIA_INDEX_NAME ?? "casperlabs")
        };
        indexesArray.push(docIndex);
    }

    return (
        <>
            <SearchWrapper
                searchIndexes={indexesArray}
                locale={locale.toLocaleLowerCase()}
                placeholder={placeholder}
                hitsPerIndex={20}
                closebothNavBar={closebothNavBar}
            />
        </>
    );
}
