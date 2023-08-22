import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import InfoTile from "../../../src/components/Shared/InfoSection/InfoTile";
import "../../../__mocks__/matchMedia";
import { IGatsbyImageData } from "gatsby-plugin-image";
import { IButton } from "../../../src/utils/Types/button";

describe("InfoTile", () => {
    const imgMock = {
        layout: "constrained",
        images: {
            fallback: {
                src: "/static/5465149c69097bd957b09f0ad19a3061/dca65/Casper_Illustrations-33.png",
                srcSet: "/static/5465149c69097bd957b09f0ad19a3061/a57e3/Casper_Illustrations-33.png 129w,\n/static/5465149c69097bd957b09f0ad19a3061/2793d/Casper_Illustrations-33.png 258w,\n/static/5465149c69097bd957b09f0ad19a3061/dca65/Casper_Illustrations-33.png 516w",
                sizes: "(min-width: 516px) 516px, 100vw"
            }
        },
        width: 516,
        height: 527
    } as IGatsbyImageData;

    it("Should render", () => {
        const tile = { title: "Mock tile", image_title: "", content: "Mock content" };
        const { getByText } = render(<InfoTile tile={tile} span={6} />);

        expect(getByText(tile.title)).toBeInTheDocument();
        expect(getByText(tile.content)).toBeInTheDocument();
    });

    it("Should render with prop span", () => {
        const tile = { title: "Mock tile", image_title: "" };
        const { container } = render(<InfoTile tile={tile} span={4} />);

        expect(container.querySelector(`div[class^=infoTileWrapper]`)?.classList).toContain("span-4");
    });

    it("Shouldn't render image", () => {
        const tile = { title: "Mock tile", image_title: "" };
        const { container } = render(<InfoTile tile={tile} span={4} />);

        expect(container.querySelector(`div[class^=image]`)).not.toBeInTheDocument();
    });

    it("Should render image with main alt text", () => {
        const tile = { title: "Mock tile", image_title: "Mock img", image: imgMock };
        render(<InfoTile tile={tile} span={4} />);

        expect(screen.getByAltText(tile.image_title)).toBeInTheDocument();
    });

    it("Should render image with secondary alt text", () => {
        const tile = { title: "Mock tile", image_title: "", image: imgMock };
        render(<InfoTile tile={tile} span={4} />);

        expect(screen.getByAltText(tile.title)).toBeInTheDocument();
    });

    it("Should render button", () => {
        const buttonMock = { text: "Btn1", url: "mock.com" } as IButton;
        const tile = { title: "Mock tile", button: buttonMock, image_title: "", image: imgMock };
        render(<InfoTile tile={tile} span={4} />);

        expect(screen.getByRole("link")).toBeInTheDocument();
    });

    // ref mock to set client height
    function createRefMock(props: { [propName: string]: any }) {
        const ref = { current: {} };
        const refKey = Symbol("ref");
        Object.defineProperty(ref, "current", {
            set(current) {
                if (current) {
                    Object.entries(props).forEach(([prop, value]) => {
                        Object.defineProperty(current, prop, { value });
                    });
                }
                this[refKey] = current;
            },
            get() {
                return this[refKey];
            }
        });
        return ref;
    }
    it("Should change tabIndex", () => {
        const ref = createRefMock({ clientHeight: 10, scrollHeight: 150 });

        jest.spyOn(React, "createRef").mockReturnValue(ref);

        const tile = { title: "Mock tile", image_title: "", image: imgMock, content: "Test content" };
        const { container } = render(<InfoTile tile={tile} span={4} />);

        expect(container.querySelector(".primaryParagraph")?.getAttribute("tabIndex")).toBe("0");
    });
});
