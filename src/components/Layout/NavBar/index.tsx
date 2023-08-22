import React, { useContext, useEffect, useRef, useState } from "react";
import { graphql, useStaticQuery } from "gatsby";
import useEventListener from "../../../hooks/useEventListener";
import useWindow from "../../../hooks/useWindow";
import useLocalization from "../../../utils/internationalization/useLocalization";
import Search from "../../Shared/Search";
import SocialMedia from "../../Shared/SocialMedia";
import * as styles from "./NavBar.module.scss";
import useWindowWidth from "../../../hooks/useWindowWidth";
import { icons } from "../../../svg/Icons";
import useFocusTrap from "../../../hooks/useFocusTrap";
import LogoNavBar from "./LogoNavBar";
import Nav from "../NavBar/Nav";
import Sidebar from "./Sidebar";
import ThemeSwitch from "./ThemeSwitch";
import { ModalContext } from "../../../context/ModalContext";

function NavBar({ showLogin = false }) {
    const desktop = useWindowWidth(931);
    const [isDesktop, setIsDesktop] = useState<boolean>(true);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const [dropdownContent, setDropdownContent] = useState<Queries.DirectusData_header_translations_header_nav_item | null>(null);
    const [current, setCurrent] = useState<string>("");
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const navBarRef = useRef<HTMLHeadingElement>(null);
    const dropdownParentRef = useRef<HTMLElement>(null);
    const dropdownParentMobileRef = useRef<HTMLElement>(null);
    const { showCookieModal, setShowCookieModal } = useContext(ModalContext);

    const { locale, localizedNavigate } = useLocalization();

    const currentLocale = locale ?? process.env.GATSBY_DEFAULT_LOCALE;

    const userItem = useWindow() ? localStorage.getItem("user") : "";

    let user;
    if (userItem) {
        user = JSON.parse(userItem);
    }

    useFocusTrap(navBarRef, "a[href], button:not([disabled]), input", !dropdownOpen, dropdownContent);

    const handleKeyClose = (e: KeyboardEvent): void => {
        if (e.key === "Escape") closeNavBarHandler();
    };

    useEventListener("keydown", handleKeyClose);

    useEventListener("click", handleClickOutside);

    function handleClickOutside(event: any) {
        if (isDesktop && dropdownParentRef && dropdownParentRef.current && !dropdownParentRef.current.contains(event.target)) {
            closeNavBarHandler();
        }
        if (
            !isDesktop &&
            dropdownParentMobileRef &&
            dropdownParentMobileRef.current &&
            !dropdownParentMobileRef.current.contains(event.target)
        ) {
            closeNavBarHandler();
        }
    }

    const setDropdown = (currentContent: Queries.DirectusData_header_translations_header_nav_item) => {
        if (!dropdownOpen) setDropdownOpen(true);
        setDropdownContent(currentContent);
    };

    const handleNavigation = (current: string, currentContent: any) => {
        goToPage(currentContent);
    };

    function goToPage(current: any) {
        if (!current) return;
        localizedNavigate(current);
        /* localizedNavigate(current.slug); */
        setDropdownOpen(false);
    }

    const handleClick = (title: string) => {
        if (!useWindow()) return;
        if (title === current) {
            if (dropdownOpen) closeNavBarHandler();
            else setDropdownOpen(!dropdownOpen);
        } else {
            setCurrent(title);
        }

        if (header && header.nav_items) {
            let currentContent: Queries.Maybe<Queries.DirectusData_header_translations_header_nav_item> | undefined = header.nav_items.find(
                (elem: Queries.Maybe<Queries.DirectusData_header_translations_header_nav_item>) => elem?.header_nav_item_id?.title === title
            );

            currentContent &&
            currentContent.header_nav_item_id &&
            currentContent.header_nav_item_id.columns &&
            currentContent.header_nav_item_id.columns.length > 0
                ? setDropdown(currentContent)
                : handleNavigation(title, currentContent);
        }
    };

    useEffect(() => {
        if (!isDesktop) closeNavBarHandler();
    }, [isDesktop]);

    useEffect(() => {
        setIsDesktop(desktop);
    }, [desktop]);

    const closeNavBarHandler = () => {
        setDropdownOpen(false);
        setCurrent("");
    };

    /* LOGIN */

    const login = () => {
        if (useWindow()) {
            const githubLoginUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GATSBY_GH_CLIENT_ID}&scope=${process.env.GATSBY_GH_SCOPES}`;
            localStorage.setItem("loginRedirect", window.location.pathname);
            window.location.replace(githubLoginUrl);
        }
    };

    /* /LOGIN */

    /* OPEN SIDEBAR */
    const handleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };
    useEffect(() => {
        setSidebarOpen(false);
    }, [isDesktop]);

    const closeMobileNavbar = () => {
        setSidebarOpen(false);
    };
    const closebothNavBar = () => {
        handleSidebar();
        closeNavBarHandler();
    };

    useEffect(() => {
        if (document && document.body) {
            const bodyDocument = document.body;
            if ((sidebarOpen && !isDesktop) || showCookieModal) {
                bodyDocument.classList.add("preventScrollDocument");
            } else {
                bodyDocument.classList.remove("preventScrollDocument");
            }
        }
    }, [isDesktop, sidebarOpen, showCookieModal]);
    /* /SIDEBAR */

    const { directus }: { directus: Queries.DirectusData } = useStaticQuery(
        graphql`
            query headerQuery {
                directus {
                    header {
                        translations {
                            languages_code {
                                code
                            }
                            login_text
                            search_placeholder
                            logo {
                                id
                                title
                                imageFile {
                                    fields {
                                        svg
                                    }
                                }
                            }
                            nav_items {
                                header_nav_item_id {
                                    title
                                    columns {
                                        header_nav_column_id {
                                            groups {
                                                header_link_column_id {
                                                    title
                                                    links {
                                                        link_id {
                                                            title
                                                            type
                                                            url
                                                            open_in_new_tab
                                                            children {
                                                                related_link_id {
                                                                    title
                                                                    type
                                                                    url
                                                                    open_in_new_tab
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `
    );

    let header = directus.header?.translations?.find(
        (x) => x?.languages_code?.code.toLocaleLowerCase() === currentLocale.toLocaleLowerCase()
    );

    if (!header) {
        header = directus.header?.translations?.find(
            (x) => x?.languages_code?.code.toLocaleLowerCase() === process.env.GATSBY_DEFAULT_LOCALE!.toLocaleLowerCase()
        );
    }

    return (
        <>
            <div className={styles.wrapper}>
                <header ref={navBarRef} className={styles.navbar_wrapper}>
                    <div className={`${styles.container} container`}>
                        <div className={`${styles.navbar} ${styles.desktop} navBar`}>
                            {header && header.nav_items && <LogoNavBar closeMobileNavbar={closeMobileNavbar} header={header} />}
                            {header && header.nav_items && (
                                <Nav
                                    dropdownParentRef={dropdownParentRef}
                                    header={header}
                                    handleClick={handleClick}
                                    dropdownOpen={dropdownOpen}
                                    current={current}
                                    closebothNavBar={closebothNavBar}
                                />
                            )}
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
                                    />
                                )}

                            <SocialMedia />
                            <ThemeSwitch />
                            {/* Hide Log In button per Casper request on a meeting, since there's nothing to show if a users log in*/}
                            {showLogin && !user && (
                                <div onClick={login}>
                                    <button>
                                        {header && <span className="halfTitleEyebrow noWrap">{header?.login_text}</span>}
                                        {icons.login}
                                    </button>
                                </div>
                            )}
                            {showLogin && user && (
                                <button>
                                    <span>
                                        {user.name} {user.email}
                                    </span>
                                    {icons.login}
                                </button>
                            )}
                        </div>
                        <div className={`${styles.navbar} ${styles.mobile} navBar`}>
                            {header && header.nav_items && <LogoNavBar closeMobileNavbar={closeMobileNavbar} header={header} />}
                            <div className={`${styles.icon} ${isDesktop ? styles.hidden : ""}`} onClick={handleSidebar}>
                                <div className={`${styles.icon_cancel} ${!sidebarOpen && styles.icon_cancel_none}`}>{icons.cancel}</div>
                                <div className={`${styles.icon_menu} ${sidebarOpen && styles.icon_menu_none}`}>{icons.menu}</div>
                            </div>
                        </div>
                    </div>
                </header>
                <div className={`${styles.mobile}`}>
                    <Sidebar
                        sidebarOpen={sidebarOpen}
                        header={header}
                        currentLocale={currentLocale}
                        dropdownParentRef={dropdownParentMobileRef}
                        handleClick={handleClick}
                        dropdownOpen={dropdownOpen}
                        current={current}
                        closebothNavBar={closebothNavBar}
                    />
                </div>
            </div>
        </>
    );
}

export default NavBar;
