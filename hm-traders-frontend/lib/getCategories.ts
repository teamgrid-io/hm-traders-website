import { API_URL } from "@/api/Api";    
// export async function getCategories() {
//   try {
//     const res = await fetch(
//       `${API_URL}/categories?limit=100&populate=images`
//     );

//     if (!res.ok) {
//       throw new Error("Failed to fetch categories");
//     }

//     const data = await res.json();
//     return data.docs;
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// }
// export async function getCategoriesByPagination(page = 1, limit = 10) {
//   try {
//     const res = await fetch(
//       `${API_URL}/categories?page=${page}&limit=${limit}&populate=images`,
//       { cache: "force-cache" }
//     );

//     if (!res.ok) {
//       throw new Error("Failed to fetch categories");
//     }

//     const data = await res.json();

//     return {
//       categories: data.docs,
//       totalPages: data.totalPages,
//       page: data.page
//     };
//   } catch (error) {
//     console.error(error);
//     return { categories: [], totalPages: 1, page: 1 };
//   }
// }

// import data from "@/data/categories.json";

// // Get all categories
// export async function getCategories() {
//   try {
//     return data.docs; // return same as API
//   } catch (error) {
//     console.error("[frontend] failed to load categories", error);
//     return [];
//   }
// }

// // Get paginated categories
// export async function getCategoriesByPagination(page = 1, limit = 10) {
//   try {
//     const start = (page - 1) * limit;
//     const end = start + limit;

//     const categories = data.docs.slice(start, end);

//     const totalPages = Math.ceil(data.docs.length / limit);

//     return {
//       categories,
//       totalPages,
//       page
//     };
//   } catch (error) {
//     console.error("[frontend] failed to load paginated categories", error);
//     return { categories: [], totalPages: 1, page: 1 };
//   }
// }

const fetchJson = async (url: string, options?: RequestInit) => {
  const res = await fetch(url, options);
  if (!res.ok) {
    const responseBody = await res.text().catch(() => "<unavailable>");
    console.error(
      `[API ${res.status}] ${options?.method || "GET"} ${url}\n${responseBody.slice(0, 500)}`
    );
    return null;
  }
  return res.json();
};

const chunk = <T,>(items: T[], size: number) =>
  Array.from({ length: Math.ceil(items.length / size) }, (_, index) =>
    items.slice(index * size, index * size + size)
  );

export async function getCategories() {
  try {
    const res = await fetch(
      `${API_URL}/product_category`,
      { cache: "force-cache" }
    );

    if (!res.ok) {
      const responseBody = await res.text().catch(() => "<unavailable>");
      console.error(
        `[API ${res.status}] GET ${API_URL}/product_category\n${responseBody.slice(0, 500)}`
      );
      throw new Error("Failed to fetch categories");
    }

    const data = await res.json();
    
    const imageIds = [...new Set(data.map((cat: any) => cat.acf?.image).filter(Boolean))];
    const media = imageIds.length
      ? (
          await Promise.all(
            chunk(imageIds, 50).map((ids) =>
              fetchJson(
                `${API_URL}/media?include=${ids.join(",")}&per_page=100`,
                { cache: "force-cache" }
              )
            )
          )
        ).flatMap((items) => (Array.isArray(items) ? items : []))
      : [];
    const images = new Map(
      media.map((item: any) => [
        String(item.id),
        item.source_url || item.link || null,
      ])
    );

    const updatedCategories = data.map((cat: any) => ({
      ...cat,
      image_url: images.get(String(cat.acf?.image)) || null,
    }));


    return updatedCategories;
  } catch (error) {
    console.error(error);
    return [];
  }
}