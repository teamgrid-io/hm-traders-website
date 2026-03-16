import { API_URL } from "@/api/Api";

export async function getContactInfo() {
  const res = await fetch(
    `${API_URL}/contact-info`,
    { cache: "no-store" }
  );
  const data = await res.json();

console.log("Contact info response:", data?.docs); // Debugging log
  return data?.docs?.[0];
}