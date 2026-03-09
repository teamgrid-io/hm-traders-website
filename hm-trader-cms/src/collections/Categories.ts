import { CollectionConfig } from "payload";
export const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    useAsTitle: "name", // this tells payload to show category name
  },

  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
    },
     {
      name: "images",
      type: "upload",
      relationTo: "media",
      hasMany: true,
    },
  ],
};