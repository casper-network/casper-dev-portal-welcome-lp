import React from "react";
import Button from "../Button";
import * as styles from "./Hero.module.scss";
import { IButton } from "../../../utils/Types/button";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";

interface IHeroProps {
    buttons?: Array<IButton>;
    title: string;
    image?: IGatsbyImageData;
    image_title: string;
    description?: string;
    gradient?: string;
    background_image?: IGatsbyImageData;
}

function Hero({ buttons, title, image, image_title, gradient, description, background_image }: IHeroProps) {
    const removeHtml = (text: string) => {
        const regexForStripHTML = /<\/?[^>]+(>|$)/g;
        return text.replaceAll(regexForStripHTML, "");
    };
    return (
        <section className={`${styles.hero} gradient ${gradient} container`}>
            {background_image && <GatsbyImage image={background_image} alt={`Hero background`}></GatsbyImage>}
            <div className={`${styles.hero_container} contentBox`}>
                <div className={`${styles.hero_container_text} span-8`}>
                    <h1 dangerouslySetInnerHTML={{ __html: title! }} className={styles.hero_container_text_title}></h1>
                    {description && (
                        <div className={styles.hero_container_text_description}>
                            <h3>{description}</h3>
                        </div>
                    )}
                    {buttons && buttons.length > 0 && (
                        <div className={styles.hero_container_text_btns}>
                            {buttons.map((data: IButton, index: number) => (
                                <div
                                    key={index}
                                    className={`${styles.hero_container_text_btns_container} ${
                                        buttons.length > 1 ? styles.hoverButtonOff : ""
                                    }`}
                                >
                                    <Button {...data} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className={`${styles.hero_container_img} span-4`}>
                {image && <GatsbyImage image={image} alt={image_title ? `${image_title}` : title ? `${removeHtml(title)}` : `Hero`} />}
            </div>
        </section>
    );
}

export default Hero;
