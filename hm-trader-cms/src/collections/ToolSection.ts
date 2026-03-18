import { CollectionConfig } from 'payload'

export const ToolSection: CollectionConfig = {
  slug: 'tool-section',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true, // ✅ one page / slug
    },

    {
      name: 'sections',
      type: 'array',
      fields: [
       {
  name: 'sectionKey',
  label: 'Section Key (e.g. featured, trending, homepage-top)',
  type: 'text',
  required: true,
},
        {
          name: 'smallTitle',
          type: 'text',
          defaultValue: 'Featured Products',
        },
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'Explore Our Featured',
        },
        {
          name: 'highlightWord',
          type: 'text',
          defaultValue: 'Tools',
        },
      ],
    },

    {
      name: 'viewAllText',
      type: 'text',
      defaultValue: 'View All',
    },
    {
      name: 'viewAllLink',
      type: 'text',
    },
  ],
}