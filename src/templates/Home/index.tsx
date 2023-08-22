import React from "react";
import { SiteMetadataHead } from "../../components/Shared/SiteMetadataHead";
import Hero from "../../components/Shared/Hero";
import { convertButton, convertResourceTile, convertInfoTile } from "../../utils/converters";
import FeatureSection from "../../components/Shared/FeatureSection";
import InfoSection from "../../components/Shared/InfoSection";
import NewsletterFormComponent from "../../components/Shared/NewsletterFormComponent";

export const HomePageTemplate = ({ pageContext }: any) => {
    const page = pageContext.page as Queries.DirectusData_acqlanding_translations;
    const buttons = page.hero?.buttons?.map((x) => {
        return convertButton(x?.link_button_id!);
    });
    const tilesResources = page.resource?.tiles?.map((x) => {
        return convertResourceTile(x?.resource_tile_id!);
    });
    const infoResources = page.info_section?.tiles?.map((x) => {
        return convertInfoTile(x?.info_tile_id!);
    });

    return (
        <>
            <Hero
                title={page.hero?.title ?? ""}
                image={page.hero?.image?.imageFile?.childImageSharp?.gatsbyImageData}
                image_title={page.hero?.image?.title ?? ""}
                gradient={page.hero?.gradient ?? ""}
                description={page.hero?.description ?? ""}
                buttons={buttons}
                background_image={page.hero?.background_image?.imageFile?.childImageSharp?.gatsbyImageData}
            />
            <FeatureSection header={page.resource?.header ?? ""} subheader={page.resource?.subheader ?? ""} tiles={tilesResources ?? []} />

            <InfoSection
                header={page.info_section?.header ?? ""}
                subheader={page.info_section?.subheader ?? ""}
                tiles={infoResources ?? []}
            ></InfoSection>
            <NewsletterFormComponent newsletterData={page.newsletter}></NewsletterFormComponent>
        </>
    );
};

export default HomePageTemplate;

export function Head({ pageContext, location }: any) {
    const page = pageContext.page as Queries.DirectusData_home_translations;
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
