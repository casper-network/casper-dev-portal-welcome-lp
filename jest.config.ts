import type { Config } from "jest";

const config: Config = {
    transform: {
        "^.+\\.[jt]sx?$": "<rootDir>/jest-preprocess.ts"
    },
    moduleNameMapper: {
        ".+\\.(css|styl|less|sass|scss)$": `<rootDir>/__mocks__/identity-obj-proxy.ts`,
        ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `<rootDir>/__mocks__/file-mock.tsx`,
        "^@reach/router$": "<rootDir>/node_modules/@gatsbyjs/reach-router"
    },
    testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`],
    transformIgnorePatterns: [`node_modules/(?!(gatsby|gatsby-script|gatsby-link)/)`],
    globals: {
        __PATH_PREFIX__: ``
    },
    testEnvironment: "jsdom",
    testEnvironmentOptions: {
        url: `http://localhost`
    },
    setupFiles: [`<rootDir>/loadershim.ts`]
};

export default config;
