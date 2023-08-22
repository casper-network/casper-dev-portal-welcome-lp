export const btnExpected = {
    inverted: true,
    text: "Explore Github",
    type: "external",
    url: "https://github.com/",
    openInNewTab: false
};

export const btnExpectedEmpty = {
    inverted: true,
    text: "",
    type: "external",
    url: "",
    openInNewTab: false
};

export const tileExpect = {
    color: "blue",
    description: "Not sure where to start? Get going with the basics.",
    icon: '<?xml version="1.0" encoding="UTF-8"?><svg id="Mock svg"></svg>',
    link_type: "external",
    title: "Core Casper concepts",
    url: "https://staging.docs.casper.network/concepts/",
    openInNewTab: false
};

export const tileExpectEmpty = {
    color: "",
    description: "",
    icon: "",
    link_type: "",
    title: "",
    url: "",
    openInNewTab: false
};

export const socialExpect = {
    main_title: "Star us on Github",
    secondary_title: "Join the conversation",
    description: "Save the Casper repo",
    button: {
        inverted: false,
        openInNewTab: true,
        text: "Explore Github",
        type: "external",
        url: "https://github.com/casper-network"
    },
    icon: '<svg id="mocksvg"></svg>',
    image: {
        layout: "constrained",
        placeholder: {
            fallback: "imgData"
        },
        images: {
            fallback: {
                src: "mocksrc",
                srcSet: "mockset",
                sizes: "(min-width: 121px) 121px, 100vw"
            },
            sources: [
                {
                    srcSet: "mockset",
                    type: "image/webp",
                    sizes: "(min-width: 121px) 121px, 100vw"
                }
            ]
        },
        width: 121,
        height: 150
    },
    image_title: "Casper Illustrations 37"
};

export const socialExpectEmpty = {
    main_title: "",
    secondary_title: "",
    description: "",
    button: {
        inverted: false,
        openInNewTab: true,
        text: "Explore Github",
        type: "external",
        url: "https://github.com/casper-network"
    },
    icon: "",
    image: {
        layout: "constrained",
        placeholder: {
            fallback: "imgData"
        },
        images: {
            fallback: {
                src: "mocksrc",
                srcSet: "mockset",
                sizes: "(min-width: 121px) 121px, 100vw"
            },
            sources: [
                {
                    srcSet: "mockset",
                    type: "image/webp",
                    sizes: "(min-width: 121px) 121px, 100vw"
                }
            ]
        },
        width: 121,
        height: 150
    },
    image_title: ""
};

export const resourceExpect = {
    button: { inverted: false, text: "Read the blog", type: "external", url: "https://medium.com/casperblockchain", openInNewTab: true },
    description: "Updates from the Casper ecosystem, including R&D and technical deep dives.",
    icon: '<svg id="mock"></svg>',
    color: "pink",
    title: "Blogs"
};

export const resourceExpectEmpty = {
    button: { inverted: false, text: "Read the blog", type: "external", url: "https://medium.com/casperblockchain", openInNewTab: true },
    description: "",
    icon: "",
    color: "",
    title: ""
};

export const imageAndTextExpect = {
    button: {
        inverted: false,
        openInNewTab: true,
        text: "RSVP Here",
        type: "external",
        url: "https://www.meetup.com/casper-network/events/292211283/"
    },
    description: "Casper will be at NFT NYC April 12-14th. Connect with our team members while there!",
    title: "Join us at NFT NYC!",
    image: {
        layout: "constrained",
        placeholder: {
            fallback: "imgdata"
        },
        images: {
            fallback: {
                src: "src",
                srcSet: "set",
                sizes: "(min-width: 2160px) 2160px, 100vw"
            },
            sources: [
                {
                    srcSet: "set",
                    type: "image/webp",
                    sizes: "(min-width: 2160px) 2160px, 100vw"
                }
            ]
        },
        width: 2160,
        height: 1080
    },
    image_title: "Nftnyc2021 Eventbrite Header",
    textAlign: "right",
    textSize: "1/3",
    dateData: "April 12th 2023 / New York City, NY, USA"
};

export const blogTileExpect = {
    title: "Blog 1",
    category: "Ca 1",
    image: {
        height: 2160,
        images: {
            fallback: {
                sizes: "(min-width: 3840px) 3840px, 100vw",
                src: "src",
                srcSet: "set"
            },
            sources: [
                {
                    sizes: "(min-width: 3840px) 3840px, 100vw",
                    srcSet: "set",
                    type: "image/webp"
                }
            ]
        },
        layout: "constrained",
        placeholder: {
            fallback: "imgdata"
        },
        width: 3840
    },
    image_title: "Cosmo",
    blogFeature: {
        button: {
            inverted: false,
            openInNewTab: true,
            text: "RSVP Here",
            type: "external",
            url: "https://www.meetup.com/casper-network/events/292211283/"
        },
        date: "1-1-1"
    }
};

export const blogTileExpectEmpty = {
    title: "Blog 1",
    category: "Ca 1",
    image: {
        height: 2160,
        images: {
            fallback: {
                sizes: "(min-width: 3840px) 3840px, 100vw",
                src: "src",
                srcSet: "set"
            },
            sources: [
                {
                    sizes: "(min-width: 3840px) 3840px, 100vw",
                    srcSet: "set",
                    type: "image/webp"
                }
            ]
        },
        layout: "constrained",
        placeholder: {
            fallback: "imgdata"
        },
        width: 3840
    },
    image_title: "",
    blogFeature: {
        button: {
            inverted: false,
            openInNewTab: true,
            text: "RSVP Here",
            type: "external",
            url: "https://www.meetup.com/casper-network/events/292211283/"
        },
        date: "1-1-1"
    }
};

export const useCaseTileExpect = {
    category: "Cat 1",
    image: {
        height: 2160,
        images: {
            fallback: {
                sizes: "(min-width: 3840px) 3840px, 100vw",
                src: "src",
                srcSet: "set"
            },
            sources: [
                {
                    sizes: "(min-width: 3840px) 3840px, 100vw",
                    srcSet: "set",
                    type: "image/webp"
                }
            ]
        },
        layout: "constrained",
        placeholder: {
            fallback: "img"
        },
        width: 3840
    },
    image_title: "Cosmo",
    title: "Tile 1",
    useCase: {
        isFavourite: true,
        linkText: "source",
        paragraph:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Varius morbi enim nunc faucibus a pellentesque sit amet. Neque aliquam vestibulum morbi blandit cursus.",
        tags: [
            {
                color: "yellow",
                openInNewTab: false,
                text: "Tag1",
                type: "external",
                url: "https://www.casperlabs.io/"
            },
            {
                color: "purple",
                openInNewTab: false,
                text: "Tag 2",
                type: "external",
                url: "https://www.casperlabs.io/"
            }
        ],
        url: "https://www.casperlabs.io/"
    }
};
export const useCaseTileExpectEmpty = {
    category: "Cat 1",
    image: {
        height: 2160,
        images: {
            fallback: {
                sizes: "(min-width: 3840px) 3840px, 100vw",
                src: "src",
                srcSet: "set"
            },
            sources: [
                {
                    sizes: "(min-width: 3840px) 3840px, 100vw",
                    srcSet: "set",
                    type: "image/webp"
                }
            ]
        },
        layout: "constrained",
        placeholder: {
            fallback: "img"
        },
        width: 3840
    },
    image_title: "",
    title: "Tile 1",
    useCase: {
        isFavourite: false,
        linkText: "",
        paragraph: "",
        tags: [],
        url: ""
    }
};

export const tagExpect = {
    color: "yellow",
    openInNewTab: false,
    text: "Tag1",
    type: "external",
    url: "https://www.casperlabs.io/"
};

export const tagExpectEmpty = {
    color: "yellow",
    openInNewTab: false,
    text: "",
    type: "external",
    url: ""
};

export const infoTileExpect = {
    title: "Tile 1",
    content: "Lorem ipsum dolor sit amet",
    button: {
        inverted: false,
        text: "Learn more",
        type: "external",
        url: "https://casper.network/en-us/lp/accelerate-grant-program",
        openInNewTab: true
    },
    image: {
        layout: "constrained",
        placeholder: {
            fallback: "img"
        },
        images: {
            fallback: {
                src: "src",
                srcSet: "set",
                sizes: "(min-width: 3840px) 3840px, 100vw"
            },
            sources: [
                {
                    srcSet: "set",
                    type: "image/webp",
                    sizes: "(min-width: 3840px) 3840px, 100vw"
                }
            ]
        },
        width: 3840,
        height: 2160
    },
    image_title: "Cosmo"
};
export const infoTileExpectEmpty = {
    title: "",
    content: "Lorem ipsum dolor sit amet",
    button: {
        inverted: false,
        text: "Learn more",
        type: "external",
        url: "https://casper.network/en-us/lp/accelerate-grant-program",
        openInNewTab: true
    },
    image: {
        layout: "constrained",
        placeholder: {
            fallback: "img"
        },
        images: {
            fallback: {
                src: "src",
                srcSet: "set",
                sizes: "(min-width: 3840px) 3840px, 100vw"
            },
            sources: [
                {
                    srcSet: "set",
                    type: "image/webp",
                    sizes: "(min-width: 3840px) 3840px, 100vw"
                }
            ]
        },
        width: 3840,
        height: 2160
    },
    image_title: ""
};
export const infoParagraphExpect = {
    content: "content",
    image_title: "General Guidelines Should",
    image: {
        layout: "constrained",
        placeholder: {
            fallback: "img"
        },
        images: {
            fallback: {
                src: "set",
                srcSet: "set",
                sizes: "(min-width: 620px) 620px, 100vw"
            },
            sources: [
                {
                    srcSet: "set",
                    type: "image/webp",
                    sizes: "(min-width: 620px) 620px, 100vw"
                }
            ]
        },
        width: 620,
        height: 325
    }
};

export const infoParagraphExpectEmpty = {
    content: "",
    image_title: "",

    image: {
        layout: "constrained",
        placeholder: {
            fallback: "img"
        },
        images: {
            fallback: {
                src: "set",
                srcSet: "set",
                sizes: "(min-width: 620px) 620px, 100vw"
            },
            sources: [
                {
                    srcSet: "set",
                    type: "image/webp",
                    sizes: "(min-width: 620px) 620px, 100vw"
                }
            ]
        },
        width: 620,
        height: 325
    }
};
