import React, { Dispatch, PropsWithChildren, ReactElement, SetStateAction, useState } from "react";

export interface IModalState {
    showCookieModal?: boolean;
    setShowCookieModal: Dispatch<SetStateAction<boolean>>;
}

export const ModalContext = React.createContext<IModalState>({ showCookieModal: false, setShowCookieModal: () => undefined });

export function ModalContextContextProvider(props: PropsWithChildren<{}>): ReactElement {
    const [showCookieModal, setShowCookieModal] = useState<boolean>(false);
    const value = { showCookieModal, setShowCookieModal }
    const { children } = props;

    return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}