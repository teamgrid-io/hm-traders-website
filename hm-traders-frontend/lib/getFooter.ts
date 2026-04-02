// src/lib/getFooter.ts
import { ENDPOINTS } from "../api/Api"; 

export async function getFooterData() {
  try {
    
    const res = await fetch(
      ENDPOINTS.footer,
      {
        next: {
          revalidate: 3600,      // cache 1 hour
          tags: ['footer'],      // bust with revalidateTag('footer')
        },
      }
    );

    
    if (!res.ok) {
      const error = await res.text();
      throw new Error(`API Error: ${res.status} - ${error}`);
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("❌ Error fetching footer data:", error);
    throw error;
  }
}

// import data from "@/data/footer.json"

// export async function getFooterData() {
//   try {
//     return data
//   } catch (error) {
//     console.error(" Error fetching footer data:", error);
//     return [];
//   }
// }