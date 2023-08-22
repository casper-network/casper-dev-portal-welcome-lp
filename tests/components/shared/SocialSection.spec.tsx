import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import "../../../__mocks__/matchMedia";
import SocialSection from "../../../src/components/Shared/SocialSection";
import { ISocialTile } from "../../../src/utils/Types/socialTile";

describe("SocialSection", () => {
    it("Should render", () => {
        const header = "Mock header";
        const subheader = "Mock subheader";
        const tiles = [];

        const { getByText } = render(<SocialSection header={header} subheader={subheader} tiles={tiles} />);

        expect(getByText(header)).toBeInTheDocument();
        expect(getByText(subheader)).toBeInTheDocument();
    });

    it("Should render SocialTile", () => {
        const tiles = [
            { main_title: "Test tile1" } as ISocialTile,
            { main_title: "Test tile2" } as ISocialTile,
            { main_title: "Test tile3" } as ISocialTile
        ];

        render(<SocialSection header="" subheader="" tiles={tiles} />);

        tiles.forEach((tile) => {
            expect(screen.getByText(tile.main_title)).toBeInTheDocument();
        });
    });
});
