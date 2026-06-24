import { API_URL } from "@/api/Api"

export async function submitContactForm(data: any) {
  const res = await fetch("https://hmtraderskol.com/contact-handler.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw result; // 👈 send real errors to frontend
  }

  return result;
}
export async function getEnquiryForm() {
  const res = await fetch(`${API_URL}/enquiries`, {
    cache: "force-cache",
  });

  const data = await res.json();
  return data?.docs?.[0];
}

