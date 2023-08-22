import { IGatsbyImageData } from "gatsby-plugin-image";
import { IButton } from "../button";

export interface IImageAndTextBlock {
    image: IGatsbyImageData;
    title: string;
    description: string;
    button?: IButton;
    textAlign: "left" | "right";
    textSize: "1/3" | "1/2" | "2/3";
    dateData?: string;
    image_title: string;
}
