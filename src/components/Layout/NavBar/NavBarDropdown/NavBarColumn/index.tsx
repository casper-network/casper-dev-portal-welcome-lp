import React from "react";
import * as styles from "./NavBarColumn.module.scss";
import NavBarGroup from "./NavBarGroup";

interface INavBarColumnProps {
    column: Queries.Maybe<Queries.DirectusData_header_nav_item_header_nav_column>;
    closebothNavBar: () => void;
}
export default function NavBarColumn({ column, closebothNavBar }: INavBarColumnProps) {
    return (
        <div className={styles.dropdown_column}>
            {column &&
                column.header_nav_column_id &&
                column.header_nav_column_id.groups &&
                column?.header_nav_column_id?.groups.map(
                    (group: Queries.Maybe<Queries.DirectusData_header_nav_column_header_link_column>, i: number) => {
                        return <NavBarGroup key={`column_group_${i}`} group={group} closebothNavBar={closebothNavBar} />;
                    }
                )}
        </div>
    );
}
