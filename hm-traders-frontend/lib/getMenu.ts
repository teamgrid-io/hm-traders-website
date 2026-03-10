import { API_URL } from "../api/Api";    
export async function getMenu() {
  const res = await fetch(`${API_URL}/menu`);

  const data = await res.json();
console.log("Menu data:", data); // Debugging log   
  return data.docs;
}