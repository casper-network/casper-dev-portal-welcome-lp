import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import "../../../__mocks__/matchMedia";
import SocialTile from "../../../src/components/Shared/SocialSection/SocialTile";
import { IButton } from "../../../src/utils/Types/button";
import { IGatsbyImageData } from "gatsby-plugin-image";

const mockBtn = { text: "Mock btn", url: "mockUrl.com" } as IButton;
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
describe("SocialTile", () => {
    it("Should render", () => {
        const mainTitle = "Mock title";
        const secondaryTitle = "Mock secondary title";

        const { getByText } = renderWithProps({ main_title: mainTitle, secondary_title: secondaryTitle });

        expect(getByText(mainTitle)).toBeInTheDocument();
        expect(getByText(secondaryTitle)).toBeInTheDocument();
        expect(getByText(mockBtn.text)).toBeInTheDocument();
    });

    it("Should render image with main alt text", () => {
        const mainTitle = "Mock title";
        const imageTitle = "Mock image title";

        const { getByAltText } = renderWithProps({ main_title: mainTitle, image_title: imageTitle, image: true });

        expect(getByAltText(`${imageTitle}`)).toBeInTheDocument();
    });

    it("Should render image with secondary alt text", () => {
        const mainTitle = "Mock title";

        const { getByAltText } = renderWithProps({ main_title: mainTitle, image_title: "", image: true });

        expect(getByAltText(`${mainTitle}`)).toBeInTheDocument();
    });

    it("Should render image with default alt text", () => {
        const { getByAltText } = renderWithProps({ main_title: "", image_title: "", image: true });

        expect(getByAltText(`SocialTile`)).toBeInTheDocument();
    });

    it("Should not render image", () => {
        const { queryByAltText } = renderWithProps({ main_title: "", image_title: "", image: false });

        expect(queryByAltText(`SocialTile`)).not.toBeInTheDocument();
    });
});

function renderWithProps({ main_title = "", secondary_title = "", description = "", icon = "", image_title = "", image = false }) {
    if (image) {
        return render(
            <SocialTile
                main_title={main_title}
                secondary_title={secondary_title}
                description={description}
                icon={icon}
                button={mockBtn}
                image={imgMock}
                image_title={image_title}
            />
        );
    }
    return render(
        <SocialTile
            main_title={main_title}
            secondary_title={secondary_title}
            description={description}
            icon={icon}
            button={mockBtn}
            image_title={image_title}
        />
    );
}
