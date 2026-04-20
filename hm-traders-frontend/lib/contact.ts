import { API_URL } from "@/api/Api"

export async function submitContactForm(data:any) {

  const res = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed");

  return res.json();
}
export async function getEnquiryForm() {
  const res = await fetch(`${API_URL}/enquiries`, {
    cache: "force-cache",
  });

  const data = await res.json();
  return data?.docs?.[0];
}

