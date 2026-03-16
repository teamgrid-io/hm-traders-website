import { CollectionConfig } from "payload";

export const ContactInfo: CollectionConfig = {
  slug: "contact-info",
  access: {
    read: () => true,
  },

  fields: [
    {
      name: "formTitle",
      label: "Form Title",
      type: "text",
      defaultValue: "Get In Touch",
    },

    // ADDRESS
    {
      name: "addressIcon",
      label: "Address Icon",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "addressLabel",
      type: "text",
      defaultValue: "Address",
    },
    {
      name: "address",
      type: "textarea",
    },

    // PHONE
    {
      name: "phoneIcon",
      label: "Phone Icon",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "phoneLabel",
      type: "text",
      defaultValue: "Contact",
    },
    {
      name: "phone",
      type: "text",
    },

    // EMAIL
    {
      name: "emailIcon",
      label: "Email Icon",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "emailLabel",
      type: "text",
      defaultValue: "Email Address",
    },
    {
      name: "email",
      type: "text",
    },
  ],
};