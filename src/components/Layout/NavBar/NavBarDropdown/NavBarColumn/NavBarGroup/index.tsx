import React from "react";
import * as styles from "./NavBarGroup.module.scss";
import NavBarLink from "./NavBarLink";

interface INavBarGroupProps {
    group: Queries.Maybe<Queries.DirectusData_header_nav_column_header_link_column>;
    closebothNavBar: () => void;
}
export default function NavBarGroup({ group, closebothNavBar }: INavBarGroupProps) {
    return (
        <div className={styles.linkGroup}>
            <span className="halfTitleEyebrow noWrap">{group?.header_link_column_id?.title}</span>
            <ul className={`primaryParagraph noWrap ${styles.linkList}`}>
                {group &&
                    group.header_link_column_id &&
                    group.header_link_column_id.links &&
                    group.header_link_column_id.links.map(
                        (link: Queries.Maybe<Queries.DirectusData_header_link_column_link>, i: number) => {
                            return <NavBarLink key={`column_group_link_${i}`} link={link} closebothNavBar={closebothNavBar} />;
                        }
                    )}
            </ul>
        </div>
    );
}
