import { API_URL } from "../api/Api";    
export async function getBrands() {
  try {
    const url = `${API_URL}/brands`;
    console.log("Fetching brands from:", url);
    const res = await fetch(url, {
      cache: "no-store",
    });
    
    console.log("Response status:", res.status, "OK:", res.ok);
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error("API error response:", errorText);
      throw new Error(`Failed to fetch brands: ${res.status} ${errorText}`);
    }

    const data = await res.json();
    console.log("Brands API response:", JSON.stringify(data, null, 2));

    return data.docs || []; // Payload returns docs array
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
}