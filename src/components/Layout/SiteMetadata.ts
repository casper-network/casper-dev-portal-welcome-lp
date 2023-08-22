import { graphql, useStaticQuery } from "gatsby";

const useSiteMetadata = () => {
    const { site } = useStaticQuery(
        graphql`
            query siteMetadata {
                site {
                    siteMetadata {
                        description
                        title
                        siteUrl
                    }
                }
            }
        `
    );

    return site.siteMetadata;
};

export default useSiteMetadata;
