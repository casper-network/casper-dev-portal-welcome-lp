import React from "react";
import "../../../__mocks__/matchMedia";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { renderHook } from "@testing-library/react";
import useClickOutside from "../../../src/components/Shared/Search/UseClickOutside";
import User from "@testing-library/user-event";

function Component() {
    return (
        <div>
            <div>Element1</div>
            <div>Element2</div>
        </div>
    );
}
describe("UseClickOutside", () => {
    it("calls onClickOutside with false when clicking outside ref element", async () => {
        const onClickOutsideMock = jest.fn();
        render(
            <div>
                <Component />
            </div>
        );

        const div = screen.getByText("Element1");
        const div2 = screen.getByText("Element2");
        const ref = { current: div };

        renderHook(() => useClickOutside(ref, onClickOutsideMock));

        await User.click(div2);

        expect(onClickOutsideMock).toHaveBeenCalledWith(false);
    });

    it("calls onClickOutside with true when clicking the ref element", async () => {
        const onClickOutsideMock = jest.fn();
        render(<Component />);

        const div = screen.getByText("Element1");
        const div2 = screen.getByText("Element2");
        const ref = { current: div };

        renderHook(() => useClickOutside(ref, onClickOutsideMock));

        await User.click(ref.current);

        expect(onClickOutsideMock).toHaveBeenCalledWith(true);
    });
});
