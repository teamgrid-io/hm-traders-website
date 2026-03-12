import { API_URL } from "../api/Api";

export async function getEcatalogues() {
  try {
    const url = `${API_URL}/ecatalogues`;
    console.log("Fetching eCatalogues from:", url);
    const res = await fetch(url, {
      cache: "no-store",
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("API error response:", errorText);
      throw new Error(`Failed to fetch eCatalogues: ${res.status} ${errorText}`);
    }

    const data = await res.json();
    // console.log("eCatalogues API response:", JSON.stringify(data, null, 2));

    return data.docs || [];
  } catch (error) {
    console.error("Error fetching eCatalogues:", error);
    return [];
  }
}
