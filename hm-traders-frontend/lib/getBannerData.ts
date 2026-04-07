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

  const getImageById = async (id: any) => {
    if (!id) return null;

    const res = await fetch(
      `https://headlesswp.teamgrid.co.in/wp-json/wp/v2/media/${id}`
    );

    if (!res.ok) return null;

    const imgData = await res.json();
    console.log("Fetched image data:", imgData);
    return imgData.link;
  };

export const fetchBannerBySlug = async (id: any) => {
  try {
    const res = await fetch(
      `https://headlesswp.teamgrid.co.in/wp-json/wp/v2/pages/${id}`,
      { cache: "no-store" }
    );

    const data = await res.json();
    const bannerData = data.acf.page_layout.find((item: any) => item.acf_fc_layout === "hero");
     if (bannerData.hero_image) {
      bannerData.hero_image_url = await getImageById(
        bannerData.hero_image
      );
    }
    console.log("Banner data:", bannerData);
    return bannerData || null;
  } catch (error) { 
    console.error("Banner fetch error:", error);
    return null;
  }
};