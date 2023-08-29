import React, { useContext } from "react";
import { graphql, useStaticQuery } from "gatsby";
import useLocalization from "../../../utils/internationalization/useLocalization";
import LocalizedLink from "../../../utils/internationalization/LocalizedLink";
import SocialMedia from "../../Shared/SocialMedia";
import * as styles from "./Footer.module.scss";
import Nav from "./Nav";
import { ModalContext } from "../../../context/ModalContext";
import { renderLink } from "../NavBar/NavBarDropdown/NavBarColumn/NavBarGroup/NavBarLink";

function Footer() {
    const localization = useLocalization();
    const currentLocale = localization.locale ?? process.env.GATSBY_DEFAULT_LOCALE;

    const { setShowCookieModal } = useContext(ModalContext);
    const { directus }: { directus: Queries.DirectusData } = useStaticQuery(
        graphql`
            query footerQuery {
                directus {
                    footer {
                        translations {
                            title
                            description
                            manage_cookies_text
                            logo {
                                id
                                title
                                imageFile {
                                    fields {
                                        svg
                                    }
                                }
                            }

                            bottom_links {
                                link_id {
                                    title
                                    type
                                    url
                                    open_in_new_tab
                                }
                            }
                            languages_code {
                                code
                            }
                        }
                    }
                }
            }
        `
    );

    let footer = directus.footer?.translations?.find(
        (x) => x?.languages_code?.code.toLocaleLowerCase() === currentLocale.toLocaleLowerCase()
    );

    if (!footer) {
        footer = directus.footer?.translations?.find(
            (x) => x?.languages_code?.code.toLocaleLowerCase() === process.env.GATSBY_DEFAULT_LOCALE!.toLocaleLowerCase()
        );
    }

    return (
        <>
            {footer && (
                <div className={`container`}>
                    <div className={`${styles.footer_container} navBar`}>
                        <div className={styles.footer_container_upperData}>
                            <div className={styles.footer_container_upperData_social}>
                                <h2>{footer.title}</h2>
                                <SocialMedia />
                                <p className={`${styles.footer_container_upperData_social_description} primaryParagraph`}>
                                    {footer.description}
                                </p>
                                {footer && footer.logo && footer.logo.imageFile && footer.logo.imageFile.fields?.svg && (
                                    <div className={styles.logoCasper}>
                                        <LocalizedLink to="/" title={footer.logo.title}>
                                            <div
                                                className={styles.logoCasper_logo}
                                                dangerouslySetInnerHTML={{ __html: footer.logo.imageFile.fields?.svg }}
                                            ></div>
                                        </LocalizedLink>
                                    </div>
                                )}
                            </div>
                        </div>
                        {footer.bottom_links && (
                            <div className={styles.footer_container_bottomData}>
                                {footer.bottom_links.map(
                                    (link: Queries.Maybe<Queries.DirectusData_footer_translations_link>, i: number) => {
                                        return renderLink(
                                            link!.link_id!.type!,
                                            link!.link_id!.title!,
                                            link!.link_id!.url!,
                                            link!.link_id!.open_in_new_tab ?? false,
                                            localization
                                        );
                                    }
                                )}
                                <button
                                    onClick={() => setShowCookieModal(true)}
                                    className={`${styles.button_modal_cookie} primaryParagraph`}
                                >
                                    {footer.manage_cookies_text}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default Footer;
