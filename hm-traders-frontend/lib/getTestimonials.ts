// lib/getTestimonials.ts
import { Testimonial } from "@/types/testimonial";

export async function getTestimonials(): Promise<Testimonial[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/testimonials?depth=1&sort=-createdAt`,
    { next: { revalidate: 60 } }
  )
  const data = await res.json()
  return data.docs
}