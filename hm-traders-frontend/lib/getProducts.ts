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
console.log("Products data:", data); // Debugging log
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
  console.log("Category by slug data:", data); // Debugging log
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
console.log("Products by category slug data:", data); // Debugging log
  return data.docs;
}
export async function getProductBySlug(slug: string) {
  const res = await fetch(
    `${API_URL}/products?where[slug][equals]=${slug}&depth=2`,
    { cache: "no-store" }
  );

  const data = await res.json();
console.log("Product by slug data:", data); // Debugging log
  return data.docs[0];
}