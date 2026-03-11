"use client";

import { useState } from "react";
import { submitContactForm } from "@/lib/contact";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await submitContactForm(form);

      alert("Message sent!");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
  <div className="contactWrapper">
    <div className="contactTitle">CONTACT US</div>

    <form onSubmit={handleSubmit} className="contactForm">
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        placeholder="Phone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />

      <textarea
        placeholder="Message"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />

      <button type="submit">Send</button>
    </form>
  </div>
);
}