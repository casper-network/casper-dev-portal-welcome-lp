import React, { useCallback, useEffect, useRef, useState } from "react";
import { useHits, useSearchBox } from "react-instantsearch-hooks-web";
import useEventListener from "../../../../hooks/useEventListener";
import { icons } from "../../../../svg/Icons";
import SearchResult from "../SearchResult";
import useClickOutside from "../UseClickOutside";
import * as styles from "./SearchBox.module.scss";

interface ISearchBoxProps {
    placeholder: string;
    closebothNavBar?: () => void;
    hideBar?: boolean;
}

export default function SearchBox({ placeholder, closebothNavBar, hideBar = false }: ISearchBoxProps) {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const refInput = useRef<HTMLInputElement>(null);
    const [hasFocus, setHasFocus] = useState<boolean>(false);
    const [showResults, setShowResults] = useState<boolean>(false);

    const { hits } = useHits({ escapeHTML: false });

    let delayDebounceFn: NodeJS.Timeout;

    const memoizedSearch = useCallback((query: string, search: (p: string) => void) => {
        search(query);
    }, []);

    const { refine, clear } = useSearchBox({
        queryHook: memoizedSearch
    });

    const handleKeyClose = (e: KeyboardEvent): void => {
        if (e.key === "Escape") resetState();
    };

    function resetState() {
        setSearchTerm("");
        clearInput();
    }

    function handleChangeSearchTerm(e: React.ChangeEvent<HTMLInputElement>) {
        clearTimeout(delayDebounceFn);
        delayDebounceFn = setTimeout(() => {
            setShowResults(false);
            const value = e.target.value;
            setSearchTerm(value);
            if (value) {
                refine(value);
            } else {
                clear();
            }
        }, 500);
    }

    useEffect(() => {
        // -- Only true if search term has a value
        // -- Avoid to show the empty results
        setShowResults(searchTerm ? true : false);
    }, [hits]);

    useEventListener("keydown", handleKeyClose);

    useClickOutside(refInput, (isInside: boolean) => setHasFocus(isInside));

    function clearInput() {
        const buttons = document.getElementsByClassName(styles.container_input);
        for (const button of buttons) {
            (button as HTMLInputElement).value = "";
        }
        setSearchTerm("");
        setShowResults(false);
    }

    return (
        <div ref={refInput} tabIndex={-1} className={styles.container} onFocus={() => setHasFocus(true)}>
            {!hideBar && (
                <>
                    <input
                        id="inputSearch"
                        tabIndex={0}
                        className={styles.container_input}
                        onChange={handleChangeSearchTerm}
                        placeholder={placeholder}
                        autoComplete="off"
                    />
                    <span className={styles.container_icon_search}>{icons.search}</span>
                    {searchTerm && (
                        <button className={styles.container_icon_cancel} onClick={() => clearInput()}>
                            {icons.cancel}
                        </button>
                    )}
                </>
            )}
            {hasFocus && showResults && (
                <>
                    <SearchResult hits={hits} setHasFocus={setHasFocus} closebothNavBar={closebothNavBar}></SearchResult>
                </>
            )}
        </div>
    );
}
