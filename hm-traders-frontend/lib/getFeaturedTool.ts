import { API_URL } from "@/api/Api";

export async function getFeaturedTool() {
  const url = `${API_URL}/featured-tool-section`;
  console.log('[frontend] fetching featured tools section from', url)
  const res = await fetch(url, {
    cache: "no-store",
  });
    if (!res.ok) {
    console.error('[frontend] product tools section fetch failed', res.status, await res.text().catch(()=>'<no body>'))
    throw new Error("Failed to fetch product tools section data");
    }

    return res.json();
}
 