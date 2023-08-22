import React, { PropsWithChildren } from "react";
import { Script, graphql, useStaticQuery, withPrefix } from "gatsby";
import useSiteMetadata from "../../Layout/SiteMetadata";
import Cookies from "js-cookie";
import { getAssetURL } from "../../../utils/get-asset-url";

interface ISiteMetadataHeadProps {
    locale: string;
}
export function SiteMetadataHead({ children, locale }: PropsWithChildren<ISiteMetadataHeadProps>) {
    const { title, description } = useSiteMetadata();

    const currentLocale = locale ?? process.env.GATSBY_DEFAULT_LOCALE;
    const { directus }: { directus: Queries.DirectusData } = useStaticQuery(
        graphql`
            query headerCookieQuery {
                directus {
                    cookie_banner {
                        translations {
                        languages_code {
                            code
                        }
                        items {
                            cookie_item_id {
                            required
                            parameter
                            }
                        }
                        }
                    }
                    header {
                        translations {
                            languages_code {
                                code
                            }
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

    let banner = directus.cookie_banner?.translations?.find(
        (x) => x?.languages_code?.code.toLocaleLowerCase() === currentLocale.toLocaleLowerCase()
    );

    if (!banner) {
        banner = directus.cookie_banner?.translations?.find(
            (x) => x?.languages_code?.code.toLocaleLowerCase() === process.env.GATSBY_DEFAULT_LOCALE!.toLocaleLowerCase()
        );
    }

    let header = directus.header?.translations?.find(
        (x) => x?.languages_code?.code.toLocaleLowerCase() === currentLocale.toLocaleLowerCase()
    );

    if (!header) {
        header = directus.header?.translations?.find(
            (x) => x?.languages_code?.code.toLocaleLowerCase() === process.env.GATSBY_DEFAULT_LOCALE!.toLocaleLowerCase()
        );
    }

    let items = banner?.items?.map(x => { return { parameter: x?.cookie_item_id?.parameter, required: x?.cookie_item_id?.required } }) ?? [];
    const prefs = Cookies.get('cookie-prefs') || JSON.stringify([]);

    return (
        <>
            <Script type="application/javascript">
                {`
                    if(!window.gtmConfigured) {
                        const items = ${JSON.stringify(items)}

                        const selections = ${prefs}

                        const layer = 'dataLayer';
                        window[layer] = window[layer] || [];
                        /**
                         * Iterate through the items and check (based on the selections)
                         * which ones have been selected by the user and add them as
                         * events to the Google Tag Manager DataLayer
                         */
                        items.forEach((item) => {
                        const { parameter } = item;
                        const accepted = selections.find(x => x.name== parameter && x.value);
                        const state = accepted ? 'active' : 'inactive';
                        const obj = { event: parameter };
                        obj[parameter] = state;
                        window[layer].push(obj);
                        });

                        window.gtmConfigured = true;
                    }
                `}
            </Script>
            <link rel="apple-touch-icon" sizes="180x180" href={`${withPrefix("/")}favicon/apple-touch-icon.png`} />
            <link rel="icon" type="image/png" href={`${withPrefix("/")}favicon/favicon-32x32.png`} sizes="32x32" />
            <link rel="icon" type="image/png" href={`${withPrefix("/")}favicon/favicon-16x16.png`} sizes="16x16" />
            <link rel="mask-icon" href={`${withPrefix("/")}favicon/safari-pinned-tab.svg`} color="#102641" />
            <link rel="stylesheet" href="https://use.typekit.net/agb0rqu.css" />
            <meta name="theme-color" content="#102641" />
            <title id="site-title">{title}</title>
            <meta id="desc" name="description" content={description} />
            <meta property="og:type" content="website"></meta>
            {header?.logo?.id && <meta id="site-img" property="og:image" content={`${process.env.GATSBY_SITE_URL}/casper-logo.png`} />}
            {children}
        </>
    );
}
