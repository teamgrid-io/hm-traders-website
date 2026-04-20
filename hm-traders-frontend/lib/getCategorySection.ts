import { API_URL } from "@/api/Api";

export async function getCategorySection() {
  const url = `${API_URL}/feature-sections`;
  const res = await fetch(url, {
cache: "force-cache"
  });

    if (!res.ok) {
    console.error('[frontend] product category section fetch failed', res.status, await res.text().catch(()=>'<no body>'))
    throw new Error("Failed to fetch product category section data");
  }

    return res.json();
}

// import data from "@/data/feature-sections.json";

// export async function getCategorySection() {
//   try {
//     return data; // keep same structure as API
//   } catch (error) {
//     console.error("[frontend] product category section load failed", error);
//     throw new Error("Failed to load product category section data");
//   }
// }
