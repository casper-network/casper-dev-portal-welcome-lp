import React, { Dispatch, PropsWithChildren, ReactElement, SetStateAction, useEffect, useState } from "react";
import useWindow from "../../hooks/useWindow";
import * as styles from "./ThemeContext.module.scss";

export interface IModalState {
    lightTheme: boolean | undefined;
    setLightTheme: Dispatch<SetStateAction<boolean | undefined>>;
}

export const ThemeContext = React.createContext<IModalState>({ lightTheme: false, setLightTheme: () => undefined });

export function ThemeContextProvider(props: PropsWithChildren<{}>): ReactElement {
    const [lightTheme, setLightTheme] = useState<boolean | undefined>(undefined);
    const [isThemeLoaded, setIsThemeLoaded] = useState<boolean>(false);

    const value = { lightTheme, setLightTheme };
    const { children } = props;

    useEffect(() => {
        if (useWindow()) {
            setLightTheme(localStorage.getItem("theme-pref") === "light");
        }
    }, []);

    useEffect(() => {
        if (document && document.body && lightTheme !== undefined) {
            if (lightTheme) {
                document.body.classList.add("light");
                window.localStorage.setItem("theme-pref", "light");
            } else {
                document.body.classList.remove("light");
                window.localStorage.setItem("theme-pref", "dark");
            }

            setIsThemeLoaded(true);
        }
    }, [lightTheme]);
    return (
        <ThemeContext.Provider value={value}>
            <div className={isThemeLoaded ? styles.themeLoaded : styles.themeLoading}>{children}</div>
        </ThemeContext.Provider>
    );
}
