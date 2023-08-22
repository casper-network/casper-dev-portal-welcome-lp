import * as React from "react";
import { Router } from "@reach/router";
import useLocalization from "./useLocalization";

const LocalizedRouter = ({ basepath, children, ...rest }: any) => {
    const { localizePath } = useLocalization();
    const path = localizePath(basepath);

    return (
        <Router basepath={path} {...rest}>
            {children}
        </Router>
    );
};

export default LocalizedRouter;
