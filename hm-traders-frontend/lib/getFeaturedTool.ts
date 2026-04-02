import { API_URL } from "@/api/Api";

export async function getFeaturedTool(slug:string) {
  const url = `${API_URL}/tool-section?where[slug][equals]=${slug}`;
  const res = await fetch(url, {
    cache: "no-store",
  });
    if (!res.ok) {
    console.error('[frontend] product tools section fetch failed', res.status, await res.text().catch(()=>'<no body>'))
    throw new Error("Failed to fetch product tools section data");
    }

    return res.json();
}
 


// import data from "@/data/tool-section.json";

// export async function getFeaturedTool(slug) {
//   try {
//     const result = data.docs.find(item => item.slug === slug);

//     // mimic API response shape
//     return {
//       docs: result ? [result] : []
//     };

//   } catch (error) {
//     console.error("[frontend] product tools section load failed", error);
//     throw new Error("Failed to load product tools section data");
//   }
// }