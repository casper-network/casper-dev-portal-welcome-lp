export const query = `
    dynamic_page {
      translations {
        slug
        seo {
          description
          title
        }
        languages_code {
          code
        }
        sections {
          item {
            ... on DirectusData_documentation_section {
              header
              subheader
              tiles {
                documentation_tile_id {
                  color {
                    value
                  }
                  description
                  icon {
                    id
                    title
                    imageFile {
                      fields {
                        svg
                      }
                    }
                  }
                  link_type
                  title
                  url
                  open_in_new_tab
                }
              }
            }
            ... on DirectusData_image_section {
              header
              subheader
              images {
                image_id {
                  name
                  size
                  image {
                    imageFile {
                      childImageSharp {
                        gatsbyImageData
                      }
                    }
                    id
                    title
                  }
                }
              }
            }
            ... on DirectusData_image_text_block_section {
              header
              subheader
              blocks {
                id
                image_and_text_block_id {
                  title
                  description
                  date_place
                  text_size
                  text_align
                  image {
                    id
                    title
                    imageFile {
                      childImageSharp {
                        gatsbyImageData
                      }
                    }
                  }
                  button {
                    inverted
                    text
                    type
                    url
                    open_in_new_tab
                  }
                }
              }
            }
            ... on DirectusData_networking_section {
              header
              subheader
              tiles {
                networking_tile_id {
                  main_title
                  secondary_title
                  description
                  button {
                    inverted
                    text
                    type
                    url
                    open_in_new_tab
                  }
                  icon {
                    id
                    title
                    imageFile {
                      fields {
                        svg
                      }
                    }
                  }
                  image {
                    id
                    title
                    imageFile {
                      childImageSharp {
                        gatsbyImageData
                      }
                    }
                  }
                }
              }
            }
            ... on DirectusData_pullquote_section {
              header
              subheader
              pullquote {
                name
                paragraph
                description
                image {
                  imageFile {
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                  id
                  title
                }
              }
            }
            ... on DirectusData_resource_section {
              header
              subheader
              tiles {
                resource_tile_id {
                  title
                  description
                  color {
                    value
                  }
                  button {
                    inverted
                    text
                    type
                    url
                    open_in_new_tab
                  }
                  icon {
                    id
                    title
                    imageFile {
                      fields {
                        svg
                      }
                    }
                  }
                }
              }
              content_block {
                button {
                  inverted
                  text
                  type
                  url
                  open_in_new_tab
                }
                date_place
                description
                text_align
                text_size
                title
                image {
                  id
                  title
                  imageFile {
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
              }
            }
            ... on DirectusData_video_list_section {
              header
              subheader
              video_list {
                videos {
                  video_id {
                    name
                    title
                    description
                    key
                  }
                }
              }
            }
            ... on DirectusData_video_section {
              header
              subheader
              video {
                name
                title
                description
                key
              }
            }
            ... on DirectusData_hero {
              title
              description
              gradient
              buttons {
                link_button_id {
                  text
                  inverted
                  type
                  url
                  open_in_new_tab
                }
              }
              image {
                id
                title
                imageFile {
                  childImageSharp {
                    gatsbyImageData
                  }
                }
              }
            }
            ... on DirectusData_paragraph_section {
              id
              header
              subheader
              paragraph
            }
            ... on DirectusData_number_section {
              id
              header
              subheader
              paragraph
              numbers {
                number_id {
                  number
                  description
                  id
                }
              }
            }
            ... on DirectusData_columns_section {
              id
              header
              subheader
              right_paragraph
              left_paragraph
            }
            ... on DirectusData_blog_section {
              id
              header
              subheader
              tiles {
                blog_feature_tile_id {
                  title
                  date
                  category                  
                  image {
                    id
                    title
                    imageFile {
                      childImageSharp {
                        gatsbyImageData
                      }
                    }
                  }
                  id
                  button {
                    inverted
                    text
                    type
                    url
                    open_in_new_tab
                  }
                }
              }
            }
            ... on DirectusData_use_case_section {
              id
              header
              subheader
              tiles {
                use_case_tile_id {
                  title
                  category
                  paragraph
                  is_favourite
                  image {
                    id
                    title
                    imageFile {
                      childImageSharp {
                        gatsbyImageData
                      }
                    }
                  }
                  url
                  link_text
                  tags {
                    tag_id {
                      color {
                        value
                      }
                      text
                      type
                      url
                    }
                  }
                }
              }
            }
            ... on DirectusData_description_link {
              id
              description
              secondary_description
              button {
                url
                type
                text
                inverted
                open_in_new_tab
              }
            }
            ... on DirectusData_info_paragraph_section {
              id
              header
              subheader
              footer
              tiles {
                info_paragraph_tile_id {
                  id
                  content
                  image {
                    id
                    title
                    imageFile {
                      childImageSharp {
                        gatsbyImageData
                      }
                    }
                  }
                }
              }
            }
            ... on DirectusData_info_section {
              id
              subheader
              header
              tiles {
                id
                info_tile_id {
                  title
                  content
                  button {
                    inverted
                    text
                    type
                    url
                    open_in_new_tab
                  }
                  image {
                    id
                    title
                    imageFile {
                      childImageSharp {
                        gatsbyImageData
                      }
                    }
                  }
                }
              }
              button {
                id
                inverted
                text
                type
                url
                open_in_new_tab
              }
            }
          }
          collection
          id
        }
      }
    }
`;

export function parseContent(page: Queries.DirectusData_dynamic_page_translations): string {
  let content: string = "";

  if (!page.sections) {
    return content;
  }
  for (const section of page.sections) {
    switch (section?.collection) {
      case "hero":
        content += parseHero(section.item as Queries.DirectusData_hero);
        break;
      case "documentation_section":
        content += parseDocumentation(section.item as Queries.DirectusData_documentation_section);
        break;
      case "networking_section":
        content += parseNetworking(section.item as Queries.DirectusData_networking_section);
        break;
      case "resource_section":
        content += parseResource(section.item as Queries.DirectusData_resource_section);
        break;
      case "image_section":
        content += parseImage(section.item as Queries.DirectusData_image_section);
        break;
      case "image_text_block_section":
        content += parseImageTextBlock(section.item as Queries.DirectusData_image_text_block_section);
        break;
      case "pullquote_section":
        content += parsePullquote(section.item as Queries.DirectusData_pullquote_section);
        break;
      case "video_section":
        content += parseVideo(section.item as Queries.DirectusData_video_section);
        break;
      case "video_list_section":
        content += parseVideoList(section.item as Queries.DirectusData_video_list_section);
        break;
      case "paragraph_section":
        content += parseParagraph(section.item as Queries.DirectusData_paragraph_section);
        break;
      case "info_section":
        content += parseInfo(section.item as Queries.DirectusData_info_section);
        break;
    }
  }

  return content;
}

const parseHero = (item: Queries.DirectusData_hero): string => {
  return item.title ?? "";
};

const parseDocumentation = (item: Queries.DirectusData_documentation_section): string => {
  return `${item.header}. ${item.subheader}. 
        ${item.tiles?.map((x) => x?.documentation_tile_id?.title ?? "" + x?.documentation_tile_id?.description ?? "")}
    `;
};

const parseNetworking = (item: Queries.DirectusData_networking_section): string => {
  return `${item.header}. ${item.subheader}. 
        ${item.tiles?.map(
    (x) =>
      x?.networking_tile_id?.main_title ??
      "" + x?.networking_tile_id?.secondary_title ??
      "" + x?.networking_tile_id?.description ??
      ""
  )}
    `;
};

const parseResource = (item: Queries.DirectusData_resource_section): string => {
  return `${item.header}. ${item.subheader}. 
        ${item.tiles?.map((x) => x?.resource_tile_id?.title ?? "" + x?.resource_tile_id?.description ?? "")}
    `;
};

const parseImage = (item: Queries.DirectusData_image_section): string => {
  return `${item.header}. ${item.subheader}.`;
};

const parseImageTextBlock = (item: Queries.DirectusData_image_text_block_section): string => {
  return `${item.header}. ${item.subheader}. 
        ${item.blocks?.map((x) => x?.image_and_text_block_id?.title ?? "" + x?.image_and_text_block_id?.description ?? "")}
    `;
};

const parsePullquote = (item: Queries.DirectusData_pullquote_section): string => {
  return `${item.header}. ${item.subheader}. ${item.pullquote?.description}. ${item.pullquote?.name}. ${item.pullquote?.paragraph}`;
};

const parseVideo = (item: Queries.DirectusData_video_section): string => {
  return `${item.header}. ${item.subheader}.`;
};

const parseVideoList = (item: Queries.DirectusData_video_list_section): string => {
  return `${item.header}. ${item.subheader}.`;
};

const parseParagraph = (item: Queries.DirectusData_paragraph_section): string => {
  return `${item.header}. ${item.subheader}.`;
};

const parseInfo = (item: Queries.DirectusData_info_section): string => {
  return `${item.header}. ${item.subheader}. 
        ${item.tiles?.map((x) => x?.info_tile_id?.title ?? "" + x?.info_tile_id?.content ?? "")}
    `;
};
