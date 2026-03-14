import { API_URL } from "@/api/Api";

export async function getContactInfo() {
  const res = await fetch(
    `${API_URL}/contact-info`,
    { cache: "no-store" }
  );
console.log("Contact info response:", res); // Debugging log
  return res.json();
}