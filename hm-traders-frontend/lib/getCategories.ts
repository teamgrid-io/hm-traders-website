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
//       { cache: "no-store" }
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

const getImageById = async (id: any) => {
  if (!id) return null;

  const res = await fetch(
    `${API_URL}/media/${id}`
  );

  if (!res.ok) return null;

  const imgData = await res.json();
  return imgData?.source_url || imgData?.link || null;
};

export async function getCategories() {
  try {
    const res = await fetch(
      `${API_URL}/product_category`,
      { cache: "force-cache" }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }

    const data = await res.json();
    
    const updatedCategories = await Promise.all(
      data.map(async (cat: any) => {
        let imageUrl = null;

        if (cat.acf.image) {
          imageUrl = await getImageById(cat.acf.image);
        }

        return {
          ...cat,
          image_url: imageUrl,
        };
      })
    );


    return updatedCategories;
  } catch (error) {
    console.error(error);
    return [];
  }
}