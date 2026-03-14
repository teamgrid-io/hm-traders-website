import { API_URL } from "@/api/Api";
export const fetchBannerBySlug = async (slug: string) => {
  try {
    const res = await fetch(
      `${API_URL}/banner?where[slug][equals]=${slug}`,
      { cache: "no-store" }
    );

    const data = await res.json();
    console.log("Banner by slug data:", data); // Debugging log
    return data.docs[0];
  } catch (error) { 
    console.error("Banner fetch error:", error);
    return null;
  }
};