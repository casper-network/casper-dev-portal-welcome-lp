import { IGatsbyImageData } from "gatsby-plugin-image";
import { IButton } from "../button";

export interface IInfoTile {
    content?: string;
    title?: string;
    image?: IGatsbyImageData;
    button?: IButton;
    image_title: string;
}
