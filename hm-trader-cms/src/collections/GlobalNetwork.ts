import { CollectionConfig } from "payload/";

const GlobalNetwork: CollectionConfig = {
  slug: "global-network",
    access: {
    read: () => true,
    },

  fields: [
    {
      name: "tag",
      type: "text",
      defaultValue: "★ Global Import & Export Network",
    },
    {
      name: "title",
      type: "text",
      defaultValue: "Our Global Import & Export",
    },
    {
      name: "highlight",
      type: "text",
      defaultValue: "Operations",
    },

    {
      name: "mapImage",
      type: "upload",
      relationTo: "media",
      required: true,
    }, 

    {
      name: "locations",
      type: "array",
      label: "Country Locations",
      fields: [
        {
          name: "country",
          type: "text",
        },
        {
          name: "top",
          type: "text",
          label: "Top Position (%)",
        },
        {
          name: "left",
          type: "text",
          label: "Left Position (%)",
        },
      ],
    },

    {
      name: "features",
      type: "array",
      label: "Bottom Features",
      fields: [
        {
          name: "title",
          type: "text",
        },
        {
          name: "icon",
          type: "upload",
          relationTo: "media",
        },
      ],
    },
  ],
};

export default GlobalNetwork;  