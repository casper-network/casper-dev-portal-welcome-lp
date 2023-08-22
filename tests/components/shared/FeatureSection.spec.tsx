import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { IImageAndTextBlock } from "../../../src/utils/Types/imageandtextblockTile";
import "../../../__mocks__/matchMedia";
import FeatureSection from "../../../src/components/Shared/FeatureSection";
import { IResourceTile } from "../../../src/utils/Types/resourceTile";
import { IButton } from "../../../src/utils/Types/button";

describe("FeatureSection", () => {
    const mockBtn = { url: "mockUrl.com" } as IButton;
    it("Should render", () => {
        const tiles = [];
        const header = "Test header";
        const subheader = "Test subheader";
        const imageAndTextBlock = { title: "test" } as IImageAndTextBlock;
        const { getByText } = render(<FeatureSection header={header} tiles={tiles} subheader={subheader} />);

        expect(getByText("Test header")).toBeInTheDocument();
    });

    it("FeatureSection component should render by the length of tiles array", () => {
        const imageAndTextBlock = {} as IImageAndTextBlock;
        const tiles: IResourceTile[] = [
            { title: "Test tile 1", button: mockBtn } as IResourceTile,
            { title: "Test tile 2", button: mockBtn } as IResourceTile,
            { title: "Test tile 3", button: mockBtn } as IResourceTile
        ];
        const header = "Test header";
        const subheader = "Test subheader";
        const { getByText, getAllByRole } = render(<FeatureSection header={header} tiles={tiles} subheader={subheader} />);

        tiles.forEach((tile) => {
            expect(getByText(tile.title)).toBeInTheDocument();
        });
        expect(getAllByRole("link").length).toBe(tiles.length);
    });

    it("FeatureTile container should have span-4 class ", () => {
        const imageAndTextBlock = {} as IImageAndTextBlock;
        const tiles: IResourceTile[] = [{ title: "Test tile 1" } as IResourceTile];
        const { container } = render(<FeatureSection tiles={tiles} />);

        expect(container.children[0].querySelector(`div[class^="resource_content_card"]`)?.classList).toContain("span-4");
    });
});
