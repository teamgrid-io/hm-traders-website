import { CollectionConfig } from "payload";
export const Categories: CollectionConfig = {
  slug: "categories",
   access: {
    read: () => true, // allows anyone to read posts
  },
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