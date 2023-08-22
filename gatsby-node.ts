import { HttpClient, NodeFetcher } from "@miracledevs/paradigm-web-fetch";
import { CreatePagesArgs, CreateNodeArgs, CreatePageArgs, CreateSchemaCustomizationArgs } from "gatsby";
import path from "path";
import { parseContent, query as dynamicPageQuery } from "./src/utils/dynamic-page";
import { getAssetURL } from "./src/utils/get-asset-url";

require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`
});

const httpClient = new HttpClient();
var nodeFetcher = new NodeFetcher();
httpClient.setFetcher(nodeFetcher);
const locales = process.env.LOCALES!.split(",");
const defaultLocale = process.env.GATSBY_DEFAULT_LOCALE;

exports.createSchemaCustomization = ({ actions }: CreateSchemaCustomizationArgs) => {
    const { createTypes, createFieldExtension } = actions;

    createTypes(`
    type SitePage implements Node {
        locale: String
    }
    `);
};

exports.onCreateWebpackConfig = ({ stage, actions, getConfig }: any) => {
    actions.setWebpackConfig({
        resolve: {
            modules: ["node_modules", path.resolve(__dirname, "src")],
            alias: {
                "basic-info": path.resolve(__dirname, "src/app/routes/basic-info"),
                "situation-analysis": path.resolve(__dirname, "src/app/routes/situation-analysis"),
                "select-drivers": path.resolve(__dirname, "src/app/routes/select-drivers"),
                "define-vision": path.resolve(__dirname, "src/app/routes/define-vision"),
                "rate-drivers": path.resolve(__dirname, "src/app/routes/rate-drivers"),
                "affinity-groups": path.resolve(__dirname, "src/app/routes/affinity-groups"),
                "define-objectives": path.resolve(__dirname, "src/app/routes/define-objectives"),
                "create-roadmap": path.resolve(__dirname, "src/app/routes/create-roadmap")
            }
        },

        devtool: "eval-source-map"
    });

    if (stage === "build-javascript" || stage === "develop") {
        const config = getConfig();

        const miniCssExtractPlugin = config.plugins.find((plugin: any) => plugin.constructor.name === "MiniCssExtractPlugin");

        if (miniCssExtractPlugin) miniCssExtractPlugin.options.ignoreOrder = true;

        actions.replaceWebpackConfig(config);
    }
};

exports.createPages = async ({ actions, graphql }: CreatePagesArgs) => {
    const { data } = await graphql<Queries.Query>(
        `
            query gn {
                directus {
                    not_found {
                        translations {
                            button {
                                link_button_id {
                                    inverted
                                    text
                                    type
                                    url
                                    open_in_new_tab
                                }
                            }
                            id
                            title
                            seo {
                                title
                                description
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

    const notFoundPage = data!.directus.not_found;
    if (notFoundPage && notFoundPage.translations) {
        for (const translation of notFoundPage.translations) {
            if (
                translation &&
                translation.languages_code &&
                locales.find((x) => x.toLocaleLowerCase() === translation!.languages_code!.code.toLocaleLowerCase())
            ) {
                const fullPath = buildPathWithLanguage(translation.languages_code.code, `/404`);
                actions.createPage({
                    path: fullPath,
                    matchPath: buildPathWithLanguage(translation.languages_code.code, `/*`),
                    component: path.resolve(`src/templates/NotFound/index.tsx`),
                    context: {
                        page: translation,
                        ...buildDefaultContext(translation.languages_code.code)
                    }
                });
            }
        }
    }

    const homePage = data!.directus.home;
    if (homePage && homePage.translations) {
        for (const translation of homePage.translations) {
            if (
                translation &&
                translation.languages_code &&
                translation.languages_code.code != defaultLocale &&
                locales.find((x) => x.toLocaleLowerCase() === translation!.languages_code!.code.toLocaleLowerCase())
            ) {
                const fullPath = buildPathWithLanguage(translation.languages_code.code, `/`);

                actions.createPage({
                    path: fullPath,
                    component: path.resolve(`src/templates/Home/index.tsx`),
                    context: {
                        page: translation,
                        ...buildDefaultContext(translation.languages_code.code)
                    }
                });
            }
        }
    }
};

exports.onCreatePage = ({ page, actions }: CreatePageArgs) => {
    const { createPage, deletePage } = actions;
    // -- Clone page
    const newPage = { ...page };
    // -- Only for the home
    // -- It is the only page created automatically
    if (page.path === "/") {
        deletePage(page);

        newPage.context = {
            ...buildDefaultContext(defaultLocale ?? "")
        };

        createPage(newPage);
    }
};

const buildPathWithLanguage = (language: string, path: string) => {
    return language.toLocaleLowerCase() === defaultLocale?.toLocaleLowerCase() ? path : `/${language.toLocaleLowerCase()}${path}`;
};

const buildDefaultContext = (locale: string) => {
    return {
        locale: locale.toLocaleLowerCase(),
        defaultLocale: defaultLocale,
        locales: locales
    };
};

exports.onCreateNode = async ({ node, actions }: CreateNodeArgs) => {
    const { createNodeField } = actions;
    if (node.internal.type === "File" && node.internal.mediaType === "image/svg+xml" && node.parent) {
        const svg = await getSvg(node.parent);
        createNodeField({
            name: "svg",
            node,
            value: svg
        });
    }
    if (node.internal.type === "SitePage" && node.context) {
        const context = node.context as any;
        // -- This values are necessary for the search control
        node.internal.description = context.title;
        node.internal.content = context.content;
        node.locale = context.locale;

        // -- Add title field for algolia search
        createNodeField({
            name: "title",
            node,
            value: context.title
        });
    }
};

const getSvg = async (id: string) => {
    const response = await httpClient.get(getAssetURL(id));
    const text = await response.text();
    return text;
};

const removeHtml = (text: string) => {
    const regexForStripHTML = /<\/?[^>]+(>|$)/g;
    return text.replaceAll(regexForStripHTML, "");
};
