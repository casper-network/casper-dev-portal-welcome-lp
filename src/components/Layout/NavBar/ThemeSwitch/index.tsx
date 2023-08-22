import React, { useState, useEffect, useContext } from "react";
import * as styles from "./ThemeSwitch.module.scss";
import { icons } from "../../../../svg/Icons";
import { ThemeContext } from "../../../../context/ThemeContext";
function ThemeSwitch() {
    const [loaded, setLoaded] = useState<boolean>(false);
    const { lightTheme, setLightTheme } = useContext(ThemeContext);

    useEffect(() => {
        setLoaded(true);
    }, [lightTheme]);

    return (
        <div className={styles.switchWrapper}>
            {loaded && (
                <>
                    <label htmlFor="switch" className={lightTheme ? styles.light : ""} data-testid="switch-label">
                        {lightTheme ? icons.sun : icons.moon}
                    </label>
                    <input id="switch" type="checkbox" aria-hidden="true" onChange={() => setLightTheme(!lightTheme)}></input>
                </>
            )}
        </div>
    );
}

export default ThemeSwitch;
