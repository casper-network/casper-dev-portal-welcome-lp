import React from "react";
import LocalizedLink from "../../../../../../../utils/internationalization/LocalizedLink";
import * as styles from "./NavBarLink.module.scss";
import useLocalization from "../../../../../../../utils/internationalization/useLocalization";

interface INavBarLinkProps {
    link: Queries.Maybe<Queries.DirectusData_header_link_column_link>;
    closebothNavBar: () => void;
}

export enum linkTypes {
    INTERNAL = "internal",
    EXTERNAL = "external"
}
const getLink = (path: string, localization: any) => {
    if (!localization.locale && !localization.defaultLocale) return;
    const siteUrl = process.env.GATSBY_DEV_SITE_URL!;
    const url = siteUrl.endsWith("/") ? siteUrl.slice(0, -1) : siteUrl;
    const truncatedPath = path.startsWith("/") ? path.slice(1) : path;
    if (localization.defaultLocale.toLowerCase() === localization.locale.toLowerCase()) {
        return `${url}/${truncatedPath}`;
    } else {
        return `${url}/${localization.locale}/${truncatedPath}`;
    }
};
export const renderLink = (type: string, title: string, url: string, openNewTab: boolean, localization: any) => {
    switch (type) {
        case linkTypes.INTERNAL:
            return (
                <a key={`${title}`} href={getLink(url, localization)}>
                    {title}
                </a>
            );

        case linkTypes.EXTERNAL:
            return (
                <a key={`${title}`} href={url} target={openNewTab ? "_blank" : "_self"}>
                    {title}
                </a>
            );
        default:
            return <span key={`${title}`}>{title}</span>;
    }
};

export default function NavBarLink({ link, closebothNavBar }: INavBarLinkProps) {
    const localization = useLocalization();

    return (
        <li className={`${styles.link} ${link && link.link_id && link.link_id.children?.length === 0 ? styles.onlyTitle : ""}`}>
            <span>
                {renderLink(
                    link!.link_id!.type!,
                    link!.link_id!.title!,
                    link!.link_id!.url!,
                    link!.link_id!.open_in_new_tab ?? false,
                    localization
                )}
            </span>
            {link && link.link_id && link.link_id.children && (
                <ul className={`${styles.subLinkList} noWrap`}>
                    {link.link_id.children.map((subLink: Queries.Maybe<Queries.DirectusData_link_link>, i: number) => {
                        return (
                            <li key={`column_group_link_subLink_${subLink?.related_link_id?.title}_${i}`}>
                                {renderLink(
                                    subLink!.related_link_id!.type!,
                                    subLink!.related_link_id!.title!,
                                    subLink!.related_link_id!.url!,
                                    subLink!.related_link_id!.open_in_new_tab ?? false,
                                    localization
                                )}
                            </li>
                        );
                    })}
                </ul>
            )}
        </li>
    );
}
