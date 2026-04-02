import { API_URL } from "@/api/Api";

export const getFeatureSections = async (slug: string) => {
  try {
    const res = await fetch(
      `${API_URL}/feature-sections?where[slug][equals]=${slug}&depth=2`,
      {
        method: "GET",
        cache: "no-store", // always fresh data
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch feature sections");
    }

    const data = await res.json();
console.log("Fetched feature sections data1:", data);
    // return first matched document
    return data?.docs?.[0] || null;
  } catch (error) {
    console.error("Error fetching feature sections:", error);
    return null;
  }
};