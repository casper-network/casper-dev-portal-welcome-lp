import React, { useEffect, useState } from "react";
import * as styles from "./NewsletterFormComponent.module.scss";
import Select from "react-select";
import { icons } from "../../../svg/Icons";
import Section from "../Section";
import { StaticImage } from "gatsby-plugin-image";

export default function NewsletterFormComponent({ newsletterData }: any) {
    const [countries, setCountries] = useState([]);
    const [iamOptions, setIamOptions] = useState([]);

    const [submitError, setSubmitError] = useState<string>("");
    const [submitSuccess, setSubmitSuccess] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    function handleLoadingState(boolState: boolean) {
        if (document && !boolState) document.body.classList.remove("preventScrollDocument");
        else if (document && boolState) document.body.classList.add("preventScrollDocument");
        setLoading(boolState);
    }

    useEffect(() => {
        const getData = async () => {
            const res = await fetch(`${process.env.GATSBY_DIRECTUS_URL}/newsletter`);
            const json = await res.json();
            setCountries(json.countries);
            setIamOptions(json.iamOptions);
        };

        getData();
    }, []);

    // -- Email
    const [email, setEmail] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        validateEmail(event.target.value);
    };
    const handleEmailBlur = () => {
        validateEmail(email);
    };
    const validateEmail = (emailValue: string): boolean => {
        if (!emailValue) {
            setEmailError(newsletterData.email_required_text ?? `${newsletterData.email_label} is required`);
            return false;
        }
        const re = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$");
        if (!re.test(emailValue)) {
            setEmailError(newsletterData.email_invalid_text ?? `${newsletterData.email_label} is an invalid email`);
            return false;
        }
        setEmailError("");
        return true;
    };

    // -- First Name
    const [firstName, setFirstName] = useState<string>("");
    const [firstNameError, setFirstNameError] = useState<string>("");
    const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value);
        validateFirstName(event.target.value);
    };
    const handleFirstNameBlur = () => {
        validateFirstName(firstName);
    };
    const validateFirstName = (firstNameValue: string): boolean => {
        if (!firstNameValue) {
            setFirstNameError(newsletterData.firt_name_required_text ?? `${newsletterData.first_name_label} is required`);
            return false;
        } else {
            setFirstNameError("");
            return true;
        }
    };

    // -- I am
    const [iAm, setIAm] = useState<string>("");
    const [iAmError, setIAmError] = useState<string>("");
    const handleIAmChange = ({ value }: any) => {
        setIAm(value);
        validateIAm(value);
    };
    const handleIAmBlur = () => {
        validateIAm(iAm);
    };
    const validateIAm = (iAmValue: string): boolean => {
        if (!iAmValue) {
            setIAmError(newsletterData.i_am_required_text ?? `${newsletterData.i_am_label} is required`);
            return false;
        } else {
            setIAmError("");
            return true;
        }
    };

    // -- Country
    const [country, setCountry] = useState<string>("");
    const [countryError, setCountryError] = useState<string>("");
    const handleCountryChange = ({ value }: any) => {
        setCountry(value);
        validateCountry(value);
    };
    const handleCountryBlur = () => {
        validateCountry(country);
    };
    const validateCountry = (countryValue: string): boolean => {
        if (!countryValue) {
            setCountryError(newsletterData.country_required_text ?? `${newsletterData.country_label} is required`);
            return false;
        } else {
            setCountryError("");
            return true;
        }
    };

    const [agree, setAgree] = useState<boolean>(false);

    const handleAgreeChange = () => {
        setAgree(!agree);
        validateAgree(!agree);
    };
    const [agreeError, setAgreeError] = useState<string>("");

    const validateAgree = (value: boolean): boolean => {
        if (!value) {
            setAgreeError(newsletterData.agree_required_text ?? `Must agree`);
            return false;
        } else {
            setAgreeError("");
            return true;
        }
    };

    const handleSubmit = async () => {
        handleLoadingState(true);
        const emailValid = validateEmail(email);
        const firstNameValid = validateFirstName(firstName);
        const iAmValid = validateIAm(iAm);
        const countryValid = validateCountry(country);
        const agreeValid = validateAgree(agree);
        const valid = emailValid && firstNameValid && iAmValid && countryValid && agreeValid;
        if (!valid) {
            handleLoadingState(false);
            return;
        }

        setSubmitError("");
        setSubmitSuccess("");
        const response = await fetch(`${process.env.GATSBY_DIRECTUS_URL}/newsletter`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                firstname: firstName,
                hs_persona: iAm,
                country_dropdown: country
            })
        });

        if (response.status != 200) {
            setSubmitError(newsletterData.error_message ?? "Error");
        } else {
            setSubmitSuccess(newsletterData.success_message ?? "Success");
        }
        handleLoadingState(false);
    };

    function handleCheckChange(e: any) {
        if (e.key != "Enter") return;
        handleAgreeChange();
    }
    return (
        <div className={styles.newsletterContainer}>
            <Section
                header="Begin your Casper journey"
                subheader="Sign up for a series of five emails to introduce you to the Casper developer community"
            >
                {submitSuccess && (
                    <div className={`container ${styles.indexForm}`}>
                        <div className="contentBox">
                            <div className="span-12">
                                <div className={styles.onSubmit}>
                                    <h4>{submitSuccess}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {!submitSuccess && newsletterData && (
                    <div className={`container ${styles.indexForm}`}>
                        <div className="contentBox">
                            <div className="span-12">
                                <form className={styles.form}>
                                    {submitError && (
                                        <div className={styles.errorSubmit}>
                                            {icons.error}
                                            <h4>{submitError}</h4>
                                        </div>
                                    )}

                                    <div className={styles.email}>
                                        <label htmlFor="email">{newsletterData.email_label}</label>
                                        <input
                                            value={email}
                                            className="primaryParagraph"
                                            type="text"
                                            name="email"
                                            id="email"
                                            onChange={handleEmailChange}
                                            onBlur={handleEmailBlur}
                                        />
                                        {emailError && (
                                            <label htmlFor="email Error" className={styles.error}>
                                                {emailError}
                                            </label>
                                        )}
                                    </div>

                                    <div className={styles.name}>
                                        <label htmlFor="first_name">{newsletterData.first_name_label}</label>
                                        <input
                                            value={firstName}
                                            type="text"
                                            name="first_name"
                                            id="first_name"
                                            onChange={handleFirstNameChange}
                                            onBlur={handleFirstNameBlur}
                                        />
                                        {firstNameError && (
                                            <label htmlFor="name Error" className={styles.error}>
                                                {firstNameError}
                                            </label>
                                        )}
                                    </div>

                                    <div className={styles.iAm}>
                                        <label htmlFor="I am">{newsletterData.i_am_label}</label>
                                        <Select
                                            options={iamOptions}
                                            onChange={handleIAmChange}
                                            onBlur={handleIAmBlur}
                                            inputId={"I am"}
                                            classNames={{
                                                control: (state) =>
                                                    state.menuIsOpen || state.isFocused ? styles.noBorder : styles.noBorder,
                                                option: (state) => (state.isFocused ? styles.isFocused : styles.nonFocused),
                                                menuList: () => styles.scrollBarSelect,
                                                dropdownIndicator: (state) =>
                                                    state.selectProps.menuIsOpen ? styles.openSVG : styles.closeSVG,
                                                indicatorSeparator: () => styles.indicatorSeparator
                                            }}
                                        />
                                        {iAmError && (
                                            <label htmlFor="I am Error" className={styles.error}>
                                                {iAmError}
                                            </label>
                                        )}
                                    </div>

                                    <div className={styles.country}>
                                        <label htmlFor="Country">{newsletterData.country_label}</label>
                                        <Select
                                            options={countries}
                                            onChange={handleCountryChange}
                                            onBlur={handleCountryBlur}
                                            inputId={"Country"}
                                            classNames={{
                                                control: (state) =>
                                                    state.menuIsOpen || state.isFocused ? styles.noBorder : styles.noBorder,
                                                option: (state) => (state.isFocused ? styles.isFocused : styles.nonFocused),
                                                menuList: () => styles.scrollBarSelect,
                                                dropdownIndicator: (state) =>
                                                    state.selectProps.menuIsOpen ? styles.openSVG : styles.closeSVG,
                                                indicatorSeparator: () => styles.indicatorSeparator
                                            }}
                                        />
                                        {countryError && (
                                            <label htmlFor="Country error" className={styles.error}>
                                                {countryError}
                                            </label>
                                        )}
                                    </div>

                                    <div className={styles.agreeBox}>
                                        <div className={styles.agreeBox_checkbox}>
                                            <input
                                                type="checkbox"
                                                id="checkbox"
                                                className={styles.checkInput}
                                                checked={agree}
                                                onChange={handleAgreeChange}
                                            />
                                            <label
                                                htmlFor="checkbox"
                                                className={styles.checkbox}
                                                tabIndex={0}
                                                onKeyDown={handleCheckChange}
                                            >
                                                {icons.check}
                                            </label>

                                            <span className="primaryParagraph">{newsletterData.agree_label}</span>
                                        </div>
                                        {agreeError && (
                                            <label htmlFor="Agree Error" className={styles.error}>
                                                {agreeError}
                                            </label>
                                        )}
                                    </div>

                                    <div className={styles.description}>
                                        <div
                                            className={`${styles.paragraphContainer} secondaryParagraph`}
                                            dangerouslySetInnerHTML={{ __html: newsletterData.description! }}
                                        ></div>
                                    </div>
                                    <div>
                                        <button type="button" className={`${styles.button} ${styles.primary}`} onClick={handleSubmit}>
                                            <div className={`${styles.button_container} ${styles.primary_container}`}>
                                                <p>{newsletterData.button_text}</p>
                                                {icons.arrowRight}
                                            </div>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
                <div className={styles.imgContainer}>
                    <StaticImage src="../../../images/blank_ribbon_up.png" alt={"background ribbon"} className={styles.blank_ribbon_top} />
                    <StaticImage
                        src="../../../images/blank_ribbon.png"
                        alt={"background ribbon"}
                        className={styles.blank_ribbon_bottom}
                    />{" "}
                </div>
            </Section>
        </div>
    );
}
