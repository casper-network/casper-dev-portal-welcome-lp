import React, { useContext } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import "../../stylesheets/main.scss";
import * as styles from "./Layout.module.scss";
import { ModalContextContextProvider } from "../../context/ModalContext";
import CookieModal from "./Modals/CookieModal";
import { ThemeContextProvider } from "../../context/ThemeContext";

function Layout(props: any) {
    const { children } = props;

    return (
        <>
            <ModalContextContextProvider>
                <ThemeContextProvider>
                    <CookieModal />
                    <NavBar />
                        <div className={styles.content}>{children}</div>
                    <Footer />
                </ThemeContextProvider>
            </ModalContextContextProvider>
        </>
    );
}

export default Layout;
