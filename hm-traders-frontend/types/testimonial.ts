// types/testimonial.ts
export type Testimonial = {
  id: string
  title: string
  review: string
  rating: number
  featured: boolean
  author: {
    name: string
    avatar?: {
      url?: string | null
      alt?: string | null
    } | null
  }
  status: 'draft' | 'published'
}