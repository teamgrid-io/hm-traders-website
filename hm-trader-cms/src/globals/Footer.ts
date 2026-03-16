import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  admin: {
    group: 'Site Settings',
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'brand',
      type: 'group',
      label: 'Brand Column',
      fields: [
        {
          name: 'companyName',
          type: 'text',
          required: true,
          defaultValue: 'H.M Traders',
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        },
        {
          name: 'socialLinks',
          type: 'array',
          label: 'Social Media Links',
          maxRows: 6,
          fields: [
            {
              name: 'platform',
              type: 'select',
              required: true,
              options: [
                { label: 'Facebook',  value: 'facebook'  },
                { label: 'LinkedIn',  value: 'linkedin'  },
                { label: 'Instagram', value: 'instagram' },
                { label: 'X/Twitter', value: 'x'         },
                { label: 'YouTube',   value: 'youtube'   },
                { label: 'WhatsApp',  value: 'whatsapp'  },
              ],
            },
            {
              name: 'url',
              type: 'text',
              required: true,
              label: 'Profile URL',
            },
          ],
        },
      ],
    },
    {
      name: 'navColumns',
      type: 'array',
      label: 'Navigation Columns',
      maxRows: 4,
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
        },
        {
          name: 'links',
          type: 'array',
          maxRows: 12,
          fields: [
            { name: 'label',        type: 'text',     required: true },
            { name: 'url',          type: 'text',     required: true },
            { name: 'openInNewTab', type: 'checkbox', defaultValue: false },
          ],
        },
      ],
      defaultValue: [
        {
          heading: 'Company',
          links: [
            { label: 'About Us',        url: '/about'         },
            { label: 'Products',        url: '/products'      },
            { label: 'Import & Export', url: '/import-export' },
            { label: 'Blog',            url: '/blog'          },
            { label: 'Contact',         url: '/contact'       },
          ],
        },
        {
          heading: 'Products',
          links: [
            { label: 'Cutting Tools',   url: '/products/cutting'   },
            { label: 'Carbide Tools',   url: '/products/carbide'   },
            { label: 'Hand Tools',      url: '/products/hand'      },
            { label: 'Pneumatic Tools', url: '/products/pneumatic' },
            { label: 'Cordless Tools',  url: '/products/cordless'  },
          ],
        },
      ],
    },
    {
      name: 'newsletter',
      type: 'group',
      label: 'Newsletter Section',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
          label: 'Show Newsletter Section',
        },
        {
          name: 'tagline',
          type: 'textarea',
          defaultValue: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        },
        {
          name: 'placeholder',
          type: 'text',
          defaultValue: 'Enter your email',
        },
        {
          name: 'buttonLabel',
          type: 'text',
          defaultValue: 'Subscribe',
        },
        {
          name: 'successMessage',
          type: 'text',
          defaultValue: 'Thanks for subscribing!',
        },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      defaultValue: '© {{year}} H.M Traders. All Rights Reserved',
      admin: {
        description: 'Use {{year}} for the current year.',
      },
    },
  ],
}