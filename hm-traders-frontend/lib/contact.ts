import { API_URL } from "@/api/Api"
// export async function submitContactForm(form: {
//   name: string
//   email: string
//   phone: string
//   message: string
// }) {
//   const res = await fetch(`${API_URL}/enquiries`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(form),
//   });

//   if (!res.ok) {
//     throw new Error("Failed to send message");
//   }

//   return res.json();
// }
export async function submitContactForm(data) {

   console.log("Sending:", data);
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
    cache: "no-store",
  });

  const data = await res.json();
  return data?.docs?.[0];
}

