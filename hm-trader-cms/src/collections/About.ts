import { CollectionConfig } from 'payload'

export const About: CollectionConfig = {
  slug: 'about',

   access: {
    read: () => true,  
  },

  fields: [
    {
      name: 'about',
      type: 'text',
      required: true,
    }
  ],
}

export default About