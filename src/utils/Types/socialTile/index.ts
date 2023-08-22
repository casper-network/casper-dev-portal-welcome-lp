import { IGatsbyImageData } from "gatsby-plugin-image";
import { IButton } from "../button";

export interface ISocialTile {
    main_title: string;
    secondary_title: string;
    description: string;
    button: IButton;
    icon: string;
    image?: IGatsbyImageData;
    image_title: string;
}
