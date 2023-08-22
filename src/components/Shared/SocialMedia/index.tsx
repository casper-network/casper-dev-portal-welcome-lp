import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { getAssetURL } from "../../../utils/get-asset-url";
import * as styles from "./SocialMedia.module.scss";

function SocialMedia() {
    const { directus }: { directus: Queries.DirectusData } = useStaticQuery(
        graphql`
            query socialMediaQuery {
                directus {
                    social_media {
                        name
                        url
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
        `
    );

    const socialMedia = directus.social_media;

    return (
        <div className={styles.social_icons}>
            <div className={styles.social_icons_container}>
                {socialMedia &&
                    socialMedia.map((social) => {
                        return (
                            <div className={styles.icon} key={social.name}>
                                <a
                                    href={social.url!}
                                    title={social?.icon?.title ? `Go to ${social.icon!.title}` : "social media link"}
                                    target="_blank"
                                >
                                    {social.icon?.imageFile?.fields?.svg && (
                                        <div
                                            className={styles.svgIcons}
                                            dangerouslySetInnerHTML={{ __html: social.icon.imageFile.fields.svg }}
                                        ></div>
                                    )}
                                </a>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

export default SocialMedia;
