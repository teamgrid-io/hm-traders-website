import { CollectionConfig } from "payload";
export const Enquiries: CollectionConfig = {
  slug: "enquiries",
access:{
create: () => true,
},
  fields: [
    {
      name: "name",
      type: "text",
    },
    {
      name: "email",
      type: "text",
    },
    {
      name: "phone",
      type: "text",
    },
    {
      name: "message",
      type: "textarea",
    },
  ],
};