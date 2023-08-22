import React from "react";
import * as styles from "./Button.module.scss";
import LocalizedLink from "../../../utils/internationalization/LocalizedLink";
import { IButton } from "../../../utils/Types/button";
import { icons } from "../../../svg/Icons";

interface IButtonProps extends IButton { }

function Button({ text, url, inverted, type, disabled, openInNewTab }: IButtonProps) {
    return (
        <>
            {type !== "internal" ? (
                <a
                    href={!disabled ? url : ""} target={openInNewTab ? "_blank" : "_self"}
                    className={`${styles.button} ${disabled ? styles.disabled : ""} ${!inverted ? styles.primary : styles.secondary} `}
                >
                    <div className={`${styles.button_container} ${!inverted ? styles.primary_container : styles.secondary_container}`}>
                        <p>{text}</p>
                        {icons.arrowRight}
                    </div>
                </a>
            ) : (
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
        </>
    );
}

export default Button;
