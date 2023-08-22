import "@testing-library/jest-dom";
import * as converters from "../../../src/utils/converters";
import * as expectedData from "../../../__mocks__/convertersMockReturnData";
import { pageContext } from "../../../__mocks__/dynamicPageContext";

describe("Converters", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });
    it("Should convert Button data", () => {
        const btnData = pageContext.data.directus.dynamic_page[0].translations[0].sections[0].item.buttons![0].link_button_id;

        const btnObj = converters.convertButton(btnData);

        expect(btnObj).toEqual(expectedData.btnExpected);
    });

    it("Should convert Button data with empty data", () => {
        const btnData = JSON.parse(
            JSON.stringify(pageContext.data.directus.dynamic_page[0].translations[0].sections[0].item.buttons![0].link_button_id)
        );
        btnData.text = undefined;
        btnData.url = undefined;
        const btnObj = converters.convertButton(btnData);

        expect(btnObj).toEqual(expectedData.btnExpectedEmpty);
    });

    it("Should convert DocsTile data", () => {
        //@ts-ignore
        const tileData = pageContext.data.directus.dynamic_page[0].translations[0].sections[1].item.tiles![0].documentation_tile_id;

        const tileObj = converters.convertDocsTile(tileData);

        expect(tileObj).toEqual(expectedData.tileExpect);
    });

    it("Should convert DocsTile data with empty data", () => {
        const tileData = JSON.parse(
            //@ts-ignore
            JSON.stringify(pageContext.data.directus.dynamic_page[0].translations[0].sections[1].item.tiles![0].documentation_tile_id)
        );
        tileData.color = undefined;
        tileData.description = undefined;
        tileData.icon = undefined;
        tileData.link_type = undefined;
        tileData.url = undefined;
        tileData.title = undefined;
        const tileObj = converters.convertDocsTile(tileData);

        expect(tileObj).toEqual(expectedData.tileExpectEmpty);
    });

    it("Should convert SocialTile data", () => {
        //@ts-ignore
        const socialData = pageContext.data.directus.dynamic_page[0].translations[0].sections[2].item.tiles[0].networking_tile_id;

        const socialObj = converters.convertSocialTile(socialData);

        expect(socialObj).toEqual(expectedData.socialExpect);
    });

    it("Should convert SocialTile data with empty data", () => {
        const socialData = JSON.parse(
            //@ts-ignore
            JSON.stringify(pageContext.data.directus.dynamic_page[0].translations[0].sections[2].item.tiles[0].networking_tile_id)
        );
        socialData.main_title = undefined;
        socialData.secondary_title = undefined;
        socialData.description = undefined;
        socialData.icon = undefined;
        socialData.image.title = undefined;
        const socialObj = converters.convertSocialTile(socialData);

        expect(socialObj).toEqual(expectedData.socialExpectEmpty);
    });
    it("Should convert ResourceTile data", () => {
        //@ts-ignore
        const resourceData = pageContext.data.directus.dynamic_page[0].translations[0].sections[3].item.tiles[0].resource_tile_id;

        const resourceObj = converters.convertResourceTile(resourceData);

        expect(resourceObj).toEqual(expectedData.resourceExpect);
    });

    it("Should convert ResourceTile data with empty data", () => {
        const resourceData = JSON.parse(
            //@ts-ignore
            JSON.stringify(pageContext.data.directus.dynamic_page[0].translations[0].sections[3].item.tiles[0].resource_tile_id)
        );
        resourceData.description = undefined;
        resourceData.icon = undefined;
        resourceData.color = undefined;
        resourceData.title = undefined;

        const resourceObj = converters.convertResourceTile(resourceData);

        expect(resourceObj).toEqual(expectedData.resourceExpectEmpty);
    });

    it("Should convert ImageAndTextBlock data", () => {
        const imageAndTextData =
            //@ts-ignore
            pageContext.data.directus.dynamic_page[0].translations[0].sections[5].item.blocks![0].image_and_text_block_id;
        const imageAndTextObj = converters.convertToImageAndTextBlock(imageAndTextData);

        expect(imageAndTextObj).toEqual(expectedData.imageAndTextExpect);
    });

    it("Should convert BlogTile data", () => {
        const blogTileData =
            //@ts-ignore
            pageContext.data.directus.dynamic_page[0].translations[0].sections[12].item.tiles![0].blog_feature_tile_id;
        const blogTileObj = converters.convertToBlogTile(blogTileData);

        expect(blogTileObj).toEqual(expectedData.blogTileExpect);
    });

    it("Should convert BlogTile data with empty data", () => {
        const blogTileData = JSON.parse(
            //@ts-ignore
            JSON.stringify(pageContext.data.directus.dynamic_page[0].translations[0].sections[12].item.tiles![0].blog_feature_tile_id)
        );
        blogTileData.image.title = undefined;
        const blogTileObj = converters.convertToBlogTile(blogTileData);

        expect(blogTileObj).toEqual(expectedData.blogTileExpectEmpty);
    });

    it("Should convert InfoTile data", () => {
        const infoTileData =
            //@ts-ignore
            pageContext.data.directus.dynamic_page[0].translations[0].sections[14].item.tiles![0].info_tile_id;

        const InfoTileObj = converters.convertInfoTile(infoTileData);
        expect(InfoTileObj).toEqual(expectedData.infoTileExpect);
    });
    it("Should convert InfoTile data with empty data", () => {
        const infoTileData =
            //@ts-ignore
            JSON.parse(JSON.stringify(pageContext.data.directus.dynamic_page[0].translations[0].sections[14].item.tiles![0].info_tile_id));
        infoTileData.image.title = undefined;
        infoTileData.title = undefined;
        const InfoTileObj = converters.convertInfoTile(infoTileData);

        expect(InfoTileObj).toEqual(expectedData.infoTileExpectEmpty);
    });

    it("Should convert InfoParagraphTile data", () => {
        const infoParagraphData =
            //@ts-ignore
            pageContext.data.directus.dynamic_page[5].translations[0].sections[2].item.tiles![0].info_paragraph_tile_id;
        const infoParagraphObj = converters.convertInfoParagraphTile(infoParagraphData);

        expect(infoParagraphObj).toEqual(expectedData.infoParagraphExpect);
    });
    it("Should convert InfoParagraphTile data with empty data", () => {
        const infoParagraphData = JSON.parse(
            //@ts-ignore
            JSON.stringify(pageContext.data.directus.dynamic_page[5].translations[0].sections[2].item.tiles![0].info_paragraph_tile_id)
        );
        infoParagraphData.content = undefined;
        //@ts-ignore
        infoParagraphData.image.title = undefined;
        const infoParagraphObj = converters.convertInfoParagraphTile(infoParagraphData);

        expect(infoParagraphObj).toEqual(expectedData.infoParagraphExpectEmpty);
    });
    // JSON.parse(JSON.stringify());
});
