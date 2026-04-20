import { API_URL } from "../api/Api";

export async function getBanner(slug: string) {
  const res = await fetch(
    `${API_URL}/banner?where[slug][equals]=${slug}`,
    { cache: "force-cache" }
  );

  const data = await res.json();
  return data.docs[0];
}

// import data from "@/data/banner.json";

// export async function getBanner(slug) {
//   try {
//     const banner = data.docs.find(item => item.slug === slug);
//     return banner || null;
//   } catch (error) {
//     console.error("Failed to load banner:", error);
//     return null;
//   }
// }