"use client";

import { useState } from "react";
import { submitContactForm } from "@/lib/contact";
import "./Contact.css";


interface ContactFormSection {
  contact_form?: string;
  name_placeholder?: string;
  email_placeholder?: string;
  phone_placeholder?: string;
  message_placeholder?: string;
  button_text?: string;
}

interface ContactFormProps {
  section?: ContactFormSection;
}

interface ContactFormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactForm({ section }: ContactFormProps) {
  const [form, setForm] = useState<ContactFormState>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   try {
  //     await submitContactForm(form);
  //     alert("Message sent!");

  //     setForm({
  //       name: "",
  //       email: "",
  //       phone: "",
  //       message: "",
  //     });
  //   } catch {
  //     alert("Something went wrong");
  //   }
  // };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    } catch (err) {
      alert("Something went wrong");
    }
  };
 return (
    <>
      {/* ✅ ACF: contact_form */}
      <div className="formTitle">
        {section?.contact_form || "Any Questions?"}
      </div>

   <form className="contactForm" onSubmit={handleSubmit}>

        <div className="row">
          <input
            placeholder={section?.name_placeholder || "Name"}
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            placeholder={section?.email_placeholder || "Email Address"}
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
        </div>

        <input
          placeholder={section?.phone_placeholder || "Phone Number"}
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />

        <textarea
          placeholder={section?.message_placeholder || "Message"}
          value={form.message}
          onChange={(e) =>
            setForm({ ...form, message: e.target.value })
          }
        />

        <button type="submit">
          {section?.button_text || "Send Now"}
        </button>

      </form>
    </>
  );

}