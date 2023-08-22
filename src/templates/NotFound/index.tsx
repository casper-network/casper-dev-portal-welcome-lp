import React from "react";
import { SiteMetadataHead } from "../../components/Shared/SiteMetadataHead";
import * as styles from "./NotFound.module.scss";
import Button from "../../components/Shared/Button";
import { convertButton } from "../../utils/converters";
import { StaticImage } from "gatsby-plugin-image";

const NotFoundPageTemplate = ({ pageContext }: any) => {
    const page = pageContext.page as Queries.DirectusData_not_found_translations;
    return (
        <div className={`${styles.notFound} container`}>
            <div className={`${styles.alertMessage} contentBox`}>
                <div className={`${styles.header} span-4`}>
                    <p>404</p>
                </div>
                <span></span>
                <div className={styles.subHeader}>
                    <h2>{page.title}</h2>
                </div>
                <div className={styles.buttonContainer}>
                    {page.button?.map((button, i) => {
                        return (
                            button?.link_button_id && (
                                <Button key={`${button.link_button_id.id} button-${i}`} {...convertButton(button?.link_button_id)} />
                            )
                        );
                    })}
                </div>
            </div>
            <div className={styles.imgContainer}>
                <div>
                    <StaticImage src="../../images/Casper-PurpleCoin-Left.png" alt={"PurpleCoinLeft"} className={styles.purpleCoinLeft} />
                    <StaticImage
                        src="../../images/Casper-PurpleCoin-Right.png"
                        alt={"PurpleCoinRight"}
                        className={styles.purpleCoinRight}
                    />
                    <StaticImage src="../../images/Casper-RedCoin-Left.png" alt={"RedCoinLeft"} className={styles.redCoinLeft} />
                    <StaticImage src="../../images/Casper-RedCoin-Right.png" alt={"RedCoinRight"} className={styles.redCoinRight} />
                </div>
            </div>
        </div>
    );
};

export default NotFoundPageTemplate;

export function Head({ pageContext, location }: any) {
    const page = pageContext.page as Queries.DirectusData_not_found_translations;
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
