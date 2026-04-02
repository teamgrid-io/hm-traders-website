import { API_URL } from "@/api/Api";

export async function getPartners() {
  try {
    const res = await fetch(`${API_URL}/partners-section?depth=1`);
    if (!res.ok) {
      throw new Error("Failed to fetch partners");
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching partners:", error);
    return null;
  }

}  

// import data from "@/data/partners-section.json";

// export async function getPartners() {
//   try {
//     // Mimic API response
//     return data;
//   } catch (error) {
//     console.error("[frontend] failed to load partners section", error);
//     return null;
//   }
// }