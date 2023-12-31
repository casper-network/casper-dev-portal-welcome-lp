import React, { useEffect, useState } from "react";
import * as styles from "./NewsletterFormComponent.module.scss";
import Select from "react-select";
import { icons } from "../../../svg/Icons";
import Section from "../Section";
import { GatsbyImage, IGatsbyImageData, StaticImage } from "gatsby-plugin-image";

export default function NewsletterFormComponent({ newsletterData }: any) {
    const [countries, setCountries] = useState([]);
    const [iamOptions, setIamOptions] = useState([]);
    const [languageOptions, setLanguageOptions] = useState([]);
    const [interestsOptions, setInterestsOptions] = useState([]);
    const [blockchainOptions, setBlockchainOptions] = useState([]);
    const [legalConsentOptions, setLegalConsentOptions] = useState<any>(null);

    const [submitError, setSubmitError] = useState<string>("");
    const [submitSuccess, setSubmitSuccess] = useState<string>("");

    const backgroundImage = newsletterData.background_image?.imageFile?.childImageSharp?.gatsbyImageData;

    useEffect(() => {
        const getData = async () => {
            const res = await fetch(`${process.env.GATSBY_DIRECTUS_URL}/newsletter/landing`);
            const json = await res.json();
            setCountries(json.countries);
            setIamOptions(json.iamOptions);
            setLanguageOptions(json.languageOptions);
            setInterestsOptions(json.interestsOptions);
            setBlockchainOptions(json.blockchainOptions);
            setLegalConsentOptions(json.legalConsentOptions);
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

    function renderSelect({ label, options, isMulti, required, key }: any) {
        return (
            <div className={styles.iAm}>
                <label htmlFor={label}>{label}</label>
                <Select
                    options={options}
                    onChange={(e) => handleSelectChange(e, key)}
                    onBlur={required ? () => handleSelectBlur(key) : undefined}
                    inputId={label}
                    isMulti={isMulti}
                    classNames={{
                        control: (state) => (state.menuIsOpen || state.isFocused ? styles.noBorder : styles.noBorder),
                        option: (state) => (state.isFocused ? styles.isFocused : styles.nonFocused),
                        menuList: () => styles.scrollBarSelect,
                        dropdownIndicator: (state) => (state.selectProps.menuIsOpen ? styles.openSVG : styles.closeSVG),
                        indicatorSeparator: () => styles.indicatorSeparator
                    }}
                />
                {selectErrors[key] && required && <p className={styles.error}>{selectErrors[key]}</p>}
            </div>
        );
    }

    function stringifyValues(selectValues: any) {
        const value = selectValues.map(({ value }: { value: string }) => value).join(",");
        return value;
    }

    const [selectValues, setSelectValues] = useState<any>({});
    const [selectErrors, setSelectErrors] = useState<any>({});
    function handleSelectChange(e: any, key: any) {
        const value = !Array.isArray(e) ? e.value : stringifyValues(e);
        const newValues = { ...selectValues };
        newValues[key] = value;
        setSelectValues(newValues);
        validateSelect(key, e.value);
    }
    function handleSelectBlur(key: string) {
        validateSelect(key, selectValues[key]);
    }

    function validateSelect(key: string, value: string) {
        const requiredTextKey = key.replace("label", "required_text");
        const errors: any = {};
        if (!value) {
            errors[key] = newsletterData[requiredTextKey] ?? `${newsletterData[key]} is required`;
            setSelectErrors((selectErrors: any) => ({ ...selectErrors, ...errors }));
            return false;
        } else {
            errors[key] = "";
            setSelectErrors((selectErrors: any) => ({ ...selectErrors, ...errors }));
            return true;
        }
    }

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
        const emailValid = validateEmail(email);
        const firstNameValid = validateFirstName(firstName);
        const iAmValid = validateSelect("i_am_label", selectValues["i_am_label"]);
        const countryValid = validateSelect("country_label", selectValues["country_label"]);
        const agreeValid = validateAgree(agree);
        const valid = emailValid && firstNameValid && iAmValid && countryValid && agreeValid;
        if (!valid) {
            return;
        }
        setSubmitError("");
        setSubmitSuccess("");
        const response = await fetch(`${process.env.GATSBY_DIRECTUS_URL}/newsletter/landing`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                firstname: firstName,
                hs_persona: selectValues["i_am_label"],
                country_dropdown: selectValues["country_label"],
                preferred_programming_language: selectValues["preferred_language_label"] ?? "",
                interests__developer_portal_: selectValues["interests_label"] ?? "",
                blockchain_familiarity: selectValues["blockchain_familiarity_label"] ?? "",
                legal_consent: {
                    value: agree,
                    subscriptionTypeId: legalConsentOptions.communicationsCheckboxes[0].subscriptionTypeId,
                    text: legalConsentOptions.communicationsCheckboxes[0].label
                },
                page_context: {
                    hutk: null,
                    pageUri: location.href,
                    pageName: document.title
                }
            })
        });

        if (response.status != 200) {
            setSubmitError(newsletterData.error_message ?? "Error");
        } else {
            setSubmitSuccess(newsletterData.success_message ?? "Success");
        }
    };

    function handleCheckChange(e: any) {
        if (e.key != "Enter") return;
        handleAgreeChange();
    }

    return (
        <>
            <div
                className={`${styles.newsletterContainer} ${!backgroundImage && `gradient ${newsletterData.gradient}`} `}
                id="newsletter-form"
            >
                {backgroundImage && (
                    <div className={styles.backgroundImage}>
                        {" "}
                        <GatsbyImage image={backgroundImage} alt={"background_form"} />
                    </div>
                )}
                <Section header={newsletterData.header} subheader={newsletterData.subheader}>
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

                                        {renderSelect({
                                            label: newsletterData.i_am_label,
                                            options: iamOptions,
                                            isMulti: false,
                                            key: "i_am_label",
                                            required: true,
                                            defaultError: "I am is required"
                                        })}

                                        {renderSelect({
                                            label: newsletterData.country_label,
                                            options: countries,
                                            isMulti: false,
                                            key: "country_label",
                                            required: true,
                                            defaultError: "Country is required"
                                        })}

                                        {renderSelect({
                                            label: newsletterData.preferred_language_label,
                                            options: languageOptions,
                                            isMulti: true,
                                            key: "preferred_language_label",
                                            required: false
                                        })}

                                        {renderSelect({
                                            label: newsletterData.blockchain_familiarity_label,
                                            options: blockchainOptions,
                                            isMulti: false,
                                            key: "blockchain_familiarity_label",
                                            required: false
                                        })}

                                        {renderSelect({
                                            label: newsletterData.interests_label,
                                            options: interestsOptions,
                                            isMulti: true,
                                            key: "interests_label",
                                            required: false
                                        })}

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
                                                {legalConsentOptions && (
                                                    <span
                                                        className="primaryParagraph"
                                                        dangerouslySetInnerHTML={{
                                                            __html: legalConsentOptions.communicationsCheckboxes[0].label
                                                        }}
                                                    ></span>
                                                )}
                                            </div>
                                            {agreeError && (
                                                <label htmlFor="Agree Error" className={styles.error}>
                                                    {agreeError}
                                                </label>
                                            )}
                                        </div>

                                        <div className={styles.description}>
                                            {legalConsentOptions && (
                                                <div className={`${styles.paragraphContainer} secondaryParagraph`}>
                                                    <div dangerouslySetInnerHTML={{ __html: legalConsentOptions.privacyText }}></div>
                                                    <div
                                                        dangerouslySetInnerHTML={{ __html: legalConsentOptions.consentToProcessText }}
                                                    ></div>
                                                </div>
                                            )}
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
                    {!backgroundImage && (
                        <div className={styles.imgContainer}>
                            <StaticImage
                                src="../../../images/blank_ribbon_up.png"
                                alt={"background ribbon"}
                                className={styles.blank_ribbon_top}
                            />
                            <StaticImage
                                src="../../../images/blank_ribbon.png"
                                alt={"background ribbon"}
                                className={styles.blank_ribbon_bottom}
                            />
                        </div>
                    )}
                </Section>
            </div>
        </>
    );
}
