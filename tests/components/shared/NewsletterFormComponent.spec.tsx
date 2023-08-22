import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import NewsletterFormComponent from "../../../src/components/Shared/NewsletterFormComponent";
import "../../../__mocks__/matchMedia";
import { IButton } from "../../../src/utils/Types/button";
import { IGatsbyImageData } from "gatsby-plugin-image";
import { pageContext } from "../../../__mocks__/homePageContext";
import User from "@testing-library/user-event";
jest.mock("gatsby-plugin-image", () => {
    return {
        __esModule: true,
        StaticImage: jest.fn().mockImplementation(() => {
            return <div>Gatsby Image</div>;
        })
    };
});

const context = { newsletter: pageContext.data.directus.newsletter_page.translations[0] };

describe("NewsletterFormComponent", () => {
    let originalFetch;

    beforeEach(() => {
        originalFetch = global.fetch;
        global.fetch = jest.fn(
            () =>
                Promise.resolve({
                    json: () => Promise.resolve({})
                }) as unknown as Promise<Response>
        );
    });
    afterEach(() => {
        jest.clearAllMocks();
        global.fetch = originalFetch;
    });

    it("Should render", async () => {
        mockFetchSuccess();
        render(<NewsletterFormComponent pageContext={context}></NewsletterFormComponent>);
        expect(await screen.findByText("Sign up for the Developer Newsletter")).toBeInTheDocument();
    });

    it("Should send form correctly", async () => {
        mockFetchSuccess();
        const { container } = render(<NewsletterFormComponent pageContext={context}></NewsletterFormComponent>);

        await fillForm(container);

        expect(await screen.findByText("You are going to receive an email to complete your subscription")).toBeInTheDocument();
    });

    it("Should send form correctly and show default success message", async () => {
        mockFetchSuccess();
        const tempContext = JSON.parse(JSON.stringify(context));
        tempContext.newsletter.success_message = undefined;
        const { container } = render(<NewsletterFormComponent pageContext={tempContext} />);
        await fillForm(container);

        expect(await screen.findByText("Success")).toBeInTheDocument();
    });

    it("Should fail to send form", async () => {
        mockFetchPostError();
        const { container } = render(<NewsletterFormComponent pageContext={context} />);

        await fillForm(container);

        expect(await screen.findByText("There was an error. Please validate your information and try again")).toBeInTheDocument();
    });
    it("Should fail to send form and show default message", async () => {
        mockFetchPostError();
        const tempContext = JSON.parse(JSON.stringify(context));
        tempContext.newsletter.error_message = undefined;
        const { container } = render(<NewsletterFormComponent pageContext={tempContext} />);
        await fillForm(container);

        expect(await screen.findByText("Error")).toBeInTheDocument();
    });

    it("Should validate incorrect email", async () => {
        mockFetchSuccess();
        const { container } = render(<NewsletterFormComponent pageContext={context} />);

        const emailInput = container.querySelector("#email")!;

        await User.type(emailInput, "test");

        expect(await screen.findByText("Enter a valid email")).toBeInTheDocument();
    });

    it("Should validate incorrect email with default message", async () => {
        mockFetchSuccess();
        const tempContext = JSON.parse(JSON.stringify(context));
        tempContext.newsletter.email_invalid_text = undefined;
        const { container } = render(<NewsletterFormComponent pageContext={tempContext} />);

        const emailInput = container.querySelector("#email")!;

        await User.type(emailInput, "test");

        expect(await screen.findByText("Email is an invalid email")).toBeInTheDocument();
    });

    it("Should validate empty fields", async () => {
        mockFetchSuccess();
        render(<NewsletterFormComponent pageContext={context} />);

        const submitBtn = screen.getByRole("button", { name: /join now/i });

        await User.click(submitBtn);

        expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();
        expect(await screen.findByText(/First Name is required/i)).toBeInTheDocument();
        expect(await screen.findByText(/i am is required/i)).toBeInTheDocument();
        expect(await screen.findByText(/Country is required/i)).toBeInTheDocument();
        expect(await screen.findByText(/Must agree/i)).toBeInTheDocument();
    });

    it("Should validate empty fields with default message", async () => {
        mockFetchSuccess();
        const tempContext = JSON.parse(JSON.stringify(context));
        tempContext.newsletter.email_required_text = undefined as any;
        tempContext.newsletter.firt_name_required_text = undefined as any;
        tempContext.newsletter.i_am_required_text = undefined as any;
        tempContext.newsletter.country_required_text = undefined as any;
        tempContext.newsletter.agree_required_text = undefined as any;
        render(<NewsletterFormComponent pageContext={tempContext} />);

        const submitBtn = screen.getByRole("button", { name: /join now/i });

        await User.click(submitBtn);

        expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();
        expect(await screen.findByText(/First Name is required/i)).toBeInTheDocument();
        expect(await screen.findByText(/I am is required/i)).toBeInTheDocument();
        expect(await screen.findByText(/Country is required/i)).toBeInTheDocument();
        expect(await screen.findByText(/Must agree/i)).toBeInTheDocument();
    });

    it("Should validate email on blur", async () => {
        mockFetchSuccess();
        const { container } = render(<NewsletterFormComponent pageContext={context} />);

        const iAmSelect = screen.getAllByRole("combobox")[0];
        const emailInput = container.querySelector("#email")!;

        await User.click(emailInput);
        await User.click(iAmSelect);

        expect(await screen.findByText("Email is required")).toBeInTheDocument();
    });

    it("Should validate name on blur", async () => {
        mockFetchSuccess();
        const { container } = render(<NewsletterFormComponent pageContext={context} />);

        const nameInput = container.querySelector("#first_name")!;
        const iAmSelect = screen.getAllByRole("combobox")[0];
        await User.click(nameInput);
        await User.click(iAmSelect);

        expect(await screen.findByText("First Name is required")).toBeInTheDocument();
    });

    it("Should validate 'i am' on blur", async () => {
        mockFetchSuccess();

        render(<NewsletterFormComponent pageContext={context} />);

        const iAmSelect = screen.getAllByRole("combobox")[0];
        const countrySelect = screen.getAllByRole("combobox")[1];
        await User.click(iAmSelect);
        await User.click(countrySelect);

        expect(await screen.findByText("I Am is required")).toBeInTheDocument();
    });

    it("Should validate country on blur", async () => {
        mockFetchSuccess();
        render(<NewsletterFormComponent pageContext={context} />);

        const iAmSelect = screen.getAllByRole("combobox")[0];
        const countrySelect = screen.getAllByRole("combobox")[1];
        await User.click(countrySelect);
        await User.click(iAmSelect);

        expect(await screen.findByText("Country is required")).toBeInTheDocument();
    });

    it("Should validate agree checkbox when unchecked", async () => {
        mockFetchSuccess();
        const { container } = render(<NewsletterFormComponent pageContext={context} />);

        const checkbox = container.querySelector("label[for=checkbox]")!;

        await User.click(checkbox);
        await User.click(checkbox);

        expect(await screen.findByText("Must agree")).toBeInTheDocument();
    });

    it("Should change checkbox on 'Enter' key press ", async () => {
        mockFetchSuccess();
        const { container } = render(<NewsletterFormComponent pageContext={context} />);

        const checkbox = container.querySelector("label[for=checkbox]")!;
        const checkInput = container.querySelector("#checkbox") as HTMLInputElement;
        await User.click(checkbox);
        expect(checkInput.checked).toBe(true);
        fireEvent.keyDown(checkbox, { key: "Enter" });
        expect(checkInput.checked).toBe(false);
    });

    it("Shouldn't change checkbox on other key press ", async () => {
        mockFetchSuccess();
        const { container } = render(<NewsletterFormComponent pageContext={context} />);

        const checkbox = container.querySelector("label[for=checkbox]")!;
        const checkInput = container.querySelector("#checkbox") as HTMLInputElement;
        await User.click(checkbox);
        expect(checkInput.checked).toBe(true);
        fireEvent.keyDown(checkbox, { key: "Escape" });
        expect(checkInput.checked).toBe(true);
    });
});

function mockFetchSuccess() {
    const mockResponseGet = {
        countries: [
            { label: "Argentina", value: "Argentina" },
            { label: "Brasil", value: "Brasil" },
            { label: "United States", value: "United States" }
        ],
        iamOptions: [
            { label: "a developer", value: "persona_1" },
            { label: "Other", value: "persona_2" }
        ]
    };
    const mockJsonPromiseGet = Promise.resolve(mockResponseGet);
    const mockGetFetch = Promise.resolve({
        json: () => mockJsonPromiseGet,
        status: 200,
        ok: true
    });

    const mockPostFetch = Promise.resolve({
        status: 200,
        ok: true
    });

    global.fetch = jest.fn().mockReturnValueOnce(mockGetFetch).mockReturnValueOnce(mockPostFetch);
}

async function fillForm(container) {
    const emailInput = container.querySelector("#email")!;
    const nameInput = container.querySelector("#first_name")!;
    const iAmSelect = screen.getAllByRole("combobox")[0];
    const countrySelect = screen.getAllByRole("combobox")[1];
    const checkbox = container.querySelector("label[for=checkbox]")!;
    const submitBtn = screen.getByRole("button", { name: /join now/i });

    await User.type(emailInput, "test@test.com");
    await User.type(nameInput, "Mock name");

    await User.click(iAmSelect);
    const iAmOption = await screen.findByText("a developer");
    await User.click(iAmOption);

    await User.click(countrySelect);
    const countryOption = await screen.findByText("Argentina");
    await User.click(countryOption);

    await User.click(checkbox);
    await User.click(submitBtn);
}

function mockFetchPostError() {
    const mockResponseGet = {
        countries: [
            { label: "Argentina", value: "Argentina" },
            { label: "Brasil", value: "Brasil" },
            { label: "United States", value: "United States" }
        ],
        iamOptions: [
            { label: "a developer", value: "persona_1" },
            { label: "Other", value: "persona_2" }
        ]
    };
    const mockJsonPromiseGet = Promise.resolve(mockResponseGet);
    const mockGetFetch = Promise.resolve({
        json: () => mockJsonPromiseGet,
        status: 200,
        ok: true
    });

    const mockPostFetch = Promise.resolve({
        status: 500,
        ok: false
    });

    global.fetch = jest.fn().mockReturnValueOnce(mockGetFetch).mockReturnValueOnce(mockPostFetch);
}
