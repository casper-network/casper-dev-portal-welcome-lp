import React from "react";
import { getByAltText, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Hero from "../../../src/components/Shared/Hero";
import "../../../__mocks__/matchMedia";
import { IButton } from "../../../src/utils/Types/button";
import { IGatsbyImageData } from "gatsby-plugin-image";

describe("Hero", () => {
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
        const buttonMock = [{ text: "Btn1", url: "mock.com" } as IButton, { text: "Btn2", url: "mock.com" } as IButton];
        const { getAllByRole, getByText } = render(<Hero buttons={buttonMock} title={"Test title"} image_title="" />);
        expect(getByText("Test title")).toBeInTheDocument();
        expect(getByText(buttonMock[0].text)).toBeInTheDocument();
        expect(getByText(buttonMock[1].text)).toBeInTheDocument();
        expect(getAllByRole("link")).toHaveLength(2);
    });

    it("Should not render buttons", () => {
        const { getByText, queryByRole } = render(<Hero title={"Test title"} image_title="" />);

        expect(getByText("Test title")).toBeInTheDocument();
        expect(queryByRole("link")).toBeNull();
    });

    it("Should render background image", () => {
        render(<Hero title={"Test title"} background_image={imgMock} image_title="image_title" />);

        expect(screen.getByAltText("Hero background")).toBeInTheDocument();
    });

    it("Should render description", () => {
        const description = "Description mock";
        render(<Hero description={description} title={"Test title"} image_title="" />);

        expect(screen.getByText(description)).toBeInTheDocument();
    });

    it("Should render the hero image with main alt title", () => {
        const imageTitle = "Image Hero";

        const { getByAltText } = render(<Hero title={"Test"} image={imgMock} image_title={imageTitle} />);

        expect(getByAltText(`${imageTitle}`)).toBeInTheDocument();
    });
    it("Should render the hero image with secondary alt title", () => {
        const title = "Hero";

        const { getByAltText } = render(<Hero title={title} image={imgMock} image_title="" />);

        expect(getByAltText(`${title}`)).toBeInTheDocument();
    });
    it("Should render the hero image with default alt title", () => {
        const { getByAltText } = render(<Hero title="" image={imgMock} image_title="" />);

        expect(getByAltText(`Hero`)).toBeInTheDocument();
    });

    it("Should have span-8 class name", () => {
        const imageTitle = "Image Hero";

        const { container } = render(<Hero title={"Test"} image={imgMock} image_title={imageTitle} />);

        expect(container.children[0].children[0].children[0].classList).toContain("span-8");
    });

    it("Should render single button without hover button style", () => {
        const buttonMock = [{ text: "Btn1", url: "mock.com" } as IButton];
        const { container } = render(<Hero buttons={buttonMock} title={"Test title"} image_title="" />);

        expect(container.querySelector(".hero_container_text_btns_container")).not.toContain("hoverButtonOff");
    });
});
