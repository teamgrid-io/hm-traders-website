import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Categories } from './collections/Categories'
import { Brands } from './collections/Brands'
import { Products } from './collections/Products'
import { Enquiries } from './collections/Enquiries'
import { Menu } from './collections/Menu'
import { Ecatalogues } from './collections/Ecatalogues' 
import { About } from './collections/About'
import { ProductCategorySection } from './collections/FeatureSections'
import { ProductToolsSection } from './collections/ProductToolsSection'
import { Banner } from './collections/Banner'
import { ToolSection } from './collections/ToolSection'
import { ContactInfo } from './collections/ContactInfo'
import Testimonials from './collections/Testimonials'
import { Footer } from './globals/Footer'
import About_Stats from './collections/Stats'
import CTA from './collections/Cta'

import  PartnersSection  from './collections/PartnerSection'
import GlobalNetwork from './collections/GlobalNetwork'
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
export default buildConfig({
  admin: {
    user: Users.slug, 
    importMap: { 
      baseDir: path.resolve(dirname),
    },
  },
  cors: [
    "http://localhost:3001","*"
  ],
  collections: [Users, Media, Categories, Brands, Products, Ecatalogues, Enquiries, Menu, About, Banner, ContactInfo, ProductCategorySection, ProductToolsSection, ToolSection, Testimonials,PartnersSection,GlobalNetwork,About_Stats,CTA],
    globals: [    // 
    Footer,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  sharp,
  plugins: [],
})
 