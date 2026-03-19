import { API_URL } from "../api/Api";    
export async function getMenu() {
  const res = await fetch(`${API_URL}/menu`);

  const data = await res.json();  
  return data.docs;
}