export default [
    {
        groupType: "default_group",
        richTextType: "text",
        fields: [
            {
                objectTypeId: "0-1",
                name: "preferred_programming_language",
                label: "Preferred Programming Language (optional)",
                required: false,
                hidden: false,
                options: [
                    {
                        label: "JavaScript",
                        value: "JavaScript",
                        description: "",
                        displayOrder: -1
                    },
                    {
                        label: "Python",
                        value: "Python",
                        description: "",
                        displayOrder: -1
                    },
                    {
                        label: "Java",
                        value: "Java",
                        description: "",
                        displayOrder: -1
                    },
                    {
                        label: "Go",
                        value: "Go",
                        description: "",
                        displayOrder: -1
                    },
                    {
                        label: "C#/ .Net",
                        value: "C#/ .Net",
                        description: "",
                        displayOrder: -1
                    },
                    {
                        label: "C/C++",
                        value: "C/C++",
                        description: "",
                        displayOrder: -1
                    },
                    {
                        label: "Rust",
                        value: "Rust",
                        description: "",
                        displayOrder: -1
                    },
                    {
                        label: "TypeScript",
                        value: "TypeScript",
                        description: "",
                        displayOrder: -1
                    },
                    {
                        label: "Other",
                        value: "Other",
                        description: "",
                        displayOrder: -1
                    }
                ],
                fieldType: "multiple_checkboxes"
            }
        ]
    },
    {
        groupType: "default_group",
        richTextType: "text",
        fields: [
            {
                objectTypeId: "0-1",
                name: "blockchain_familiarity",
                label: "How would you best describe your blockchain familiarity?&nbsp; (optional)",
                required: false,
                hidden: false,
                options: [
                    {
                        label: "New to Blockchain Development",
                        value: "New to blockchain development",
                        description: "",
                        displayOrder: -1
                    },
                    {
                        label: "Experienced Web 3 Developer",
                        value: "Experienced Web 3 Developer",
                        description: "",
                        displayOrder: -1
                    },
                    {
                        label: "Web 3 Developer - new to Building on Casper",
                        value: "Web 3 developer - new to building on Casper",
                        description: "",
                        displayOrder: -1
                    },
                    {
                        label: "Other",
                        value: "Other",
                        description: "",
                        displayOrder: -1
                    }
                ],
                fieldType: "dropdown"
            }
        ]
    },
    {
        groupType: "default_group",
        richTextType: "text",
        fields: [
            {
                objectTypeId: "0-1",
                name: "interests__developer_portal_",
                label: "Interests (Developer Portal) (optional)",
                required: false,
                hidden: false,
                options: [
                    {
                        label: "Casper Grant Funding",
                        value: "Casper Grant Funding",
                        description: "",
                        displayOrder: -1
                    },
                    {
                        label: "Casper Developer Rewards",
                        value: "Casper Developer Rewards",
                        description: "",
                        displayOrder: -1
                    },
                    {
                        label: "Casper Developer Community",
                        value: "Casper Developer Community",
                        description: "",
                        displayOrder: -1
                    },
                    {
                        label: "Other",
                        value: "Other",
                        description: "",
                        displayOrder: -1
                    }
                ],
                fieldType: "multiple_checkboxes"
            }
        ]
    }
];
