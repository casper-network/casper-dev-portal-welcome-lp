import React from "react";
import { IButton } from "../../../utils/Types/button";
import Button from "../Button";
import InfoTile from "./InfoTile";
import * as styles from "./InfoSection.module.scss";
import { IInfoTile } from "../../../utils/Types/infoTile";
import Section from "../Section";

interface IInfoSectionProps {
    tiles: IInfoTile[];
    button?: IButton;
    header?: string;
    subheader?: string;
}

export default function InfoSection({ tiles, button, header, subheader }: IInfoSectionProps) {
    const setSpan = (length: number) => {
        switch (length) {
            case 1:
            case 2:
                return 6;
            case 3:
                return 4;
            case 4:
                return 3;
            default:
                return 3;
        }
    };
    const span = setSpan(tiles.length);
    return (
        <Section header={header} subheader={subheader}>
            <div className={`container ${styles.wrapper}`}>
                <div className={`contentBox ${styles.tileContent}`}>
                    {tiles &&
                        tiles.map((tile, i) => {
                            return <InfoTile key={`info_tile_${i}`} {...{ ...{ tile }, ...{ span } }} />;
                        })}
                </div>
                {button && (
                    <div className={styles.buttonWrapper}>
                        <Button {...button} />
                    </div>
                )}
            </div>
        </Section>
    );
}
