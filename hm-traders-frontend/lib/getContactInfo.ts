import { API_URL } from "@/api/Api";

export async function getContactInfo() {
  const res = await fetch(
    `${API_URL}/contact-info`,
    { cache: "no-store" }
  );
  const data = await res.json();

  return data?.docs?.[0];
}