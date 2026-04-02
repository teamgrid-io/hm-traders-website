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

// import data from "@/data/testimonials.json";

// export async function getTestimonials() {
//   try {
//     // 1. filter published only
//     const published = data.docs.filter(t => t.status === "published");

//     // 2. sort by createdAt DESC (latest first)
//     const sorted = published.sort(
//       (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//     );

//     return sorted;
//   } catch (error) {
//     console.error("[frontend] testimonials load failed", error);
//     return [];
//   }
// }