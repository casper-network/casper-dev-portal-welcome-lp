import { close } from "inspector";
import React, { useEffect } from "react";
import Search from "../../../Shared/Search";
import SocialMedia from "../../../Shared/SocialMedia";
import Nav from "../Nav";
import * as styles from "./Sidebar.module.scss";
import ThemeSwitch from "../ThemeSwitch";

interface ISidebar {
    sidebarOpen: boolean;
    header: Queries.Maybe<Queries.DirectusData_header_translations> | undefined;
    currentLocale: any;
    dropdownParentRef: React.RefObject<HTMLElement>;
    handleClick: (title: string) => void;
    dropdownOpen: boolean;
    current: string;
    closebothNavBar: () => void;
}
function Sidebar({ sidebarOpen, header, currentLocale, dropdownParentRef, handleClick, dropdownOpen, current, closebothNavBar }: ISidebar) {
    return (
        <section className={`${styles.sidebar} ${sidebarOpen && styles.sidebarOpen}`}>
            <div className={styles.sidebar_container}>
                {header && header.search_placeholder && (
                    <section className={styles.sidebar_container_search}>
                        {header &&
                            header.search_placeholder &&
                            process.env.GATSBY_ALGOLIA_APP_ID &&
                            process.env.GATSBY_ALGOLIA_SEARCH_KEY &&
                            process.env.GATSBY_ALGOLIA_INDEX && (
                                <Search
                                    index={{
                                        name: `${process.env.GATSBY_ALGOLIA_INDEX}`,
                                        title: `${process.env.GATSBY_ALGOLIA_INDEX}`
                                    }}
                                    locale={currentLocale}
                                    placeholder={header.search_placeholder}
                                    closebothNavBar={closebothNavBar}
                                />
                            )}
                    </section>
                )}
                {header && header.nav_items && (
                    <section className={styles.sidebar_container_nav}>
                        <Nav
                            dropdownParentRef={dropdownParentRef}
                            header={header}
                            handleClick={handleClick}
                            dropdownOpen={dropdownOpen}
                            current={current}
                            closebothNavBar={closebothNavBar}
                        />
                    </section>
                )}
            </div>
            <section className={styles.sidebar_social}>
                <SocialMedia />
                <ThemeSwitch />
            </section>
        </section>
    );
}

export default Sidebar;
