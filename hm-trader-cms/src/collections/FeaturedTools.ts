import { CollectionConfig } from 'payload'

export const FeaturedTools: CollectionConfig = {
  slug: 'featured-tool-section',
  access: {
    read: () => true,
  },
  fields: [
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

    {
      name: 'tools',
      label: 'Tools Cards',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'image',
          label: 'Tool Image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'title',
          label: 'Tool Title',
          type: 'text',
          required: true,
        },
        {
          name: 'link',
          label: 'Tool Link',
          type: 'text',
        },
        {
          name: 'rating',
          label: 'Rating',
          type:  'text',
        },
        {
          name: 'reviewCount',
          label: 'Review Count',
          type: 'text'
        },
        {
          name: 'price',
          label: 'Price',
          type: 'text'
        }
      ],
    },
  ],
}
