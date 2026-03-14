import { CollectionConfig } from 'payload'

const Testimonials: CollectionConfig = {
  slug: 'testimonials',

  // ✅ admin panel settings
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author_name', 'rating', 'featured', 'status'],
    description: 'Manage customer testimonials shown on the homepage.',
  },

  // ✅ auto timestamps (createdAt, updatedAt added automatically by payload)
  timestamps: true,

  // ✅ access control
  access: {
    // anyone can read published ones (your frontend)
    read: ({ req }) => {
      if (req.user) return true // logged-in admin sees all
      return {
        status: { equals: 'published' } // public sees only published
      }
    },
    create: ({ req }) => !!req.user, // only logged-in admin
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Short heading shown at top of the card.',
      },
    },
    {
      name: 'review',
      type: 'textarea',
      required: true,
      admin: {
        description: 'The customer review paragraph.',
      },
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
      admin: {
        description: 'Star rating from 1 to 5.',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Check this to show card with orange background. Only one should be featured at a time.',
      },
    },
    {
      name: 'author',
      type: 'group',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: {
            description: 'Display name e.g. "Aaron Finch"',
          },
        },
        {
          name: 'avatar',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Profile photo of the reviewer.',
          },
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
      admin: {
        description: 'Only published testimonials appear on the site.',
        position: 'sidebar', // ✅ moves status to sidebar like WordPress
      },
    },
  ],

  // ✅ hooks — runs before save
  hooks: {
    beforeChange: [
      ({ data }) => {
        // trim whitespace from title and review
        if (data.title) data.title = data.title.trim()
        if (data.review) data.review = data.review.trim()
        return data
      },
    ],
  },
}

export default Testimonials