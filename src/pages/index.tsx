import React from "react";
import { graphql } from "gatsby";
import { Head as ImportedHead, HomePageTemplate as ImportedTemplate } from "../templates/Home";
const HomePageTemplate = ({ data }: any) => {
    const page = data.directus.acqlanding.translations.find(
        (x: any) => x.languages_code && x.languages_code.code === process.env.GATSBY_DEFAULT_LOCALE
    );

    const props = { pageContext: { page } };
    return <ImportedTemplate {...props}></ImportedTemplate>;
};

export default HomePageTemplate;

export const query = graphql`
    query {
        directus {
            acqlanding {
                id
                translations {
                    hero {
                        title
                        id
                        description
                        gradient
                        background_image {
                            id
                            title
                            imageFile {
                                childImageSharp {
                                    gatsbyImageData
                                }
                            }
                        }
                        buttons {
                            id
                            link_button_id {
                                inverted
                                text
                                type
                                url
                                open_in_new_tab
                            }
                        }
                        image {
                            id
                            title
                            imageFile {
                                childImageSharp {
                                    gatsbyImageData
                                }
                            }
                        }
                    }
                    seo {
                        title
                        id
                        description
                    }
                    languages_code {
                        code
                    }
                    resource {
                        header
                        subheader
                        id
                        tiles {
                            resource_tile_id {
                                title
                                description
                                color {
                                    value
                                }
                                icon {
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
                    info_section {
                        header
                        subheader
                        id
                        tiles {
                            id
                            info_tile_id {
                                content
                                title
                                button {
                                    inverted
                                    text
                                    type
                                    url
                                    open_in_new_tab
                                }
                                image {
                                    id
                                    title
                                    imageFile {
                                        childImageSharp {
                                            gatsbyImageData
                                        }
                                    }
                                }
                            }
                        }
                    }
                    newsletter {
                        header
                        subheader
                        agree_label
                        button_text
                        country_label
                        description
                        email_label
                        first_name_label
                        i_am_label
                        button_text
                        success_message
                        error_message
                        email_required_text
                        email_invalid_text
                        first_name_required_text
                        country_required_text
                        i_am_required_text
                        preferred_language_label
                        blockchain_familiarity_label
                        interests_label
                    }
                }
            }
        }
    }
`;

export function Head({ data }: any) {
    const page = data.directus.acqlanding.translations.find((x: any) => x.languages_code.code === process.env.GATSBY_DEFAULT_LOCALE);
    const props = { pageContext: { page } };

    return <ImportedHead {...props}></ImportedHead>;
}
