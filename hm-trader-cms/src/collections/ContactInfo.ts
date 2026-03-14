import { CollectionConfig } from "payload";

export const ContactInfo: CollectionConfig = {
  slug: "contact-info",

  access: {
    read: () => true,
  },

  fields: [
    {
      name: "address",
      type: "textarea",
      required: true,
    },
    {
      name: "email",
      type: "email",
      required: true,
    },
    {
      name: "phone",
      type: "text",
      required: true,
    },
  ],
};