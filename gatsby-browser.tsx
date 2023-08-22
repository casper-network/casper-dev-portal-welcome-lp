import React from "react";
import Layout from "./src/components/Layout";
import { LocalizationProvider } from "./src/utils/internationalization/LocalizationContext";

export const wrapPageElement = ({ element, props }: any): any => {
    return (
        <LocalizationProvider pageContext={props.pageContext}>
            <Layout {...props}>{element}</Layout>
        </LocalizationProvider>
    );
};
