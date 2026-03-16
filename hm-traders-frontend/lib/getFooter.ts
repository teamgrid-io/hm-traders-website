// src/lib/getFooter.ts
import { ENDPOINTS } from "../api/Api"; 

export async function getFooterData() {
  try {
    console.log("📡 Fetching footer data from:", ENDPOINTS.footer);
    
    const res = await fetch(
      ENDPOINTS.footer,
      {
        next: {
          revalidate: 3600,      // cache 1 hour
          tags: ['footer'],      // bust with revalidateTag('footer')
        },
      }
    );

    console.log("📡 Footer API response status:", res.status);
    
    if (!res.ok) {
      const error = await res.text();
      throw new Error(`API Error: ${res.status} - ${error}`);
    }
    
    const data = await res.json();
    console.log("✅ Footer data fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("❌ Error fetching footer data:", error);
    throw error;
  }
}
