import React from "react";
import { SiteMetadataHead } from "../../components/Shared/SiteMetadataHead";
import * as styles from "./Paragraph.module.scss";

const ParagraphPageTemplate = ({ pageContext }: any) => {
    const page = pageContext.page as Queries.DirectusData_terms_of_use_translations | Queries.DirectusData_privacy_policy_translations;
    return (
        <div className={`container`}>
            <div className={`contentBox`}>
                <div className={`${styles.content} span-12`} dangerouslySetInnerHTML={{ __html: page.content ?? "" }}></div>
            </div>
        </div>
    );
};

export default ParagraphPageTemplate;

export function Head({ pageContext, location }: any) {
    const page = pageContext.page as Queries.DirectusData_terms_of_use_translations | Queries.DirectusData_privacy_policy_translations;
    const locale = pageContext.locale ?? process.env.GATSBY_DEFAULT_LOCALE;
    const lang = locale ? locale.split("-")[0] : "";
    const path = location?.pathname ?? "";

    return (
        <SiteMetadataHead {...{ locale }}>
            <html lang={lang} />
            <title id="site-title">{page?.seo?.title}</title>
            <meta id="desc" name="description" content={page?.seo?.description ?? ""} />
            <meta property="og:title" content={page?.seo?.title ?? ""}></meta>
            <meta property="og:description" content={page?.seo?.description ?? ""}></meta>
            <meta property="og:url" content={process.env.GATSBY_SITE_URL + path}></meta>
        </SiteMetadataHead>
    );
}
