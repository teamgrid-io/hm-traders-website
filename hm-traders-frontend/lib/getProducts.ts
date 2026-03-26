import { API_URL } from "../api/Api";    
export async function getProducts() {
  try {
    const res = await fetch(`${API_URL}/products`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await res.json();
    return data.docs;
  } catch (error) {
    console.error(error);
    return [];
  }
}
export async function getCategoryBySlug(slug: string) {
  const res = await fetch(
    `${API_URL}/categories?where[slug][equals]=${slug}`,
    { cache: "no-store" }
  );

  const data = await res.json();
  return data.docs[0];
}

export async function getProductsByCategorySlug(slug: string) {
  const category = await getCategoryBySlug(slug);

  if (!category) return [];

  const res = await fetch(
    `${API_URL}/products?where[category][equals]=${category.id}&depth=1`,
    { cache: "no-store" }
  );

  const data = await res.json();
  return data.docs;
}
export async function getProductBySlug(slug: string) {
  const res = await fetch(
    `${API_URL}/products?where[slug][equals]=${slug}&depth=2`,
    { cache: "no-store" }
  );

  const data = await res.json();
  return data.docs[0];
}
export async function getProductsByCategorySlugPagination(
  slug: string,
  page = 1,
  limit = 5
) {
  try {
    const category = await getCategoryBySlug(slug);
    if (!category) {
      return { products: [], totalPages: 1, page: 1 };
    }

    const res = await fetch(
      `${API_URL}/products?where[category][equals]=${category.id}&page=${page}&limit=${limit}&depth=1`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch products by category with pagination");
    }

    const data = await res.json();

    return {
      products: data.docs,
      totalPages: data.totalPages,
      page: data.page,
    };
  } catch (error) {
    console.error(error);
    return { products: [], totalPages: 1, page: 1 };
  }
}