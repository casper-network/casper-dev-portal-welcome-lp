import React, { useEffect, useState } from "react";
import Button from "../../Button";
import * as styles from "./SocialTile.module.scss";
import { ISocialTile } from "../../../../utils/Types/socialTile";
import { GatsbyImage } from "gatsby-plugin-image";

interface ISocialTileProps extends ISocialTile {}

function SocialTile(props: ISocialTileProps) {
    const { main_title, secondary_title, description, button, icon, image, image_title } = props;

    return (
        <div className={styles.socialtilecard}>
            <div className={styles.socialtilecard_text}>
                <div dangerouslySetInnerHTML={{ __html: icon! }} className={styles.text_svg}></div>
                <p className={`${styles.paragraphfirst} secondaryParagraph`} title={secondary_title}>
                    {secondary_title}
                </p>
                <h4 title={main_title}>{main_title}</h4>
                <p className={`${styles.paragraphsecond} secondaryParagraph`} title={description}>
                    {description}
                </p>
                <Button {...{ ...button }} />
            </div>
            <div className={styles.socialtilecard_img}>
                {image && <GatsbyImage alt={image_title ? `${image_title}` : main_title ? `${main_title}` : `SocialTile`} image={image} />}
            </div>
        </div>
    );
}

export default SocialTile;
