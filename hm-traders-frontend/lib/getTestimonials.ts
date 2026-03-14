// lib/getTestimonials.ts
import { Testimonial } from "@/types/testimonial";
import { API_URL } from "@/api/Api";

export async function getTestimonials(): Promise<Testimonial[]> {
  const res = await fetch(
    `${API_URL}/testimonials?depth=1&sort=-createdAt`,
    { next: { revalidate: 60 } }
  )
  const data = await res.json()
  return data.docs
}