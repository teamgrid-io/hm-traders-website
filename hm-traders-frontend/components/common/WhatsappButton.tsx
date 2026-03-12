"use client";

import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const phone = "000000"; 
  const message = "Hello! I want to know more.";

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsappFloat"
    >
      <FaWhatsapp size={28} />
    </a>
  );
}