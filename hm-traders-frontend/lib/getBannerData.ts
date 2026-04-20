// data fetching from payload cms
// import { API_URL } from "@/api/Api";
// export const fetchBannerBySlug = async (slug: string) => {
//   try {
//     const res = await fetch(
//       `${API_URL}/banner?where[slug][equals]=${slug}`,
//       { cache: "no-store" }
//     );

//     const data = await res.json();
//     return data.docs[0];
//   } catch (error) { 
//     console.error("Banner fetch error:", error);
//     return null;
//   }
// };

//data static fetching from json file

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

//
import { API_URL } from '../api/Api';

  const getImageById = async (id: any) => {
    if (!id) return null;

    const res = await fetch(
      `${API_URL}/media/${id}`
    );

    if (!res.ok) return null;

    const imgData = await res.json();
    return imgData.link;
  };

export const fetchBannerBySlug = async (id: any) => {
  try {
    const res = await fetch(
      `${API_URL}/pages/${id}`,
      {cache: "force-cache" }
    );

    const data = await res.json();
    const bannerData = data.acf.page_layout.find((item: any) => item.acf_fc_layout === "hero");
     if (bannerData.hero_image) {
      bannerData.hero_image_url = await getImageById(
        bannerData.hero_image
      );
    }
    return bannerData || null;
  } catch (error) { 
    console.error("Banner fetch error:", error);
    return null;
  }
};