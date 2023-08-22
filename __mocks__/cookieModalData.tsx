export const cookieModalData = {
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
                                    parameter: "necessary",
                                    title: "Necessary Cookies",
                                    description:
                                        "<p>These cookies are necessary to maintain our services and cannot be switched off. They are usually only set in response to actions made by you. You can set your browser to block or alert you about these cookies, but that can make some parts of the site not work. These cookies do not store any personally identifiable information.</p>"
                                }
                            },
                            {
                                cookie_item_id: {
                                    required: false,
                                    parameter: "performance",
                                    title: "Performance Cookies",
                                    description:
                                        "<p>These cookies allow us to count visits and traffic so we can collect insights like which pages are the most popular and see how visitors move around the site. All information these cookies collect is aggregated and therefore, anonymous. If you do not allow these cookies, we will not be able to provide you with a tailored experience.</p>"
                                }
                            },
                            {
                                cookie_item_id: {
                                    required: false,
                                    parameter: "functional",
                                    title: "Functional Cookies",
                                    description:
                                        "<p>These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages. If you do not allow these cookies, some or all of these services may not function properly.</p>"
                                }
                            },
                            {
                                cookie_item_id: {
                                    required: false,
                                    parameter: "marketing",
                                    title: "Marketing Cookies",
                                    description:
                                        "<p>When you accept marketing cookies, you give us your consent to place cookies on your device to provide you with relevant content that fits your interests. These cookies may be set through our site by our advertising partners or by us to build a profile of your interests and show you relevant content. To deliver content that fits your interests on our site, we will use your interactions together with the personal information you have provided to us. To present you with relevant content on third-party sites, we will share this information and a customer identifier such as an encrypted email address or device ID with third parties, such as advertising platforms and social networks. To make the content as interesting as possible, we may link this data across the different devices you use. If you choose not to accept marketing cookies, we will not place such cookies on your device and you may experience less relevant content from us.</p>"
                                }
                            }
                        ],
                        manage_body:
                            '<p>Because we respect your right to privacy, you can choose not to allow some types of cookies. Find out more about each category below and change our default settings as you choose. Keep in mind that blocking some types of cookies may impact our ability to deliver and improve our services. When you\'re ready, click on "Confirm My Choices" and remember, you can always change your mind later. If you want to learn more about cookies and why we use them, visit our <a href="/privacy-policy" target="_self">Privacy Policy</a>.</p>',
                        manage_title: "We care about your privacy",
                        notice_body:
                            '<p>We use cookies to customize and improve the content shown to you, making sure you get the best online experience. By clicking "Allow All", we can continue to deliver an ideal web experience. If you prefer, you can choose to continue with "Manage Cookies", but keep in mind that blocking some types of cookies may impact our ability to show content. If you want to learn more about cookies and why we use them, visit our Privacy Policy page. You may review and change your choices at any time.&nbsp;</p>',
                        notice_title: "Before you start",
                        manage_button_text: "Manage Cookies",
                        accept_all_button_text: "Allow All",
                        confirm_button_text: "Confirm Choices"
                    }
                ]
            }
        }
    },
    extensions: {}
};
