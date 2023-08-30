import React, { useState, useEffect, useContext, KeyboardEventHandler } from "react";
import * as styles from "./ThemeSwitch.module.scss";
import { icons } from "../../../../svg/Icons";
import { ThemeContext } from "../../../../context/ThemeContext";
function ThemeSwitch() {
    const [loaded, setLoaded] = useState<boolean>(false);
    const { lightTheme, setLightTheme } = useContext(ThemeContext);

    useEffect(() => {
        setLoaded(true);
    }, [lightTheme]);

    function handleKeyPress(e: any) {
        if (e.key === "Enter") {
            setLightTheme(!lightTheme);
        }
    }
    return (
        <div className={styles.switchWrapper}>
            {loaded && (
                <>
                    <label
                        tabIndex={0}
                        htmlFor="switch"
                        className={lightTheme ? styles.light : ""}
                        onKeyUp={handleKeyPress}
                        data-testid="switch-label"
                    >
                        {lightTheme ? icons.sun : icons.moon}
                    </label>
                    <input tabIndex={0} id="switch" type="checkbox" aria-hidden="true" onChange={() => setLightTheme(!lightTheme)}></input>
                </>
            )}
        </div>
    );
}

export default ThemeSwitch;
