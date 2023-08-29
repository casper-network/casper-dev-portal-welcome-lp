import React from "react";
import * as styles from "./Button.module.scss";
import LocalizedLink from "../../../utils/internationalization/LocalizedLink";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import { IButton } from "../../../utils/Types/button";
import { icons } from "../../../svg/Icons";

interface IButtonProps extends IButton {}

function Button({ text, url, inverted, type, disabled, openInNewTab }: IButtonProps) {
    const isAnchorLink = type === "internal" && url.includes("#");
    return (
        <>
            {type !== "internal" && (
                <a
                    href={!disabled ? url : ""}
                    target={openInNewTab ? "_blank" : "_self"}
                    className={`${styles.button} ${disabled ? styles.disabled : ""} ${!inverted ? styles.primary : styles.secondary} `}
                >
                    <div className={`${styles.button_container} ${!inverted ? styles.primary_container : styles.secondary_container}`}>
                        <p>{text}</p>
                        {icons.arrowRight}
                    </div>
                </a>
            )}
            {type === "internal" && !isAnchorLink && (
                <LocalizedLink
                    to={!disabled ? url : ""}
                    className={`${styles.button} ${disabled ? styles.disabled : ""} ${!inverted ? styles.primary : styles.secondary} `}
                >
                    <div className={`${styles.button_container} ${!inverted ? styles.primary_container : styles.secondary_container}`}>
                        <p>{text}</p>
                        {icons.arrowRight}
                    </div>
                </LocalizedLink>
            )}
            {isAnchorLink && (
                <AnchorLink
                    to={`/#newsletter-form`}
                    title={text}
                    className={`${styles.button} ${disabled ? styles.disabled : ""} ${!inverted ? styles.primary : styles.secondary} `}
                >
                    <div className={`${styles.button_container} ${!inverted ? styles.primary_container : styles.secondary_container}`}>
                        <p>{text}</p>
                        {icons.arrowRight}
                    </div>
                </AnchorLink>
            )}
        </>
    );
}

export default Button;
