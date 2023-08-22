import React from "react";
import * as styles from "./LogoNavBar.module.scss";
import LocalizedLink from "../../../../utils/internationalization/LocalizedLink";

interface ILogoNavBar {
    closeMobileNavbar: () => void;
    header: Queries.DirectusData_header_translations;
}

function LogoNavBar({ closeMobileNavbar, header }: ILogoNavBar) {
    return (
        <>
            {header && header.logo && header.logo.imageFile && header.logo.imageFile.fields?.svg && (
                <div className={styles.logo}>
                    <LocalizedLink title={header.logo.title} to="/" onClick={() => closeMobileNavbar()}>
                        <div dangerouslySetInnerHTML={{ __html: header.logo.imageFile.fields?.svg }}></div>
                    </LocalizedLink>
                </div>
            )}
        </>
    );
}

export default LogoNavBar;
