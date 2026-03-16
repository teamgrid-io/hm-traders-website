"use client";

import { useState } from "react";
import { submitContactForm } from "@/lib/contact";
import "./Contact.css";

export default function ContactForm({ title }: { title?: string }) {
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

      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch {
      alert("Something went wrong");
    }
  };

  return (
    <>
      <div className="formTitle">{title || "Any Questions?"}</div>

      <form onSubmit={handleSubmit} className="contactForm">

        <div className="row">
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            placeholder="Email Address"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
        </div>

        <input
          placeholder="Phone Number"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />

        <textarea
          placeholder="Message"
          value={form.message}
          onChange={(e) =>
            setForm({ ...form, message: e.target.value })
          }
        />

        <button type="submit">Send Now</button>

      </form>
    </>
  );
}