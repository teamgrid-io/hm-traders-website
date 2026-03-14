import { CollectionConfig } from "payload";

export const ProductCategorySection: CollectionConfig = {
  slug: "product-category-section",
 
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
      defaultValue: "Your Trusted Partner in Industrial Tools",
    },
      {
      name: "highlightWord",
      label: "Highlight Word",
      type: "text",
      defaultValue: "Tools",
    }, 
    {
      name: "description1",
      label: "Description1",
      type: "textarea",
    },
     {
      name: "description2",
      label: "Description 2",
      type: "textarea", 
    },
    {
      name: "buttonText",
      label: "Button Text",
      type: "text",
      defaultValue: "Explore Products",
    },
    {
      name: "buttonLink",
      label: "Button Link",
      type: "text",
    },

    {
      name: "images",
      label: "Images",
      type: "group",
      fields: [
        {
          name: "topImage",
          label: "Top Image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "bottomImage",
          label: "Bottom Image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
  ],
}; 