import { API_URL } from "../api/Api";

export async function getBanner(slug: string) {
  const res = await fetch(
    `${API_URL}/banner?where[slug][equals]=${slug}`,
    { cache: "no-store" }
  );

  const data = await res.json();
  return data.docs[0];
}