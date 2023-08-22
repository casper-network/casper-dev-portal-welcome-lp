import * as React from "react";
import { createContext } from "react";
import { useState } from "react";
import { navigate, withPrefix } from "gatsby";

export const LocalizationContext = createContext<any>(0);
LocalizationContext.displayName = "Localization";

const isAbsolutePath = (path: string) => path?.startsWith(`/`);

export const LocalizationProvider = ({ children, pageContext }: any) => {
    const { locale, defaultLocale, locales } = pageContext;

    const localizePath = (path: string) => {
        const localizePath =
            !locale || !defaultLocale || locale.toLocaleLowerCase() === defaultLocale.toLocaleLowerCase() || !isAbsolutePath(path)
                ? path
                : withPrefix(`/${locale.toLowerCase()}${path}`);

        return localizePath;
    };

    const [localization] = useState({
        locale,
        defaultLocale,
        locales,
        localizePath,
        localizedNavigate: (to: any, options: any) => navigate(localizePath(to), options)
    });

    return <LocalizationContext.Provider value={localization}> {children} </LocalizationContext.Provider>;
};
