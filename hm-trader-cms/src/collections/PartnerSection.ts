import { CollectionConfig } from "payload";

const PartnersSection: CollectionConfig = {
  slug: "partners-section",


  access: {
    read: () => true,
  },
   
  fields: [
    {
      name: "tag",
      label: "Section Tag",
      type: "text",
      defaultValue: "★ Our Partners",
    },
    {
      name: "title",
      label: "Title",
      type: "text",
      defaultValue: "Our Trusted",
    },
    {
      name: "highlight",
      label: "Highlighted Word",
      type: "text",
      defaultValue: "Partners",
    },

    {
      name: "partners",
      label: "Partners List",
      type: "array",
      fields: [
        {
          name: "name",
          label: "Partner Name",
          type: "text",
          required: true,
        },
        {
          name: "description",
          label: "Partner Description",
          type: "textarea",
        },
        {
          name: "logo",
          label: "Partner Logo",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
  ],
}; 

export default PartnersSection; 