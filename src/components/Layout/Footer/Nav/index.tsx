import React from "react";
import * as styles from "./Nav.module.scss";
import LocalizedLink from "../../../../utils/internationalization/LocalizedLink";
import { GatsbyImage } from "gatsby-plugin-image";
import useLocalization from "../../../../utils/internationalization/useLocalization";
import { renderLink } from "../../NavBar/NavBarDropdown/NavBarColumn/NavBarGroup/NavBarLink";
interface INavProps {
    footer: Queries.Maybe<Queries.DirectusData_footer_translations> | undefined;
}

function Nav({ footer }: INavProps) {
    const localization = useLocalization();

    return (
        <nav className={`${styles.nav}`}>
            {footer!.link_column!.map((column: Queries.Maybe<Queries.DirectusData_footer_translations_footer_link_column>, i: number) => {
                return (
                    <div key={`footer_column_${i}`} className={styles.nav_category}>
                        <p className={`primaryParagraph ${styles.nav_category_title}`}>{column?.footer_link_column_id?.title}</p>
                        <div className={styles.nav_category_links}>
                            {column?.footer_link_column_id?.links?.map(
                                (link: Queries.Maybe<Queries.DirectusData_footer_link_column_link>, i: number) => {
                                    return renderLink(
                                        link!.link_id!.type!,
                                        link!.link_id!.title!,
                                        link!.link_id!.url!,
                                        link!.link_id!.open_in_new_tab ?? false,
                                        localization
                                    );
                                }
                            )}
                        </div>
                    </div>
                );
            })}
            {footer && footer.logo && footer.logo.imageFile && footer.logo.imageFile.fields?.svg && (
                <div className={styles.logoCasper}>
                    <LocalizedLink to="/">
                        <div
                            className={styles.logoCasper_logo}
                            dangerouslySetInnerHTML={{ __html: footer.logo.imageFile.fields?.svg }}
                        ></div>
                    </LocalizedLink>
                </div>
            )}
        </nav>
    );
}

export default Nav;
