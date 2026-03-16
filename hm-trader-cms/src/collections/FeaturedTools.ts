import { CollectionConfig } from 'payload'

export const FeaturedTools: CollectionConfig = {
  slug: 'tool-section',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: 'smallTitle',
      label: ' Small Title',
      type: 'text',
      defaultValue: 'Featured Products',
    },
    {
      name: 'heading',
      label: 'Heading',
      type: 'text',
      defaultValue: 'Explore Our Featured',
    },
    {
      name: 'highlightWord',
      label: 'Highlight Word',
      type: 'text',
      defaultValue: 'Tools',
    },

    {
      name: 'viewAllText',
      label: 'View All Button Text',
      type: 'text',
      defaultValue: 'View All',
    },
    {
      name: 'viewAllLink',
      label: 'View All Link',
      type: 'text',
    },
  ],
}
