import React, { useEffect, useState } from "react";
import { IResourceTile } from "../../../../utils/Types/resourceTile";
import Button from "../../Button";
import * as styles from "./FeatureTile.module.scss";

interface IFeatureSectionTile extends IResourceTile {}

function FeatureSectionTile({ button, color, description, icon, title }: IFeatureSectionTile) {
    return (
        <div className={`${styles.resourcetilecard} ${!button && !title ? styles.resourceNewCard : ""}`}>
            <div dangerouslySetInnerHTML={{ __html: icon! }} className={`${styles.resourcetilecard_img} color ${color}`}></div>
            <div className={styles.resourcetilecard_content}>
                <div className={styles.resourcetilecard_content_text}>
                    {title && <h4>{title}</h4>}
                    <p className="primaryParagraph">{description}</p>
                </div>
                {button && <Button {...button} />}
            </div>
        </div>
    );
}

export default FeatureSectionTile;
