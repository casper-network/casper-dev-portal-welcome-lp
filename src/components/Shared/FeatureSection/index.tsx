import React from "react";
import { IResourceTile } from "../../../utils/Types/resourceTile";
import * as styles from "./FeatureSection.module.scss";
import FeatureTile from "./FeatureTile";
import Section from "../Section";

interface IFeatureSectionProps {
    header?: string;
    subheader?: string;
    tiles: IResourceTile[];
}

function FeatureSection({ header, subheader, tiles }: IFeatureSectionProps) {
    return (
        <Section header={header} subheader={subheader}>
            <div className={styles.resource_content}>
                <section className={`contentBox ${styles.resource_content_box} `}>
                    {tiles.map((data, index) => (
                        <div key={index} className={`${styles.resource_content_card} span-4 `}>
                            <FeatureTile {...data} />
                        </div>
                    ))}
                </section>
            </div>
        </Section>
    );
}

export default FeatureSection;
