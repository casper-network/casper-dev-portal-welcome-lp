import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import FeatureTile from "../../../src/components/Shared/FeatureSection/FeatureTile";
import "../../../__mocks__/matchMedia";

describe("FeatureTile", () => {
    it("Should render", () => {
        const title = "Mock title";
        const description = "This is a mock description with external URL";
        const { getByText } = render(<FeatureTile title={title} description={description} color="" icon="" />);

        expect(getByText(title)).toBeInTheDocument();
        expect(getByText(description)).toBeInTheDocument();
    });

    it("Should have color prop as class", () => {
        const color = "red";
        const { container } = render(<FeatureTile title="" description="" color={color} icon="" />);

        expect(container.children[0].children[0].classList).toContain(color);
    });
});
