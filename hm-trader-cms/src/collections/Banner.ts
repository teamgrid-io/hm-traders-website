import { CollectionConfig } from "payload";

export const Banner: CollectionConfig = {
  slug: "banner",
  admin: {
    useAsTitle: "title",
  },
  access: {
    read: () => true,
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

    // HERO SECTION
    {
      name: "heroTitle",
      type: "text",
    },
    {
      name: "heroSubtitle",
      type: "text",
    },
    {
      name: "heroImage",
      type: "upload",
      relationTo: "media",
    },

{
  name: "buttons",
  type: "array",
  fields: [
    {
      name: "label",
      type: "text",
      required: true,
    },
    {
      name: "link",
      type: "text",
      required: true,
    },
  ],
},
{
  name: "heroFeatures",
  type: "array",
  maxRows: 3,
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "text",
    },
   {
  name: "icon",
  type: "upload",
  relationTo: "media",
}
  ],
}
    
  ],
  
};