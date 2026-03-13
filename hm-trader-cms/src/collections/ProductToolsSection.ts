import { CollectionConfig } from "payload";

export const ProductToolsSection: CollectionConfig = {
  slug: "product-tools-section",

    access: {
        read: () => true, // Allow public read access
    }, 

  fields: [
    {
      name: "smallTitle",
      label: "Small Title",
      type: "text",
      defaultValue: "Our Product Category",
    },
    {
      name: "heading",
      label: "Heading",
      type: "text",
      defaultValue: "Explore Our Wide Range of",
    },
    {
      name: "highlightWord",
      label: "Highlight Word",
      type: "text",
      defaultValue: "Tools",
    },

    {
      name: "viewAllText",
      label: "View All Button Text",
      type: "text",
      defaultValue: "View All",
    },
    {
      name: "viewAllLink",
      label: "View All Link",
      type: "text",
    },

    {
      name: "tools",
      label: "Tools Cards",
      type: "array",
      minRows: 1,
      fields: [
        {
          name: "image",
          label: "Tool Image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "title",
          label: "Tool Title",
          type: "text",
          required: true,
        },
        {
          name: "link",
          label: "Tool Link",
          type: "text",
        },
      ],
    },
  ],
}; 