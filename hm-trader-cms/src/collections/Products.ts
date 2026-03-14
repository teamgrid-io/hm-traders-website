import { CollectionConfig } from "payload";
export const Products: CollectionConfig = {
  slug: "products",
  access: {
    read: () => true, // allows anyone to read posts
  },

  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
    },

    {
      name: "description",
      type: "richText",
    },

    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
    },

    {
      name: "brand",
      type: "text",
    },

    {
      name: "images",
      type: "upload",
      relationTo: "media",
      hasMany: true,
    },

    {
      name: "specifications",
      type: "textarea",
    },

    {
      name: "catalogPdf",
      type: "upload",
      relationTo: "media",
    },
     {
      name: "price",
      type: "number",
      required: true,
      min: 0,
    },

    {
      name: "rating",
      type: "number",
      min: 0,
      max: 5,
      defaultValue: 0,
      admin: {
        step: 0.1,
      },
    },

    {
      name: "reviewCount",
      type: "number",
      defaultValue: 0,
      min: 0,
    },

    {
      name: "isFeatureTool",
      type: "checkbox",
      defaultValue: false,
      label: "Featured Product",
    },
  ],
};