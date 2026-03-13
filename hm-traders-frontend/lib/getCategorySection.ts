import { API_URL } from "@/api/Api";

export async function getCategorySection() {
  const url = `${API_URL}/product-category-section`;
  console.log('[frontend] fetching product category section from', url)
  const res = await fetch(url, {
    cache: "no-store",
  });

    if (!res.ok) {
    console.error('[frontend] product category section fetch failed', res.status, await res.text().catch(()=>'<no body>'))
    throw new Error("Failed to fetch product category section data");
  }

    return res.json();
}
