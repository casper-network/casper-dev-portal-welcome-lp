import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import "../../../__mocks__/matchMedia";
import Layout from "../../../src/components/Layout";
jest.mock("../../../src/components/Layout/NavBar", () => {
    return () => <div>Mocked NavBar</div>;
});

jest.mock("../../../src/components/Layout/Footer", () => {
    return () => <div>Mocked Footer</div>;
});

jest.mock("../../../src/components/Layout/Modals/CookieModal", () => {
    return () => <div>Mocked cookie modal</div>;
});

describe("Layout", () => {
    let originalFetch;
    beforeEach(() => {
        originalFetch = global.fetch;
        global.fetch = jest.fn(
            () =>
                Promise.resolve({
                    json: () => Promise.resolve([])
                }) as unknown as Promise<Response>
        );
    });
    afterEach(() => {
        jest.clearAllMocks();
        global.fetch = originalFetch;
    });
    it("Should render", () => {
        render(<Layout>Test content</Layout>);
        expect(screen.getByText("Mocked NavBar")).toBeInTheDocument();
        expect(screen.getByText("Test content")).toBeInTheDocument();
        expect(screen.getByText("Mocked cookie modal")).toBeInTheDocument();
    });
});
