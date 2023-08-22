import { GatsbyImage } from "gatsby-plugin-image";
import React, { RefObject, useEffect, useState } from "react";
import { IInfoTile } from "../../../../utils/Types/infoTile";
import Button from "../../Button";
import * as styles from "./InfoTile.module.scss";

interface IInfoTileProps {
    tile: IInfoTile;
    span: number;
}

export default function InfoTile({ tile, span }: IInfoTileProps) {
    const { title, content, image, button, image_title } = tile;
    const ref: RefObject<HTMLParagraphElement> = React.createRef();
    const [addAttribute, setAddAttribute] = useState<boolean>(false);

    useEffect(() => {
        if (content) {
            const element = ref.current?.scrollHeight;
            if (element! > 120) {
                setAddAttribute(true);
            }
        }
    }, []);

    return (
        <div className={`${styles.infoTileWrapper} ${`span-${span}`}`}>
            {image && title && (
                <div className={styles.image}>
                    <GatsbyImage alt={image_title ? `${image_title}` : `${title}`} image={image} />
                </div>
            )}
            <h4 className={`${styles.title} ${content ? styles.truncted : ""}`}>{title}</h4>
            {
                content && <p className={`primaryParagraph ${styles.paragraph}`} ref={ref} tabIndex={addAttribute ? 0 : -1}>
                    {content}
                </p>
            }
            {button && (
                <div className={styles.buttonWrapper}>
                    <Button {...button} />
                </div>
            )}
        </div>
    );
}
