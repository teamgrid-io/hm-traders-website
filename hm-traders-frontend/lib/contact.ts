import { API_URL } from "@/api/Api"
export async function submitContactForm(form: {
  name: string
  email: string
  phone: string
  message: string
}) {
  const res = await fetch(`${API_URL}/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });

  if (!res.ok) {
    throw new Error("Failed to send message");
  }

  return res.json();
}