import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import "../../../__mocks__/matchMedia";
import Section from "../../../src/components/Shared/Section";

function MockComponent({ text }: { text: string }) {
    return <div className="Mock">{text}</div>;
}

describe("Section", () => {
    it("Should render", () => {
        const header = "Mock header";
        const subHeader = "Mock subheader";
        const { getByText } = render(<Section header={header} subheader={subHeader} />);

        expect(getByText(header)).toBeInTheDocument();
        expect(getByText(subHeader)).toBeInTheDocument();
    });

    it("Should render with styles", () => {
        const setStyles = "testStyle";

        const { container } = render(<Section setStyles={setStyles} />);

        expect(container.children[0].classList).toContain(setStyles);
    });

    it("Should render child component", () => {
        const childText = "This is a test";
        const { getByText } = render(
            <Section>
                <MockComponent text={childText} />
            </Section>
        );

        expect(getByText(childText)).toBeInTheDocument();
    });
});
