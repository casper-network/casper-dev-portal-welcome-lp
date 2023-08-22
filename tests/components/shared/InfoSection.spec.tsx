import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import InfoSection from "../../../src/components/Shared/InfoSection";
import "../../../__mocks__/matchMedia";
import { IButton } from "../../../src/utils/Types/button";
import { IInfoTile } from "../../../src/utils/Types/infoTile";
import InfoTile from "../../../src/components/Shared/InfoSection/InfoTile";

jest.mock("../../../src/components/Shared/InfoSection/InfoTile", () => jest.fn(() => null));

describe("InfoSection", () => {
    it("Should render", () => {
        const tiles = [];
        const header = "Mock header";
        const subheader = "Mock subheader";

        const { getByText } = render(<InfoSection header={header} subheader={subheader} tiles={tiles} />);

        expect(getByText(header)).toBeInTheDocument();
        expect(getByText(subheader)).toBeInTheDocument();
    });

    it("Shouldn't render InfoTile component", () => {
        const tiles = [];

        render(<InfoSection tiles={tiles} />);

        expect(InfoTile).not.toHaveBeenCalled();
    });

    it("Shouldn't render Button component", () => {
        const tiles = [];

        const { queryByRole } = render(<InfoSection tiles={tiles} />);

        expect(queryByRole("link")).not.toBeInTheDocument();
    });

    it("Should render Button component", () => {
        const tiles = [];

        const { queryByRole } = render(<InfoSection tiles={tiles} />);

        expect(queryByRole("link")).not.toBeInTheDocument();
    });

    it("Should render Button component", () => {
        const mockBtn = { text: "MockBtn", url: "mock.com" } as IButton;
        const tiles = [];

        const { queryByRole, queryAllByRole } = render(<InfoSection tiles={tiles} button={mockBtn} />);

        expect(queryByRole("link")).toBeInTheDocument();
        expect(queryAllByRole("link").length).toBe(1);
    });

    it("Should pass span 6 to InfoTile", () => {
        const mockBtn = { text: "MockBtn", url: "mock.com" } as IButton;
        const tiles = [{} as IInfoTile];

        render(<InfoSection tiles={tiles} button={mockBtn} />);

        expect(InfoTile).toHaveBeenCalledWith(expect.objectContaining({ span: 6 }), expect.anything());
    });

    it("Should pass span 4 to InfoTile", () => {
        const mockBtn = { text: "MockBtn", url: "mock.com" } as IButton;
        const tiles = [{} as IInfoTile, {} as IInfoTile, {} as IInfoTile];

        render(<InfoSection tiles={tiles} button={mockBtn} />);

        expect(InfoTile).toHaveBeenCalledWith(expect.objectContaining({ span: 6 }), expect.anything());
    });

    it("Should pass span 4 to InfoTile", () => {
        const mockBtn = { text: "MockBtn", url: "mock.com" } as IButton;
        const tiles = [{} as IInfoTile, {} as IInfoTile, {} as IInfoTile, {} as IInfoTile];

        render(<InfoSection tiles={tiles} button={mockBtn} />);

        expect(InfoTile).toHaveBeenCalledWith(expect.objectContaining({ span: 3 }), expect.anything());
    });
});
