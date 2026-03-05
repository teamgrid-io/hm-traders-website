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
  ],
};