const API_URL = "http://localhost:3000/api";

export async function getProducts() {
  const res = await fetch(`${API_URL}/products`);

  const data = await res.json();
  console.log("Products data:", data); // Debugging log
  return data.docs;
}

export async function getBrands() {
  const res = await fetch(`${API_URL}/brands`);

  const data = await res.json();
  return data.docs;
}