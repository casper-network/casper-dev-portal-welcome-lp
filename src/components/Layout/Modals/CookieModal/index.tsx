import { graphql, useStaticQuery } from "gatsby";
import Cookies from "js-cookie";
import { title } from "process";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ModalContext } from "../../../../context/ModalContext";
import useFocusTrap from "../../../../hooks/useFocusTrap";
import { icons } from "../../../../svg/Icons";
import useLocalization from "../../../../utils/internationalization/useLocalization";
import * as styles from "./CookieModal.module.scss";

interface IItem {
    name: string;
    value: boolean;
}

function CookieModal() {
    const { showCookieModal, setShowCookieModal } = useContext(ModalContext);
    const [showNotice, setShowNotice] = useState<boolean>(false);
    const [showContent, setShowContent] = useState<boolean>(false);

    const [selected, setSelected] = useState<IItem[]>([]);

    const modalRef = useRef<HTMLDivElement>(null);

    const getCurrentDisplayed = () => {
        if (showNotice) {
            return "notice";
        }
        if (showContent) {
            return "content";
        }

        return "";
    };

    useFocusTrap(modalRef, `a[href], button:not([disabled]), .${styles.cookieCheckbox}`, !showCookieModal, getCurrentDisplayed());

    const { locale } = useLocalization();
    const currentLocale = locale ?? process.env.GATSBY_DEFAULT_LOCALE;
    const { directus }: { directus: Queries.DirectusData } = useStaticQuery(
        graphql`
            query cookieBannerQuery {
                directus {
                    cookie_banner {
                        translations {
                            languages_code {
                                code
                            }
                            items {
                                cookie_item_id {
                                    required
                                    parameter
                                    title
                                    description
                                }
                            }
                            manage_body
                            manage_title
                            notice_body
                            notice_title
                            manage_button_text
                            accept_all_button_text
                            confirm_button_text
                        }
                    }
                }
            }
        `
    );

    const onCheck = (name: string) => {
        const copy = [...selected];
        const current = copy.find((x) => x.name === name)!;
        current.value = !current.value;

        setSelected([...copy]);
    };

    const getChecked = (name: string): boolean => {
        const current = selected.find((x) => x.name === name);
        return current?.value ?? false;
    };

    let banner = directus.cookie_banner?.translations?.find(
        (x) => x?.languages_code?.code.toLocaleLowerCase() === currentLocale.toLocaleLowerCase()
    );

    if (!banner) {
        banner = directus.cookie_banner?.translations?.find(
            (x) => x?.languages_code?.code.toLocaleLowerCase() === process.env.GATSBY_DEFAULT_LOCALE!.toLocaleLowerCase()
        );
    }
    const items = banner?.items?.map((x) => x?.cookie_item_id) ?? [];

    useEffect(() => {
        const prefs = Cookies.get("cookie-prefs");

        const values: Array<IItem> = [];
        const cookiesValues = prefs ? (JSON.parse(prefs) as Array<IItem>) : [];

        if (cookiesValues.length > 0) {
            setShowNotice(false);
            setShowContent(true);
        } else {
            setShowNotice(true);
            setShowContent(false);
            setShowCookieModal(true);
        }

        for (const item of items) {
            const cookieValue = cookiesValues.find((x) => x.name === item!.parameter);
            values.push({ name: item!.parameter!, value: (cookieValue && cookieValue.value) || item!.required! });
        }
        setSelected(values);
    }, []);

    useEffect(() => {
        if (document && document.body && showCookieModal) {
            document.body.classList.add("preventScrollDocument");
        } else {
            document.body.classList.remove("preventScrollDocument");
        }
    }, [showCookieModal]);

    const confirm = () => {
        const values = selected.map((x) => {
            return { name: x.name, value: x.value };
        });
        Cookies.set("cookie-prefs", JSON.stringify(values));
        window.location.reload();
    };

    const confirmAll = () => {
        const values = items.map((x) => {
            return { name: x!.parameter!, value: true };
        });
        Cookies.set("cookie-prefs", JSON.stringify(values), { expires: 365 });
        window.location.reload();
    };

    const manage = () => {
        setShowNotice(false);
        setShowContent(true);
    };

    const handleKeyUp = (e: React.KeyboardEvent<HTMLLabelElement>, name: string) => {
        if (e.key.toLocaleLowerCase() === "enter") {
            onCheck(name);
        }
    };

    return (
        <>
            {
                <div className={`${styles.modal} ${!showCookieModal ? styles.hidden : ""}`} ref={modalRef}>
                    {showNotice && (
                        <div className={styles.notice}>
                            <h2>{banner?.notice_title}</h2>
                            <div dangerouslySetInnerHTML={{ __html: banner?.notice_body ?? "" }} className="primaryParagraph"></div>
                            <div className={styles.buttons_container}>
                                <button onClick={manage} className={styles.btn_manage}>
                                    {banner?.manage_button_text ?? ""}
                                </button>
                                <button onClick={confirmAll}>{banner?.accept_all_button_text ?? ""}</button>
                            </div>
                        </div>
                    )}
                    {showContent && (
                        <div className={styles.content}>
                            <h2>{banner?.manage_title}</h2>
                            <div
                                dangerouslySetInnerHTML={{ __html: banner?.manage_body ?? "" }}
                                className={`primaryParagraph ${styles.content_text}`}
                            ></div>
                            <div className={styles.content_items}>
                                {banner?.items?.map((x, i) => {
                                    return (
                                        <div key={x!.cookie_item_id!.parameter!} className={styles.item}>
                                            <div className={styles.input_container}>
                                                <p className="primaryParagraph">{x?.cookie_item_id?.title}</p>

                                                <input
                                                    type="checkbox"
                                                    id={`cookie-${x?.cookie_item_id?.title}`}
                                                    className={styles.cookieInput}
                                                    disabled={x?.cookie_item_id?.required ?? false}
                                                    checked={getChecked(x!.cookie_item_id!.parameter!)}
                                                    onChange={() => {
                                                        onCheck(x!.cookie_item_id!.parameter!);
                                                    }}
                                                />

                                                <label
                                                    htmlFor={`cookie-${x?.cookie_item_id?.title}`}
                                                    tabIndex={0}
                                                    className={` ${styles.cookieCheckbox} ${x?.cookie_item_id?.required ? styles.cookieCheckboxDisabled : ""
                                                        }`}
                                                    onKeyUp={(e) => handleKeyUp(e, x!.cookie_item_id!.parameter!)}
                                                >
                                                    {icons.check}
                                                </label>
                                            </div>
                                            <div
                                                dangerouslySetInnerHTML={{ __html: x?.cookie_item_id?.description ?? "" }}
                                                className={`secondaryParagraph ${styles.item_text}`}
                                            ></div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className={styles.buttons_container}>
                                <button onClick={confirm}>{banner?.confirm_button_text ?? ""}</button>
                            </div>
                        </div>
                    )}
                </div>
            }
        </>
    );
}

export default CookieModal;
