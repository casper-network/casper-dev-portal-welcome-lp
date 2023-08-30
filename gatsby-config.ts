import type { GatsbyConfig } from "gatsby";

require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`
});

const config: GatsbyConfig = {
    siteMetadata: {
        title: `Casper Landing Page`,
        description: "Casper Landing Page",
        siteUrl: process.env.GATSBY_SITE_URL
    },
    // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
    // If you use VSCode you can also use the GraphQL plugin
    // Learn more at: https://gatsby.dev/graphql-typegen
    graphqlTypegen: true,
    trailingSlash: "never",
    plugins: [
        "gatsby-plugin-sass",
        {
            resolve: "gatsby-plugin-anchor-links",
            options: {
                offset: -100,
                duration: 100
            }
        },
        {
            resolve: "gatsby-plugin-sitemap",
            options: {
                excludes: ["/login"],
                serialize: ({ path, modifiedGmt }: { path: string; modifiedGmt: any }) => {
                    return {
                        url: path,
                        lastmod: modifiedGmt
                    };
                }
            }
        },
        {
            resolve: "gatsby-plugin-react-svg",
            options: {
                rule: {
                    include: /images/ // See below to configure properly
                }
            }
        },
        {
            resolve: "gatsby-plugin-robots-txt",
            options: {
                host: process.env.GATSBY_SITE_URL,
                sitemap: `${process.env.GATSBY_SITE_URL}/sitemap-index.xml`,
                policy: [{ userAgent: "*", allow: "/" }]
            }
        },
        "gatsby-plugin-styled-components",
        `gatsby-plugin-image`,
        `gatsby-transformer-sharp`,
        {
            resolve: "gatsby-plugin-sharp",
            options: {
                defaults: {
                    formats: [`auto`, `webp`],
                    placeholder: "blurred",
                    quality: 100
                }
            }
        },
        {
            resolve: "@directus/gatsby-source-directus",
            options: {
                url: process.env.GATSBY_DIRECTUS_URL,
                auth: {
                    // You can use the credentials of an user
                    token: process.env.DIRECTUS_TOKEN
                }
            }
        },
        {
            resolve: "gatsby-plugin-google-tagmanager",
            options: {
                id: process.env.GOOGLE_TAG_MANAGER_ID,

                // Include GTM in development.
                //
                // Defaults to false meaning GTM will only be loaded in production.
                includeInDevelopment: true,

                // Defaults to gatsby-route-change
                routeChangeEventName: "routeChanged"
            }
        }
    ]
};

export default config;
