import { CollectionConfig } from 'payload'

export const FeatureSections: CollectionConfig = {
  slug: 'feature-sections', // ✅ updated slug
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

        // ✅ MULTIPLE DESCRIPTIONS
        {
          name: 'descriptions',
          label: 'Descriptions',
          type: 'array',
          fields: [
            {
              name: 'text',
              type: 'textarea',
              required: true,
            },
          ],
        },

        // ✅ IMAGES ARRAY
      {
  name: 'images',
  label: 'Images', // ✅ label for the whole array
  type: 'array',
  fields: [
      {
      name: 'title',
      label: 'Image Title',
      type: 'text',
    },
    {
      name: 'image',
      label: 'Image File', // ✅ label shown in admin UI
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    // ✅ Add title/name for image
  
  ],
},

        // ✅ BUTTONS ARRAY
        {
          name: 'buttons',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'link',
              type: 'text',
            },
          ],
        },
      ],
    },

    {
      name: 'viewAllText',
      type: 'text',
      defaultValue: 'View All',
    },
    
  ],
}