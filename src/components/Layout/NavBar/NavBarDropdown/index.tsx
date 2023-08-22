import React, { useState } from "react";
import NavBarColumn from "./NavBarColumn";
import * as styles from "./NavBarDropdown.module.scss";

interface INavBarDropdownProps {
    content?: Queries.DirectusData_header_translations_header_nav_item;
    closebothNavBar: () => void;
}
export default function NavBarDropdown({ content, closebothNavBar }: INavBarDropdownProps) {
    return (
        <div className={`${styles.wrapper}`} onClick={(e) => e.stopPropagation()}>
            <div className={styles.dropdown}>
                {content &&
                    content.header_nav_item_id &&
                    content.header_nav_item_id.columns &&
                    content.header_nav_item_id.columns.map(
                        (column: Queries.Maybe<Queries.DirectusData_header_nav_item_header_nav_column>, i: number) => {
                            return <NavBarColumn key={`column_${i}`} column={column} closebothNavBar={closebothNavBar} />;
                        }
                    )}
            </div>
        </div>
    );
}
