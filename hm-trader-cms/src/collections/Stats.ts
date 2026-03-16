import { CollectionConfig } from "payload";

const About_Stats: CollectionConfig = {
  slug: "About_Stats",
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

export default About_Stats; 