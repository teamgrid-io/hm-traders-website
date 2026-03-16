import { CollectionConfig } from "payload";

const Stats: CollectionConfig = {
  slug: "stats",
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
      name: "number",
      type: "text", 
      required: true,
    },
  ],
};

export default Stats; 