import { API_URL } from "@/api/Api";
export const fetchBannerBySlug = async (slug: string) => {
  try {
    const res = await fetch(
      `${API_URL}/banner?where[slug][equals]=${slug}`,
      { cache: "no-store" }
    );

    const data = await res.json();
    return data.docs[0];
  } catch (error) { 
    console.error("Banner fetch error:", error);
    return null;
  }
};

// import data from "@/data/banner.json";
// export const fetchBannerBySlug = async (slug: string) => {
//   try {
//     const banner = data.docs.find(item => item.slug === slug);
//     return banner || null;
//   } catch (error) { 
//     console.error("Banner fetch error:", error);
//     return null;
//   }
// };