import { API_URL } from "../api/Api";    
export async function getProducts() {
  try {
    const res = await fetch(`${API_URL}/api/products`, {
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
export async function getProductsByCategorySlug(slug: string) {
  const res = await fetch(
    `${API_URL}/products?where[category.slug][equals]=${slug}&depth=1`,
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