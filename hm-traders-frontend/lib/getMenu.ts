import { API_URL } from "../api/Api";    
export async function getMenu() {
  const res = await fetch(`${API_URL}/menu`);

  const data = await res.json();  
  return data.docs;
}

// import data from "@/data/menu.json";

// export async function getMenu() {
//   try {
//     return data.docs;
//   } catch (error) {
//     console.error("Failed to load menu:", error);
//     return [];
//   }
// }