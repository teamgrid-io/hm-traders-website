import { API_URL } from "@/api/Api";

export async function getContactInfo() {
  const res = await fetch(
    `${API_URL}/contact-info`,
    { cache: "no-store" }
  );
  const data = await res.json();

  return data?.docs?.[0];
}

// import data from "@/data/contactnfo.json"

// export async function getContactInfo() {
//   try {
//     return data[0]
    
//   } catch (error) {
//     console.error("Failed to load contact info:",error);
//       return [];
//   }
// }