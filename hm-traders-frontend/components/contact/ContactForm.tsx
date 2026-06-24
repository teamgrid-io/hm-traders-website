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
 const [loading, setLoading] = useState(false);
 const [errors, setErrors] = useState<any>({});
 const [successMsg, setSuccessMsg] = useState("");
 const validateField = (name: string, value: string) => {
  switch (name) {
    case "name":
      if (!value.trim()) return "Name is required";
      if (value.trim().length < 2)
        return "Name must be at least 2 characters";
      if (!/^[A-Za-z\s]+$/.test(value))
        return "Name should contain only letters";
      return "";

    case "email":
      if (!value.trim()) return "Email is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        return "Invalid email format";
      return "";

    case "phone":
      if (!value.trim()) return "Phone number is required";
      if (!/^[6-9]\d{9}$/.test(value))
        return "Invalid phone number";
      return "";

    case "message":
      if (!value.trim()) return "Message is required";
      return "";

    default:
      return "";
  }
};
const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const { name, value } = e.target;

  setForm((prev) => ({
    ...prev,
    [name]: value,
  }));

  // ✅ validate on change
  const errorMsg = validateField(name, value);

  setErrors((prev: any) => ({
    ...prev,
    [name]: errorMsg,
  }));
};
 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  setLoading(true);
  setErrors({});
  setSuccessMsg("");

  try {
    const res = await submitContactForm(form);

    setSuccessMsg(res.message);

    setForm({
      name: "",
      email: "",
      phone: "",
      message: "",
    });

  } catch (err: any) {
    if (err?.errors) {
      setErrors(err.errors); //  validation errors
    } else {
      setErrors({ general: "Something went wrong" });
    }
  } finally {
    setLoading(false);
  }
};
 return (
    <>
      {/* ✅ ACF: contact_form */}
      <div className="formTitle">
        {section?.contact_form || "Any Questions?"}
      </div>
{successMsg && (
  <div className="successMsg">
    {successMsg}
  </div>
)}
{errors.general && (
  <div className="errorMsg">
    {errors.general}
  </div>
)}
 
   <form className="contactForm" onSubmit={handleSubmit}>

        <div className="row">

  <div className="fieldGroup">
    <input
     name="name"
      placeholder={section?.name_placeholder || "Name"}
      value={form.name}
     onChange={handleChange}
      className={errors.name ? "inputError" : ""}
    />

   {errors.name && (
  <div className="errorSpace">
    <p className="fieldError">{errors.name}</p>
  </div>
)}
  </div>

  <div className="fieldGroup">
    <input
      name="email"
      placeholder={section?.email_placeholder || "Email Address"}
      value={form.email}
      onChange={handleChange}
      className={errors.email ? "inputError" : ""}
    />

    {errors.email && (
  <div className="errorSpace">
    <p className="fieldError">{errors.email}</p>
  </div>
)}
  </div>

</div>

      <div className="fieldGroup">
  <input
    name="phone"
    placeholder={section?.phone_placeholder || "Phone Number"}
    value={form.phone}
    onChange={handleChange}
    className={errors.phone ? "inputError" : ""}
  />

 {errors.phone && (
  <div className="errorSpace">
    <p className="fieldError">{errors.phone}</p>
  </div>
)}
</div>

       <div className="fieldGroup">
  <textarea
    name="message"
    placeholder={section?.message_placeholder || "Message"}
    value={form.message}
    onChange={handleChange}
    className={errors.message ? "inputError" : ""}
  />

  {errors.message && (
  <div className="errorSpace">
    <p className="fieldError">{errors.message}</p>
  </div>
)}
</div>
       <button type="submit" disabled={loading}>
  {loading ? "Sending..." : section?.button_text || "Send Now"}
</button>

      </form>
    </>
  );

}