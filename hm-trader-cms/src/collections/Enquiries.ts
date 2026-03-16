import { CollectionConfig } from "payload";
export const Enquiries: CollectionConfig = {
  slug: "enquiries",
access:{
create: () => true,
},
  fields: [
        {
      name: "formTitle",
      label: "Form Title",
      type: "text",
      defaultValue: "Any Questions?",
    },

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