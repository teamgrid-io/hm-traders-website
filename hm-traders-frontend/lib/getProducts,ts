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

    return data.docs; // Payload returns docs array
  } catch (error) {
    console.error(error);
    return [];
  }
}