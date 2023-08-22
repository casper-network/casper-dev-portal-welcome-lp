export const data = {
    data: {
        directus: {
            cookie_banner: {
                translations: [
                    {
                        languages_code: {
                            code: "en-US"
                        },
                        items: [
                            {
                                cookie_item_id: {
                                    required: true,
                                    parameter: "necessary"
                                }
                            },
                            {
                                cookie_item_id: {
                                    required: false,
                                    parameter: "performance"
                                }
                            },
                            {
                                cookie_item_id: {
                                    required: false,
                                    parameter: "functional"
                                }
                            },
                            {
                                cookie_item_id: {
                                    required: false,
                                    parameter: "marketing"
                                }
                            }
                        ]
                    }
                ]
            },
            header: {
                translations: [
                    {
                        languages_code: {
                            code: "en-US"
                        },
                        logo: {
                            id: "c36a9c08-16d2-49b2-9c1c-e465e12e349a",
                            title: "Casper Wordmark White",
                            imageFile: {
                                fields: {
                                    svg: '<?xml version="1.0" encoding="UTF-8"?><svg id="Layer_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 643.59 346.92"><defs><style>.cls-1{fill:#fff;}</style></defs><g id="Assets"><g><g><path class="cls-1" d="m393.32,164.86c-2.5-4.23-5.91-7.55-10.23-9.96-4.32-2.41-9.16-3.62-14.53-3.62h-76.81c-10.69,0-19.35,8.66-19.35,19.35v176.28h27.97v-71.1c0-.13.02-.26.02-.39v-.27c0-4.24,3.27-7.96,7.51-8.07,4.35-.11,7.92,3.38,7.92,7.71v.74c0,8.52,6.91,15.42,15.42,15.42h37.32c.99.01,1.96-.04,2.92-.13h8.86c9.23,0,16.71-7.48,16.71-16.71h0c0-.11.01-.21.01-.32v-22.29s0-.07,0-.11v-30.35s0-1.69,0-1.69h0v-40.13c0-5.37-1.24-10.16-3.74-14.39Zm-24.22,92.57c0,1.61-.59,2.98-1.78,4.1-1.05.99-2.49,1.5-3.93,1.5h-57.31c-1.24,0-3.03-.65-3.93-1.5-1.19-1.12-1.78-2.48-1.78-4.1v-72.45c0-1.24.65-3.04,1.5-3.94,1.12-1.19,2.48-1.78,4.09-1.78h57.42c1.24,0,3.04.65,3.94,1.5,1.19,1.12,1.78,2.48,1.78,4.1v72.58Z"/><path class="cls-1" d="m595.71,261.52c-1.19-1.12-1.78-2.48-1.78-4.1v-72.58c0-1.61.59-2.98,1.78-4.1.9-.85,2.7-1.5,3.94-1.5h43.94v-27.97h-18.72c-8.58,0-15.54,6.96-15.54,15.54v.27c0,4.24-3.27,7.96-7.51,8.07-4.35.11-7.92-3.38-7.92-7.71v-.74c0-8.52-6.91-15.42-15.42-15.42h-33.58v27.97h15.33c1.24,0,3.04.65,3.94,1.5,1.19,1.12,1.78,2.48,1.78,4.1v72.46c0,1.24-.65,3.03-1.5,3.94-1.12,1.19-2.48,1.78-4.1,1.78h-5.32c-8.32.3-14.97,7.12-14.97,15.51v.27c0,4.24-3.27,7.96-7.51,8.07-4.35.11-7.92-3.38-7.92-7.71v-.74c0-8.33-6.6-15.09-14.86-15.39h-67.57c-1.46,0-2.75-.55-3.89-1.64-1.14-1.09-1.7-2.41-1.7-3.96v-16.78c0-1.45.57-2.75,1.7-3.89,1.14-1.14,2.43-1.7,3.89-1.7h90.74v-55.25c0-5.46-1.21-10.34-3.61-14.66-2.41-4.32-5.78-7.71-10.1-10.17-4.32-2.45-9.26-3.68-14.8-3.68h-67.27c-5.37,0-10.21,1.23-14.53,3.68-4.32,2.46-7.73,5.85-10.23,10.17-2.5,4.32-3.75,9.21-3.75,14.66v71.29s0,.09,0,.14v22.54s0,.02,0,.03v.33c0,9.23,7.48,16.71,16.71,16.71h8.92c.94.08,1.9.14,2.87.14h179.26v-27.97h-16.79c-1.45,0-2.88-.51-3.93-1.5Zm-159.09-76.67c0-1.55.57-2.86,1.7-3.96,1.14-1.09,2.43-1.64,3.89-1.64h57.18c1.64,0,2.98.55,4.02,1.64,1.04,1.09,1.57,2.41,1.57,3.96v16.78c0,1.55-.52,2.86-1.57,3.96-1.05,1.09-2.39,1.64-4.02,1.64h-57.18c-1.46,0-2.75-.57-3.89-1.71-1.14-1.14-1.7-2.43-1.7-3.89v-16.78Z"/></g><g><path class="cls-1" d="m306.1,27.97h44.11s46.82,0,46.82,0V0h-1.29c-8.58,0-15.54,6.96-15.54,15.54v.27c0,4.24-3.27,7.96-7.51,8.07-4.35.11-7.92-3.38-7.92-7.71v-.74c0-8.52-6.91-15.42-15.42-15.42h-3.03s-2.7,0-2.7,0h-42.57C295.6,0,290.71,1.23,286.39,3.68c-4.32,2.46-7.71,5.85-10.16,10.16-2.46,4.32-3.68,9.21-3.68,14.67v26.88c0,5.37,1.23,10.21,3.68,14.53,2.46,4.32,5.84,7.71,10.16,10.16,4.32,2.46,9.21,3.68,14.67,3.68h62.09c1.71,0,3.41.64,4.55,1.92.91,1.03,1.37,2.26,1.37,3.67v16.46c0,1.71-.64,3.41-1.92,4.55-1.03.91-2.26,1.37-3.67,1.37h-51.47c-8.58,0-15.54,6.96-15.54,15.54v.27c0,4.24-3.27,7.96-7.51,8.07s-7.92-3.38-7.92-7.71v-.74c0-8.52-6.91-15.42-15.42-15.42h.36s-.02,0-.02,0v-.02c-2.17-.18-3.87-1.51-5.07-4.01V28.51c0-5.46-1.23-10.34-3.68-14.67-2.46-4.32-5.84-7.71-10.16-10.16C242.7,1.23,237.81,0,232.36,0h-96.22v27.97h46.82s44.03,0,44.03,0c1.71,0,3.41.64,4.55,1.92.91,1.03,1.37,2.26,1.37,3.67v16.46c0,1.71-.64,3.41-1.92,4.55-1.03.91-2.26,1.37-3.67,1.37h-62.66c-5.46,0-10.35,1.23-14.67,3.68-4.32,2.46-7.71,5.85-10.16,10.16-2.46,4.32-3.68,9.16-3.68,14.53v26.88c0,5.46,1.23,10.35,3.68,14.67,2.46,4.32,5.84,7.71,10.16,10.16,4.32,2.46,9.21,3.68,14.67,3.68h37.44c8.58,0,15.54-6.96,15.54-15.54v-.27c0-4.24,3.27-7.96,7.51-8.07,4.35-.11,7.92,3.38,7.92,7.71v.74c0,8.52,6.91,15.42,15.42,15.42h4.21s1.52,0,1.52,0h114.32c5.46,0,10.34-1.23,14.67-3.68,4.32-2.46,7.71-5.84,10.16-10.16,2.46-4.32,3.68-9.21,3.68-14.67v-26.88c0-5.36-1.23-10.21-3.68-14.53-2.46-4.32-5.85-7.71-10.16-10.16-4.32-2.46-9.21-3.68-14.67-3.68h-62.1c-1.72,0-3.42-.64-4.55-1.93-.91-1.03-1.36-2.25-1.36-3.67v-16.45c0-1.72.64-3.42,1.93-4.55,1.03-.91,2.25-1.37,3.67-1.37Zm-73.2,78.17c0,1.41-.45,2.63-1.37,3.67-1.13,1.29-2.84,1.93-4.55,1.93h-56.97c-1.72,0-3.42-.64-4.55-1.93-.91-1.03-1.36-2.25-1.36-3.67v-16.46c0-1.72.64-3.42,1.93-4.55,1.03-.91,2.25-1.37,3.67-1.37h57.29c1.71,0,3.41.64,4.55,1.92.91,1.03,1.37,2.26,1.37,3.67v16.78Z"/><path class="cls-1" d="m27.97,106.14V33.89c0-1.72.64-3.42,1.93-4.55,1.03-.91,2.25-1.37,3.67-1.37h90.98V0h-1.29c-8.58,0-15.54,6.96-15.54,15.54v.27c0,4.24-3.27,7.96-7.51,8.07-4.35.11-7.92-3.38-7.92-7.71v-.74C92.28,6.91,85.38,0,76.86,0H28.51C23.06,0,18.17,1.23,13.85,3.68c-4.32,2.46-7.71,5.85-10.16,10.16C1.23,18.17,0,23.06,0,28.51v82.67c0,5.46,1.23,10.35,3.68,14.67,2.46,4.32,5.84,7.71,10.16,10.16,4.32,2.46,9.21,3.68,14.67,3.68h96.02v-27.97H33.88c-1.72,0-3.42-.64-4.55-1.93-.91-1.03-1.37-2.25-1.37-3.67Z"/></g></g></g></svg>'
                                }
                            }
                        }
                    }
                ]
            }
        }
    },
    extensions: {}
};
