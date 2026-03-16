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