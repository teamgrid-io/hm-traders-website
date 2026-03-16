import { CollectionConfig } from "payload";

const CTA: CollectionConfig = {
  slug: "cta",
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
      name: "highlightWord",
      type: "text",
      label: "Highlighted Word",
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "primaryButtonText",
      type: "text",
    },
    {
      name: "primaryButtonLink",
      type: "text",
    },
    {
      name: "secondaryButtonText",
      type: "text",
    },
    {
      name: "secondaryButtonLink",
      type: "text",
    },
  ],
};

export default CTA; 