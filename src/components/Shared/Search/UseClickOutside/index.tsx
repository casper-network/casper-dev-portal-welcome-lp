import { useEffect } from "react";

const events = [`mousedown`, `touchstart`];

export default (ref: any, onClickOutside: any) => {
    const isOutside = (element: HTMLInputElement) => !ref.current || !ref.current.contains(element);

    const onClick = (event: any) => {
        if (isOutside(event.target)) {
            onClickOutside(false);
        } else onClickOutside(true);
    };

    useEffect(() => {
        for (const event of events) {
            document.addEventListener(event, onClick);
        }

        return () => {
            for (const event of events) document.removeEventListener(event, onClick);
        };
    });
};
