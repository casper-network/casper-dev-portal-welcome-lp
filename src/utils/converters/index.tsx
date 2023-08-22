import { IButton } from "../Types/button";
import { IDocsTile } from "../Types/DocsTile";
import { IImageAndTextBlock } from "../Types/imageandtextblockTile";
import { IInfoTile } from "../Types/infoTile";
import { IResourceTile } from "../Types/resourceTile";
import { ISocialTile } from "../Types/socialTile";
import { IUseCaseTile } from "../Types/usecaseTile";

export function convertButton(source: Queries.DirectusData_link_button): IButton {
    return {
        inverted: source.inverted ?? false,
        text: source.text ?? "",
        url: source.url ?? "",
        type: source.type as "external" | "internal",
        openInNewTab: source.open_in_new_tab ?? false
    };
}

export function convertDocsTile(source: Queries.DirectusData_documentation_tile): IDocsTile {
    return {
        color: source.color?.value || "",
        description: source.description || "",
        icon: source.icon?.imageFile?.fields?.svg ?? "",
        link_type: source.link_type || "",
        title: source.title || "",
        url: source.url ?? "",
        openInNewTab: source.open_in_new_tab ?? false
    };
}

export function convertSocialTile(source: Queries.DirectusData_networking_tile): ISocialTile {
    return {
        main_title: source?.main_title || "",
        secondary_title: source.secondary_title || "",
        description: source.description || "",
        button: convertButton(source.button!),
        icon: source.icon?.imageFile?.fields?.svg ?? "",
        image: source.image?.imageFile?.childImageSharp?.gatsbyImageData,
        image_title: source.image?.title ?? ""
    };
}

export function convertResourceTile(source: Queries.DirectusData_resource_tile): IResourceTile {
    return {
        button: source.button ? convertButton(source.button!) : undefined,
        description: source.description || "",
        icon: source.icon?.imageFile?.fields?.svg ?? "",
        color: source?.color?.value || "",
        title: source?.title || ""
    };
}

export function convertToImageAndTextBlock(source: Queries.DirectusData_image_and_text_block): IImageAndTextBlock {
    return {
        title: source.title!,
        description: source.description!,
        textAlign: source.text_align as "left" | "right",
        textSize: source.text_size as "1/2" | "1/3",
        dateData: source.date_place ?? "",
        button: source.button ? convertButton(source.button) : undefined,
        image: source.image!.imageFile!.childImageSharp!.gatsbyImageData,
        image_title: source.image?.title ?? ""
    };
}

export function convertToBlogTile(source: Queries.DirectusData_blog_feature_tile): IUseCaseTile {
    return {
        title: source.title!,
        category: source.category!,
        image: source.image!.imageFile!.childImageSharp!.gatsbyImageData,
        image_title: source.image?.title ?? "",
        blogFeature: {
            button: convertButton(source.button!),
            date: source.date!
        }
    };
}

export function convertInfoTile(source: Queries.DirectusData_info_tile): IInfoTile {
    return {
        title: source.title ?? "",
        content: source.content ?? "",
        image: source.image!.imageFile!.childImageSharp!.gatsbyImageData,
        button: source.button ? convertButton(source.button) : undefined,
        image_title: source.image?.title ?? ""
    };
}

export function convertInfoParagraphTile(source: Queries.DirectusData_info_paragraph_tile): IInfoTile {
    return {
        content: source.content ?? "",
        image: source.image!.imageFile!.childImageSharp!.gatsbyImageData,
        image_title: source.image?.title ?? ""
    };
}
