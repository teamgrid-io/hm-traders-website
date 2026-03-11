import { CollectionConfig } from 'payload'

export const Whychoose: CollectionConfig = {
  slug: 'whychoose',

    access: {
    read: () => true,
  },

  fields: [
    {
      name: 'whychoose',
      type: 'text',
      required: true,
    }
  ],
}

export default Whychoose