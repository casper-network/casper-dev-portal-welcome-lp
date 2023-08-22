import React from "react";
import * as styles from "./SocialSection.module.scss";
import { ISocialTile } from "../../../utils/Types/socialTile";
import SocialTile from "./SocialTile";
import Section from "../Section";

interface ISocialSectionProps {
    header: string;
    subheader: string;
    tiles: ISocialTile[];
}

function SocialSection({ header, subheader, tiles }: ISocialSectionProps) {
    return (
        <Section header={header} subheader={subheader} setStyles={"lifted_background"}>
            <div className={styles.socialtiles}>
                <div className={`${styles.socialtiles_content} contentBox`}>
                    {tiles.map((data: any, index: number) => (
                        <section className={"span-4"} key={`section-${index}`}>
                            <SocialTile {...data} />
                        </section>
                    ))}
                </div>
            </div>
        </Section>
    );
}

export default SocialSection;
