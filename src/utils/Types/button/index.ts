export interface IButton {
    text: string;
    url: string;
    inverted: boolean;
    type: "internal" | "external";
    openInNewTab: boolean;
    disabled?: boolean;
}
