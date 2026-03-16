import { API_URL } from "@/api/Api";    
export async function getCategories() {
  try {
    const res = await fetch(
      `${API_URL}/categories?limit=100&populate=images`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }

    const data = await res.json();
    console.log("Categories data:", data.docs); // Debugging log
    return data.docs;
  } catch (error) {
    console.error(error);
    return [];
  }
}
export async function getCategoriesByPagination(page = 1, limit = 10) {
  try {
    const res = await fetch(
      `${API_URL}/categories?page=${page}&limit=${limit}&populate=images`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }

    const data = await res.json();

    return {
      categories: data.docs,
      totalPages: data.totalPages,
      page: data.page
    };
  } catch (error) {
    console.error(error);
    return { categories: [], totalPages: 1, page: 1 };
  }
}