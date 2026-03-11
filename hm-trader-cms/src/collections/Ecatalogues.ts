import { CollectionConfig } from "payload";

export const Ecatalogues: CollectionConfig = {
  slug: "ecatalogues",
  access: {
    read: () => true, // allows anyone to read ecatalogues
  },
  fields: [
    {
      name: "title",
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
      hasMany: false,
    },
    {
      name: "products",
      type: "relationship",
      relationTo: "products",
      hasMany: true,
    },
    {
      name: "catalogueFile",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "isActive",
      type: "checkbox",
      defaultValue: true,
    },
    {
      name: "publishedDate",
      type: "date",
    },
  ],
};
