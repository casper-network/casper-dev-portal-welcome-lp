import React, { useEffect, useState } from "react";
import * as styles from "./Nav.module.scss";
import NavBarDropdown from "../NavBarDropdown";
import { icons } from "../../../../svg/Icons";
import { CSSTransition } from "react-transition-group";

interface INav {
    dropdownParentRef: React.RefObject<HTMLElement>;
    header: Queries.DirectusData_header_translations;
    handleClick: (title: string) => void;
    dropdownOpen: boolean;
    current: string;
    closebothNavBar: () => void;
}

function Nav({ dropdownParentRef, header, handleClick, dropdownOpen, current, closebothNavBar }: INav) {
    const isCurrent = (item: Queries.DirectusData_header_translations_header_nav_item): boolean => {
        if (item && current === item.header_nav_item_id?.title && dropdownOpen) {
            return true;
        }
        return false;
    };

    return (
        <nav className={styles.navbar_list} ref={dropdownParentRef}>
            <div className={styles.navbar_list_container}>
                {header!.nav_items!.map((item: Queries.Maybe<Queries.DirectusData_header_translations_header_nav_item>, i: number) => {
                    return (
                        <div className={styles.navbar_list_container_button} key={`navItem_${i}`}>
                            <button
                                id={`navItem_${i}`}
                                className={`${styles.navbar_list_item} ${
                                    item?.header_nav_item_id?.title === current ? styles.isActive : ""
                                }`}
                                tabIndex={0}
                                onClick={() => {
                                    handleClick(item?.header_nav_item_id?.title || "");
                                }}
                            >
                                <span>{item?.header_nav_item_id?.title}</span>
                                {icons.chevronDown}
                            </button>
                            <CSSTransition in={isCurrent(item!)} timeout={500} classNames="transition" unmountOnExit>
                                <NavBarDropdown content={item ?? undefined} closebothNavBar={closebothNavBar} />
                            </CSSTransition>
                        </div>
                    );
                })}
            </div>
        </nav>
    );
}

export default Nav;
