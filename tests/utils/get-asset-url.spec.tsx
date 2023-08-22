import { getAssetURL } from "../../src/utils/get-asset-url";
import "@testing-library/jest-dom";

describe("get asset url", () => {
    let env;
    beforeEach(() => {
        env = { ...process.env };
    });
    afterEach(() => {
        process.env = env;
    });
    it("Should return the asset url", () => {
        process.env.GATSBY_DIRECTUS_URL = "mock_src";
        const result = getAssetURL("img0");
        expect(result).toBe("mock_src/assets/img0");
    });

    it("Should return the asset url", () => {
        process.env.GATSBY_DIRECTUS_URL = "mock_src";
        const result = getAssetURL("");
        expect(result).toBe(null);
    });
});
