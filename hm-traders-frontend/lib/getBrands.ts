import { API_URL } from "../api/Api";    
export async function getBrands() {
  try {

    const res = await fetch(`https://headlesswp.teamgrid.co.in/wp-json/wp/v2/brand`, {
      cache: "no-store",
    });
    

    
    if (!res.ok) {
      const errorText = await res.text();
      console.error("API error response:", errorText);
      throw new Error(`Failed to fetch brands: ${res.status} ${errorText}`);
    }

    const data = await res.json();
    return data|| []; // Payload returns docs array
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
}

// import data from "@/data/brands.json"

// export async function getBrands() {
//   try {
//     return data
//   } catch (error) {
//     console.error("Error fetching brands:", error);
//      return [];
//   }
// }