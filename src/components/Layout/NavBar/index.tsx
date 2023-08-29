import React, { useContext, useEffect, useRef, useState } from "react";
import { graphql, useStaticQuery } from "gatsby";
import useWindow from "../../../hooks/useWindow";
import useLocalization from "../../../utils/internationalization/useLocalization";
import * as styles from "./NavBar.module.scss";
import { icons } from "../../../svg/Icons";
import LogoNavBar from "./LogoNavBar";
import ThemeSwitch from "./ThemeSwitch";
import { ModalContext } from "../../../context/ModalContext";

function NavBar({ showLogin = false }) {
    const navBarRef = useRef<HTMLHeadingElement>(null);
    const { showCookieModal, setShowCookieModal } = useContext(ModalContext);

    const { locale, localizedNavigate } = useLocalization();

    const currentLocale = locale ?? process.env.GATSBY_DEFAULT_LOCALE;

    const userItem = useWindow() ? localStorage.getItem("user") : "";

    let user;
    if (userItem) {
        user = JSON.parse(userItem);
    }

    /* LOGIN */

    const login = () => {
        if (useWindow()) {
            const githubLoginUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GATSBY_GH_CLIENT_ID}&scope=${process.env.GATSBY_GH_SCOPES}`;
            localStorage.setItem("loginRedirect", window.location.pathname);
            window.location.replace(githubLoginUrl);
        }
    };

    /* /LOGIN */

    useEffect(() => {
        if (document && document.body) {
            const bodyDocument = document.body;
            if (showCookieModal) {
                bodyDocument.classList.add("preventScrollDocument");
            } else {
                bodyDocument.classList.remove("preventScrollDocument");
            }
        }
    }, [showCookieModal]);
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
                        <div className={`${styles.navbar} navBar`}>
                            {header && header.logo && <LogoNavBar header={header} />}

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
                    </div>
                </header>
            </div>
        </>
    );
}

export default NavBar;
